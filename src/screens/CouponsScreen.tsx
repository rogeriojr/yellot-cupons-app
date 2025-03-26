import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
  StatusBar,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useCouponStore } from "../store/useCouponStore";
import { CouponHeader, FilterBar, CouponMonthSection } from "../components";
import { groupCouponsByMonth } from "../utils/couponUtils";
import { useTheme } from "../contexts/ThemeContext";

const CouponsScreen: React.FC = () => {
  const { filteredCoupons, isLoading, error, fetchCoupons } = useCouponStore();

  useEffect(() => {
    fetchCoupons();
  }, []);

  const couponsByMonth = groupCouponsByMonth(filteredCoupons);
  const monthKeys = Object.keys(couponsByMonth);

  const handleRefresh = () => {
    fetchCoupons();
  };

  const { theme, isDarkMode } = useTheme();

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />
      <CouponHeader />
      <FilterBar />

      {isLoading ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            backgroundColor: theme.card,
          }}
        >
          <ActivityIndicator size="large" color={theme.notification} />
          <Text style={{ marginTop: 8, color: theme.secondaryText }}>
            Carregando cupons...
          </Text>
        </View>
      ) : error ? (
        <View
          style={{
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
            padding: 16,
            backgroundColor: theme.card,
          }}
        >
          <Text
            style={{ color: "#FF6B6B", textAlign: "center", marginBottom: 16 }}
          >
            {error}
          </Text>
          <Text
            style={{ color: theme.notification, fontWeight: "500" }}
            onPress={fetchCoupons}
          >
            Tentar novamente
          </Text>
        </View>
      ) : (
        <ScrollView
          style={{
            flex: 1,
            paddingHorizontal: 16,
            paddingTop: 16,
            backgroundColor: theme.card,
          }}
          refreshControl={
            <RefreshControl
              refreshing={isLoading}
              onRefresh={handleRefresh}
              colors={[theme.notification]}
              tintColor={theme.notification}
              titleColor={theme.text}
            />
          }
        >
          {monthKeys.length > 0 ? (
            monthKeys.map((month) => (
              <CouponMonthSection
                key={month}
                month={month}
                coupons={couponsByMonth[month]}
              />
            ))
          ) : (
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
                paddingVertical: 32,
              }}
            >
              <Text style={{ color: theme.secondaryText, textAlign: "center" }}>
                Nenhum cupom encontrado
              </Text>
            </View>
          )}
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default CouponsScreen;
