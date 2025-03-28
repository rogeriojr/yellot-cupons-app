import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Coupon } from '../types/coupon';
import { StateCreator } from 'zustand';

interface CouponHistoryState {
  history: never[];
  isLoading: boolean;
  error: null;
  loadHistory(): unknown;
  setIsLoading(arg0: boolean): unknown;
  setError(errorMessage: string): unknown;
  clearError(): unknown;
  viewedCoupons: Coupon[];
  addToHistory: (coupon: Coupon) => void;
  clearHistory: () => void;
}

export const useCouponHistoryStore = create<CouponHistoryState>()(
  persist<CouponHistoryState>(
    (set) => ({
      viewedCoupons: [],
      addToHistory: (coupon: Coupon) =>
        set((state) => {
          // Verificar se o cupom já existe no histórico
          const couponExists = state.viewedCoupons.some(
            (item) => item.code === coupon.code
          );

          // Se o cupom já existe, não adicionar novamente
          if (couponExists) {
            return state;
          }

          // Adicionar o cupom ao início do array (mais recente primeiro)
          return {
            viewedCoupons: [coupon, ...state.viewedCoupons],
          };
        }),
      clearHistory: () => set({ viewedCoupons: [] }),
    }),
    {
      name: 'coupon-history-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);