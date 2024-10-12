import React, { useState } from 'react';
import { ScrollView, Text, View, TouchableOpacity } from 'react-native';
import styles from "../About Page/styles";
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/Ionicons';
import { TextInput } from 'react-native-gesture-handler';
import { useTranslation } from 'react-i18next';
import { useMessages } from '../../api/messages/MessagesContext';
import MessagesProvider from '../../api/messages/MessagesContext';
const Contact = ({ isDarkMode }) => {
    const { t } = useTranslation();
    const { addMessage } = useMessages();
    const [inputs, setInputs] = useState({
        name: "",
        email: "",
        subject: "",
        message: "",
    });
    const [loading, setLoading] = useState(false);
    
    const handleChange = (txt, inputName) => {
        setInputs({ ...inputs, [inputName]: txt });
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            await addMessage(inputs);
            alert(t('Message added successfully')); 
            setInputs({ name: "", email: "", subject: "", message: "" });
        } catch (error) {
            alert(t('There was an error'));
        } finally {
            setLoading(false); 
        }
    };

    return (
        <MessagesProvider>
        <SafeAreaView style={[styles.mainContainer, isDarkMode && styles.mainContainerDark]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Text style={styles.txtAbout}>{t('contact.contactUs')}</Text>
                <Text style={styles.txtAbout}>{t('contact.howCanIHelp')}</Text>
                <Text style={[styles.txtAboutContent, isDarkMode && styles.txtAboutContentDark]}>
                    {t('contact.fillFormOrEmail')}
                </Text>
                <View style={styles.shadowBox}>
                    <Text style={[styles.labelsForContact, isDarkMode && styles.labelsForContactDark]}>{t('contact.name')}</Text>
                    <TextInput
                        style={[styles.txtInputs, isDarkMode && styles.txtInputsDark]}
                        value={inputs.name}
                        onChangeText={(txt) => { handleChange(txt, "name") }}
                    />
                    <Text style={[styles.labelsForContact, isDarkMode && styles.labelsForContactDark]}>{t('contact.email')}</Text>
                    <TextInput
                        style={[styles.txtInputs, isDarkMode && styles.txtInputsDark]}
                        value={inputs.email}
                        onChangeText={(txt) => { handleChange(txt, "email") }}
                    />
                    <Text style={[styles.labelsForContact, isDarkMode && styles.labelsForContactDark]}>{t('contact.subject')}</Text>
                    <TextInput
                        style={[styles.txtInputs, isDarkMode && styles.txtInputsDark]}
                        value={inputs.subject}
                        onChangeText={(txt) => { handleChange(txt, "subject") }}
                    />
                    <Text style={[styles.labelsForContact, isDarkMode && styles.labelsForContactDark]}>{t('contact.message')}</Text>
                    <TextInput
                        style={[styles.txtInputsMessage, isDarkMode && styles.txtInputsMessageDark]}
                        value={inputs.message}
                        onChangeText={(txt) => { handleChange(txt, "message") }}
                    />
                    <TouchableOpacity style={styles.button} onPress={handleSubmit} disabled={loading}>
                        <Text style={styles.btnTxt}>{loading ? t('contact.sending') : t('contact.submit')}</Text>
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
        </MessagesProvider>
    );
};
export default Contact;
