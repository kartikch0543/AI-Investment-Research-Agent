const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'client', 'src', 'components', 'ChatbotDrawer.jsx');

if (fs.existsSync(targetPath)) {
  let content = fs.readFileSync(targetPath, 'utf8');

  // 1. Fix double-encoded bullet point character (A? or similar) in renderMarkdownLine
  const bulletTarget = `<span className="text-[var(--color-accent)] mt-0.5 shrink-0 font-bold">`;
  const bulletIdx = content.indexOf(bulletTarget);
  if (bulletIdx !== -1) {
    const endSpanIdx = content.indexOf("</span>", bulletIdx);
    const oldSpan = content.substring(bulletIdx, endSpanIdx + 7);
    const newSpan = `<span className="text-[var(--color-accent)] mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]"></span>`;
    content = content.replace(oldSpan, newSpan);
    console.log("Fixed bullet point bullet display.");
  } else {
    console.log("Could not find bullet dot span target.");
  }

  // 2. Replace suggestions block safely
  const suggestionsHeader = "function EmptyState({ onSend, researchContext }) {";
  const startIdx = content.indexOf(suggestionsHeader);
  if (startIdx !== -1) {
    const endSuggestionsIdx = content.indexOf("return (", startIdx);
    const oldSuggestionsBlock = content.substring(startIdx, endSuggestionsIdx);
    
    const newSuggestionsBlock = `function EmptyState({ onSend, researchContext }) {
  const company = researchContext?.companyName || "";

  const suggestions = company
    ? [
        { icon: "📊", label: \`Why was \${company} rated \${researchContext?.decision || "Invest"}?\`, query: \`Why was \${company} rated \${researchContext?.decision || "Invest"}? Explain the key drivers and agent scores.\` },
        { icon: "⚠️", label: "What are the biggest risks?", query: \`What are the biggest risk factors and challenges identified for \${company}?\` },
        { icon: "📈", label: "What drove the sentiment score?", query: \`Analyze the news and market sentiment data that drove the sentiment score for \${company}.\` }
      ]
    : [
        { icon: "🔍", label: "Explain PE Ratio", query: "Explain what the Price-to-Earnings (PE) Ratio is, its formula, and how investors interpret it." },
        { icon: "🛡️", label: "What is a competitive moat?", query: "What is a competitive moat in investing? Give me some key examples and why it matters." },
        { icon: "🤖", label: "How does TradeIntel evaluate stocks?", query: "How does the multi-agent AI pipeline analyze and rate stocks?" }
      ];

  `;
    content = content.replace(oldSuggestionsBlock, newSuggestionsBlock);
    console.log("Replaced suggested questions block.");
  } else {
    console.log("Could not find EmptyState function start.");
  }

  // 3. Update MessageContent renderer to handle Markdown tables
  const markdownRendererOld = `  // 3. Render as markdown
  const lines = content.split("\\n");
  let inCodeBlock = false;
  const elements = [];
  let codeLines = [];

  lines.forEach((line, i) => {
    if (line.startsWith("\`\`\`")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={\`code-\${i}\`} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-3 my-2 text-xs font-mono overflow-x-auto text-[var(--text-primary)]">
            {codeLines.join("\\n")}
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
    } else if (inCodeBlock) {
      codeLines.push(line);
    } else {
      elements.push(renderMarkdownLine(line, i));
    }
  });`;

  const markdownRendererNew = `  // 3. Render as markdown & parse tables
  const lines = content.split("\\n");
  let inCodeBlock = false;
  let inTable = false;
  const elements = [];
  let codeLines = [];
  let tableRows = [];

  lines.forEach((line, i) => {
    if (line.startsWith("\`\`\`")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={"code-" + i} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-3 my-2 text-xs font-mono overflow-x-auto text-[var(--text-primary)]">
            {codeLines.join("\\n")}
          </pre>
        );
        codeLines = [];
        inCodeBlock = false;
      } else {
        inCodeBlock = true;
      }
    } else if (inCodeBlock) {
      codeLines.push(line);
    } else if (line.trim().startsWith("|") && line.trim().endsWith("|")) {
      inTable = true;
      const cells = line.split("|").map(c => c.trim()).filter(c => c !== "");
      if (line.includes("---")) return;
      tableRows.push(cells);
    } else {
      if (inTable && tableRows.length > 0) {
        elements.push(
          <div key={"table-" + i} className="overflow-x-auto my-3 border border-[var(--border-color)] rounded-xl bg-[var(--bg-surface)]">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-[var(--bg-secondary)] border-b border-[var(--border-color)]">
                  {tableRows[0].map((header, idx) => (
                    <th key={idx} className="p-2.5 font-bold text-[var(--text-primary)]">{header}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tableRows.slice(1).map((row, rIdx) => (
                  <tr key={rIdx} className="border-b border-[var(--border-color)]/60 last:border-none">
                    {row.map((cell, cIdx) => (
                      <td key={cIdx} className="p-2.5 text-[var(--text-secondary)]">{cell}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        );
        tableRows = [];
        inTable = false;
      }
      elements.push(renderMarkdownLine(line, i));
    }
  });`;

  // Helper to normalize content for line endings
  const normalizeText = (str) => str.replace(/\\r\\n/g, '\\n').trim();

  let normalizedContent = normalizeText(content);
  let normalizedRendererOld = normalizeText(markdownRendererOld);
  let normalizedRendererNew = normalizeText(markdownRendererNew);

  if (normalizedContent.includes(normalizedRendererOld)) {
    normalizedContent = normalizedContent.replace(normalizedRendererOld, normalizedRendererNew);
    console.log("Replaced markdown parsing block successfully.");
  } else {
    console.log("Markdown parsing block exact match failed. Trying string match...");
    // Direct replacement of split lines to be safe
    content = content.replace(/\/\/ 3\. Render as markdown[\s\S]+?elements\.push\(renderMarkdownLine\(line, i\)\);\s*\}\s*\}\);\s*\}/, markdownRendererNew);
  }

  // Save back to file
  fs.writeFileSync(targetPath, normalizedContent, 'utf8');
  console.log("Saved ChatbotDrawer.jsx successfully.");
} else {
  console.log("ChatbotDrawer.jsx not found.");
}
