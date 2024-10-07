import React, { useState, useEffect } from 'react';
import { ScrollView, Text, Image, View, Alert, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar } from 'react-native-calendars';
import StTable from './StTable.jsx';
import StCourses from './StCourses.jsx';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';
import { AsyncStorage } from '@react-native-async-storage/async-storage';


const StCalendar = ({ isDarkMode, toggleDarkMode, navigation }) => {
    const [events, setEvents] = useState({});
    const [markedDates, setMarkedDates] = useState({});
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);
    const getFullName = async () => {
        try {
            const fname = await AsyncStorage.getItem('fname');
            const lname = await AsyncStorage.getItem('lname');
            if (fname !== null) {
                return lname === null || lname === 'undefined' ? fname : `${fname} ${lname}`;
            }
            return '';
        } catch (error) {
            console.error('Error retrieving data', error);
            return '';
        }
    };
    useEffect(() => {
        const fetchDataWithName = async () => {
            const fullName = await getFullName();
            fetchData(fullName.replace(/"/g, ''));
        };
        fetchDataWithName();
    }, []);
    const fetchData = async (fullName) => {
        var nameArray = fullName.split(" ");
        const fname = nameArray[0];
        const lname = nameArray[1];
        console.warn(`fname is ${fname} and lname is ${lname}`);
        var field;
        var cdata = [];
        const newEvents = {};
        const newMarkedDates = {};
        try {
            const querySnapshot = await getDocs(collection(db, "students"));
            console.error(`Email is  ==== ${email}`);
            querySnapshot.forEach((doc) => {
                const coursesData = doc.data();
                if (typeof coursesData === 'object' && typeof coursesData.courses === "object" && coursesData.email && coursesData.field
                    && coursesData.fname && coursesData.lname && coursesData.number && coursesData.uid) {
                    if (coursesData.fname = fname && coursesData.lname == lname) {
                        field = coursesData.field.toLowerCase();
                        coursesData.courses.map((c, index) => {
                            cdata.push(c.course);
                        });
                    }
                }
            });
        } catch (error) {
            console.error("Error fetching data: ", error);
        };
        if (field) {
            try {
                const querySnapshot2 = await getDocs(collection(db, "course_instructor"));
                querySnapshot2.forEach((doc2) => {
                    const courseType = doc2.id;
                    if (courseType == field) {
                        const coursesData2 = doc2.data();
                        Object.entries(coursesData2).forEach(([key, course]) => {
                            if (typeof course == "object" && course.date && course.instructor && course.title) {
                                cdata.forEach(c2 => {
                                    if (c2 == course.title) {
                                        const dateObj2 = new Date(course.date);
                                        const formattedDate2 = dateObj2.toISOString().split('T')[0];
                                        newEvents[formattedDate2] = {
                                            title: course.title,
                                            date: dateObj2.toLocaleDateString('en-GB', {
                                                day: 'numeric',
                                                month: 'short',
                                            }),
                                        };
                                        newMarkedDates[formattedDate2] = {
                                            marked: true,
                                            dotColor: '#50cebb',
                                        };
                                    }
                                });
                            }
                        });
                    }
                });
                setEvents(newEvents);
                setMarkedDates(newMarkedDates);
            } catch {
                console.error("Error fetching data: ", error);
            };
        }
    };

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
    const onDayPress = (day) => {
        const selectedDate = day.dateString;
        if (events[selectedDate]) {
            setSelectedEvent({
                ...events[selectedDate],
                fullDate: selectedDate,
            });
            setModalVisible(true);
        }
    };
    return (
        <>
            <SafeAreaView edges={['top']} style={styles.safeArea}>
                <View style={styles.container}>
                    <Text style={styles.header}>Schedule</Text>
                    <Calendar
                        onDayPress={onDayPress}
                        markedDates={markedDates}
                        theme={{
                            todayTextColor: '#00adf5',
                            selectedDayBackgroundColor: '#00adf5',
                            dotColor: '#50cebb',
                            arrowColor: '#00adf5',
                        }}
                    />
                    <Modal
                        animationType="slide"
                        transparent={true}
                        visible={modalVisible}
                        onRequestClose={() => setModalVisible(false)}
                    >
                        <View style={styles.centeredView}>
                            <View style={styles.modalView}>
                                {selectedEvent && (
                                    <>
                                        <Text style={styles.modalTitle}>{selectedEvent.title}</Text>
                                        <Text style={styles.modalDate}>Date: {selectedEvent.date}</Text>
                                    </>
                                )}
                                <TouchableOpacity
                                    style={styles.closeButton}
                                    onPress={() => setModalVisible(false)}
                                >
                                    <Text style={styles.closeButtonText}>Close</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </Modal>
                </View>
            </SafeAreaView>
        </>

    );
}

const styles = StyleSheet.create({
    safeArea: {
        flex: 1,
        backgroundColor: '#fff',
        paddingTop: Platform.OS === 'android' ? 30 : 0,
    },
    container: {
        flex: 1,
        paddingHorizontal: 16,
    },
    header: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 16,
        marginTop: 16,
    },
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
        width: '80%',
    },
    modalTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    modalDate: {
        fontSize: 16,
        marginBottom: 20,
    },
    closeButton: {
        backgroundColor: '#2196F3',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        minWidth: 100,
    },
    closeButtonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});
export default StCalendar;


