import React, { useContext, useEffect } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Mylearning from "./Mylearning";
import Mycart from "./Mycart";
import Courses from "./Courses";
import Wishlist from "./Wishlist";
import CourseDetailes from "./CourseDetailes";
import { GetData } from "../../Contexts/GetDataContext";

const Tab = createBottomTabNavigator();

function Buyer({ isDarkMode, toggleDarkMode }) {

  const { courseBuyerCart, courseBuyerWish } = useContext(GetData);
  return (
    <Tab.Navigator
      initialRouteName="Courses"
      screenOptions={{
        tabBarActiveTintColor: "#e91e63",
      }}
    >
      <Tab.Screen
        name="Courses"
        options={{
          tabBarLabel: "Courses",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="book-open-page-variant"
              color={color}
              size={size}
            />
          ),
        }}
      >
        {(props) => (
          <Courses
            {...props}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Mycart"
        options={{
          tabBarLabel: "Mycart",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
          tabBarBadge: courseBuyerCart.length,
        }}
      >
        {(props) => (
          <Mycart
            {...props}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Wishlist"
        options={{
          tabBarLabel: "Wishlist",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
          tabBarBadge: courseBuyerWish.length,
        }}
      >
        {(props) => (
          <Wishlist
            {...props}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="Mylearning"
        options={{
          tabBarLabel: "My learning",
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="play-circle"
              color={color}
              size={size}
            />
          ),
        }}
      >
        {(props) => (
          <Mylearning
            {...props}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}
      </Tab.Screen>
      <Tab.Screen
        name="CourseDetailes"
        options={{
          tabBarButton: () => null,
        }}
      >
        {(props) => (
          <CourseDetailes
            {...props}
            isDarkMode={isDarkMode}
            toggleDarkMode={toggleDarkMode}
          />
        )}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default Buyer;
