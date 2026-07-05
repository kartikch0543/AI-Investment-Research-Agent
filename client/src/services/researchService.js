import { apiClient } from "./api";

export async function runResearchRequest(companyName) {
  const response = await apiClient.post("/research", { companyName });
  return response.data.data;
}
