
import React, { useContext } from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Mylearning from './Mylearning';
import Mycart from './Mycart';
import Courses from './Courses';
import Wishlist from './Wishlist';
import CourseDetailes from './CourseDetailes';
import { GetData } from '../../Contexts/GetDataContext';
import Scholarship from './Scholarship/Scholarship';
import { useTranslation } from 'react-i18next';


const Tab = createBottomTabNavigator();


function Buyer({ isDarkMode, toggleDarkMode }) {
  const { t } = useTranslation();
  const {courseBuyerCart,courseBuyerWish} = useContext(GetData);
  return (
    <Tab.Navigator
      initialRouteName="Courses"
      screenOptions={{
        tabBarActiveTintColor:isDarkMode?'#fff': '#e91e63',
        tabBarStyle: {
          backgroundColor: isDarkMode ? '#555' : '#fff',
          paddingVertical:10,
        },
      }}
    >
      <Tab.Screen
        name="Courses"
        options={{
          headerShown:false,
          tabBarLabel: t('buyer.home.courses'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="book-open-page-variant" color={color} size={size} />
          ),
        }}
      >
        {(props) => <Courses {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
      </Tab.Screen>
      <Tab.Screen
        name="Mycart"
        options={{
          headerShown:false,
          tabBarLabel: t('buyer.home.mycart'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="cart" color={color} size={size} />
          ),
          tabBarBadge: courseBuyerCart.length,
        }}
      >
        {(props) => <Mycart {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
      </Tab.Screen>
      <Tab.Screen
        name="Wishlist"
        options={{
          headerShown:false,
          tabBarLabel: t('buyer.home.wishlist'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="heart" color={color} size={size} />
          ),
          tabBarBadge: courseBuyerWish.length,
        }}
      >
        {(props) => <Wishlist {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
      </Tab.Screen>
      <Tab.Screen
        name="Mylearning"
        options={{
          headerShown:false,
          tabBarLabel: t('buyer.home.mylearning'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="play-circle" color={color} size={size} />
          ),
        }}
      >
        {(props) => <Mylearning {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
      </Tab.Screen>
      <Tab.Screen
  name="CourseDetailes"
  options={{
    
      tabBarButton: () => null,
      
  
  }}
>
  {(props) => <CourseDetailes {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
</Tab.Screen>
<Tab.Screen
        name="Scholarship"
        options={{
          headerShown:false,
          tabBarLabel: t('buyer.home.scholarship'),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="school" color={color} size={size} />
          ),
        }}
      >
        {(props) => <Scholarship {...props} isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}


export default Buyer;