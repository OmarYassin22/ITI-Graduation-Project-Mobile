import React from 'react';
import { ScrollView, Image, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Card, IconButton } from 'react-native-paper';

const StCourses = ({ isDarkMode }) => {
    return (
        <SafeAreaView style={[styles.mainContainer, isDarkMode ? styles.mainContainerDark : styles.mainContainer]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <Card style={[styles.coursesCard, isDarkMode ? styles.coursesCardDark : styles.coursesCard]}>
                    <Card.Title
                        titleStyle={isDarkMode ? styles.titleTextDark : styles.titleText}
                        subtitleStyle={isDarkMode ? styles.subtitleTextDark : styles.subtitleText}
                        title="Java Script"
                        subtitle="With Amr Gado"
                        left={(props) => (
                            <Image source={require("../../assets/coureses images/JavaScript.png")} style={styles.coursesImages} />
                        )}
                        right={(props) => (
                            <IconButton
                                {...props}
                                icon="eye"
                                color={isDarkMode ? '#ffffff' : '#000000'} 
                                onPress={() => { }} 
                            />
                        )}
                    />
                </Card>
                <Card style={[styles.coursesCard, isDarkMode ? styles.coursesCardDark : styles.coursesCard]}>
                    <Card.Title
                        titleStyle={isDarkMode ? styles.titleTextDark : styles.titleText}
                        subtitleStyle={isDarkMode ? styles.subtitleTextDark : styles.subtitleText}
                        title="HTML"
                        subtitle="With Amr Gado"
                        left={(props) => (
                            <Image source={require("../../assets/coureses images/HTML-5.png")} style={styles.coursesImages} />
                        )}
                        right={(props) => (
                            <IconButton
                                {...props}
                                icon="eye"
                                color={isDarkMode ? '#ffffff' : '#000000'} // لون الأيقونة في الوضع الداكن والفاتح
                                onPress={() => { }} 
                            />
                        )}
                    />
                </Card>
            </ScrollView>
        </SafeAreaView>
    );
};

// الأنماط هنا
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff', // لون الخلفية في الوضع العادي
        padding: 16,
    },
    mainContainerDark: {
        backgroundColor: '#121212', // لون الخلفية في الوضع الداكن
    },
    coursesCard: {
        marginBottom: 16,
        backgroundColor: '#ffffff', // لون البطاقة في الوضع العادي
    },
    coursesCardDark: {
        backgroundColor: '#333333', // لون البطاقة في الوضع الداكن
    },
    coursesImages: {
        width: 50,
        height: 50,
        borderRadius: 5,
    },
    titleText: {
        color: '#000', // لون النص في الوضع العادي
    },
    titleTextDark: {
        color: '#fff', // لون النص في الوضع الداكن
    },
    subtitleText: {
        color: '#555', // لون النص الفرعي في الوضع العادي
    },
    subtitleTextDark: {
        color: '#ccc', // لون النص الفرعي في الوضع الداكن
    },
});

export default StCourses;
