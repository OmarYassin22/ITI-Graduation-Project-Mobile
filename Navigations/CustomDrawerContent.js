import React from 'react';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import Icon from 'react-native-vector-icons/Ionicons';
import styles from '../styles';
import { useTranslation } from 'react-i18next';

function CustomDrawerContent({ navigation, isDarkMode }) {
  const { t } = useTranslation(); 
  const currentRoute = navigation.getState().routeNames[navigation.getState().index];
  return (
    <DrawerContentScrollView>
      <DrawerItem
        label= {t('drawer.home')}
        icon={({ color, size }) => <Icon name="home-outline" size={size} color={color} />}
        focused={currentRoute === 'Home'}
        onPress={() => navigation.navigate('Home')}
        style={styles.selectedItem}
      />
      <DrawerItem
        label={t('drawer.profile')}
        icon={({ color, size }) => <Icon name="person-outline" size={size} color={color} />}
        focused={currentRoute === 'Profile'}
        onPress={() => navigation.navigate('Profile')}
        style={styles.selectedItem}
      />
         <DrawerItem
        label="Buyer"
        icon={({ color, size }) => <Icon name="log-in-outline" size={size} color={color} />}
        focused={currentRoute === 'Buyer'}
        onPress={() => navigation.navigate('Buyer')}
        style={styles.selectedItem}
      />
      <DrawerItem
        label={t('drawer.settings')}
        icon={({ color, size }) => <Icon name="settings-outline" size={size} color={color} />}
        focused={currentRoute === 'Settings'}
        onPress={() => navigation.navigate('Settings')}
        style={styles.selectedItem}
      />
      <DrawerItem
        label={t('drawer.login')}
        icon={({ color, size }) => <Icon name="log-in-outline" size={size} color={color} />}
        focused={currentRoute === 'Login'}
        onPress={() => navigation.navigate('Login')}
        style={styles.selectedItem}
      />
    </DrawerContentScrollView>
  );
}

export default CustomDrawerContent;