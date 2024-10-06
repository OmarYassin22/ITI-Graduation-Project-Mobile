import React, { useState, useEffect } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, TextInput, Alert, Modal, ScrollView } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import Navbar from '../Navigations/navbar';
import { useTranslation } from 'react-i18next';
import AsyncStorage from "@react-native-async-storage/async-storage";
import firestore from '@react-native-firebase/firestore';
const ProfilePage = ({ isDarkMode, navigation }) => {
  const { t } = useTranslation();
  const [profileImage, setProfileImage] = useState(require('../assets/default-img.jpg'));
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [aboutMeText, setAboutMeText] = useState('Enter some details about yourself...');
  const [isEditingAbout, setIsEditingAbout] = useState(false);
  const [fname, setFname] = useState('');
  const [email, setEmail] = useState(''); 
  const [type, setType] = useState(''); 

  const imageOptions = [
    require('../assets/default-img.jpg'),
    require('../assets/profImags/man-profile.jpg'),
    require('../assets/profImags/man-profile2.jpg'),
    require('../assets/profImags/old.jpeg'),
    require('../assets/profImags/woman-profile.jpg'),
    require('../assets/profImags/woman-profile2.jpg'),
    require('../assets/profImags/womanold.jpg')
  ];

  async function fetchUserData() {
    try {
      const storedEmail = await AsyncStorage.getItem("email");
      setEmail(storedEmail);
      if (storedEmail) {
        const userSnapshot = await firestore()
          .collection('UserData')
          .where('email', '==', storedEmail)
          .limit(1)
          .get();
        if (!userSnapshot.empty) {
          const userData = userSnapshot.docs[0].data();
          setFname(userData.fname);
          setType(userData.type);
        } else {
          console.log("No user found with the given email.");
        }
      }
    } catch (error) {
      console.error("Error retrieving user data:", error);
    }
  }
  useEffect(() => {
    fetchUserData();
  }, []);
  useEffect(() => {
    (async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('error with uploading image');
      }
    })();
  }, []);
  // const pickImage = async (setImage) => {
  //   let result = await ImagePicker.launchImageLibraryAsync({
  //     mediaTypes: ImagePicker.MediaTypeOptions.Images,
  //     allowsEditing: true,
  //     aspect: [4, 3],
  //     quality: 1,
  //   });
  //   if (!result.canceled) {
  //     setImage({ uri: result.uri || null });
  //   }
  // };
  const openImagePicker = () => {
    setIsModalVisible(true);
  };

  const selectImage = (image) => {
    setProfileImage(image);
    setIsModalVisible(false);
  };
  return (
    <View style={[styles.container, isDarkMode && styles.darkContainer]}>
      <Navbar isDarkMode={isDarkMode} navigation={navigation} />

      <View style={styles.profileImageContainer}>
        <Image 
          source={profileImage} 
          style={styles.profileImage} 
        />
        <TouchableOpacity style={styles.editProfileButton} onPress={openImagePicker}>
          <FontAwesome name="camera" size={14} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.userInfo}>
        {isEditingName ? (
          <TextInput
            style={[styles.userNameInput, isDarkMode && styles.darkText]}
            value={fname}
            onChangeText={setFname}
            onBlur={() => setIsEditingName(false)}
          />
        ) : (
          <TouchableOpacity onPress={() => setIsEditingName(true)}>
            <Text style={[styles.userName, isDarkMode && styles.darkText]}>
              {/* {fname ? fname : 'No Name Available'} */}
              {email}
            </Text>
          </TouchableOpacity>
        )}
        <Text style={styles.userRole}>{type ? type : 'No type'}</Text>
      </View>

      <View style={styles.aboutMeContainer}>
        <Text style={[styles.aboutMeTitle, isDarkMode && styles.darkText]}>{t('profile.aboutMe')}</Text>
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

      <Modal visible={isModalVisible} transparent={true}>
        <View style={styles.modalContainer}>
          <ScrollView horizontal contentContainerStyle={styles.imageOptions}>
            {imageOptions.map((image, index) => (
              <TouchableOpacity key={index} onPress={() => selectImage(image)}>
                <Image source={image} style={styles.optionImage} />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </Modal>
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
    width: 150,
    height: 150,
    borderRadius: 90,
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
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  imageOptions: {
    flexDirection: 'row',
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom:400
  },
  optionImage: {
    width: 200,
    height: 200,
    margin: 10,
    borderRadius: 100,
  },
});
export default ProfilePage;