import React from "react";
import { View, Text } from "react-native";
import { Coupon } from "../types/coupon";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useTheme } from "../contexts/ThemeContext";

interface CouponCardProps {
  coupon: Coupon;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
  const isActive = coupon.is_active;
  const expireDate = new Date(coupon.expire_at);
  const formattedDate = format(expireDate, "dd MMM", {
    locale: ptBR,
  });

  const { theme } = useTheme();

  return (
    <View
      style={{ flexDirection: "row", alignItems: "center", marginBottom: 16 }}
    >
      <View
        style={{
          backgroundColor: theme.iconBackground,
          height: 40,
          width: 40,
          borderRadius: 20,
          marginRight: 12,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Text style={{ color: theme.secondaryText, fontSize: 12 }}>$</Text>
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ color: theme.text, fontWeight: "bold" }}>
          {coupon.code}
        </Text>
        <Text style={{ color: theme.secondaryText, fontSize: 12 }}>
          {formattedDate}
        </Text>
      </View>

      <View style={{ flexDirection: "row", alignItems: "center" }}>
        <View
          style={{
            height: 8,
            width: 8,
            borderRadius: 4,
            marginRight: 6,
            backgroundColor: isActive
              ? theme.statusActive
              : theme.statusInactive,
          }}
        />
        <Text
          style={{
            fontSize: 12,
            color: isActive ? theme.statusActive : theme.statusInactive,
          }}
        >
          {isActive ? "Ativo" : "Expirado"}
        </Text>
      </View>
    </View>
  );
};

export default CouponCard;
