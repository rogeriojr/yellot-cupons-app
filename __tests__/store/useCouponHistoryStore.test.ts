import { renderHook, act } from '@testing-library/react-hooks';
import { useCouponHistoryStore } from '../../src/store/useCouponHistoryStore';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { jest } from '@jest/globals';

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
}));

describe('useCouponHistoryStore', () => {
  beforeEach(() => {
    // Limpa o estado do store antes de cada teste
    useCouponHistoryStore.getState().history = [];
    useCouponHistoryStore.getState().isLoading = false;
    useCouponHistoryStore.getState().error = null;

    // Limpa os mocks
    jest.clearAllMocks();
  });

  const mockCoupon = {
    code: 'TESTE10',
    type: 'percentage',
    value: 10,
    expire_at: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
    is_active: true,
    max_use: 1,
    used: 0,
    max_apply_date: null,
  };

  const mockHistoryItem = {
    coupon: mockCoupon,
    used_at: new Date().toISOString(),
    order_id: '12345',
    discount_value: 10,
  };

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCouponHistoryStore());

    expect(result.current.history).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should add coupon to history', () => {
    const { result } = renderHook(() => useCouponHistoryStore());

    act(() => {
      result.current.addToHistory(mockHistoryItem);
    });

    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0]).toEqual(mockHistoryItem);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      '@coupon_history',
      JSON.stringify([mockHistoryItem])
    );
  });

  it('should load history from AsyncStorage', async () => {
    // Configura o mock para retornar um histórico salvo
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(
      JSON.stringify([mockHistoryItem])
    );

    const { result, waitForNextUpdate } = renderHook(() => useCouponHistoryStore());

    act(() => {
      result.current.loadHistory();
    });

    // Espera a atualização após a chamada assíncrona
    await waitForNextUpdate();

    expect(result.current.history).toHaveLength(1);
    expect(result.current.history[0]).toEqual(mockHistoryItem);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith('@coupon_history');
  });

  it('should handle loading errors', async () => {
    // Configura o mock para lançar um erro
    const errorMessage = 'Erro ao carregar histórico';
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useCouponHistoryStore());

    act(() => {
      result.current.loadHistory();
    });

    // Espera a atualização após a chamada assíncrona
    await waitForNextUpdate();

    expect(result.current.error).toBe(errorMessage);
    expect(result.current.isLoading).toBe(false);
  });

  it('should clear history', () => {
    const { result } = renderHook(() => useCouponHistoryStore());

    // Primeiro, adiciona um item ao histórico
    act(() => {
      result.current.addToHistory(mockHistoryItem);
    });

    expect(result.current.history).toHaveLength(1);

    // Depois, limpa o histórico
    act(() => {
      result.current.clearHistory();
    });

    expect(result.current.history).toHaveLength(0);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@coupon_history');
  });

  it('should set loading state correctly', () => {
    const { result } = renderHook(() => useCouponHistoryStore());

    act(() => {
      result.current.setIsLoading(true);
    });

    expect(result.current.isLoading).toBe(true);

    act(() => {
      result.current.setIsLoading(false);
    });

    expect(result.current.isLoading).toBe(false);
  });

  it('should set error state correctly', () => {
    const { result } = renderHook(() => useCouponHistoryStore());
    const errorMessage = 'Erro no histórico';

    act(() => {
      result.current.setError(errorMessage);
    });

    expect(result.current.error).toBe(errorMessage);

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });
});