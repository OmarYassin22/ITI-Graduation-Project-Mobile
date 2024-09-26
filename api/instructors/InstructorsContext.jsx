import React, { createContext, useContext, useState, useEffect } from "react";
import { db } from "../../firebase"; 
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

const InstructorsContext = createContext();

export const useInstructors = () => {
  return useContext(InstructorsContext);
};

const InstructorsProvider = ({ children }) => {
  const [instructors, setInstructors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // fetch
  useEffect(() => {
    const fetchInstructors = async () => {
      try {
        setLoading(true);
        const querySnapshot = await getDocs(collection(db, "instructors"));
        const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setInstructors(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    fetchInstructors();
  }, []);

  // add
  const addNewInstructor = async (newInstructor) => {
    try {
      const docRef = await addDoc(collection(db, "instructors"), newInstructor);
      setInstructors((prev) => [...prev, { id: docRef.id, ...newInstructor }]);
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  // update
  const updateInstructorById = async (id, updatedData) => {
    try {
      const instructorRef = doc(db, "instructors", id);
      await updateDoc(instructorRef, updatedData);
      setInstructors((prev) =>
        prev.map((instructor) =>
          instructor.id === id ? { ...instructor, ...updatedData } : instructor
        )
      );
    } catch (error) {
      setError(error);
      throw error;
    }
  };
  // delete
  const deleteInstructorById = async (id) => {
    try {
      await deleteDoc(doc(db, "instructors", id));
      setInstructors((prev) =>
        prev.filter((instructor) => instructor.id !== id)
      );
    } catch (error) {
      setError(error);
      throw error;
    }
  };

  const value = {
    instructors,
    loading,
    error,
    addNewInstructor,
    updateInstructorById,
    deleteInstructorById,
  };

  return (
    <InstructorsContext.Provider value={value}>
      {children}
    </InstructorsContext.Provider>
  );
};

export default InstructorsProvider;
