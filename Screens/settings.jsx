import React, { useState } from 'react';
import { View, Text, Switch, StyleSheet, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons'; 
import { Picker } from '@react-native-picker/picker'; 
import Navbar from '../Navigations/navbar';
import { useTranslation } from 'react-i18next';  
import i18n from '../i18n';

const SettingsScreen = ({ isDarkMode, toggleDarkMode, navigation }) => {
  const { t } = useTranslation();
  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  const changeLanguage = (lang) => {
    setSelectedLanguage(lang);
    i18n.changeLanguage(lang);
  };

  return (
    <View style={[styles.screenContainer, isDarkMode && styles.darkContainer]}>
      <Navbar isDarkMode={isDarkMode} navigation={navigation} />
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, styles.marginHeader, isDarkMode && styles.darkText]}>
          {t('settings.account')}
        </Text>
        <View style={styles.settingRow}>
          <Ionicons name="moon" size={24} color="black" style={[styles.icon, isDarkMode && styles.iconDark]} />
          <Text style={[styles.settingText, styles.marginText, isDarkMode && styles.darkText]}>
            {isDarkMode ? t('settings.lightMode') : t('settings.darkMode')}
          </Text>
          <Switch
            value={isDarkMode}
            onValueChange={toggleDarkMode}
            style={styles.switch}
          />
        </View>
        <View style={styles.settingRow}>
          <Ionicons name="language" size={24} color="black" style={[styles.icon, isDarkMode && styles.iconDark]} />
          <Text style={[styles.settingText, styles.marginText, isDarkMode && styles.darkText]}>{t('settings.language')}</Text>
          <Picker
            selectedValue={selectedLanguage}
            onValueChange={(itemValue) => changeLanguage(itemValue)}
            style={[styles.picker, isDarkMode && styles.greyContainer]}
          >
            <Picker.Item label="English" value="en" />
            <Picker.Item label="العربية" value="ar" />
          </Picker>
        </View>
      </View>
      <View style={styles.section}>
        <Text style={[styles.sectionTitle, styles.marginHeader, isDarkMode && styles.darkText]}>{t('settings.more')}</Text>
        <TouchableOpacity style={styles.settingRow} onPress={() => navigation.navigate('About')}>
          <Ionicons name="information-circle" size={24} color="black" style={[styles.icon, isDarkMode && styles.iconDark]} />
          <Text style={[styles.settingText, isDarkMode && styles.darkText]}>{t('settings.aboutUs')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow} onPress={() => navigation.navigate('Contact')}>
          <Ionicons name="mail" size={24} color="black" style={[styles.icon, isDarkMode && styles.iconDark]} />
          <Text style={[styles.settingText, isDarkMode && styles.darkText]}>{t('settings.contactUs')}</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.settingRow} onPress={() => alert('Rate Us')}>
          <Ionicons name="star" size={24} color="black" style={[styles.icon, isDarkMode && styles.iconDark]} />
          <Text style={[styles.settingText, isDarkMode && styles.darkText]}>{t('settings.rateUs')}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
    darkText: {
        color: '#fff',
      },
    screenContainer: {
        flex: 1,
      },
      darkContainer: {
        backgroundColor: '#333',
      },
      greyContainer: {
        backgroundColor: 'grey',
      },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 8,
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 15,
    borderRadius: 8,
    elevation: 2,
    shadowColor: '#000',
  },
  settingText: {
    fontSize: 16,
    fontWeight:'bold',
  },
  marginHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    marginLeft: 20,
    fontWeight:'bold',
  },
  marginText:{
    fontSize: 16,
    position:'absolute',
    left: 45,
    fontWeight:'bold',
  },
  icon: {
    marginRight: 0,
  },
  iconDark: {
    marginRight: 0,
    marginLeft: 0,
    color: '#fff',
  },
  switch: {
    transform: [{ scaleX: 1.2 }, { scaleY: 1.2 }],
  },
  picker: {
    width: 135,
    backgroundColor: '#f0f0f0',
  },
});

export default SettingsScreen;