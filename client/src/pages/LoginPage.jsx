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
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-signal dark:text-cyan-300">
          Welcome Back
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Log in to AlphaLens AI
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Access your research workspace with email and password or continue with Google.
        </p>

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleEmailLogin}>
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="h-12 rounded-2xl border border-slate-200/80 bg-white/80 px-4 text-sm text-slate-900 outline-none backdrop-blur focus:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="h-12 rounded-2xl border border-slate-200/80 bg-white/80 px-4 text-sm text-slate-900 outline-none backdrop-blur focus:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />

          <button
            type="submit"
            disabled={submittingEmail}
            className="h-12 rounded-2xl bg-slate-950 px-4 text-sm font-semibold text-white hover:-translate-y-0.5 hover:bg-slate-800 disabled:cursor-not-allowed disabled:opacity-70 dark:bg-cyan-400 dark:text-slate-950 dark:hover:bg-cyan-300"
          >
            {submittingEmail ? "Signing in..." : "Log in"}
          </button>
        </form>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
          <span className="text-xs uppercase tracking-[0.22em] text-slate-400">or</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogleLogin}
          disabled={submittingGoogle}
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 px-4 text-sm font-semibold text-slate-900 backdrop-blur hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          {submittingGoogle ? "Connecting to Google..." : "Continue with Google"}
        </button>

        {error ? <p className="mt-4 text-sm text-rose-500 dark:text-rose-300">{error}</p> : null}

        <div className="mt-6 flex items-center justify-between text-sm">
          <Link to="/forgot-password" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            Forgot password?
          </Link>
          <Link to="/" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            Create account
          </Link>
        </div>
      </GlassPanel>
    </main>
  );
}

export default LoginPage;
