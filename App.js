import Login from './Screens/login';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './Navigations/CustomDrawerContent';
import HomeScreen from './Screens/homeScreen';
import SettingsScreen from './Screens/settings';
import ProfilePage from './Screens/profile';

const Drawer = createDrawerNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <NavigationContainer>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} isDarkMode={isDarkMode} />}
      >
        <Drawer.Screen name="Home" options={{ headerShown: false }}>
          {props => <HomeScreen {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        </Drawer.Screen>
        <Drawer.Screen name="Profile" options={{ headerShown: false }}>
          {props => <ProfilePage {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        </Drawer.Screen>
        <Drawer.Screen name="Login" options={{ headerShown: false }}>
          {props => <Login {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        </Drawer.Screen>
        <Drawer.Screen name="Settings" options={{ headerShown: false }}>
          {props => <SettingsScreen {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        </Drawer.Screen>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}