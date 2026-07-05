import { apiClient } from "./api";

export async function runResearchRequest(companyName, firebaseUid) {
  const response = await apiClient.post("/research", { companyName, firebaseUid });
  return response.data.data;
}

export async function getResearchHistoryRequest(firebaseUid) {
  const response = await apiClient.get("/research/history", {
    params: {
      firebaseUid
    }
  });

  return response.data.data;
}
