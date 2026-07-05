import { useState } from "react";
import { Link } from "react-router-dom";
import ThemeToggle from "../components/theme/ThemeToggle";
import GlassPanel from "../components/ui/GlassPanel";
import { useAuth } from "../context/AuthContext";
import { getAuthErrorMessage } from "../utils/authErrors";

function ForgotPasswordPage() {
  const [email, setEmail] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const { requestPasswordReset } = useAuth();

  async function handleSubmit(event) {
    event.preventDefault();
    try {
      setSubmitting(true);
      setError("");
      setSuccess("");
      await requestPasswordReset(email.trim());
      setSuccess("Password reset email sent. Check your inbox.");
    } catch (authError) {
      setError(getAuthErrorMessage(authError, "Could not send the reset email."));
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <div className="absolute right-6 top-6">
        <ThemeToggle />
      </div>

      <GlassPanel className="w-full max-w-md">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-light)] text-sm font-bold text-[var(--color-accent)] mb-4">
          AL
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
          Account Recovery
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
          Reset your password
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
          Enter your email address and we&apos;ll send you a password reset link.
        </p>

        <form className="mt-8 flex flex-col gap-3.5" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="h-12 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)]"
          />

          <button
            type="submit"
            disabled={submitting}
            className="h-12 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] px-4 text-sm font-semibold text-white dark:text-[var(--text-inverse)] hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submitting ? "Sending..." : "Send reset link"}
          </button>
        </form>

        {error ? <p className="mt-4 text-sm text-rose-500 dark:text-rose-300">{error}</p> : null}
        {success ? <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-300">{success}</p> : null}

        <div className="mt-6 flex items-center justify-between text-xs font-medium">
          <Link to="/login" className="text-[var(--text-secondary)] hover:text-[var(--color-accent)]">
            Back to login
          </Link>
          <Link to="/" className="text-[var(--text-secondary)] hover:text-[var(--color-accent)]">
            Create account
          </Link>
        </div>
      </GlassPanel>
    </main>
  );
}

export default ForgotPasswordPage;
