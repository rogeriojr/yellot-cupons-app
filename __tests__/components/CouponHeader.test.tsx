import React from "react";
import { render } from "@testing-library/react-native";
import CouponHeader from "../../src/components/CouponHeader";
import { ThemeContext } from "../../src/contexts/ThemeContext";
import { useCouponStore } from "../../src/store/useCouponStore";
import { jest } from "@jest/globals";

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
    statusActive: "#4CAF50",
    statusInactive: "#F44336",
  },
  toggleTheme: jest.fn(),
};

describe("CouponHeader", () => {
  beforeEach(() => {
    // Reset mocks
    jest.clearAllMocks();
  });

  it("renders correctly with no coupons", () => {
    // Mock do store com array vazio de cupons
    (useCouponStore as jest.Mock).mockReturnValue({
      coupons: [],
    });

    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <CouponHeader />
      </ThemeContext.Provider>
    );

    // Verifica se o título é exibido
    expect(getByText("Cupons")).toBeTruthy();

    // Verifica se o total de cupons é exibido como 00
    expect(getByText("00")).toBeTruthy();

    // Verifica se o número de cupons disponíveis é exibido como 00
    expect(getByText("Cupons disponíveis")).toBeTruthy();
    expect(getByText("00")).toBeTruthy();
  });

  it("renders correctly with active and inactive coupons", () => {
    // Mock do store com cupons ativos e inativos
    const mockCoupons = [
      {
        code: "TESTE10",
        type: "percentage",
        value: 10,
        expire_at: new Date(
          Date.now() + 10 * 24 * 60 * 60 * 1000
        ).toISOString(),
        is_active: true,
        max_use: 1,
        used: 0,
        max_apply_date: null,
      },
      {
        code: "TESTE20",
        type: "fixed",
        value: 20,
        expire_at: new Date(
          Date.now() + 20 * 24 * 60 * 60 * 1000
        ).toISOString(),
        is_active: true,
        max_use: 1,
        used: 0,
        max_apply_date: null,
      },
      {
        code: "TESTE30",
        type: "percentage",
        value: 30,
        expire_at: new Date(
          Date.now() - 10 * 24 * 60 * 60 * 1000
        ).toISOString(),
        is_active: false,
        max_use: 1,
        used: 0,
        max_apply_date: null,
      },
    ];

    (useCouponStore as jest.Mock).mockReturnValue({
      coupons: mockCoupons,
    });

    const { getByText } = render(
      <ThemeContext.Provider value={mockTheme}>
        <CouponHeader />
      </ThemeContext.Provider>
    );

    // Verifica se o título é exibido
    expect(getByText("Cupons")).toBeTruthy();

    // Verifica se o total de cupons é exibido como 03
    expect(getByText("03")).toBeTruthy();

    // Verifica se o número de cupons disponíveis é exibido como 02
    expect(getByText("Cupons disponíveis")).toBeTruthy();
    expect(getByText("02")).toBeTruthy();
  });
});
