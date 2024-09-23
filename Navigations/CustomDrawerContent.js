import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';

function CustomDrawerContent({ navigation, isDarkMode }) {
  const currentRoute = navigation.getState().routeNames[navigation.getState().index];
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label="Home"
        icon={({ color, size }) => <Icon name="home-outline" size={size} color={color} />}
        focused={currentRoute === 'HomeScreen'}
        onPress={() => navigation.navigate('HomeScreen')}
        style={styles.selectedItem}
      />
      <DrawerItem
        label="Profile"
        icon={({ color, size }) => <Icon name="person-outline" size={size} color={color} />}
        focused={currentRoute === 'Profile'}
        onPress={() => navigation.navigate('Profile')}
        style={styles.selectedItem}
      />
      <DrawerItem
        label="Login"
        icon={({ color, size }) => <Icon name="log-in-outline" size={size} color={color} />}
        focused={currentRoute === 'Login'}
        onPress={() => navigation.navigate('Login')}
        style={styles.selectedItem}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;