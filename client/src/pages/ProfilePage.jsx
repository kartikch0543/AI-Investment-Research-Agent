import { useEffect, useState } from "react";
import GlassPanel from "../components/ui/GlassPanel";
import SectionHeading from "../components/ui/SectionHeading";
import { useAuth } from "../context/AuthContext";
import { useSearchHistory } from "../context/SearchHistoryContext";

function ProfilePage() {
  const { user, databaseProfile, profileLoading, requestPasswordReset, saveProfileChanges } = useAuth();
  const { historyItems } = useSearchHistory();
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    setDisplayName(databaseProfile?.displayName || user?.displayName || "");
    setUsername(databaseProfile?.username || "");
    setContactNumber(databaseProfile?.contactNumber || "");
    setPhotoUrl(databaseProfile?.photoUrl || user?.photoURL || "");
  }, [databaseProfile, user]);

  async function handleProfileSave(event) {
    event.preventDefault();
    try {
      setError("");
      setMessage("");
      await saveProfileChanges({
        displayName: displayName.trim(),
        username: username.trim(),
        contactNumber: contactNumber.trim(),
        photoUrl: photoUrl.trim()
      });
      setMessage("Profile updated successfully.");
    } catch (saveError) {
      setError(saveError.message || "Profile update failed.");
    }
  }

  async function handlePasswordReset() {
    try {
      setError("");
      setMessage("");
      await requestPasswordReset(user?.email);
      setMessage("Password reset email sent. Check your inbox.");
    } catch (resetError) {
      setError(resetError.message || "Could not send password reset email.");
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-5xl">
      <GlassPanel>
        <SectionHeading
          eyebrow="Profile"
          title={user?.displayName || "AlphaLens User"}
          description="Your connected Google account is used to access the AlphaLens research workspace."
        />
      </GlassPanel>

      <section className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <GlassPanel>
          <div className="flex items-center gap-4">
            {(databaseProfile?.photoUrl || user?.photoURL) ? (
              <img
                src={databaseProfile?.photoUrl || user?.photoURL}
                alt={databaseProfile?.displayName || user?.displayName || "User"}
                className="h-20 w-20 rounded-2xl object-cover border border-[var(--border-color)]"
              />
            ) : (
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[var(--color-accent-light)] text-xl font-bold text-[var(--color-accent)] border border-[var(--border-color)]">
                {(databaseProfile?.displayName || user?.displayName || "A").slice(0, 1).toUpperCase()}
              </div>
            )}
            <div>
              <p className="text-xl font-semibold text-[var(--text-primary)]">
                {databaseProfile?.displayName || user?.displayName || "AlphaLens User"}
              </p>
              <p className="mt-1 text-sm text-[var(--text-secondary)]">
                {databaseProfile?.email || user?.email}
              </p>
              <p className="mt-2 text-sm text-[var(--text-secondary)]">
                @{databaseProfile?.username || "username-not-set"}
              </p>
              <p className="mt-2 text-xs uppercase tracking-[0.18em] text-[var(--text-muted)]">
                {databaseProfile?.provider || user?.providerData?.[0]?.providerId || "firebase"}
              </p>
            </div>
          </div>
        </GlassPanel>

        <GlassPanel>
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="rounded-xl bg-[var(--bg-secondary)] p-4 border border-[var(--border-color)]">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">Research Count</p>
              <p className="mt-2 text-3xl font-semibold text-[var(--text-primary)]">{historyItems.length}</p>
            </div>
            <div className="rounded-xl bg-[var(--bg-secondary)] p-4 border border-[var(--border-color)]">
              <p className="text-xs uppercase tracking-[0.18em] text-[var(--text-secondary)]">Last Login</p>
              <p className="mt-2 text-sm font-semibold text-[var(--text-primary)]">
                {databaseProfile?.lastLoginAt ? new Date(databaseProfile.lastLoginAt).toLocaleString() : "Available after sync"}
              </p>
            </div>
          </div>

          <form className="mt-6 flex flex-col gap-4" onSubmit={handleProfileSave}>
            <input
              type="text"
              value={displayName}
              onChange={(event) => setDisplayName(event.target.value)}
              placeholder="Display name"
              className="h-12 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)]"
            />
            <input
              type="text"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              placeholder="Username"
              className="h-12 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)]"
            />
            <input
              type="tel"
              value={contactNumber}
              onChange={(event) => setContactNumber(event.target.value)}
              placeholder="Contact number"
              className="h-12 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)]"
            />
            <input
              type="url"
              value={photoUrl}
              onChange={(event) => setPhotoUrl(event.target.value)}
              placeholder="Profile image URL"
              className="h-12 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)]"
            />

            <div className="flex flex-wrap gap-3">
              <button
                type="submit"
                disabled={profileLoading}
                className="rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] px-5 py-3 text-sm font-semibold text-white dark:text-[var(--text-inverse)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
              >
                {profileLoading ? "Saving..." : "Save profile"}
              </button>
              <button
                type="button"
                onClick={handlePasswordReset}
                className="rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-5 py-3 text-sm font-semibold text-[var(--text-secondary)] hover:-translate-y-0.5 hover:bg-[var(--bg-secondary)]"
              >
                Send password reset
              </button>
            </div>
          </form>

          {message ? <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-300">{message}</p> : null}
          {error ? <p className="mt-4 text-sm text-rose-500 dark:text-rose-300">{error}</p> : null}
        </GlassPanel>
      </section>
    </div>
  );
}

export default ProfilePage;
