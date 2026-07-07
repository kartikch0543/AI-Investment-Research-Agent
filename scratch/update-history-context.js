const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'client', 'src', 'context', 'SearchHistoryContext.jsx');
let content = fs.readFileSync(targetPath, 'utf8');

// Insert deleteHistoryItem
const targetContent = `  function addHistoryItem(item) {`;
const replacementContent = `  function deleteHistoryItem(companyName, createdAt) {
    setHistoryItems((currentItems) => {
      const updated = currentItems.filter(
        (existing) =>
          !(existing.companyName === companyName && existing.createdAt === createdAt)
      );
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
      return updated;
    });
  }

  function addHistoryItem(item) {`;

if (content.includes(targetContent)) {
  content = content.replace(targetContent, replacementContent);
  
  // Also expose in Context Provider
  content = content.replace(
    `value={{\n        historyItems,\n        addHistoryItem\n      }}`,
    `value={{\n        historyItems,\n        addHistoryItem,\n        deleteHistoryItem\n      }}`
  );
  
  fs.writeFileSync(targetPath, content, 'utf8');
  console.log("Updated SearchHistoryContext.jsx with deleteHistoryItem successfully.");
} else {
  console.log("Could not find addHistoryItem target in SearchHistoryContext.jsx.");
}
