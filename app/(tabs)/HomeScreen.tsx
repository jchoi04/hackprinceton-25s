// File: /rootdir/app/(tabs)/HomeScreen.tsx
import React, { useEffect, useState } from 'react';
import { View, Text, Switch, TextInput, Button, StyleSheet } from 'react-native';
import * as SecureStore from 'expo-secure-store';
import { signIn, signUp, handleBiometricAuth } from '../../authUtils';
import { useRouter } from 'expo-router';
import { auth } from '../../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

export default function HomeScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberEmail, setRememberEmail] = useState(false);
  const [message, setMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadEmail = async () => {
      const savedEmail = await SecureStore.getItemAsync('savedEmail');
      if (savedEmail) {
        setEmail(savedEmail);
        setRememberEmail(true);
      }
    };
    loadEmail();

    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user && user.metadata.lastSignInTime) {
        const lastLogin = new Date(user.metadata.lastSignInTime);
        const now = new Date();
        const diffMinutes = (now.getTime() - lastLogin.getTime()) / 60000;
        if (diffMinutes < 30) {
          const result = await handleBiometricAuth();
          if (result === 'Biometric authentication successful!') {
            router.replace('/(tabs)/HomeScreen');
          }
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSignUp = async () => {
    const response = await signUp(email, password);
    if (rememberEmail) await SecureStore.setItemAsync('savedEmail', email);
    setMessage(response);
  };

  const handleSignIn = async () => {
    const response = await signIn(email, password);
    if (response === 'Sign-in successful!') {
      if (rememberEmail) await SecureStore.setItemAsync('savedEmail', email);
      else await SecureStore.deleteItemAsync('savedEmail');
      router.replace('/(tabs)/HomeScreen');
    }
    setMessage(response);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Welcome to Post-Op Info 👋</Text>
      <TextInput style={styles.input} placeholder="Email" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Password" value={password} onChangeText={setPassword} secureTextEntry />
      <View style={styles.switchRow}>
        <Switch value={rememberEmail} onValueChange={setRememberEmail} />
        <Text> Remember email</Text>
      </View>
      <Button title="Sign Up" onPress={handleSignUp} />
      <Button title="Sign In" onPress={handleSignIn} />
      <Button title="Forgot Password?" onPress={() => router.push('/auth/forgot-password')} />
      {message && <Text style={styles.message}>{message}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 24,
    textAlign: 'center',
  },
  input: {
    backgroundColor: '#eee',
    padding: 12,
    borderRadius: 8,
    marginBottom: 16,
  },
  switchRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  message: {
    textAlign: 'center',
    marginTop: 12,
    color: 'red',
  },
});
