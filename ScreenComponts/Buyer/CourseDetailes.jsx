import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { GetData } from '../../Contexts/GetDataContext';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTranslation } from 'react-i18next';

const CourseDetailes = ({ route,isDarkMode }) => {
  const { t } = useTranslation();
  const navigation = useNavigation();
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { 
    getCourseById, 
    courseBuyerCart, 
    setCourseBuyerCart, 
    courseBuyerWish, 
    setCourseBuyerWish 
  } = useContext(GetData);

  useEffect(() => {
    async function fetchCourse() {
      setLoading(true);
      setError(null);
      if (route.params && route.params.id) {
        try {
          const data = await getCourseById(route.params.id);
          if (data) {
            setCourse(data);
          } else {
            setError('Course not found');
          }
        } catch (err) {
          console.error('Error fetching course:', err);
          setError('Failed to fetch course details');
        }
      } else {
        setError('No course ID provided');
      }
      setLoading(false);
    }

    fetchCourse();
  }, [route.params, getCourseById]);

  const addToCart = async () => {
    try {
      if (!course) {
        throw new Error(t('buyer.courseDetails.noData'));
      }
      if (courseBuyerCart.some((item) => item.id === course.id)) {
        Alert.alert(t('buyer.courseDetails.courseAlreadyInCart'), course.data.title);
      } else {
        const updatedCart = [...courseBuyerCart, course];
        setCourseBuyerCart(updatedCart);
        await AsyncStorage.setItem('courseBuyerCart', JSON.stringify(updatedCart));
        navigation.navigate('Mycart');
        Alert.alert(t('buyer.courseDetails.courseAddedToCart'), course.data.title);
      }
    } catch (e) {
      console.error('Error adding to cart:', e);
      Alert.alert(t('buyer.courseDetails.error'), t('buyer.courseDetails.errorMsg'));
    }
  };
  
  const addToWishlist = async () => {
    try {
      if (!course) {
        throw new Error(t('buyer.courseDetails.noData'));
      }
      if (courseBuyerWish.some((item) => item.id === course.id)) {
        Alert.alert(t('buyer.courseDetails.courseAlreadyInWishlist'), course.data.title);
      } else {
        const updatedWishlist = [...courseBuyerWish, course];
        setCourseBuyerWish(updatedWishlist);
        await AsyncStorage.setItem('courseBuyerWish', JSON.stringify(updatedWishlist));
        navigation.navigate('Wishlist');
        Alert.alert(t('buyer.courseDetails.courseAddedToWishlist'), course.data.title);
      }
    } catch (e) {
      console.error('Error adding to wishlist:', e);
      Alert.alert(t('buyer.courseDetails.error'), t('buyer.courseDetails.errorMsg'));
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <Text style={isDarkMode && styles.darkText}>{t('buyer.courseDetails.loading')}</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <Text style={isDarkMode && styles.darkText}>{`${t('buyer.courseDetails.error')} : ${error}`}</Text>
      </View>
    );
  }

  if (!course) {
    return (
      <View style={[styles.container, isDarkMode && styles.darkContainer]}>
        <Text style={isDarkMode && styles.darkText}>{t('buyer.courseDetails.noData')}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={[styles.container, isDarkMode && styles.darkContainer]}>
    <Card style={isDarkMode && styles.darkCard}>
      <Card.Cover source={{ uri: course.data.cImage }} />
      <Card.Content>
        <Title style={isDarkMode && styles.darkText}>{course.data.title}</Title>
        <Paragraph style={isDarkMode && styles.darkText}>{course.data.details}</Paragraph>
        <Paragraph style={isDarkMode && styles.darkText}>
          <Text style={[styles.boldText, isDarkMode && styles.darkText]}>{t('buyer.courseDetails.duration')}:</Text> {course.data.duration}
        </Paragraph>
        <Paragraph style={isDarkMode && styles.darkText}>
          <Text style={[styles.boldText, isDarkMode && styles.darkText]}>{t('buyer.courseDetails.instructor')}:</Text> {course.data.instructor}
        </Paragraph>
        <Paragraph style={isDarkMode && styles.darkText}>
          <Text style={[styles.boldText, isDarkMode && styles.darkText]}>{t('buyer.courseDetails.price')}:</Text> {course.data.price} $
        </Paragraph>
        <Paragraph style={isDarkMode && styles.darkText}>
          <Text style={[styles.boldText, isDarkMode && styles.darkText]}>{t('buyer.courseDetails.rating')}:</Text> {course.data.rating || 4.3} 
          <MaterialCommunityIcons name="star" color={isDarkMode ? "yellow" : "green"} size={16} />
        </Paragraph>
        <Paragraph style={isDarkMode && styles.darkText}>
          <Text style={[styles.boldText, isDarkMode && styles.darkText]}>{t('buyer.courseDetails.track')}:</Text> {course.data.track}
        </Paragraph>
      </Card.Content>
      <Card.Actions style={styles.buttonContainer}>
        <Button 
          icon="cart" 
          onPress={addToCart} 
          mode="contained" 
          style={styles.button}
        
        >
          {t('buyer.courseDetails.addToCart')}
        </Button>
        <Button 
          icon="heart" 
          onPress={addToWishlist} 
          mode="contained"
          style={styles.button}
       
        >
          {t('buyer.courseDetails.addToWishlist')}
        </Button>
      </Card.Actions>
   
    </Card>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  btn: {
    flex: 1,
    padding: 3,
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    alignItems: 'start',
    marginBottom: 16,
  },
  buttonContainer: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
  },
  button: {
    width: '80%',
    marginVertical: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  instructor: {
    fontSize: 18,
    marginBottom: 8,
  },
  price: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  boldText: {
    fontWeight: 'bold',
  },
  darkText: {
    color: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  darkCard: {
    backgroundColor: '#1E1E1E',
  },
  darkButton: {
    backgroundColor: '#333',
  },
  darkButtonText: {
    color: '#fff',
  }
});

export default CourseDetailes;