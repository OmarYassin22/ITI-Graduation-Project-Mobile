import React, { useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableOpacity,
  FlatList,
  ScrollView,
} from "react-native";
import { collection, getDocs, addDoc } from "firebase/firestore";

import {
  ref,
  uploadBytes,
  listAll,
  list,
  getDownloadURL,
} from "firebase/storage";
import { useNavigation } from "@react-navigation/native";
import { FontAwesome } from "@expo/vector-icons";
import Accordion from "./Accordion";
import { db, storage } from "../../firebaseConfig";

const Home = () => {
  const navigation = useNavigation();
  const staticCourses = [
    {
      id: "1",
      title: "Java Script",
      rating: 4.5,
      image: require("../../assets/coureses images/JavaScript.png"),
    },
    {
      id: "2",
      title: "Css",
      rating: 4.0,
      image: require("../../assets/coureses images/css.png"),
    },
    {
      id: "3",
      title: "HTML",
      rating: 4.8,
      image: require("../../assets/coureses images/HTML-5.png"),
    },
    {
      id: "4",
      title: "Java",
      rating: 4.7,
      image: require("../../assets/coureses images/java.png"),
    },
    {
      id: "5",
      title: "Flutter",
      rating: 4.2,
      image: require("../../assets/coureses images/flutterr.png"),
    },
    {
      id: "6",
      title: ".Net",
      rating: 4.6,
      image: require("../../assets/coureses images/net.png"),
    },
    {
      id: "7",
      title: "Next.js",
      rating: 4.9,
      image: require("../../assets/coureses images/next-js.png"),
    },
  ];
  // test for previous APi
  // result --> #######work#######
  useEffect(async () => {
    async function fetch() {
      let imagesRef = ref(storage, "images/courses/");
      let imageUrls = [];
      let res = await listAll(imagesRef).then((response) =>
        response.items.forEach((item) =>
          getDownloadURL(item).then((url) => imageUrls.push(url))
        )
      );
      console.log("================================================");
      console.log(res);
      console.log("================================================");
      const querySnapshot = await getDocs(collection(db, "courses"));
      if (querySnapshot) console.log("get done");
      data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          data: doc.data(),
          image: imageUrls.filter((url, i) => url.includes(doc.data().imgPath)),
        });
      });
      console.warn(data);
    }


    fetch();
  }, []);

  const renderCourse = ({ item }) => (
    <TouchableOpacity
      style={styles.courseCard}
      onPress={() =>
        navigation.navigate("CourseDetails", { courseId: item.id })
      }
    >
      <Image
        source={item.image}
        style={styles.courseImage}
        resizeMode="cover"
      />
      <View style={styles.overlay}></View>
      <View style={styles.cardContent}>
        <Text style={styles.courseTitle}>{item.title}</Text>
        <View style={styles.ratingContainer}>
          <FontAwesome name="star" size={16} color="#FFD700" />
          <Text style={styles.ratingText}>
            {parseFloat(item.rating).toFixed(2)}
          </Text>
        </View>
      </View>
    </TouchableOpacity>
  );

  return (
    <ScrollView style={styles.container}>
      <View style={styles.introSection}>
        <View style={styles.introTextContainer}>
          <Text style={styles.introHeading}>
            Grow Your Skills In{" "}
            <Text style={styles.introHighlight}>Few Minutes</Text>
          </Text>
          <Text style={styles.introParagraph}>
            We are accredited with the Most Lorem ipsum dolor sit amet
            consectetur.
          </Text>
        </View>
        <Image
          source={require("../../assets/image/13.jpg")}
          style={styles.introImage}
          resizeMode="cover"
        />
      </View>

      <View style={styles.containerTxt}>
        <View style={styles.overlayTxt}></View>
        <Text style={styles.txtTitle}>Your Future Starts Now</Text>
        <Text style={styles.txtSubtitle}>
          Let Us Help You To build a Build Good One.
        </Text>
      </View>

      {/* Popular Courses Section */}
      <View style={styles.coursesSection}>
        <Text style={styles.sectionHeading}>Most Popular Courses</Text>
        <FlatList
          data={staticCourses}
          renderItem={renderCourse}
          keyExtractor={(item) => item.id}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.courseList}
        />
      </View>
      <Accordion />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#f0f0f0",
    marginVertical: 10,
  },
  introSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  introTextContainer: {
    flex: 1,
    marginRight: 10,
  },
  introHeading: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  introHighlight: {
    color: "#1e90ff",
    fontWeight: "bold",
  },
  introParagraph: {
    marginTop: 10,
    fontSize: 16,
    color: "#666",
  },
  introImage: {
    width: 150,
    height: 150,
    borderRadius: 10,
  },
  coursesSection: {
    marginTop: 20,
  },
  sectionHeading: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  courseList: {
    paddingHorizontal: 10,
  },
  courseCard: {
    width: 250,
    height: 180,
    marginRight: 10,
    borderRadius: 10,
    overflow: "hidden",
    position: "relative",
  },
  courseImage: {
    width: "100%",
    height: "100%",
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  cardContent: {
    position: "absolute",
    bottom: 10,
    left: 10,
    zIndex: 2,
  },
  courseTitle: {
    fontSize: 18,
    color: "#fff",
    fontWeight: "bold",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 5,
  },
  ratingText: {
    marginLeft: 5,
    color: "#fff",
    fontSize: 16,
  },
  containerTxt: {
    height: 100,
    position: "relative",
    marginVertical: 20,
  },
  overlayTxt: {
    opacity: 0.6,
    backgroundColor: "#1e3a8a",
    borderRadius: 10,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  txtTitle: {
    color: "#fff",
    fontSize: 23,
    zIndex: 2,
    textAlign: "center",
    marginTop: 20,
  },
  txtSubtitle: {
    color: "#fff",
    zIndex: 2,
    textAlign: "center",
  },
});

export default Home;
