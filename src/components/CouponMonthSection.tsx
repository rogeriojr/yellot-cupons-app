import React from "react";
import { View, Text } from "react-native";
import { Coupon } from "../types/coupon";
import CouponCard from "./CouponCard";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useTheme } from "../contexts/ThemeContext";

interface CouponMonthSectionProps {
  month: string;
  coupons: Coupon[];
}

const CouponMonthSection: React.FC<CouponMonthSectionProps> = ({
  month,
  coupons,
}) => {
  // Formatar o mês para exibição
  const monthDate = new Date(month);
  const formattedMonth = format(monthDate, "MMMM", { locale: ptBR });

  const { theme } = useTheme();

  return (
    <View style={{ marginBottom: 24 }}>
      <Text
        style={{
          fontSize: 16,
          fontWeight: "500",
          color: theme.secondaryText,
          marginBottom: 12,
          textTransform: "capitalize",
        }}
      >
        {formattedMonth}
      </Text>
      {coupons.map((coupon) => (
        <CouponCard key={coupon.code} coupon={coupon} />
      ))}
    </View>
  );
};

export default CouponMonthSection;
