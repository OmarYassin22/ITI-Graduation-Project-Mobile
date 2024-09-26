import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { GetData } from '../../Contexts/GetDataContext';
import { TextInput, Text, Headline, Searchbar, useTheme, Button } from 'react-native-paper';
import CourseList from './CourseList';
import { useNavigation } from '@react-navigation/native';
import CourseListBuyer from './CourseListBuyer';


const Mycart = () => {
  const {courseBuyerCart} = useContext(GetData);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();

   function fetchCourses() {
  
    setCourses(courseBuyerCart);
  }

  useEffect(() => {
    fetchCourses();
  }, [courseBuyerCart]);

  const filteredCourses = courses?.filter((course) =>
    course.data.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if(courseBuyerCart.length==0){
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text>No courses in your wishlist yet.</Text>
      </View>
    );  // if wishlist is empty return a message.
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Headline style={styles.title}>All Courses in My Cart</Headline>
          <Searchbar
            placeholder="Search courses"
            onChangeText={setSearchTerm}
            value={searchTerm}
            style={styles.searchBar}
          />
        </View>
        <CourseListBuyer 
          filteredCourses={filteredCourses} 
         
        />
        <View style={{marginLeft:30}}>
          <Text style={{ marginBottom: 20, fontSize: 16, fontWeight: 'bold' }}>
            Total: {courseBuyerCart.reduce((acc, curr) => acc + parseInt(curr.data.price), 0).toFixed(2) } $
          </Text>
          {/* Add a button to checkout */}
          <View style={{ marginBottom: 20 }}>
            <Button icon="cart" mode="contained">Buy now</Button>
          </View>
        </View>
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

export default Mycart;