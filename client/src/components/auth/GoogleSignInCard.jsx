import GlassPanel from "../ui/GlassPanel";

function GoogleSignInCard({ title, description, buttonLabel, onClick, loading, error }) {
  return (
    <GlassPanel className="w-full max-w-md">
      <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal dark:text-cyan-300">
        Welcome
      </p>
      <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h1>
      <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>

      <button
        type="button"
        onClick={onClick}
        disabled={loading}
        className="mt-8 inline-flex w-full items-center justify-center rounded-2xl bg-slate-950 px-5 py-4 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
      >
        {loading ? "Connecting to Google..." : buttonLabel}
      </button>

      {error ? <p className="mt-4 text-sm text-rose-500 dark:text-rose-300">{error}</p> : null}
    </GlassPanel>
  );
}

export default GoogleSignInCard;
