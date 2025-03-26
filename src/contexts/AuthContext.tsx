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
 * Provedor de autenticação
 * Fornece o contexto de autenticação para toda a aplicação
 */
export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  // Obtém o estado e as ações da store de autenticação
  const {
    user,
    status,
    error,
    login,
    register,
    logout,
    forgotPassword,
    resetPassword,
    checkAuth,
    clearError,
  } = useAuthStore();

  // Verifica a autenticação ao montar o componente
  useEffect(() => {
    checkAuth();
  }, []);

  // Valores derivados
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  // Valor do contexto
  const value: AuthContextType = {
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
