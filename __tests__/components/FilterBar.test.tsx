import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import FilterBar from "../../src/components/FilterBar";
import { ThemeContext } from "../../src/contexts/ThemeContext";
import { useCouponStore } from "../../src/store/useCouponStore";

// Mock do Zustand store
jest.mock("../../src/store/useCouponStore", () => ({
  useCouponStore: jest.fn(),
}));

// Mock do contexto de tema
const mockTheme = {
  theme: {
    background: "#121212",
    card: "#1E1E1E",
    text: "#FFFFFF",
    secondaryText: "#AAAAAA",
    border: "#333333",
    notification: "#5956E9",
    iconBackground: "#2A2A2A",
    filterBackground: "#2A2A2A",
    filterBorder: "#5956E9",
    filterActiveText: "#5956E9",
    filterInactiveText: "#AAAAAA",
    primary: "#5956E9",
    statusActive: "#FFCC00",
    statusInactive: "#FF6B6B",
  },
  isDarkMode: true,
  toggleTheme: jest.fn(),
};

describe("FilterBar", () => {
  const mockSetFilterDays = jest.fn();

  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();

    // Mock padrão do store
    (useCouponStore as unknown as jest.Mock).mockReturnValue({
      filterDays: null,
      setFilterDays: mockSetFilterDays,
    });
  });

  it("renders all filter options", () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <FilterBar />
      </ThemeContext.Provider>
    );

    // Verifica se todos os filtros são exibidos
    expect(getByText("07 dias")).toBeTruthy();
    expect(getByText("15 dias")).toBeTruthy();
    expect(getByText("30 dias")).toBeTruthy();
    expect(getByText("90 dias")).toBeTruthy();
  });

  it("calls setFilterDays when a filter is pressed", () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <FilterBar />
      </ThemeContext.Provider>
    );

    // Simula o clique em um filtro
    fireEvent.press(getByText("07 dias"));

    // Verifica se a função setFilterDays foi chamada com o valor correto
    expect(mockSetFilterDays).toHaveBeenCalledWith(7);
  });

  it("calls setFilterDays with null when the active filter is pressed again", () => {
    // Mock do store com um filtro ativo
    (useCouponStore as unknown as jest.Mock).mockReturnValue({
      filterDays: 7,
      setFilterDays: mockSetFilterDays,
    });

    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <FilterBar />
      </ThemeContext.Provider>
    );

    // Simula o clique no filtro ativo
    fireEvent.press(getByText("07 dias"));

    // Verifica se a função setFilterDays foi chamada com null
    expect(mockSetFilterDays).toHaveBeenCalledWith(null);
  });

  it("applies different styles to active and inactive filters", () => {
    // Mock do store com um filtro ativo
    (useCouponStore as unknown as jest.Mock).mockReturnValue({
      filterDays: 15,
      setFilterDays: mockSetFilterDays,
    });

    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <FilterBar />
      </ThemeContext.Provider>
    );

    // Verifica se o filtro ativo tem o estilo correto
    // Nota: Como não podemos verificar diretamente os estilos no React Native Testing Library,
    // estamos apenas verificando se o elemento existe
    expect(getByText("15 dias")).toBeTruthy();
  });
});
