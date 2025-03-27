import { AxiosError, AxiosInstance, InternalAxiosRequestConfig } from 'axios';
// import { getStoredTokens, setStoredTokens } from '../../utils/authUtils'; // Comentado enquanto não há JWT

/**
 * Configura os interceptors para o cliente Axios
 * @param api Instância do cliente Axios
 */
export const setupInterceptors = (api: AxiosInstance): void => {
  // Interceptor de requisição (comentado enquanto não há JWT)
  api.interceptors.request.use(
    async (config: InternalAxiosRequestConfig) => {
      /*
      // Código original para adicionar token JWT (mantido para referência futura)
      const tokens = await getStoredTokens();
      if (tokens?.accessToken && config.headers) {
        config.headers.Authorization = `Bearer ${tokens.accessToken}`;
      }
      */
      return config;
    },
    (error: AxiosError) => Promise.reject(error)
  );

  // Interceptor de resposta (comentado enquanto não há JWT)
  api.interceptors.response.use(
    (response) => response,
    async (error: AxiosError) => {
      /*
      // Código original para tratamento de token expirado (mantido para referência futura)
      const originalRequest = error.config as InternalAxiosRequestConfig & { _retry?: boolean };

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        try {
          const tokens = await getStoredTokens();
          if (!tokens?.refreshToken) {
            return Promise.reject(error);
          }

          const response = await axios.post(
            `${api.defaults.baseURL}`,
            { refreshToken: tokens.refreshToken }
          );

          const newTokens = response.data;
          await setStoredTokens(newTokens);

          if (originalRequest.headers) {
            originalRequest.headers.Authorization = `Bearer ${newTokens.accessToken}`;
          }

          return api(originalRequest);
        } catch (refreshError) {
          return Promise.reject(refreshError);
        }
      }
      */
      return Promise.reject(error);
    }
  );
};