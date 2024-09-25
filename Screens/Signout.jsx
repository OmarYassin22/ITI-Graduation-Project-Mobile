// Signout.jsx
import React from 'react';
import { View, Button, Text, TouchableOpacity, SafeAreaView } from 'react-native';
import { getAuth, signOut } from 'firebase/auth';
import styles from './styles'; // Assuming you have a styles.js file for styling

const auth = getAuth();

export default function Signout({ navigation }) {
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login'); // Navigate to Login screen after successful signout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Are you sure you want to sign out?</Text>
      <TouchableOpacity onPress={handleSignOut} style={styles.addButton}>
        <Text style={styles.addButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}