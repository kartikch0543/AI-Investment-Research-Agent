import GlassPanel from "../components/ui/GlassPanel";
import SectionHeading from "../components/ui/SectionHeading";
import { useAuth } from "../context/AuthContext";
import { THEME_MODES, useTheme } from "../context/ThemeContext";

function SettingsPage() {
  const { user } = useAuth();
  const { themeMode, setTheme } = useTheme();

  return (
    <div className="flex flex-col gap-6 max-w-6xl">
      <GlassPanel>
        <SectionHeading
          eyebrow="Settings"
          title="Workspace settings"
          description="Manage appearance, account connectivity, and the current status of AlphaLens services."
        />
      </GlassPanel>

      <section className="grid gap-6 lg:grid-cols-2">
        <GlassPanel>
          <p className="text-sm font-semibold text-[var(--text-primary)]">Theme preference</p>
          <div className="mt-5 grid gap-3 sm:grid-cols-3">
            {[THEME_MODES.SYSTEM, THEME_MODES.LIGHT, THEME_MODES.DARK].map((mode) => (
              <button
                key={mode}
                type="button"
                onClick={() => setTheme(mode)}
                className={`rounded-xl border px-4 py-4 text-sm font-medium capitalize transition-all duration-200 ${
                  themeMode === mode
                    ? "border-[var(--color-accent)] bg-[var(--color-accent-light)] text-[var(--color-accent)] shadow-sm"
                    : "border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)]"
                }`}
              >
                {mode}
              </button>
            ))}
          </div>
        </GlassPanel>

        <GlassPanel>
          <p className="text-sm font-semibold text-[var(--text-primary)]">Connected Google account</p>
          <div className="mt-5 rounded-xl bg-[var(--bg-secondary)] p-4 border border-[var(--border-color)]">
            <p className="font-medium text-[var(--text-primary)]">{user?.displayName || "AlphaLens User"}</p>
            <p className="mt-1 text-sm text-[var(--text-secondary)]">{user?.email}</p>
          </div>
        </GlassPanel>
      </section>

      <section className="grid gap-6 lg:grid-cols-3">
        {[
          { label: "Gemini API", status: "Configured in environment" },
          { label: "Database", status: "Schema prepared, persistence pending" },
          { label: "About AlphaLens", status: "AI-assisted investment research workspace" }
        ].map((item) => (
          <GlassPanel key={item.label}>
            <p className="text-sm font-semibold text-[var(--text-primary)]">{item.label}</p>
            <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{item.status}</p>
          </GlassPanel>
        ))}
      </section>
    </div>
  );
}

export default SettingsPage;
