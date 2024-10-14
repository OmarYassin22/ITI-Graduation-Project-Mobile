import React, { useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';

const CourseListLearning = ({ filteredCourses,isDarkMode }) => {


  const renderCourseItem = ({ item: course }) => {
    return (
      <Card style={[styles.card,isDarkMode&&styles.darkContainer]}>
        <Card.Cover source={{ uri: course.cImage }} />
        <Card.Content>
          <Title style={[styles.price,isDarkMode&&styles.darkText]}>{course?.title}</Title>
          <Paragraph style={[isDarkMode&&styles.darkText]}>{`by: ${course.instructor?.split(" ").slice(0, 3).join(" ")}`}</Paragraph>
          <Paragraph style={[isDarkMode&&styles.darkText]}>{`Price: ${course.price} $`}</Paragraph>
          <Paragraph style={[isDarkMode&&styles.darkText]}>{`Duration: ${course.duration} hrs`}</Paragraph>

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
  darkText: {
    color: '#fff',
  },
  darkContainer: {
    backgroundColor: '#7f7f7f',
  }
});

export default CourseListLearning;