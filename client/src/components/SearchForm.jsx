import GlassPanel from "./ui/GlassPanel";

function SearchForm({ companyName, loading, error, onCompanyNameChange, onSubmit }) {
  return (
    <GlassPanel className="relative overflow-hidden">
      <div className="absolute inset-x-10 top-0 h-28 bg-gradient-to-r from-cyan-400/15 via-emerald-400/10 to-transparent blur-3xl dark:from-cyan-400/10 dark:via-emerald-400/10" />
      <p className="relative text-sm uppercase tracking-[0.22em] text-signal dark:text-cyan-300">Research Input</p>
      <h2 className="relative mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
        Search any public company
      </h2>
      <p className="relative mt-3 max-w-xl text-sm leading-7 text-slate-600 dark:text-slate-300">
        The backend gathers information, runs specialized agents, applies deterministic scoring, and returns an
        explainable recommendation with traceable outputs.
      </p>

      <form className="relative mt-8 flex flex-col gap-4 sm:flex-row" onSubmit={onSubmit}>
        <input
          type="text"
          value={companyName}
          onChange={onCompanyNameChange}
          placeholder="Enter company name"
          className="h-14 flex-1 rounded-2xl border border-slate-200/80 bg-white/80 px-5 text-base text-slate-900 outline-none backdrop-blur placeholder:text-slate-400 focus:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white dark:placeholder:text-slate-500"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-14 rounded-2xl bg-slate-950 px-6 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
        >
          {loading ? "Researching..." : "Run Research"}
        </button>
      </form>

      {error ? <p className="relative mt-4 text-sm text-rose-500 dark:text-rose-300">{error}</p> : null}
    </GlassPanel>
  );
}

export default SearchForm;
