// File: /rootdir/app/auth/signup.tsx
import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Image,
  Pressable,
} from 'react-native';
import { useRouter } from 'expo-router';
import { signUp } from '../../authUtils';

export default function SignUpScreen() {
  const router = useRouter();
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setMessage("Passwords don't match.");
      return;
    }
    const response = await signUp(email, password, fullName);
    setMessage(response);
    if (response === 'Sign-up successful!') {
      router.replace('/(tabs)/HomeScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backArrow}>
        <Text style={{ fontSize: 28, color: '#A0BFA0' }}>{'<'}</Text>
      </Pressable>

      <Text style={styles.title}>Register now!</Text>

      <TextInput style={styles.input} placeholder="Full Name" placeholderTextColor="#fff" value={fullName} onChangeText={setFullName} />
      <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor="#fff" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Create your password" placeholderTextColor="#fff" secureTextEntry value={password} onChangeText={setPassword} />
      <TextInput style={styles.input} placeholder="Create your password" placeholderTextColor="#fff" secureTextEntry value={confirmPassword} onChangeText={setConfirmPassword} />

      <TouchableOpacity style={styles.registerBtn} onPress={handleSignUp}>
        <Text style={styles.registerText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleBtn}>
        <Text style={styles.googleText}>Or, register in with  👤</Text>
      </TouchableOpacity>

      <Text style={styles.loginLink}>
        Already have an account?{' '}
        <Text style={{ fontWeight: 'bold' }} onPress={() => router.push('/auth/login')}>
          Login now!
        </Text>
      </Text>

      <Image
        source={require('@/assets/images/post-op-register.png')}
        style={styles.footerImage}
        resizeMode="contain"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 32,
    paddingTop: 60,
    backgroundColor: '#fff',
  },
  backArrow: {
    position: 'absolute',
    top: 50,
    left: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#A0BFA0',
    textAlign: 'center',
    marginBottom: 32,
  },
  input: {
    backgroundColor: '#A0BFA0',
    color: '#fff',
    borderRadius: 12,
    paddingVertical: 14,
    paddingHorizontal: 18,
    fontSize: 16,
    marginBottom: 16,
  },
  registerBtn: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  registerText: {
    fontWeight: 'bold',
    color: '#A0BFA0',
    fontSize: 16,
  },
  googleBtn: {
    backgroundColor: '#A0BFA0',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  googleText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  loginLink: {
    textAlign: 'center',
    color: '#7E9E7E',
    marginBottom: 20,
    fontSize: 14,
  },
  footerImage: {
    height: 150,
    width: '100%',
    alignSelf: 'center',
  },
});
