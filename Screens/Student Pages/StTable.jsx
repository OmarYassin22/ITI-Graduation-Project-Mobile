import React from "react";
import { View, Text, StyleSheet, SafeAreaView, ScrollView, Alert } from "react-native";
import { DataTable } from 'react-native-paper';
import styles from "../../styles.js";

const StTable = ({ isDarkMode, toggleDarkMode, navigation }) => {
    const handlePress = (title, name) => {
        Alert.alert(title, name);
    };
    return (
        <SafeAreaView style={[styles.mainContainer, isDarkMode && styles.mainContainerDark]}>
            <ScrollView showsVerticalScrollIndicator={false}>
                <DataTable style={styles.tableContainer}>
                    <DataTable.Header style={styles.tableHeader}>
                        <DataTable.Title>Name</DataTable.Title>
                        <DataTable.Title>Grade</DataTable.Title>
                        <DataTable.Title>Percentage</DataTable.Title>
                        <DataTable.Title>Status</DataTable.Title>
                        <DataTable.Title>instructor</DataTable.Title>
                    </DataTable.Header>
                    <DataTable.Row>
                        <DataTable.Cell onPress={() => handlePress("Name", "Java Script")}>Java Script</DataTable.Cell>
                        <DataTable.Cell onPress={() => handlePress("Grade", "80/100")}>80/100</DataTable.Cell>
                        <DataTable.Cell onPress={() => handlePress("Percentage", "80%")}>80%</DataTable.Cell>
                        <DataTable.Cell onPress={() => handlePress("Status", "Pass")}>Pass</DataTable.Cell>
                        <DataTable.Cell onPress={() => handlePress("instructor", "Amr Gado")}>Amr Gado</DataTable.Cell>
                    </DataTable.Row>
                    <DataTable.Row>
                        <DataTable.Cell onPress={() => handlePress("Name", "HTMl")}>HTML</DataTable.Cell>
                        <DataTable.Cell onPress={() => handlePress("Grade", "60/100")}>60/100</DataTable.Cell>
                        <DataTable.Cell onPress={() => handlePress("Percentage", "60%")}>60%</DataTable.Cell>
                        <DataTable.Cell onPress={() => handlePress("Status", "Pass")}>Pass</DataTable.Cell>
                        <DataTable.Cell onPress={() => handlePress("instructor", "Amr Gado")}>Amr Gado</DataTable.Cell>
                    </DataTable.Row>
                </DataTable>
            </ScrollView>
        </SafeAreaView >
    );
}

export default StTable;


