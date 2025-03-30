// File: /rootdir/app/index.tsx
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '../firebaseConfig';
import { Redirect } from 'expo-router';

export default function Index() {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean | null>(null);

  useEffect(() => {
    return onAuthStateChanged(auth, (user) => {
      setIsLoggedIn(!!user);
    });
  }, []);

  if (isLoggedIn === null) return null;

  return isLoggedIn ? (
    <Redirect href="/(tabs)/HomeScreen" />
  ) : (
    <Redirect href="/auth" />
  );
}
