// File: /rootdir/app/auth/login.tsx
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
import { signIn } from '../../authUtils';
import { googleSignIn } from '../../authUtils';

export default function LoginScreen() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async () => {
    const response = await signIn(email, password);
    setMessage(response);
    if (response === 'Sign-in successful!') {
        router.replace('/(tabs)/HomeScreen');
    }
  };

  const handleGoogleSignIn = async () => {
    const msg = await googleSignIn();
    setMessage(msg);
    if (msg === 'Signed in with Google!') {
        router.replace('/(tabs)/HomeScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Pressable onPress={() => router.back()} style={styles.backArrow}>
        <Text style={{ fontSize: 28, color: '#A0BFA0' }}>{'<'}</Text>
      </Pressable>

      <Text style={styles.title}>Welcome back!</Text>

      <TextInput style={styles.input} placeholder="Enter your email" placeholderTextColor="#fff" value={email} onChangeText={setEmail} autoCapitalize="none" />
      <TextInput style={styles.input} placeholder="Enter your password" placeholderTextColor="#fff" value={password} onChangeText={setPassword} secureTextEntry />

      <Text style={styles.forgot} onPress={() => router.push('/auth/forgot-password')}>
        Forgot your password?
      </Text>

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>Login</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.googleBtn} onPress={handleGoogleSignIn}>
        <Text style={styles.googleText}>Or, log in with  👤</Text>
      </TouchableOpacity>

      <Text style={styles.registerLink}>
        Don’t have an account?{' '}
        <Text style={{ fontWeight: 'bold' }} onPress={() => router.push('/auth/signup')}>
          Register now!
        </Text>
      </Text>

      <Image
        source={require('@/assets/images/post-op-login.png')} // update with your file name
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
  forgot: {
    textAlign: 'right',
    color: '#7E9E7E',
    marginBottom: 24,
    fontSize: 14,
  },
  loginBtn: {
    backgroundColor: '#f2f2f2',
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 20,
  },
  loginText: {
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
  registerLink: {
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
