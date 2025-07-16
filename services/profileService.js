// services/profileService.js
import {
  doc,
  setDoc,
  getDoc,
  collection,
  addDoc,
  query,
  orderBy,
  serverTimestamp,
} from 'firebase/firestore';
import { db, auth } from './firebase';

/* uid helper */
const uid = () => auth.currentUser?.uid;

/* ─────────────── businesses (collection) ─────────────── */

const businessesCol = () => collection(db, 'users', uid(), 'businesses');

export const listBusinesses = () =>
  query(businessesCol(), orderBy('createdAt', 'desc'));   // onSnapshot-friendly

export const addBusiness = (data) =>
  addDoc(businessesCol(), { ...data, createdAt: serverTimestamp() });

export const getBusiness = (bizId) =>
  getDoc(doc(db, 'users', uid(), 'businesses', bizId));

export const updateBusiness = (bizId, data) =>
  setDoc(
    doc(db, 'users', uid(), 'businesses', bizId),
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  );

/* ─────────────── single-doc branches ─────────────── */

const profileDoc      = () => doc(db, 'users', uid(), 'profile',      'info');
const planSettingsDoc = () => doc(db, 'users', uid(), 'planSettings', 'info');
const spouseDoc       = () => doc(db, 'users', uid(), 'spouse',       'info'); // optional

/* profile */
export const fetchProfile = () => getDoc(profileDoc());
export const saveProfile  = (d) => setDoc(profileDoc(), d, { merge: true });

/* plan settings */
export const fetchPlanSettings = () => getDoc(planSettingsDoc());
export const savePlanSettings  = (d) => setDoc(planSettingsDoc(), d, { merge: true });

/* spouse (if used) */
export const fetchSpouse = () => getDoc(spouseDoc());
export const saveSpouse  = (d) => setDoc(spouseDoc(), d, { merge: true });

/* ─────────────── plan documents (unchanged) ─────────────── */

export const addPlanDoc = (meta) =>
  addDoc(collection(db, 'users', uid(), 'planDocs'), {
    ...meta,
    createdAt: serverTimestamp(),
  });

export const planDocsRef = () => collection(db, 'users', uid(), 'planDocs');
