const fs = require('fs');
const path = require('path');

const contextPath = path.join(__dirname, '..', 'client', 'src', 'context', 'SearchHistoryContext.jsx');
const hookPath = path.join(__dirname, '..', 'client', 'src', 'hooks', 'useResearch.js');

// 1. Update SearchHistoryContext.jsx
if (fs.existsSync(contextPath)) {
  let content = fs.readFileSync(contextPath, 'utf8');
  
  // Format items to keep jsonReport
  const oldFormatting = `            const formatted = dbItems.map((item) => ({
              companyName: item.companyName,
              decision: item.decision,
              overallScore: item.overallScore,
              confidence: item.confidence,
              createdAt: item.createdAt
            }));`;
            
  const newFormatting = `            const formatted = dbItems.map((item) => ({
              companyName: item.companyName,
              decision: item.decision,
              overallScore: item.overallScore,
              confidence: item.confidence,
              createdAt: item.createdAt,
              jsonReport: item.jsonReport
            }));`;
            
  if (content.includes(oldFormatting)) {
    content = content.replace(oldFormatting, newFormatting);
    console.log("Updated history mapping in SearchHistoryContext.jsx.");
  } else {
    // Try fuzzy matches or regex
    const regex = /dbItems\.map\(\(item\)\s*=>\s*\{\s*return\s*\{\s*companyName:[^}]+\}\)/g;
    console.log("Direct match not found for mapping. Replacing using targeted replacements.");
    content = content.replace(/companyName:\s*item\.companyName,/g, 'companyName: item.companyName,\n              jsonReport: item.jsonReport || item,');
  }
  
  fs.writeFileSync(contextPath, content, 'utf8');
}

// 2. Update useResearch.js
if (fs.existsSync(hookPath)) {
  let content = fs.readFileSync(hookPath, 'utf8');
  
  const oldAddCall = `      addHistoryItem({
        companyName: response.companyName,
        decision: response.decision,
        overallScore: response.overallScore,
        confidence: response.confidence,
        createdAt: new Date().toISOString()
      });`;
      
  const newAddCall = `      addHistoryItem({
        companyName: response.companyName,
        decision: response.decision,
        overallScore: response.overallScore,
        confidence: response.confidence,
        createdAt: new Date().toISOString(),
        jsonReport: response
      });`;
      
  if (content.includes(oldAddCall)) {
    content = content.replace(oldAddCall, newAddCall);
    console.log("Updated addHistoryItem call in useResearch.js.");
  } else {
    // Fuzzy matching
    content = content.replace(/companyName:\s*response\.companyName,/g, 'companyName: response.companyName,\n        jsonReport: response,');
    console.log("Updated addHistoryItem call via fallback regex in useResearch.js.");
  }
  
  fs.writeFileSync(hookPath, content, 'utf8');
}
