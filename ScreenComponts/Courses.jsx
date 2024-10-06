import React, { useState, useCallback } from 'react';
import { View, Text, Image, TouchableOpacity, FlatList, StyleSheet, SafeAreaView, Platform, StatusBar, TextInput, ScrollView, KeyboardAvoidingView } from 'react-native';
import HTML from '../assets/html.jpg';

const courseData = [
  { id: '1', title: 'HTML 5', author: 'Ahmed Ali', price: 15, imageUrl: HTML },
  { id: '2', title: 'CSS 3', author: 'Sarah Johnson', price: 20, imageUrl: HTML },
  { id: '3', title: 'JavaScript', author: 'Michael Brown', price: 25, imageUrl: HTML },
  { id: '4', title: 'React', author: 'Emily Davis', price: 30, imageUrl: HTML },
  { id: '5', title: 'Node.js', author: 'David Wilson', price: 28, imageUrl: HTML },
  { id: '6', title: 'Python', author: 'Jessica Lee', price: 22, imageUrl: HTML },
  { id: '7', title: 'Java', author: 'Robert Taylor', price: 27, imageUrl: HTML },
  { id: '8', title: 'C++', author: 'Jennifer White', price: 24, imageUrl: HTML },
  { id: '9', title: 'SQL', author: 'Christopher Martin', price: 18, imageUrl: HTML },
  { id: '10', title: 'Ruby', author: 'Lisa Anderson', price: 23, imageUrl: HTML },
  { id: '11', title: 'PHP', author: 'Daniel Thompson', price: 19, imageUrl: HTML },
  { id: '12', title: 'Swift', author: 'Michelle Clark', price: 26, imageUrl: HTML },
  { id: '13', title: 'Go', author: 'Andrew Rodriguez', price: 21, imageUrl: HTML },
  { id: '14', title: 'Kotlin', author: 'Stephanie Lewis', price: 29, imageUrl: HTML },
  { id: '15', title: 'TypeScript', author: 'Kevin Hall', price: 17, imageUrl: HTML },
];

const CourseCard = ({ title, author, price, imageUrl }) => (
  <View style={styles.card}>
    <View style={styles.cardHeader}>
      <Text style={styles.title}>{title}</Text>
    </View>
    <View style={styles.imageContainer}>
      <Image
        source={imageUrl}
        style={styles.image}
      />
    </View>
    <View style={styles.cardContent}>
      <Text style={styles.author}>by: {author}</Text>
      <Text style={styles.price}>Price: ${price}</Text>
    </View>
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Open course</Text>
    </TouchableOpacity>
  </View>
);

const CourseCards = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredCourses, setFilteredCourses] = useState(courseData);

  const handleSearch = useCallback((text) => {
    setSearchQuery(text);
    const filtered = courseData.filter(course => 
      course.title.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredCourses(filtered);
  }, []);

  return (
    <SafeAreaView style={styles.safeArea}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.container}
      >
        <ScrollView contentContainerStyle={styles.scrollView}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>All Courses</Text>
            <TextInput
              style={styles.searchInput}
              placeholder="Search courses..."
              value={searchQuery}
              onChangeText={handleSearch}
            />
          </View>
          <FlatList
            data={filteredCourses}
            renderItem={({ item }) => <CourseCard {...item} />}
            keyExtractor={item => item.id}
            numColumns={2}
            scrollEnabled={false}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  container: {
    flex: 1,
  },
  scrollView: {
    padding: 10,
  },
  headerContainer: {
    marginBottom: 15,
  },
  header: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 5,
    padding: 10,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
  },
  card: {
    flex: 1,
    margin: 5,
    padding: 10,
    backgroundColor: '#ffffff',
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    marginBottom: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  imageContainer: {
    width: '100%',
    height: 120,
    marginBottom: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 4,
  },
  cardContent: {
    marginBottom: 10,
  },
  author: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  price: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  button: {
    backgroundColor: '#4CAF50',
    padding: 8,
    borderRadius: 4,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default CourseCards;