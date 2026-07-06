import { useState } from "react";
import GlassPanel from "./ui/GlassPanel";

function ItemList({ items, variant }) {
  const isStrength = variant === "strength";
  const style = isStrength
    ? "border-[var(--color-buy-border)] bg-[var(--color-buy-bg)]"
    : "border-[var(--color-watchlist-border)] bg-[var(--color-watchlist-bg)]";
  const dotColor = isStrength ? "bg-[var(--color-buy)]" : "bg-[var(--color-watchlist)]";

  return (
    <ul className="space-y-1.5">
      {items.map((item, i) => (
        <li
          key={i}
          className={`flex items-start gap-2.5 rounded-xl border px-3 py-2 text-xs text-[var(--text-secondary)] leading-relaxed ${style}`}
        >
          <span className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 ${dotColor}`} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function ResearchCard({ title, subtitle, items = [], secondaryItems = [], summary }) {
  const [expanded, setExpanded] = useState(true);

  return (
    <GlassPanel>
      <div className="flex items-center justify-between border-b border-[var(--border-color)] pb-3 mb-4 cursor-pointer" onClick={() => setExpanded(!expanded)}>
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">{subtitle}</p>
          <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">{title}</h2>
        </div>
        <button
          className="h-6 w-6 flex items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-muted)] hover:text-[var(--text-primary)] shrink-0 transition-all"
          style={{ cursor: "pointer" }}
        >
          <svg className={`h-3.5 w-3.5 transition-transform duration-150 ${expanded ? "rotate-180" : ""}`} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
          </svg>
        </button>
      </div>

      {summary && (
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{summary}</p>
      )}

      {expanded && (
        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          {items.length > 0 && (
            <div>
              <p className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5 mb-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-buy)]" />
                Strengths
              </p>
              <ItemList items={items} variant="strength" />
            </div>
          )}
          {secondaryItems.length > 0 && (
            <div>
              <p className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5 mb-2.5">
                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-watchlist)]" />
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
