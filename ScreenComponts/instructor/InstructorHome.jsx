import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Schedule from "./Schedule";
import AddVideo from "./addvideo";
import Students from "./Students";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

const InsHome = ({ isDarkMode, toggleDarkMode, navigation }) => {

  useEffect(() => {
    async function getEmail() {
      var email = await AsyncStorage.getItem("email");
      var email = await AsyncStorage.getItem("fname");
      var email = await AsyncStorage.getItem("lname");
      console.warn(email);
      console.warn(fname);
      console.warn(lname);
    }
    getEmail();
  }, []);

  return (
    <>
      <Tab.Navigator
        initialRouteName="Schedule"
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
        }}
      >
        <Tab.Screen
          name="Schedule"
          options={{
            headerShown: false,
            tabBarLabel: "Schedule",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="calendar-blank"
                color={color}
                size={size}
              />
            ),
          }}
        >
          {(props) => (
            <Schedule
              {...props}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Students"
          options={{
            headerShown: false,
            tabBarLabel: "Students",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="table" color={color} size={size} />
            ),
          }}
        >
          {(props) => (
            <Students
              {...props}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="AddVideo"
          options={{
            tabBarLabel: "AddVideo",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="video-plus"
                color={color}
                size={size}
              />
            ),
          }}
        >
          {(props) => (
            <AddVideo
              {...props}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          )}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
};

export default InsHome;
