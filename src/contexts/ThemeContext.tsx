import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useColorScheme } from "react-native";

// Definição dos temas
export const lightTheme = {
  primary: "#5956E9",
  background: "#F5F5F5",
  card: "#FFFFFF",
  text: "#121212",
  border: "#E0E0E0",
  notification: "#FFCC00",
  secondaryText: "#666666",
  filterBackground: "#EEEEEE",
  filterBorder: "#5956E9",
  filterActiveText: "#121212",
  filterInactiveText: "#666666",
  statusActive: "#FFCC00",
  statusInactive: "#FF6B6B",
  iconBackground: "#EEEEEE",
};

export const darkTheme = {
  primary: "#5956E9",
  background: "#121212",
  card: "#1E1E1E",
  text: "#FFFFFF",
  border: "#333333",
  notification: "#FFCC00",
  secondaryText: "#AAAAAA",
  filterBackground: "#333333",
  filterBorder: "#FFCC00",
  filterActiveText: "#FFFFFF",
  filterInactiveText: "#AAAAAA",
  statusActive: "#FFCC00",
  statusInactive: "#FF6B6B",
  iconBackground: "#333333",
};

type Theme = typeof lightTheme;

interface ThemeContextType {
  theme: Theme;
  isDarkMode: boolean;
  toggleTheme: () => void;
}

// Exportando o ThemeContext para ser usado nos testes
export const ThemeContext = createContext<ThemeContextType | undefined>(
  undefined
);

const THEME_STORAGE_KEY = "@yellot_theme_mode";

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const deviceTheme = useColorScheme();
  // Definindo o tema dark como padrão, independente do tema do dispositivo
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);

  // Carregar preferência de tema salva
  useEffect(() => {
    const loadThemePreference = async () => {
      try {
        const savedTheme = await AsyncStorage.getItem(THEME_STORAGE_KEY);
        if (savedTheme !== null) {
          setIsDarkMode(savedTheme === "dark");
        }
      } catch (error) {
        console.error("Erro ao carregar preferência de tema:", error);
      }
    };

    loadThemePreference();
  }, []);

  // Alternar entre temas e salvar preferência
  const toggleTheme = async () => {
    try {
      const newThemeValue = !isDarkMode;
      setIsDarkMode(newThemeValue);
      await AsyncStorage.setItem(
        THEME_STORAGE_KEY,
        newThemeValue ? "dark" : "light"
      );
    } catch (error) {
      console.error("Erro ao salvar preferência de tema:", error);
    }
  };

  const theme = isDarkMode ? darkTheme : lightTheme;

  return (
    <ThemeContext.Provider value={{ theme, isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme deve ser usado dentro de um ThemeProvider");
  }

  return context;
};
