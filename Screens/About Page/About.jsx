import React, { useState } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styles from "../../styles.js";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Navbar from '../../Navigations/navbar';
import { SafeAreaView } from 'react-native-safe-area-context';

const About = ({ isDarkMode, toggleDarkMode, navigation }) => {
    const [location, setLocation] = useState({
        latitude: 30.475815373448597,
        longitude: 31.197868152742487,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const items = [{ label: "Benha", value: "Benha" },
    { label: "Alex", value: "Alex" },
    { label: "Smart Village", value: "Smart Village" },
    { label: "Menoufia", value: "Menoufia" },];
    const handleChange = (value) => {
        if (value == "Benha") {
            setLocation({
                latitude: 30.475815373448597,
                longitude: 31.197868152742487,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        } else if (value == "Alex") {
            setLocation({
                latitude: 31.19278681868581,
                longitude: 29.90618575462181,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        } else if (value == "Smart Village") {
            setLocation({
                latitude: 30.07126053127538,
                longitude: 31.020813403005693,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        } else if (value == "Menoufia") {
            setLocation({
                latitude: 30.558084283809457,
                longitude: 31.0189111305105,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            });
        }
    };

    return (
        <SafeAreaView style={[styles.mainContainer, isDarkMode && styles.mainContainerDark]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.txtAbout}>About Us</Text>
                <Text style={[styles.txtAboutContent, isDarkMode && styles.txtAboutContentDark]}>At E-learning, we believe that learning should be accessible, engaging, and empowering for everyone, no matter where they are in the world. Our e-learning platform is designed to provide you with high-quality educational content that fits into your life, helping you achieve your goals at your own pace.</Text>
                <Image source={require("../../assets/About Images/About-Image2.jpg")} style={styles.aboutImage} />
                <Text style={styles.txtMession}>Our Mission</Text>
                <Text style={[styles.txtMessionContent, isDarkMode && styles.txtMessionContentDark]}>Our mission is simple: to democratize education by providing affordable and flexible learning opportunities to people everywhere. Whether you are looking to develop new skills, advance in your career, or simply learn something new, we are here to support you on your journey.</Text>
                <Image source={require("../../assets/About Images/About-Image.jpg")} style={styles.aboutImage} />
                <View style={[styles.dropDownMenu, isDarkMode && styles.dropDownMenuDark]} >
                    <RNPickerSelect key={"1"} onValueChange={(value) => handleChange(value)} items={items} activeItemStyle={isDarkMode ? styles.dropDownMenu2Dark : styles.dropDownMenu2} placeholder={{ label: "Choose a branch", valid: false, value: null }} />
                </View>
                <MapView key={"2"} initialRegion={{
                    latitude: 30.475815373448597,
                    longitude: 31.197868152742487,
                    latitudeDelta: 0,
                    longitudeDelta: 0,
                }} region={location} style={styles.map}>
                    <Marker
                        draggable
                        coordinate={{
                            latitude: location.latitude,
                            longitude: location.longitude,
                        }}
                    />
                </MapView>
            </ScrollView>
        </SafeAreaView>
    );
}


export default About;


