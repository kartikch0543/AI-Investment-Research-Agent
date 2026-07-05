function GlassPanel({ children, className = "" }) {
  return (
    <section
      className={`rounded-[28px] border border-slate-200/70 bg-white/70 p-8 shadow-panel backdrop-blur-xl transition-colors dark:border-white/10 dark:bg-slate-900/65 dark:shadow-glow ${className}`}
    >
      {children}
    </section>
  );
}

export default GlassPanel;
