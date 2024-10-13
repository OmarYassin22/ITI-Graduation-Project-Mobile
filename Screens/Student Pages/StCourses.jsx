import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Image, View, Alert, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Avatar, Card, IconButton } from 'react-native-paper';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import AsyncStorage from "@react-native-async-storage/async-storage";
import SecondNavbar from '../../Navigations/secondNav/secondNavbar.jsx';


const StCourses = ({ isDarkMode, toggleDarkMode, navigation }) => {
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

    const getEmail = async () => {
        const email = await AsyncStorage.getItem("email");
        console.error(email);
        return email;
    };

    useEffect(() => {
        const fetchDataWithEmail = async () => {
            const email = await getEmail();
            fetchData(email.replace(/"/g, ''));
        };
        fetchDataWithEmail();
    }, []);
    return (
        <SafeAreaView style={[styles.mainContainer, isDarkMode && styles.mainContainerDark]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SecondNavbar
                    isDarkMode={isDarkMode}
                    navigation={navigation}
                />
                {data.map(function (courses, index) {
                    return <Card.Title
                        titleStyle={isDarkMode ? styles.titleTextDark : styles.titleText}
                        subtitleStyle={isDarkMode ? styles.subtitleTextDark : styles.subtitleText}
                        title={courses.course}
                        subtitle={courses.instructor}
                        left={(props) => <Image source={courses.course == "Bootstrap" ? require("../../assets/coureses images/Bootstrap.jpeg") : courses.course == "Flutter" ? require("../../assets/coureses images/flutterr.png") : courses.course == "php" ? require("../../assets/coureses images/PHP.png") : courses.course == "React Native" ? require("../../assets/coureses images/react-native-1.png") : courses.course == "Java" ? require("../../assets/coureses images/java.png") : require("../../assets/coureses images/node.png")} style={styles.coursesImages} />}
                        style={styles.coursesCard}
                        right={(props) => (
                            <IconButton
                                {...props}
                                icon="eye"
                                color={isDarkMode ? '#ffffff' : '#000000'}
                                onPress={() => { }}
                            />
                        )}
                    />
                })}
            </ScrollView>
        </SafeAreaView>
    );
}

// الأنماط هنا
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff', // لون الخلفية في الوضع العادي
        paddingVertical: 16,
    },
    mainContainerDark: {
        backgroundColor: '#121212', // لون الخلفية في الوضع الداكن
    },
    coursesCard: {
        marginBottom: 16,
        backgroundColor: '#ffffff', // لون البطاقة في الوضع العادي
    },
    coursesCardDark: {
        backgroundColor: '#333333', // لون البطاقة في الوضع الداكن
    },
    coursesImages: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    titleText: {
        color: '#000', // لون النص في الوضع العادي
    },
    titleTextDark: {
        color: '#fff', // لون النص في الوضع الداكن
    },
    subtitleText: {
        color: '#555', // لون النص الفرعي في الوضع العادي
    },
    subtitleTextDark: {
        color: '#ccc', // لون النص الفرعي في الوضع الداكن
    },
});

export default StCourses;
{/* <SafeAreaView style={[styles.mainContainer, isDarkMode ? styles.mainContainerDark : styles.mainContainer]}>
    <ScrollView showsVerticalScrollIndicator={false}>
        <Card style={[styles.coursesCard, isDarkMode ? styles.coursesCardDark : styles.coursesCard]}>
            <Card.Title
                titleStyle={isDarkMode ? styles.titleTextDark : styles.titleText}
                subtitleStyle={isDarkMode ? styles.subtitleTextDark : styles.subtitleText}
                title="Java Script"
                subtitle="With Amr Gado"
                left={(props) => (
                    <Image source={require("../../assets/coureses images/JavaScript.png")} style={styles.coursesImages} />
                )}
                right={(props) => (
                    <IconButton
                        {...props}
                        icon="eye"
                        color={isDarkMode ? '#ffffff' : '#000000'}
                        onPress={() => { }}
                    />
                )}
            /> */}