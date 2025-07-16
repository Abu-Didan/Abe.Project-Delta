import { doc, setDoc, serverTimestamp } from 'firebase/firestore';
import { db } from './firebase';

/** Create or merge users/{uid}. Adds timing logs for debugging. */
export const ensureUserDoc = async (uid) => {
  if (!uid) return;

  console.log('⌛ ensuring users/' + uid);          // start marker
  const t0 = Date.now();

  await setDoc(
    doc(db, 'users', uid),
    { createdAt: serverTimestamp() },
    { merge: true }
  );

  console.log('✅ ensured users/' + uid, 'in', Date.now() - t0, 'ms'); // end marker
};
