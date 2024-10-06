import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  ScrollView,
} from 'react-native';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import Icon from 'react-native-vector-icons/Ionicons';
import Navbar from "../Navigations/navbar";
import { useTranslation } from 'react-i18next';

export default function Signup({ navigation, isDarkMode, toggleDarkMode }) {
  const { t } = useTranslation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fname, setFname] = useState('');
  const [lname, setLname] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [errors, setErrors] = useState({});
  const validateInputs = () => {
    let valid = true;
    let errors = {};
    if (!email.includes('@')) {
      errors.email = t('signup.errors.email');
      valid = false;
    }
    if (password.length < 6) {
      errors.password = t('signup.errors.password');
      valid = false;
    }
    if (fname.trim() === '') {
      errors.fname = t('signup.errors.fname');
      valid = false;
    }
    if (lname.trim() === '') {
      errors.lname = t('signup.errors.lname');
      valid = false;
    }
    if (!/^\d+$/.test(phoneNumber) || phoneNumber.length < 10) {
      errors.phoneNumber = t('signup.errors.phoneNumber');
      valid = false;
    }
    setErrors(errors);
    return valid;
  };
  const handleSignUp = async () => {
    if (!validateInputs()) return;
    try {
      setErrors({});
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await addUserToFirestore(result.user.uid);
      navigation.navigate('Login');
    } catch (error) {
      setErrors({ signup: error.message });
    }
  };
  const addUserToFirestore = async (uid) => {
    try {
      await addDoc(collection(db, "UserData"), {
        email: email,
        uid: uid,
        fname: fname,
        lname: lname,
        number: phoneNumber,
        type: "buyer",
      });
    } catch (error) {
      console.error("Error adding user to Firestore: ", error);
    }
  };
  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
  return (
    <SafeAreaView style={[styles.screenContainer, isDarkMode && styles.darkContainer]}>
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        navigation={navigation}
      />
      <Text style={[styles.header, isDarkMode && styles.darkText]}>{t('signup.title')}</Text>
      {errors.signup && <Text style={styles.errorText}>{errors.signup}</Text>}
      <ScrollView>
      <View style={styles.inputSection}>
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder={t('signup.firstNamePlaceholder')}
          placeholderTextColor="#aaa"
          value={fname}
          onChangeText={setFname}
        />
        {errors.fname && <Text style={styles.errorText}>{errors.fname}</Text>}
      </View>
      <View style={styles.inputSection}>
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder={t('signup.lastNamePlaceholder')}
          placeholderTextColor="#aaa"
          value={lname}
          onChangeText={setLname}
        />
        {errors.lname && <Text style={styles.errorText}>{errors.lname}</Text>}
      </View>
      <View style={styles.inputSection}>
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder={t('signup.phoneNumberPlaceholder')}
          placeholderTextColor="#aaa"
          value={phoneNumber}
          keyboardType="numeric"
          onChangeText={setPhoneNumber}
        />
        {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}
      </View>
      <View style={styles.inputSection}>
        <TextInput
          style={[styles.input, isDarkMode && styles.darkInput]}
          placeholder={t('signup.emailPlaceholder')}
          placeholderTextColor="#aaa"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>
      <View style={styles.inputSection}>
        <TextInput
          style={[styles.inputPass, isDarkMode && styles.darkInput]}
          placeholder={t('signup.passwordPlaceholder')}
          placeholderTextColor="#aaa"
          value={password}
          secureTextEntry={!passwordVisible}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.iconContainer} onPress={togglePasswordVisibility}>
          <Icon
            name={passwordVisible ? "eye-off" : "eye"}
            size={24}
            color="#666"
          />
        </TouchableOpacity>
      </View>
      {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      <TouchableOpacity onPress={handleSignUp} style={styles.addButton}>
        <Text style={styles.buttonText}>{t('signup.signUpButton')}</Text>
      </TouchableOpacity>
      <View style={styles.loginContainer}>
        <Text style={[styles.loginText, isDarkMode && styles.darkText]}>{t('signup.haveAccountText')}</Text>
        <TouchableOpacity onPress={() => navigation.navigate('Login')}>
          <Text style={styles.loginButtonText}>{t('signup.signIn')}</Text>
        </TouchableOpacity>
      </View>
      </ScrollView>
    </SafeAreaView>
  );
}
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
    marginBottom: 5,
    position: 'relative',
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
    marginHorizontal: 10,
  },
  inputPass:{
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 10,
    paddingLeft:15,
    paddingRight:40,
    paddingVertical: 10,
    fontSize: 16,
    backgroundColor: "#fff",
    color: "#333",
    marginHorizontal: 10,
  },
  darkInput: {
    backgroundColor: "#555",
    color: "#fff",
  },
  iconContainer: {
    position: "absolute",
    right: 20,
    top: 15,
  },
  addButton: {
    backgroundColor: "#007bff",
    borderRadius: 10,
    paddingVertical: 15,
    marginBottom: 20,
    marginHorizontal: 130,
    marginTop: 20,
  },
  buttonText: {
    color: "#fff",
    fontSize: 18,
    textAlign: "center",
    fontWeight: "600",
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 20,
  },
  loginText: {
    fontSize: 16,
    color: "#555",
  },
  loginButtonText: {
    fontSize: 16,
    color: "#007bff",
    marginLeft: 5,
    fontWeight: "800",
  },
});
