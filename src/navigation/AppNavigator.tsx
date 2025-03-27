import React, { useState, useEffect } from "react";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { Ionicons } from "@expo/vector-icons";
import { View, Text, ActivityIndicator, Alert } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAuth } from "../contexts/AuthContext";

// Screens
import CouponsScreen from "../screens/CouponsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import CouponDetailScreen from "../screens/CouponDetailScreen";
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
const TabNavigator: React.FC = () => {
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
        tabBarActiveTintColor: "#FFCC00",
        tabBarInactiveTintColor: "#888888",
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#1E1E1E",
          borderTopColor: "#333333",
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
      <Tab.Screen name="Cupons" component={CouponsScreen} />
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
      <Tab.Screen
        name="CouponDetail"
        component={CouponDetailScreen}
        options={{
          tabBarButton: () => null,
          tabBarVisible: false,
        }}
      />
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
        options={{ title: "Entrar" }}
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
  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#121212",
      }}
    >
      <Text style={{ color: "#FFFFFF", fontSize: 16 }}>Em desenvolvimento</Text>
    </View>
  );
};

/**
 * Navegador principal da aplicação
 * Decide qual navegador exibir com base no estado de autenticação
 */
const AppNavigator: React.FC = () => {
  const { isAuthenticated, isLoading, login } = useAuth();
  const [showAlert, setShowAlert] = useState(true);

  // Função para realizar login automático com o usuário de teste
  const handleAutoLogin = async () => {
    try {
      await login({
        email: "user@yellot.mob",
        password: "123456789",
      });
    } catch (error) {
      console.error("Auto login error:", error);
      Alert.alert("Erro", "Não foi possível realizar o login automático.");
    }
  };

  // Exibe o alerta de MVP ao iniciar o aplicativo apenas se não houver usuário no storage
  useEffect(() => {
    const checkUserInStorage = async () => {
      try {
        const userInStorage = await AsyncStorage.getItem("@yellot_user");
        if (!userInStorage && !isAuthenticated && !isLoading && showAlert) {
          Alert.alert(
            "Aplicativo MVP de Teste",
            "Este aplicativo é um MVP de teste. Clique em continuar para poder utilizar o usuário teste.",
            [
              {
                text: "Continuar",
                onPress: () => {
                  setShowAlert(false);
                  handleAutoLogin();
                },
              },
            ],
            { cancelable: false }
          );
        }
      } catch (error) {
        console.error("Erro ao verificar usuário no storage:", error);
      }
    };

    checkUserInStorage();
  }, [isAuthenticated, isLoading, showAlert]);

  // Exibe um indicador de carregamento enquanto verifica a autenticação
  if (isLoading) {
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
