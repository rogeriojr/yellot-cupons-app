import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useCouponStore } from "../store/useCouponStore";
import { FilterDays } from "../types/coupon";
import { useTheme } from "../contexts/ThemeContext";

const FilterBar: React.FC = () => {
  const { filterDays, setFilterDays } = useCouponStore();

  const filters: { label: string; value: FilterDays }[] = [
    { label: "07 dias", value: 7 },
    { label: "15 dias", value: 15 },
    { label: "30 dias", value: 30 },
    { label: "90 dias", value: 90 },
  ];

  const { theme } = useTheme();

  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        paddingVertical: 12,
        paddingHorizontal: 16,
        backgroundColor: theme.card,
      }}
    >
      <View style={{ flexDirection: "row", gap: 8 }}>
        {filters.map((filter) => (
          <TouchableOpacity
            key={filter.value}
            onPress={() =>
              setFilterDays(filter.value === filterDays ? null : filter.value)
            }
            style={{
              paddingHorizontal: 16,
              paddingVertical: 6,
              borderRadius: 20,
              backgroundColor: theme.filterBackground,
              borderWidth: filterDays === filter.value ? 1 : 0,
              borderColor: theme.filterBorder,
            }}
          >
            <Text
              style={{
                fontSize: 12,
                fontWeight: "500",
                color:
                  filterDays === filter.value
                    ? theme.filterActiveText
                    : theme.filterInactiveText,
              }}
            >
              {filter.label}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );
};

export default FilterBar;
