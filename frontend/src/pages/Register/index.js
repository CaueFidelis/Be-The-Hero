import React, { useState } from 'react';

// Importando o Link do novo pacote React
import { Link, useHistory } from 'react-router-dom'

// Importar os icones instalados do pacote React
import { FiArrowLeft } from 'react-icons/fi';

// Importar o API para fazer a conexão de Rotas
import api from '../../services/api';

// Importando o CSS para a pagina Register
import './styles.css'

// Importando o Logo na pasta assets na raiz do src
import logoImg from '../../assets/logo.svg'

export default function Register(){
    // Criar um Estado para armazenar as informações do usuario
    const [name, setName] =         useState('');
    const [email, setEmail] =       useState('');
    const [whatsapp, setWhatsapp] = useState('');
    const [city, setCity] =         useState('');
    const [uf, setUf] =             useState('');

    // Serve para fazer uma navegação através de uma função javascript quando não se pode colocar o Link
    const history = useHistory();

    // Função responsavel pelo cadastro do usuário
    async function handleRegister(e) {
        e.preventDefault();

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf,
        };

        try{
            const response = await api.post('ongs', data);

            alert(`Seu ID de Acesso: ${response.data.id}`)
            history.push('/');
        } catch (err) {
            alert('Erro no Cadastro, tente novamente.')
        }
    }


    return (
        <div className="register-container">
            <div className="content">
                <section>
                    <img src={logoImg} alt="Be The Hero"/>

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os casos da sua ONG.</p>
                
                    <Link className="back-link" to="/">
                    <FiArrowLeft size={16} color="#E02041"/>
                        Possuo um Cadastro
                    </Link>
                </section>

                <form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG"
                           value={name}   
                           onChange={e => setName(e.target.value)
                    }/>
                    <input type="email" 
                           placeholder="E-mail" 
                           value={email}   
                           onChange={e => setEmail(e.target.value)}
                    />
                    <input placeholder="WhatsApp" 
                           value={whatsapp}  
                           onChange={e => setWhatsapp(e.target.value)}
                    />

                    <div className="input-group">
                        <input placeholder="Cidade"
                               value={city}    
                               onChange={e => setCity(e.target.value)}
                        />
                        <input placeholder="UF" 
                               style={{ width: 80 }} 
                               value={uf}  
                               onChange={e => setUf(e.target.value)}
                        />
                    </div>

                    <button className="button" type="submit">Cadastrar</button>
                </form>
                
            </div>
        </div>
    );
}