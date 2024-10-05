// Signup.jsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { createUserWithEmailAndPassword } from '@firebase/auth';
import { auth, db } from '../firebase';
import styles from '../styles';
import { Firestore } from 'firebase/firestore';
import { collection, addDoc } from "firebase/firestore"; 


export default function Signup({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});

  const handleSignUp = async () => {
    try {
    var result=await  createUserWithEmailAndPassword(auth,email, password);
    await addUserToFirestore(result.user.uid);
    console.warn(result);
      navigation.navigate('Login'); // Navigate to Login screen after successful signup
    } catch (error) {
      setErrors({ signup: error.message });
    }
  };
  const addUserToFirestore = async (uid) => {
    try {
        const docRef = await addDoc(collection(db, "UserData"), {
            email: email,
            uid: uid,
            type: "buyer",

          });
    } catch (error) {
      console.error("Error adding user to Firestore: ", error);
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.inputSection}>
        <TextInput
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          style={styles.input}
        />
        {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}
      </View>
      <View style={styles.inputSection}>
        <TextInput
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          style={styles.input}
        />
        {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}
      </View>
      {errors.signup && <Text style={styles.errorText}>{errors.signup}</Text>}
      <TouchableOpacity onPress={handleSignUp} style={styles.addButton}>
        <Text style={styles.addButtonText}>Sign Up</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => navigation.navigate('Login')} style={styles.addButton}>
        <Text style={styles.addButtonText}>Go to Login</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}