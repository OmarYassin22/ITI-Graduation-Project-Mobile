import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState, useCallback } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc,
} from "firebase/firestore";
import {
  Text,
  Headline,
  Searchbar,
  ActivityIndicator,
} from "react-native-paper";
import { View, ScrollView, SafeAreaView, StyleSheet } from "react-native";

import { db } from "../../firebase";
import CourseListLearning from "./CourseListLearning";

const Mylearning = () => {
  const [buyedCourses, setBuyedCourses] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const fetchEmail = useCallback(async () => {
    try {
      const email = await AsyncStorage.getItem("email");
      console.log("Raw email from AsyncStorage:", email);
      if (email) {
        const trimmedEmail = email.replace(/^"|"$/g, "");
        console.log("Trimmed buyer email:", trimmedEmail);
        setBuyerEmail(trimmedEmail);
      } else {
        throw new Error("Email not found in AsyncStorage");
      }
    } catch (error) {
      console.error("Error fetching email:", error);
      setError("Error fetching email: " + error.message);
    }
  }, []);

  const getData = useCallback(async () => {
    try {
      if (!buyerEmail) {
        throw new Error("Email is missing. Please try again.");
      }

      const UserDataCollection = collection(db, "UserData");
      const q = query(UserDataCollection, where("email", "==", buyerEmail));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0];
        let userDocument = userDoc.data();
        console.log(
          "User document data:",
          JSON.stringify(userDocument, null, 2)
        );
        if (Array.isArray(userDocument.buyedCourses)) {
          setBuyedCourses(userDocument.buyedCourses);
          console.log(
            "Buyed courses:",
            JSON.stringify(userDocument.buyedCourses, null, 2)
          );
        } else {
          console.warn(
            "buyedCourses is not an array:",
            userDocument.buyedCourses
          );
          setBuyedCourses([]);
        }
      } else {
        console.warn("No user document found for email:", buyerEmail);
        setBuyedCourses([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching user data: " + error.message);
    }
  }, [buyerEmail]);

  const fetchCourseData = useCallback(async () => {
    setIsLoading(true);
    try {
      const coursesData = await Promise.all(
        buyedCourses.map(async (courseId) => {
          try {
            const courseRef = doc(db, "courses", courseId);
            const courseSnap = await getDoc(courseRef);
            if (courseSnap.exists()) {
              const data = courseSnap.data();
              console.log(
                "Fetched course data for ID",
                courseId,
                ":",
                JSON.stringify(data, null, 2)
              );
              return { id: courseId, ...data };
            } else {
              console.warn("No such course:", courseId);
              return null;
            }
          } catch (error) {
            console.error("Error fetching course:", courseId, error);
            return null;
          }
        })
      );
      const validCoursesData = coursesData.filter((course) => course !== null);
      console.log(
        "Valid courses data:",
        JSON.stringify(validCoursesData, null, 2)
      );
      setCourseData(validCoursesData);
    } catch (error) {
      console.error("Error fetching course data:", error);
      setError("Error fetching course data: " + error.message);
    } finally {
      setIsLoading(false);
    }
  }, [buyedCourses]);

  useEffect(() => {
    fetchEmail();
  }, [fetchEmail]);

  useEffect(() => {
    if (buyerEmail) {
      getData();
    }
  }, [buyerEmail, getData]);

  useEffect(() => {
    if (buyedCourses.length > 0) {
      fetchCourseData();
    } else {
      setIsLoading(false);
    }
  }, [buyedCourses, fetchCourseData]);

  const filteredCourses = courseData.filter((course) => {
    if (!course) {
      console.warn("Undefined course in courseData");
      return false;
    }
    console.log("Filtering course:", JSON.stringify(course, null, 2));
    return (
      course?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
    );
  });

  console.log("Filtered courses:", JSON.stringify(filteredCourses, null, 2));

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator size="large" />
        <Text>Loading your courses...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Error: {error}</Text>
      </View>
    );
  }

  if (courseData.length === 0) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>No courses in your learning list yet.</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Headline style={styles.head}>All Courses in My Learning</Headline>
          <Searchbar
            placeholder="Search courses"
            onChangeText={setSearchTerm}
            value={searchTerm}
            style={styles.searchBar}
          />
        </View>
        <CourseListLearning filteredCourses={filteredCourses} />
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
  head: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 16,
  },
  button: {
    marginTop: 20,
  },
});

export default Mylearning;
