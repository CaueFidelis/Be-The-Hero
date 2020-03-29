// Importar Axios
import axios from 'axios';

// Fazer a Conexão API, com o Back-end
const api = axios.create({
    baseURL: 'http://192.168.0.18:3333'
});

// Exportar API
export default api;