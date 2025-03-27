import "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

// Navegação
import AppNavigator from "./src/navigation/AppNavigator";

// Contextos
import { AuthProvider } from "./src/contexts/AuthContext";
import { ThemeProvider } from "./src/contexts/ThemeContext";

// Types
import { RootTabParamList } from "./src/types/navigation";

const Tab = createBottomTabNavigator<RootTabParamList>();

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
