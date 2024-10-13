import React from 'react';
import { View, Text, ImageBackground, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';

const CourseDetails = ({ route, navigation }) => {
  const { course, isDarkMode } = route.params; 

  return (
    <>
      <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <ImageBackground
          source={course.imgPath ? { uri: course.imgPath } : null}
          style={styles.courseImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}></View>
        </ImageBackground>
        <View style={[styles.contentContainer, isDarkMode && styles.darkContentContainer]}>
          <Text style={[styles.title, isDarkMode && styles.darkText]}>{course.title}</Text>
          <Text style={[styles.description, isDarkMode && styles.darkText]}>{course.details}</Text>
          <Text style={[styles.rating, isDarkMode && styles.darkRating]}>Rating: {parseFloat(course.rating).toFixed(2)}</Text>

          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Account')}>
            <Text style={styles.buttonText}>Buy Now</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  darkContainer: {
    backgroundColor: '#121212',
  },
  courseImage: {
    width: '100%',
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  contentContainer: {
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    backgroundColor: '#FFFFFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
  },
  darkContentContainer: {
    backgroundColor: '#1E1E1E',
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  darkText: {
    color: '#FFFFFF', 
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 10,
    lineHeight: 24,
  },
  rating: {
    fontSize: 18,
    color: '#FFD700',
    marginBottom: 20,
  },
  darkRating: {
    color: '#FFD700',
  },
  button: {
    backgroundColor: '#FF6347',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default CourseDetails;
