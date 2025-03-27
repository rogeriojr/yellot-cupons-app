import { Coupon } from "../../types/coupon";
import { ICouponService } from "../interfaces/ICouponService";
import apiClient from "../api";

/**
 * Implementação do serviço de cupons
 * Seguindo o princípio de Responsabilidade Única (S) do SOLID
 */
export class CouponService implements ICouponService {
  /**
   * Busca todos os cupons disponíveis
   */
  async fetchAllCoupons(): Promise<Coupon[]> {
    console.log("🔍 Iniciando fetchAllCoupons...");

    try {
      // Exibir URL base e headers antes da requisição
      console.log("🌍 URL base:", apiClient.defaults.baseURL);
      console.log("📩 Headers configurados:", apiClient.defaults.headers);

      // Executa a requisição
      const response = await apiClient.get("/");

      // Debug da resposta
      console.log("✅ Sucesso! Dados recebidos:", response.data);
      console.log("📡 Status HTTP:", response.status);
      console.log("🔄 Headers da resposta:", response.headers);

      return response.data;
    } catch (error: any) {
      console.error("❌ Erro ao buscar cupons!");

      // Se for erro da API (com resposta)
      if (error.response) {
        console.error("⚠️ Erro na resposta da API:");
        console.error("🔴 Status HTTP:", error.response.status);
        console.error("📩 Dados de erro:", error.response.data);
        console.error("🔄 Headers de erro:", error.response.headers);
      } else if (error.request) {
        console.error("⚠️ Erro na requisição, sem resposta da API:", error.request);
      } else {
        console.error("⚠️ Erro desconhecido:", error.message);
      }

      throw new Error("Erro ao carregar cupons. Tente novamente.");
    }
  }
}

// Exporta uma instância única do serviço (Singleton)
export const couponService = new CouponService();
