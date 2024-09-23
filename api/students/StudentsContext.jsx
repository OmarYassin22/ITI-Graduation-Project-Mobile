import React, { createContext, useContext, useState, useEffect } from "react";
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { db } from "../../firebase"; 

const StudentsContext = createContext();


export const useStudents = () => {
  return useContext(StudentsContext);
};


 const StudentsProvider = ({ children }) => {
  const [students, setStudents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch data
  useEffect(() => {
    const fetchStudents = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "students"));
        let docs = [];
        querySnapshot.forEach((doc) => {
          docs.push({
            id: doc.id,
            data: doc.data(),
          });
        });
        setStudents(docs);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchStudents();
  }, []);

  // add student
  const addStudent = async (newStudent) => {
    try {
      const docRef = await addDoc(collection(db, "students"), newStudent);
      setStudents((prev) => [...prev, { id: docRef.id, data: newStudent }]);
      return docRef;
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  //updata student
  const updateStudentById = async (id, updatedData) => {
    try {
      const oldDoc = doc(db, "students", id);
      await updateDoc(oldDoc, updatedData);
      setStudents((prev) =>
        prev.map((student) =>
          student.id === id ? { id, data: { ...student.data, ...updatedData } } : student
        )
      );
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  // delete student
  const deleteStudentById = async (id) => {
    try {
      await deleteDoc(doc(db, "students", id));
      setStudents((prev) => prev.filter((student) => student.id !== id));
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const value = {
    students,
    loading,
    error,
    addStudent,
    updateStudentById,
    deleteStudentById,
  };

  return (
    <StudentsContext.Provider value={value}>
      {children}
    </StudentsContext.Provider>
  );
};

export default StudentsProvider;
