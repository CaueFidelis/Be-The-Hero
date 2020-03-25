// Importar um método de criptografia tbm usado para criar caracteres
const crypto = require('crypto');

// Importar a Conexão para ter conexão com o banco de dados
const connection = require('../database/connection');

// Criar rotas para ser exportadas
module.exports = {
    async index (request, response) {
        const ongs = await connection('ongs').select('*');
    
        return response.json(ongs);
    },
    
    async create(request, response) {
        const { name, email, whatsapp, city, uf} = request.body;

        // Gerar o ID das ONGS
        const id = crypto.randomBytes(4).toString('HEX'); 

        // Inserir dados na tabela ongs, e colocando as colunas que você quer inserir algum valor
        await connection('ongs').insert({
            id,
            name,
            email,
            whatsapp,
            city,
            uf,
        });

        return response.json({ id });
    }
};