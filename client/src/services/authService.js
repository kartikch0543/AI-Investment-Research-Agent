import {
  onAuthStateChanged,
  signInWithPopup,
  signOut
} from "firebase/auth";

import { firebaseAuth, googleAuthProvider, isFirebaseConfigured } from "./firebase";

export function subscribeToAuthChanges(callback) {
  if (!isFirebaseConfigured) {
    callback(null);
    return () => {};
  }

  return onAuthStateChanged(firebaseAuth, callback);
}

export async function signInWithGoogle() {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Please check client/.env.");
  }

  const result = await signInWithPopup(firebaseAuth, googleAuthProvider);
  return result.user;
}

export async function logoutUser() {
  if (!isFirebaseConfigured) {
    return;
  }

  await signOut(firebaseAuth);
}
