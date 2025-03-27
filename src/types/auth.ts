/**
 * Tipos e interfaces relacionados à autenticação
 */

/**
 * Interface para o usuário autenticado
 */
export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
  createdAt: string;
}

/**
 * Interface para os tokens de autenticação
 */
export interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

/**
 * Interface para as credenciais de login
 */
export interface LoginCredentials {
  email: string;
  password: string;
}

/**
 * Interface para os dados de registro
 */
export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

/**
 * Interface para os dados de recuperação de senha
 */
export interface ForgotPasswordData {
  email: string;
}

/**
 * Interface para os dados de redefinição de senha
 */
export interface ResetPasswordData {
  token: string;
  password: string;
  confirmPassword: string;
}

/**
 * Status possíveis da autenticação
 */
export type AuthStatus = 'idle' | 'loading' | 'authenticated' | 'unauthenticated' | 'error';