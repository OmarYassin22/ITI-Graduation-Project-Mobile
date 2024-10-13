import React, { useContext } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { useNavigation } from '@react-navigation/native';
import { GetData } from '../../Contexts/GetDataContext';

const CourseListWish = ({ filteredCourses,isDarkMode }) => {
  const navigation = useNavigation();
  const {   addToCart,  removeFromWishlist } = useContext(GetData);
  const renderCourseItem = ({ item: course }) => (
    <Card style={[styles.card, isDarkMode && styles.darkContainer]}>
      <Card.Cover source={{ uri: course.image }} />
      <Card.Content>
        <Title style={isDarkMode && styles.darkText}>{course.data.title}</Title>
        <Paragraph style={isDarkMode && styles.darkText}>{`by: ${course.data.instructor.split(" ").slice(0, 3).join(" ")}`}</Paragraph>
        <Paragraph style={[styles.price, isDarkMode && styles.darkText]}>{`Price: ${course.data.price} $`}</Paragraph>
        <Paragraph style={isDarkMode && styles.darkText}>{`Duration: ${course?.data?.duration} hrs`}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.btn}>
      <Button style={{marginBottom:10}} icon="cart" onPress={()=>{
        addToCart(course);
        removeFromWishlist(course.id)
        navigation.navigate('Mycart');
      }} mode="contained" >Add TO Cart</Button>
      <Button icon="heart"onPress={()=>removeFromWishlist(course.id)} mode="contained">Remove from Wishlist</Button>
    </Card.Actions>
    </Card>
  );

  return (
    <FlatList
      data={filteredCourses}
      renderItem={renderCourseItem}
      keyExtractor={(item, index) => index.toString()}
      contentContainerStyle={styles.list}
    />
  );
};

const styles = StyleSheet.create({
  list: {
    padding: 16,
  },
  card: {
    marginBottom: 16,
  },
  price: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 8,
  },
  cardActions: {
    justifyContent: 'center',
    marginTop: 8,
  },
  btn: {
    flex: 1,
    padding: 16,
    flexDirection: 'column',
    
    justifyContent: 'center',
    alignItems: 'between',
  },
  darkText: {
    color: '#fff',
  },
  darkContainer: {
    backgroundColor: '#7f7f7f',
  }
});


export default CourseListWish;