import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { GetData } from '../../Contexts/GetDataContext';
import { TextInput, Text, Headline, Searchbar, useTheme } from 'react-native-paper';
import CourseList from './CourseList';
import { useNavigation } from '@react-navigation/native';
import CourseListBuyer from './CourseListBuyer';
import CourseListWish from './CourseListWish';



const Wishlist = () => {
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
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No courses in your wishlist yet.</Text>
      </View>
    );  
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Headline style={styles.title}>All Courses in Wishlist</Headline>
          <Searchbar
            placeholder="Search courses"
            onChangeText={setSearchTerm}
            value={searchTerm}
            style={styles.searchBar}
          />
        </View>
        <CourseListWish 
          filteredCourses={filteredCourses} 
         
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
});

export default Wishlist;
