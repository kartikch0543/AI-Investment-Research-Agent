import { createContext, useContext, useEffect, useState } from "react";

const SearchHistoryContext = createContext(null);
const STORAGE_KEY = "alphalens-search-history";

export function SearchHistoryProvider({ children }) {
  const [historyItems, setHistoryItems] = useState([]);

  useEffect(() => {
    const savedValue = window.localStorage.getItem(STORAGE_KEY);

    if (savedValue) {
      setHistoryItems(JSON.parse(savedValue));
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(historyItems));
  }, [historyItems]);

  function addHistoryItem(item) {
    setHistoryItems((currentItems) => [item, ...currentItems].slice(0, 10));
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
