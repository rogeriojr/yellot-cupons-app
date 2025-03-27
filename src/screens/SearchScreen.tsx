import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  ScrollView,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useTheme } from "../contexts/ThemeContext";
import { useCouponStore } from "../store/useCouponStore";
import { Ionicons } from "@expo/vector-icons";

const SearchScreen: React.FC = () => {
  const { theme } = useTheme();
  const { coupons } = useCouponStore();
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCoupons, setFilteredCoupons] = useState(coupons);
  const [selectedFilter, setSelectedFilter] = useState("all");
  const [showFilters, setShowFilters] = useState(false);

  // Opções de filtro traduzidas
  const filterOptions = [
    { value: "all", label: "Todos" },
    { value: "code", label: "Código" },
    { value: "type", label: "Tipo" },
    { value: "value", label: "Valor" },
    { value: "active", label: "Ativos" },
    { value: "expired", label: "Expirados" },
  ];

  // Traduz os tipos de cupom
  const translateType = (type: string) => {
    const types: Record<string, string> = {
      percentage: "Porcentagem",
      fixed: "Valor fixo",
      free_shipping: "Frete grátis",
    };
    return types[type] || type;
  };

  // Aplica os filtros
  useEffect(() => {
    let results = [...coupons];

    // Filtra por termo de busca
    if (searchTerm) {
      results = results.filter((coupon) => {
        const term = searchTerm.toLowerCase();

        switch (selectedFilter) {
          case "code":
            return coupon.code.toLowerCase().includes(term);
          case "type":
            return translateType(coupon.type).toLowerCase().includes(term);
          case "value":
            return coupon.value.toString().includes(term);
          default:
            return (
              coupon.code.toLowerCase().includes(term) ||
              coupon.type.toLowerCase().includes(term) ||
              coupon.value.toString().includes(term)
            );
        }
      });
    }

    // Filtros especiais
    if (selectedFilter === "active") {
      results = results.filter((c) => c.is_active);
    } else if (selectedFilter === "expired") {
      const now = new Date();
      results = results.filter((c) => new Date(c.expire_at) < now);
    }

    setFilteredCoupons(results);
  }, [searchTerm, selectedFilter, coupons]);

  const renderItem = ({ item }: { item: any }) => (
    <View style={[styles.couponCard, { backgroundColor: theme.card }]}>
      <View style={styles.couponHeader}>
        <Text style={[styles.couponCode, { color: theme.primary }]}>
          {item.code}
        </Text>
        <Text style={[styles.couponType, { color: theme.secondaryText }]}>
          {translateType(item.type)}
        </Text>
      </View>

      <View style={styles.couponBody}>
        <Text style={[styles.couponValue, { color: theme.text }]}>
          {item.type === "percentage"
            ? `${item.value}% de desconto`
            : `R$ ${item.value.toFixed(2).replace(".", ",")} off`}
        </Text>

        <Text
          style={[
            styles.couponExpiry,
            {
              color: new Date(item.expire_at) < new Date() ? "red" : "green",
            },
          ]}
        >
          {new Date(item.expire_at) < new Date() ? "Expirado" : "Válido até"}{" "}
          {new Date(item.expire_at).toLocaleDateString()}
        </Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={[styles.searchContainer, { backgroundColor: theme.card }]}>
        <View style={styles.searchBar}>
          <Ionicons
            name="search"
            size={20}
            color={theme.secondaryText}
            style={styles.searchIcon}
          />
          <TextInput
            style={[styles.searchInput, { color: theme.text }]}
            placeholder="Pesquise um cupom"
            placeholderTextColor={theme.secondaryText}
            value={searchTerm}
            onChangeText={setSearchTerm}
          />
          <TouchableOpacity
            onPress={() => setShowFilters(!showFilters)}
            style={styles.filterButton}
          >
            <Ionicons
              name="filter"
              size={20}
              color={showFilters ? theme.primary : theme.secondaryText}
            />
          </TouchableOpacity>
        </View>

        {showFilters && (
          <View
            style={[styles.filterContainer, { backgroundColor: theme.card }]}
          >
            <Text style={[styles.filterLabel, { color: theme.text }]}>
              Filtrar por:
            </Text>
            <Picker
              selectedValue={selectedFilter}
              onValueChange={(itemValue: any) => setSelectedFilter(itemValue)}
              style={[styles.picker, { color: theme.text }]}
              dropdownIconColor={theme.text}
            >
              {filterOptions.map((option) => (
                <Picker.Item
                  key={option.value}
                  label={option.label}
                  value={option.value}
                />
              ))}
            </Picker>
          </View>
        )}
      </View>

      {filteredCoupons.length > 0 ? (
        <FlatList
          data={filteredCoupons}
          renderItem={renderItem}
          keyExtractor={(item) => item.code}
          contentContainerStyle={styles.listContent}
        />
      ) : (
        <View style={styles.emptyContainer}>
          <Ionicons name="sad-outline" size={48} color={theme.secondaryText} />
          <Text style={[styles.emptyText, { color: theme.secondaryText }]}>
            Nenhum cupom encontrado com esses filtros
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  searchContainer: {
    padding: 16,
    borderBottomWidth: 1,
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 8,
    paddingHorizontal: 12,
    height: 48,
  },
  searchInput: {
    flex: 1,
    height: "100%",
    paddingHorizontal: 12,
    fontSize: 16,
  },
  searchIcon: {
    marginRight: 8,
  },
  filterButton: {
    padding: 8,
  },
  filterContainer: {
    marginTop: 12,
  },
  filterLabel: {
    fontSize: 14,
    marginBottom: 8,
  },
  picker: {
    width: "100%",
  },
  listContent: {
    padding: 16,
    paddingBottom: 32,
    gap: 16,
  },
  couponCard: {
    borderRadius: 8,
    padding: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  couponHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  couponCode: {
    fontSize: 16,
    fontWeight: "bold",
  },
  couponType: {
    fontSize: 14,
  },
  couponBody: {
    marginTop: 8,
  },
  couponValue: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 4,
  },
  couponExpiry: {
    fontSize: 14,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 32,
  },
  emptyText: {
    fontSize: 16,
    marginTop: 16,
    textAlign: "center",
  },
});

export default SearchScreen;
