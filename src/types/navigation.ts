/**
 * Tipos para a navegação da aplicação
 */

/**
 * Parâmetros para as abas principais (usuário autenticado)
 */
export type RootTabParamList = {
  Cupons: undefined;
  Promos: undefined;
  Pedidos: undefined;
  Ofertas: undefined;
};

/**
 * Parâmetros para a pilha de autenticação (usuário não autenticado)
 */
export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  ResetPassword: { token: string } | undefined;
  Terms: undefined;
};