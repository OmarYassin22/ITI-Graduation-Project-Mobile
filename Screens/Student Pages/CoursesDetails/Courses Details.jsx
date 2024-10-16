import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert, Image } from "react-native";
import { Video } from 'expo-av';
import { getStorage, ref, listAll, getDownloadURL } from "firebase/storage";
import SecondNavbar from '../../../Navigations/secondNav/secondNavbar.jsx';
import styles from "../../../styles.js";
import { useTranslation } from 'react-i18next';

const CoursesDetails = ({ isDarkMode, toggleDarkMode, navigation, route }) => {
    const { t } = useTranslation();
    const { id, course, instructor } = route.params;
    const [videoUrl, setVideoUrl] = useState(null);

    useEffect(() => {
        const fetchVideo = async () => {
            const storage = getStorage();
            const courseRef = ref(storage, `${instructor}/${course}`);
            try {
                const result = await listAll(courseRef);
                const videoItems = result.items.filter(item => item.name.toLowerCase().endsWith('.mp4'));
                
                if (videoItems.length > 0) {
                    const url = await getDownloadURL(videoItems[0]);
                    setVideoUrl(url);
                } else {
                    throw new Error("No MP4 files found in this directory");
                }
            } catch (error) {
                // console.error("Error fetching video:", error);
                Alert.alert(t('student.courseDetails.StayTuned'), t('student.courseDetails.instructorWill'),);
            }
        };

        fetchVideo();
    }, [instructor, course]);

    return (
        <SafeAreaView style={[styles.mainContainer, isDarkMode && styles.mainContainerDark]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <SecondNavbar
                    isDarkMode={isDarkMode}
                    navigation={navigation}
                />
                <View style={[styles.courseDetailsContainer, isDarkMode && styles.courseDetailsContainerDark]}>
                    <Text style={[styles.courseDetailsText, isDarkMode && styles.courseDetailsTextDark]}>{course}</Text>
                    <Image 
                        source={
                            course == "Bootstrap" ? require("../../../assets/coureses images/Bootstrap.jpeg") :
                            course == "Flutter" ? require("../../../assets/coureses images/flutterr.png") :
                            course == "php" ? require("../../../assets/coureses images/PHP.png") :
                            course == "React Native" ? require("../../../assets/coureses images/react-native-1.png") :
                            course == "Java" ? require("../../../assets/coureses images/java.png") :
                            require("../../../assets/coureses images/node.png")
                        } 
                        style={styles.courseDetails} 
                    />
                    <Text style={[styles.courseDetailsText, isDarkMode && styles.courseDetailsTextDark]}>{t('student.courseDetails.Instructor')}: {instructor}</Text>
                    
                    {videoUrl && (
                        <Video
                            source={{ uri: videoUrl }}
                            rate={1.0}
                            volume={1.0}
                            isMuted={false}
                            resizeMode="contain"
                            shouldPlay={false}
                            isLooping={false}
                            useNativeControls
                            style={{ width: '70%', height: 500, marginTop: 20 }}
                        />
                    )}
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default CoursesDetails;