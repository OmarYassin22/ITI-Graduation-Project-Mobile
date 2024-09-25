import React from 'react';
import { Modal, Pressable, View, TouchableOpacity, ActivityIndicator, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
const UploadModal = ({
    modalVisible,
    onBackPress,
    onCameraPress,
    onGalleryPress,
    onRemovePress,
    isLoading = false,
}) => {
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
        >
            <Pressable style={styles.container} onPress={onBackPress}>
                {isLoading && <ActivityIndicator size={70} color="#6200ee" />}
                {!isLoading && (
                    <View style={styles.modalView}>
                        <Text style={styles.headerText}>
                            Profile photo
                        </Text>
                        <View style={styles.decisionRow}>
                            <TouchableOpacity style={styles.optionBtn} onPress={onCameraPress}>
                                <MaterialCommunityIcons name="camera-outline" size={30} color="#6200ee" />
                                <Text style={styles.optionText}>Camera</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionBtn} onPress={onGalleryPress}>
                                <MaterialCommunityIcons name="image-multiple-outline" size={30} color="#6200ee" />
                                <Text style={styles.optionText}>Gallery</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.optionBtn} onPress={onRemovePress}>
                                <MaterialCommunityIcons name="trash-can-outline" size={30} color="#6200ee" />
                                <Text style={styles.optionText}>Remove</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
            </Pressable>
        </Modal>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // خلفية شبه شفافة
    },
    modalView: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 20,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    headerText: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    decisionRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        marginTop: 10,
    },
    optionBtn: {
        flex: 1,
        alignItems: 'center',
        padding: 10,
    },
    optionText: {
        fontSize: 16,
        color: '#6200ee',
    },
});

export default UploadModal;
