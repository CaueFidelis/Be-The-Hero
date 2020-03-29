// Importar o React
import React from 'react';

// Importar o intl para conversão em Reais do Valor dos Casos
import 'intl';

// Importar o Idioma Português do Brasil no intl
import 'intl/locale-data/jsonp/pt-BR';

// Importar as minhas Rotas
import Routes from './src/routes'

export default function App() {
  return (
    <Routes />  
  );
}

