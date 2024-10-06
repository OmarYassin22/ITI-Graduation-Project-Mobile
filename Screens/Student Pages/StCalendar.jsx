import React, { useState } from 'react';
import { ScrollView, Text, Image, View, Alert } from 'react-native';
import styles from "../../styles.js";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import StTable from './StTable.jsx';
import StCourses from './StCourses.jsx';


const Tab = createBottomTabNavigator();

const StCalendar = ({ isDarkMode, toggleDarkMode, navigation }) => {
    const [markDates, setMarkDates] = useState({
        '2024-09-01': { selected: true, marked: true },
        '2024-09-25': { marked: true },
        '2024-09-24': { marked: true },
    });
    const [calendarTheme, setCalendarTheme] = useState({
        backgroundColor: '#ffffff',
        calendarBackground: '#ffffff',
        textSectionTitleColor: '#b6c1cd',
        selectedDayBackgroundColor: '#00adf5',
        selectedDayTextColor: '#ffffff',
        todayTextColor: '#00adf5',
        dayTextColor: '#2d4150',
        textDisabledColor: '#d9e1e8',
        dotColor: '#00adf5',
        selectedDotColor: '#ffffff',
        arrowColor: '#00adf5',
        monthTextColor: '#00adf5',
        indicatorColor: 'blue',
        textDayFontFamily: 'monospace',
        textMonthFontFamily: 'monospace',
        textDayHeaderFontFamily: 'monospace',
        textDayFontSize: 16,
        textMonthFontSize: 16,
        textDayHeaderFontSize: 16
    });
    const onDayPressFunction = (day) => {
        if (day.dateString == "2024-09-01") {
            Alert.alert("Ahmed Ali", "Java Script");
        }
        else {
            if (day.dateString == "2024-09-25") {
                Alert.alert("Amr Gado", "CSS");
            }
            else {
                if (day.dateString == "2024-09-24") {
                    Alert.alert("Omar Sleem", "HTML");
                }
            }
        }
        setMarkDates({
            '2024-09-01': { marked: true },
            '2024-09-25': { marked: true },
            '2024-09-24': { marked: true },
            [day.dateString]: { selected: true }
        });
    };
    return (
        <>
            <SafeAreaView style={[styles.mainContainer, isDarkMode && styles.mainContainerDark]}>
                <View>
                    <Calendar
                        markedDates={markDates}
                        theme={calendarTheme}
                        onDayPress={(day) => onDayPressFunction(day)}
                    />
                </View>
            </SafeAreaView>
        </>

    );
}


export default StCalendar;


