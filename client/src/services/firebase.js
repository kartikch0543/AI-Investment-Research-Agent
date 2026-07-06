import { initializeApp } from "firebase/app";
import { getAnalytics, isSupported } from "firebase/analytics";
import { getAuth, GoogleAuthProvider, setPersistence, browserLocalPersistence } from "firebase/auth";

const rawAuthDomain = import.meta.env.VITE_FIREBASE_AUTH_DOMAIN;
const projectId = import.meta.env.VITE_FIREBASE_PROJECT_ID || "alphalens-ai-3eb42";
const correctedAuthDomain = (!rawAuthDomain || rawAuthDomain.includes("vercel.app") || rawAuthDomain.includes("localhost") || !rawAuthDomain.includes("firebaseapp.com"))
  ? `${projectId}.firebaseapp.com`
  : rawAuthDomain;

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: correctedAuthDomain,
  projectId: projectId,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID,
  measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENT_ID
};

export const isFirebaseConfigured = [
  firebaseConfig.apiKey,
  firebaseConfig.authDomain,
  firebaseConfig.projectId,
  firebaseConfig.appId
].every(Boolean);

export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseAuth = getAuth(firebaseApp);
export const googleAuthProvider = new GoogleAuthProvider();

if (isFirebaseConfigured) {
  setPersistence(firebaseAuth, browserLocalPersistence).catch(() => {
    return null;
  });
}

export async function initializeFirebaseAnalytics() {
  const analyticsSupported = await isSupported();

  if (!analyticsSupported) {
    return null;
  }

  return getAnalytics(firebaseApp);
}
