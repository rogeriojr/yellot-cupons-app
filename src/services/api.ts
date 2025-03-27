import axios from 'axios';
import Constants from 'expo-constants';
import { setupInterceptors } from './api/interceptors';

/**
 * Cliente Axios configurado com a URL base da API
 */
const api = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiUrl || 'https://api.yellotmob.com.br/discount/front-end-test',
});

// Configura os interceptors para gerenciar tokens de autenticação
setupInterceptors(api);

export default api;