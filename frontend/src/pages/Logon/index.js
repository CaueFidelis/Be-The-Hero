import React, { useState } from 'react';

// Importando o Link do novo pacote React
import { Link, useHistory } from 'react-router-dom'

// Importar os icones instalados do pacote React
import { FiLogIn } from 'react-icons/fi';

// Importar o API para fazer a conexão de Rotas
import api from '../../services/api';

// Importando o CSS para a pagina Logon
import './styles.css'

// Importando o Logo na pasta assets na raiz do src
import logoImg from '../../assets/logo.svg'

// Importando a imagem na pasta assets na raiz do src
import heroesImg from '../../assets/heroes.png'

export default function Logon(){
    // Variavel para armazenar o ID
    const [id, setId] = useState('');
    const history = useHistory();
    // Ela retorna o nome da ONG e validar se a ONG existe. Para utilizar o await necessita do async
    async function handleLogin(e) {
        // Evita o Redirect padrão
        e.preventDefault()

        try{
            const response = await api.post('sessions', { id });

            localStorage.setItem('ongId', id);
            localStorage.setItem('ongName', response.data.name);

            history.push('perfil');
        } catch(err){
            alert('Falha no Login, tente novamente.')
        }
    }
    
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Be The Hero"/>
            
            <form onSubmit={handleLogin}>
                <h1>Faça seu logon</h1>
                <input placeholder="Sua ID"
                       value={id}
                       onChange= {e => setId(e.target.value)}
                />
                <button type="submit" className="button">Entrar</button>

                <Link className="back-link" to="/cadastro">
                    <FiLogIn size={16} color="#E02041"/>
                    Não tenho Cadastro
                </Link>
            </form>
            
            </section>

            <img src={heroesImg} alt="Heroes"/>
        </div>
    );
}