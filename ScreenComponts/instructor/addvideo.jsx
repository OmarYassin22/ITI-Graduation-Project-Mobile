import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import * as DocumentPicker from 'expo-document-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { db, storage } from '../../firebase';
import { collection, getDocs } from 'firebase/firestore';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { AnimatedCircularProgress } from 'react-native-circular-progress';

const AddVideo = () => {
  const [courseData, setCourseData] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState('');
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadTask, setUploadTask] = useState(null);

  useEffect(() => {
    const fetchDataWithName = async () => {
      const fullName = await getFullName();
      fetchData(fullName.replace(/"/g, ''));
    };
    fetchDataWithName();
  }, []);

  const getFullName = async () => {
    try {
      const fname = await AsyncStorage.getItem('fname');
      const lname = await AsyncStorage.getItem('lname');
      if (fname !== null) {
        return lname === null || lname === 'undefined' ? fname : `${fname} ${lname}`;
      }
      return '';
    } catch (error) {
      console.error('Error retrieving data', error);
      return '';
    }
  };

  const fetchData = async (fullName) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'students'));
      const students = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      const courseSet = new Set();
      students.forEach((student) => {
        if (student.courses && Array.isArray(student.courses)) {
          student.courses
            .filter((course) => course.instructor === fullName)
            .forEach((course) => courseSet.add(course.course));
        }
      });

      const uniqueCourses = Array.from(courseSet).map((courseName) => ({
        courseName,
      }));

      setCourseData(uniqueCourses);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: 'video/*',
      });
  
      if (result.assets && result.assets.length > 0) {
        setFile(result.assets[0]);
      } else if (result.type === 'success') {
        setFile(result);
      }
    } catch (err) {
      console.error('Error picking file:', err);
    }
  };

  const handleUpload = async () => {
    if (!file || !selectedCourse) {
      Alert.alert(
        'Fill inputs',
        'Please select a course and a file to upload.',
        [
          {
            text: 'OK',
            onPress: () => console.log('OK Pressed'),
            style: 'cancel',
          },
        ],
        {
          titleStyle: { color: 'white' },
          messageStyle: { color: 'white' },
          containerStyle: { backgroundColor: 'black' },
        }
      );
      return;
    }

    setIsUploading(true);

    const storageRef = ref(storage, `${fullName}/${selectedCourse}/${file.name}`);

    const response = await fetch(file.uri);
    const blob = await response.blob();

    const task = uploadBytesResumable(storageRef, blob);
    setUploadTask(task);

    task.on(
      'state_changed',
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setUploadProgress(progress);
      },
      (error) => {
        if (error.code === 'storage/canceled') {
          console.log('Upload was cancelled');
          // Do not show an error message for cancellation
        } else {
          console.error('Error uploading file: ', error);
          Alert.alert(
            'Upload Error',
            'An error occurred while uploading the file.',
            [{ text: 'OK', style: 'cancel' }],
            { titleStyle: { color: 'white' }, containerStyle: { backgroundColor: 'black' } }
          );
        }
        setIsUploading(false);
        setUploadProgress(0);
      },
      () => {
        getDownloadURL(task.snapshot.ref).then((downloadURL) => {
          console.log('File available at', downloadURL);
          setIsUploading(false);
          setUploadProgress(0);
          Alert.alert(
            'Upload Complete',
            'Your file has been successfully uploaded.',
            [{ text: 'OK', style: 'cancel' }],
            { titleStyle: { color: 'white' }, containerStyle: { backgroundColor: 'black' } }
          );
        });
      }
    );
  };

  const handleStopUpload = () => {
    if (uploadTask) {
      uploadTask.cancel();
      // The error handling in the upload task will take care of resetting states
      Alert.alert(
        'Upload cancelled',
        'The upload has been cancelled.',
        [{ text: 'OK', style: 'cancel' }],
        { titleStyle: { color: 'white' }, containerStyle: { backgroundColor: 'black' } }
      );
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.label}>Select Your Course</Text>
        <Picker
          selectedValue={selectedCourse}
          onValueChange={(itemValue) => setSelectedCourse(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Choose a course" value="" />
          {courseData.map((course, key) => (
            <Picker.Item key={key} label={course.courseName} value={course.courseName} />
          ))}
        </Picker>
      </View>

      <View style={styles.filePickerContainer}>
        <Text style={styles.label}>Upload Course Video</Text>
        <TouchableOpacity style={styles.filePickerButton} onPress={handleFilePick}>
          <Text style={styles.filePickerButtonText}>
            {file ? file.name : 'Pick a video file'}
          </Text>
        </TouchableOpacity>
      </View>

      {isUploading && (
        <View style={styles.progressContainer}>
          <AnimatedCircularProgress
            size={120}
            width={15}
            fill={uploadProgress}
            tintColor="#4A90E2"
            backgroundColor="#d6d6d6"
          >
            {(fill) => <Text style={styles.progressText}>{`${Math.round(fill)}%`}</Text>}
          </AnimatedCircularProgress>
        </View>
      )}

      <TouchableOpacity
        style={[styles.button, isUploading ? styles.stopButton : styles.uploadButton]}
        onPress={isUploading ? handleStopUpload : handleUpload}
      >
        <Text style={styles.buttonText}>{isUploading ? 'Stop Upload' : 'Add'}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: 'white',
  },
  pickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    width: '100%',
    height: 50,
    backgroundColor: '#f0f0f0',
    borderRadius: 8,
    padding: 30,
  },
  filePickerContainer: {
    width: '100%',
    marginBottom: 20,
  },
  filePickerButton: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    borderRadius: 8,
  },
  filePickerButtonText: {
    textAlign: 'center',
  },
  progressContainer: {
    marginVertical: 20,
  },
  progressText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  button: {
    padding: 10,
    borderRadius: 8,
    marginTop: 20,
  },
  uploadButton: {
    backgroundColor: '#4A90E2',
  },
  stopButton: {
    backgroundColor: '#E25C5C',
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default AddVideo;