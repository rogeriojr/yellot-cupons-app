import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";

interface ThemeToggleProps {
  size?: number;
}

const ThemeToggle: React.FC<ThemeToggleProps> = ({ size = 24 }) => {
  const { isDarkMode, toggleTheme, theme } = useTheme();

  return (
    <TouchableOpacity
      testID="theme-toggle-button"
      onPress={toggleTheme}
      style={{
        padding: 8,
        borderRadius: 20,
        backgroundColor: theme.iconBackground,
      }}
    >
      <View>
        {isDarkMode ? (
          <Ionicons
            testID="theme-toggle-icon"
            name="sunny"
            size={size}
            color={theme.statusActive}
          />
        ) : (
          <Ionicons
            testID="theme-toggle-icon"
            name="moon"
            size={size}
            color={theme.primary}
          />
        )}
      </View>
    </TouchableOpacity>
  );
};

export default ThemeToggle;
