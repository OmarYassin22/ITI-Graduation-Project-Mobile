import React, { useContext, useEffect, useState } from 'react';
import { View, ScrollView, SafeAreaView, StyleSheet } from 'react-native';
import { GetData } from '../../Contexts/GetDataContext';
import { TextInput, Text, Headline, Searchbar, useTheme } from 'react-native-paper';
import CourseList from './CourseList';
import { useNavigation } from '@react-navigation/native';
import CourseListBuyer from './CourseListBuyer';
import CourseListWish from './CourseListWish';
import Navbar from "../../Navigations/navbar";
import SecondNavbar from '../../Navigations/secondNav/secondNavbar';
import { useTranslation } from 'react-i18next';



const Wishlist = ({ isDarkMode, toggleDarkMode, navigation }) => {
  const { t } = useTranslation(); 
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
      <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background },isDarkMode&&styles.darkContainer]}>
      <SecondNavbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        navigation={navigation}
      />
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={[styles.textBold,isDarkMode&&styles.darkText]}>{t('buyer.wishlist.noCourses')}</Text>
      </View>
      </SafeAreaView>
    );  
  }

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.colors.background },isDarkMode && styles.darkContainer]}>
      <SecondNavbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        navigation={navigation}
      />
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={[styles.header,isDarkMode&&styles.darkContainer]}>
          <Headline style={[styles.title,isDarkMode&&styles.darkText]}>{t('buyer.wishlist.allCourses')}</Headline>
          <Searchbar
            placeholder={t('buyer.wishlist.searchPlaceholder')}
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
