import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeUXPKzKQ-Ij8oMtzqI9C_cWUrbPo2GQE",
  authDomain: "grad-projcet.firebaseapp.com",
  projectId: "grad-projcet",
  storageBucket: "grad-projcet.appspot.com",
  messagingSenderId: "880621406110",
  appId: "1:880621406110:web:5be96f9fe4fcfb0a8af88f",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);


export { db, auth, storage };