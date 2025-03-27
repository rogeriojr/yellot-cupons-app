import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useTheme } from "../contexts/ThemeContext";
import { Coupon } from "../types/coupon";

type CouponDetailRouteProps = RouteProp<
  { CouponDetail: { coupon: Coupon } },
  "CouponDetail"
>;

const CouponDetailScreen: React.FC = () => {
  const navigation = useNavigation();
  const route = useRoute<CouponDetailRouteProps>();
  const { coupon } = route.params;
  const { theme } = useTheme();

  const isActive = coupon.is_active;
  const expireDate = new Date(coupon.expire_at);
  const formattedExpireDate = format(
    expireDate,
    "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
    {
      locale: ptBR,
    }
  );

  const maxApplyDate = coupon.max_apply_date
    ? format(
        new Date(coupon.max_apply_date),
        "dd 'de' MMMM 'de' yyyy 'às' HH:mm",
        { locale: ptBR }
      )
    : "Não definida";

  const getDiscountTypeText = () => {
    if (coupon.type === "percentage") {
      return "Desconto em %";
    } else if (coupon.type === "fixed") {
      return "Desconto fixo";
    } else {
      return coupon.type;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={24} color={theme.text} />
        </TouchableOpacity>
        <Text style={[styles.headerTitle, { color: theme.text }]}>
          Detalhes do Cupom
        </Text>
        <View style={{ width: 24 }} />
      </View>

      <ScrollView style={styles.container}>
        <View
          style={[
            styles.couponCodeContainer,
            { backgroundColor: theme.iconBackground },
          ]}
        >
          <Text style={[styles.couponCode, { color: theme.text }]}>
            {coupon.code}
          </Text>
        </View>

        <View
          style={[
            styles.statusContainer,
            {
              backgroundColor: isActive
                ? "rgba(255, 204, 0, 0.1)"
                : "rgba(255, 107, 107, 0.1)",
            },
          ]}
        >
          <View
            style={[
              styles.statusDot,
              {
                backgroundColor: isActive
                  ? theme.statusActive
                  : theme.statusInactive,
              },
            ]}
          />
          <Text
            style={[
              styles.statusText,
              {
                color: isActive ? theme.statusActive : theme.statusInactive,
              },
            ]}
          >
            {isActive ? "Ativo" : "Expirado"}
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Informações do Cupom
          </Text>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.secondaryText }]}>
              Tipo:
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              {getDiscountTypeText()}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.secondaryText }]}>
              Valor:
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              {coupon.type === "percentage"
                ? `${coupon.value}%`
                : `R$ ${coupon.value.toFixed(2).replace(".", ",")}`}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.secondaryText }]}>
              Data de Expiração:
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              {formattedExpireDate}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.secondaryText }]}>
              Limite de Uso:
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              {coupon.max_use}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.secondaryText }]}>
              Utilizados:
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              {coupon.used}
            </Text>
          </View>

          <View style={styles.infoRow}>
            <Text style={[styles.infoLabel, { color: theme.secondaryText }]}>
              Data Máxima de Aplicação:
            </Text>
            <Text style={[styles.infoValue, { color: theme.text }]}>
              {maxApplyDate}
            </Text>
          </View>
        </View>

        <View style={styles.usageSection}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Uso do Cupom
          </Text>
          <View
            style={[
              styles.progressContainer,
              { backgroundColor: theme.iconBackground },
            ]}
          >
            <View
              style={[
                styles.progressBar,
                {
                  backgroundColor: theme.notification,
                  width: `${(coupon.used / coupon.max_use) * 100}%`,
                },
              ]}
            />
          </View>
          <Text style={[styles.progressText, { color: theme.secondaryText }]}>
            {coupon.used} de {coupon.max_use} utilizados
            {coupon.max_use > 0
              ? ` (${((coupon.used / coupon.max_use) * 100).toFixed(0)}%)`
              : ""}
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
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
  couponCodeContainer: {
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    marginTop: 16,
    marginBottom: 16,
  },
  couponCode: {
    fontSize: 24,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  statusContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    alignSelf: "center",
    marginBottom: 24,
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 6,
  },
  statusText: {
    fontSize: 14,
    fontWeight: "500",
  },
  section: {
    marginBottom: 24,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 12,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: "row",
    marginBottom: 12,
  },
  infoLabel: {
    fontSize: 14,
    fontWeight: "500",
    width: "50%",
  },
  infoValue: {
    fontSize: 14,
    flex: 1,
  },
  usageSection: {
    marginBottom: 32,
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    borderRadius: 12,
    padding: 16,
  },
  progressContainer: {
    height: 12,
    borderRadius: 6,
    overflow: "hidden",
    marginTop: 8,
    marginBottom: 8,
  },
  progressBar: {
    height: "100%",
  },
  progressText: {
    fontSize: 12,
    textAlign: "center",
  },
});

export default CouponDetailScreen;
