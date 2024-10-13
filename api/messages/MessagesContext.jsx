import React, { createContext, useContext, useEffect, useState } from 'react';
import { db, storage } from '../../firebase';
import {
  collection,
  getDocs,
  addDoc,
} from 'firebase/firestore';
import { ref, getDownloadURL, listAll } from 'firebase/storage';

const MessagesContext = createContext();

const MessagesProvider = ({ children }) => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      let imagesRef = ref(storage, 'images/messages/');
      let imageUrls = [];

      await listAll(imagesRef).then((response) =>
        response.items.forEach((item) =>
          getDownloadURL(item).then((url) => imageUrls.push(url))
        )
      );

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

  useEffect(() => {
    fetchMessages();
  }, []);

  return (
    <MessagesContext.Provider
      value={{
        messages,
        loading,
        addMessage, 
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
};

export const useMessages = () => useContext(MessagesContext);
export default MessagesProvider;
