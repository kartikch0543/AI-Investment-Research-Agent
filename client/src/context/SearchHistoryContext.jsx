import { createContext, useContext, useEffect, useState } from "react";
import { useAuth } from "./AuthContext";
import { getResearchHistoryRequest } from "../services/researchService";

const SearchHistoryContext = createContext(null);
const STORAGE_KEY = "alphalens-search-history";

export function SearchHistoryProvider({ children }) {
  const [historyItems, setHistoryItems] = useState([]);
  const { user } = useAuth();

  useEffect(() => {
    async function loadHistory() {
      if (user?.uid) {
        try {
          const dbItems = await getResearchHistoryRequest(user.uid);
          if (dbItems && Array.isArray(dbItems)) {
            const formatted = dbItems.map((item) => ({
              companyName: item.companyName,
              decision: item.decision,
              overallScore: item.overallScore,
              confidence: item.confidence,
              createdAt: item.createdAt
            }));
            setHistoryItems(formatted);
            return;
          }
        } catch (error) {
          console.warn("Could not load research history from database, falling back to localStorage:", error);
        }
      }

      const savedValue = window.localStorage.getItem(STORAGE_KEY);
      if (savedValue) {
        setHistoryItems(JSON.parse(savedValue));
      } else {
        setHistoryItems([]);
      }
    }

    loadHistory();
  }, [user]);

  useEffect(() => {
    if (historyItems.length > 0) {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(historyItems));
    }
  }, [historyItems]);

  function addHistoryItem(item) {
    setHistoryItems((currentItems) => {
      const exists = currentItems.some(
        (existing) =>
          existing.companyName === item.companyName &&
          Math.abs(new Date(existing.createdAt) - new Date(item.createdAt)) < 5000
      );
      if (exists) return currentItems;
      return [item, ...currentItems].slice(0, 10);
    });
  }

  return (
    <SearchHistoryContext.Provider
      value={{
        historyItems,
        addHistoryItem
      }}
    >
      {children}
    </SearchHistoryContext.Provider>
  );
}

export function useSearchHistory() {
  const contextValue = useContext(SearchHistoryContext);

  if (!contextValue) {
    throw new Error("useSearchHistory must be used within SearchHistoryProvider");
  }

  return contextValue;
}
