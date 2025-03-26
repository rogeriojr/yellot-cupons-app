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
    <SafeAreaView className="flex-1 bg-[#121212]">
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex-1"
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <View className="flex-1 px-6 py-8 justify-center">
            <View className="mb-8 items-center">
              <Text className="text-3xl font-bold text-white mb-2">
                Criar Conta
              </Text>
              <Text className="text-base text-gray-400">
                Preencha os dados para se cadastrar
              </Text>
            </View>

            {/* Exibe mensagem de erro, se houver */}
            {error && (
              <View className="mb-4 p-3 bg-red-900/30 rounded-lg">
                <Text className="text-red-400 text-center">{error}</Text>
              </View>
            )}

            <View className="mb-4">
              <Text className="text-white text-base mb-2">Nome</Text>
              <TextInput
                className="bg-[#1E1E1E] text-white p-4 rounded-lg"
                placeholder="Seu nome completo"
                placeholderTextColor="#666"
                autoCapitalize="words"
                value={name}
                onChangeText={setName}
              />
            </View>

            <View className="mb-4">
              <Text className="text-white text-base mb-2">Email</Text>
              <TextInput
                className="bg-[#1E1E1E] text-white p-4 rounded-lg"
                placeholder="Seu email"
                placeholderTextColor="#666"
                keyboardType="email-address"
                autoCapitalize="none"
                value={email}
                onChangeText={setEmail}
              />
            </View>

            <View className="mb-4">
              <Text className="text-white text-base mb-2">Senha</Text>
              <TextInput
                className="bg-[#1E1E1E] text-white p-4 rounded-lg"
                placeholder="Sua senha"
                placeholderTextColor="#666"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>

            <View className="mb-6">
              <Text className="text-white text-base mb-2">Confirmar Senha</Text>
              <TextInput
                className="bg-[#1E1E1E] text-white p-4 rounded-lg"
                placeholder="Confirme sua senha"
                placeholderTextColor="#666"
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />
            </View>

            <TouchableOpacity
              className="bg-[#5956E9] py-4 rounded-lg items-center mb-4"
              onPress={handleSubmit}
              disabled={isLoading}
            >
              {isLoading ? (
                <ActivityIndicator color="#FFFFFF" />
              ) : (
                <Text className="text-white font-bold text-base">
                  Criar Conta
                </Text>
              )}
            </TouchableOpacity>

            <View className="flex-row justify-center">
              <Text className="text-gray-400 mr-1">Já tem uma conta?</Text>
              <TouchableOpacity onPress={handleLogin}>
                <Text className="text-[#5956E9]">Fazer login</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default RegisterScreen;
