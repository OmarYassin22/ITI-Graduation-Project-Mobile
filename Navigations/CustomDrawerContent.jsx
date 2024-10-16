import React, { useEffect, useState } from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../styles";
import { useTranslation } from "react-i18next";
import { Text } from "react-native-paper";
import AsyncStorage from "@react-native-async-storage/async-storage";


function CustomDrawerContent({ navigation }) {
  const [type, setType] = useState(null);
  const { t } = useTranslation();
  const currentRoute =
    navigation.getState().routeNames[navigation.getState().index];

  async function fetchUserData() {
    try {
      const storedType = await AsyncStorage.getItem("type");
      setType(storedType);
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  }

  useEffect(() => {
    fetchUserData();
  }, []); 

  return (
    <DrawerContentScrollView>
      <DrawerItem
        label={t("drawer.home")}
        icon={({ color, size }) => (
          <Icon name="home-outline" size={size} color={color} />
        )}
        focused={currentRoute === "Home"}
        onPress={() => navigation.navigate("Home")}
        style={styles.selectedItem}
      />
      
      <DrawerItem
        label={t("drawer.settings")}
        icon={({ color, size }) => (
          <Icon name="settings-outline" size={size} color={color} />
        )}
        focused={currentRoute === "Settings"}
        onPress={() => navigation.navigate("Settings")}
        style={styles.selectedItem}
      />

      <DrawerItem
        label={t("drawer.login")}
        icon={({ color, size }) => (
          <Icon name="log-in-outline" size={size} color={color} />
        )}
        focused={currentRoute === "Login"}
        onPress={() => navigation.navigate("Login")}
        style={styles.selectedItem}
      />
    </DrawerContentScrollView>
  );
}
export default CustomDrawerContent;
