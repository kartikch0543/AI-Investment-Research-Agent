import { createContext, useContext, useEffect, useMemo, useState } from "react";

import {
  logoutUser,
  registerWithEmail,
  sendPasswordReset,
  signInWithEmail,
  signInWithGoogle,
  subscribeToAuthChanges,
  updateFirebaseProfile
} from "../services/authService";
import { getUserProfile, syncUserProfile, updateUserProfile } from "../services/userService";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [databaseProfile, setDatabaseProfile] = useState(null);
  const [authLoading, setAuthLoading] = useState(true);
  const [profileLoading, setProfileLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = subscribeToAuthChanges((nextUser) => {
      setUser(nextUser);
      if (!nextUser) {
        setDatabaseProfile(null);
        setAuthLoading(false);
        return;
      }

      syncUserProfile(nextUser)
        .then((profile) => {
          setDatabaseProfile(profile);
        })
        .catch(() => {
          return getUserProfile(nextUser.uid)
            .then((profile) => {
              setDatabaseProfile(profile);
            })
            .catch(() => {
              setDatabaseProfile(null);
            });
        })
        .finally(() => {
          setAuthLoading(false);
        });
    });

    return unsubscribe;
  }, []);

  async function loginWithGoogle() {
    return signInWithGoogle();
  }

  async function loginWithEmailPassword(email, password) {
    return signInWithEmail(email, password);
  }

  async function signupWithEmailPassword({ email, password, displayName, username, contactNumber }) {
    const createdUser = await registerWithEmail(email, password);

    await updateFirebaseProfile({
      displayName,
      photoUrl: ""
    });

    const syncedProfile = await syncUserProfile({
      uid: createdUser.uid,
      email: createdUser.email,
      displayName,
      username,
      contactNumber,
      photoURL: "",
      providerData: createdUser.providerData
    });

    setDatabaseProfile(syncedProfile);

    return createdUser;
  }

  async function requestPasswordReset(email) {
    return sendPasswordReset(email);
  }

  async function saveProfileChanges({ displayName, username, contactNumber, photoUrl }) {
    if (!user) {
      throw new Error("No authenticated user is available.");
    }

    setProfileLoading(true);

    try {
      await updateFirebaseProfile({ displayName, photoUrl });
      const profile = await updateUserProfile({
        firebaseUid: user.uid,
        displayName,
        username,
        contactNumber,
        photoUrl
      });

      setUser({ ...user, displayName, photoURL: photoUrl || null });
      setDatabaseProfile(profile);

      return profile;
    } finally {
      setProfileLoading(false);
    }
  }

  async function logout() {
    await logoutUser();
  }

  const value = useMemo(
    () => ({
      user,
      databaseProfile,
      isAuthenticated: Boolean(user),
      authLoading,
      profileLoading,
      loginWithGoogle,
      loginWithEmailPassword,
      signupWithEmailPassword,
      requestPasswordReset,
      saveProfileChanges,
      logout
    }),
    [user, databaseProfile, authLoading, profileLoading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const contextValue = useContext(AuthContext);

  if (!contextValue) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return contextValue;
}
