import React, { useState } from "react";
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
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
import Icon from "react-native-vector-icons/Ionicons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useTranslation } from "react-i18next";
const Login = ({ isDarkMode, toggleDarkMode, navigation }) => {
  const { t } = useTranslation();
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
      querySnapshot.forEach(async (doc) => {
        if (doc.exists()) {
          const userType = doc.data().type;
          var fname = doc.data().fname;
          var lname = doc.data().lname;

          await AsyncStorage.setItem("email", JSON.stringify(doc.data().email));
          if (fname)
            await AsyncStorage.setItem(
              "fname",
              JSON.stringify(doc.data().fname)
            );
          if (lname)
            await AsyncStorage.setItem(
              "lname",
              JSON.stringify(doc.data().lname)
            );
          await AsyncStorage.setItem("type", JSON.stringify(userType));
          console.error(`user type id ==> ${userType}`);

          if (userType === "buyer" || userType === "applicant") {
            navigation.navigate("Buyer");
          } else if (userType === "instructor") {
            navigation.navigate("Instructor");
          } else if (userType === "student") {
            navigation.navigate("Student", { email2: email });
          }
        } else {
          console.warn("No such document!");
        }
      });
    } catch (error) {
      setErrors({ general: t("login.errors.general") });
      console.error(error);
    }
  };
  //======================= end authontication ================================
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState([]);
  const [errors, setErrors] = useState({});
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateInputs = () => {
    let errors = {};
    if (!email) errors.email = t("login.errors.email");
    if (!password) errors.password = t("login.errors.password");
    else if (!/\w+@\w+\.\w+/.test(email))
      errors.email = t("login.errors.email");
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
  const storeEmail = async (email) => {
    try {
      await AsyncStorage.setItem("email", email);
      console.log("Email stored successfully");
    } catch (error) {
      console.error("Error storing email:", error);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
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
      <Text style={[styles.header, isDarkMode && styles.darkText]}>
        {t("login.header")}
      </Text>
      {errors.general ? (
        <Text style={styles.errorText}>{errors.general}</Text>
      ) : null}

      <View style={styles.inputSection}>
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder={t("login.emailPlaceholder")}
          placeholderTextColor="#aaa"
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
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder={t("login.passwordPlaceholder")}
          placeholderTextColor="#aaa"
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={(txt) => {
            setPassword(txt);
            if (errors.password)
              setErrors((prev) => ({ ...prev, password: "" }));
          }}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={togglePasswordVisibility}
        >
          <Icon
            name={passwordVisible ? "eye-off" : "eye"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      {errors.password ? (
        <Text style={styles.errorText}>{errors.password}</Text>
      ) : null}

      <TouchableOpacity onPress={handleSignIn} style={styles.loginButton}>
        <Text style={styles.buttonText}>{t("login.loginButton")}</Text>
      </TouchableOpacity>

      <View style={styles.signUpSection}>
        <Text style={[styles.createAccountText, isDarkMode && styles.darkText]}>
          {t("login.createAccount")}
        </Text>
        <TouchableOpacity
          onPress={() => navigation.navigate("Signup")}
          style={styles.signupTextContainer}
        >
          <Text style={[styles.signupText, isDarkMode && styles.darkTextBlue]}>
            {t("login.signup")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  screenContainer: {
    flex: 1,
    backgroundColor: "#f7f8fa",
  },
  darkContainer: {
    backgroundColor: "#333",
  },
  header: {
    fontSize: 28,
    fontWeight: "700",
    color: "#333",
    textAlign: "center",
    marginVertical: 30,
  },
  darkText: {
    color: "#fff",
  },
  errorText: {
    color: "#e63946",
    textAlign: "center",
    marginBottom: 10,
    fontSize: 14,
  },
  inputSection: {
    marginBottom: 20,
    paddingHorizontal: 10,
    position: "relative",
  },
  iconContainer: {
    position: "absolute",
    right: 20,
    top: 15,
  },
  input: {
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 15,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
  },
  darkInput: {
    backgroundColor: "#555",
    color: "#fff",
  },
  loginButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 15,
    marginHorizontal: 120,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  signUpSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  createAccountText: {
    fontSize: 16,
    color: "#555",
  },
  darkTextBlue: {
    color: "#4ba3c7",
  },
  signupTextContainer: {
    marginLeft: 5,
  },
  signupText: {
    fontSize: 16,
    color: "#007bff",
    fontWeight: "800",
  },
});
export default Login;
