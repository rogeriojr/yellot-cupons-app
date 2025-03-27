import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../contexts/AuthContext";
import { useTheme } from "../contexts/ThemeContext";
import ThemeToggle from "../components/ThemeToggle";
import UserIcon from "../components/UserIcon";

// Screens
import CouponsScreen from "../screens/CouponsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CouponDetailScreen from "../screens/CouponDetailScreen";
import HistoryScreen from "../screens/HistoryScreen";
import {
  LoginScreen,
  RegisterScreen,
  ForgotPasswordScreen,
  ResetPasswordScreen,
  TermsScreen,
} from "../screens/auth";

// Types
import { RootTabParamList, AuthStackParamList } from "../types/navigation";

// Define o tema escuro para a navegação
const DarkTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    primary: "#5956E9",
    background: "#121212",
    card: "#1E1E1E",
    text: "#FFFFFF",
    border: "#333333",
    notification: "#FFCC00",
  },
};

// Navegador de abas para usuários autenticados
const Tab = createBottomTabNavigator<RootTabParamList>();

// Navegador de pilha para autenticação
const AuthStack = createNativeStackNavigator<AuthStackParamList>();

/**
 * Navegador de abas para usuários autenticados
 */
// Stack Navigator para as telas dentro da navegação autenticada
const MainStack = createNativeStackNavigator();

// Stack Navigator para as telas de cupons
const CouponStack: React.FC = () => {
  return (
    <MainStack.Navigator
      screenOptions={{
        headerShown: false,
      }}
    >
      <MainStack.Screen name="CouponsMain" component={CouponsScreen} />
      <MainStack.Screen name="CouponDetail" component={CouponDetailScreen} />
      <MainStack.Screen name="Profile" component={ProfileScreen} />
    </MainStack.Navigator>
  );
};

const TabNavigator: React.FC = () => {
  const { theme } = useTheme();

  return (
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
        component={CouponStack}
        options={{
          headerShown: true,
          headerTitle: "",
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
      <Tab.Screen name="Histórico" component={HistoryScreen} />
      <Tab.Screen name="Carteira" component={PlaceholderScreen} />
    </Tab.Navigator>
  );
};

/**
 * Navegador de autenticação para usuários não autenticados
 */
const AuthNavigator: React.FC = () => {
  return (
    <AuthStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: "#1E1E1E",
        },
        headerTintColor: "#FFFFFF",
        headerTitleStyle: {
          fontWeight: "bold",
        },
        contentStyle: {
          backgroundColor: "#121212",
        },
      }}
    >
      <AuthStack.Screen
        name="Login"
        component={LoginScreen}
        options={{ title: "" }}
      />
      <AuthStack.Screen
        name="Register"
        component={RegisterScreen}
        options={{ title: "Criar Conta" }}
      />
      <AuthStack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ title: "Recuperar Senha" }}
      />
      <AuthStack.Screen
        name="ResetPassword"
        component={ResetPasswordScreen}
        options={{ title: "Redefinir Senha" }}
      />
      <AuthStack.Screen
        name="Terms"
        component={TermsScreen}
        options={{ headerShown: false }}
      />
    </AuthStack.Navigator>
  );
};

// Placeholder para as telas não implementadas
const PlaceholderScreen: React.FC = () => {
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
      <Text style={{ color: theme.text, fontSize: 16 }}>
        Em desenvolvimento
      </Text>
    </View>
  );
};

/**
 * Navegador principal da aplicação
 * Decide qual navegador exibir com base no estado de autenticação
 */
const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const [isCheckingAuth, setIsCheckingAuth] = useState(true);

  // Função para realizar login automático com o usuário de teste
  const handleAutoLogin = async () => {
    try {
      setIsCheckingAuth(true);
      await login({
        email: "user@yellot.mob",
        password: "123456789",
      });
    } catch (error) {
      console.error("Auto login error:", error);
    } finally {
      setIsCheckingAuth(false);
    }
  };

  // Exibe o alerta de MVP sempre que o usuário não estiver autenticado
  useEffect(() => {
    const showMvpAlert = async () => {
      if (!isAuthenticated && !isLoading) {
        await new Promise((resolve) => setTimeout(resolve, 500)); // Pequeno delay para garantir a transição

        Alert.alert(
          "Aplicativo MVP de Teste",
          "Este aplicativo é um MVP de teste. Deseja utilizar o usuário teste?",
          [
            {
              text: "Cancelar",
              onPress: () => setIsCheckingAuth(false),
              style: "cancel",
            },
            {
              text: "Continuar",
              onPress: handleAutoLogin,
            },
          ],
          { cancelable: false }
        );
      }
    };

    showMvpAlert();
  }, [isAuthenticated, isLoading]);

  // Exibe um indicador de carregamento enquanto verifica a autenticação
  if (isLoading || isCheckingAuth) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#121212",
        }}
      >
        <ActivityIndicator size="large" color="#5956E9" />
      </View>
    );
  }

  return (
    <NavigationContainer theme={DarkTheme}>
      {isAuthenticated ? <TabNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  );
};

export default AppNavigator;
