import React, { useEffect } from 'react';
import { View, Text } from 'react-native';
import Navbar from '../Navigations/navbar';
import styles from '../styles'; 

const HomeScreen = ({ isDarkMode, toggleDarkMode, navigation }) => (


  <View style={[styles.screenContainer, isDarkMode && styles.darkContainer]}>
    <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} navigation={navigation} />
    <View style={styles.contentContainer}>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Home Screen</Text>
    </View>
  </View>
);

export default HomeScreen;