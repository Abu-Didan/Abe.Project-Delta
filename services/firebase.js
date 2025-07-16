// services/firebase.js
// -------------------------------------------------------------
// Centralised Firebase bootstrap for your Expo (managed) app.
// -------------------------------------------------------------
import { getApps, initializeApp } from 'firebase/app';
import {
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';                          // ✅ use core path, not /react-native
import { getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

// ⚠️ All values come from your .env file.
const firebaseConfig = {
  apiKey:            process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain:        process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
  projectId:         process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  storageBucket:     process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId:             process.env.EXPO_PUBLIC_FB_APP_ID,
};

// Re-use the app on hot-reload
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Auth with persistent session (AsyncStorage works on iOS & Android)
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore for user profiles, expenses, etc.
export const db = getFirestore(app);

// (Uncomment if you need Storage later)
// import { getStorage } from 'firebase/storage';
// export const storage = getStorage(app);
