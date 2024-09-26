import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import styles from "../styles";
import Navbar from "../Navigations/navbar";
import { auth, db } from "../firebase";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";

const Login = ({ isDarkMode, toggleDarkMode, navigation }) => {
  // authontication

  const handleSignUp = async () => {
    try {
      const userCredential = await auth().createUserWithEmailAndPassword(
        email,
        password
      );
      setUser(userCredential.user);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSignIn = async () => {
    try {
      setErrors({});
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(userCredential.user);
      var q = await query(
        collection(db, "UserData"),
        where("uid", "==", userCredential.user.uid)
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          const userType = doc.data().type;
          console.warn("User type:", userType);
          if (userType === "buyer") {
            navigation.navigate("Buyer");
          } else if (userType === "instructor") {
            navigation.navigate("instructor");
          }
          else if (userType === "student") {
            navigation.navigate("student");
          }
        } else {
          console.warn("No such document!");
        }
      });
      
    } catch (error) {
      setErrors({ general: "Invalid email or password" });
      console.error(error);
    }
  };

  const handleSignOut = async () => {
    try {
      await auth().signOut();
      setUser(null);
    } catch (error) {
      console.error(error);
    }
  };
  //======================= end authontication ================================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState({});
  const validateInputs = () => {
    let errors = {};
    // if (!nameValue) errors.name = "Please enter a name!";
    // else if (nameValue.length < 3) errors.name = "Name must be at least 3 characters long.";
    // else if (typeof nameValue !== 'string') errors.name = "Name must be a string.";
    // if (!ageValue) errors.age = "Please enter an age!";
    // else if (isNaN(Number(ageValue))) errors.age = "Age must be a number.";
    // else if (ageValue.length > 2) errors.age = "Age must not exceed 2 characters.";
    if (!email) errors.email = "Please enter an email!";
    if (!password) errors.password = "Please enter a password!";
    else if (!/\w+@\w+\.\w+/.test(email))
      errors.email = "Please enter a valid email.";
    return errors;
  };
  const addUser = () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setUser([...user, { email: email, password: password }]);

    setEmail("");
    setPassword("");
  };

  return (
    <SafeAreaView
      style={[styles.screenContainer, isDarkMode && styles.darkContainer]}
    >
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        navigation={navigation}
      />
      <Text style={[styles.header, isDarkMode && styles.darkText]}>Login</Text>
      {errors.general ? (
        <Text style={styles.errorText}>{errors.general}</Text>
      ) : null}
      {/* email */}
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter your Email"
          placeholderTextColor="#555"
          value={email}
          onChangeText={(txt) => {
            setEmail(txt);
            if (errors.email) setErrors((prev) => ({ ...prev, email: "" }));
          }}
          keyboardType="email-address"
        />
      </View>
      {errors.email ? (
        <Text style={styles.errorText}>{errors.email}</Text>
      ) : null}
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter your password"
          placeholderTextColor="#555"
          value={password}
          secureTextEntry
          onChangeText={(txt) => {
            setPassword(txt);
            if (errors.name) setErrors((prev) => ({ ...prev, name: "" }));
          }}
        />
      </View>
      {errors.password ? (
        <Text style={styles.errorText}>{errors.name}</Text>
      ) : null}

      {/* <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter age"
          placeholderTextColor="#555"
          value={ageValue}
          onChangeText={(txt) => {
            setAgeValue(txt);
            if (errors.age) setErrors((prev) => ({ ...prev, age: '' }));
          }}
          keyboardType="number-pad"
        />
      </View>
      {errors.age ? <Text style={styles.errorText}>{errors.age}</Text> : null} */}
      <TouchableOpacity onPress={handleSignIn} style={styles.addButton}>
        <Text style={styles.addButtonText} onPress={handleSignIn}>
          Login
        </Text>
      </TouchableOpacity>
      <Text>create new account</Text>
      <TouchableOpacity
        onPress={() => navigation.navigate("Signup")}
        style={styles.addButton}
      >
        <Text style={styles.addButtonText}>Sign</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};
export default Login;
