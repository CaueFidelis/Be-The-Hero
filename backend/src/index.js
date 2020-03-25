                // Criando ROTAS

// Importar o modulo Express para dentro da variavel express (Instanciando um Objeto)
const express = require ('express');

// Importar o CORS
const cors = require('cors');

// Importar as Rotas
const routes = require('./routes');

// Instanciando a Aplicação (sendo a funcionalidade como rotas etc)
const app = express();

// Informando que estaremos utilizando o CORS
app.use(cors());

// Informando que estaremos utilizando json para o corpo das requisições
app.use(express.json());

// Utilizar as rotas
app.use(routes);

/**
 *  Rotas / Recursos
 */

/**
  * Métodos HTTP:
  * 
  * GET: Buscar uma informação do back-end
  * POST: Criar uma informação no back-end
  * PUT: Alterar uma informação no back-end
  * DELETE: Deletar uma informação no back-end
  * 
  *
  */ 

/** Tipos de parametros: 
  *
  *   Query Params: Parametros nomeados enviados na rota apos o simbolo de ? e geralmente servem para Filtros e Paginação
  *   Route Params: Parametros utilizados para identificar recursos
  *   Request Body: Corpo da requisição, utilizado para criar ou alterar recursos
  * 
  */

/** Banco de Dados:
 * 
 * SQL: MySQL, SQLite, PostgreSQL, Oracle, Microsoft SQL Server etc...
 * NoSQL: MongoDB, CouchDB, MariaDB, etc...
 * 
 */

/** Comunicação Banco de Dados:
 * 
 *     Driver - SELECT * FROM users.
 *     Query Builder: table('users').select('*').where().
 */


// Fazer com que a pagina com o numero dentro dos parenteses 3333 (Porta), esteja designado a tal aplicação.
app.listen(3333);

