import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import UserIcon from "../../src/components/UserIcon";
import { ThemeContext } from "../../src/contexts/ThemeContext";

// Mock dos hooks de navegação
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
}));

describe("UserIcon", () => {
  // Mock do contexto de tema
  const mockTheme = {
    theme: {
      primary: "#5956E9",
      background: "#121212",
      card: "#1E1E1E",
      text: "#FFFFFF",
      border: "#333333",
      notification: "#FFCC00",
      secondaryText: "#AAAAAA",
      iconBackground: "#2A2A2A",
    },
    isDarkMode: true,
    toggleTheme: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly", () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockTheme}>
        <UserIcon />
      </ThemeContext.Provider>
    );

    // Verifica se o ícone de pessoa está presente
    const personIcon = getByTestId("user-icon");
    expect(personIcon.props.name).toBe("person");
  });

  it("navigates to profile when pressed", () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockTheme}>
        <UserIcon />
      </ThemeContext.Provider>
    );

    // Simula o clique no botão
    const navigateMock = require("@react-navigation/native").useNavigation()
      .navigate;
    fireEvent.press(getByTestId("user-icon-button"));

    // Verifica se a navegação foi chamada com os parâmetros corretos
    expect(navigateMock).toHaveBeenCalledWith("Cupons", {
      screen: "Profile",
    });
  });

  it("renders with custom size when provided", () => {
    const customSize = 32;
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockTheme}>
        <UserIcon size={customSize} />
      </ThemeContext.Provider>
    );

    // Verifica se o ícone tem o tamanho personalizado
    const icon = getByTestId("user-icon");
    expect(icon.props.size).toBe(customSize);
  });
});
