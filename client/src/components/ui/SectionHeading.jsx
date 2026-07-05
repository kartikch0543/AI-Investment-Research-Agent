function SectionHeading({ eyebrow, title, description, action = null }) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div className="max-w-2xl">
        {eyebrow ? (
          <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal dark:text-cyan-300">
            {eyebrow}
          </p>
        ) : null}
        <h2 className="mt-2 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">{title}</h2>
        {description ? (
          <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  );
}

export default SectionHeading;
