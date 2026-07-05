import ProtectedTopBar from "../components/layout/ProtectedTopBar";
import GlassPanel from "../components/ui/GlassPanel";
import SectionHeading from "../components/ui/SectionHeading";
import { useAuth } from "../context/AuthContext";
import { THEME_MODES, useTheme } from "../context/ThemeContext";

function SettingsPage() {
  const { user } = useAuth();
  const { themeMode, setTheme } = useTheme();

  return (
    <>
      <ProtectedTopBar />
      <main className="min-h-[calc(100vh-96px)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-6xl flex-col gap-6">
          <GlassPanel>
            <SectionHeading
              eyebrow="Settings"
              title="Workspace settings"
              description="Manage appearance, account connectivity, and the current status of AlphaLens services."
            />
          </GlassPanel>

          <section className="grid gap-6 lg:grid-cols-2">
            <GlassPanel>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Theme preference</p>
              <div className="mt-5 grid gap-3 sm:grid-cols-3">
                {[THEME_MODES.SYSTEM, THEME_MODES.LIGHT, THEME_MODES.DARK].map((mode) => (
                  <button
                    key={mode}
                    type="button"
                    onClick={() => setTheme(mode)}
                    className={`rounded-2xl border px-4 py-4 text-sm font-medium capitalize ${
                      themeMode === mode
                        ? "border-slate-900 bg-slate-900 text-white dark:border-cyan-400 dark:bg-cyan-400 dark:text-slate-950"
                        : "border-slate-200 bg-slate-50 text-slate-700 dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                    }`}
                  >
                    {mode}
                  </button>
                ))}
              </div>
            </GlassPanel>

            <GlassPanel>
              <p className="text-sm font-semibold text-slate-900 dark:text-white">Connected Google account</p>
              <div className="mt-5 rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
                <p className="font-medium text-slate-900 dark:text-white">{user?.displayName}</p>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
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
                <p className="text-sm font-semibold text-slate-900 dark:text-white">{item.label}</p>
                <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">{item.status}</p>
              </GlassPanel>
            ))}
          </section>
        </div>
      </main>
    </>
  );
}

export default SettingsPage;
