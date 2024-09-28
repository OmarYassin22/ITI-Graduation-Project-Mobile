import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createStackNavigator } from '@react-navigation/stack';
import CustomDrawerContent from './Navigations/CustomDrawerContent';
import HomeScreen from './Screens/homeScreen/homeScreen';
import ProfileScreen from './Screens/profileScreen';
import Buyer from './ScreenComponts/Buyer/Buyer.jsx';
import About from './Screens/About Page/About';
import Account from './Screens/Account.jsx';

import CourseDetails from './Screens/homeScreen/courseDetails.jsx'; 
import CoursesProvider from './api/courses/CourseContext'; 
import InstructorsProvider from './api/instructors/InstructorsContext'; 
import StudentsProvider from './api/students/StudentsContext';
import { GetDataProvider } from './Contexts/GetDataContext.js';
import Scholarship from './Screens/Scholarship/Scholarship.jsx';

const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <GetDataProvider>
      <NavigationContainer>
        <StudentsProvider>
          <CoursesProvider>
            <InstructorsProvider>
              {/* استخدام Stack Navigator كـ Navigator رئيسي */}
              <Stack.Navigator initialRouteName="Drawer">
                {/* إضافة Drawer Navigator داخل الـ Stack Navigator */}
                <Stack.Screen 
                  name="Drawer" 
                  options={{ headerShown: false }} 
                  component={() => (
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
                      <Drawer.Screen name="Scholarship" options={{ headerShown: false }}>
                        {props => <Scholarship {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
                      </Drawer.Screen>
                    </Drawer.Navigator>
                  )}
                />
                <Stack.Screen 
                  name="CourseDetails" 
                  component={CourseDetails} 
                  options={{ title: 'Course Details' }} 
                />
              </Stack.Navigator>
            </InstructorsProvider>
          </CoursesProvider>
        </StudentsProvider>
      </NavigationContainer>
    </GetDataProvider>
  );
}
