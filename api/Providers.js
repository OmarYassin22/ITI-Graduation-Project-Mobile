import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { signInWithEmail } from '../firebase';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      await signInWithEmail({ email, password });
      console.log('User signed in successfully');
      // Redirect to the next screen or perform any action on success
    } catch (err) {
      setError(err.message);
    }
  };


}
