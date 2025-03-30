// LoginScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { signIn, signUp } from '../authUtils';
import { useRouter } from 'expo-router';

function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    const response = await signUp(email, password);
    setMessage(response);
  };

  const handleSignIn = async () => {
    const response = await signIn(email, password);
    setMessage(response);
  };

  return (
    <View>
      <TextInput placeholder="Email" value={email} onChangeText={setEmail} />
      <TextInput placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Forgot Password?" onPress={() => router.push('/forgot-password')} />
      {message && <Text>{message}</Text>}
    </View>
  );
}

export default LoginScreen;  // <-- Add default export
