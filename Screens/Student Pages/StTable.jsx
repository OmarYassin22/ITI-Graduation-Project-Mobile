import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
import { DataTable } from 'react-native-paper';
import styles from "../../styles.js";
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const StTable = ({ isDarkMode, toggleDarkMode, navigation, email2 }) => {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetchData(email2);
    }, []);
    const fetchData = async (email) => {
        console.warn(`Email is${email}`);
        try {
            const querySnapshot = await getDocs(collection(db, "students"));
            var newData = [];

            querySnapshot.forEach((doc) => {
                const coursesData = doc.data();
                if (typeof coursesData === 'object' && typeof coursesData.courses === "object" && coursesData.email && coursesData.field
                    && coursesData.fname && coursesData.lname && coursesData.number && coursesData.uid) {
                    if (coursesData.email == email) {
                        coursesData.courses.forEach((coursedata) => {
                            var coursePercentage = (coursedata.degree / 100) * 100;
                            var courseStatus = "Pass";
                            if (coursePercentage >= 50) {
                                courseStatus = "Pass";
                            } else {
                                courseStatus = "Fail";
                            }
                            newData.push({ "course": coursedata.course, "degree": coursedata.degree, "instructor": coursedata.instructor, "percentage": coursePercentage, "status": courseStatus });
                        });
                    }
                }
            });
            setData(newData);
        } catch (error) {
            console.error("Error fetching data: ", error);
        };
    };
    const handlePress = (title, name) => {
        Alert.alert(title, name);
    };
    return (
        <SafeAreaView style={[styles.mainContainer, isDarkMode && styles.mainContainerDark]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <DataTable style={styles.tableContainer}>
                    <DataTable.Header style={styles.tableHeader}>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Percentage</DataTable.Title>
                        <DataTable.Title>Status</DataTable.Title>
                        <DataTable.Title>instructor</DataTable.Title>
                    </DataTable.Header>
                    {data.map(function (course, key) {
                        return <DataTable.Row>
                            <DataTable.Cell onPress={() => handlePress("Name", course.course)}>{course.course}  </DataTable.Cell>
                            <DataTable.Cell onPress={() => handlePress("Percentage", `${course.percentage}%`)}><Text style={course.coursePercentage >= 50 ? styles.pass : styles.fail}>{course.percentage}%</Text></DataTable.Cell>
                            <DataTable.Cell onPress={() => handlePress("Status", course.status)}><Text style={course.status == "Pass" ? styles.pass : styles.fail}>{course.status}</Text></DataTable.Cell>
                            <DataTable.Cell onPress={() => handlePress("instructor", course.instructor)}>{course.instructor}</DataTable.Cell>
                        </DataTable.Row>
                    })}
                </DataTable>
            </ScrollView>
        </SafeAreaView >
    );
}

export default StTable;


