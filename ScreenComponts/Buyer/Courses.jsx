import React, { useContext, useEffect, useState } from "react";
import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";
import { GetData } from "../../Contexts/GetDataContext";
import {
  TextInput,
  Text,
  Headline,
  Searchbar,
  useTheme,
} from "react-native-paper";
import CourseList from "./CourseList";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Navbar from "../../Navigations/navbar";
const Courses = ({ isDarkMode, toggleDarkMode, navigation }) => {
  const { getAllCourses } = useContext(GetData);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const theme = useTheme();

  async function fetchCourses() {
    console.warn("buyer email is " + (await AsyncStorage.getItem("email")));
    const email = await AsyncStorage.getItem("email");
    console.error(email);

    const data = await getAllCourses();
    setCourses(data);
  }

  useEffect(async () => {
    fetchCourses();
  }, []);

  const filteredCourses = courses?.filter((course) =>
    course.data.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background },isDarkMode && styles.darkContainer]}
    >
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        navigation={navigation}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Headline style={[styles.title,isDarkMode&&styles.darkText]}>All Courses in our App</Headline>
          <Searchbar
            placeholder="Search courses"
            onChangeText={setSearchTerm}
            value={searchTerm}
            style={styles.searchBar}
          />
        </View>
        <CourseList filteredCourses={filteredCourses} isDarkMode={isDarkMode} />
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
    fontWeight: "bold",
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

export default Courses;
