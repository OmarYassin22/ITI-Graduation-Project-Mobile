import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './Navigations/CustomDrawerContent';
import HomeScreen from './Screens/homeScreen/homeScreen';
import ProfileScreen from './Screens/profileScreen';
import Login from './Screens/login';
import CoursesProvider from './api/courses/CourseContext'; 
import InstructorsProvider from './api/instructors/InstructorsContext'; 
import StudentsProvider from './api/students/StudentsContext';

const Drawer = createDrawerNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <InstructorsProvider>
      <StudentsProvider>
    <CoursesProvider>
      <NavigationContainer>
        <Drawer.Navigator
          drawerContent={(props) => <CustomDrawerContent {...props} isDarkMode={isDarkMode} />}
        >
          <Drawer.Screen name="HomeScreen" options={{ headerShown: false }}>
            {props => <HomeScreen {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
          </Drawer.Screen>
          <Drawer.Screen name="Profile" options={{ headerShown: false }}>
            {props => <ProfileScreen {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
          </Drawer.Screen>
          <Drawer.Screen name="Login" options={{ headerShown: false }}>
            {props => <Login {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
          </Drawer.Screen>
        </Drawer.Navigator>
      </NavigationContainer>
    </CoursesProvider>
    </StudentsProvider>
    </InstructorsProvider>
  );
}
