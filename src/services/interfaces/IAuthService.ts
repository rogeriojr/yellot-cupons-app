import {
  AuthTokens,
  LoginCredentials,
  RegisterData,
  User
} from '../../types/auth';

/**
 * Interface para o serviço de autenticação
 * Seguindo o princípio de Segregação de Interface (I) do SOLID
 */
export interface IAuthService {
  /**
   * Realiza o login do usuário
   * @param credentials Credenciais de login
   * @returns Tokens de autenticação e dados do usuário
   */
  login(credentials: LoginCredentials): Promise<{ tokens: AuthTokens; user: User }>;

  /**
   * Registra um novo usuário
   * @param data Dados de registro
   * @returns Tokens de autenticação e dados do usuário
   */
  register(data: RegisterData): Promise<{ tokens: AuthTokens; user: User }>;

  /**
   * Solicita recuperação de senha
   * @param email Email do usuário
   */
  forgotPassword(email: string): Promise<void>;

  /**
   * Redefine a senha do usuário
   * @param token Token de redefinição de senha
   * @param password Nova senha
   * @param confirmPassword Confirmação da nova senha
   */
  resetPassword(token: string, password: string, confirmPassword: string): Promise<void>;

  /**
   * Realiza o logout do usuário
   */
  logout(): Promise<void>;
}