import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Coupon } from '../types/coupon';
import { StateCreator } from 'zustand';

export interface CouponHistoryItem {
  coupon: Coupon;
  used_at: string;
  order_id: string;
  discount_value: number;
}

interface CouponHistoryState {
  history: CouponHistoryItem[];
  isLoading: boolean;
  error: string | null;
  loadHistory: () => Promise<void>;
  setIsLoading: (loading: boolean) => void;
  setError: (errorMessage: string) => void;
  clearError: () => void;
  viewedCoupons: Coupon[];
  addToHistory: (coupon: Coupon) => void;
  clearHistory: () => void;
}

export const useCouponHistoryStore = create<CouponHistoryState>()(
  persist<CouponHistoryState>(
    (set) => ({
      history: [],
      isLoading: false,
      error: null,
      viewedCoupons: [],

      loadHistory: async () => {
        set({ isLoading: true, error: null });
        try {
          const storedHistory = await AsyncStorage.getItem('@coupon_history');
          if (storedHistory) {
            set({ history: JSON.parse(storedHistory), isLoading: false });
          } else {
            set({ isLoading: false });
          }
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Erro ao carregar histórico';
          set({ error: errorMessage, isLoading: false });
        }
      },

      setIsLoading: (loading: boolean) => set({ isLoading: loading }),

      setError: (errorMessage: string) => set({ error: errorMessage }),

      clearError: () => set({ error: null }),

      addToHistory: (coupon: Coupon) =>
        set((state) => {
          // Criar um novo item de histórico
          const historyItem: CouponHistoryItem = {
            coupon,
            used_at: new Date().toISOString(),
            order_id: '12345', // Valor padrão para testes
            discount_value: coupon.value
          };

          // Adicionar ao histórico
          const updatedHistory = [historyItem, ...state.history];

          // Salvar no AsyncStorage
          AsyncStorage.setItem('@coupon_history', JSON.stringify(updatedHistory));

          // Verificar se o cupom já existe no histórico de visualizações
          const couponExists = state.viewedCoupons.some(
            (item) => item.code === coupon.code
          );

          // Se o cupom já existe, não adicionar novamente
          if (couponExists) {
            return { history: updatedHistory };
          }

          // Adicionar o cupom ao início do array de visualizações (mais recente primeiro)
          return {
            history: updatedHistory,
            viewedCoupons: [coupon, ...state.viewedCoupons],
          };
        }),

      clearHistory: () => {
        AsyncStorage.removeItem('@coupon_history');
        set({ history: [], viewedCoupons: [] });
      },
    }),
    {
      name: 'coupon-history-storage',
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);