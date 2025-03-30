import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { auth } from '../../firebaseConfig';
import { confirmPasswordReset } from 'firebase/auth';

export default function ResetPasswordScreen() {
  const params = useLocalSearchParams();
  const router = useRouter();

  const oobCode = params.oobCode;
  const [code, setCode] = useState(typeof oobCode === 'string' ? oobCode : '');  
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    if (!code || !newPassword || !confirmPassword) {
      setMessage('Please fill all fields.');
      return;
    }
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      await confirmPasswordReset(auth, code, newPassword);
      router.replace('/password-reset-success');
    } catch (error: unknown) {
      if (error instanceof Error) {
        setMessage(error.message);
      } else {
        setMessage('Unknown error occurred.');
      }
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Reset Password</Text>
      <TextInput
        style={styles.input}
        placeholder="Reset Code"
        value={code}
        onChangeText={setCode}
      />
      <TextInput
        style={styles.input}
        placeholder="New Password"
        value={newPassword}
        onChangeText={setNewPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Confirm Password"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />
      {message ? <Text style={styles.message}>{message}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleResetPassword}>
        <Text style={styles.buttonText}>Set New Password</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
  },
  button: {
    backgroundColor: '#007bff',
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  message: {
    color: 'red',
    textAlign: 'center',
    marginBottom: 16,
  },
});
