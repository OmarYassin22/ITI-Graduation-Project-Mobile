import React, { useState } from 'react';
import { ScrollView, Text, Image, View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styles from "../../styles.js";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Navbar from '../../Navigations/navbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useTranslation } from 'react-i18next';
const About = ({ isDarkMode}) => {
    const { t } = useTranslation(); 
    const [location, setLocation] = useState({
        latitude: 30.475815373448597,
        longitude: 31.197868152742487,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
    });
    const items = [
        { label: t('about.benha'), value: "Benha" },
        { label: t('about.alex'), value: "Alex" },
        { label: t('about.smartVillage'), value: "Smart Village" },
        { label: t('about.menoufia'), value: "Menoufia" },
    ];
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
            <Text style={styles.txtAbout}>{t('about.title')}</Text>
        <Text style={[styles.txtAboutContent, isDarkMode && styles.txtAboutContentDark]}>
          {t('about.content')}
        </Text>
        <Image source={require("../../assets/About Images/About-Image2.jpg")} style={styles.aboutImage} />
        <Text style={styles.txtMession}>{t('about.mission')}</Text>
        <Text style={[styles.txtMessionContent, isDarkMode && styles.txtMessionContentDark]}>
          {t('about.missionContent')}
        </Text>
        <Image source={require("../../assets/About Images/About-Image.jpg")} style={styles.aboutImage} />
        <View style={[styles.dropDownMenu, isDarkMode && styles.dropDownMenuDark]} >
            <RNPickerSelect key={"1"} onValueChange={(value) => handleChange(value)} items={items} activeItemStyle={isDarkMode ? styles.dropDownMenu2Dark : styles.dropDownMenu2} placeholder={{ label: t('about.ChooseBranch'), valid: false, value: null }} />
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