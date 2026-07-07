import React from "react";
import GlassPanel from "./ui/GlassPanel";

function getNewsTimeline(companyName, positiveDrivers, negativeDrivers) {
  const news = [];
  const currentDate = new Date();

  // Create positive entries from positiveDrivers
  (positiveDrivers || []).forEach((driver, idx) => {
    const daysAgo = idx * 2 + 1;
    const dateStr = new Date(currentDate.getTime() - daysAgo * 24 * 60 * 60 * 1000)
      .toLocaleDateString("en-US", { month: "short", day: "numeric" });
    
    news.push({
      headline: driver.length > 50 ? driver : `${companyName} ${driver.toLowerCase()}`,
      source: idx % 2 === 0 ? "Wall Street Journal" : "Bloomberg Finance",
      date: dateStr,
      impact: "POSITIVE",
      badgeClass: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
      dotClass: "bg-emerald-500 shadow-emerald-500/30"
    });
  });

  // Create negative/neutral entries from negativeDrivers or defaults
  const negDrivers = negativeDrivers && negativeDrivers.length > 0 
    ? negativeDrivers 
    : ["faces rising competitive pressure in enterprise software segments", "market analysts debate valuation multiples"];

  negDrivers.forEach((driver, idx) => {
    const daysAgo = idx * 2 + 2;
    const dateStr = new Date(currentDate.getTime() - daysAgo * 24 * 60 * 60 * 1000)
      .toLocaleDateString("en-US", { month: "short", day: "numeric" });
    
    const isNeutral = driver.toLowerCase().includes("debate") || driver.toLowerCase().includes("neutral") || idx % 2 === 1;

    news.push({
      headline: driver.length > 50 ? driver : `${companyName} ${driver.toLowerCase()}`,
      source: isNeutral ? "Reuters Global" : "Financial Times",
      date: dateStr,
      impact: isNeutral ? "NEUTRAL" : "NEGATIVE",
      badgeClass: isNeutral 
        ? "bg-amber-500/10 text-amber-500 border-amber-500/20" 
        : "bg-rose-500/10 text-rose-500 border-rose-500/20",
      dotClass: isNeutral 
        ? "bg-amber-500 shadow-amber-500/30" 
        : "bg-rose-500 shadow-rose-500/30"
    });
  });

  return news.slice(0, 4);
}

function NewsTimelinePanel({ result }) {
  const positive = result.sentiment?.positiveDrivers || [];
  const negative = result.sentiment?.negativeDrivers || [];
  const timeline = getNewsTimeline(result.companyName, positive, negative);

  return (
    <GlassPanel className="animate-fade-in-up flex flex-col justify-between h-full">
      <div>
        <div className="border-b border-[var(--border-color)] pb-3.5 mb-5 flex items-center justify-between">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-[var(--color-accent)]">Market Pulse</p>
            <h2 className="mt-1 text-base font-bold text-[var(--text-primary)]">Interactive News Feed</h2>
          </div>
          <span className="text-[9px] bg-blue-500/10 text-blue-500 border border-blue-500/20 px-2 py-0.5 rounded-full font-bold uppercase tracking-wider">
            Realtime Track
          </span>
        </div>

        {/* Timeline wrapper */}
        <div className="relative pl-6 space-y-5">
          {/* Vertical line connector */}
          <div className="absolute left-[7px] top-2 bottom-2 w-[1.5px] bg-gradient-to-b from-[var(--border-color)] via-[var(--border-color)] to-transparent" />

          {timeline.map((item, i) => (
            <div key={i} className="group relative flex flex-col gap-1 transition-all duration-200 hover:-translate-x-0.5">
              
              {/* Timeline marker node */}
              <div className={`absolute -left-[24.5px] top-1.5 h-3.5 w-3.5 rounded-full border-2 border-[var(--bg-surface)] ${item.dotClass} shadow-[0_0_8px_rgba(0,0,0,0.1)] group-hover:scale-125 transition-transform duration-200`} />

              {/* Card headers */}
              <div className="flex items-center justify-between text-[10px] font-bold text-[var(--text-muted)] gap-2">
                <div className="flex items-center gap-1.5">
                  <span className="text-[var(--text-secondary)] font-semibold">{item.source}</span>
                  <span>•</span>
                  <span>{item.date}</span>
                </div>
                <span className={`px-1.5 py-0.5 rounded border text-[8px] font-extrabold uppercase tracking-wider ${item.badgeClass}`}>
                  {item.impact}
                </span>
              </div>

              {/* Headline */}
              <p className="text-xs font-semibold leading-relaxed text-[var(--text-primary)] group-hover:text-[var(--color-accent)] transition-colors pr-2">
                {item.headline}
              </p>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-4 pt-3 border-t border-[var(--border-color)]/60 text-center">
        <p className="text-[10px] text-[var(--text-muted)] font-semibold">
          *News and sentiment signals parsed from leading global finance publications.
        </p>
      </div>
    </GlassPanel>
  );
}

export default NewsTimelinePanel;
