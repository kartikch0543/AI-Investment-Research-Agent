const fs = require('fs');
const path = require('path');

const hookPath = path.join(__dirname, '..', 'client', 'src', 'hooks', 'useResearch.js');

if (fs.existsSync(hookPath)) {
  let content = fs.readFileSync(hookPath, 'utf8');

  // Replace useState(null) for result
  const oldResultState = `  const [result, setResult] = useState(null);`;
  const newResultState = `  const [result, setResult] = useState(() => {
    const saved = sessionStorage.getItem("active-research-result");
    return saved ? JSON.parse(saved) : null;
  });`;

  if (content.includes(oldResultState)) {
    content = content.replace(oldResultState, newResultState);
  }

  // Add useEffect to handle dynamic updates
  const importsText = `import { useState } from "react";`;
  const newImports = `import { useState, useEffect } from "react";`;

  if (content.includes(importsText)) {
    content = content.replace(importsText, newImports);
  }

  // Insert useEffect inside the useResearch function
  const targetInsertion = `  const { addHistoryItem } = useSearchHistory();`;
  const effectInsertion = `  useEffect(() => {
    const handleChanged = (e) => {
      setResult(e.detail);
      if (e.detail && e.detail.companyName) {
        setCompanyName(e.detail.companyName);
      }
    };
    window.addEventListener("active-research-changed", handleChanged);
    return () => window.removeEventListener("active-research-changed", handleChanged);
  }, []);

  const { addHistoryItem } = useSearchHistory();`;

  if (content.includes(targetInsertion)) {
    content = content.replace(targetInsertion, effectInsertion);
  }

  fs.writeFileSync(hookPath, content, 'utf8');
  console.log("Updated useResearch.js with session sync and event listener.");
} else {
  console.log("useResearch.js not found.");
}
