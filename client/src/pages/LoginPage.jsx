import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ThemeToggle from "../components/theme/ThemeToggle";
import GlassPanel from "../components/ui/GlassPanel";
import { useAuth } from "../context/AuthContext";
import { getAuthErrorMessage } from "../utils/authErrors";

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submittingGoogle, setSubmittingGoogle] = useState(false);
  const [submittingEmail, setSubmittingEmail] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithGoogle, loginWithEmailPassword } = useAuth();

  async function handleEmailLogin(event) {
    event.preventDefault();
    try {
      setSubmittingEmail(true);
      setError("");
      await loginWithEmailPassword(email.trim(), password);
      navigate(location.state?.from?.pathname || "/app/dashboard", { replace: true });
    } catch (authError) {
      setError(getAuthErrorMessage(authError, "Email login failed."));
    } finally {
      setSubmittingEmail(false);
    }
  }

  async function handleGoogleLogin() {
    try {
      setSubmittingGoogle(true);
      setError("");
      await loginWithGoogle();
      navigate(location.state?.from?.pathname || "/app/dashboard", { replace: true });
    } catch (authError) {
      setError(getAuthErrorMessage(authError, "Google sign-in failed."));
    } finally {
      setSubmittingGoogle(false);
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
          Welcome Back
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-[var(--text-primary)]">
          Log in to TradeIntel AI
        </h1>
        <p className="mt-3 text-sm leading-relaxed text-[var(--text-secondary)]">
          Access your research workspace with email and password or continue with Google.
        </p>

        <form className="mt-8 flex flex-col gap-3.5" onSubmit={handleEmailLogin}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="h-12 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)]"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="h-12 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)]"
          />

          <button
            type="submit"
            disabled={submittingEmail}
            className="h-12 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] px-4 text-sm font-semibold text-white dark:text-[var(--text-inverse)] hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submittingEmail ? "Signing in..." : "Log in"}
          </button>
        </form>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--border-color)]" />
          <span className="text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">or</span>
          <div className="h-px flex-1 bg-[var(--border-color)]" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={submittingGoogle}
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 text-sm font-semibold text-[var(--text-secondary)] hover:-translate-y-0.5 hover:bg-[var(--bg-secondary)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submittingGoogle ? "Connecting to Google..." : "Continue with Google"}
        </button>

        {error ? <p className="mt-4 text-sm text-rose-500 dark:text-rose-300">{error}</p> : null}

        <div className="mt-6 flex items-center justify-between text-xs font-medium">
          <Link to="/forgot-password" className="text-[var(--text-secondary)] hover:text-[var(--color-accent)]">
            Forgot password?
          </Link>
          <Link to="/" className="text-[var(--text-secondary)] hover:text-[var(--color-accent)]">
            Create account
          </Link>
        </div>
      </GlassPanel>
    </main>
  );
}

export default LoginPage;
