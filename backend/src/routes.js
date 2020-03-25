// Importar o Express
const express = require('express');

// Importar OngController.js
const OngController = require('./controllers/OngController');

// Importar IncidentController.js
const IncidentController = require('./controllers/IncidentController');

// Importar ProfileController.js
const ProfileController = require('./controllers/ProfileController');

// Importar SessionController.js
const SessionController = require('./controllers/SessionController');

// Desacoplando o modulo de rotas do express em uma nova variavel
const routes = express.Router();

// Criar uma Rota para LOGIN registradas
routes.post('/sessions', SessionController.create);

// Criar uma listagem das ONGS registradas
routes.get('/ongs', OngController.index);

// Criar a primeira ROTA, sendo a Rota RAIZ. Uma rota sem Recurso pois está '/'
routes.post('/ongs', OngController.create);

// Criar uma listagem de um Caso especifico registrado
routes.get('/profile', ProfileController.index);

// Criar uma listagem das ONGS registradas
routes.get('/incidents', IncidentController.index);

// Criar Rota para Casos
routes.post('/incidents', IncidentController.create);

// Criar uma Rota para deletar Casos
routes.delete('/incidents/:id', IncidentController.delete);

// Exportar uma variavel dentro de um arquivo
module.exports = routes;