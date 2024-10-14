import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, Image } from "react-native";
// import { DataTable } from 'react-native-paper';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../../firebase';
// import AsyncStorage from "@react-native-async-storage/async-storage";
import SecondNavbar from '../../../Navigations/secondNav/secondNavbar.jsx';
import styles from "../../../styles.js";

const CoursesDetails = ({ isDarkMode, toggleDarkMode, navigation, route }) => {
    const { id } = route.params;
    const { course } = route.params;
    const { instructor } = route.params;

    return (
        <SafeAreaView style={[styles.mainContainer, isDarkMode && styles.mainContainerDark]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SecondNavbar
                    isDarkMode={isDarkMode}
                    navigation={navigation}
                />
                <View style={[styles.courseDetailsContainer, isDarkMode && styles.courseDetailsContainerDark]}>
                    <Text style={[styles.courseDetailsText, isDarkMode && styles.courseDetailsTextDark]}>{course}</Text>
                    <Image source={course == "Bootstrap" ? require("../../../assets/coureses images/Bootstrap.jpeg") : course == "Flutter" ? require("../../../assets/coureses images/flutterr.png") : course == "php" ? require("../../../assets/coureses images/PHP.png") : course == "React Native" ? require("../../../assets/coureses images/react-native-1.png") : course == "Java" ? require("../../../assets/coureses images/java.png") : require("../../../assets/coureses images/node.png")} style={styles.courseDetails} />
                    <Text style={[styles.courseDetailsText, isDarkMode && styles.courseDetailsTextDark]}>Instructor:{instructor}</Text>
                </View>
            </ScrollView>
        </SafeAreaView >
    );
}

export default CoursesDetails;


