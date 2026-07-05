import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile
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

export async function signInWithEmail(email, password) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Please check client/.env.");
  }

  const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
  return result.user;
}

export async function registerWithEmail(email, password) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Please check client/.env.");
  }

  const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  return result.user;
}

export async function sendPasswordReset(email) {
  if (!isFirebaseConfigured) {
    throw new Error("Firebase is not configured. Please check client/.env.");
  }

  await sendPasswordResetEmail(firebaseAuth, email);
}

export async function updateFirebaseProfile({ displayName, photoUrl }) {
  if (!isFirebaseConfigured || !firebaseAuth.currentUser) {
    throw new Error("No authenticated Firebase user is available.");
  }

  await updateProfile(firebaseAuth.currentUser, {
    displayName,
    photoURL: photoUrl || null
  });

  return firebaseAuth.currentUser;
}

export async function logoutUser() {
  if (!isFirebaseConfigured) {
    return;
  }

  await signOut(firebaseAuth);
}
