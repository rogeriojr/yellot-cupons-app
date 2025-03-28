import React from "react";
import { render, fireEvent } from "@testing-library/react-native";
import CouponCard from "../../src/components/CouponCard";
import { ThemeContext } from "../../src/contexts/ThemeContext";
import { jest } from "@jest/globals";

// Mock dos hooks de navegação
jest.mock("@react-navigation/native", () => ({
  useNavigation: () => ({
    navigate: jest.fn(),
  }),
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
    statusActive: "#FFCC00",
    statusInactive: "#FF6B6B",
    primary: "#5956E9",
    filterBackground: "#333333",
    filterBorder: "#FFCC00",
    filterActiveText: "#FFFFFF",
    filterInactiveText: "#AAAAAA",
  },
  isDarkMode: true,
  toggleTheme: jest.fn(),
};

// Mock do cupom para testes
const mockCoupon = {
  code: "TESTE10",
  type: "percentage",
  value: 10,
  expire_at: new Date(Date.now() + 10 * 24 * 60 * 60 * 1000).toISOString(),
  is_active: true,
  max_use: 1,
  used: 0,
  max_apply_date: null,
};

describe("CouponCard", () => {
  it("renders correctly with percentage discount", () => {
    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <CouponCard coupon={mockCoupon} />
      </ThemeContext.Provider>
    );

    // Verifica se o código do cupom é exibido
    expect(getByText("TESTE10")).toBeTruthy();

    // Verifica se o tipo de desconto é exibido corretamente
    expect(getByText("Desconto em %")).toBeTruthy();

    // Verifica se o valor do desconto é exibido
    expect(getByText("10%")).toBeTruthy();
  });

  it("renders correctly with fixed discount", () => {
    const fixedCoupon = {
      ...mockCoupon,
      type: "fixed",
      value: 20,
    };

    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <CouponCard coupon={fixedCoupon} />
      </ThemeContext.Provider>
    );

    // Verifica se o tipo de desconto é exibido corretamente
    expect(getByText("Desconto fixo")).toBeTruthy();

    // Verifica se o valor do desconto é exibido
    expect(getByText("R$ 20")).toBeTruthy();
  });

  it("navigates to coupon details when pressed", () => {
    const { getByTestId } = render(
      <ThemeContext.Provider value={mockTheme}>
        <CouponCard coupon={mockCoupon} />
      </ThemeContext.Provider>
    );

    // Simula o clique no card
    const navigateMock = require("@react-navigation/native").useNavigation()
      .navigate;
    fireEvent.press(getByTestId("coupon-card"));

    // Verifica se a navegação foi chamada com os parâmetros corretos
    expect(navigateMock).toHaveBeenCalledWith("Cupons", {
      screen: "CouponDetail",
      params: { coupon: mockCoupon },
    });
  });

  it("displays inactive state correctly", () => {
    const inactiveCoupon = {
      ...mockCoupon,
      is_active: false,
    };

    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <CouponCard coupon={inactiveCoupon} />
      </ThemeContext.Provider>
    );

    // Verifica se o estado inativo é exibido
    expect(getByText("Inativo")).toBeTruthy();
  });
});
