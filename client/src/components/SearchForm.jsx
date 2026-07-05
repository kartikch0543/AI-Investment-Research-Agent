function SearchForm({ companyName, loading, error, onCompanyNameChange, onSubmit }) {
  return (
    <section className="rounded-3xl bg-ink p-8 text-white shadow-panel">
      <p className="text-sm uppercase tracking-[0.22em] text-teal-200">Research Input</p>
      <h2 className="mt-3 text-2xl font-semibold">Search any public company</h2>
      <p className="mt-3 max-w-xl text-sm leading-7 text-slate-300">
        The backend will gather raw information, run specialized agents, apply deterministic scoring, and produce an
        explainable recommendation.
      </p>

      <form className="mt-6 flex flex-col gap-4 sm:flex-row" onSubmit={onSubmit}>
        <input
          type="text"
          value={companyName}
          onChange={onCompanyNameChange}
          placeholder="Enter company name"
          className="h-14 flex-1 rounded-2xl border border-slate-700 bg-slate-900 px-5 text-base outline-none transition placeholder:text-slate-500 focus:border-teal-300"
        />
        <button
          type="submit"
          disabled={loading}
          className="h-14 rounded-2xl bg-teal-400 px-6 text-sm font-semibold text-slate-950 transition hover:bg-teal-300 disabled:cursor-not-allowed disabled:opacity-70"
        >
          {loading ? "Researching..." : "Run Research"}
        </button>
      </form>

      {error ? <p className="mt-4 text-sm text-rose-300">{error}</p> : null}
    </section>
  );
}

export default SearchForm;
