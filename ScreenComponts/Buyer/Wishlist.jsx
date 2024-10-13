import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { GetData } from '../../Contexts/GetDataContext';
import { TextInput, Text, Headline, Searchbar, useTheme } from 'react-native-paper';
import CourseList from './CourseList';
import { useNavigation } from '@react-navigation/native';
import CourseListBuyer from './CourseListBuyer';
import CourseListWish from './CourseListWish';
import Navbar from "../../Navigations/navbar";



const Wishlist = ({ isDarkMode, toggleDarkMode, navigation }) => {
  const {courseBuyerWish} = useContext(GetData);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();

   function fetchCourses() {
  
    setCourses(courseBuyerWish);
  }

  useEffect(() => {
    fetchCourses();
  }, [courseBuyerWish]);

  const filteredCourses = courses?.filter((course) =>
    course.data.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if(courseBuyerWish.length==0){
    return (
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        navigation={navigation}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No courses in your wishlist yet.</Text>
      </View>
      </SafeAreaView>
    );  
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background },isDarkMode && styles.darkContainer]}>
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        navigation={navigation}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={[styles.header,isDarkMode&&styles.darkContainer]}>
          <Headline style={[styles.title,isDarkMode&&styles.darkText]}>All Courses in Wishlist</Headline>
          <Searchbar
            placeholder="Search courses"
            onChangeText={setSearchTerm}
            value={searchTerm}
            style={styles.searchBar}
          />
        </View>
        <CourseListWish 
          filteredCourses={filteredCourses} isDarkMode={isDarkMode}
         
        />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 16,
  },
  darkText: {
    color: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  }
});

export default Wishlist;
