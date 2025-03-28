import React from "react";
import { renderHook, act } from "@testing-library/react-hooks";
import {
  ThemeContext,
  ThemeProvider,
  lightTheme,
  darkTheme,
} from "../../src/contexts/ThemeContext";
import AsyncStorage from "@react-native-async-storage/async-storage";

// Mock do AsyncStorage
jest.mock("@react-native-async-storage/async-storage", () => ({
  getItem: jest.fn(),
  setItem: jest.fn(),
}));

// Mock do useColorScheme
jest.mock("react-native", () => {
  const reactNative = jest.requireActual("react-native");
  return {
    ...reactNative,
    useColorScheme: jest.fn().mockReturnValue("dark"),
  };
});

describe("ThemeContext", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with dark theme by default", async () => {
    // Configura o mock para retornar null (nenhuma preferência salva)
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue(null);

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result, waitForNextUpdate } = renderHook(
      () => React.useContext(ThemeContext),
      {
        wrapper,
      }
    );

    // Espera a atualização após o useEffect
    await waitForNextUpdate();

    // Verifica se o tema inicial é o dark
    expect(result.current.isDarkMode).toBe(true);
    expect(result.current.theme).toEqual(darkTheme);
  });

  it("should load saved theme preference from AsyncStorage", async () => {
    // Configura o mock para retornar uma preferência salva (light)
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("light");

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result, waitForNextUpdate } = renderHook(
      () => React.useContext(ThemeContext),
      {
        wrapper,
      }
    );

    // Espera a atualização após o useEffect
    await waitForNextUpdate();

    // Verifica se o tema carregado é o light
    expect(result.current.isDarkMode).toBe(false);
    expect(result.current.theme).toEqual(lightTheme);
    expect(AsyncStorage.getItem).toHaveBeenCalledWith("@yellot_theme_mode");
  });

  it("should toggle theme and save preference to AsyncStorage", async () => {
    // Configura o mock para retornar uma preferência salva (dark)
    (AsyncStorage.getItem as jest.Mock).mockResolvedValue("dark");

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result, waitForNextUpdate } = renderHook(
      () => React.useContext(ThemeContext),
      {
        wrapper,
      }
    );

    // Espera a atualização após o useEffect
    await waitForNextUpdate();

    // Verifica o tema inicial
    expect(result.current.isDarkMode).toBe(true);
    expect(result.current.theme).toEqual(darkTheme);

    // Alterna o tema
    act(() => {
      result.current.toggleTheme();
    });

    // Verifica se o tema foi alternado para light
    expect(result.current.isDarkMode).toBe(false);
    expect(result.current.theme).toEqual(lightTheme);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@yellot_theme_mode",
      "light"
    );

    // Alterna o tema novamente
    act(() => {
      result.current.toggleTheme();
    });

    // Verifica se o tema foi alternado de volta para dark
    expect(result.current.isDarkMode).toBe(true);
    expect(result.current.theme).toEqual(darkTheme);
    expect(AsyncStorage.setItem).toHaveBeenCalledWith(
      "@yellot_theme_mode",
      "dark"
    );
  });

  it("should handle AsyncStorage errors gracefully", async () => {
    // Configura o mock para lançar um erro
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();
    (AsyncStorage.getItem as jest.Mock).mockRejectedValue(
      new Error("Storage error")
    );

    const wrapper = ({ children }: { children: React.ReactNode }) => (
      <ThemeProvider>{children}</ThemeProvider>
    );

    const { result, waitForNextUpdate } = renderHook(
      () => React.useContext(ThemeContext),
      {
        wrapper,
      }
    );

    // Espera a atualização após o useEffect
    await waitForNextUpdate();

    // Verifica se o tema padrão é usado quando há um erro
    expect(result.current.isDarkMode).toBe(true);
    expect(result.current.theme).toEqual(darkTheme);
    expect(consoleErrorSpy).toHaveBeenCalled();

    consoleErrorSpy.mockRestore();
  });
});
