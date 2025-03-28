import { renderHook, act } from '@testing-library/react-hooks';
import { useCouponStore } from '../../src/store/useCouponStore';
import api from '../../src/services/api';

// Mock do módulo axios
jest.mock('../../src/services/api', () => ({
  get: jest.fn(),
}));

describe('useCouponStore', () => {
  beforeEach(() => {
    // Limpa o estado do store antes de cada teste
    useCouponStore.getState().coupons = [];
    useCouponStore.getState().filteredCoupons = [];
    useCouponStore.getState().isLoading = false;
    useCouponStore.getState().error = null;
    useCouponStore.getState().filterDays = null;

    // Limpa os mocks
    jest.clearAllMocks();
  });

  const mockCoupons = [
    {
      code: 'TESTE10',
      type: 'percentage',
      value: 10,
      expire_at: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(), // 10 dias no futuro
      is_active: true,
      max_use: 1,
      used: 0,
      max_apply_date: null,
    },
    {
      code: 'TESTE20',
      type: 'fixed',
      value: 20,
      expire_at: new Date(Date.now() + 20 * 24 * 60 * 60 * 1000).toISOString(), // 20 dias no futuro
      is_active: true,
      max_use: 1,
      used: 0,
      max_apply_date: null,
    },
  ];

  it('should initialize with default values', () =>