import { renderHook, act } from '@testing-library/react-hooks';
import { useAuthStore } from '../../src/store/useAuthStore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock do AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

describe('useAuthStore', () => {
  beforeEach(() => {
    // Limpa o estado do store antes de cada teste
    useAuthStore.getState().user = null;
    useAuthStore.getState().isAuthenticated = false;
    useAuthStore.getState().isLoading = false;
    useAuthStore.getState().error = null;
    useAuthStore.getState().accessToken = null;
    useAuthStore.getState().refreshToken = null;

    // Limpa os mocks
    jest.clearAllMocks();
  });

  const mockUser = {
    id: '1',
    name: 'Usuário Teste',
    email: 'teste@example.com',
    avatar: null,
  };

  const mockTokens = {
    accessToken: 'mock-access-token',
    refreshToken: 'mock-refresh-token',
  };

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useAuthStore());

    expect(result.current.user).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(result.current.isLoading).toBe(false);
    expect(result.current.error).toBeNull();
    expect(result.current.accessToken).toBeNull();
    expect(result.current.refreshToken).toBeNull();
  });

  it('should set user and authentication state when login is successful', () => {
    const { result } = renderHook(() => useAuthStore());

    act(() => {
      result.current.setUser(mockUser);
      result.current.setTokens(mockTokens);
      result.current.setIsAuthenticated(true);
    });

    expect(result.current.user).toEqual(mockUser);
    expect(result.current.accessToken).toBe(mockTokens.accessToken);
    expect(result.current.refreshToken).toBe(mockTokens.refreshToken);
    expect(result.current.isAuthenticated).toBe(true);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('@auth_user', JSON.stringify(mockUser));
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('@auth_tokens', JSON.stringify(mockTokens));
  });

  it('should clear user and authentication state when logout is called', () => {
    const { result } = renderHook(() => useAuthStore());

    // Primeiro, definimos o estado como autenticado
    act(() => {
      result.current.setUser(mockUser);
      result.current.setTokens(mockTokens);
      result.current.setIsAuthenticated(true);
    });

    // Depois, chamamos o logout
    act(() => {
      result.current.logout();
    });

    // Verificamos se o estado foi limpo
    expect(result.current.user).toBeNull();
    expect(result.current.accessToken).toBeNull();
    expect(result.current.refreshToken).toBeNull();
    expect(result.current.isAuthenticated).toBe(false);
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@auth_user');
    expect(AsyncStorage.removeItem).toHaveBeenCalledWith('@auth_tokens');
  });

  it('should set loading state correctly', () => {
    const { result } = renderHook(() => useAuthStore());

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
    const { result } = renderHook(() => useAuthStore());
    const errorMessage = 'Erro de autenticação';

    act(() => {
      result.current.setError(errorMessage);
    });

    expect(result.current.error).toBe(errorMessage);

    act(() => {
      result.current.clearError();
    });

    expect(result.current.error).toBeNull();
  });

  it('should update tokens correctly', () => {
    const { result } = renderHook(() => useAuthStore());
    const newTokens = {
      accessToken: 'new-access-token',
      refreshToken: 'new-refresh-token',
    };

    // Primeiro, definimos os tokens iniciais
    act(() => {
      result.current.setTokens(mockTokens);
    });

    expect(result.current.accessToken).toBe(mockTokens.accessToken);
    expect(result.current.refreshToken).toBe(mockTokens.refreshToken);

    // Depois, atualizamos os tokens
    act(() => {
      result.current.setTokens(newTokens);
    });

    expect(result.current.accessToken).toBe(newTokens.accessToken);
    expect(result.current.refreshToken).toBe(newTokens.refreshToken);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith('@auth_tokens', JSON.stringify(newTokens));
  });
});