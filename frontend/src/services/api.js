// Importando o pacote axios
import axios from 'axios';

// Estabelecendo um padrão
const api = axios.create({
    baseURL: 'http://localhost:3333'
})

// Fazendo que todos os arquivos consigam acessar esta variavel
export default api