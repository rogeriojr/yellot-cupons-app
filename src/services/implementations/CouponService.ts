import { Coupon } from '../../types/coupon';
import { ICouponService } from '../interfaces/ICouponService';
import apiClient from '../api';

/**
 * Implementação do serviço de cupons
 * Seguindo o princípio de Responsabilidade Única (S) do SOLID
 */
export class CouponService implements ICouponService {
  /**
   * Busca todos os cupons disponíveis
   */
  async fetchAllCoupons(): Promise<Coupon[]> {
    try {
      // Consumindo a API real de cupons
      // A URL base já está configurada no apiClient, então não precisamos adicionar nenhum caminho
      const response = await apiClient.get('');
      console.log(response, 'response')
      return response.data;
    } catch (error) {
      console.error('Error fetching coupons:', error);
      throw new Error('Erro ao carregar cupons. Tente novamente.');
    }
  }
}

// Exporta uma instância única do serviço (Singleton)
export const couponService = new CouponService();