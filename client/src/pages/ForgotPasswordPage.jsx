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
      console.error("Password Reset Error:", authError);
      setError(`Reset failed: [${authError.code || "unknown"}] ${authError.message}`);
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
          TI
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

        <form className="mt-6 flex flex-col gap-3" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="h-10 rounded-lg border border-[var(--border-color)] bg-[var(--bg-surface)] px-3.5 text-xs text-[var(--text-primary)] outline-none focus:ring-2 focus:ring-[var(--color-accent)]/25 focus:border-[var(--color-accent)] placeholder:text-[var(--text-muted)] transition-all"
          />

          <button
            type="submit"
            disabled={submitting}
            className="h-10 rounded-lg bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] px-4 text-xs font-semibold text-white text-white disabled:cursor-not-allowed disabled:opacity-70 transition-all"
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
