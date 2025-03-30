import * as LocalAuthentication from "expo-local-authentication";
import { auth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "./firebaseConfig";
import { sendPasswordResetEmail } from "firebase/auth";

// Email/Password Sign-up
export const signUp = async (email, password) => {
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    return "Sign-up successful!";
  } catch (error) {
    return error.message;
  }
};

// Email/Password Sign-in
export const signIn = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
    return "Sign-in successful!";
  } catch (error) {
    return error.message;
  }
};

// Biometric Authentication (Face ID for iOS, Touch ID for Android)
export const handleBiometricAuth = async () => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) {
    return "Biometric authentication is not available.";
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: "Authenticate",
    fallbackLabel: "Use Password",
  });

  return result.success ? "Biometric authentication successful!" : "Biometric authentication failed.";
};

// Password Reset
export const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      return "Password reset email sent!";
    } catch (error) {
      return error.message;
    }
  };
  