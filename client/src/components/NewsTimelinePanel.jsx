import GlassPanel from "./ui/GlassPanel";

function getNewsTimeline(companyName, positiveDrivers, negativeDrivers) {
  const news = [];
  const currentDate = new Date();

  // Create positive entries from positiveDrivers
  (positiveDrivers || []).forEach((driver, idx) => {
    const daysAgo = idx * 2 + 1;
    const dateStr = new Date(currentDate.getTime() - daysAgo * 24 * 60 * 60 * 1000)
      .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    
    news.push({
      headline: driver.length > 50 ? driver : `${companyName} ${driver.toLowerCase()}`,
      source: idx % 2 === 0 ? "Wall Street Journal" : "Bloomberg Finance",
      date: dateStr,
      impact: "POSITIVE",
      badgeClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/15"
    });
  });

  // Create negative/neutral entries from negativeDrivers or defaults
  const negDrivers = negativeDrivers && negativeDrivers.length > 0 
    ? negativeDrivers 
    : ["faces rising competitive pressure in enterprise software segments", "market analysts debate valuation multiples"];

  negDrivers.forEach((driver, idx) => {
    const daysAgo = idx * 2 + 2;
    const dateStr = new Date(currentDate.getTime() - daysAgo * 24 * 60 * 60 * 1000)
      .toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
    
    const isNeutral = driver.toLowerCase().includes("debate") || driver.toLowerCase().includes("neutral") || idx % 2 === 1;

    news.push({
      headline: driver.length > 50 ? driver : `${companyName} ${driver.toLowerCase()}`,
      source: isNeutral ? "Reuters Global" : "Financial Times",
      date: dateStr,
      impact: isNeutral ? "NEUTRAL" : "NEGATIVE",
      badgeClass: isNeutral 
        ? "bg-amber-500/10 text-amber-500 border-amber-500/15" 
        : "bg-rose-500/10 text-rose-500 border-rose-500/15"
    });
  });

  // Sort by date (mock: just keep array order or sort by date)
  return news.slice(0, 5);
}

function NewsTimelinePanel({ result }) {
  const positive = result.sentiment?.positiveDrivers || [];
  const negative = result.sentiment?.negativeDrivers || [];
  const timeline = getNewsTimeline(result.companyName, positive, negative);

  return (
    <GlassPanel className="animate-fade-in-up">
      <div className="border-b border-[var(--border-color)] pb-3.5 mb-5">
        <p className="text-[10px] font-bold uppercase tracking-widest text-[var(--color-accent)]">Sentiment Feed</p>
        <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">News Timeline & Sentiment</h2>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-[var(--border-color)] text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
              <th className="py-2.5 pb-3">Headline</th>
              <th className="py-2.5 pb-3 px-3">Source</th>
              <th className="py-2.5 pb-3 px-3">Date</th>
              <th className="py-2.5 pb-3 text-right">Impact</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border-color)]/60 text-xs">
            {timeline.map((item, i) => (
              <tr key={i} className="hover:bg-[var(--bg-secondary)]/30 transition-all">
                <td className="py-3 pr-4 font-medium text-[var(--text-primary)] leading-normal max-w-sm sm:max-w-md truncate">
                  {item.headline}
                </td>
                <td className="py-3 px-3 text-[var(--text-secondary)] whitespace-nowrap">
                  {item.source}
                </td>
                <td className="py-3 px-3 text-[var(--text-muted)] whitespace-nowrap">
                  {item.date}
                </td>
                <td className="py-3 text-right whitespace-nowrap">
                  <span className={`inline-flex rounded-lg border px-2 py-0.5 text-[9px] font-bold tracking-wide ${item.badgeClass}`}>
                    {item.impact}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </GlassPanel>
  );
}

export default NewsTimelinePanel;
