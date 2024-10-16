import React, { useContext, useState, useEffect } from "react";
import {
  View,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import { GetData } from "../../Contexts/GetDataContext";
import {
  Text,
  Headline,
  Searchbar,
  useTheme,
  Button,
} from "react-native-paper";
import CourseListBuyer from "./CourseListBuyer";
import Navbar from "../../Navigations/navbar";
import {
  StripeProvider,
  CardField,
  useStripe,
} from "@stripe/stripe-react-native";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
  updateDoc,
  arrayUnion,
} from "firebase/firestore";
import { db } from "../../firebase";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import SecondNavbar from "../../Navigations/secondNav/secondNavbar";


// Use Stripe's test publishable key
const STRIPE_PUBLISHABLE_KEY =
  "pk_test_51PrP4TBp38FM06vYjqUSTOWFAdyY60sB8ibBsgfWBIbVReUBAauq8qRPyJR4TRdBgzyBY1SnxeRN23cmyQg4wu2Y00iBHn5Kvm";

const Mycart = ({  isDarkMode, toggleDarkMode }) => {
  const { courseBuyerCart, setCourseBuyerCart } = useContext(GetData);
  const [courses, setCourses] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(false);
  const [buyerEmail, setBuyerEmail] = useState("");
  const theme = useTheme();
  const { createToken } = useStripe();
  const navigation = useNavigation();

  async function fetchEmail() {
    try {
      const email = await AsyncStorage.getItem("email");
      setBuyerEmail(email);
    } catch (error) {
      console.error("Error fetching email:", error);
    }
  }

  useEffect(() => {
    fetchEmail();
  }, []);

  useEffect(() => {
    setCourses(courseBuyerCart);
  }, [courseBuyerCart]);

  const filteredCourses = courses?.filter((course) =>
    course.data.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const purchasedCourseIds = courses
    .filter((course) => course != null && course.id != null)
    .map((course) => course.id);

  const totalAmount = courseBuyerCart
    .reduce((acc, curr) => acc + parseInt(curr.data.price), 0)
    .toFixed(2);

  const handlePayment = async () => {
    setLoading(true);
    try {
      if (!buyerEmail) {
        throw new Error("Buyer email is not available. Please log in again.");
      }

      // Create a token
      const { token, error } = await createToken({ type: "Card" });

      if (error) {
        throw new Error(error.message);
      }

      if (token) {

        Alert.alert(
          "Processing",
          "Payment successful! Updating your courses..."
        );

        // 3. increment courses buyed in Firebase
        for (const courseId of purchasedCourseIds) {
          const courseRef = doc(db, "courses", courseId);

          // Get the current 'buyers' count for the course
          const courseSnapshot = await getDoc(courseRef);
          const currentBuyersCount = courseSnapshot.data()?.buyers || 0;

          // Increment the 'buyers' field by 1 for the course
          const updatedBuyersCount = currentBuyersCount + 1;

          // Update the 'buyers' field in the course document
          await updateDoc(courseRef, { buyers: updatedBuyersCount });

          
        }

        // 3. Update Firebase
        const UserDataCollection = collection(db, "UserData");

        const querySnapshot = await getDocs(UserDataCollection);

        let buyerUser = null;
        querySnapshot.docs.forEach((doc) => {
          const userData = doc.data();
          if (
            userData.email.toLowerCase() ===
            buyerEmail.substring(1, buyerEmail.length - 1).toLowerCase()
          ) {
            buyerUser = { id: doc.id, ...userData };
          }
        });


        if (buyerUser) {
          const userRef = doc(db, "UserData", buyerUser.id);

          // Update the buyedCourses array with the new purchased course IDs
          await updateDoc(userRef, {
            buyedCourses: arrayUnion(...purchasedCourseIds),
          });



          // Clear the cart in AsyncStorage and state
          await AsyncStorage.setItem("courseBuyerCart", JSON.stringify([]));
          setCourseBuyerCart([]);
          setCourses([]);

          Alert.alert(
            "Success",
            "Your courses have been added to your learning list!",
            [{ text: "OK", onPress: () => navigation.navigate("Mylearning") }]
          );
        } else {
          throw new Error(
            `User document not found for email: ${buyerEmail}. Please check your account details.`
          );
        }
      }
    } catch (error) {
      console.error("Payment or update error:", error);
      Alert.alert(
        "Error",
        error.message ||
          "There was a problem processing your payment or updating your courses. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  if (courseBuyerCart.length === 0) {
    return (
      <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background },isDarkMode && styles.darkContainer]}
    >
     
      <SafeAreaView
      style={[styles.container, { backgroundColor: theme.colors.background },isDarkMode && styles.darkContainer]}
      >
       <SecondNavbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        navigation={navigation}
      />

        <View
          style={{ flex: 1, justifyContent: "center", alignItems: "center" }}
        >
          <Text style={ [styles.totalAmount,isDarkMode&&styles.darkText]}>No courses in your cart yet.</Text>
        </View>
      </SafeAreaView>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView
    style={[styles.container, { backgroundColor: theme.colors.background },isDarkMode && styles.darkContainer]}

    >
             <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        navigation={navigation}
      />
      <StripeProvider publishableKey={STRIPE_PUBLISHABLE_KEY}>
        <SafeAreaView
          style={[
            styles.container,
            { backgroundColor: theme.colors.background },isDarkMode && styles.darkContainer
          ]}
        >
          <ScrollView contentContainerStyle={styles.scrollView}>
            <View style={styles.header}>
              <Headline style={[styles.title,isDarkMode&&styles.darkText]}>All Courses in My Cart</Headline>
              <Searchbar
                placeholder="Search courses"
                onChangeText={setSearchTerm}
                value={searchTerm}
                style={styles.searchBar}
              />
            </View>
            <CourseListBuyer filteredCourses={filteredCourses} isDarkMode={isDarkMode} />
            <View style={styles.paymentSection}>
              <Text style={[styles.totalAmount,isDarkMode&&styles.darkText]}>Total: ${totalAmount}</Text>
              <CardField
                postalCodeEnabled={true}
                placeholder={{
                  number: "4242 4242 4242 4242",
                }}
                cardStyle={{
                  backgroundColor: "#FFFFFF",
                  textColor: "#000000",
                }}
                style={{
                  width: "100%",
                  height: 50,
                  marginVertical: 20,
                }}
              />
              <Button
                icon="cart"
                mode="contained"
                onPress={handlePayment}
                disabled={loading}
                loading={loading}
              >
                {loading ? "Processing..." : "Buy now "}
              </Button>
            </View>
          </ScrollView>
        </SafeAreaView>
      </StripeProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flexGrow: 1,
    padding: 16,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
  },
  searchBar: {
    marginBottom: 16,
  },
  paymentSection: {
    marginLeft: 30,
    marginRight: 30,
  },
  totalAmount: {
    marginBottom: 20,
    fontSize: 16,
    fontWeight: "bold",
  },
  darkText: {
    color: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  }
});

export default Mycart;
