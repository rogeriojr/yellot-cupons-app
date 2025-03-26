import axios, { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
import { getStoredTokens, setStoredTokens } from '../../utils/authUtils';

/**
 * Configura os interceptors para o cliente Axios
 * @param api Instância do cliente Axios
 */
export const setupInterceptors = (api: AxiosInstance): void => {
  // Interceptor de requisição para adicionar o token de acesso
  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      const tokens = await getStoredTokens();

      if (tokens?.accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${tokens.accessToken}`;
      }

      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Interceptor de resposta para lidar com erros de autenticação
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      // Verifica se é um erro de token expirado (401) e se a requisição não foi repetida
      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const tokens = await getStoredTokens();

          if (!tokens?.refreshToken) {
            // Se não tiver refresh token, rejeita a requisição
            return Promise.reject(error);
          }

          // Tenta obter um novo token de acesso
          const response = await axios.post(
            `${api.defaults.baseURL}/auth/refresh-token`,
            { refreshToken: tokens.refreshToken }
          );

          const newTokens = response.data;

          // Armazena os novos tokens
          await setStoredTokens(newTokens);

          // Configura o novo token de acesso na requisição original
          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          }

          // Repete a requisição original com o novo token
          return api(originalRequest);
        } catch (refreshError) {
          // Se falhar ao atualizar o token, rejeita a requisição
          return Promise.reject(refreshError);
        }
      }

      return Promise.reject(error);
    }
  );
};