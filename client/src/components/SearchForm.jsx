import GlassPanel from "./ui/GlassPanel";

function SearchForm({ companyName, loading, error, onCompanyNameChange, onSubmit }) {
  return (
    <GlassPanel className="relative overflow-hidden h-full flex flex-col justify-start">
      {/* Subtle background glow */}
      <div className="absolute inset-x-0 top-0 h-32 bg-gradient-to-b from-[var(--color-accent-light)] to-transparent pointer-events-none" />

      <div className="relative flex-1 flex flex-col justify-start gap-5">
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

        <form className="mt-6 flex flex-col gap-2 sm:flex-row" onSubmit={onSubmit}>
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[var(--text-muted)]">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <input
              type="text"
              value={companyName}
              onChange={onCompanyNameChange}
              placeholder="Enter company name (e.g. Apple, Tesla, Infosys)"
              className="h-12 w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] pl-11 pr-4 text-sm text-[var(--text-primary)] outline-none placeholder:text-[var(--text-muted)] focus:border-[var(--color-accent)] focus:ring-2 focus:ring-[var(--color-accent)]/15 transition-all"
            />
          </div>
          <button
            type="submit"
            disabled={loading || !companyName.trim()}
            className="h-12 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] px-6 text-sm font-semibold text-white dark:text-[var(--text-inverse)] disabled:cursor-not-allowed disabled:opacity-50 hover:-translate-y-0.5 active:translate-y-0 transition-all flex items-center gap-2 whitespace-nowrap"
          >
            {loading ? (
              <>
                <svg className="h-4 w-4 animate-spin" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                Researching...
              </>
            ) : (
              <>
                Research
              </>
            )}
          </button>
        </form>

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
