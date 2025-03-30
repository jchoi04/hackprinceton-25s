// File: /rootdir/app/auth/index.tsx
import React from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import { Redirect } from 'expo-router';


export default function AuthLandingScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.textSection}>
        <Text style={styles.title}>Post-Op Info</Text>
        <Text style={styles.subtitle}>
          Bridging the gap between hospital care and at-home recovery with intelligent,
          patient-centered support.
        </Text>
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/login')}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => router.push('/auth/signup')}>
            <Text style={styles.buttonText}>Sign-up</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Image
        source={require('@/assets/images/post-op-characters.png')} // replace with actual path
        resizeMode="contain"
        style={styles.image}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    padding: 32,
    backgroundColor: '#A9C4AA',
  },
  textSection: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 16,
  },
  subtitle: {
    fontSize: 14,
    fontStyle: 'italic',
    color: '#fff',
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 24,
    paddingHorizontal: 10,
  },
  buttonContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  button: {
    backgroundColor: '#fff',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  buttonText: {
    fontWeight: 'bold',
    fontSize: 16,
    color: '#6B8E7F',
  },
  image: {
    height: 250,
    width: '100%',
    alignSelf: 'center',
    marginBottom: 20,
  },
});
