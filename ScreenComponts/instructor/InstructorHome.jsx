import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Calendar from './calendar';
import AddVideo from './addvideo';
import Table from './table';

const Tab = createBottomTabNavigator();

const InsHome = ({ isDarkMode, toggleDarkMode, navigation }) => {
  return (
    <>
      <Tab.Navigator
        initialRouteName="Calendar"
        screenOptions={{
          tabBarActiveTintColor: '#e91e63',
        }}
      >
        <Tab.Screen
          name="Calendar"
          options={{
            headerShown: false,
            tabBarLabel: 'Calendar',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="calendar-blank" color={color} size={size} />
            ),
          }}
        >
          {(props) => <Calendar {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        </Tab.Screen>
        <Tab.Screen
          name="Table"
          options={{
            headerShown: false,
            tabBarLabel: 'Table',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="table" color={color} size={size} />
            ),
          }}
        >
          {(props) => <Table {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        </Tab.Screen>
        <Tab.Screen
          name="AddVideo"
          options={{
            tabBarLabel: 'AddVideo',
            tabBarIcon: ({ color, size }) => (
              <MaterialCommunityIcons name="content-paste" color={color} size={size} />
            ),
          }}
        >
          {(props) => <AddVideo {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        </Tab.Screen>
      </Tab.Navigator>
    </>
  );
}

export default InsHome;


