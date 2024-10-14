import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StTable from './StTable.jsx';
import StCourses from './StCourses.jsx';
import StCalendar from './StCalendar.jsx';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { createStackNavigator } from "@react-navigation/stack";
import CoursesDetails from '../../Screens/Student Pages/CoursesDetails/Courses Details.jsx';

const Stack = createStackNavigator();
const Tab = createBottomTabNavigator();

export function CourseStack({ isDarkMode, toggleDarkMode }) {
    return (
      <Stack.Navigator>
        <Stack.Screen
          name="Courses"
          options={{ headerShown: false ,
            tabBarIcon: ({ color, size }) => (
                <MaterialCommunityIcons name="content-paste" color={color} size={size} />
            ),
          }}
        >
          {(props) => (
            <StCourses
              {...props}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          )}
        </Stack.Screen>
        <Stack.Screen
          name="CoursesDetails"
          options={{ headerShown: false }}
        >
          {(props) => (
            <CoursesDetails
              {...props}
              isDarkMode={isDarkMode}
              toggleDarkMode={toggleDarkMode}
            />
          )}
        </Stack.Screen>
      </Stack.Navigator>
    );
  }
  
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
                    name="Schedule"
                    options={{
                        tabBarLabel: 'Schedule',
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="calendar-blank" color={color} size={size} />
                        ),
                    }}
                >
                    {(props) => <StCalendar {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
                </Tab.Screen>
                <Tab.Screen
                    name="Grades"
                    options={{
                        tabBarLabel: 'Grades',
                        headerShown: false,
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
                        headerShown: false,
                        tabBarIcon: ({ color, size }) => (
                            <MaterialCommunityIcons name="content-paste" color={color} size={size} />
                        ),
                    }}
                >
                    {(props) => <CourseStack {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
                </Tab.Screen>
            </Tab.Navigator>
        </>

    );
}


export default StHome;


