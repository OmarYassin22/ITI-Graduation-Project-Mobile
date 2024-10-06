import React from "react";
import { DrawerContentScrollView, DrawerItem } from "@react-navigation/drawer";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../styles";

function CustomDrawerContent({ navigation, isDarkMode }) {
  const currentRoute =
    navigation.getState().routeNames[navigation.getState().index];
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="Home"
        icon={({ color, size }) => (
          <Icon name="home-outline" size={size} color={color} />
        )}
        focused={currentRoute === "Home"}
        onPress={() => navigation.navigate("Home")}
        style={styles.selectedItem}
      />
      <DrawerItem
        label="Profile"
        icon={({ color, size }) => (
          <Icon name="person-outline" size={size} color={color} />
        )}
        focused={currentRoute === "Profile"}
        onPress={() => navigation.navigate("Profile")}
        style={styles.selectedItem}
      />
      <DrawerItem
        label="Login"
        icon={({ color, size }) => (
          <Icon name="log-in-outline" size={size} color={color} />
        )}
        focused={currentRoute === "Account"}
        onPress={() => navigation.navigate("Account")}
        style={styles.selectedItem}
      />
      {/* <DrawerItem
        label="About Us"
        icon={({ color, size }) => <Icon name="book-outline" size={size} color={color} />}
        focused={currentRoute === "About Us"}
        onPress={() => navigation.navigate('About Us')}
        style={styles.selectedItem}
      /> */}
      <DrawerItem
        label="Buyer"
        icon={({ color, size }) => (
          <Icon name="cart-outline" size={size} color={color} />
        )}
        focused={currentRoute === "Buyer"}
        onPress={() => navigation.navigate("Buyer")}
        style={styles.selectedItem}
      />

      <DrawerItem
        label="Student"
        icon={({ color, size }) => (
          <Icon name="person-outline" size={size} color={color} />
        )}
        focused={currentRoute === "Student"}
        onPress={() => navigation.navigate("Student")}
      ></DrawerItem>

      <DrawerItem
        label="Settings"
        icon={({ color, size }) => (
          <Icon name="settings-outline" size={size} color={color} />
        )}
        focused={currentRoute === "Settings"}
        onPress={() => navigation.navigate("Settings")}
        style={styles.selectedItem}
      />
      <DrawerItem
        label="Login"
        icon={({ color, size }) => (
          <Icon name="log-in-outline" size={size} color={color} />
        )}
        focused={currentRoute === "Login"}
        onPress={() => navigation.navigate("Login")}
        style={styles.selectedItem}
      />
         <DrawerItem
        label="Scholarship"
        icon={({ color, size }) => <Icon name="cart-outline" size={size} color={color} />}
        focused={currentRoute === 'Scholarship'}
        onPress={() => navigation.navigate('Scholarship')}
        style={styles.selectedItem}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;
