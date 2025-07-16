// services/firebase.js
import { initializeApp, getApps } from 'firebase/app';
import {
  getAuth,
  initializeAuth,
  getReactNativePersistence,
} from 'firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {
  initializeFirestore,
  CACHE_SIZE_UNLIMITED,
} from 'firebase/firestore';

// ——————— Firebase config ———————
// (keep your existing .env or hard-coded keys here)
const firebaseConfig = {
  apiKey:             process.env.EXPO_PUBLIC_FB_API_KEY,
  authDomain:         process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
  projectId:          process.env.EXPO_PUBLIC_FB_PROJECT_ID,
  storageBucket:      process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
  messagingSenderId:  process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
  appId:              process.env.EXPO_PUBLIC_FB_APP_ID,
};

// ——————— Initialize (guard against hot-reload) ———————
const app = getApps().length ? getApps()[0] : initializeApp(firebaseConfig);

// Auth with React-Native persistence
export const auth = initializeAuth(app, {
  persistence: getReactNativePersistence(AsyncStorage),
});

// Firestore with long-polling fallback
export const db = initializeFirestore(app, {
  cacheSizeBytes: CACHE_SIZE_UNLIMITED,
  experimentalForceLongPolling: true, // <— key flag
  useFetchStreams: false,             // Expo iOS needs this
});