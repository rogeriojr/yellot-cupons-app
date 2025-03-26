import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthTokens, User } from '../types/auth';

// Chaves para armazenamento
const ACCESS_TOKEN_KEY = '@YellotCoupons:accessToken';
const REFRESH_TOKEN_KEY = '@YellotCoupons:refreshToken';
const USER_DATA_KEY = '@YellotCoupons:userData';

/**
 * Armazena os tokens de autenticação no AsyncStorage
 * @param tokens Tokens de autenticação
 */
export const setStoredTokens = async (tokens: AuthTokens): Promise<void> => {
  try {
    await AsyncStorage.setItem(ACCESS_TOKEN_KEY, tokens.accessToken);
    await AsyncStorage.setItem(REFRESH_TOKEN_KEY, tokens.refreshToken);
  } catch (error) {
    console.error('Error storing auth tokens:', error);
    throw new Error('Falha ao armazenar tokens de autenticação');
  }
};

/**
 * Recupera os tokens de autenticação do AsyncStorage
 * @returns Tokens de autenticação ou null se não existirem
 */
export const getStoredTokens = async (): Promise<AuthTokens | null> => {
  try {
    const accessToken = await AsyncStorage.getItem(ACCESS_TOKEN_KEY);
    const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_KEY);

    if (accessToken && refreshToken) {
      return { accessToken, refreshToken };
    }

    return null;
  } catch (error) {
    console.error('Error retrieving auth tokens:', error);
    return null;
  }
};

/**
 * Armazena os dados do usuário no AsyncStorage
 * @param user Dados do usuário
 */
export const setStoredUser = async (user: User): Promise<void> => {
  try {
    await AsyncStorage.setItem(USER_DATA_KEY, JSON.stringify(user));
  } catch (error) {
    console.error('Error storing user data:', error);
    throw new Error('Falha ao armazenar dados do usuário');
  }
};

/**
 * Recupera os dados do usuário do AsyncStorage
 * @returns Dados do usuário ou null se não existirem
 */
export const getStoredUser = async (): Promise<User | null> => {
  try {
    const userData = await AsyncStorage.getItem(USER_DATA_KEY);

    if (userData) {
      return JSON.parse(userData);
    }

    return null;
  } catch (error) {
    console.error('Error retrieving user data:', error);
    return null;
  }
};

/**
 * Remove todos os dados de autenticação do AsyncStorage
 */
export const clearAuthData = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, USER_DATA_KEY]);
  } catch (error) {
    console.error('Error clearing auth data:', error);
    throw new Error('Falha ao limpar dados de autenticação');
  }
};