import { create } from 'zustand';
import { Coupon, FilterDays } from '../types/coupon';
import api from '../services/api';

interface CouponState {
  coupons: Coupon[];
  filteredCoupons: Coupon[];
  isLoading: boolean;
  error: string | null;
  filterDays: FilterDays;
  fetchCoupons: () => Promise<void>;
  setFilterDays: (days: FilterDays) => void;
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
      const response = await api.get('');
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
    } catch (error) {
      console.error('❌ [CouponStore] Erro ao buscar cupons:', {
        error: error,
        response: error.response,
        request: error.request
      });

      const errorMessage = error.response
        ? `Erro ${error.response.status}: ${error.response.data?.message || 'Sem detalhes'}`
        : 'Erro ao carregar cupons. Tente novamente.';

      set({
        error: errorMessage,
        isLoading: false
      });
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