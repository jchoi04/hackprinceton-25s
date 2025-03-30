// ForgotPasswordScreen.tsx
import React, { useState } from 'react';
import { View, TextInput, Button, Text } from 'react-native';
import { sendPasswordReset } from '../../authUtils';

function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleResetPassword = async () => {
    const response = await sendPasswordReset(email);
    setMessage(response);
  };

  return (
    <View>
      <TextInput placeholder="Enter your email" value={email} onChangeText={setEmail} />
      <Button title="Reset Password" onPress={handleResetPassword} />
      {message && <Text>{message}</Text>}
    </View>
  );
}

export default ForgotPasswordScreen;  // <-- Add default export
