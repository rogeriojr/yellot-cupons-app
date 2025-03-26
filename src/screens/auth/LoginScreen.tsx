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
      Alert.alert("Erro", error);
      clearError();
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

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        <ScrollView
          contentContainerStyle={styles.scrollView}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.logoContainer}>
            <Image
              source={require("../../../assets/images/yerllog-mobile.jpg")}
              style={styles.logo}
              resizeMode="contain"
            />
          </View>

          <Text style={[styles.title, { color: theme.text }]}>Login</Text>

          <View style={styles.formContainer}>
            <View
              style={[
                styles.inputContainer,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.inputLabel, { color: theme.secondaryText }]}>
                Email
              </Text>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Seu email"
                placeholderTextColor={theme.secondaryText}
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
                editable={!isSubmitting}
              />
            </View>

            <View
              style={[
                styles.inputContainer,
                { backgroundColor: theme.card, borderColor: theme.border },
              ]}
            >
              <Text style={[styles.inputLabel, { color: theme.secondaryText }]}>
                Senha
              </Text>
              <TextInput
                style={[styles.input, { color: theme.text }]}
                placeholder="Sua senha"
                placeholderTextColor={theme.secondaryText}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
                editable={!isSubmitting}
              />
            </View>

            <TouchableOpacity
              style={[styles.forgotPasswordButton]}
              onPress={navigateToForgotPassword}
              disabled={isSubmitting}
            >
              <Text
                style={[styles.forgotPasswordText, { color: theme.primary }]}
              >
                Esqueceu sua senha?
              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.loginButton, { backgroundColor: theme.primary }]}
              onPress={handleSubmit}
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <ActivityIndicator size="small" color="#FFFFFF" />
              ) : (
                <Text style={styles.loginButtonText}>Entrar</Text>
              )}
            </TouchableOpacity>

            <View style={styles.registerContainer}>
              <Text
                style={[styles.registerText, { color: theme.secondaryText }]}
              >
                Não tem uma conta?
              </Text>
              <TouchableOpacity
                onPress={navigateToRegister}
                disabled={isSubmitting}
              >
                <Text style={[styles.registerLink, { color: theme.primary }]}>
                  {" "}
                  Cadastre-se
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
