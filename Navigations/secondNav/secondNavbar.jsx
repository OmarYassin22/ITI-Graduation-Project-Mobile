import React, { useState } from 'react';
import { View, SafeAreaView, TouchableOpacity, Image, StyleSheet, Text, Modal, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import { getAuth, signOut } from 'firebase/auth';
import { useRoute } from '@react-navigation/native';
const auth = getAuth();
const SecondNavbar = ({ isDarkMode, navigation }) => {
  const route = useRoute();
  const [modalVisible, setModalVisible] = useState(false);
  const handleSignOut = async () => {
    try {
      await signOut(auth);
      navigation.navigate('Login'); // Navigate to Login screen after successful signout
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };
  return (
    <SafeAreaView style={{ backgroundColor: isDarkMode ? '#555' : '#007bff' }}>
      <View style={[styles.navbarContainer, { backgroundColor: isDarkMode ? '#555' : '#007bff' }]}>
        <TouchableOpacity onPress={() => setModalVisible(true)}>
          <Icon name="menu-outline" size={30} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
        <Image
          source={{ uri: 'https://e-learning-ebon-three.vercel.app/_next/image?url=%2Ftest3.png&w=256&q=75' }}
          style={styles.logo}
        />
        <TouchableOpacity onPress={handleSignOut}>
          <Icon name="log-out-outline" size={30} color={isDarkMode ? "#fff" : "#000"} />
        </TouchableOpacity>
      </View>
  
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={[styles.modalContent, { backgroundColor: isDarkMode ? '#333' : '#fff' }]}>
            <TouchableOpacity
              style={[
                styles.menuItem,
                route.name === 'HomeScreen2' && { backgroundColor: '#007bff' }
              ]}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('HomeScreen2');
              }}
            >
              <Text style={[styles.menuText, isDarkMode && styles.darkText, route.name === 'HomeScreen2' && { color: '#fff' }]}>
                Home
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[
                styles.menuItem,
                route.name === 'ProfilePage2' && { backgroundColor: '#007bff' }
              ]}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('ProfilePage2');
              }}
            >
              <Text style={[styles.menuText, isDarkMode && styles.darkText, route.name === 'ProfilePage2' && { color: '#fff' }]}>
                Profile
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity
              style={[
                styles.menuItem,
                route.name === 'Settings2' && { backgroundColor: '#007bff' }
              ]}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Settings2');
              }}
            >
              <Text style={[styles.menuText, isDarkMode && styles.darkText, route.name === 'Settings2' && { color: '#fff' }]}>
                Settings
              </Text>
            </TouchableOpacity>
  
            <TouchableOpacity style={styles.menuItem} onPress={() => setModalVisible(false)}>
              <Text style={[styles.menuText, isDarkMode && styles.darkText]}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );  
};
const styles = StyleSheet.create({
  navbarContainer: {
    height: 60,
    width: Dimensions.get('window').width,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    borderBottomColor: '#ccc',
    height: 80,
    marginBottom: 5,
  },
  logo: {
    width: 100,
    height: 50,
    resizeMode: 'contain',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Background for modal transparency
  },
  modalContent: {
    backgroundColor: '#fff', // Default background color (light mode)
    width: '100%',
    padding: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },
  menuItem: {
    paddingVertical: 15,
  },
  menuText: {
    fontSize: 18,
    textAlign: 'center',
  },
  darkText: {
    color: '#fff',
  },
});


export default SecondNavbar;
