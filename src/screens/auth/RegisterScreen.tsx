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
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useAuth } from "../../contexts/AuthContext";
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
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // Obtém o estado e as ações de autenticação do contexto
  const { register, isLoading, error, clearError } = useAuth();

  /**
   * Manipula o envio do formulário de registro
   */
  const handleSubmit = async () => {
    // Validação básica
    if (
      !name.trim() ||
      !email.trim() ||
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
    await register({ name, email, password, confirmPassword });
  };

  /**
   * Navega para a tela de login
   */
  const handleLogin = () => {
    clearError();
    navigation.navigate("Login");
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#121212" }}>
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
            <View style={{ marginBottom: 32, alignItems: "center" }}>
              <Text
                style={{
                  fontSize: 30,
                  fontWeight: "bold",
                  color: "white",
                  marginBottom: 8,
                }}
              >
                Criar Conta
              </Text>
              <Text style={{ fontSize: 16, color: "#9ca3af" }}>
                Preencha os dados para se cadastrar
              </Text>
            </View>

            {/* Exibe mensagem de erro, se houver */}
            {error && (
              <View
                style={{
                  marginBottom: 16,
                  padding: 12,
                  backgroundColor: "rgba(127, 29, 29, 0.3)",
                  borderRadius: 8,
                }}
              >
                <Text style={{ color: "#f87171", textAlign: "center" }}>
                  {error}
                </Text>
              </View>
            )}

            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: "white", fontSize: 16, marginBottom: 8 }}>
                Nome
              </Text>
              <TextInput
                style={{
                  backgroundColor: "#1E1E1E",
                  color: "white",
                  padding: 16,
                  borderRadius: 8,
                }}
                placeholder="Seu nome completo"
                placeholderTextColor="#666"
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: "white", fontSize: 16, marginBottom: 8 }}>
                Email
              </Text>
              <TextInput
                style={{
                  backgroundColor: "#1E1E1E",
                  color: "white",
                  padding: 16,
                  borderRadius: 8,
                }}
                placeholder="Seu email"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View style={{ marginBottom: 16 }}>
              <Text style={{ color: "white", fontSize: 16, marginBottom: 8 }}>
                Senha
              </Text>
              <TextInput
                style={{
                  backgroundColor: "#1E1E1E",
                  color: "white",
                  padding: 16,
                  borderRadius: 8,
                }}
                placeholder="Sua senha"
                placeholderTextColor="#666"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View style={{ marginBottom: 24 }}>
              <Text style={{ color: "white", fontSize: 16, marginBottom: 8 }}>
                Confirmar Senha
              </Text>
              <TextInput
                style={{
                  backgroundColor: "#1E1E1E",
                  color: "white",
                  padding: 16,
                  borderRadius: 8,
                }}
                placeholder="Confirme sua senha"
                placeholderTextColor="#666"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <TouchableOpacity
              style={{
                backgroundColor: "#5956E9",
                paddingVertical: 16,
                borderRadius: 8,
                alignItems: "center",
                marginBottom: 16,
              }}
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text
                  style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
                >
                  Criar Conta
                </Text>
              )}
            </TouchableOpacity>

            <View style={{ flexDirection: "row", justifyContent: "center" }}>
              <Text style={{ color: "#9ca3af", marginRight: 4 }}>
                Já tem uma conta?
              </Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text style={{ color: "#5956E9" }}>Fazer login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
