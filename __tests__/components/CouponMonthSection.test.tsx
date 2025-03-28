import React from "react";
import { render } from "@testing-library/react-native";
import CouponMonthSection from "../../src/components/CouponMonthSection";
import { ThemeContext } from "../../src/contexts/ThemeContext";

// Mock do componente CouponCard para evitar dependências externas
jest.mock("../../src/components/CouponCard", () => {
  return function MockCouponCard(props: any) {
    return (
      <mock-coupon-card data-testid={`coupon-card-${props.coupon.code}`} />
    );
  };
});

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
  },
  toggleTheme: jest.fn(),
};

describe("CouponMonthSection", () => {
  it("renders month title correctly", () => {
    const mockCoupons = [
      {
        code: "TESTE10",
        type: "percentage",
        value: 10,
        expire_at: new Date(2023, 5, 15).toISOString(), // 15 de junho de 2023
        is_active: true,
        max_use: 1,
        used: 0,
        max_apply_date: null,
      },
      {
        code: "TESTE20",
        type: "fixed",
        value: 20,
        expire_at: new Date(2023, 5, 20).toISOString(), // 20 de junho de 2023
        is_active: true,
        max_use: 1,
        used: 0,
        max_apply_date: null,
      },
    ];

    const { getByText, getAllByTestId } = render(
      <ThemeContext.Provider value={mockTheme}>
        <CouponMonthSection month="junho" coupons={mockCoupons} />
      </ThemeContext.Provider>
    );

    // Verifica se o título do mês é exibido corretamente
    expect(getByText("junho 2023")).toBeTruthy();

    // Verifica se todos os cupons são renderizados
    const couponCards = getAllByTestId(/coupon-card-/i);
    expect(couponCards.length).toBe(2);
  });

  it("renders empty section when no coupons are provided", () => {
    const { getByText, queryAllByTestId } = render(
      <ThemeContext.Provider value={mockTheme}>
        <CouponMonthSection month="julho" coupons={[]} />
      </ThemeContext.Provider>
    );

    // Verifica se o título do mês é exibido corretamente
    expect(getByText("julho 2023")).toBeTruthy();

    // Verifica se nenhum cupom é renderizado
    const couponCards = queryAllByTestId(/coupon-card-/i);
    expect(couponCards.length).toBe(0);
  });
});
