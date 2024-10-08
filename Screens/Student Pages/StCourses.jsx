import React, { useState } from 'react';
import { ScrollView, Text, Image, View, Alert } from 'react-native';
import styles from "../../styles.js";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar, Card, IconButton } from 'react-native-paper';

const Tab = createBottomTabNavigator();

const StCourses = ({ isDarkMode, toggleDarkMode, navigation }) => {

    return (
        <SafeAreaView style={[styles.mainContainer, isDarkMode && styles.mainContainerDark]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Card.Title
                    title="Java Script"
                    subtitle="With Amr Gado"
                    left={(props) => <Image source={require("../../assets/coureses images/JavaScript.png")} style={styles.coursesImages} />}
                    style={styles.coursesCard}
                    right={(props) => <IconButton {...props} icon="eye" onPress={() => { }} />}
                />
                <Card.Title
                    title="HTML"
                    subtitle="With Amr Gado"
                    left={(props) => <Image source={require("../../assets/coureses images/HTML-5.png")} style={styles.coursesImages} />}
                    style={styles.coursesCard}
                    right={(props) => <IconButton {...props} icon="eye" onPress={() => { }} />}
                />
            </ScrollView>
        </SafeAreaView>
    );
}


export default StCourses;


