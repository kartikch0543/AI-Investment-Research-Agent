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
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal dark:text-cyan-300">
          Account Recovery
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Reset your password
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Enter your email address and we&apos;ll send you a password reset link.
        </p>

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="h-12 rounded-2xl border border-slate-200/80 bg-white/80 px-4 text-sm text-slate-900 outline-none backdrop-blur focus:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />

          <button
            type="submit"
            disabled={submitting}
            className="h-12 rounded-2xl bg-slate-950 px-4 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
          >
            {submitting ? "Sending..." : "Send reset link"}
          </button>
        </form>

        {error ? <p className="mt-4 text-sm text-rose-500 dark:text-rose-300">{error}</p> : null}
        {success ? <p className="mt-4 text-sm text-emerald-600 dark:text-emerald-300">{success}</p> : null}

        <div className="mt-6 flex items-center justify-between text-sm">
          <Link to="/login" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            Back to login
          </Link>
          <Link to="/" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            Create account
          </Link>
        </div>
      </GlassPanel>
    </main>
  );
}

export default ForgotPasswordPage;
