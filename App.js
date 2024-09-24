import Login from './Screens/login';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './Navigations/CustomDrawerContent';

import ProfileScreen from './Screens/profileScreen';

import { createStackNavigator } from '@react-navigation/stack';
const Drawer = createDrawerNavigator();
import Home from './Screens/homeScreen/homeScreen'; 
import Buyer from './ScreenComponts/Buyer/Buyer.jsx';
import { GetDataProvider } from './Contexts/GetDataContext.js';
import CourseProvider from './api/courses/CourseContext.jsx';
import InstructorsProvider from './api/instructors/InstructorsContext.jsx';

const Stack = createStackNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <GetDataProvider>
    <NavigationContainer>
      <CourseProvider>
        <InstructorsProvider>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} isDarkMode={isDarkMode} />}
      >
        <Drawer.Screen name="Home" options={{ headerShown: false }}>
          {props => <Home {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        </Drawer.Screen>
        <Drawer.Screen name="Profile" options={{ headerShown: false }}>
          {props => <ProfileScreen {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        </Drawer.Screen>
        <Drawer.Screen name="Buyer" options={{ headerShown: false }}>
          {props => <Buyer {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        </Drawer.Screen>

      </Drawer.Navigator>
      </InstructorsProvider>
      </CourseProvider>
    </NavigationContainer>
    </GetDataProvider>
  );
}