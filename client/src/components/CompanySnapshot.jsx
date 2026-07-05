import GlassPanel from "./ui/GlassPanel";

function CompanySnapshot({ result }) {
  return (
    <GlassPanel>
      <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Company Profile</p>
      <h2 className="mt-1.5 text-xl font-semibold text-[var(--text-primary)]">{result.companyName}</h2>

      {/* Primary Reasoning */}
      <div className="mt-4 rounded-xl bg-[var(--bg-secondary)] border border-[var(--border-color)] p-4">
        <p className="text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)] mb-2">AI Reasoning</p>
        <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{result.reasoning}</p>
      </div>

      {/* Strengths */}
      {(result.strengths || []).length > 0 && (
        <div className="mt-4">
          <p className="text-xs font-bold text-[var(--text-primary)] flex items-center gap-1.5 mb-3">
            <svg className="h-3.5 w-3.5 text-emerald-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
            </svg>
            Key Strengths
          </p>
          <ul className="space-y-2">
            {result.strengths.map((strength, i) => (
              <li
                key={i}
                className="flex items-start gap-2.5 rounded-xl border border-emerald-200/60 bg-emerald-50/40 dark:border-emerald-500/15 dark:bg-emerald-500/5 px-3 py-2.5 text-xs text-[var(--text-primary)] leading-relaxed"
              >
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                {strength}
              </li>
            ))}
          </ul>
        </div>
      )}
    </GlassPanel>
  );
}

export default CompanySnapshot;
