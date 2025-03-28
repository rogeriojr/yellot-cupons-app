/**
 * Tipos para a navegação da aplicação
 */

/**
 * Parâmetros para as abas principais (usuário autenticado)
 */
export type RootTabParamList = {
  Cupons: { screen?: string; params?: any };
  Procurar: undefined;
  Histórico: undefined;
  Carteira: undefined;
  Profile: undefined;
};

/**
 * Parâmetros para o stack de cupons
 */
export type CouponStackParamList = {
  CouponsMain: undefined;
  CouponDetail: { coupon: any };
  Profile: undefined;
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