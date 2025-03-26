import axios from 'axios';
import Constants from 'expo-constants';

// Criando uma instância do axios com configurações base
const apiClient = axios.create({
  baseURL: Constants.expoConfig?.extra?.apiUrl || 'https://api.yellotmob.com.br/discount/front-end-test/',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;