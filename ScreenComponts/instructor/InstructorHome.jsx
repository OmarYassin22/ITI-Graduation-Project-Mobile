import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Calendar from "./calendar";
import AddVideo from "./addvideo";
import Table from "./table";
import Navbar from '../../Navigations/navbar'; 
import AsyncStorage from "@react-native-async-storage/async-storage";

const Tab = createBottomTabNavigator();

const InsHome = ({ isDarkMode, toggleDarkMode, navigation }) => {
  useEffect(() => {
    async function getEmail() {
      var email = await AsyncStorage.getItem("email");
      console.warn(email);
    }
    getEmail();
  }, []);

  return (
    <>
      <Navbar 
        isDarkMode={isDarkMode} 
        toggleDarkMode={toggleDarkMode} 
        navigation={navigation}
      />
      <Tab.Navigator
        initialRouteName="Calendar"
        screenOptions={{
          tabBarActiveTintColor: "#e91e63",
        }}
      >
        <Tab.Screen
          name="Calendar"
          options={{
            headerShown: false,
            tabBarLabel: "Calendar",
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
            <Calendar
              {...props}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="Table"
          options={{
            headerShown: false,
            tabBarLabel: "Table",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="table" color={color} size={size} />
            ),
          }}
        >
          {(props) => (
            <Table
              {...props}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          )}
        </Tab.Screen>
        <Tab.Screen
          name="AddVideo"
          options={{
            tabBarLabel: "Add Video",
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons
                name="content-paste"
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
