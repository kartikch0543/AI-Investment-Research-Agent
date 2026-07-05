import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";

import App from "./App";
import { SearchHistoryProvider } from "./context/SearchHistoryContext";
import { ThemeProvider } from "./context/ThemeContext";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <SearchHistoryProvider>
          <App />
        </SearchHistoryProvider>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>
);
