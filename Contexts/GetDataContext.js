
import { createContext } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebaseConfig";

export const GetData = createContext();

export const GetDataProvider = ({ children }) => {
  async function getAllCourses() {
    try {
      const querySnapshot = await getDocs(collection(db, "courses"));
      let data = [];
      querySnapshot.forEach((doc) => {
        data.push({
          id: doc.id,
          data: doc.data(),
          // Removed the image filtering for now
        });
      });
      return data;
    } catch (e) {
      console.error("Error fetching courses:", e);
      return [];
    }
  }

  return (
    <GetData.Provider value={getAllCourses}>
      {children}
    </GetData.Provider>
  );
};