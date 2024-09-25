import React, { createContext, useContext, useState, useEffect } from "react";
import { collection, getDocs, addDoc, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { ref, listAll, getDownloadURL } from "firebase/storage";
import { db, storage } from "../../firebase";


const CourseContext = createContext();

 const CourseProvider = ({ children }) => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCourses = async () => {
      const courseData = await getCourses(); 
      setCourses(courseData);
      setLoading(false);
    };
    fetchCourses();
  }, []);

  // add  course
  const createCourse = async (courseData) => {
    const result = await addCourse(courseData);  //add Firestore
    if (result.success) {
      setCourses((prevCourses) => [...prevCourses, { id: result.id, ...courseData }]); 
    }
  };

  // delete course
  const removeCourse = async (id) => {
    const result = await deleteCourse(id);  //delete Firestore
    if (result.success) {
      setCourses((prevCourses) => prevCourses.filter((course) => course.id !== id));  
    }
  };

  // update courses
  const modifyCourse = async (id, updatedData) => {
    const result = await updateCourse(id, updatedData);  // update Firestore
    if (result.success) {
      setCourses((prevCourses) =>
        prevCourses.map((course) => (course.id === id ? { id, ...updatedData } : course))
      );  
    }
  };

  return (
    <CourseContext.Provider value={{ courses, loading, createCourse, removeCourse, modifyCourse }}>
      {children}
    </CourseContext.Provider>
  );
};


export const useCourses = () => useContext(CourseContext);


async function getCourses() {
  let imageUrls = [];
  let imagesRef = ref(storage, "images/courses/");

  await listAll(imagesRef).then((response) =>
    response.items.forEach((item) =>
      getDownloadURL(item).then((url) => imageUrls.push(url))
    )
  );

  const querySnapshot = await getDocs(collection(db, "courses"));
  let data = [];

  querySnapshot.forEach((doc) => {
    data.push({
      id: doc.id,
      ...doc.data(),
      image: imageUrls.find((url) => url.includes(doc.data().imgPath)),
    });
  });

  return data;
}

async function addCourse(courseData) {
  const { title, price, details, duration, instructor, imgPath, buyers, track } = courseData;
  try {
    const docRef = await addDoc(collection(db, "courses"), {
      title,
      price,
      details,
      duration,
      instructor,
      imgPath: imgPath != null ? imgPath : null,
      buyers,
      track,
    });
    return { success: true, id: docRef.id };
  } catch (error) {
    return { success: false, error };
  }
}

async function deleteCourse(id) {
  try {
    await deleteDoc(doc(db, "courses", id));
    return { success: true, message: `Course with ID ${id} deleted successfully` };
  } catch (error) {
    return { success: false, error };
  }
}

async function updateCourse(id, courseData) {
  try {
    const courseRef = doc(db, "courses", id);
    await updateDoc(courseRef, courseData);
    return { success: true, message: `Course with ID ${id} updated successfully` };
  } catch (error) {
    return { success: false, error };
  }
}
 export default CourseProvider