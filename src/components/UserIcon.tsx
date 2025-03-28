import React from "react";
import { TouchableOpacity, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useTheme } from "../contexts/ThemeContext";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { RootTabParamList } from "../types/navigation";

interface UserIconProps {
  size?: number;
}

const UserIcon: React.FC<UserIconProps> = ({ size = 24 }) => {
  const { theme } = useTheme();
  const navigation =
    useNavigation<NativeStackNavigationProp<RootTabParamList>>();

  const handlePress = () => {
    navigation.navigate("Cupons", {
      screen: "Profile",
    });
  };

  return (
    <TouchableOpacity
      testID="user-icon-button"
      onPress={handlePress}
      style={{
        padding: 8,
        borderRadius: 20,
        backgroundColor: theme.iconBackground,
      }}
    >
      <View>
        <Ionicons
          testID="user-icon"
          name="person"
          size={size}
          color={theme.primary}
        />
      </View>
    </TouchableOpacity>
  );
};

export default UserIcon;
