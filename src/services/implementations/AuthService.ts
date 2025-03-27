import {
  AuthTokens,
  LoginCredentials,
  RegisterData,
  User
} from '../../types/auth';
import { IAuthService } from '../interfaces/IAuthService';

/**
 * Implementação do serviço de autenticação
 * Seguindo o princípio de Responsabilidade Única (S) do SOLID
 */
class AuthService implements IAuthService {
  /**
   * Realiza o login do usuário com credenciais hardcoded
   * @param credentials Credenciais de login
   * @returns Tokens de autenticação e dados do usuário
   */
  async login(credentials: LoginCredentials): Promise<{ tokens: AuthTokens; user: User }> {
    try {
      // Em um caso de login real, serão utilizadas estas credenciais retornadas
      // no console
      console.log(credentials)
      // Credenciais hardcoded para teste
      const validEmail = 'user@yellot.mob';
      const validPassword = '123456789';

      // Para o login automático, sempre retorna sucesso sem verificar credenciais
      // Isso permite que o login automático funcione sem depender de API
      return {
        tokens: {
          accessToken: 'mock-access-token-for-testing',
          refreshToken: 'mock-refresh-token-for-testing'
        },
        user: {
          id: '1',
          name: 'Usuário Teste',
          email: validEmail,
          password: validPassword,
          createdAt: new Date().toISOString()
        }
      };
      // Removida a verificação de credenciais para permitir login hardcoded
    } catch (error) {
      console.error('Error during login:', error);
      throw new Error(error instanceof Error ? error.message : 'Falha ao realizar login. Verifique suas credenciais e tente novamente.');
    }
  }

  /**
   * Registra um novo usuário (simulado para teste)
   * @param data Dados de registro
   * @returns Tokens de autenticação e dados do usuário
   */
  async register(data: RegisterData): Promise<{ tokens: AuthTokens; user: User }> {
    try {
      // Simula um registro bem-sucedido
      return {
        tokens: {
          accessToken: 'mock-access-token-for-testing',
          refreshToken: 'mock-refresh-token-for-testing'
        },
        user: {
          id: '1',
          name: data.name,
          email: data.email,
          password: data.password,
          createdAt: new Date().toISOString()
        }
      };
    } catch (error) {
      console.error('Error during registration:', error);
      throw new Error('Falha ao realizar cadastro. Verifique os dados e tente novamente.');
    }
  }

  /**
   * Solicita recuperação de senha (simulado para teste)
   * @param email Email do usuário
   */
  async forgotPassword(email: string): Promise<void> {
    try {
      // Simula o envio de email de recuperação
      console.log(`[MOCK] Email de recuperação enviado para: ${email}`);
      // Não faz nada, apenas simula sucesso
    } catch (error) {
      console.error('Error during forgot password:', error);
      throw new Error('Falha ao solicitar recuperação de senha. Tente novamente.');
    }
  }

  /**
   * Redefine a senha do usuário (simulado para teste)
   * @param token Token de redefinição de senha
   * @param password Nova senha
   * @param confirmPassword Confirmação da nova senha
   */
  async resetPassword(token: string, password: string, confirmPassword: string): Promise<void> {
    try {
      // Simula a redefinição de senha
      console.log(`[MOCK] Senha redefinida com token: ${token}`);
      // Não faz nada, apenas simula sucesso
    } catch (error) {
      console.error('Error during reset password:', error);
      throw new Error('Falha ao redefinir senha. Verifique o token e tente novamente.');
    }
  }

  /**
   * Atualiza o token de acesso usando o refresh token (hardcoded para teste)
   * @param refreshToken Token de atualização
   * @returns Novos tokens de autenticação
   */
  async refreshToken(refreshToken: string): Promise<AuthTokens> {
    try {
      // Verifica se o refresh token é o token mockado
      if (refreshToken === 'mock-refresh-token-for-testing') {
        // Retorna novos tokens mockados
        return {
          accessToken: 'new-mock-access-token-for-testing',
          refreshToken: 'new-mock-refresh-token-for-testing'
        };
      } else {
        throw new Error('Refresh token inválido');
      }
    } catch (error) {
      console.error('Error during token refresh:', error);
      throw new Error('Falha ao atualizar sessão. Por favor, faça login novamente.');
    }
  }

  /**
   * Realiza o logout do usuário (simulado para teste)
   */
  async logout(): Promise<void> {
    try {
      // Simula o logout
      console.log('[MOCK] Usuário deslogado com sucesso');
      // Não faz nada, apenas simula sucesso
    } catch (error) {
      console.error('Error during logout:', error);
      // Não lançamos erro no logout para não impedir o usuário de sair
    }
  }
}

// Exporta uma instância única do serviço (Singleton)
export const authService = new AuthService();