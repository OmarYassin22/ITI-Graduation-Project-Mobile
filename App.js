import Login from "./Screens/login";
import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import CustomDrawerContent from "./Navigations/CustomDrawerContent";
import About from "./Screens/About Page/About";
import { createStackNavigator } from "@react-navigation/stack";
import Home from "./Screens/homeScreen/homeScreen";
import StHome from "./Screens/Student Pages/StHome.jsx";
import Buyer from "./ScreenComponts/Buyer/Buyer.jsx";
import { GetDataProvider } from "./Contexts/GetDataContext.js";
import CourseProvider from "./api/courses/CourseContext.jsx";
import InstructorsProvider from "./api/instructors/InstructorsContext.jsx";
import ProfilePage from "./Screens/profile.jsx";
import SettingsScreen from "./Screens/settings";
import Contact from "./Screens/Contact Page/Contact.jsx";
import Scholarship from "./ScreenComponts/Buyer/Scholarship/Scholarship.jsx";
import InsHome from "./ScreenComponts/instructor/InstructorHome.jsx";
import Signup from "./Screens/Signup.jsx";
import MessagesProvider from "./api/messages/MessagesContext.jsx"
const Drawer = createDrawerNavigator();
const Stack = createStackNavigator();
export function SettingsStack({ isDarkMode, toggleDarkMode }) {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Settings" 
        options={{ headerShown: false }}
      >
        {(props) => (
          <SettingsScreen
            {...props}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}
      </Stack.Screen>
      <Stack.Screen 
        name="About" 
        options={{ headerShown: false }}
      >
        {(props) => (
          <About
            {...props}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}
      </Stack.Screen>
      
      <Stack.Screen 
        name="Contact" 
        options={{ headerShown: false }}
      >
        {(props) => (
          <Contact
            {...props}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}
      </Stack.Screen>
    </Stack.Navigator>
  );
}
export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };
  
  return (
    <MessagesProvider>
    <GetDataProvider>
      <NavigationContainer>
        <CourseProvider>
          <InstructorsProvider>
            <Drawer.Navigator
              drawerContent={(props) => (
                <CustomDrawerContent {...props} isDarkMode={isDarkMode} />
              )}
            >
              <Drawer.Screen name="Home" options={{ headerShown: false }}>
                {(props) => (
                  <Home
                    {...props}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                )}
              </Drawer.Screen>
              <Drawer.Screen name="Signup" options={{ headerShown: false }}>
                {(props) => (
                  <Signup
                    {...props}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                )}
              </Drawer.Screen>
              <Drawer.Screen name="Profile" options={{ headerShown: false }}>
                {(props) => (
                  <ProfilePage
                    {...props}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                )}
              </Drawer.Screen>
              <Drawer.Screen name="Buyer" options={{ headerShown: false }}>
                {(props) => (
                  <Buyer
                    {...props}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                )}
              </Drawer.Screen>
              <Drawer.Screen name="Student" options={{ headerShown: false }}>
                {(props) => (
                  <StHome
                    {...props}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                )}
              </Drawer.Screen>
              <Drawer.Screen name="Instructor" options={{ headerShown: false }}>
                {(props) => (
                  <InsHome
                    {...props}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                )}
              </Drawer.Screen>
              <Drawer.Screen name="Settings" options={{ headerShown: false }}>
              {(props) => (
              <SettingsStack
              {...props}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          )}
              </Drawer.Screen>
              <Drawer.Screen
                name="Scholarship"
                options={{ headerShown: false }}
              >
                {(props) => (
                  <Scholarship
                    {...props}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                )}
              </Drawer.Screen>
              <Drawer.Screen
                name="Login"
                options={{ headerShown: false }}
              >
                {(props) => (
                  <Login
                    {...props}
                    isDarkMode={isDarkMode}
                    toggleDarkMode={toggleDarkMode}
                  />
                )}
              </Drawer.Screen>
            </Drawer.Navigator>
          </InstructorsProvider>
        </CourseProvider>
      </NavigationContainer>
    </GetDataProvider>
    </MessagesProvider>
  );
}