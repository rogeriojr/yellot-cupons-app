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
    set({ isLoading: true, error: null });
    try {
      const response = await api.get('/');
      set({ coupons: response.data, filteredCoupons: response.data, isLoading: false });

      // Apply current filter if exists
      const { filterDays } = get();
      if (filterDays) {
        get().setFilterDays(filterDays);
      }
    } catch (error) {
      set({ error: 'Erro ao carregar cupons. Tente novamente.', isLoading: false });
      console.error('Error fetching coupons:', error);
    }
  },

  setFilterDays: (days: FilterDays) => {
    const { coupons } = get();
    set({ filterDays: days });

    if (!days) {
      set({ filteredCoupons: coupons });
      return;
    }

    const now = new Date();
    const filteredDate = new Date(now.getTime());
    filteredDate.setDate(now.getDate() + days);

    const filtered = coupons.filter(coupon => {
      const expireDate = new Date(coupon.expire_at);
      return expireDate <= filteredDate;
    });

    set({ filteredCoupons: filtered });
  },
}));