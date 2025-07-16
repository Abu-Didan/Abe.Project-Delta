// context/AuthContext.js
import React, { createContext, useState, useEffect } from 'react';
import { onAuthStateChanged, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { ensureUserDoc } from '../services/userService';
import LoadingScreen from '../screens/LoadingScreen';

/* ────────────────────────────── diagnostics ───────────────────────────── */
console.log('🎯 AuthContext file loaded'); // proves the correct file is bundled
/* ──────────────────────────────────────────────────────────────────────── */

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  /* diagnostic ↓ shows every render of the provider */
  console.log('📌 AuthProvider rendered');

  const [user, setUser]     = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (firebaseUser) => {
      console.log('🔥 auth user:', firebaseUser?.uid);
  
      if (firebaseUser) {
        ensureUserDoc(firebaseUser.uid)                  // ← no await
          .then(() =>
            console.log(`✅ users/${firebaseUser.uid} ensured`)
          )
          .catch((e) =>
            console.log('❌ ensureUserDoc failed:', e.message)
          );
      }
  
      setUser(firebaseUser);      // UI can render immediately
      setLoading(false);          // spinner gone even if write is slow
    });
  
    return unsub;
  }, []);
  const logout = () => signOut(auth);

  if (loading) {
    return <LoadingScreen />;   // splash while verifying / creating doc
  }

  return (
    <AuthContext.Provider value={{ user, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
