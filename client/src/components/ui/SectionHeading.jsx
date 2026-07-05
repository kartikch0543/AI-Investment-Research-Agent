function SectionHeading({ eyebrow, title, description, action = null }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow && (
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-[var(--color-accent)]">
            {eyebrow}
          </p>
        )}
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">{title}</h1>
        {description && (
          <p className="mt-2 text-sm leading-relaxed text-[var(--text-secondary)]">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

export default SectionHeading;
