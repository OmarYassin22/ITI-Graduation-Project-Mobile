import React, { useState, useEffect } from 'react';
import { View, SafeAreaView, Text, StyleSheet, Modal, TouchableOpacity, Platform } from 'react-native';
import { Calendar } from 'react-native-calendars';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../../firebase';

const CalendarComponent = ({ isDarkMode }) => {
  const [events, setEvents] = useState({});
  const [markedDates, setMarkedDates] = useState({});
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);
  const fullName = 'Emad Elshplangy';

  useEffect(() => {
    fetchData(fullName);
  }, []);

  const fetchData = async (fullName) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'course_instructor'));
      const newEvents = {};
      const newMarkedDates = {};

      querySnapshot.forEach((doc) => {
        const courses = doc.data();
        Object.entries(courses).forEach(([key, course]) => {
          if (
            typeof course === 'object' &&
            course.date &&
            course.instructor &&
            course.title
          ) {
            if (course.instructor === fullName) {
              const dateObj = new Date(course.date);
              const formattedDate = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD format
              newEvents[formattedDate] = {
                title: course.title,
                date: dateObj.toLocaleDateString('en-GB', {
                  day: 'numeric',
                  month: 'short',
                }),
              };
              newMarkedDates[formattedDate] = {
                marked: true,
                dotColor: isDarkMode ? '#4A90E2' : '#50cebb', // Adjust dot color based on mode
              };
            }
          }
        });
      });

      setEvents(newEvents);
      setMarkedDates(newMarkedDates);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

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

  const styles = getStyles(isDarkMode);

  return (
    <SafeAreaView edges={['top']} style={styles.safeArea}>
      <View style={styles.container}>
        <Text style={styles.header}>Schedule</Text>
        <Calendar
          onDayPress={onDayPress}
          markedDates={markedDates}
          theme={{
            backgroundColor: isDarkMode ? '#121212' : '#ffffff', 
            calendarBackground: isDarkMode ? '#121212' : '#ffffff', 
            textSectionTitleColor: isDarkMode ? '#b6c1cd' : '#2d4150', 
            dayTextColor: isDarkMode ? 'white' : '#2d4150', 
            todayTextColor: isDarkMode ? '#4A90E2' : '#00adf5', 
            selectedDayBackgroundColor: isDarkMode ? '#4A90E2' : '#00adf5', 
            selectedDayTextColor: 'white', 
            dotColor: isDarkMode ? '#4A90E2' : '#50cebb', 
            arrowColor: isDarkMode ? '#4A90E2' : '#00adf5', 
            monthTextColor: isDarkMode ? 'white' : 'black', 
            indicatorColor: isDarkMode ? 'white' : '#00adf5', 
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
  );
};

const getStyles = (isDarkMode) => {
  return StyleSheet.create({
    safeArea: {
      flex: 1,
      backgroundColor: isDarkMode ? '#121212' : '#ffffff',
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
      color: isDarkMode ? 'white' : '#000',
    },
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    modalView: {
      margin: 20,
      backgroundColor: isDarkMode ? '#333' : '#ffffff',
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
      color: isDarkMode ? 'white' : '#000',
    },
    modalDate: {
      fontSize: 16,
      marginBottom: 20,
      color: isDarkMode ? 'white' : '#000',
    },
    closeButton: {
      backgroundColor: isDarkMode ? '#4A90E2' : '#2196F3',
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
};

export default CalendarComponent;
