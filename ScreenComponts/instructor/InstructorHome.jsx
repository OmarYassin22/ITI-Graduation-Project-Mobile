import React, { useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Schedule from "./Schedule";
import AddVideo from "./addvideo";
import Students from "./Students";
import SecondNavbar from "../../Navigations/secondNav/secondNavbar";

const Tab = createBottomTabNavigator();

const InsHome = ({ isDarkMode, toggleDarkMode, navigation }) => {

  return (
    <>
      <SecondNavbar 
        isDarkMode={isDarkMode} 
        navigation={navigation}
      />
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
          name="Add Video"
          options={{
            tabBarLabel: "Add Video",
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
