import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
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
 * Props para a tela de registro
 */
type RegisterScreenProps = NativeStackScreenProps<
  AuthStackParamList,
  "Register"
>;

/**
 * Tela de registro
 * Permite que o usuário crie uma nova conta
 */
const RegisterScreen: React.FC<RegisterScreenProps> = ({ navigation }) => {
  // Estado local para os campos do formulário
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [cpf, setCpf] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Obtém o estado e as ações de autenticação do contexto
  const { register, status, error, clearError } = useAuth();
  const { theme } = useTheme();

  /**
   * Manipula o envio do formulário de registro
   */
  const handleSubmit = async () => {
    // Exibe mensagem de funcionalidade em desenvolvimento
    Alert.alert("Aviso", "Funcionalidade em desenvolvimento");
    return;

    // Código abaixo será executado quando a funcionalidade estiver pronta
    /*
    // Validação básica
    if (
      !name.trim() ||
      !email.trim() ||
      !cpf.trim() ||
      !birthdate.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      Alert.alert("Erro", "Por favor, preencha todos os campos");
      return;
    }

    // Valida se as senhas coincidem
    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem");
      return;
    }

    // Tenta registrar o usuário
    setIsSubmitting(true);
    try {
      await register({ name, email, password, confirmPassword });
    } catch (error) {
      console.error("Register error:", error);
    } finally {
      setIsSubmitting(false);
    }
    */
  };

  /**
   * Navega para a tela de login
   */
  const handleLogin = () => {
    clearError();
    navigation.navigate("Login");
  };

  // Formata o CPF enquanto o usuário digita
  const formatCPF = (text: string) => {
    // Remove todos os caracteres não numéricos
    const cleaned = text.replace(/\D/g, "");

    // Aplica a máscara de CPF (XXX.XXX.XXX-XX)
    let formatted = cleaned;
    if (cleaned.length > 3) {
      formatted = cleaned.substring(0, 3) + "." + cleaned.substring(3);
    }
    if (cleaned.length > 6) {
      formatted = formatted.substring(0, 7) + "." + formatted.substring(7);
    }
    if (cleaned.length > 9) {
      formatted = formatted.substring(0, 11) + "-" + formatted.substring(11);
    }

    return formatted.substring(0, 14); // Limita ao tamanho máximo de um CPF formatado
  };

  // Formata a data de nascimento enquanto o usuário digita
  const formatBirthdate = (text: string) => {
    // Remove todos os caracteres não numéricos
    const cleaned = text.replace(/\D/g, "");

    // Aplica a máscara de data (DD/MM/AAAA)
    let formatted = cleaned;
    if (cleaned.length > 2) {
      formatted = cleaned.substring(0, 2) + "/" + cleaned.substring(2);
    }
    if (cleaned.length > 4) {
      formatted = formatted.substring(0, 5) + "/" + formatted.substring(5);
    }

    return formatted.substring(0, 10); // Limita ao tamanho máximo de uma data formatada
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
            }}
          >
            {/* Logo */}
            <View style={{ alignItems: "center", marginBottom: 32 }}>
              <Image
                source={require("../../../assets/images/splash-icon.jpg")}
                style={{ width: 100, height: 100, borderRadius: 50 }}
                resizeMode="contain"
              />
              <Text
                style={{
                  fontSize: 24,
                  fontWeight: "bold",
                  color: theme.text,
                  marginTop: 8,
                }}
              >
                Criar Conta
              </Text>
            </View>

            {/* Formulário de registro */}
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
                placeholder="Nome completo"
                placeholderTextColor={theme.secondaryText}
                value={name}
                onChangeText={setName}
                autoCapitalize="words"
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
                placeholder="CPF"
                placeholderTextColor={theme.secondaryText}
                value={cpf}
                onChangeText={(text) => setCpf(formatCPF(text))}
                keyboardType="numeric"
                maxLength={14}
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
                placeholder="Data de nascimento (DD/MM/AAAA)"
                placeholderTextColor={theme.secondaryText}
                value={birthdate}
                onChangeText={(text) => setBirthdate(formatBirthdate(text))}
                keyboardType="numeric"
                maxLength={10}
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
                placeholder="Confirmar senha"
                placeholderTextColor={theme.secondaryText}
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                secureTextEntry
              />

              <TouchableOpacity
                style={{
                  backgroundColor: theme.primary,
                  borderRadius: 8,
                  padding: 16,
                  alignItems: "center",
                  marginTop: 8,
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
                    Registrar
                  </Text>
                )}
              </TouchableOpacity>
            </View>

            {/* Link para login */}
            <View style={{ alignItems: "center" }}>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Text style={{ color: theme.secondaryText, marginRight: 4 }}>
                  Já tem uma conta?
                </Text>
                <TouchableOpacity onPress={handleLogin}>
                  <Text style={{ color: theme.primary, fontWeight: "bold" }}>
                    Faça login
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
