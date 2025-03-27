import React, { createContext, useContext, useEffect, ReactNode } from "react";
import { useAuthStore } from "../store/useAuthStore";
import {
  LoginCredentials,
  RegisterData,
  User,
  AuthStatus,
} from "../types/auth";

/**
 * Interface para o contexto de autenticação
 */
interface AuthContextType {
  // Estado
  user: User | null;
  status: AuthStatus;
  error: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;

  // Ações
  login: (credentials: LoginCredentials) => Promise<void>;
  register: (data: RegisterData) => Promise<void>;
  logout: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (
    token: string,
    password: string,
    confirmPassword: string
  ) => Promise<void>;
  clearError: () => void;
}

// Cria o contexto de autenticação
const AuthContext = createContext<AuthContextType | undefined>(undefined);

/**
 * Hook para utilizar o contexto de autenticação
 */
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de um AuthProvider");
  }

  return context;
};

/**
 * Props para o provedor de autenticação
 */
interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provedor do contexto de autenticação
 */
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const {
    user,
    status,
    error,
    login: storeLogin,
    register: storeRegister,
    logout: storeLogout,
    forgotPassword: storeForgotPassword,
    resetPassword: storeResetPassword,
    clearError: storeClearError,
  } = useAuthStore();

  // Verifica se o usuário está autenticado
  const isAuthenticated = !!user;
  
  // Verifica se está carregando
  const isLoading = status === "loading";

  // Funções de autenticação
  const login = async (credentials: LoginCredentials) => {
    await storeLogin(credentials);
  };

  const register = async (data: RegisterData) => {
    await storeRegister(data);
  };

  const logout = async () => {
    await storeLogout();
  };

  const forgotPassword = async (email: string) => {
    await storeForgotPassword(email);
  };

  const resetPassword = async (
    token: string,
    password: string,
    confirmPassword: string
  ) => {
    await storeResetPassword(token, password, confirmPassword);
  };

  const clearError = () => {
    storeClearError();
  };

  // Valores e funções expostos pelo contexto
  const value = {
    user,
    status,
    error,
    isAuthenticated,
    isLoading,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
