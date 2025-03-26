import {
  AuthTokens,
  ForgotPasswordData,
  LoginCredentials,
  RegisterData,
  ResetPasswordData,
  User
} from '../../types/auth';
import { IAuthService } from '../interfaces/IAuthService';
import api from '../api';

/**
 * Implementação do serviço de autenticação
 * Seguindo o princípio de Responsabilidade Única (S) do SOLID
 */
class AuthService implements IAuthService {
  /**
   * Realiza o login do usuário
   * @param credentials Credenciais de login
   * @returns Tokens de autenticação e dados do usuário
   */
  async login(credentials: LoginCredentials): Promise<{ tokens: AuthTokens; user: User }> {
    try {
      const response = await api.post('/auth/login', credentials);
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error('Falha ao realizar login. Verifique suas credenciais e tente novamente.');
    }
  }

  /**
   * Registra um novo usuário
   * @param data Dados de registro
   * @returns Tokens de autenticação e dados do usuário
   */
  async register(data: RegisterData): Promise<{ tokens: AuthTokens; user: User }> {
    try {
      const response = await api.post('/auth/register', data);
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      throw new Error('Falha ao realizar cadastro. Verifique os dados e tente novamente.');
    }
  }

  /**
   * Solicita recuperação de senha
   * @param email Email do usuário
   */
  async forgotPassword(email: string): Promise<void> {
    try {
      await api.post('/auth/forgot-password', { email });
    } catch (error) {
      console.error('Error during forgot password:', error);
      throw new Error('Falha ao solicitar recuperação de senha. Tente novamente.');
    }
  }

  /**
   * Redefine a senha do usuário
   * @param token Token de redefinição de senha
   * @param password Nova senha
   * @param confirmPassword Confirmação da nova senha
   */
  async resetPassword(token: string, password: string, confirmPassword: string): Promise<void> {
    try {
      await api.post('/auth/reset-password', { token, password, confirmPassword });
    } catch (error) {
      console.error('Error during reset password:', error);
      throw new Error('Falha ao redefinir senha. Verifique o token e tente novamente.');
    }
  }

  /**
   * Atualiza o token de acesso usando o refresh token
   * @param refreshToken Token de atualização
   * @returns Novos tokens de autenticação
   */
  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      const response = await api.post('/auth/refresh-token', { refreshToken });
      return response.data;
    } catch (error) {
      console.error('Error during token refresh:', error);
      throw new Error('Falha ao atualizar sessão. Por favor, faça login novamente.');
    }
  }

  /**
   * Realiza o logout do usuário
   */
  async logout(): Promise<void> {
    try {
      await api.post('/auth/logout');
    } catch (error) {
      console.error('Error during logout:', error);
      // Não lançamos erro no logout para não impedir o usuário de sair
    }
  }
}

// Exporta uma instância única do serviço (Singleton)
export const authService = new AuthService();