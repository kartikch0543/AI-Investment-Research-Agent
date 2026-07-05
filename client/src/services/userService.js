import { apiClient } from "./api";

export async function syncUserProfile(user) {
  const response = await apiClient.post("/users/sync", {
    firebaseUid: user.uid,
    email: user.email,
    displayName: user.displayName || "",
    username: user.username || "",
    contactNumber: user.contactNumber || "",
    photoUrl: user.photoURL || "",
    provider: user.providerData?.[0]?.providerId || "firebase"
  });

  return response.data.data;
}

export async function getUserProfile(firebaseUid) {
  const response = await apiClient.get("/users/me", {
    params: {
      firebaseUid
    }
  });

  return response.data.data;
}

export async function updateUserProfile(payload) {
  const response = await apiClient.patch("/users/me", payload);
  return response.data.data;
}
