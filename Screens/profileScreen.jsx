import React from 'react';
import { View, Text } from 'react-native';
import Navbar from '../Navigations/navbar';
import styles from '../styles';

const ProfileScreen = ({ isDarkMode, toggleDarkMode, navigation }) => (
  <View style={[styles.screenContainer, isDarkMode && styles.darkContainer]}>
    <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} navigation={navigation} />
    <View style={styles.contentContainer}>
      <Text style={[styles.text, isDarkMode && styles.darkText]}>Profile Screen</Text>
    </View>
  </View>
);

export default ProfileScreen;