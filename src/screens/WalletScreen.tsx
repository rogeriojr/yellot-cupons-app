import React from "react";
import { View, Text, StyleSheet, ScrollView, SafeAreaView } from "react-native";
import { useTheme } from "../contexts/ThemeContext";
import { StatusBar } from "react-native";

const WalletScreen: React.FC = () => {
  const { theme, isDarkMode } = useTheme();

  // Dados simulados
  const walletData = {
    balance: 1250.75,
    savingsFromCoupons: 384.5,
    recentTransactions: [
      {
        id: 1,
        description: "Cupom de R$50 em eletrônicos",
        amount: -50,
        date: "15/06/2023",
      },
      {
        id: 2,
        description: "Economia com cupom de alimentação",
        amount: 32.75,
        date: "12/06/2023",
      },
      {
        id: 3,
        description: "Recarga de saldo",
        amount: 500.0,
        date: "10/06/2023",
      },
      {
        id: 4,
        description: "Cupom de R$30 em vestuário",
        amount: -30,
        date: "08/06/2023",
      },
      {
        id: 5,
        description: "Economia com cupom de supermercado",
        amount: 45.25,
        date: "05/06/2023",
      },
    ],
  };

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <StatusBar
        barStyle={isDarkMode ? "light-content" : "dark-content"}
        backgroundColor={theme.background}
      />

      {/* Banner de desenvolvimento */}
      <View style={[styles.devBanner, { backgroundColor: "#f5f5f5" }]}>
        <Text style={[styles.devText, { color: theme.notification }]}>
          ⚠️ Esta funcionalidade ainda está em desenvolvimento, em breve estará
          ativa e com mais novidades
        </Text>
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        {/* Saldo atual */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.secondaryText }]}>
            Saldo disponível
          </Text>
          <Text style={[styles.balance, { color: theme.text }]}>
            R$ {walletData.balance.toFixed(2).replace(".", ",")}
          </Text>
        </View>

        {/* Economia com cupons */}
        <View style={[styles.card, { backgroundColor: theme.card }]}>
          <Text style={[styles.cardTitle, { color: theme.secondaryText }]}>
            Você já economizou
          </Text>
          <Text style={[styles.savings, { color: theme.statusActive }]}>
            R$ {walletData.savingsFromCoupons.toFixed(2).replace(".", ",")}
          </Text>
          <Text style={[styles.cardSubtitle, { color: theme.secondaryText }]}>
            utilizando cupons nos últimos 3 meses
          </Text>
        </View>

        {/* Histórico de transações */}
        <View style={[styles.section, { backgroundColor: theme.card }]}>
          <Text style={[styles.sectionTitle, { color: theme.text }]}>
            Últimas transações
          </Text>

          {walletData.recentTransactions.map((transaction) => (
            <View key={transaction.id} style={styles.transaction}>
              <View style={styles.transactionInfo}>
                <Text style={[styles.transactionDesc, { color: theme.text }]}>
                  {transaction.description}
                </Text>
                <Text
                  style={[
                    styles.transactionDate,
                    { color: theme.secondaryText },
                  ]}
                >
                  {transaction.date}
                </Text>
              </View>
              <Text
                style={[
                  styles.transactionAmount,
                  {
                    color: transaction.amount > 0 ? "green" : "red",
                  },
                ]}
              >
                {transaction.amount > 0 ? "+" : ""}
                R$ {Math.abs(transaction.amount).toFixed(2).replace(".", ",")}
              </Text>
            </View>
          ))}
        </View>

        {/* Mensagem de simulação */}
        <Text style={[styles.simulationText, { color: theme.secondaryText }]}>
          * Todos os dados nesta tela são simulados para demonstração
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 16,
  },
  devBanner: {
    padding: 12,
    alignItems: "center",
  },
  devText: {
    fontSize: 14,
    fontWeight: "bold",
    textAlign: "center",
  },
  card: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  section: {
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 14,
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 12,
    marginTop: 4,
  },
  balance: {
    fontSize: 32,
    fontWeight: "bold",
    marginVertical: 8,
  },
  savings: {
    fontSize: 28,
    fontWeight: "bold",
    marginVertical: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: "bold",
    marginBottom: 12,
  },
  transaction: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  transactionInfo: {
    flex: 1,
  },
  transactionDesc: {
    fontSize: 14,
  },
  transactionDate: {
    fontSize: 12,
    marginTop: 4,
  },
  transactionAmount: {
    fontSize: 16,
    fontWeight: "bold",
  },
  simulationText: {
    fontSize: 12,
    textAlign: "center",
    marginTop: 8,
  },
});

export default WalletScreen;
