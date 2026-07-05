const FIREBASE_AUTH_ERROR_MESSAGES = {
  "auth/operation-not-allowed":
    "This sign-in method is disabled in Firebase. Enable Email/Password in Firebase Console > Authentication > Sign-in method.",
  "auth/email-already-in-use":
    "An account with this email already exists. Try logging in instead.",
  "auth/invalid-email": "Please enter a valid email address.",
  "auth/weak-password": "Your password is too weak. Use at least 6 characters.",
  "auth/user-not-found": "No account was found for this email address.",
  "auth/wrong-password": "The password is incorrect.",
  "auth/invalid-credential": "Your email or password is incorrect.",
  "auth/popup-closed-by-user": "Google sign-in was cancelled before completion.",
  "auth/popup-blocked": "The browser blocked the Google sign-in popup. Please allow popups and try again."
};

export function getAuthErrorMessage(error, fallbackMessage) {
  if (!error) {
    return fallbackMessage;
  }

  if (error.code && FIREBASE_AUTH_ERROR_MESSAGES[error.code]) {
    return FIREBASE_AUTH_ERROR_MESSAGES[error.code];
  }

  return fallbackMessage;
}
