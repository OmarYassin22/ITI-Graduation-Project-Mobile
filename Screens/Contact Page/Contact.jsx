import React, { useState } from 'react';
import { ScrollView, Text, Image, View, TouchableOpacity } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import styles from "../About Page/styles";
import MapView from 'react-native-maps';
import { Marker } from 'react-native-maps';
import Navbar from '../../Navigations/navbar';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';

const Contact = ({ isDarkMode, toggleDarkMode, navigation }) => {
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const handleChange = (txt, inputName) => {
        setInputs({ ...inputs, [inputName]: txt });
    }
    return (
        <SafeAreaView style={[styles.mainContainer, isDarkMode && styles.mainContainerDark]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.txtAbout}>Contact US</Text>
                <Text style={styles.txtAbout}>How Can I Help You?</Text>
                <Text style={[styles.txtAboutContent, isDarkMode && styles.txtAboutContentDark]}>Fill in the form or drop an email</Text>
                <View style={styles.shadowBox}>
                    <Text style={[styles.labelsForContact, isDarkMode && styles.labelsForContactDark]}>Name</Text>
                    <TextInput style={[styles.txtInputs, isDarkMode && styles.txtInputsDark]} value={inputs.name} onChangeText={(txt) => { handleChange(txt, "name") }}></TextInput>

                    <Text style={[styles.labelsForContact, isDarkMode && styles.labelsForContactDark]}>Email</Text>
                    <TextInput style={[styles.txtInputs, isDarkMode && styles.txtInputsDark]} value={inputs.email} onChangeText={(txt) => { handleChange(txt, "email") }}></TextInput>

                    <Text style={[styles.labelsForContact, isDarkMode && styles.labelsForContactDark]}>Subject</Text>
                    <TextInput style={[styles.txtInputs, isDarkMode && styles.txtInputsDark]} value={inputs.subject} onChangeText={(txt) => { handleChange(txt, "subject") }}></TextInput>

                    <Text style={[styles.labelsForContact, isDarkMode && styles.labelsForContactDark]}>Mesaage</Text>
                    <TextInput style={[styles.txtInputsMessage, isDarkMode && styles.txtInputsMessageDark]} value={inputs.message} onChangeText={(txt) => { handleChange(txt, "message") }}></TextInput>
                    <TouchableOpacity style={styles.button} onPress={() => { }}>
                        <Text style={styles.btnTxt}>Submit</Text>
                    </TouchableOpacity>
                </View>

                <View style={styles.shadowBox}>
                    <Icon name="phone-portrait-sharp" size={20} style={styles.Icons} />
                    <Text style={[styles.txtAboutContent, isDarkMode && styles.txtAboutContentDark]}>+1282185755</Text>
                    <Icon name="chatbubbles-outline" size={20} style={styles.Icons} />
                    <Text style={[styles.txtAboutContent, isDarkMode && styles.txtAboutContentDark]}>exm@gmail.com</Text>
                    <Icon name="call-outline" size={20} style={styles.Icons} />
                    <Text style={[styles.txtAboutContent, isDarkMode && styles.txtAboutContentDark]}>0483643317</Text>
                    <Icon name="location-outline" size={20} style={styles.Icons} />
                    <Text style={[styles.txtAboutContent, isDarkMode && styles.txtAboutContentDark]}>banha.ITI</Text>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}


export default Contact;