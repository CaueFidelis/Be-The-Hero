// Importar a Conexão para ter conexão com o banco de dados
const connection = require('../database/connection');

// Criar rotas para ser exportadas
module.exports = {
    async index(request, response){
        const ong_id = request.headers.authorization;

        const incidents = await connection('incidents')
            .where('ong_id', ong_id)
            .select('*');

        return response.json(incidents);
    }
}