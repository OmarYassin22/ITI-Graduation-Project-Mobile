import React, { useContext, useEffect, useState } from 'react';
import { View, Text, StyleSheet, ScrollView, Alert } from 'react-native';
import { GetData } from '../../Contexts/GetDataContext';
import { Card, Title, Paragraph,Button } from 'react-native-paper';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';




const CourseDetailes = ({ route }) => {
  const navigation = useNavigation();
  const [course, setCourse] = useState(null);
  const { getCourseById ,courseBuyerCart, setCourseBuyerCart,courseBuyerWish, setCourseBuyerWish} = useContext(GetData);
//   useEffect(() =>{console.warn(getCourseById)},[])

  useEffect(() => {
    async function fetchCourse() {
      if (route.params && route.params.id) {
        const data = await getCourseById(route.params.id);
        setCourse(data);
        console.log('Fetched course data:', data);
      } else {
        console.log('No course ID provided in route params');
      }
    }

    fetchCourse();
  }, [route.params, getCourseById]);

  if (!course) {
    return (
      <View style={styles.container}>
        <Text>Loading course details...</Text>
      </View>
    );
  }
  function addToCart() {
    if (courseBuyerCart.some((item) => item.id === course.id)) {
      Alert.alert('Course already in cart:', course.data.title);
    } else {
      setCourseBuyerCart([...courseBuyerCart, course]);
      navigation.navigate('Mycart');
      Alert.alert('Course added to cart:', course.data.title);
  
      // Save updated cart data to local storage
      const saveCartData = async () => {
        try {
          await AsyncStorage.setItem('courseBuyerCart', JSON.stringify(courseBuyerCart));
        } catch (e) {
          console.error('Error saving cart data:', e);
        }
      };
  
      saveCartData();
    }
  }
  
  function addToWishlist() {
    if (courseBuyerWish.some((item) => item.id === course.id)) {
      Alert.alert('Course already in wishlist:', course.data.title);
    } else {
      setCourseBuyerWish([...courseBuyerWish, course]);
      navigation.navigate('Wishlist');
      Alert.alert('Course added to wishlist:', course.data.title);
  
      // Save updated wishlist data to local storage
      const saveWishData = async () => {
        try {
          await AsyncStorage.setItem('courseBuyerWish', JSON.stringify(courseBuyerWish));
        } catch (e) {
          console.error('Error saving wish data:', e);
        }
      };
  
      saveWishData();
    }
  }

  return (

    <ScrollView>
    <Card>
    <Card.Cover source={{ uri: course.data.imgPath }} />
    <Card.Content>
      <Title>{course.data.title}</Title>
      <Paragraph>{course.data.details}</Paragraph>
      <Paragraph><Text style={{ fontWeight: 'bold' }}>Duration:</Text> {course.data.duration}</Paragraph>
      <Paragraph><Text style={{ fontWeight: 'bold' }}>Instructor:</Text> {course.data.instructor}</Paragraph>
      <Paragraph><Text style={{ fontWeight: 'bold' }}>Price:</Text> {course.data.price} $</Paragraph>
      <Paragraph><Text style={{ fontWeight: 'bold' }}>Rating:</Text> {course.data.rating||4.3} <MaterialCommunityIcons name="star" color={"green"}  size={16} /> </Paragraph>
      <Paragraph><Text style={{ fontWeight: 'bold' }}>Track:</Text> {course.data.track}</Paragraph>
    
    </Card.Content>
    <Card.Actions style={styles.btn}>
      <Button icon="cart" onPress={()=>addToCart()} mode="contained" >Add TO Cart</Button>
      <Button icon="heart"onPress={()=>addToWishlist()} mode="contained">Add TO Wishlist</Button>
    </Card.Actions>
  </Card>
  </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'between',
  },
  btn: {
    flex: 1,
    padding: 16,
    justifyContent: 'center',
    alignItems: 'between',
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
});

export default CourseDetailes;