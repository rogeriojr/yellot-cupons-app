import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
// Navegação
import AppNavigator from "./src/navigation/AppNavigator";
// Contextos
import { AuthProvider } from "./src/contexts/AuthContext";
import { ThemeProvider } from "./src/contexts/ThemeContext";

export default function App() {
  return (
    <SafeAreaProvider>
      <AuthProvider>
        <ThemeProvider>
          <AppNavigator />
        </ThemeProvider>
      </AuthProvider>
    </SafeAreaProvider>
  );
}
