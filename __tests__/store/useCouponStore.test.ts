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

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useCouponStore());

    expect(result.current.coupons).toEqual([]);
    expect(result.current.filteredCoupons).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.filterDays).toBeNull();
  });

  it('should fetch coupons successfully', async () => {
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockCoupons });

    const { result, waitForNextUpdate } = renderHook(() => useCouponStore());

    act(() => {
      result.current.fetchCoupons();
    });

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(result.current.coupons).toEqual(mockCoupons);
    expect(result.current.filteredCoupons).toEqual(mockCoupons);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
  });

  it('should handle fetch coupons error', async () => {
    const errorMessage = 'Network Error';
    (api.get as jest.Mock).mockRejectedValueOnce(new Error(errorMessage));

    const { result, waitForNextUpdate } = renderHook(() => useCouponStore());

    act(() => {
      result.current.fetchCoupons();
    });

    expect(result.current.isLoading).toBe(true);

    await waitForNextUpdate();

    expect(api.get).toHaveBeenCalledTimes(1);
    expect(result.current.coupons).toEqual([]);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBe('Erro ao carregar cupons. Tente novamente.');
  });

  it('should filter coupons by days', () => {
    const { result } = renderHook(() => useCouponStore());

    // Configurar o estado inicial com os cupons mockados
    act(() => {
      useCouponStore.setState({ coupons: mockCoupons, filteredCoupons: mockCoupons });
    });

    // Aplicar filtro de 7 dias
    act(() => {
      result.current.setFilterDays(7);
    });

    // Verificar se o filtro foi aplicado corretamente
    expect(result.current.filterDays).toBe(7);
    // Apenas cupons que expiram em até 7 dias devem estar nos filteredCoupons
    // Como o mockCoupons tem cupons que expiram em 10 e 20 dias, nenhum deve estar no filtro de 7 dias
    expect(result.current.filteredCoupons).toHaveLength(0);

    // Aplicar filtro de 15 dias
    act(() => {
      result.current.setFilterDays(15);
    });

    // Verificar se o filtro foi aplicado corretamente
    expect(result.current.filterDays).toBe(15);
    // Apenas o cupom que expira em 10 dias deve estar nos filteredCoupons
    expect(result.current.filteredCoupons).toHaveLength(1);
    expect(result.current.filteredCoupons[0].code).toBe('TESTE10');

    // Aplicar filtro de 30 dias
    act(() => {
      result.current.setFilterDays(30);
    });

    // Verificar se o filtro foi aplicado corretamente
    expect(result.current.filterDays).toBe(30);
    // Ambos os cupons devem estar nos filteredCoupons
    expect(result.current.filteredCoupons).toHaveLength(2);
  });

  it('should reset filter when filterDays is null', () => {
    const { result } = renderHook(() => useCouponStore());

    // Configurar o estado inicial com os cupons mockados e um filtro aplicado
    act(() => {
      useCouponStore.setState({
        coupons: mockCoupons,
        filteredCoupons: [mockCoupons[0]],
        filterDays: 15
      });
    });

    // Resetar o filtro
    act(() => {
      result.current.setFilterDays(null);
    });

    // Verificar se o filtro foi resetado corretamente
    expect(result.current.filterDays).toBeNull();
    expect(result.current.filteredCoupons).toEqual(mockCoupons);
  });

  it('should apply filter after fetching coupons if filterDays is set', async () => {
    // Configurar o estado inicial com um filtro aplicado
    act(() => {
      useCouponStore.setState({ filterDays: 15 });
    });

    // Mock da resposta da API
    (api.get as jest.Mock).mockResolvedValueOnce({ data: mockCoupons });

    const { result, waitForNextUpdate } = renderHook(() => useCouponStore());

    // Buscar cupons
    act(() => {
      result.current.fetchCoupons();
    });

    await waitForNextUpdate();

    // Verificar se o filtro foi aplicado após buscar os cupons
    expect(result.current.filterDays).toBe(15);
    // Apenas o cupom que expira em 10 dias deve estar nos filteredCoupons
    expect(result.current.filteredCoupons).toHaveLength(1);
    expect(result.current.filteredCoupons[0].code).toBe('TESTE10');
  })
});