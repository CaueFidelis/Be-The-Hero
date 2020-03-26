import React, { useState } from 'react';

// Importando o Link do novo pacote React
import { Link, useHistory } from 'react-router-dom'

// Importar os icones instalados do pacote React
import { FiArrowLeft } from 'react-icons/fi'

// Importar o API para fazer a conexão de Rotas
import api from '../../services/api';

// Importando o CSS para a pagina NewIncident
import './styles.css'

// Importando o Logo na pasta assets na raiz do src
import logoImg from '../../assets/logo.svg'

export default function NewIncident() {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [value, setValue] = useState('');

    const history = useHistory();

    const ongId = localStorage.getItem('ongId')

    async function handleNewIncident (e) {
        
        e.preventDefault();

        const data = {
            title,
            description,
            value,
        };

        try{
            await api.post('/incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })
            history.push('/perfil')
        }catch{
            alert('Erro ao cadastrar caso, tente novamente.')
        }
    }

    return (
        <div className="new-incident-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o Caso detalhadamente para encontrar um Heróis para resolver isso.</p>
                
                    <Link className="back-link" to="/perfil">
                    <FiArrowLeft size={16} color="#E02041"/>
                        Voltar para Home
                    </Link>
                </section>

                <form onSubmit={handleNewIncident}>
                    <input 
                        placeholder="Título do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)}
                    />
                    <textarea 
                        placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)}
                    />
                    <input 
                        placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)}
                    />

                    <button className="button" type="submit">Cadastrar</button>
                </form>
            </div>
        </div>
    );
}