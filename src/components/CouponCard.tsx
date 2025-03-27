import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Coupon } from "../types/coupon";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootTabParamList } from "../types/navigation";

interface CouponCardProps {
  coupon: Coupon;
}

const CouponCard: React.FC<CouponCardProps> = ({ coupon }) => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabParamList>>();
  const isActive = coupon.is_active;
  const expireDate = new Date(coupon.expire_at);
  const formattedDate = format(expireDate, "dd MMM", {
    locale: ptBR,
  });

  const { theme } = useTheme();

  const getDiscountTypeText = () => {
    if (coupon.type === "percentage") {
      return "Desconto em %";
    } else if (coupon.type === "fixed") {
      return "Desconto fixo";
    } else {
      return coupon.type;
    }
  };

  const handleViewDetails = () => {
    navigation.navigate("CouponDetail", { coupon });
  };

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
        <Text
          style={{ color: theme.secondaryText, fontSize: 12, marginTop: 4 }}
        >
          {getDiscountTypeText()}
        </Text>
      </View>

      <View style={{ flexDirection: "column", alignItems: "flex-end" }}>
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
            marginBottom: 8,
          }}
        >
          {isActive ? "Ativo" : "Expirado"}
        </Text>

        <TouchableOpacity
          onPress={handleViewDetails}
          style={{
            backgroundColor: theme.primary,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: 4,
          }}
        >
          <Text style={{ color: "#FFFFFF", fontSize: 12 }}>Ver detalhes</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CouponCard;
