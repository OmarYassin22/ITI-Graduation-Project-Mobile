import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const CourseList = ({ filteredCourses }) => {
  const navigation= useNavigation()

  const openCourseDetails = (courseId) => {
    navigation.navigate('CourseDetailes',  { id: courseId })
    console.log('Opening course with ID:', courseId);
  };
  const renderCourseItem = ({ item: course }) => (
    <Card style={styles.card}>
      <Card.Cover source={{ uri: course.image }} />
      <Card.Content>
        <Title>{course.data.title}</Title>
        <Paragraph>{`by: ${course.data.instructor.split(" ").slice(0, 3).join(" ")}`}</Paragraph>
        <Paragraph style={styles.price}>{`Price: ${course.data.price} $`}</Paragraph>
      </Card.Content>
      <Card.Actions style={styles.cardActions}>
        <Button 
          mode="contained" 
          onPress={() => openCourseDetails(course.id)}
        >
          Open course
        </Button>
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
});

export default CourseList;