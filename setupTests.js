import "@testing-library/jest-native/extend-expect";
import "jest-styled-components";

// Mock para animações do React Native
jest.mock("react-native/Libraries/Animated/NativeAnimatedHelper");

// Mock para o AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
  removeItem: jest.fn(),
  clear: jest.fn(),
}));

// Configuração global para testes
global.fetch = jest.fn();

// Suprimir warnings de console durante testes
console.error = jest.fn();
console.warn = jest.fn();
