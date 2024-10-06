import { View, Text } from 'react-native'
import React from 'react'
import Navbar from "../../Navigations/navbar";
const Mylearning = ({ isDarkMode, toggleDarkMode, navigation }) => {
  return (
    <View>
      <Navbar
        isDarkMode={isDarkMode}
        toggleDarkMode={toggleDarkMode}
        navigation={navigation}
      />
      <Text>Mylearning</Text>
    </View>
  )
}

export default Mylearning