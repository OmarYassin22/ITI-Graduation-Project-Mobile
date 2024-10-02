import React, { useState } from 'react';
import {
  View,
  TextInput,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import styles from '../styles';
import Navbar from '../Navigations/navbar';

const Login = ({ isDarkMode, navigation }) => {
  const [nameValue, setNameValue] = useState('');
  const [ageValue, setAgeValue] = useState('');
  const [emailValue, setEmailValue] = useState('');
  const [users, setUsers] = useState([]);
  const [errors, setErrors] = useState({});
  const validateInputs = () => {
    let errors = {};
    if (!nameValue) errors.name = "Please enter a name!";
    else if (nameValue.length < 3) errors.name = "Name must be at least 3 characters long.";
    else if (typeof nameValue !== 'string') errors.name = "Name must be a string.";
    if (!ageValue) errors.age = "Please enter an age!";
    else if (isNaN(Number(ageValue))) errors.age = "Age must be a number.";
    else if (ageValue.length > 2) errors.age = "Age must not exceed 2 characters.";
    if (!emailValue) errors.email = "Please enter an email!";
    else if (!/\w+@\w+\.\w+/.test(emailValue)) errors.email = "Please enter a valid email.";
    return errors;
  };
  const addUser = () => {
    const validationErrors = validateInputs();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setUsers([...users, { text: nameValue, age: ageValue, email: emailValue }]);
    setNameValue('');
    setAgeValue('');
    setEmailValue('');
  };
 
  return (

    <SafeAreaView style={[styles.screenContainer, isDarkMode && styles.darkContainer]}>
      <Navbar isDarkMode={isDarkMode} navigation={navigation} />
      <Text style={[styles.header,isDarkMode && styles.darkText]}>Login</Text>

      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter name"
          placeholderTextColor="#555"
          value={nameValue}
          onChangeText={(txt) => {
            setNameValue(txt);
            if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
          }}
        />
      </View>
      {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
      <View style={styles.inputSection}>
        <TextInput
          style={styles.input}
          placeholder="Enter email address"
          placeholderTextColor="#555"
          value={emailValue}
          onChangeText={(txt) => {
            setEmailValue(txt);
            if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
          }}
          keyboardType="email-address"
        />
      </View>
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
      <View style={styles.inputSection}>
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
      {errors.age ? <Text style={styles.errorText}>{errors.age}</Text> : null}
      <TouchableOpacity onPress={addUser} style={styles.addButton}>
        <Text style={styles.addButtonText}>Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
export default Login;