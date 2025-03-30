import * as LocalAuthentication from 'expo-local-authentication';
import {
  auth,
  db,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from './firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import * as Google from 'expo-auth-session/providers/google';
import * as WebBrowser from 'expo-web-browser';
import { GoogleAuthProvider, signInWithCredential } from 'firebase/auth';

WebBrowser.maybeCompleteAuthSession();

// ✅ Email/Password Sign-up
export const signUp = async (email, password, fullName = '') => {
  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    // Save to Firestore
    await setDoc(doc(db, 'users', user.uid), {
      uid: user.uid,
      email: user.email,
      displayName: fullName,
      provider: 'email',
    });

    return 'Sign-up successful!';
  } catch (error) {
    return error instanceof Error ? error.message : 'Sign-up failed.';
  }
};

// ✅ Email/Password Sign-in
export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return 'Sign-in successful!';
  } catch (error) {
    return error instanceof Error ? error.message : 'Sign-in failed.';
  }
};

// ✅ Biometric Auth
export const handleBiometricAuth = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) {
    return 'Biometric authentication is not available.';
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate',
    fallbackLabel: 'Use Password',
  });

  return result.success
    ? 'Biometric authentication successful!'
    : 'Biometric authentication failed.';
};

// ✅ Password Reset
export const sendPasswordReset = async (email) => {
  try {
    await sendPasswordResetEmail(auth, email);
    return 'Password reset email sent!';
  } catch (error) {
    return error instanceof Error ? error.message : 'Reset failed.';
  }
};

// ✅ Google Sign-In
export const googleSignIn = async () => {
  try {
    const redirectUri = Google.makeRedirectUri({ useProxy: true });

    const result = await Google.startAsync({
      authUrl: `https://accounts.google.com/o/oauth2/v2/auth?client_id=5447406343-ijhm339kcmia28bs527oibvmm8e02hos.apps.googleusercontent.com&redirect_uri=${encodeURIComponent(
        redirectUri
      )}&response_type=token&scope=profile email`,
    });

    if (result.type === 'success' && result.params.access_token) {
      const credential = GoogleAuthProvider.credential(null, result.params.access_token);
      const userCred = await signInWithCredential(auth, credential);
      const user = userCred.user;

      // Save to Firestore
      await setDoc(doc(db, 'users', user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || '',
        provider: 'google',
      });

      return 'Signed in with Google!';
    }

    return 'Google sign-in cancelled.';
  } catch (err) {
    return err instanceof Error ? err.message : 'Google sign-in failed.';
  }
};
