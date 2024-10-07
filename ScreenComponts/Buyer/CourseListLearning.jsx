import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const CourseListLearning = ({ filteredCourses }) => {
  useEffect(() => {
    console.log("FilteredCourses in CourseListLearning:", JSON.stringify(filteredCourses, null, 2));
  }, [filteredCourses]);

  const renderCourseItem = ({ item: course }) => {
    console.log("Rendering course item:", JSON.stringify(course, null, 2));
    return (
      <Card style={styles.card}>
        <Card.Cover source={{ uri: course.image }} />
        <Card.Content>
          <Title>{course?.title}</Title>
          <Paragraph>{`by: ${course.instructor?.split(" ").slice(0, 3).join(" ")}`}</Paragraph>
          <Paragraph style={styles.price}>{`Price: ${course.price} $`}</Paragraph>
        </Card.Content>
        <Card.Actions style={styles.cardActions}>
          <Button
            icon="book-open-variant"
            mode="contained"
            onPress={() => console.log("Start Learning pressed for course:", course.id)}
          >
            Start Learning
          </Button>
        </Card.Actions>
      </Card>
    );
  };

  return (
    <FlatList
      data={filteredCourses}
      renderItem={renderCourseItem}
      keyExtractor={(item) => item.id.toString()}
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

export default CourseListLearning;