import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  Alert,
  SafeAreaView,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { useTheme } from "../../contexts/ThemeContext";
import { AuthStackParamList } from "../../types/navigation";
import { authService } from "../../services/implementations/AuthService";

type ResetPasswordRouteProp = RouteProp<AuthStackParamList, "ResetPassword">;

const ResetPasswordScreen: React.FC = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const route = useRoute<ResetPasswordRouteProp>();
  const { theme } = useTheme();

  // Token de redefinição de senha (normalmente seria passado via parâmetros de rota)
  const token = route.params?.token || "";

  const handleResetPassword = async () => {
    if (!password.trim() || !confirmPassword.trim()) {
      Alert.alert("Erro", "Por favor, preencha todos os campos.");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Erro", "As senhas não coincidem.");
      return;
    }

    if (password.length < 6) {
      Alert.alert("Erro", "A senha deve ter pelo menos 6 caracteres.");
      return;
    }

    setIsLoading(true);

    try {
      await authService.resetPassword(token, password, confirmPassword);

      Alert.alert("Senha redefinida", "Sua senha foi redefinida com sucesso.", [
        { text: "OK", onPress: () => navigation.navigate("Login" as never) },
      ]);
    } catch (error) {
      Alert.alert(
        "Erro",
        "Não foi possível redefinir sua senha. Tente novamente."
      );
    } finally {
      setIsLoading(false);
    }
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
          <View style={{ flex: 1, padding: 20, justifyContent: "center" }}>
            <Text style={[styles.title, { color: theme.text }]}>
              Redefinir Senha
            </Text>
            <Text style={[styles.subtitle, { color: theme.secondaryText }]}>
              Digite sua nova senha
            </Text>

            <View style={styles.formContainer}>
              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.card,
                    color: theme.text,
                    borderColor: theme.border,
                  },
                ]}
                placeholder="Nova senha"
                placeholderTextColor={theme.secondaryText}
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />

              <TextInput
                style={[
                  styles.input,
                  {
                    backgroundColor: theme.card,
                    color: theme.text,
                    borderColor: theme.border,
                  },
                ]}
                placeholder="Confirme a nova senha"
                placeholderTextColor={theme.secondaryText}
                secureTextEntry
                value={confirmPassword}
                onChangeText={setConfirmPassword}
              />

              <TouchableOpacity
                style={[styles.button, { backgroundColor: theme.primary }]}
                onPress={handleResetPassword}
                disabled={isLoading}
              >
                {isLoading ? (
                  <ActivityIndicator size="small" color="#FFFFFF" />
                ) : (
                  <Text style={styles.buttonText}>Redefinir Senha</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.linkButton}
                onPress={() => navigation.navigate("Login" as never)}
              >
                <Text style={[styles.linkText, { color: theme.primary }]}>
                  Voltar para o login
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
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
  },
  formContainer: {
    width: "100%",
  },
  input: {
    height: 50,
    borderWidth: 1,
    borderRadius: 8,
    marginBottom: 16,
    paddingHorizontal: 12,
    fontSize: 16,
  },
  button: {
    height: 50,
    borderRadius: 8,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  linkButton: {
    marginTop: 20,
    alignItems: "center",
  },
  linkText: {
    fontSize: 16,
  },
});

export default ResetPasswordScreen;
