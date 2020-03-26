// Importando o React
import React from 'react';

// Importando o pacote instalado para lidar com as rotas na aplicação
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// Importando a Pagina de Logon
import Logon from './pages/Logon';

// Importando a Pagina de Registro
import Register from './pages/Register';

// Importando a Pagina de Profile
import Profile from './pages/Profile';

// Importando a pagina NewIncident
import NewIncident from './pages/NewIncident';

export default function Routes(){
    return(
        <BrowserRouter> 
            {/* Garante que apénas uma rota seja executada por momento, seja chamada por momento. */}
            <Switch>
                {/* Rota Logon */}
                <Route path="/" exact component={Logon}/>    
                {/* Rota Cadastro */}
                <Route path="/cadastro" component={Register}/>    
                {/* Rota Profile */}
                <Route path="/perfil" component={Profile}/>
                {/* Rota NewIncident */}
                <Route path="/casos/novo" component={NewIncident}/>      
            </Switch>
        </BrowserRouter>
    );
}