import { useState } from "react";

import { runResearchRequest } from "../services/researchService";
import { useSearchHistory } from "../context/SearchHistoryContext";

export function useResearch() {
  const [companyName, setCompanyName] = useState("Microsoft");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const { addHistoryItem } = useSearchHistory();

  function handleCompanyNameChange(event) {
    setCompanyName(event.target.value);
  }

  async function submitResearch(event) {
    event.preventDefault();

    if (!companyName.trim()) {
      setError("Please enter a company name.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      const response = await runResearchRequest(companyName.trim());
      setResult(response);
      addHistoryItem({
        companyName: response.companyName,
        decision: response.decision,
        overallScore: response.overallScore,
        confidence: response.confidence,
        createdAt: new Date().toISOString()
      });
    } catch (requestError) {
      setError(
        requestError.response?.data?.error?.message ||
          "The research request failed. Check the backend server and try again."
      );
    } finally {
      setLoading(false);
    }
  }

  return {
    companyName,
    result,
    loading,
    error,
    handleCompanyNameChange,
    submitResearch
  };
}
