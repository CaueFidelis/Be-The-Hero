// Importando o knex 
const knex = require('knex');

// Importar as nossas configurações do nosso Banco de Dados
const configuration = require('../../knexfile');

// Criar a nossa conexão de desenvolvimento
const connection = knex(configuration.development);

// Exportar a Conexão com o Banco de Dados
module.exports = connection;