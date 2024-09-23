import React from 'react';
import { View, Text, ScrollView, Image, FlatList } from 'react-native';
import { useCourses } from '../../api/courses/CourseContext'; 
import Navbar from '../../Navigations/navbar';
import { List } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import styles from './StyleHome';
import { useInstructors } from '../../api/students/InstructorsContext';

const HomeScreen = ({ isDarkMode, toggleDarkMode, navigation }) => {
  const { courses, loading } = useCourses();
const {instructors}=useInstructors
  const renderCourse = ({ item }) => (
    <View style={styles.courseCard}>
      <Image source={{ uri: item.image }} style={styles.courseImage} resizeMode="cover" />
      <View style={styles.overlay}></View>
      <View style={styles.cardContent}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>{parseFloat(item.rating).toFixed(2)}</Text>
        </View>
      </View>
    </View>
  );

  return (
    <View style={[styles.screenContainer, isDarkMode && styles.darkContainer]}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} navigation={navigation} />
      <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <View style={styles.introSection}>
          <View style={styles.introTextContainer}>
            <Text style={[styles.introHeading, isDarkMode && styles.darkText]}>
              Grow Your Skills In{" "}
              <Text style={styles.introHighlight}>Few Minutes</Text>
            </Text>
            <Text style={[styles.introParagraph, isDarkMode && styles.darkText]}>
              We are accredited with the Most Lorem ipsum dolor sit amet consectetur.
            </Text>
          </View>
          <Image source={require("../../assets/image/13.jpg")} style={styles.introImage} resizeMode="cover" />
        </View>

        <View style={styles.containerTxt}>
          <View style={styles.overlayTxt}></View>
          <Text style={[styles.txtTitle, isDarkMode && styles.darkText]}>Your Future Starts Now</Text>
          <Text style={[styles.txtSubtitle, isDarkMode && styles.darkText]}>
            Let Us Help You To build a Build Good One.
          </Text>
        </View>

        <View style={styles.coursesSection}>
          <Text style={[styles.sectionHeading, isDarkMode && styles.darkText]}>Most Popular Courses</Text>
          {loading ? (
            <Text>Loading...</Text> 
          ) : (
            <FlatList
              data={courses}
              renderItem={renderCourse}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.courseList}
            />
          )}
        </View>

        <View style={styles.content}>
          <List.AccordionGroup style={[styles.sectionHeading, isDarkMode && styles.darkText]}>
            <List.Accordion
              titleStyle={[styles.accordionTitle, isDarkMode && styles.darkText]}
              style={[styles.accordionBackground, isDarkMode && styles.darkAccordionBackground]}
              title="What is E-Learning?"
              id="1"
            >
              <CustomListItem title="E-Learning is an online learning platform dedicated to providing high-quality, accessible education to learners worldwide." isDarkMode={isDarkMode} />
            </List.Accordion>
            <List.Accordion
              titleStyle={[styles.accordionTitle, isDarkMode && styles.darkText]}
              style={[styles.accordionBackground, isDarkMode && styles.darkAccordionBackground]}
              title="Our Mission"
              id="2"
            >
              <CustomListItem title="Our mission is to empower individuals worldwide through accessible, high-quality education." isDarkMode={isDarkMode} />
            </List.Accordion>
            <List.Accordion
              titleStyle={[styles.accordionTitle, isDarkMode && styles.darkText]}
              style={[styles.accordionBackground, isDarkMode && styles.darkAccordionBackground]}
              title="Our Instructors"
              id="3"
            >
              <CustomListItem title="Our courses are taught by industry experts." isDarkMode={isDarkMode} />
            </List.Accordion>
            <List.Accordion
              titleStyle={[styles.accordionTitle, isDarkMode && styles.darkText]}
              style={[styles.accordionBackground, isDarkMode && styles.darkAccordionBackground]}
              title="How E-Learning is Unique"
              id="4"
            >
              <CustomListItem title="E-learning stands out through quality-focused content and interactive learning." isDarkMode={isDarkMode} />
            </List.Accordion>
          </List.AccordionGroup>
        </View>
      </ScrollView>
      <View>
         {/* <FlatList
              data={instructors}
              // renderItem={renderCourse}
              keyExtractor={(item) => item.id}
              horizontal={true}
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.instructors}
            /> */}
      </View>
    </View>
  );
};

const CustomListItem = ({ title, isDarkMode }) => (
  <View style={{ marginBottom: 10 }}>
    <Text style={[styles.itemText, isDarkMode ? styles.darkText : styles.lightText]} numberOfLines={3} ellipsizeMode="tail">
      {title}
    </Text>
  </View>
);

export default HomeScreen;
