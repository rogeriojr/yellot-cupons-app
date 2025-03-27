import "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { View, ActivityIndicator, Text } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";

// Screens
import CouponsScreen from "./src/screens/CouponsScreen";
import ProfileScreen from "./src/screens/ProfileScreen";

// Navegação
import AppNavigator from "./src/navigation/AppNavigator";

// Contextos
import { AuthProvider } from "./src/contexts/AuthContext";
import { ThemeProvider, useTheme } from "./src/contexts/ThemeContext";

// Types
import { RootTabParamList } from "./src/types/navigation";

// Components
import ThemeToggle from "./src/components/ThemeToggle";
import UserIcon from "./src/components/UserIcon";

const Tab = createBottomTabNavigator<RootTabParamList>();

const AppContent = () => {
  const { theme, isDarkMode } = useTheme();

  // Cria o tema baseado no contexto de tema
  const navigationTheme = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      primary: theme.primary,
      background: theme.background,
      card: theme.card,
      text: theme.text,
      border: theme.border,
      notification: theme.notification,
    },
  };

  return (
    <NavigationContainer theme={navigationTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            let iconName: keyof typeof Ionicons.glyphMap = "home";

            if (route.name === "Cupons") {
              iconName = "ticket";
            } else if (route.name === "Procurar") {
              iconName = "flash";
            } else if (route.name === "Histórico") {
              iconName = "list";
            } else if (route.name === "Carteira") {
              iconName = "wallet";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
          tabBarActiveTintColor: theme.notification,
          tabBarInactiveTintColor: theme.secondaryText,
          headerShown: false,
          tabBarStyle: {
            backgroundColor: theme.card,
            borderTopColor: theme.border,
            paddingTop: 5,
            height: 60,
            paddingBottom: 8,
          },
          tabBarLabelStyle: {
            fontSize: 12,
            marginTop: -5,
          },
        })}
      >
        <Tab.Screen
          name="Cupons"
          component={CouponsScreen}
          options={{
            headerShown: true,
            headerTitle: "Cupons",
            headerStyle: {
              backgroundColor: theme.card,
            },
            headerTitleStyle: {
              color: theme.text,
            },
            headerRight: () => (
              <View style={{ flexDirection: "row", marginRight: 16, gap: 8 }}>
                <ThemeToggle />
                <UserIcon />
              </View>
            ),
          }}
        />
        <Tab.Screen name="Procurar" component={PlaceholderScreen} />
        <Tab.Screen name="Histórico" component={PlaceholderScreen} />
        <Tab.Screen name="Carteira" component={PlaceholderScreen} />
        <Tab.Screen
          name="Profile"
          component={ProfileScreen}
          options={{
            tabBarButton: () => null,
            tabBarVisible: false,
          }}
        />
      </Tab.Navigator>
      <StatusBar style={isDarkMode ? "light" : "dark"} />
    </NavigationContainer>
  );
};

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <AppContent />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}

// Placeholder para as telas não implementadas
const PlaceholderScreen = () => {
  const { theme } = useTheme();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme.background,
      }}
    >
      <Text style={{ color: theme.text }}>Em breve</Text>
    </View>
  );
};
