import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../../firebase';

const Table = () => {
  const [courseData, setCourseData] = useState([]);
  const [dataFetched, setDataFetched] = useState(false);
  const [gradeInputs, setGradeInputs] = useState({});
  const [uniqueFieldsArray, setUniqueFieldsArray] = useState([]);
  const [selectedField, setSelectedField] = useState('');
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });

  useEffect(() => {
    if (!dataFetched) {
      fetchData('Emad Elshplangy');
    }
  }, [dataFetched]);

  const fetchData = async (fullName) => {
    try {
      const querySnapshot = await getDocs(collection(db, 'students'));
      const students = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      console.error(fullName);
  
      const instructorCourses = students.flatMap((student) => {
        if (!student.courses || !Array.isArray(student.courses) || student.courses.length === 0) {
          console.warn(`Student ${student.id} has no courses`);
          return [];
        }
  
        console.warn(`Student courses:`, student.courses);

        let filtered = student.courses.filter((course) => course.instructor === fullName);
  
        console.warn(`Filtered courses:`, filtered);

        return filtered.map((course) => ({
          studentId: student.id,
          courseStudent: student.fname + " " + student.lname,
          courseName: course.course,
          degree: course.degree || 0,
          field: student.field || "",
        }));
      });
  
      console.warn('Processed instructor courses:', instructorCourses);
  
      const uniqueFields = new Set(instructorCourses.map((course) => course.field));
      setUniqueFieldsArray(Array.from(uniqueFields));
      setCourseData(instructorCourses);
      setDataFetched(true);
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };
  
  // const fetchData = async (fullName) => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, 'students'));
  //     const students = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     // console.warn('Raw student data:', JSON.stringify(students, null, 2));

  //     const instructorCourses = students.flatMap((student) => {
  //       if (!student.courses || !Array.isArray(student.courses) || student.courses.length === 0) {
  //         console.warn(`Student ${student.id} has no courses`);
  //         return [];
  //       }
  
  //       // console.warn(`Processing courses for student ${student.id}:`, student.courses);
  
  //       // const filteredCourses = student.courses?.filter((course) => course.instructor === fullName);
  //       console.warn(`Student courses:`, student.courses);
  
  //       return student.courses.filter((course) => course.instructor.trim().toLowerCase() === fullName.trim().toLowerCase())
  //       .map((course) => ({
  //         studentId: student.id,
  //         courseStudent: `${student.fname} ${student.lname}`,
  //         courseName: course.course,
  //         degree: course.degree || '0',
  //         field: student.field || '',
  //       }));
  //     });

  //     console.warn('Processed instructor courses:', instructorCourses);
  
  //     const uniqueFields = new Set(instructorCourses.map((course) => course.field));
  //     setUniqueFieldsArray(Array.from(uniqueFields));
  //     setCourseData(instructorCourses);
  //     setDataFetched(true);
  //   } catch (error) {
  //     console.error('Error fetching data: ', error);
  //   }
  // };

  // const fetchData = async (fullName) => {
  //   try {
  //     const querySnapshot = await getDocs(collection(db, 'students'));
  //     const students = querySnapshot.docs.map((doc) => ({
  //       id: doc.id,
  //       ...doc.data(),
  //     }));

  //     // console.error(students);

  //     const instructorCourses = students.flatMap((student) => {
  //       if (!student.courses || !Array.isArray(student.courses) || student.courses.length === 0) {
  //         return [];
  //       }

  //       console.warn(student.courses);

  //       return student.courses?.filter((course) => course.instructor === fullName)
  //         .map((course) => ({
  //           studentId: student.id,
  //           courseStudent: `${student.fname} ${student.lname}`,
  //           courseName: course.course,
  //           degree: course.degree || '0',
  //           field: student.field || '',
  //         }));
  //     });

  //     const uniqueFields = new Set(instructorCourses.map((course) => course.field));
  //     setUniqueFieldsArray(Array.from(uniqueFields));
  //     setCourseData(instructorCourses);
  //     // console.warn('instructorCourses:', instructorCourses);
  //     setDataFetched(true);
  //   } catch (error) {
  //     console.error('Error fetching data: ', error);
  //   }
  // };

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
    <View style={styles.headerRow}>
      <TouchableOpacity style={styles.headerCell} onPress={() => sortData('courseStudent')}>
        <Text style={styles.headerText}>Name {getSortDirection('courseStudent')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerCell} onPress={() => sortData('courseName')}>
        <Text style={styles.headerText}>Course {getSortDirection('courseName')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerCell} onPress={() => sortData('degree')}>
        <Text style={styles.headerText}>Grade {getSortDirection('degree')}</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.headerCell} onPress={() => sortData('field')}>
        <Text style={styles.headerText}>Field {getSortDirection('field')}</Text>
      </TouchableOpacity>
      <View style={styles.headerCell}>
        <Text style={styles.headerText}>Add Grade</Text>
      </View>
    </View>
  );

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Text style={styles.cell}>{item.courseStudent}</Text>
      <Text style={styles.cell}>{item.courseName}</Text>
      <Text style={styles.cell}>{item.degree}</Text>
      <Text style={styles.cell}>{item.field}</Text>
      <View style={styles.gradeInputContainer}>
        <TextInput
          style={styles.gradeInput}
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
    <View style={styles.container}>
      <View style={styles.pickerContainer}>
        <Text style={styles.pickerLabel}>Select The Field</Text>
        <Picker
          selectedValue={selectedField}
          onValueChange={(itemValue) => setSelectedField(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Choose a field" value="" />
          {uniqueFieldsArray.map((field, index) => (
            <Picker.Item key={index} label={field} value={field} />
          ))}
        </Picker>
      </View>
      <FlatList
        data={selectedField ? courseData.filter((course) => course.field === selectedField) : courseData}
        renderItem={renderItem}
        keyExtractor={(item, index) => `${item.studentId}-${item.courseName}-${index}`}
        ListHeaderComponent={renderHeader}
        stickyHeaderIndices={[0]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: '#fff',
  },
  pickerContainer: {
    marginBottom: 20,
  },
  pickerLabel: {
    fontSize: 16,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    backgroundColor: '#f0f0f0',
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#f0f0f0',
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
    borderColor: '#ccc',
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

export default Table;

// import React, { useEffect, useState } from 'react';
// import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
// import { Picker } from '@react-native-picker/picker';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import { collection, getDocs, doc, getDoc, updateDoc } from 'firebase/firestore';
// import { auth, db } from '../../../app/firebaseConfig'; // Make sure this path is correct

// const Table = () => {
//   const [courseData, setCourseData] = useState([]);
//   const [dataFetched, setDataFetched] = useState(false);
//   const [gradeInputs, setGradeInputs] = useState({});
//   const [uniqueFieldsArray, setUniqueFieldsArray] = useState([]);
//   const [selectedField, setSelectedField] = useState('');
//   const [sortConfig, setSortConfig] = useState({ key: null, direction: 'ascending' });
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const getFullName = async () => {
//       // const fname = await AsyncStorage.getItem('fname');
//       // const lname = await AsyncStorage.getItem('lname');
//       // return `${fname}${lname ? ' ' + lname : ''}`;
//       return `Emad Elshplangy`;
//     };

//     const fetchDataWrapper = async () => {
//       setLoading(true);
//       try {
//         const fullName = await getFullName();
//         await fetchData(fullName);
//       } catch (error) {
//         console.error('Error in fetchDataWrapper:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     if (!dataFetched) {
//       fetchDataWrapper();
//     }
//   }, [dataFetched]);

//   const fetchData = async (fullName) => {
//     try {
//       console.log('Fetching data for:', fullName);
//       const querySnapshot = await getDocs(collection(db, 'students'));
//       console.log('Query snapshot:', querySnapshot.size, 'documents');
      
//       const students = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       console.log('Processed students:', students.length);

//       const instructorCourses = students.flatMap((student) => {
//         if (!student.courses || !Array.isArray(student.courses) || student.courses.length === 0) {
//           return [];
//         }

//         return student.courses
//           .filter((course) => {
//             console.log('Comparing:', course.instructor, 'with', fullName);
//             return course.instructor === fullName;
//           })
//           .map((course) => ({
//             studentId: student.id,
//             courseStudent: `${student.fname} ${student.lname}`,
//             courseName: course.course,
//             degree: course.degree || '0',
//             field: student.field || '',
//           }));
//       });

//       console.log('Instructor courses:', instructorCourses.length);

//       const uniqueFields = new Set(instructorCourses.map((course) => course.field));
//       setUniqueFieldsArray(Array.from(uniqueFields));
//       setCourseData(instructorCourses);
//       setDataFetched(true);
//     } catch (error) {
//       console.error('Error fetching data: ', error);
//     }
//   };

//   const handleGradeInputChange = (studentId, courseName, value) => {
//     setGradeInputs((prev) => ({
//       ...prev,
//       [`${studentId}-${courseName}`]: value,
//     }));
//   };

//   const handleEditGrade = async (studentId, courseName) => {
//     const newGrade = gradeInputs[`${studentId}-${courseName}`];
//     if (!newGrade) return;

//     try {
//       const studentDoc = doc(db, 'students', studentId);
//       const studentSnapshot = await getDoc(studentDoc);

//       if (studentSnapshot.exists()) {
//         const studentData = studentSnapshot.data();
//         const updatedCourses = studentData.courses.map((course) =>
//           course.course === courseName ? { ...course, degree: newGrade } : course
//         );

//         await updateDoc(studentDoc, { courses: updatedCourses });

//         setCourseData((prevData) =>
//           prevData.map((course) =>
//             course.studentId === studentId && course.courseName === courseName
//               ? { ...course, degree: newGrade }
//               : course
//           )
//         );
//         setGradeInputs((prev) => ({
//           ...prev,
//           [`${studentId}-${courseName}`]: '',
//         }));
//       } else {
//         console.error('No such document!');
//       }
//     } catch (error) {
//       console.error('Error updating grade: ', error);
//     }
//   };

//   const sortData = (key) => {
//     let direction = 'ascending';
//     if (sortConfig.key === key && sortConfig.direction === 'ascending') {
//       direction = 'descending';
//     }

//     const sortedData = [...courseData].sort((a, b) => {
//       if (key === 'degree') {
//         const aValue = parseFloat(a[key]);
//         const bValue = parseFloat(b[key]);
//         return direction === 'ascending' ? aValue - bValue : bValue - aValue;
//       } else {
//         return direction === 'ascending'
//           ? a[key].localeCompare(b[key])
//           : b[key].localeCompare(a[key]);
//       }
//     });

//     setCourseData(sortedData);
//     setSortConfig({ key, direction });
//   };

//   const getSortDirection = (key) => {
//     if (sortConfig.key === key) {
//       return sortConfig.direction === 'ascending' ? '▲' : '▼';
//     }
//     return '';
//   };

//   const renderHeader = () => (
//     <View style={styles.headerRow}>
//       <TouchableOpacity style={styles.headerCell} onPress={() => sortData('courseStudent')}>
//         <Text style={styles.headerText}>Name {getSortDirection('courseStudent')}</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.headerCell} onPress={() => sortData('courseName')}>
//         <Text style={styles.headerText}>Course {getSortDirection('courseName')}</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.headerCell} onPress={() => sortData('degree')}>
//         <Text style={styles.headerText}>Grade {getSortDirection('degree')}</Text>
//       </TouchableOpacity>
//       <TouchableOpacity style={styles.headerCell} onPress={() => sortData('field')}>
//         <Text style={styles.headerText}>Field {getSortDirection('field')}</Text>
//       </TouchableOpacity>
//       <View style={styles.headerCell}>
//         <Text style={styles.headerText}>Add Grade</Text>
//       </View>
//     </View>
//   );

//   const renderItem = ({ item }) => (
//     <View style={styles.row}>
//       <Text style={styles.cell}>{item.courseStudent}</Text>
//       <Text style={styles.cell}>{item.courseName}</Text>
//       <Text style={styles.cell}>{item.degree}</Text>
//       <Text style={styles.cell}>{item.field}</Text>
//       <View style={styles.gradeInputContainer}>
//         <TextInput
//           style={styles.gradeInput}
//           keyboardType="numeric"
//           value={gradeInputs[`${item.studentId}-${item.courseName}`] || ''}
//           onChangeText={(value) => handleGradeInputChange(item.studentId, item.courseName, value)}
//         />
//         <TouchableOpacity
//           style={styles.editButton}
//           onPress={() => handleEditGrade(item.studentId, item.courseName)}
//         >
//           <Text style={styles.editButtonText}>{item.degree === '0' ? 'Add' : 'Edit'}</Text>
//         </TouchableOpacity>
//       </View>
//     </View>
//   );

//   if (loading) {
//     return (
//       <View style={styles.loadingContainer}>
//         <ActivityIndicator size="large" color="#0000ff" />
//         <Text>Loading data...</Text>
//       </View>
//     );
//   }

//   return (
//     <View style={styles.container}>
//       <View style={styles.pickerContainer}>
//         <Text style={styles.pickerLabel}>Select The Field</Text>
//         <Picker
//           selectedValue={selectedField}
//           onValueChange={(itemValue) => setSelectedField(itemValue)}
//           style={styles.picker}
//         >
//           <Picker.Item label="Choose a field" value="" />
//           {uniqueFieldsArray.map((field, index) => (
//             <Picker.Item key={index} label={field} value={field} />
//           ))}
//         </Picker>
//       </View>
//       <FlatList
//         data={selectedField ? courseData.filter((course) => course.field === selectedField) : courseData}
//         renderItem={renderItem}
//         keyExtractor={(item, index) => `${item.studentId}-${item.courseName}-${index}`}
//         ListHeaderComponent={renderHeader}
//         stickyHeaderIndices={[0]}
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 10,
//     backgroundColor: '#fff',
//   },
//   pickerContainer: {
//     marginBottom: 20,
//   },
//   pickerLabel: {
//     fontSize: 16,
//     marginBottom: 5,
//   },
//   picker: {
//     height: 50,
//     backgroundColor: '#f0f0f0',
//   },
//   headerRow: {
//     flexDirection: 'row',
//     backgroundColor: '#f0f0f0',
//     padding: 10,
//   },
//   headerCell: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   headerText: {
//     fontWeight: 'bold',
//     fontSize: 12,
//   },
//   row: {
//     flexDirection: 'row',
//     borderBottomWidth: 1,
//     borderBottomColor: '#ccc',
//     padding: 10,
//   },
//   cell: {
//     flex: 1,
//     fontSize: 12,
//     textAlign: 'center',
//   },
//   gradeInputContainer: {
//     flex: 1,
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//   },
//   gradeInput: {
//     flex: 1,
//     borderWidth: 1,
//     borderColor: '#ccc',
//     padding: 5,
//     fontSize: 12,
//   },
//   editButton: {
//     backgroundColor: '#4A90E2',
//     padding: 5,
//     borderRadius: 5,
//     marginLeft: 5,
//   },
//   editButtonText: {
//     color: 'white',
//     fontSize: 12,
//   },
//   loadingContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
// });

// export default Table;