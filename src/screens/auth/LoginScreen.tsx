import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
import { useTheme } from "../../contexts/ThemeContext";
import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { AuthStackParamList } from "../../types/navigation";
import { Ionicons } from "@expo/vector-icons";

/**
 * Props para a tela de login
 */
type LoginScreenProps = NativeStackScreenProps<AuthStackParamList, "Login">;

/**
 * Tela de login
 * Permite que o usuário faça login na aplicação
 */
const LoginScreen: React.FC<LoginScreenProps> = ({ navigation }) => {
  // Estado local para os campos do formulário
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Obtém o estado e as ações de autenticação do contexto
  const { login, status, error, clearError } = useAuth();
  const { theme } = useTheme();

  // Monitora mudanças no status de autenticação
  useEffect(() => {
    if (status === "error" && error) {
      const timer = setTimeout(() => {
        Alert.alert("Erro", error);
        clearError();
      }, 5000); // 5000 milissegundos = 5 segundos

      return () => clearTimeout(timer); // Limpa o timer se o componente for desmontado
    }
    setIsSubmitting(status === "loading");
  }, [status, error]);

  /**
   * Valida os campos do formulário
   * @returns Verdadeiro se os campos são válidos
   */
  const validateForm = (): boolean => {
    if (!email.trim()) {
      Alert.alert("Erro", "Por favor, informe seu email");
      return false;
    }

    if (!password.trim()) {
      Alert.alert("Erro", "Por favor, informe sua senha");
      return false;
    }

    // Validação básica de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      Alert.alert("Erro", "Por favor, informe um email válido");
      return false;
    }

    return true;
  };

  // Função para realizar login automático com o usuário de teste
  const handleAutoLogin = async () => {
    try {
      await login({
        email: "user@yellot.mob",
        password: "123456789",
      });
    } catch (error) {
      console.error("Auto login error:", error);
    }
  };

  /**
   * Manipula o envio do formulário de login
   */
  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      setIsSubmitting(true);
      await login({ email, password });
    } catch (err) {
      console.error("Login error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  /**
   * Navega para a tela de registro
   */
  const navigateToRegister = () => {
    clearError();
    navigation.navigate("Register");
  };

  /**
   * Navega para a tela de recuperação de senha
   */
  const navigateToForgotPassword = () => {
    clearError();
    navigation.navigate("ForgotPassword");
  };

  /**
   * Navega para a tela de termos
   */
  const navigateToTerms = () => {
    clearError();
    navigation.navigate("Terms");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: theme.background }}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View
            style={{
              flex: 1,
              paddingHorizontal: 24,
              paddingVertical: 32,
              justifyContent: "center",
            }}
          >
            {/* Logo */}
            <View style={{ alignItems: "center", marginBottom: 40 }}>
              <Image
                source={require("../../../assets/images/splash-icon.jpg")}
                style={{ width: 150, height: 150, borderRadius: 75 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: theme.text,
                  marginTop: 16,
                }}
              >
                Yellot Cupons
              </Text>
              <TouchableOpacity
                style={{
                  backgroundColor: theme.primary,
                  flexDirection: "row",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingVertical: 12,
                  paddingHorizontal: 32,
                  borderRadius: 8,
                  marginTop: 16,
                }}
                onPress={handleAutoLogin}
              >
                <Ionicons
                  name="bug-outline"
                  size={20}
                  color="#fff"
                  style={{ marginRight: 10 }}
                />
                <Text
                  style={{ color: "#fff", fontSize: 16, fontWeight: "bold" }}
                >
                  Logar como testador
                </Text>
              </TouchableOpacity>
            </View>

            {/* Formulário de login */}
            <View style={{ marginBottom: 24 }}>
              <TextInput
                style={{
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderRadius: 8,
                  padding: 16,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: theme.border,
                }}
                placeholder="Email"
                placeholderTextColor={theme.secondaryText}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
              />

              <TextInput
                style={{
                  backgroundColor: theme.card,
                  color: theme.text,
                  borderRadius: 8,
                  padding: 16,
                  marginBottom: 16,
                  borderWidth: 1,
                  borderColor: theme.border,
                }}
                placeholder="Senha"
                placeholderTextColor={theme.secondaryText}
                value={password}
                onChangeText={setPassword}
                secureTextEntry
              />

              <TouchableOpacity
                style={{
                  backgroundColor: theme.primary,
                  borderRadius: 8,
                  padding: 16,
                  alignItems: "center",
                }}
                onPress={handleSubmit}
                disabled={isSubmitting}
              >
                {isSubmitting ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text
                    style={{
                      color: "#FFFFFF",
                      fontWeight: "bold",
                      fontSize: 16,
                    }}
                  >
                    Entrar
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Links */}
            <View style={{ alignItems: "center" }}>
              <TouchableOpacity
                onPress={navigateToForgotPassword}
                style={{ marginBottom: 16 }}
              >
                <Text
                  style={{
                    color: theme.primary,
                    fontSize: 14,
                  }}
                >
                  Esqueci minha senha
                </Text>
              </TouchableOpacity>

              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                  marginBottom: 16,
                }}
              >
                <Text style={{ color: theme.secondaryText, marginRight: 4 }}>
                  Não tem uma conta?
                </Text>
                <TouchableOpacity onPress={navigateToRegister}>
                  <Text style={{ color: theme.primary, fontWeight: "bold" }}>
                    Registre-se
                  </Text>
                </TouchableOpacity>
              </View>

              <TouchableOpacity onPress={navigateToTerms}>
                <Text
                  style={{
                    color: theme.secondaryText,
                    fontSize: 12,
                    textAlign: "center",
                  }}
                >
                  Ao continuar, você concorda com nossos{" "}
                  <Text style={{ color: theme.primary }}>
                    Termos e Condições
                  </Text>
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    justifyContent: "center",
    padding: 20,
  },
  logoContainer: {
    alignItems: "center",
    marginBottom: 40,
  },
  logo: {
    width: 150,
    height: 150,
    borderRadius: 75,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 24,
    textAlign: "center",
  },
  formContainer: {
    width: "100%",
  },
  inputContainer: {
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    padding: 12,
  },
  inputLabel: {
    fontSize: 12,
    marginBottom: 4,
  },
  input: {
    fontSize: 16,
    height: 24,
  },
  forgotPasswordButton: {
    alignSelf: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    fontSize: 14,
  },
  loginButton: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 16,
  },
  loginButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  registerContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  registerText: {
    fontSize: 14,
  },
  registerLink: {
    fontSize: 14,
    fontWeight: "bold",
  },
});

export default LoginScreen;
