import React from 'react';
import { View, Text, ScrollView, ImageBackground, FlatList, Image, TouchableOpacity } from 'react-native';
import { useCourses } from '../../api/courses/CourseContext'; 
import Navbar from '../../Navigations/navbar';
import { List } from 'react-native-paper';
import { FontAwesome } from '@expo/vector-icons';
import styles from './StyleHome';
import { useTranslation } from 'react-i18next';

const HomeScreen = ({ isDarkMode, navigation }) => {
  const { t } = useTranslation();
  const { courses, loading } = useCourses();
const {instructors}=useInstructors
  const renderCourse = ({ item }) => (
    <View style={styles.courseCard}>
      <Image source={{ uri: item.cImage }} style={styles.courseImage} resizeMode="cover" />
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
      <Navbar isDarkMode={isDarkMode} navigation={navigation} />
      <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
        <View style={styles.introSection}>
          <View style={styles.introTextContainer}>
            <Text style={[styles.introHeading, isDarkMode && styles.darkText]}>
              {t('home.intro.heading')}{" "}
              <Text style={styles.introHighlight}>{t('home.intro.highlight')}</Text>
            </Text>
            <Text style={[styles.introParagraph, isDarkMode && styles.darkText]}>
              {t('home.intro.paragraph')}
            </Text>
          </View>
          <Image source={require("../../assets/image/13.jpg")} style={styles.introImage} resizeMode="cover" />
        </View>

        <View style={styles.containerTxt}>
          <View style={styles.overlayTxt}></View>
          <Text style={[styles.txtTitle, isDarkMode && styles.darkText]}>{t('home.future.title')}</Text>
          <Text style={[styles.txtSubtitle, isDarkMode && styles.darkText]}>
            {t('home.future.subtitle')}
          </Text>
        </View>

        <View style={styles.coursesSection}>
          <Text style={[styles.sectionHeading, isDarkMode && styles.darkText]}>
            Most Popular Courses
          </Text>
          <ImageBackground 
            style={styles.backgroundImage}
            resizeMode="cover"
          >
            {loading ? (
              <Text style={[styles.loadingText, isDarkMode && styles.darkText]}>Loading courses...</Text> 
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
          </ImageBackground>
        </View>

        <View style={styles.content}>
          <List.AccordionGroup style={[styles.sectionHeading, isDarkMode && styles.darkText]}>
            <List.Accordion
              titleStyle={[styles.accordionTitle, isDarkMode && styles.darkText]}
              style={[styles.accordionBackground, isDarkMode && styles.darkAccordionBackground]}
              title={t('home.accordion.eLearning')}
              id="1"
            >
              <CustomListItem title={t('home.accordion.eLearningDescription')} isDarkMode={isDarkMode} />
            </List.Accordion>
            <List.Accordion
              titleStyle={[styles.accordionTitle, isDarkMode && styles.darkText]}
              style={[styles.accordionBackground, isDarkMode && styles.darkAccordionBackground]}
              title={t('home.accordion.mission')}
              id="2"
            >
              <CustomListItem title={t('home.accordion.missionDescription')} isDarkMode={isDarkMode} />
            </List.Accordion>
            <List.Accordion
              titleStyle={[styles.accordionTitle, isDarkMode && styles.darkText]}
              style={[styles.accordionBackground, isDarkMode && styles.darkAccordionBackground]}
              title={t('home.accordion.instructors')}
              id="3"
            >
              <CustomListItem title={t('home.accordion.instructorsDescription')} isDarkMode={isDarkMode} />
            </List.Accordion>
            <List.Accordion
              titleStyle={[styles.accordionTitle, isDarkMode && styles.darkText]}
              style={[styles.accordionBackground, isDarkMode && styles.darkAccordionBackground]}
              title={t('home.accordion.uniqueness')}
              id="4"
            >
              <CustomListItem title={t('home.accordion.uniquenessDescription')} isDarkMode={isDarkMode} />
            </List.Accordion>
          </List.AccordionGroup>
        </View>
      </ScrollView>
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
