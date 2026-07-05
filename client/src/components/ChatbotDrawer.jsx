import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { motion, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────────────────────
   SMART RESPONSE PARSER
   Detects JSON blobs and converts them to rich React elements
   ───────────────────────────────────────────────────────── */

function tryParseJson(text) {
  if (!text || typeof text !== "string") return null;
  const trimmed = text.trim();
  if (!trimmed.startsWith("{") && !trimmed.startsWith("[")) return null;
  try {
    return JSON.parse(trimmed);
  } catch {
    // Try extracting JSON from mixed text
    const match = trimmed.match(/```json\s*([\s\S]*?)```/) || trimmed.match(/(\{[\s\S]*\}|\[[\s\S]*\])/);
    if (match) {
      try { return JSON.parse(match[1]); } catch { return null; }
    }
    return null;
  }
}

function getScoreColor(val) {
  if (typeof val === "number") {
    if (val >= 70) return "text-emerald-600 dark:text-emerald-400";
    if (val >= 40) return "text-amber-600 dark:text-amber-400";
    return "text-rose-600 dark:text-rose-400";
  }
  const low = String(val).toLowerCase();
  if (low.includes("high") || low.includes("positive") || low.includes("buy")) return "text-emerald-600 dark:text-emerald-400";
  if (low.includes("medium") || low.includes("moderate") || low.includes("watch")) return "text-amber-600 dark:text-amber-400";
  if (low.includes("low") || low.includes("negative") || low.includes("avoid")) return "text-rose-600 dark:text-rose-400";
  return "text-[var(--text-primary)]";
}

function ValueBadge({ value }) {
  const color = getScoreColor(value);
  return (
    <span className={`inline-flex items-center gap-1 font-semibold ${color}`}>
      {typeof value === "number" && value >= 70 && "🟢 "}
      {typeof value === "number" && value >= 40 && value < 70 && "🟡 "}
      {typeof value === "number" && value < 40 && "🔴 "}
      {String(value)}
    </span>
  );
}

function JsonCard({ title, data, depth = 0 }) {
  const [open, setOpen] = useState(depth < 2);
  const entries = Object.entries(data);
  const isNested = entries.some(([, v]) => typeof v === "object" && v !== null);

  if (depth > 0 && isNested) {
    return (
      <div className="mt-2 border border-[var(--border-color)] rounded-xl overflow-hidden">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between px-4 py-2.5 bg-[var(--bg-secondary)] text-left"
          style={{ cursor: "pointer" }}
        >
          <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wide">{title}</span>
          <svg className={`h-3.5 w-3.5 text-[var(--text-muted)] transition-transform ${open ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
        {open && (
          <div className="px-4 py-3 space-y-2">
            {entries.map(([k, v]) => renderJsonEntry(k, v, depth + 1))}
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-2">
      {entries.map(([k, v]) => renderJsonEntry(k, v, depth))}
    </div>
  );
}

function renderJsonEntry(key, value, depth = 0) {
  const label = key.replace(/([A-Z])/g, " $1").replace(/_/g, " ").trim();

  if (Array.isArray(value)) {
    return (
      <div key={key} className="mt-3">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-1.5">{label}</p>
        <ul className="space-y-1">
          {value.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-xs text-[var(--text-secondary)] bg-[var(--bg-secondary)] rounded-lg px-3 py-2 border border-[var(--border-color)]">
              <span className="text-[var(--color-accent)] mt-0.5 shrink-0">•</span>
              <span>{typeof item === "object" ? JSON.stringify(item) : String(item)}</span>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (typeof value === "object" && value !== null) {
    return (
      <div key={key} className="mt-2">
        <JsonCard title={label} data={value} depth={depth + 1} />
      </div>
    );
  }

  return (
    <div key={key} className="flex items-start justify-between gap-4 py-1.5 border-b border-[var(--border-color)] last:border-0">
      <span className="text-xs text-[var(--text-muted)] flex-shrink-0 pt-0.5">{label}</span>
      <ValueBadge value={value} />
    </div>
  );
}

function JsonRenderer({ data }) {
  if (Array.isArray(data)) {
    return (
      <div className="space-y-3">
        {data.map((item, i) => (
          <div key={i} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] p-4">
            {typeof item === "object" ? (
              <JsonCard title={`Item ${i + 1}`} data={item} depth={0} />
            ) : (
              <span className="text-sm text-[var(--text-primary)]">{String(item)}</span>
            )}
          </div>
        ))}
      </div>
    );
  }

  // Top-level object — each key becomes its own titled card
  return (
    <div className="space-y-3">
      {Object.entries(data).map(([key, value]) => {
        const title = key.replace(/([A-Z])/g, " $1").replace(/_/g, " ").trim();
        if (typeof value === "object" && value !== null && !Array.isArray(value)) {
          return (
            <div key={key} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-elevated)]">
                <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">{title}</span>
              </div>
              <div className="px-4 py-3">
                <JsonCard title={title} data={value} depth={1} />
              </div>
            </div>
          );
        }
        if (Array.isArray(value)) {
          return (
            <div key={key} className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] overflow-hidden">
              <div className="flex items-center gap-2 px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-elevated)]">
                <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                <span className="text-xs font-bold text-[var(--text-primary)] uppercase tracking-wider">{title}</span>
              </div>
              <div className="px-4 py-3">
                {renderJsonEntry(key, value, 1)}
              </div>
            </div>
          );
        }
        // Primitive at top level — render as labeled stat
        return (
          <div key={key} className="flex items-center justify-between rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3">
            <span className="text-xs text-[var(--text-muted)]">{title}</span>
            <ValueBadge value={value} />
          </div>
        );
      })}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MARKDOWN RENDERER
   ───────────────────────────────────────────────────────── */

function renderMarkdownLine(line, i) {
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
        <span className="text-[var(--color-accent)] mt-0.5 shrink-0 font-bold">•</span>
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
}

function applyInlineMarkdown(text) {
  return text
    .replace(/```([^`]+)```/g, '<code class="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-xs font-mono text-[var(--color-accent)] font-semibold border border-[var(--border-color)]">$1</code>')
    .replace(/`([^`]+)`/g, '<code class="bg-[var(--bg-secondary)] px-1.5 py-0.5 rounded text-xs font-mono text-[var(--color-accent)] font-semibold border border-[var(--border-color)]">$1</code>')
    .replace(/\*\*([^*]+)\*\*/g, '<strong class="font-bold text-[var(--text-primary)]">$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em class="italic text-[var(--text-secondary)]">$1</em>')
    .replace(/🟢/g, '<span class="text-emerald-500">🟢</span>')
    .replace(/🔴/g, '<span class="text-rose-500">🔴</span>')
    .replace(/🟡/g, '<span class="text-amber-500">🟡</span>');
}

function MessageContent({ content }) {
  // 1. Try to detect and parse JSON
  const parsed = tryParseJson(content);
  if (parsed) {
    return (
      <div className="space-y-1">
        <p className="text-[10px] text-[var(--text-muted)] mb-2 flex items-center gap-1">
          <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
          Structured Analysis
        </p>
        <JsonRenderer data={parsed} />
      </div>
    );
  }

  // 2. Check for JSON inside markdown code block
  const jsonCodeBlock = content.match(/```json\s*([\s\S]*?)```/);
  if (jsonCodeBlock) {
    try {
      const parsed2 = JSON.parse(jsonCodeBlock[1]);
      const textBefore = content.slice(0, content.indexOf("```json")).trim();
      const textAfter = content.slice(content.indexOf("```") + jsonCodeBlock[0].length).trim();
      return (
        <div className="space-y-3">
          {textBefore && <div>{textBefore.split("\n").map(renderMarkdownLine)}</div>}
          <JsonRenderer data={parsed2} />
          {textAfter && <div>{textAfter.split("\n").map(renderMarkdownLine)}</div>}
        </div>
      );
    } catch { /* fall through */ }
  }

  // 3. Render as markdown
  const lines = content.split("\n");
  let inCodeBlock = false;
  const elements = [];
  let codeLines = [];

  lines.forEach((line, i) => {
    if (line.startsWith("```")) {
      if (inCodeBlock) {
        elements.push(
          <pre key={`code-${i}`} className="bg-[var(--bg-secondary)] border border-[var(--border-color)] rounded-xl p-3 my-2 text-xs font-mono overflow-x-auto text-[var(--text-primary)]">
            {codeLines.join("\n")}
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
  });

  return <div className="markdown-body space-y-0.5">{elements}</div>;
}

/* ─────────────────────────────────────────────────────────
   CHATBOT DRAWER MAIN COMPONENT
   ───────────────────────────────────────────────────────── */

const WELCOME_MESSAGE = {
  role: "assistant",
  content: "Hello! I'm your **AlphaLens Copilot** — an AI research assistant trained to help you understand investment metrics, analyze research results, and answer financial questions.\n\nYou can ask me about:\n- Financial ratios and metrics (PE, PB, EV/EBITDA)\n- Competitive moats and business quality\n- Risk analysis and interpretation\n- The current company you've researched\n- Investment concepts and terminology",
  timestamp: new Date().toISOString(),
  isWelcome: true
};

function TypingIndicator() {
  return (
    <div className="flex items-start gap-3">
      <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-light)] border border-[var(--color-accent-medium)]">
        <svg className="h-4 w-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
          <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
      </div>
      <div className="rounded-2xl rounded-tl-none bg-[var(--bg-secondary)] border border-[var(--border-color)] px-4 py-3">
        <div className="flex items-center gap-1.5">
          <div className="typing-dot h-2 w-2 rounded-full bg-[var(--text-muted)]" />
          <div className="typing-dot h-2 w-2 rounded-full bg-[var(--text-muted)]" />
          <div className="typing-dot h-2 w-2 rounded-full bg-[var(--text-muted)]" />
        </div>
        <p className="mt-1 text-[10px] text-[var(--text-muted)]">AlphaLens is thinking...</p>
      </div>
    </div>
  );
}

function MessageBubble({ msg, onCopy, copiedId }) {
  const isUser = msg.role === "user";
  const time = new Date(msg.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
      className={`flex gap-3 ${isUser ? "flex-row-reverse" : "flex-row"}`}
    >
      {/* Avatar */}
      {isUser ? (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] text-xs font-bold text-[var(--text-primary)] self-end">
          U
        </div>
      ) : (
        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-[var(--color-accent-light)] border border-[var(--color-accent-medium)] self-start">
          <svg className="h-4 w-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
      )}

      <div className={`flex flex-col gap-1 max-w-[82%] ${isUser ? "items-end" : "items-start"}`}>
        <div className={`rounded-2xl px-4 py-3 text-sm border shadow-sm ${
          isUser
            ? "bg-[var(--color-accent)] text-white border-transparent rounded-tr-none dark:text-[var(--text-inverse)]"
            : "bg-[var(--bg-secondary)] text-[var(--text-primary)] border-[var(--border-color)] rounded-tl-none"
        }`}>
          {isUser ? (
            <p className="leading-relaxed whitespace-pre-wrap">{msg.content}</p>
          ) : (
            <MessageContent content={msg.content} />
          )}
        </div>

        {/* Meta row */}
        <div className={`flex items-center gap-2 px-1 ${isUser ? "flex-row-reverse" : "flex-row"}`}>
          <span className="text-[10px] text-[var(--text-muted)]">{time}</span>
          {!isUser && (
            <button
              onClick={() => onCopy(msg.content, msg.timestamp)}
              className={`text-[10px] flex items-center gap-1 transition-colors ${
                copiedId === msg.timestamp ? "text-[var(--color-accent)]" : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
              }`}
              title="Copy response"
            >
              {copiedId === msg.timestamp ? (
                <>
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                  Copied
                </>
              ) : (
                <>
                  <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2M8 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                  Copy
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}

function EmptyState({ onSend, researchContext }) {
  const company = researchContext?.companyName || "";

  const suggestions = company
    ? [
        { icon: "📊", label: `Why is ${company} rated ${researchContext?.decision || "this way"}?`, query: `Why is ${company} rated ${researchContext?.decision}? Explain the key factors.` },
        { icon: "⚠️", label: `What are the main risks for ${company}?`, query: `What are the primary risk factors identified for ${company}?` },
        { icon: "💰", label: `Summarize ${company}'s financial health`, query: `Give me a clear summary of ${company}'s financial health and key metrics.` },
      ]
    : [
        { icon: "📐", label: "What is Price-to-Earnings (PE) Ratio?", query: "Explain the PE Ratio — definition, formula, and how to interpret it for stock analysis." },
        { icon: "🏰", label: "What is a competitive moat?", query: "What is a competitive moat in investing? Give me examples and why it matters." },
        { icon: "🔍", label: "How does AlphaLens evaluate stocks?", query: "How does the AlphaLens multi-agent pipeline evaluate and score a company?" },
      ];

  return (
    <div className="flex flex-col h-full justify-center">
      {/* Welcome card */}
      <div className="text-center mb-8">
        <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-[var(--color-accent-light)] border border-[var(--color-accent-medium)] mb-4">
          <svg className="h-7 w-7 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
        </div>
        <h3 className="text-base font-semibold text-[var(--text-primary)]">AlphaLens Copilot</h3>
        <p className="mt-1.5 text-xs text-[var(--text-secondary)] max-w-xs mx-auto leading-relaxed">
          {company
            ? `Contextually aware of your ${company} analysis. Ask me anything about it.`
            : "Your AI research partner. Ask about metrics, companies, or investment concepts."}
        </p>
        {company && (
          <div className="mt-3 inline-flex items-center gap-1.5 rounded-full bg-[var(--color-accent-light)] border border-[var(--color-accent-medium)] px-3 py-1">
            <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
            <span className="text-[10px] font-semibold text-[var(--color-accent)]">Context: {company}</span>
          </div>
        )}
      </div>

      {/* Suggested prompts */}
      <div className="space-y-2">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)] text-center mb-3">
          Suggested questions
        </p>
        {suggestions.map((s, i) => (
          <button
            key={i}
            onClick={() => onSend(s.query)}
            className="w-full text-left flex items-start gap-3 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-light)] p-3.5 transition-all duration-200 group"
            style={{ cursor: "pointer" }}
          >
            <span className="text-base shrink-0 mt-0.5">{s.icon}</span>
            <span className="text-xs text-[var(--text-secondary)] group-hover:text-[var(--text-primary)] leading-relaxed">{s.label}</span>
            <svg className="h-3.5 w-3.5 text-[var(--text-muted)] group-hover:text-[var(--color-accent)] shrink-0 mt-0.5 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   MAIN EXPORT
   ───────────────────────────────────────────────────────── */

function ChatbotDrawer({ isOpen, onClose, onOpen }) {
  const [messages, setMessages] = useState(() => {
    try {
      const saved = localStorage.getItem("alphalens-chat-v2");
      return saved ? JSON.parse(saved) : [];
    } catch { return []; }
  });
  const [inputValue, setInputValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [status, setStatus] = useState("online");
  const [researchContext, setResearchContext] = useState(null);
  const [copiedId, setCopiedId] = useState(null);

  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);
  const lastMessageRef = useRef(null);

  // Sync research context
  useEffect(() => {
    function loadContext() {
      try {
        const stored = sessionStorage.getItem("active-research-result");
        if (stored) setResearchContext(JSON.parse(stored));
        else setResearchContext(null);
      } catch {}
    }
    loadContext();
    function handleContextChange(e) {
      if (e.detail) setResearchContext(e.detail);
      else loadContext();
    }
    window.addEventListener("active-research-changed", handleContextChange);
    return () => window.removeEventListener("active-research-changed", handleContextChange);
  }, []);

  // Persist messages
  useEffect(() => {
    localStorage.setItem("alphalens-chat-v2", JSON.stringify(messages));
  }, [messages]);

  // Scroll to bottom
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 150);
    }
  }, [isOpen]);

  const handleSend = useCallback(async (textOverride) => {
    const text = (textOverride ?? inputValue).trim();
    if (!text || loading) return;

    if (!textOverride) setInputValue("");
    setError("");
    setLoading(true);
    setStatus("thinking");

    const userMsg = { role: "user", content: text, timestamp: new Date().toISOString() };
    setMessages(prev => [...prev, userMsg]);

    try {
      const res = await axios.post("http://localhost:5000/api/chatbot", {
        message: text,
        history: messages.slice(-10), // Send last 10 for context, not full history
        researchContext
      }, { timeout: 60000 });

      const reply = res.data?.data?.reply || "I couldn't generate a response. Please try again.";
      const aiMsg = { role: "assistant", content: reply, timestamp: new Date().toISOString() };
      setMessages(prev => [...prev, aiMsg]);
      setStatus("online");
    } catch (err) {
      console.error("Chatbot error:", err);
      const errMsg = err.response?.data?.message || err.message || "Connection failed.";
      setError(`Failed to get response: ${errMsg}`);
      setStatus("offline");
    } finally {
      setLoading(false);
    }
  }, [inputValue, loading, messages, researchContext]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const clearChat = () => {
    setMessages([]);
    localStorage.removeItem("alphalens-chat-v2");
    setError("");
    setStatus("online");
  };

  const copyToClipboard = (text, id) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    });
  };

  const statusConfig = {
    online: { color: "bg-emerald-500", ping: true, label: "Online" },
    thinking: { color: "bg-blue-500", ping: true, label: "Thinking..." },
    offline: { color: "bg-rose-500", ping: false, label: "Offline" },
  };
  const currentStatus = statusConfig[status];

  return (
    <>
      {/* FAB — Floating Action Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => isOpen ? onClose() : (onOpen ? onOpen() : null)}
          className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[var(--color-accent)] text-white shadow-[0_8px_30px_rgba(0,0,0,0.2)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.3)]"
          style={{ cursor: "pointer" }}
          aria-label="Toggle Copilot"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.svg key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }} className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </motion.svg>
            ) : (
              <motion.svg key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.15 }} className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </motion.svg>
            )}
          </AnimatePresence>

          {/* Status dot */}
          <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center">
            {currentStatus.ping && (
              <span className={`animate-ping absolute inline-flex h-full w-full rounded-full ${currentStatus.color} opacity-60`} />
            )}
            <span className={`relative inline-flex rounded-full h-3 w-3 ${currentStatus.color} border-2 border-[var(--bg-surface)]`} />
          </span>
        </motion.button>
      </div>

      {/* Backdrop */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={onClose}
            className="fixed inset-0 z-40 bg-black/30 backdrop-blur-[2px]"
          />
        )}
      </AnimatePresence>

      {/* Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.aside
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "spring", stiffness: 350, damping: 35 }}
            className="fixed inset-y-0 right-0 z-50 flex flex-col w-full sm:w-[460px] border-l border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xl"
          >
            {/* Header */}
            <div className="flex h-16 items-center justify-between px-5 border-b border-[var(--border-color)] bg-[var(--bg-elevated)] shrink-0">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[var(--color-accent-light)] border border-[var(--color-accent-medium)]">
                    <svg className="h-4.5 w-4.5 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <span className={`absolute -bottom-0.5 -right-0.5 flex h-2.5 w-2.5 rounded-full border-2 border-[var(--bg-surface)] ${currentStatus.color}`} />
                </div>
                <div>
                  <p className="text-sm font-semibold text-[var(--text-primary)]">AlphaLens Copilot</p>
                  <p className="text-[10px] text-[var(--text-muted)]">{currentStatus.label}</p>
                </div>
              </div>

              <div className="flex items-center gap-1.5">
                {messages.length > 0 && (
                  <button
                    onClick={clearChat}
                    className="text-[11px] font-medium text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10 px-2.5 py-1.5 rounded-lg transition-all"
                    style={{ cursor: "pointer" }}
                  >
                    Clear
                  </button>
                )}
                <button
                  onClick={onClose}
                  className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-all"
                  style={{ cursor: "pointer" }}
                >
                  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Context banner */}
            {researchContext?.companyName && (
              <div className="px-5 py-2 border-b border-[var(--border-color)] bg-[var(--color-accent-light)] flex items-center gap-2 shrink-0">
                <div className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)] animate-pulse" />
                <span className="text-[10px] font-semibold text-[var(--color-accent)]">
                  Research context: {researchContext.companyName} — {researchContext.decision}
                </span>
              </div>
            )}

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-5 space-y-5">
              {messages.length === 0 ? (
                <EmptyState onSend={handleSend} researchContext={researchContext} />
              ) : (
                messages.map((msg, i) => (
                  <MessageBubble
                    key={`${msg.timestamp}-${i}`}
                    msg={msg}
                    onCopy={copyToClipboard}
                    copiedId={copiedId}
                  />
                ))
              )}

              {loading && <TypingIndicator />}

              {error && (
                <motion.div
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="rounded-xl border border-rose-500/20 bg-rose-500/5 p-4"
                >
                  <p className="text-xs font-semibold text-rose-500">Connection Error</p>
                  <p className="mt-1 text-xs text-rose-400">{error}</p>
                  <button
                    onClick={() => { setError(""); handleSend(messages[messages.length - 1]?.content); }}
                    className="mt-2.5 inline-flex items-center gap-1.5 rounded-lg bg-rose-500/10 hover:bg-rose-500/20 px-3 py-1.5 text-[11px] font-semibold text-rose-500 transition-all"
                    style={{ cursor: "pointer" }}
                  >
                    <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    Retry
                  </button>
                </motion.div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-[var(--border-color)] bg-[var(--bg-elevated)] shrink-0">
              <div className="relative flex items-end gap-2">
                <textarea
                  ref={inputRef}
                  rows={1}
                  value={inputValue}
                  onChange={e => {
                    setInputValue(e.target.value);
                    // Auto-resize
                    e.target.style.height = "auto";
                    e.target.style.height = Math.min(e.target.scrollHeight, 120) + "px";
                  }}
                  onKeyDown={handleKeyDown}
                  placeholder={loading ? "Waiting for response..." : "Ask Copilot anything..."}
                  disabled={loading}
                  className="flex-1 resize-none rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] px-4 py-3 pr-12 text-sm text-[var(--text-primary)] placeholder:text-[var(--text-muted)] outline-none focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/20 disabled:opacity-50 transition-all"
                  style={{ minHeight: "48px", maxHeight: "120px" }}
                />
                <button
                  onClick={() => handleSend()}
                  disabled={loading || !inputValue.trim()}
                  className="absolute right-2 bottom-2 flex h-9 w-9 items-center justify-center rounded-lg bg-[var(--color-accent)] text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--color-accent-hover)] transition-all"
                  style={{ cursor: "pointer" }}
                >
                  {loading ? (
                    <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                    </svg>
                  ) : (
                    <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
                    </svg>
                  )}
                </button>
              </div>
              <p className="mt-2 text-center text-[9px] text-[var(--text-muted)]">
                Press Enter to send · Shift+Enter for new line
              </p>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}

export default ChatbotDrawer;
