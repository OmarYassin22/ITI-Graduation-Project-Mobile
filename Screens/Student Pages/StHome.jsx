import React, { useState } from 'react';
import { ScrollView, Text, Image, View, Alert } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StTable from './StTable.jsx';
import StCourses from './StCourses.jsx';
import StCalendar from './StCalendar.jsx';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';


const Tab = createBottomTabNavigator();

const StHome = ({ isDarkMode, toggleDarkMode, navigation }) => {
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
                        tabBarLabel: 'Calendar',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="calendar-blank" color={color} size={size} />
                        ),
                    }}
                >
                    {(props) => <StCalendar {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
                </Tab.Screen>
                <Tab.Screen
                    name="Table"
                    options={{
                        tabBarLabel: 'Table',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="table" color={color} size={size} />
                        ),
                    }}
                >
                    {(props) => <StTable {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
                </Tab.Screen>
                <Tab.Screen
                    name="Courses"
                    options={{
                        tabBarLabel: 'Courses',
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="content-paste" color={color} size={size} />
                        ),
                    }}
                >
                    {(props) => <StCourses {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
                </Tab.Screen>
            </Tab.Navigator>
        </>

    );
}


export default StHome;


