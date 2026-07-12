const fs = require("fs");
const path = require("path");
const readline = require("readline");

async function parse() {
  const logDir = "C:\\Users\\VICTUS\\.gemini\\antigravity-ide\\brain\\99ce619f-d28c-4ae6-9479-d111ba05a07a\\.system_generated\\logs";
  const transcriptPath = path.join(logDir, "transcript.jsonl");
  const fullTranscriptPath = path.join(logDir, "transcript_full.jsonl");

  if (!fs.existsSync(transcriptPath)) {
    console.error("Transcript file not found!");
    return;
  }

  // Load full transcripts into memory for resolving truncated lines
  const fullLines = [];
  if (fs.existsSync(fullTranscriptPath)) {
    const fileStream = fs.createReadStream(fullTranscriptPath);
    const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });
    for await (const line of rl) {
      if (line.trim()) {
        try {
          fullLines.push(JSON.parse(line));
        } catch (e) {
          // ignore
        }
      }
    }
  }

  const fileStream = fs.createReadStream(transcriptPath);
  const rl = readline.createInterface({ input: fileStream, crlfDelay: Infinity });

  let mdContent = `# LLM Pair Programming Chat Session Transcripts & Logs

This document contains the complete log of the development chat sessions with the AI Coding Assistant (Antigravity/Gemini) during the creation and refinement of **TradeIntel AI** (formerly AlphaLens AI). It demonstrates the iterative design, architecture planning, and verification phases.

---

`;

  let idx = 0;
  for await (const line of rl) {
    if (!line.trim()) continue;
    try {
      const step = JSON.parse(line);
      const fullStep = fullLines.find(s => s.step_index === step.step_index) || step;
      
      const source = step.source;
      const type = step.type;
      let content = fullStep.content || "";

      if (type === "USER_INPUT") {
        mdContent += `### 👤 User Request (Step ${step.step_index})\n\n`;
        mdContent += `> ${content.replace(/\n/g, "\n> ")}\n\n`;
        mdContent += `---\n\n`;
      } else if (type === "PLANNER_RESPONSE" || source === "MODEL") {
        mdContent += `### 🤖 Assistant Response & Actions (Step ${step.step_index})\n\n`;
        
        // Extract text response before tool calls if any
        if (content) {
          mdContent += `${content}\n\n`;
        }

        // Check if there are tool calls
        const toolCalls = step.tool_calls || fullStep.tool_calls;
        if (toolCalls && toolCalls.length > 0) {
          mdContent += `#### 🛠️ Tool Executions:\n\n`;
          for (const tc of toolCalls) {
            mdContent += `- **Tool**: \`${tc.name || tc.function?.name}\`\n`;
            const args = tc.arguments || tc.function?.arguments;
            if (args) {
              mdContent += `  - **Arguments**:\n\`\`\`json\n${JSON.stringify(args, null, 2)}\n\`\`\`\n`;
            }
          }
          mdContent += `\n`;
        }
        mdContent += `---\n\n`;
      }
      idx++;
    } catch (err) {
      console.error("Error parsing line", err);
    }
  }

  const docsDir = path.join(__dirname, "..", "docs");
  if (!fs.existsSync(docsDir)) {
    fs.mkdirSync(docsDir);
  }
  
  const outputPath = path.join(docsDir, "llm_chat_transcripts.md");
  fs.writeFileSync(outputPath, mdContent);
  console.log(`Markdown transcript successfully written to ${outputPath}`);
}

parse();
