import { Coupon } from '../../types/coupon';

/**
 * Interface para o serviço de cupons
 * Seguindo o princípio de Segregação de Interface (I) do SOLID
 */
export interface ICouponService {
  /**
   * Busca todos os cupons disponíveis
   */
  fetchAllCoupons(): Promise<Coupon[]>;
}