import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Image, View, Alert } from 'react-native';
import styles from "../../styles.js";
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';


const Tab = createBottomTabNavigator();

const StCourses = ({ isDarkMode, toggleDarkMode, navigation, email2 }) => {
    const [data, setData] = useState([]);
    const fetchData = async (email) => {
        console.warn(`Email is ${email}`);
        var newData = [];
        try {
            const querySnapshot = await getDocs(collection(db, "students"));

            querySnapshot.forEach((doc) => {
                const coursesData = doc.data();
                if (typeof coursesData === 'object' && typeof coursesData.courses === "object" && coursesData.email && coursesData.field
                    && coursesData.fname && coursesData.lname && coursesData.number && coursesData.uid) {
                    if (coursesData.email == email) {
                        coursesData.courses.forEach((coursedata) => {
                            newData.push({ "course": coursedata.course, "instructor": coursedata.instructor });
                        });
                    }
                }
            });
        } catch (error) {
            console.error("Error fetching data: ", error);
        };
        try {
            const querySnapshot2 = await getDocs(collection(db, "courses"));

            querySnapshot2.forEach((doc) => {
                const courseid = doc.id;
                const coursesData2 = doc.data();
                if (typeof coursesData2 === 'object' && coursesData2.title && coursesData2.imgPath) {
                    if (newData.length >= 1) {
                        newData.map((coursedata, index) => {
                            if (coursedata.course == coursesData2.title) {
                                Object.assign(newData[index], { "imgPath": `../../assets/coureses images/${coursesData2.title}.jpeg` || `../../assets/coureses images/${coursesData2.title}.png`, "id": courseid });
                            }
                        });
                    }
                }
            });

        } catch (error) {
            console.error("Error fetching data: ", error);
        }
        setData(newData);
    };

    useEffect(() => {
        fetchData(email2);
        console.error(data);
    }, []);
    return (
        <SafeAreaView style={[styles.mainContainer, isDarkMode && styles.mainContainerDark]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                {data.map(function (courses, index) {
                    return <Card.Title
                        title={courses.course}
                        subtitle={courses.instructor}
                        left={(props) => <Image source={courses.course == "Bootstrap" ? require("../../assets/coureses images/Bootstrap.jpeg") : courses.course == "Flutter" ? require("../../assets/coureses images/flutterr.png") : courses.course == "php" ? require("../../assets/coureses images/PHP.png") : courses.course == "React Native" ? require("../../assets/coureses images/react-native-1.png") : courses.course == "Java" ? require("../../assets/coureses images/java.png") : require("../../assets/coureses images/node.png")} style={styles.coursesImages} />}
                        style={[styles.coursesCard, isDarkMode && styles.coursesCardDark]}
                        right={(props) => <IconButton {...props} icon="eye" onPress={() => { }} />}
                    />
                })}
            </ScrollView>
        </SafeAreaView>
    );
}


export default StCourses;


