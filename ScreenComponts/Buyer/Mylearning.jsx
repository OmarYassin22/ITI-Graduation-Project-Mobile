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
import { useNavigation } from '@react-navigation/native';
import { db } from "../../firebase";
import CourseListLearning from "./CourseListLearning";
import Navbar from "../../Navigations/navbar";
import SecondNavbar from "../../Navigations/secondNav/secondNavbar";
import { useTranslation } from 'react-i18next';

const Mylearning = ({ isDarkMode, toggleDarkMode } ) => {
  const { t } = useTranslation(); 
  const [buyedCourses, setBuyedCourses] = useState([]);
  const [courseData, setCourseData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [buyerEmail, setBuyerEmail] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const navigation = useNavigation();
  const fetchEmail = useCallback(async () => {
    try {
      const email = await AsyncStorage.getItem("email");
      if (email) {
        const trimmedEmail = email.replace(/^"|"$/g, "");
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
        
        if (Array.isArray(userDocument.buyedCourses)) {
          setBuyedCourses(userDocument.buyedCourses);
          
        } else {
          
          setBuyedCourses([]);
        }
      } else {
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
              
              return { id: courseId, ...data };
            } else {
              return null;
            }
          } catch (error) {
            console.error("Error fetching course:", courseId, error);
            return null;
          }
        })
      );
      const validCoursesData = coursesData.filter((course) => course !== null);
  
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
      return false;
    }

    return (
      course?.title?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false
    );
  });


  if (isLoading) {
    return (
      <View style={[{ flex: 1, justifyContent: "center", alignItems: "center" },isDarkMode&&styles.darkContainer]}
      >
      <SecondNavbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        navigation={navigation}
      />
        <ActivityIndicator size="large" />
        <Text style={[styles.textBold,isDarkMode&&styles.darkText]}>{t('buyer.mylearning.loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View
       style={[{ flex: 1, justifyContent: "center", alignItems: "center" },isDarkMode&&styles.darkContainer]}
       >
        <SecondNavbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        navigation={navigation}
      />
        <Text style={[styles.textBold,isDarkMode&&styles.darkText]}>{t('buyer.mylearning.error')}: {error}</Text>
      </View>
    );
  }

  if (courseData.length === 0) {
    return (
      <View
       style={[{ flex: 1, justifyContent: "center", alignItems: "center" },isDarkMode&&styles.darkContainer]}>
        <Text style={[styles.textBold,isDarkMode&&styles.darkText]}>{t('buyer.mylearning.noCourses')}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={[styles.container,isDarkMode&&styles.darkContainer]}>
       <SecondNavbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        navigation={navigation}
      />
    
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.header}>
          <Headline style={[styles.head,isDarkMode&&styles.darkText]}>{t('buyer.mylearning.allCourses')}</Headline>
          <Searchbar
            placeholder={t('buyer.mylearning.searchPlaceholder')}
            onChangeText={setSearchTerm}
            value={searchTerm}
            style={styles.searchBar}
          />
        </View>
        <CourseListLearning filteredCourses={filteredCourses} isDarkMode={isDarkMode} />
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  textBold: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
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
  darkText: {
    color: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  }
});

export default Mylearning;