const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'client', 'src', 'components', 'ChatbotDrawer.jsx');

if (fs.existsSync(targetPath)) {
  let content = fs.readFileSync(targetPath, 'utf8');

  // Regex to capture the suggestions block
  const oldSuggestionsBlock = `  const suggestions = company
    ? [
        { icon: "dY"S", label: \`Why is \${company} rated \${researchContext?.decision || "this way"}?\`, query: \`Why is \${company} rated \${researchContext?.decision}? Explain the key factors.\` },
        { icon: "s,?", label: \`What are the main risks for \${company}?\`, query: \`What are the primary risk factors identified for \${company}?\` },
        { icon: "dY'", label: \`Summarize \${company}'s financial health\`, query: \`Give me a clear summary of \${company}'s financial health and key metrics.\` },
      ]
    : [
        { icon: "dY"?", label: "What is Price-to-Earnings (PE) Ratio?", query: "Explain the PE Ratio ?" definition, formula, and how to interpret it for stock analysis." },
        { icon: "dY?", label: "What is a competitive moat?", query: "What is a competitive moat in investing? Give me examples and why it matters." },
        { icon: "dY"?", label: "How does TradeIntel evaluate stocks?", query: "How does the TradeIntel multi-agent pipeline evaluate and score a company?" },
      ];`;

  const newSuggestionsBlock = `  const suggestions = company
    ? [
        { icon: "📊", label: \`Why was \${company} rated \${researchContext?.decision || "Invest"}?\`, query: \`Why was \${company} rated \${researchContext?.decision || "Invest"}? Explain the key drivers and agent scores.\` },
        { icon: "⚠️", label: "What are the biggest risks?", query: \`What are the biggest risk factors and challenges identified for \${company}?\` },
        { icon: "📉", label: "What drove the sentiment score?", query: \`Analyze the news and market sentiment data that drove the sentiment score for \${company}.\` },
      ]
    : [
        { icon: "🔍", label: "Explain PE Ratio", query: "Explain what the Price-to-Earnings (PE) Ratio is, its formula, and how investors interpret it." },
        { icon: "🛡️", label: "What is a competitive moat?", query: "What is a competitive moat in investing? Give me some key examples and why it matters." },
        { icon: "🤖", label: "How does TradeIntel evaluate stocks?", query: "How does the multi-agent AI pipeline analyze and rate stocks?" }
      ];`;

  // We do direct replacement or regex mapping
  if (content.includes("Why is ${company} rated")) {
    // If exact block doesn't match due to mojibake quotes, replace using key endpoints
    const regexPattern = /const suggestions = company[\s\S]+?\}\s*\]\s*;/;
    content = content.replace(regexPattern, newSuggestionsBlock);
    console.log("Replaced suggestions using regex in ChatbotDrawer.jsx.");
  } else if (content.includes("Why was Tata rated")) {
    console.log("Suggestions already match.");
  } else {
    // Try simple regex replace
    const regexPattern = /const suggestions = company[\s\S]+?\}\s*\]\s*;/;
    content = content.replace(regexPattern, newSuggestionsBlock);
    console.log("Suggestions replaced via general fallback regex.");
  }

  // Clean any remaining mojibake in ChatbotDrawer
  content = content.replace(/"\?/g, '—');
  content = content.replace(/\s*Built/g, '— Built');

  fs.writeFileSync(targetPath, content, 'utf8');
  console.log("Cleaned ChatbotDrawer.jsx successfully.");
} else {
  console.log("ChatbotDrawer.jsx not found.");
}
