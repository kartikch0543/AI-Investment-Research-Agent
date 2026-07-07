const fs = require('fs');
const path = require('path');

const targetPath = path.join(__dirname, '..', 'client', 'src', 'components', 'ChatbotDrawer.jsx');

if (fs.existsSync(targetPath)) {
  let content = fs.readFileSync(targetPath, 'utf8');

  // Replace renderMarkdownLine with a more capable markdown & table parser
  const oldRenderLine = `function renderMarkdownLine(line, i) {
  // H3 ### heading
  if (line.startsWith("### ")) {
    return <h3 key={i} className="mt-3 mb-1 text-sm font-bold text-[var(--text-primary)]">{line.slice(4)}</h3>;
  }
  // H2 ## heading
  if (line.startsWith("## ")) {
    return <h2 key={i} className="mt-4 mb-1.5 text-sm font-bold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-1">{line.slice(3)}</h2>;
  }
  // H1 # heading
  if (line.startsWith("# ")) {
    return <h1 key={i} className="mt-4 mb-2 text-base font-bold text-[var(--text-primary)]">{line.slice(2)}</h1>;
  }
  // Horizontal rule
  if (line.trim() === "---" || line.trim() === "***") {
    return <hr key={i} className="my-3 border-[var(--border-color)]" />;
  }
  // Blank line
  if (!line.trim()) {
    return <div key={i} className="h-2" />;
  }
  // Bullet point
  if (line.startsWith("* ") || line.startsWith("- ") || line.match(/^\s+[*-] /)) {
    const content = line.replace(/^[\s]*[*-]\s/, "");
    return (
      <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] my-1">
        <span className="text-[var(--color-accent)] mt-0.5 shrink-0 font-bold">?</span>
        <span dangerouslySetInnerHTML={{ __html: applyInlineMarkdown(content) }} />
      </div>
    );
  }
  // Numbered list
  if (line.match(/^\d+\.\s/)) {
    const [num, ...rest] = line.split(". ");
    return (
      <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] my-1">
        <span className="text-[var(--color-accent)] font-bold shrink-0">{num}.</span>
        <span dangerouslySetInnerHTML={{ __html: applyInlineMarkdown(rest.join(". ")) }} />
      </div>
    );
  }
  // Regular paragraph
  return (
    <p key={i} className="text-sm leading-relaxed text-[var(--text-primary)] my-1">
      <span dangerouslySetInnerHTML={{ __html: applyInlineMarkdown(line) }} />
    </p>
  );
}`;

  const newRenderLine = `function renderMarkdownLine(line, i) {
  // H3 ### heading
  if (line.startsWith("### ")) {
    return <h3 key={i} className="mt-3 mb-1 text-sm font-extrabold text-[var(--text-primary)]">{line.slice(4)}</h3>;
  }
  // H2 ## heading
  if (line.startsWith("## ")) {
    return <h2 key={i} className="mt-4 mb-1.5 text-base font-extrabold text-[var(--text-primary)] border-b border-[var(--border-color)] pb-1">{line.slice(3)}</h2>;
  }
  // H1 # heading
  if (line.startsWith("# ")) {
    return <h1 key={i} className="mt-4 mb-2 text-lg font-extrabold text-[var(--text-primary)]">{line.slice(2)}</h1>;
  }
  // Horizontal rule
  if (line.trim() === "---" || line.trim() === "***") {
    return <hr key={i} className="my-3 border-[var(--border-color)]" />;
  }
  // Blank line
  if (!line.trim()) {
    return <div key={i} className="h-2" />;
  }
  // Bullet point
  if (line.startsWith("* ") || line.startsWith("- ") || line.match(/^\\s+[*-] /)) {
    const content = line.replace(/^[\\s]*[*-]\\s/, "");
    return (
      <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] my-1 pl-1">
        <span className="text-[var(--color-accent)] mt-1.5 shrink-0 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
        <span dangerouslySetInnerHTML={{ __html: applyInlineMarkdown(content) }} />
      </div>
    );
  }
  // Numbered list
  if (line.match(/^\\d+\\.\\s/)) {
    const [num, ...rest] = line.split(". ");
    return (
      <div key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] my-1 pl-1">
        <span className="text-[var(--color-accent)] font-bold shrink-0">{num}.</span>
        <span dangerouslySetInnerHTML={{ __html: applyInlineMarkdown(rest.join(". ")) }} />
      </div>
    );
  }
  // Regular paragraph
  return (
    <p key={i} className="text-xs leading-relaxed text-[var(--text-secondary)] my-1.5">
      <span dangerouslySetInnerHTML={{ __html: applyInlineMarkdown(line) }} />
    </p>
  );
}`;

  if (content.includes("H3 ### heading")) {
    content = content.replace(oldRenderLine, newRenderLine);
    console.log("Replaced renderMarkdownLine.");
  } else {
    // Try search for bullet point line replacement
    content = content.replace(/font-bold">.*?<\/span>/, 'font-bold">•</span>');
    console.log("Standardized bullet character.");
  }

  // Update inline markdown substitutions to fix double-encoded emojis
  const oldApplyInline = `function applyInlineMarkdown(text) {
  return text
    .replace(/\`\`\`([^\`]+)\`\`\`/g, '<code class="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-xs font-mono text-[var(--color-accent)] font-semibold border border-[var(--border-color)]">$1</code>')
    .replace(/\`([^\`]+)\`/g, '<code class="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-xs font-mono text-[var(--color-accent)] font-semibold border border-[var(--border-color)]">$1</code>')
    .replace(/\\*\\*([^*]+)\\*\\*/g, '<strong class="font-bold text-[var(--text-primary)]">$1</strong>')
    .replace(/\\*([^*]+)\\*/g, '<em class="italic text-[var(--text-secondary)]">$1</em>')
    .replace(/dYY/g, '<span class="text-emerald-500">dYY</span>')
    .replace(/dY"'/g, '<span class="text-rose-500">dY"\\'</span>')
    .replace(/dYY/g, '<span class="text-amber-500">dYY</span>');
}`;

  const newApplyInline = `function applyInlineMarkdown(text) {
  return text
    .replace(/\`\`\`([^\`]+)\`\`\`/g, '<code class="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-xs font-mono text-[var(--color-accent)] font-semibold border border-[var(--border-color)]">$1</code>')
    .replace(/\`([^\`]+)\`/g, '<code class="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-xs font-mono text-[var(--color-accent)] font-semibold border border-[var(--border-color)]">$1</code>')
    .replace(/\\*\\*([^*]+)\\*\\*/g, '<strong class="font-bold text-[var(--text-primary)]">$1</strong>')
    .replace(/\\*([^*]+)\\*/g, '<em class="italic text-[var(--text-secondary)]">$1</em>');
}`;

  if (content.includes("dYY")) {
    content = content.replace(oldApplyInline, newApplyInline);
    console.log("Updated applyInlineMarkdown.");
  } else {
    // Try general replacement
    content = content.replace(/applyInlineMarkdown\([\s\S]+?\}/, `applyInlineMarkdown(text) {
  return text
    .replace(/\\*\\*([^*]+)\\*\\*/g, '<strong>$1</strong>')
    .replace(/\\*([^*]+)\\*/g, '<em>$1</em>')
    .replace(/\`([^\`]+)\`/g, '<code>$1</code>');
}`);
    console.log("Replaced inline markdown with fallback.");
  }

  // Update MessageContent parser to handle tables!
  const oldMessageContent = `  // 3. Render as markdown
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

  const newMessageContent = `  // 3. Render as markdown & parse tables
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
      // Skip division lines like |---|---|
      if (line.includes("---")) return;
      tableRows.push(cells);
    } else {
      if (inTable && tableRows.length > 0) {
        // Output compiled table
        elements.push(
          <div key={"table-" + i} className="overflow-x-auto my-3 border border-[var(--border-color)] rounded-xl">
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

  content = content.replace(oldMessageContent, newMessageContent);
  console.log("Updated MessageContent table rendering parsing code.");

  fs.writeFileSync(targetPath, content, 'utf8');
  console.log("Finished writing ChatbotDrawer changes.");
} else {
  console.log("ChatbotDrawer.jsx not found.");
}
