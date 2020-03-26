import React, { useState, useEffect } from 'react';

// Importando o Link do novo pacote React
import { Link, useHistory } from 'react-router-dom'

// Importar os icones instalados do pacote React
import { FiPower, FiTrash2 } from 'react-icons/fi';

// Importando api
import api from '../../services/api';

// Importando o CSS para a pagina Profile
import './styles.css';

// Importando o Logo na pasta assets na raiz do src
import logoImg from '../../assets/logo.svg'

export default function Profile () {
    const [incidents, setIncidents] = useState([]);
    const history = useHistory();
    // Importando as informações do login da ONG: O ID e o Nome
    const ongId = localStorage.getItem('ongId');
    const ongName = localStorage.getItem('ongName');

    

    useEffect(() => {
        api.get('profile', {
            headers: {
                Authorization: ongId, 
            }
        }).then(response => {
            setIncidents(response.data);
        })    
    }, [ongId]);


    async function handleDeleteIncident(id) {
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId,
                }
            })
            setIncidents(incidents.filter(incident => incident. id != id))
        }catch (err){
            alert('Erro ao deletar o Caso.')
        }
    }

    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }


    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Be The Hero"/>
                <span>Bem Vinda, {ongName}</span>

                <Link className="button" to="/casos/novo">Cadastrar novo Caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="e02041" />
                </button>
            </header>

            <h1>Casos Cadastrados</h1>

            <ul>
                {incidents.map(incident => (
                    <li key={incident.id}>
                    <strong>CASO:</strong>
                    <p>{incident.title}</p>

                    <strong>DESCRIÇÃO:</strong>
                    <p>{incident.description}</p>

                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL'}).format(incident.value)}</p>

                    <button onClick={() => handleDeleteIncident(incident.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3" />
                    </button>
                </li>
                ))}
            </ul>
        </div>
    );
}