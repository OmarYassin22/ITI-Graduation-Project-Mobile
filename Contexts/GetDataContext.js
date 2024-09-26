import { createContext, useState, useEffect } from "react";
import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';
import { db } from "../firebase";

export const GetData = createContext();

export const GetDataProvider = ({ children }) => {
  const [courseBuyerCart, setCourseBuyerCart] = useState([]);
  const [courseBuyerWish, setCourseBuyerWish] = useState([]);

  async function getAllCourses() {
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      return data;
    } catch (e) {
      console.error("Error fetching courses:", e);
      return [];
    }
  }

  async function getCourseById(id) {
    try {
      const docRef = doc(db, "courses", id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return {
          id: docSnap.id,
          data: docSnap.data(),
        };
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (e) {
      console.error("Error fetching course:", e);
      return null;
    }
  }

  useEffect(() => {
    const loadStoredData = async () => {
      try {
        const storedCart = await AsyncStorage.getItem('courseBuyerCart');
        const storedWish = await AsyncStorage.getItem('courseBuyerWish');
        
        if (storedCart !== null) {
          setCourseBuyerCart(JSON.parse(storedCart));
        }
        if (storedWish !== null) {
          setCourseBuyerWish(JSON.parse(storedWish));
        }
      } catch (e) {
        console.error('Error loading stored data:', e);
      }
    };

    loadStoredData();
  }, []);

  useEffect(() => {
    const saveData = async () => {
      try {
        await AsyncStorage.setItem('courseBuyerCart', JSON.stringify(courseBuyerCart));
        await AsyncStorage.setItem('courseBuyerWish', JSON.stringify(courseBuyerWish));
      } catch (e) {
        console.error('Error saving data:', e);
      }
    };

    saveData();
  }, [courseBuyerCart, courseBuyerWish]);

  const addToCart = (course) => {
    if (courseBuyerCart.some(item => item.id === course.id)) {
      Alert.alert("Already in Cart", "This course is already in your cart.");
    } else {
      setCourseBuyerCart(prevCart => [...prevCart, course]);
      Alert.alert("Success", "Course added to cart successfully.");
    }
  };

  const removeFromCart = (courseId) => {
    setCourseBuyerCart(prevCart => prevCart.filter(item => item.id !== courseId));
    Alert.alert("Removed", "Course removed from cart successfully.");
  };

  const addToWishlist = (course) => {
    if (courseBuyerWish.some(item => item.id === course.id)) {
      Alert.alert("Already in Wishlist", "This course is already in your wishlist.");
    } else {
      setCourseBuyerWish(prevWish => [...prevWish, course]);
      Alert.alert("Success", "Course added to wishlist successfully.");
    }
  };

  const removeFromWishlist = (courseId) => {
    setCourseBuyerWish(prevWish => prevWish.filter(item => item.id !== courseId));
    Alert.alert("Removed", "Course removed from wishlist successfully.");
  };

  return (
    <GetData.Provider value={{
      getAllCourses,
      getCourseById,
      courseBuyerCart,
      courseBuyerWish,
      setCourseBuyerCart,
      setCourseBuyerWish,
      addToCart,
      removeFromCart,
      addToWishlist,
      removeFromWishlist
    }}>
      {children}
    </GetData.Provider>
  );
};