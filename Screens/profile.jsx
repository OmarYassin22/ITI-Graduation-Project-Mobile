import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Navbar from '../Navigations/navbar';
const ProfilePage = ({ isDarkMode, toggleDarkMode, navigation }) => {
  const [profileImage, setProfileImage] = useState(require('../assets/default-img.jpg'));
  const [userName, setUserName] = useState('Mahmoud badr');
  const [isEditingName, setIsEditingName] = useState(false);
  const [aboutMeText, setAboutMeText] = useState('Enter some details about yourself...');
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('error with uploading image');
      }
    })();
  }, []);
  const pickImage = async (setImage) => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setImage({ uri: result.uri || null });
    }
  };
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} navigation={navigation} />
      <View style={styles.profileImageContainer}>
        <Image 
          source={profileImage.uri ? profileImage.uri : require('../assets/default-img.jpg')} 
          style={styles.profileImage} 
        />
        <TouchableOpacity style={styles.editProfileButton} onPress={() => pickImage(setProfileImage)}>
          <FontAwesome name="camera" size={14} color="white" />
        </TouchableOpacity>
      </View>
      <View style={styles.userInfo}>
        {isEditingName ? (
          <TextInput
            style={styles.userNameInput}
            value={userName}
            onChangeText={setUserName}
            onBlur={() => setIsEditingName(false)}
          />
        ) : (
          <TouchableOpacity onPress={() => setIsEditingName(true)}>
            <Text style={styles.userName}>{userName}</Text>
          </TouchableOpacity>
        )}
        <Text style={styles.userRole}>Student</Text>
      </View>
      <View style={styles.aboutMeContainer}>
        <Text style={styles.aboutMeTitle}>About Me</Text>
        <View style={styles.aboutMeTextInput}>
          {isEditingAbout ? (
            <TextInput
              style={styles.userRole}
              value={aboutMeText}
              onChangeText={setAboutMeText}
              onBlur={() => setIsEditingAbout(false)}
            />
          ) : (
            <TouchableOpacity onPress={() => setIsEditingAbout(true)}>
              <Text style={styles.userRole}>{aboutMeText}</Text>
            </TouchableOpacity>
          )}
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  darkText: {
    color: '#fff',
  },
  darkContainer: {
    backgroundColor: '#333',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  editText: {
    color: 'white',
    marginLeft: 5,
  },
  profileImageContainer: {
    alignItems: 'center',
    marginTop: 50,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 2,
    borderColor: 'white',
    backgroundColor: 'transparent',
  },
  editProfileButton: {
    position: 'absolute',
    bottom: 0,
    right: 110,
    backgroundColor: '#007bff',
    width: 35,
    height: 35,
    borderRadius: 17.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userInfo: {
    alignItems: 'center',
    marginTop: 10,
  },
  userName: {
    fontSize: 22,
    fontWeight: 'bold',
  },
  userRole: {
    fontSize: 16,
    color: 'gray',
  },
  userNameInput: {
    fontSize: 22,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    width: 200,
    textAlign: 'center',
  },
  aboutMeContainer: {
    marginTop: 20,
    padding: 10,
  },
  aboutMeTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  aboutMeTextInput: {
    marginTop: 10,
    fontSize: 14,
    color: 'gray',
    borderColor: '#ccc',
    borderWidth: 1,
    padding: 5,
    borderRadius: 5,
    minHeight: 80,
  },
});
export default ProfilePage;