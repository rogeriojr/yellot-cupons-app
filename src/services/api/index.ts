import axios from 'axios';
import { setupInterceptors } from './interceptors';


/**
 * Cliente Axios configurado com a URL base da API
 */
const api = axios.create({
  baseURL: process.env.API_URL || 'https://api.yellotmob.com.br/discount/front-end-test',
});

// Configura os interceptors para gerenciar tokens de autenticação
setupInterceptors(api);

export default api;