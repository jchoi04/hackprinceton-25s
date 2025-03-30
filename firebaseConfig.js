// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyD9dp6g3lNL2V9bZdCsMXpQwEKSZM11oMg",
    authDomain: "post-opinfo.firebaseapp.com",
    projectId: "post-opinfo",
    storageBucket: "post-opinfo.firebasestorage.app",
    messagingSenderId: "5447406343",
    appId: "1:5447406343:web:8f260c91707a9fdbf72ba2",
    measurementId: "G-T937ZDF3CF"
  };


//Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = getAuth(app);
const db = getFirestore(app);

// Export Firebase services
export { auth, db, createUserWithEmailAndPassword, signInWithEmailAndPassword, sendPasswordResetEmail };