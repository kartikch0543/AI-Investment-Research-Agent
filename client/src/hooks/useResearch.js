import { useState, useEffect } from "react";

import { runResearchRequest } from "../services/researchService";
import { useAuth } from "../context/AuthContext";
import { useSearchHistory } from "../context/SearchHistoryContext";

const researchStages = [
  "Collecting Market Intelligence",
  "Analyzing Business Fundamentals",
  "Evaluating Financial Performance",
  "Analyzing Market Sentiment",
  "Assessing Business Risks",
  "Reviewing Competitive Advantage",
  "Generating Investment Recommendation"
];

export function useResearch() {
  const [companyName, setCompanyName] = useState("");
  const [result, setResult] = useState(() => {
    const saved = sessionStorage.getItem("active-research-result");
    return saved ? JSON.parse(saved) : null;
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [activeStage, setActiveStage] = useState(-1);

  useEffect(() => {
    const handleChanged = (e) => {
      setResult(e.detail);
      if (e.detail && e.detail.companyName) {
        setCompanyName(e.detail.companyName);
      }
    };
    window.addEventListener("active-research-changed", handleChanged);
    return () => window.removeEventListener("active-research-changed", handleChanged);
  }, []);

  const { addHistoryItem } = useSearchHistory();
  const { user } = useAuth();

  function handleCompanyNameChange(event) {
    setCompanyName(event.target.value);
  }

  async function submitResearch(event) {
    event.preventDefault();

    if (!companyName.trim()) {
      setError("Please enter a company name.");
      return;
    }

    let timelineTimer = null;

    try {
      setLoading(true);
      setError("");
      setActiveStage(0);

      timelineTimer = setInterval(() => {
        setActiveStage((currentStage) => {
          if (currentStage >= researchStages.length - 1) {
            return currentStage;
          }

          return currentStage + 1;
        });
      }, 600);

      const response = await runResearchRequest(companyName.trim(), user?.uid);
      if (timelineTimer) {
        clearInterval(timelineTimer);
        timelineTimer = null;
      }
      setActiveStage(researchStages.length - 1);
      setResult(response);
      sessionStorage.setItem("active-research-result", JSON.stringify(response));
      window.dispatchEvent(new CustomEvent("active-research-changed", { detail: response }));
      addHistoryItem({
        companyName: response.companyName,
        decision: response.decision,
        overallScore: response.overallScore,
        confidence: response.confidence,
        createdAt: new Date().toISOString(),
        jsonReport: response
      });
    } catch (requestError) {
      setError(
        requestError.response?.data?.error?.message ||
          "The research request failed. Check the backend server and try again."
      );
      setActiveStage(-1);
    } finally {
      if (timelineTimer) {
        clearInterval(timelineTimer);
      }
      setLoading(false);
    }
  }

  return {
    companyName,
    result,
    loading,
    error,
    activeStage,
    researchStages,
    handleCompanyNameChange,
    submitResearch
  };
}
