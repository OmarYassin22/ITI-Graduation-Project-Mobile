import React, { useEffect, useState } from 'react';
import { View, Text, Platform, TextInput, TouchableOpacity, FlatList, StyleSheet, SafeAreaView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Students = ({ isDarkMode }) => {
  const [courseData, setCourseData] = useState([]);
  const [gradeInputs, setGradeInputs] = useState({});
  const [uniqueFieldsArray, setUniqueFieldsArray] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

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

      const instructorCourses = students.flatMap((student) => {
        if (!student.courses || !Array.isArray(student.courses) || student.courses.length === 0) {
          return [];
        }

        let filtered = student.courses.filter((course) => course.instructor === fullName);

        return filtered.map((course) => ({
          studentId: student.id,
          courseStudent: student.fname + " " + student.lname,
          courseName: course.course,
          degree: course.degree || 0,
          field: student.field || "",
        }));
      });

      const uniqueFields = new Set(instructorCourses.map((course) => course.field));
      setUniqueFieldsArray(Array.from(uniqueFields));
      setCourseData(instructorCourses);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

  const handleGradeInputChange = (studentId, courseName, value) => {
    setGradeInputs((prev) => ({
      ...prev,
      [`${studentId}-${courseName}`]: value,
    }));
  };

  const handleEditGrade = async (studentId, courseName) => {
    const newGrade = gradeInputs[`${studentId}-${courseName}`];
    if (!newGrade) return;

    try {
      const studentDoc = doc(db, 'students', studentId);
      const studentSnapshot = await getDoc(studentDoc);

      if (studentSnapshot.exists()) {
        const studentData = studentSnapshot.data();
        const updatedCourses = studentData.courses.map((course) =>
          course.course === courseName ? { ...course, degree: newGrade } : course
        );

        await updateDoc(studentDoc, { courses: updatedCourses });

        setCourseData((prevData) =>
          prevData.map((course) =>
            course.studentId === studentId && course.courseName === courseName
              ? { ...course, degree: newGrade }
              : course
          )
        );
        setGradeInputs((prev) => ({
          ...prev,
          [`${studentId}-${courseName}`]: '',
        }));
      } else {
        console.error('No such document!');
      }
    } catch (error) {
      console.error('Error updating grade: ', error);
    }
  };

  const sortData = (key) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }

    const sortedData = [...courseData].sort((a, b) => {
      if (key === 'degree') {
        const aValue = parseFloat(a[key]);
        const bValue = parseFloat(b[key]);
        return direction === 'ascending' ? aValue - bValue : bValue - aValue;
      } else {
        return direction === 'ascending'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      }
    });

    setCourseData(sortedData);
    setSortConfig({ key, direction });
  };

  const getSortDirection = (key) => {
    if (sortConfig.key === key) {
      return sortConfig.direction === 'ascending' ? '▲' : '▼';
    }
    return '';
  };

  const renderHeader = () => (
    <View style={[styles.headerRow, { backgroundColor: isDarkMode ? '#1e1e1e' : '#f0f0f0' }]}>
      <TouchableOpacity style={styles.headerCell} onPress={() => sortData('courseStudent')}>
        <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#000' }]}>Name {getSortDirection('courseStudent')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerCell} onPress={() => sortData('courseName')}>
        <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#000' }]}>Course {getSortDirection('courseName')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerCell} onPress={() => sortData('degree')}>
        <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#000' }]}>Grade {getSortDirection('degree')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerCell} onPress={() => sortData('field')}>
        <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#000' }]}>Field {getSortDirection('field')}</Text>
      </TouchableOpacity>
      <View style={styles.headerCell}>
        <Text style={[styles.headerText, { color: isDarkMode ? '#fff' : '#000' }]}>Add Grade</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={[styles.row, { backgroundColor: isDarkMode ? '#1e1e1e' : '#fff' }]}>
      <Text style={[styles.cell, { color: isDarkMode ? '#fff' : '#000' }]}>{item.courseStudent}</Text>
      <Text style={[styles.cell, { color: isDarkMode ? '#fff' : '#000' }]}>{item.courseName}</Text>
      <Text style={[styles.cell, { color: isDarkMode ? '#fff' : '#000' }]}>{item.degree}</Text>
      <Text style={[styles.cell, { color: isDarkMode ? '#fff' : '#000' }]}>{item.field}</Text>
      <View style={styles.gradeInputContainer}>
        <TextInput
          style={[styles.gradeInput, { borderColor: isDarkMode ? '#fff' : '#ccc', color: isDarkMode ? '#fff' : '#000' }]}
          keyboardType="numeric"
          value={gradeInputs[`${item.studentId}-${item.courseName}`] || ''}
          onChangeText={(value) => handleGradeInputChange(item.studentId, item.courseName, value)}
        />
        <TouchableOpacity
          style={styles.editButton}
          onPress={() => handleEditGrade(item.studentId, item.courseName)}
        >
          <Text style={styles.editButtonText}>{item.degree === '0' ? 'Add' : 'Edit'}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: isDarkMode ? '#121212' : '#fff' }]}>
      <View style={styles.container}>
        <View style={styles.pickerContainer}>
          <Text style={[styles.pickerLabel, { color: isDarkMode ? '#fff' : '#000' }]}>Select The Field</Text>
          <Picker
            selectedValue={selectedField}
            onValueChange={(itemValue) => setSelectedField(itemValue)}
            style={[styles.picker, { backgroundColor: isDarkMode ? '#333' : '#f0f0f0' }]}
            itemStyle={{ color: isDarkMode ? '#fff' : '#000' }}
          >
            <Picker.Item label="Choose a field" value="" color={isDarkMode ? '#fff' : '#000'} 
            style={{ backgroundColor: isDarkMode ? '#121212' : '#fff' }}
            />
            {uniqueFieldsArray.map((field, index) => (
              <Picker.Item key={index} label={field} value={field} color={isDarkMode ? '#fff' : '#000'}
              style={{ backgroundColor: isDarkMode ? '#121212' : '#fff' }}
              />
            ))}
          </Picker>

        </View>
        <FlatList
          data={selectedField ? courseData.filter((course) => course.field === selectedField) : courseData}
          renderItem={renderItem}
          keyExtractor={(item, index) => `${item.studentId}-${item.courseName}-${index}`}
          ListHeaderComponent={renderHeader}
          stickyHeaderIndices={[0]}
          contentContainerStyle={[styles.flatListContent, { backgroundColor: isDarkMode ? '#121212' : '#fff' }]}
        />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    paddingTop: Platform.OS === 'android' ? 40 : 0,
    flex: 1,
  },
  container: {
    flex: 1,
    padding: 10,
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 10,
  },
  picker: {
    height: 50,
    padding: 30,
  },
  flatListContent: {
    flexGrow: 1,
  },
  headerRow: {
    flexDirection: 'row',
    padding: 10,
  },
  headerCell: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerText: {
    fontWeight: 'bold',
    fontSize: 12,
  },
  row: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    padding: 10,
  },
  cell: {
    flex: 1,
    fontSize: 12,
    textAlign: 'center',
  },
  gradeInputContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  gradeInput: {
    flex: 1,
    borderWidth: 1,
    padding: 5,
    fontSize: 12,
  },
  editButton: {
    backgroundColor: '#4A90E2',
    padding: 5,
    borderRadius: 5,
    marginLeft: 5,
  },
  editButtonText: {
    color: 'white',
    fontSize: 12,
  },
});

export default Students;
