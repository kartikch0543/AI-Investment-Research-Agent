import { useState } from "react";
import GlassPanel from "./ui/GlassPanel";

function ItemList({ items, variant }) {
  const isStrength = variant === "strength";
  const style = isStrength
    ? "border-emerald-200/60 bg-emerald-50/40 dark:border-emerald-500/15 dark:bg-emerald-500/5"
    : "border-amber-200/60 bg-amber-50/40 dark:border-amber-500/15 dark:bg-amber-500/5";
  const dotColor = isStrength ? "bg-emerald-500" : "bg-amber-500";

  return (
    <ul className="space-y-2">
      {items.map((item, i) => (
        <li
          key={i}
          className={`flex items-start gap-2.5 rounded-xl border px-3 py-2.5 text-xs text-[var(--text-primary)] leading-relaxed ${style}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 ${dotColor}`} />
          {item}
        </li>
      ))}
    </ul>
  );
}

function ResearchCard({ title, subtitle, items = [], secondaryItems = [], summary }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <GlassPanel>
      <div className="flex items-start justify-between gap-3 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">{subtitle}</p>
          <h2 className="mt-1.5 text-xl font-semibold text-[var(--text-primary)]">{title}</h2>
        </div>
        <button
          className="h-7 w-7 flex items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] shrink-0 mt-1 transition-all"
          style={{ cursor: "pointer" }}
        >
          <svg className={`h-4 w-4 transition-transform duration-200 ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {summary && (
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">{summary}</p>
      )}

      {expanded && (
        <div className="mt-5 grid gap-5 lg:grid-cols-2">
          {items.length > 0 && (
            <div>
              <p className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                Strengths
              </p>
              <ItemList items={items} variant="strength" />
            </div>
          )}
          {secondaryItems.length > 0 && (
            <div>
              <p className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5 mb-3">
                <span className="h-1.5 w-1.5 rounded-full bg-amber-500" />
                Weaknesses
              </p>
              <ItemList items={secondaryItems} variant="weakness" />
            </div>
          )}
        </div>
      )}
    </GlassPanel>
  );
}

export default ResearchCard;
