import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { useTheme } from "../contexts/ThemeContext";
import { useCouponHistoryStore } from "../store/useCouponHistoryStore";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { Coupon } from "../types/coupon";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  CouponDetail: { coupon: Coupon };
};

type HistoryScreenNavigationProp = StackNavigationProp<RootStackParamList>;

const HistoryScreen: React.FC = () => {
  const navigation = useNavigation<HistoryScreenNavigationProp>();
  const { theme } = useTheme();
  const { viewedCoupons, clearHistory } = useCouponHistoryStore();

  const renderCouponItem = ({ item }: { item: Coupon }) => {
    const expireDate = new Date(item.expire_at);
    const formattedExpireDate = format(expireDate, "dd/MM/yyyy", {
      locale: ptBR,
    });

    const handleCouponPress = () => {
      navigation.navigate("CouponDetail", { coupon: item });
    };

    return (
      <TouchableOpacity
        style={[styles.couponItem, { backgroundColor: theme.card }]}
        onPress={handleCouponPress}
      >
        <View style={styles.couponHeader}>
          <Text style={[styles.couponCode, { color: theme.text }]}>
            {item.code}
          </Text>
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: item.is_active
                  ? theme.statusActive
                  : theme.statusInactive,
              },
            ]}
          />
        </View>
        <View style={styles.couponDetails}>
          <Text style={[styles.couponValue, { color: theme.text }]}>
            {item.type === "percentage"
              ? `${item.value}%`
              : `R$ ${item.value.toFixed(2).replace(".", ",")}`}
          </Text>
          <Text style={[styles.couponExpire, { color: theme.secondaryText }]}>
            Expira em: {formattedExpireDate}
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Histórico de Cupons
        </Text>
        {viewedCoupons.length > 0 && (
          <TouchableOpacity onPress={clearHistory}>
            <Ionicons name="trash-outline" size={24} color={theme.text} />
          </TouchableOpacity>
        )}
      </View>

      {viewedCoupons.length > 0 ? (
        <FlatList
          data={viewedCoupons}
          renderItem={renderCouponItem}
          keyExtractor={(item) => item.code}
          contentContainerStyle={styles.listContainer}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons
            name="receipt-outline"
            size={64}
            color={theme.secondaryText}
          />
          <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
            Nenhum cupom visualizado ainda
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: "bold",
  },
  listContainer: {
    padding: 16,
  },
  couponItem: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
  },
  couponHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  couponCode: {
    fontSize: 16,
    fontWeight: "bold",
  },
  statusDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },
  couponDetails: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  couponValue: {
    fontSize: 14,
    fontWeight: "500",
  },
  couponExpire: {
    fontSize: 12,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
  },
});

export default HistoryScreen;
