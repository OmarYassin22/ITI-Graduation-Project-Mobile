import Login from './Screens/login';
import React, { useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import CustomDrawerContent from './Navigations/CustomDrawerContent';
import HomeScreen from './Screens/homeScreen';
import ProfileScreen from './Screens/profileScreen';

import { createStackNavigator } from '@react-navigation/stack';
const Drawer = createDrawerNavigator();
import Home from './Screens/homeScreen/homeScreen'; 
import Buyer from './ScreenComponts/Buyer/Buyer.jsx';
import { GetDataProvider } from './Contexts/GetDataContext.js';
import CourseProvider from './api/courses/CourseContext.jsx';
import InstructorsProvider from './api/instructors/InstructorsContext.jsx';

const Stack = createStackNavigator();

export default function App() {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <GetDataProvider>
    <NavigationContainer>
      <CourseProvider>
        <InstructorsProvider>
      <Drawer.Navigator
        drawerContent={(props) => <CustomDrawerContent {...props} isDarkMode={isDarkMode} />}
      >
        <Drawer.Screen name="Home" options={{ headerShown: false }}>
          {props => <Home {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        </Drawer.Screen>
        <Drawer.Screen name="Profile" options={{ headerShown: false }}>
          {props => <ProfilePage {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        </Drawer.Screen>
        <Drawer.Screen name="Buyer" options={{ headerShown: false }}>
          {props => <Buyer {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        </Drawer.Screen>
        <Drawer.Screen name="About Us" options={{ headerShown: false }}>
          {props => <About {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
        </Drawer.Screen>
      </Drawer.Navigator>
      </InstructorsProvider>
      </CourseProvider>
    </NavigationContainer>
  );
}



// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: 'red',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// });










// import React, { useState } from 'react';
// import {
//   View,
//   StyleSheet,
//   TextInput,
//   Text,
//   Platform,
//   SafeAreaView,
//   TouchableOpacity,
//   FlatList,
//   Image,
//   Switch,
//   Dimensions
// } from 'react-native';
// import { NavigationContainer } from '@react-navigation/native';
// import Icon from 'react-native-vector-icons/Ionicons';
// import { createDrawerNavigator, DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';


//   const Login = ({ isDarkMode, toggleDarkMode, navigation }) => {
//   const [nameValue, setNameValue] = useState('');
//   const [ageValue, setAgeValue] = useState('');
//   const [emailValue, setEmailValue] = useState('');
//   const [users, setUsers] = useState([]);
//   const [errors, setErrors] = useState({});
//   const validateInputs = () => {
//     let errors = {};
//     if (!nameValue) errors.name = "Please enter a name!";
//     else if (nameValue.length < 3) errors.name = "Name must be at least 3 characters long.";
//     else if (typeof nameValue !== 'string') errors.name = "Name must be a string.";
//     if (!ageValue) errors.age = "Please enter an age!";
//     else if (isNaN(Number(ageValue))) errors.age = "Age must be a number.";
//     else if (ageValue.length > 2) errors.age = "Age must not exceed 2 characters.";
//     if (!emailValue) errors.email = "Please enter an email!";
//     else if (!/\w+@\w+\.\w+/.test(emailValue)) errors.email = "Please enter a valid email.";
//     return errors;
//   };
//   const addUser = () => {
//     const validationErrors = validateInputs();
//     if (Object.keys(validationErrors).length > 0) {
//       setErrors(validationErrors);
//       return;
//     }
//     setErrors({});
//     setUsers([...users, { text: nameValue, age: ageValue, email: emailValue }]);
//     setNameValue('');
//     setAgeValue('');
//     setEmailValue('');
//   };
//   const deleteItem = (index) => {
//     const filteredItems = users.filter((_, ind) => ind !== index);
//     setUsers(filteredItems);
//   };
//   const renderUserItem = ({ item, index }) => (
//     <View style={styles.todoItem}>
//       <Text style={styles.todoText}>{item.text}</Text>
//       <Text style={styles.todoText}>{item.age}</Text>
//       <Text style={styles.todoText}>{item.email}</Text>
//       <TouchableOpacity onPress={() => deleteItem(index)}>
//         <Text style={styles.deleteButton}>Delete</Text>
//       </TouchableOpacity>
//     </View>
//   );
//   return (

//     <SafeAreaView style={[styles.screenContainer, isDarkMode && styles.darkContainer]}>
//       <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} navigation={navigation} />
//       <Text style={styles.header}>Adding users</Text>
//       <View style={styles.inputSection}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter name"
//           placeholderTextColor="#555"
//           value={nameValue}
//           onChangeText={(txt) => {
//             setNameValue(txt);
//             if (errors.name) setErrors((prev) => ({ ...prev, name: '' }));
//           }}
//         />
//       </View>
//       {errors.name ? <Text style={styles.errorText}>{errors.name}</Text> : null}
//       <View style={styles.inputSection}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter email address"
//           placeholderTextColor="#555"
//           value={emailValue}
//           onChangeText={(txt) => {
//             setEmailValue(txt);
//             if (errors.email) setErrors((prev) => ({ ...prev, email: '' }));
//           }}
//           keyboardType="email-address"
//         />
//       </View>
//       {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}
//       <View style={styles.inputSection}>
//         <TextInput
//           style={styles.input}
//           placeholder="Enter age"
//           placeholderTextColor="#555"
//           value={ageValue}
//           onChangeText={(txt) => {
//             setAgeValue(txt);
//             if (errors.age) setErrors((prev) => ({ ...prev, age: '' }));
//           }}
//           keyboardType="number-pad"
//         />
//       </View>
//       {errors.age ? <Text style={styles.errorText}>{errors.age}</Text> : null}
//       <TouchableOpacity onPress={addUser} style={styles.addButton}>
//         <Text style={styles.addButtonText}>Add</Text>
//       </TouchableOpacity>
//       <Text style={styles.statusText}>{users.length} users</Text>
//       <FlatList
//         data={users}
//         renderItem={renderUserItem}
//         keyExtractor={(item, index) => index.toString()}
//         contentContainerStyle={styles.todoContainer}
//       />
//     </SafeAreaView>
//   );
// };
// /////////////////////////////////////////////////////////////////////////

// const Drawer = createDrawerNavigator();
// const Navbar = ({ isDarkMode, toggleDarkMode, navigation }) => {
//   return (
//     <SafeAreaView style={{ backgroundColor: isDarkMode ? '#555' : '#007bff' }}>
//       <View style={[styles.navbarContainer, { backgroundColor: isDarkMode ? '#555' : '#007bff' }]}>
//         <TouchableOpacity onPress={() => navigation.openDrawer()}>
//           <Icon name="menu-outline" size={30} color={isDarkMode ? "#fff" : "#000"} />
//         </TouchableOpacity>
//         <Image
//           source={{ uri: 'https://e-learning-ebon-three.vercel.app/_next/image?url=%2Ftest3.png&w=256&q=75' }}
//           style={styles.logo}
//         />
//         <Switch
//           value={isDarkMode}
//           onValueChange={toggleDarkMode}
//         />
//       </View>
//     </SafeAreaView>
//   );
// };
// const HomeScreen = ({ isDarkMode, toggleDarkMode, navigation }) => (
//   <View style={[styles.screenContainer, isDarkMode && styles.darkContainer]}>
//     <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} navigation={navigation} />
//     <View style={styles.contentContainer}>
//       <Text style={[styles.text, isDarkMode && styles.darkText]}>Home Screen</Text>
//     </View>
//   </View>
// );
// const ProfileScreen = ({ isDarkMode, toggleDarkMode, navigation }) => (
//   <View style={[styles.screenContainer, isDarkMode && styles.darkContainer]}>
//     <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} navigation={navigation} />
//     <View style={styles.contentContainer}>
//       <Text style={[styles.text, isDarkMode && styles.darkText]}>Profile Screen</Text>
//     </View>
//   </View>
// );
// function CustomDrawerContent({ navigation, isDarkMode }) {
//   const currentRoute = navigation.getState().routeNames[navigation.getState().index];
//   return (
//     <DrawerContentScrollView>
//       <DrawerItem
//         label="Home"
//         icon={({ color, size }) => <Icon name="home-outline" size={size} color={color} />}
//         focused={currentRoute === 'Home'}
//         onPress={() => navigation.navigate('Home')}
//         style={styles.selectedItem}
//       />
//       <DrawerItem
//         label="Profile"
//         icon={({ color, size }) => <Icon name="person-outline" size={size} color={color} />}
//         focused={currentRoute === 'Profile'}
//         onPress={() => navigation.navigate('Profile')}
//         style={styles.selectedItem}
//       />
//       <DrawerItem
//         label="Login"
//         icon={({ color, size }) => <Icon name="log-in-outline" size={size} color={color} />}
//         focused={currentRoute === 'Login'}
//         onPress={() => navigation.navigate('Login')}
//         style={styles.selectedItem}
//       />
//     </DrawerContentScrollView>
//   );
// }

// export default function App() {
//   const [isDarkMode, setIsDarkMode] = useState(false);

//   const toggleDarkMode = () => {
//     setIsDarkMode(!isDarkMode);
//   };

//   return (
//     <NavigationContainer>
//       <Drawer.Navigator
//         drawerContent={(props) => <CustomDrawerContent {...props} isDarkMode={isDarkMode} />}
//       >
//         <Drawer.Screen name="Home" options={{ headerShown: false }}>
//           {props => <HomeScreen {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
//         </Drawer.Screen>
//         <Drawer.Screen name="Profile" options={{ headerShown: false }}>
//           {props => <ProfileScreen {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
//         </Drawer.Screen>
//         <Drawer.Screen name="Login" options={{ headerShown: false }}>
//           {props => <Login {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
//         </Drawer.Screen>
//       </Drawer.Navigator>
//     </NavigationContainer>
//   );
// }





// const styles = StyleSheet.create({
//   loginButton: {
//     marginTop: 'auto',
//   },
//   screenContainer: {
//     flex: 1,
//   },
//   darkContainer: {
//     backgroundColor: '#333',
//   },
//   navbarContainer: {
//     height: 60,
//     width: Dimensions.get('window').width,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems:'flex-end',
//     paddingHorizontal: 20,
//     borderBottomColor: '#ccc',
//     height:80,
//     marginBottom:5,
//   },
//   logo: {
//     width: 100,
//     height: 40,
//     resizeMode: 'contain',
//   },
//   contentContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   text: {
//     fontSize: 18,
//     color: '#000',
//   },
//   darkText: {
//     color: '#fff',
//   },
//   selectedItem: {
//     borderRadius: 10,
//   },
//     container: {
//     flex: 1,
//     backgroundColor: '#f0f0f0',
//     padding: Platform.OS === 'android' ? 30 : 0,
//   },
//   header: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: '#333',
//     textAlign: 'center',
//     marginVertical: 20,
//   },
//   inputSection: {
//     flexDirection: 'row',
//     justifyContent: 'center',
//     alignItems: 'center',
//     marginBottom: 10,
//   },
//   input: {
//     borderColor: '#ccc',
//     borderWidth: 1,
//     borderRadius: 8,
//     paddingHorizontal: 10,
//     flex: 1,
//     height: 40,
//     marginHorizontal: 5,
//   },
//   addButton: {
//     backgroundColor: '#28a745',
//     borderRadius: 8,
//     paddingVertical: 10,
//     paddingHorizontal: 20,
//     marginBottom: 10,
//   },
//   addButtonText: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
//   errorText: {
//     color: '#e63946',
//     textAlign: 'center',
//     marginBottom: 10,
//   },
//   statusText: {
//     color: '#555',
//     textAlign: 'center',
//     marginBottom: 15,
//   },
//   todoContainer: {
//     paddingHorizontal: 20,
//   },
//   todoItem: {
//     backgroundColor: '#ffffff',
//     padding: 15,
//     borderRadius: 10,
//     marginVertical: 8,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: { width: 0, height: 2 },
//     shadowOpacity: 0.1,
//     shadowRadius: 4,
//     elevation: 2,
//   },
//   todoText: {
//     color: '#333',
//     fontSize: 16,
//   },
//   deleteButton: {
//     color: '#dc3545',
//     fontWeight: 'bold',
//   },
// });

