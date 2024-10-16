// import React, { useEffect } from 'react';
// import { View, FlatList, StyleSheet } from 'react-native';
// import { Card, Title, Paragraph, Button } from 'react-native-paper';

// const CourseListLearning = ({ filteredCourses,isDarkMode }) => {


//   const renderCourseItem = ({ item: course }) => {
//     return (
//       <Card style={[styles.card,isDarkMode&&styles.darkContainer]}>
//         <Card.Cover source={{ uri: course.cImage }} />
//         <Card.Content>
//           <Title style={[styles.price,isDarkMode&&styles.darkText]}>{course?.title}</Title>
//           <Paragraph style={[isDarkMode&&styles.darkText]}>{`by: ${course.instructor?.split(" ").slice(0, 3).join(" ")}`}</Paragraph>
//           <Paragraph style={[isDarkMode&&styles.darkText]}>{`Price: ${course.price} $`}</Paragraph>
//           <Paragraph style={[isDarkMode&&styles.darkText]}>{`Duration: ${course.duration} hrs`}</Paragraph>

//         </Card.Content>
//         <Card.Actions style={styles.cardActions}>
//           <Button
//             icon="book-open-variant"
//             mode="contained"
//             onPress={() => console.log("Start Learning pressed for course:", course.id)}
//           >
//             Start Learning
//           </Button>
//         </Card.Actions>
//       </Card>
//     );
//   };

//   return (
//     <FlatList
//       data={filteredCourses}
//       renderItem={renderCourseItem}
//       keyExtractor={(item) => item.id.toString()}
//       contentContainerStyle={styles.list}
//     />
//   );
// };

// const styles = StyleSheet.create({
//   list: {
//     padding: 16,
//   },
//   card: {
//     marginBottom: 16,
//   },
//   price: {
//     fontSize: 20,
//     fontWeight: 'bold',
//     marginTop: 8,
//   },
//   cardActions: {
//     justifyContent: 'center',
//     marginTop: 8,
//   },
//   darkText: {
//     color: '#fff',
//   },
//   darkContainer: {
//     backgroundColor: '#7f7f7f',
//   }
// });

// export default CourseListLearning;


import React, { useState } from 'react';
import { View, FlatList, StyleSheet, Alert } from 'react-native';
import { Card, Title, Paragraph, Button } from 'react-native-paper';
import { Video } from 'expo-av';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import { useTranslation } from 'react-i18next';
import Buyer from './Buyer';

const CourseListLearning = ({ filteredCourses, isDarkMode }) => {
  const { t } = useTranslation(); 
  const [selectedCourse, setSelectedCourse] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);

  const handleStartLearning = async (course) => {
    const storage = getStorage();
    const courseRef = ref(storage, `${course.instructor}/${course.title}`);

    try {
      const result = await listAll(courseRef);
      const videoItems = result.items.filter(item => item.name.toLowerCase().endsWith('.mp4'));
      
      if (videoItems.length > 0) {
        const url = await getDownloadURL(videoItems[0]);
        setVideoUrl(url);
        setSelectedCourse(course);
      } else {
        throw new Error("No MP4 files found for this course");
      }
    } catch (error) {
      console.error("Error fetching video:", error);
      Alert.alert("Error", "Unable to load the course video.");
    }
  };

  const renderCourseItem = ({ item: course }) => {
    const isSelected = selectedCourse && selectedCourse.id === course.id;

    return (
      <>
        <Card style={[styles.card, isDarkMode && styles.darkContainer]}>
          <Card.Cover source={{ uri: course.cImage }} />
          <Card.Content>
            <Title style={[styles.price, isDarkMode && styles.darkText]}>{course?.title}</Title>
            <Paragraph style={[isDarkMode && styles.darkText]}>{t("buyer.courseListlearning.byInstructor")}: {`${course.instructor?.split(" ").slice(0, 3).join(" ")}`}</Paragraph>
            <Paragraph style={[isDarkMode && styles.darkText]}>{t("buyer.courseListlearning.priceLabel")}: {`${course.price} $`}</Paragraph>
            <Paragraph style={[isDarkMode && styles.darkText]}>{t("buyer.courseListlearning.durationLabel")}: {`${course.duration} hrs`}</Paragraph>
          </Card.Content>
          <Card.Actions style={styles.cardActions}>
            <Button
              icon="book-open-variant"
              mode="contained"
              onPress={() => handleStartLearning(course)}
            >
              {isSelected ? `${t("buyer.courseListlearning.WatchVideo")}` : `${t("buyer.courseListlearning.StartLearning")}`}
            </Button>
          </Card.Actions>
        </Card>
        {isSelected && videoUrl && (
          <Video
            source={{ uri: videoUrl }}
            rate={1.0}
            volume={1.0}
            isMuted={false}
            resizeMode="contain"
            shouldPlay={false}
            isLooping={false}
            useNativeControls
            style={styles.video}
          />
        )}
      </>
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
  },
  video: {
    width: '70%',
    height: 500,
    margin: "auto",
    marginTop: 20,
  }
});

export default CourseListLearning;