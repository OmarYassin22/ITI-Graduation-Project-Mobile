import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../styles";
import { useTranslation } from 'react-i18next';

// eslint-disable-next-line react/prop-types
function CustomDrawerContent({ navigation, isDarkMode }) {
  const { t } = useTranslation(); 
  const currentRoute =
    // eslint-disable-next-line react/prop-types
    navigation.getState().routeNames[navigation.getState().index];
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label={t('drawer.home')}
        icon={({ color, size }) => (
          <Icon name="home-outline" size={size} color={color} />
        )}
        focused={currentRoute === "Home"}
        // eslint-disable-next-line react/prop-types
        onPress={() => navigation.navigate("Home")}
        style={styles.selectedItem}
      />
      <DrawerItem
        label={t('drawer.profile')}
        icon={({ color, size }) => (
          <Icon name="person-outline" size={size} color={color} />
        )}
        focused={currentRoute === "Profile"}
        onPress={() => navigation.navigate("Profile")}
        style={styles.selectedItem}
      />

      {/* <DrawerItem
        label="About Us"
        icon={({ color, size }) => <Icon name="book-outline" size={size} color={color} />}
        focused={currentRoute === "About Us"}
        onPress={() => navigation.navigate('About Us')}
        style={styles.selectedItem}
      /> */}
      {/* <DrawerItem
        label="Buyer"
        icon={({ color, size }) => (
          <Icon name="cart-outline" size={size} color={color} />
        )}
        focused={currentRoute === "Buyer"}
        onPress={() => navigation.navigate("Buyer")}
        style={styles.selectedItem}
      /> */}

      {/* <DrawerItem
        label="Student"
        icon={({ color, size }) => (
          <Icon name="person-outline" size={size} color={color} />
        )}
        focused={currentRoute === "Student"}
        onPress={() => navigation.navigate("Student")}
      ></DrawerItem> */}

      <DrawerItem
        label={t('drawer.settings')}
        icon={({ color, size }) => (
          <Icon name="settings-outline" size={size} color={color} />
        )}
        focused={currentRoute === "Settings"}
        onPress={() => navigation.navigate("Settings")}
        style={styles.selectedItem}
      />

      {/* <DrawerItem
        label="Instructor"
        icon={({ color, size }) => (
          <Icon name="log-in-outline" size={size} color={color} />
        )}
        focused={currentRoute === "Instructor"}
        onPress={() => navigation.navigate("Instructor")}
        style={styles.selectedItem}
      /> */}

      <DrawerItem
        label={t('drawer.login')}
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
