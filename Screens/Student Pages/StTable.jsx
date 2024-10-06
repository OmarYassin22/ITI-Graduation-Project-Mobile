import React from "react";
import { StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
import { DataTable } from 'react-native-paper';

const StTable = ({ isDarkMode }) => {
    const handlePress = (title, name) => {
        Alert.alert(title, name);
    };

    return (
        <SafeAreaView style={[styles.mainContainer, isDarkMode ? styles.mainContainerDark : styles.mainContainer]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <DataTable style={styles.tableContainer}>
                    <DataTable.Header style={[styles.tableHeader, isDarkMode ? styles.tableHeaderDark : styles.tableHeader]}>
                        <DataTable.Title textStyle={isDarkMode ? styles.titleTextDark : styles.titleText}>Name</DataTable.Title>
                        <DataTable.Title textStyle={isDarkMode ? styles.titleTextDark : styles.titleText}>Grade</DataTable.Title>
                        <DataTable.Title textStyle={isDarkMode ? styles.titleTextDark : styles.titleText}>Percentage</DataTable.Title>
                        <DataTable.Title textStyle={isDarkMode ? styles.titleTextDark : styles.titleText}>Status</DataTable.Title>
                        <DataTable.Title textStyle={isDarkMode ? styles.titleTextDark : styles.titleText}>Instructor</DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row>
                        <DataTable.Cell textStyle={isDarkMode ? styles.cellTextDark : styles.cellText} onPress={() => handlePress("Name", "Java Script")}>Java Script</DataTable.Cell>
                        <DataTable.Cell textStyle={isDarkMode ? styles.cellTextDark : styles.cellText} onPress={() => handlePress("Grade", "80/100")}>80/100</DataTable.Cell>
                        <DataTable.Cell textStyle={isDarkMode ? styles.cellTextDark : styles.cellText} onPress={() => handlePress("Percentage", "80%")}>80%</DataTable.Cell>
                        <DataTable.Cell textStyle={isDarkMode ? styles.cellTextDark : styles.cellText} onPress={() => handlePress("Status", "Pass")}>Pass</DataTable.Cell>
                        <DataTable.Cell textStyle={isDarkMode ? styles.cellTextDark : styles.cellText} onPress={() => handlePress("instructor", "Amr Gado")}>Amr Gado</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell textStyle={isDarkMode ? styles.cellTextDark : styles.cellText} onPress={() => handlePress("Name", "HTML")}>HTML</DataTable.Cell>
                        <DataTable.Cell textStyle={isDarkMode ? styles.cellTextDark : styles.cellText} onPress={() => handlePress("Grade", "60/100")}>60/100</DataTable.Cell>
                        <DataTable.Cell textStyle={isDarkMode ? styles.cellTextDark : styles.cellText} onPress={() => handlePress("Percentage", "60%")}>60%</DataTable.Cell>
                        <DataTable.Cell textStyle={isDarkMode ? styles.cellTextDark : styles.cellText} onPress={() => handlePress("Status", "Pass")}>Pass</DataTable.Cell>
                        <DataTable.Cell textStyle={isDarkMode ? styles.cellTextDark : styles.cellText} onPress={() => handlePress("instructor", "Amr Gado")}>Amr Gado</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </ScrollView>
        </SafeAreaView>
    );
}

// الأنماط هنا
const styles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        backgroundColor: '#ffffff', 
    },
    mainContainerDark: {
        backgroundColor: '#121212', 
    },
    tableContainer: {
        margin: 16,
        borderRadius: 8,
    },
    tableHeader: {
        backgroundColor: '#f0f0f0', 
    },
    tableHeaderDark: {
        backgroundColor: '#333333',
    },
    titleText: {
        color: '#000',
    },
    titleTextDark: {
        color: '#fff', 
    },
    cellText: {
        color: '#000', 
    },
    cellTextDark: {
        color: '#fff', 
    },
});

export default StTable;
