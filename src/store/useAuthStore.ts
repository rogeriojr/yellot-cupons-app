import { create } from 'zustand';
import { AuthStatus, LoginCredentials, RegisterData, User } from '../types/auth';
import { authService } from '../services/implementations/AuthService';
import { clearAuthData, getStoredTokens, getStoredUser, setStoredTokens, setStoredUser } from '../utils/authUtils';

/**
 * Interface para o estado de autenticação
 */
interface AuthState {
  // Estado
  user: User | null;
  status: AuthStatus;
  error: string | null;

  // Ações
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string, confirmPassword: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  clearError: () => void;
}

/**
 * Store para gerenciar o estado de autenticação
 * Seguindo o princípio de Responsabilidade Única (S) do SOLID
 */
export const useAuthStore = create<AuthState>((set, get) => ({
  // Estado inicial
  user: null,
  status: 'idle',
  error: null,

  /**
   * Realiza o login do usuário
   * @param credentials Credenciais de login
   */
  login: async (credentials: LoginCredentials) => {
    try {
      set({ status: 'loading', error: null });

      // Chama o serviço de autenticação
      const { tokens, user } = await authService.login(credentials);

      // Armazena os tokens e dados do usuário
      await setStoredTokens(tokens);
      await setStoredUser(user);

      set({ user, status: 'authenticated', error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Falha ao realizar login';
      set({ status: 'error', error: errorMessage });
    }
  },

  /**
   * Registra um novo usuário
   * @param data Dados de registro
   */
  register: async (data: RegisterData) => {
    try {
      // Valida se as senhas coincidem
      if (data.password !== data.confirmPassword) {
        set({ status: 'error', error: 'As senhas não coincidem' });
        return;
      }

      set({ status: 'loading', error: null });

      // Chama o serviço de autenticação
      const { tokens, user } = await authService.register(data);

      // Armazena os tokens e dados do usuário
      await setStoredTokens(tokens);
      await setStoredUser(user);

      set({ user, status: 'authenticated', error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Falha ao realizar cadastro';
      set({ status: 'error', error: errorMessage });
    }
  },

  /**
   * Realiza o logout do usuário
   */
  logout: async () => {
    try {
      set({ status: 'loading', error: null });

      // Chama o serviço de autenticação
      await authService.logout();

      // Limpa os dados de autenticação
      await clearAuthData();

      set({ user: null, status: 'unauthenticated', error: null });
    } catch (error) {
      // Mesmo com erro, limpa os dados locais
      await clearAuthData();
      set({ user: null, status: 'unauthenticated', error: null });
    }
  },

  /**
   * Solicita recuperação de senha
   * @param email Email do usuário
   */
  forgotPassword: async (email: string) => {
    try {
      set({ status: 'loading', error: null });

      // Chama o serviço de autenticação
      await authService.forgotPassword(email);

      set({ status: 'idle', error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Falha ao solicitar recuperação de senha';
      set({ status: 'error', error: errorMessage });
    }
  },

  /**
   * Redefine a senha do usuário
   * @param token Token de redefinição de senha
   * @param password Nova senha
   * @param confirmPassword Confirmação da nova senha
   */
  resetPassword: async (token: string, password: string, confirmPassword: string) => {
    try {
      // Valida se as senhas coincidem
      if (password !== confirmPassword) {
        set({ status: 'error', error: 'As senhas não coincidem' });
        return;
      }

      set({ status: 'loading', error: null });

      // Chama o serviço de autenticação
      await authService.resetPassword(token, password, confirmPassword);

      set({ status: 'idle', error: null });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Falha ao redefinir senha';
      set({ status: 'error', error: errorMessage });
    }
  },

  /**
   * Verifica se o usuário está autenticado
   */
  checkAuth: async () => {
    try {
      set({ status: 'loading', error: null });

      // Verifica se existem tokens armazenados
      const tokens = await getStoredTokens();

      if (!tokens) {
        set({ user: null, status: 'unauthenticated', error: null });
        return;
      }

      // Recupera os dados do usuário
      const user = await getStoredUser();

      if (!user) {
        set({ user: null, status: 'unauthenticated', error: null });
        return;
      }

      set({ user, status: 'authenticated', error: null });
    } catch (error) {
      set({ user: null, status: 'unauthenticated', error: null });
    }
  },

  /**
   * Limpa o erro atual
   */
  clearError: () => {
    set({ error: null });
  },
}));