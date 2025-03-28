import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import ThemeToggle from "../../src/components/ThemeToggle";
import { ThemeContext } from "../../src/contexts/ThemeContext";
import { jest } from "@jest/globals";

describe("ThemeToggle", () => {
  // Mock do contexto de tema
  const mockLightTheme = {
    theme: {
      primary: "#5956E9",
      background: "#F5F5F5",
      card: "#FFFFFF",
      text: "#121212",
      border: "#E0E0E0",
      notification: "#FFCC00",
      secondaryText: "#666666",
      filterBackground: "#EEEEEE",
      filterBorder: "#5956E9",
      filterActiveText: "#121212",
      filterInactiveText: "#666666",
      statusActive: "#FFCC00",
      statusInactive: "#FF6B6B",
      iconBackground: "#EEEEEE",
    },
    isDarkMode: false,
    toggleTheme: jest.fn(),
  };

  const mockDarkTheme = {
    theme: {
      primary: "#5956E9",
      background: "#121212",
      card: "#1E1E1E",
      text: "#FFFFFF",
      border: "#333333",
      notification: "#FFCC00",
      secondaryText: "#AAAAAA",
      filterBackground: "#333333",
      filterBorder: "#FFCC00",
      filterActiveText: "#FFFFFF",
      filterInactiveText: "#AAAAAA",
      statusActive: "#FFCC00",
      statusInactive: "#FF6B6B",
      iconBackground: "#333333",
    },
    isDarkMode: true,
    toggleTheme: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders correctly in light mode", () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockLightTheme}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    // Verifica se o ícone da lua está presente no modo claro
    const moonIcon = getByTestId("theme-toggle-icon");
    expect(moonIcon.props.name).toBe("moon");
  });

  it("renders correctly in dark mode", () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockDarkTheme}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    // Verifica se o ícone do sol está presente no modo escuro
    const sunIcon = getByTestId("theme-toggle-icon");
    expect(sunIcon.props.name).toBe("sunny");
  });

  it("calls toggleTheme when pressed", () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockLightTheme}>
        <ThemeToggle />
      </ThemeContext.Provider>
    );

    // Simula o clique no botão
    fireEvent.press(getByTestId("theme-toggle-button"));

    // Verifica se a função toggleTheme foi chamada
    expect(mockLightTheme.toggleTheme).toHaveBeenCalledTimes(1);
  });

  it("renders with custom size when provided", () => {
    const customSize = 32;
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockLightTheme}>
        <ThemeToggle size={customSize} />
      </ThemeContext.Provider>
    );

    // Verifica se o ícone tem o tamanho personalizado
    const icon = getByTestId("theme-toggle-icon");
    expect(icon.props.size).toBe(customSize);
  });
});
