import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, storage } from '../../firebase';
import {
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from 'firebase/storage';

const MessagesContext = createContext();

 const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  // image Firebase
  const fetchMessages = async () => {
    try {
      let imagesRef = ref(storage, 'images/messages/');
      let imageUrls = [];

      await listAll(imagesRef).then((response) =>
        response.items.forEach((item) =>
          getDownloadURL(item).then((url) => imageUrls.push(url))
        )
      );

      //fetch Firestore
      const querySnapshot = await getDocs(collection(db, 'messages'));
      let docs = [];
      querySnapshot.forEach((doc) => {
        docs.push({
          id: doc.id,
          data: doc.data(),
          image: imageUrls.find((url) => url.includes(doc.data().imgPath)),
        });
      });

      setMessages(docs);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching messages: ', error);
      setLoading(false);
    }
  };

  //add message
  const addMessage = async ({ name, email, subject, message }) => {
    try {
      const docRef = await addDoc(collection(db, 'messages'), {
        name,
        email,
        subject,
        message,
      });
      console.log('Document written with ID: ', docRef.id);
      fetchMessages(); 
    } catch (error) {
      console.error('Error adding message: ', error);
    }
  };

  // upadata message
  const updateMessage = async (id, { name, email, subject, message }) => {
    try {
      const oldDoc = doc(db, 'messages', id);
      await updateDoc(oldDoc, { name, email, subject, message });
      fetchMessages(); 
    } catch (error) {
      console.error('Error updating message: ', error);
    }
  };

  // Delete message
  const deleteMessage = async (id) => {
    try {
      await deleteDoc(doc(db, 'messages', id));
      fetchMessages(); 
    } catch (error) {
      console.error('Error deleting message: ', error);
    }
  };

 
  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <MessagesContext.Provider
      value={{
        messages,
        loading,
        addMessage,
        updateMessage,
        deleteMessage,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => useContext(MessagesContext);


export default MessagesProvider