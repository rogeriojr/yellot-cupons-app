import React from "react";
import { View, Text } from "react-native";
import { useCouponStore } from "../store/useCouponStore";
import { useTheme } from "../contexts/ThemeContext";

const CouponHeader: React.FC = () => {
  const { coupons } = useCouponStore();

  const totalCoupons = coupons.length;
  const activeCoupons = coupons.filter((coupon) => coupon.is_active).length;

  // Calcular a porcentagem de cupons ativos
  const activePercentage =
    totalCoupons > 0 ? (activeCoupons / totalCoupons) * 100 : 0;

  // Formatar o número total de cupons para sempre ter 2 dígitos
  const formattedTotal = totalCoupons.toString().padStart(2, "0");

  const { theme } = useTheme();

  return (
    <View style={{ backgroundColor: theme.card, padding: 16, marginBottom: 8 }}>
      <Text
        style={{
          fontSize: 20,
          fontWeight: "bold",
          color: theme.text,
          marginBottom: 16,
          textAlign: "center",
        }}
      >
        Cupons
      </Text>

      <View
        style={{
          backgroundColor: theme.background,
          borderRadius: 8,
          padding: 16,
          marginBottom: 8,
        }}
      >
        <View style={{ marginBottom: 16 }}>
          <Text
            style={{
              fontSize: 14,
              color: theme.secondaryText,
              marginBottom: 4,
            }}
          >
            Total
          </Text>
          <Text style={{ fontSize: 36, fontWeight: "bold", color: theme.text }}>
            {formattedTotal}
          </Text>
        </View>

        <View style={{ marginBottom: 8 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              marginBottom: 4,
            }}
          >
            <Text style={{ fontSize: 14, color: theme.secondaryText }}>
              Cupons disponíveis
            </Text>
            <Text
              style={{ fontSize: 14, fontWeight: "500", color: theme.text }}
            >
              {activeCoupons.toString().padStart(2, "0")}
            </Text>
          </View>

          <View
            style={{
              height: 8,
              backgroundColor: theme.border,
              borderRadius: 4,
              overflow: "hidden",
            }}
          >
            <View
              style={{
                height: "100%",
                backgroundColor: theme.statusActive,
                borderRadius: 4,
                width: `${activePercentage}%`,
              }}
            />
          </View>
        </View>
      </View>
    </View>
  );
};

export default CouponHeader;
