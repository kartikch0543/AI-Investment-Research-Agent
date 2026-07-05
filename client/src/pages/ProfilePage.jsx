import ProtectedTopBar from "../components/layout/ProtectedTopBar";
import GlassPanel from "../components/ui/GlassPanel";
import SectionHeading from "../components/ui/SectionHeading";
import { useAuth } from "../context/AuthContext";
import { useSearchHistory } from "../context/SearchHistoryContext";

function ProfilePage() {
  const { user } = useAuth();
  const { historyItems } = useSearchHistory();

  return (
    <>
      <ProtectedTopBar />
      <main className="min-h-[calc(100vh-96px)] px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto flex max-w-5xl flex-col gap-6">
          <GlassPanel>
            <SectionHeading
              eyebrow="Profile"
              title={user?.displayName || "AlphaLens User"}
              description="Your connected Google account is used to access the AlphaLens research workspace."
            />
          </GlassPanel>

          <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr]">
            <GlassPanel>
              <div className="flex items-center gap-4">
                {user?.photoURL ? (
                  <img src={user.photoURL} alt={user.displayName || "User"} className="h-20 w-20 rounded-full object-cover" />
                ) : (
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-slate-900 text-xl font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">
                    {(user?.displayName || "A").slice(0, 1).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="text-xl font-semibold text-slate-900 dark:text-white">{user?.displayName}</p>
                  <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">{user?.email}</p>
                </div>
              </div>
            </GlassPanel>

            <GlassPanel>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Research Count</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">{historyItems.length}</p>
                </div>
                <div className="rounded-2xl bg-slate-50 p-4 dark:bg-white/5">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-500 dark:text-slate-400">Provider</p>
                  <p className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Google</p>
                </div>
              </div>
            </GlassPanel>
          </section>
        </div>
      </main>
    </>
  );
}

export default ProfilePage;
