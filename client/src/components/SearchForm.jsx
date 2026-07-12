import { useState, useRef, useEffect } from "react";
import GlassPanel from "./ui/GlassPanel";

const FAMILIES = [
  {
    keys: ["tata", "taat", "tat", "tcs"],
    label: "Tata Group",
    subcompanies: [
      { name: "Tata Consultancy Services (TCS)", query: "TCS" },
      { name: "Tata Motors", query: "Tata Motors" },
      { name: "Tata Steel", query: "Tata Steel" },
      { name: "Tata Power", query: "Tata Power" },
      { name: "Tata Consumer Products", query: "Tata Consumer Products" }
    ]
  },
  {
    keys: ["reliance", "reli", "ril", "jio"],
    label: "Reliance Industries",
    subcompanies: [
      { name: "Reliance Industries (RIL)", query: "Reliance Industries" },
      { name: "Reliance Power", query: "Reliance Power" },
      { name: "Reliance Infrastructure", query: "Reliance Infrastructure" },
      { name: "Jio Financial Services", query: "Jio Financial Services" }
    ]
  },
  {
    keys: ["adani", "adan"],
    label: "Adani Group",
    subcompanies: [
      { name: "Adani Enterprises", query: "Adani Enterprises" },
      { name: "Adani Ports & SEZ", query: "Adani Ports" },
      { name: "Adani Power", query: "Adani Power" },
      { name: "Adani Green Energy", query: "Adani Green Energy" },
      { name: "Adani Total Gas", query: "Adani Total Gas" }
    ]
  },
  {
    keys: ["birla", "birl", "aditya"],
    label: "Aditya Birla Group",
    subcompanies: [
      { name: "UltraTech Cement", query: "UltraTech Cement" },
      { name: "Grasim Industries", query: "Grasim Industries" },
      { name: "Hindalco Industries", query: "Hindalco Industries" },
      { name: "Aditya Birla Capital", query: "Aditya Birla Capital" }
    ]
  },
  {
    keys: ["google", "goog", "alph", "alphabet"],
    label: "Alphabet (Google)",
    subcompanies: [
      { name: "Alphabet Inc. (Class A)", query: "Alphabet Class A" },
      { name: "Alphabet Inc. (Class C)", query: "Alphabet Class C" }
    ]
  }
];

function SearchForm({ companyName, loading, error, onCompanyNameChange, onSubmit }) {
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  const normalizedInput = companyName.toLowerCase().trim();
  const matchedFamily = normalizedInput.length >= 2
    ? FAMILIES.find(family =>
        family.keys.some(key =>
          normalizedInput.includes(key) ||
          key.includes(normalizedInput)
        )
      )
    : null;

  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <GlassPanel className="relative overflow-hidden h-full flex flex-col justify-start">
      {/* Subtle background glow */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--color-accent-light)] to-transparent pointer-events-none" />

      <div className="relative flex-1 flex flex-col justify-start gap-4">
        <div>
          <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Research Input</p>
          <h2 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
            Analyze any public company
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[var(--text-secondary)]">
            Our 7-agent AI pipeline gathers market intelligence, analyzes financials, assesses competitive moat,
            and returns a structured investment recommendation.
          </p>
        </div>

        <form className="flex flex-col gap-2 sm:flex-row" onSubmit={onSubmit}>
          <div ref={containerRef} className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={companyName}
              onChange={(e) => {
                onCompanyNameChange(e);
                setShowSuggestions(true);
              }}
              onFocus={() => setShowSuggestions(true)}
              placeholder="Enter company name (e.g. Apple, Tesla, Infosys)"
              className="h-12 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/15 transition-all"
            />

            {/* Suggestions Overlay */}
            {matchedFamily && showSuggestions && (
              <div className="absolute left-0 right-0 top-full mt-2 z-50 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] shadow-2xl p-2 max-h-60 overflow-y-auto backdrop-blur-md">
                <div className="px-3 py-1.5 text-[10px] font-bold uppercase tracking-wider text-[var(--color-accent)] border-b border-[var(--border-color)]/60 mb-1">
                  Suggestions for {matchedFamily.label}
                </div>
                {matchedFamily.subcompanies.map((sub, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => {
                      onCompanyNameChange({ target: { value: sub.query } });
                      setShowSuggestions(false);
                    }}
                    className="w-full text-left px-3 py-2 text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:bg-[var(--color-accent-light)] rounded-lg transition-all cursor-pointer flex items-center justify-between"
                  >
                    <span>{sub.name}</span>
                    <span className="text-[10px] text-[var(--text-muted)] italic">Select</span>
                  </button>
                ))}
              </div>
            )}
          </div>
          <button
            type="submit"
            disabled={loading || !companyName.trim()}
            className="h-12 rounded-xl bg-[#10B981] hover:bg-[#059669] text-white font-bold text-sm uppercase tracking-wider disabled:cursor-not-allowed disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2.5 whitespace-nowrap px-7 shadow-lg shadow-emerald-500/20 hover:shadow-emerald-500/30 border border-emerald-500/20"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                <span>Researching...</span>
              </>
            ) : (
              <>
                <span>Research</span>
              </>
            )}
          </button>
        </form>

        <div className="mt-4 pt-4 border-t border-[var(--border-color)]/60">
          <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-[var(--text-muted)] mb-3">
            Quick suggestions
          </p>
          <div className="flex flex-wrap gap-2">
            {["Apple", "Tesla", "NVIDIA", "Microsoft", "Tata"].map((company) => (
              <button
                key={company}
                type="button"
                onClick={() => {
                  onCompanyNameChange({ target: { value: company } });
                  setShowSuggestions(true);
                }}
                className="px-3 py-1.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--color-accent)] hover:bg-[var(--color-accent-light)] text-xs font-semibold text-[var(--text-secondary)] hover:text-[var(--color-accent)] transition-all cursor-pointer shadow-sm"
              >
                {company}
              </button>
            ))}
          </div>
        </div>

        {error && (
          <div className="mt-3 flex items-center gap-2 rounded-xl border border-rose-200/60 bg-rose-50/60 dark:border-rose-500/20 dark:bg-rose-500/5 px-4 py-3">
            <svg className="h-4 w-4 text-rose-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-sm text-rose-600 dark:text-rose-400">{error}</p>
          </div>
        )}
      </div>
    </GlassPanel>
  );
}

export default SearchForm;
