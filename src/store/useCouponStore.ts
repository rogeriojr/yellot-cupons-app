import { create } from 'zustand';
import { Coupon, FilterDays } from '../types/coupon';
import api from '../services/api';
import { AxiosError, isAxiosError } from 'axios';

interface CouponState {
  coupons: Coupon[];
  filteredCoupons: Coupon[];
  isLoading: boolean;
  error: string | null;
  filterDays: FilterDays;
  fetchCoupons: () => Promise<void>;
  setFilterDays: (days: FilterDays) => void;
}

interface ApiErrorResponse {
  message?: string;
  [key: string]: unknown;
}

export const useCouponStore = create<CouponState>((set, get) => ({
  coupons: [],
  filteredCoupons: [],
  isLoading: false,
  error: null,
  filterDays: null,

  fetchCoupons: async () => {
    console.log('🔄 [CouponStore] Iniciando busca de cupons...');
    set({ isLoading: true, error: null });

    try {
      console.log('🌐 [CouponStore] Fazendo requisição API...');
      const response = await api.get<Coupon[]>('');

      console.log('✅ [CouponStore] Resposta da API:', {
        status: response.status,
        data: response.data,
        config: response.config
      });

      set({
        coupons: response.data,
        filteredCoupons: response.data,
        isLoading: false
      });

      // Apply current filter if exists
      const { filterDays } = get();
      console.log('🔍 [CouponStore] Filtro atual:', filterDays || 'Nenhum');
      if (filterDays) {
        get().setFilterDays(filterDays);
      }
    } catch (error: unknown) {
      if (isAxiosError<ApiErrorResponse>(error)) {
        console.error('❌ [CouponStore] Erro na requisição:', {
          message: error.message,
          code: error.code,
          status: error.response?.status,
          data: error.response?.data,
          url: error.config?.url
        });

        const errorMessage = error.response?.data?.message
          || (error.response?.status ? `Erro ${error.response.status}` : 'Erro na requisição');

        set({
          error: errorMessage,
          isLoading: false
        });
      } else if (error instanceof Error) {
        console.error('❌ [CouponStore] Erro desconhecido:', error.message);
        set({
          error: 'Erro inesperado ao carregar cupons',
          isLoading: false
        });
      } else {
        console.error('❌ [CouponStore] Erro inesperado:', error);
        set({
          error: 'Ocorreu um erro desconhecido',
          isLoading: false
        });
      }
    }
  },

  setFilterDays: (days: FilterDays) => {
    console.log('⚙️ [CouponStore] Aplicando filtro de dias:', days || 'Todos');
    const { coupons } = get();
    set({ filterDays: days });

    if (!days) {
      console.log('🔓 [CouponStore] Sem filtro - mostrando todos cupons');
      set({ filteredCoupons: coupons });
      return;
    }

    const now = new Date();
    const filteredDate = new Date(now.getTime());
    filteredDate.setDate(now.getDate() + days);
    console.log('📅 [CouponStore] Filtrando cupons que expiram antes de:', filteredDate);

    // Filtra os cupons que expiram dentro do período selecionado
    const filtered = coupons.filter(coupon => {
      const expireDate = new Date(coupon.expire_at);
      return expireDate <= filteredDate;
    });

    console.log(`📊 [CouponStore] Cupons filtrados: ${filtered.length}/${coupons.length}`);
    set({ filteredCoupons: filtered });
  },
}));