import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './Navigations/CustomDrawerContent';
import HomeScreen from './Screens/homeScreen/homeScreen';
import ProfileScreen from './Screens/profileScreen';
import CoursesProvider from './api/courses/CourseContext'; 
import InstructorsProvider from './api/instructors/InstructorsContext'; 
import StudentsProvider from './api/students/StudentsContext';
import About from './Screens/About Page/About';
import { createStackNavigator } from '@react-navigation/stack';
import Buyer from './ScreenComponts/Buyer/Buyer.jsx';
import { GetDataProvider } from './Contexts/GetDataContext.js';
import Account from './Screens/Account.jsx';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <GetDataProvider>
      <StudentsProvider>
      <NavigationContainer>
        <CoursesProvider>
          <InstructorsProvider>
            <Drawer.Navigator
              drawerContent={(props) => <CustomDrawerContent {...props} isDarkMode={isDarkMode} />}
            >
              <Drawer.Screen name="HomeScreen" options={{ headerShown: false }}>
                {props => <HomeScreen {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
              </Drawer.Screen>
              <Drawer.Screen name="Account" options={{ headerShown: false }}>
                {props => <Account {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
              </Drawer.Screen>
              <Drawer.Screen name="Profile" options={{ headerShown: false }}>
                {props => <ProfileScreen {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
              </Drawer.Screen>
              <Drawer.Screen name="Buyer" options={{ headerShown: false }}>
                {props => <Buyer {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
              </Drawer.Screen>
              <Drawer.Screen name="About Us" options={{ headerShown: false }}>
                {props => <About {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
              </Drawer.Screen>
            </Drawer.Navigator>
          </InstructorsProvider>
        </CoursesProvider>
      </NavigationContainer>
      </StudentsProvider>
    </GetDataProvider>
  );
}
