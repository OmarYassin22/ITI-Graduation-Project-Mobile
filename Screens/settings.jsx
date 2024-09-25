import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Picker } from '@react-native-picker/picker'; 
import Navbar from '../Navigations/navbar';
import About from './About Page/About';
const SettingsScreen = ({ isDarkMode, toggleDarkMode, navigation }) => {
  const [selectedLanguage, setSelectedLanguage] = useState('English');
  return (
    
    <View style={[styles.screenContainer, isDarkMode && styles.darkContainer]}>
    <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} navigation={navigation} />
      <View style={styles.section}>
        <Text style={[styles.sectionTitle,styles.marginHeader , isDarkMode && styles.darkText]}>Account</Text>

        <View style={styles.settingRow}>
          <Ionicons name="moon" size={24} color="black" style={[styles.icon, isDarkMode && styles.iconDark]} />
          <Text style={[styles.settingText,styles.marginText, isDarkMode && styles.darkText]}>{isDarkMode ? 'Light Mode' : 'Dark Mode'}</Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            style={styles.switch}
          />
        </View>

        <View style={styles.settingRow}>
          <Ionicons name="language" size={24} color="black" style={[styles.icon, isDarkMode && styles.iconDark]} />
          <Text style={[styles.settingText,styles.marginText , isDarkMode && styles.darkText]}>Language</Text>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => setSelectedLanguage(itemValue)}
            style={[styles.picker, isDarkMode && styles.greyContainer]}
          >
            <Picker.Item label="English" value="English" />
            <Picker.Item label="Arabic" value="Arabic" />
          </Picker>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle,styles.marginHeader , isDarkMode && styles.darkText]}>More</Text>

        <TouchableOpacity style={styles.settingRow} onPress={() => navigation.navigate('About')}>
          <Ionicons name="information-circle" size={24} color="black" style={[styles.icon, isDarkMode && styles.iconDark]} />
          <Text style={[styles.settingText, isDarkMode && styles.darkText]}>About Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow} onPress={() => navigation.navigate('Contact')}>
          <Ionicons name="mail" size={24} color="black" style={[styles.icon, isDarkMode && styles.iconDark]} />
          <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Contact Us</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.settingRow} onPress={() => alert('Rate Us')}>
          <Ionicons name="star" size={24} color="black" style={[styles.icon, isDarkMode && styles.iconDark]} />
          <Text style={[styles.settingText, isDarkMode && styles.darkText]}>Rate Us</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
    darkText: {
        color: '#fff',
      },
    screenContainer: {
        flex: 1,
      },
      darkContainer: {
        backgroundColor: '#333',
      },
      greyContainer: {
        backgroundColor: 'grey',
      },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
  },
  settingText: {
    fontSize: 16,
    fontWeight:'bold',
  },
  marginHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 20,
    fontWeight:'bold',
  },
  marginText:{
    fontSize: 16,
    position:'absolute',
    left: 45,
    fontWeight:'bold',
  },
  icon: {
    marginRight: 0,
  },
  iconDark: {
    marginRight: 0,
    marginLeft: 0,
    color: '#fff',
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  picker: {
    width: 135,
    backgroundColor: '#f0f0f0',
  },
});

export default SettingsScreen;
