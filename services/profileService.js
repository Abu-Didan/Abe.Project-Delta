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

/* ─────────────── hours (collection) ─────────────── */

const hoursLoggedCol = () => collection(db, 'users', uid(), 'hoursLogged');

export const listHoursLogged = () =>
  query(hoursLoggedCol(), orderBy('createdAt', 'desc'));

export const addHourLog = (data) =>
  addDoc(hoursLoggedCol(), { ...data, createdAt: serverTimestamp() });

export const getHoursLog = (logId) =>
  getDoc(doc(db, 'users', uid(), 'hoursLogged', logId));

export const updateHourLog = (logId, data) =>
  setDoc(
    doc(db, 'users', uid(), 'hoursLogged', logId),
    { ...data, updatedAt: serverTimestamp() },
    { merge: true }
  );

/* ─────────────── payments (collection) ─────────────── */

const paymentsLoggedCol = () => collection(db, 'users', uid(), 'paymentsLogged');

export const listPaymentsLogged = () =>
    query(paymentsLoggedCol(), orderBy('createdAt', 'desc'));

export const addPaymentLog = (data) =>
    addDoc(paymentsLoggedCol(), { ...data, createdAt: serverTimestamp() });

export const getPaymentsLog = (payId) =>
  getDoc(doc(db, 'users', uid(), 'paymentsLogged', payId));

export const updatePaymentLog = (payId, data) =>
  setDoc(
    doc(db, 'users', uid(), 'paymentsLogged', logId),
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
