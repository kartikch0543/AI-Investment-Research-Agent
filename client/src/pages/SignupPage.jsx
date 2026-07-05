import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import ThemeToggle from "../components/theme/ThemeToggle";
import GlassPanel from "../components/ui/GlassPanel";
import { useAuth } from "../context/AuthContext";
import { getAuthErrorMessage } from "../utils/authErrors";

function SignupPage() {
  const [displayName, setDisplayName] = useState("");
  const [username, setUsername] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [submittingGoogle, setSubmittingGoogle] = useState(false);
  const [submittingEmail, setSubmittingEmail] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginWithGoogle, signupWithEmailPassword } = useAuth();

  async function handleEmailSignup(event) {
    event.preventDefault();

    try {
      setSubmittingEmail(true);
      setError("");
      await signupWithEmailPassword({
        email: email.trim(),
        password,
        displayName: displayName.trim(),
        username: username.trim(),
        contactNumber: contactNumber.trim()
      });
      navigate("/app/dashboard", { replace: true });
    } catch (authError) {
      setError(getAuthErrorMessage(authError, "Email sign-up failed."));
    } finally {
      setSubmittingEmail(false);
    }
  }

  async function handleGoogleSignup() {
    try {
      setSubmittingGoogle(true);
      setError("");
      await loginWithGoogle();
      navigate("/app/dashboard", { replace: true });
    } catch (authError) {
      setError(getAuthErrorMessage(authError, "Google sign-up failed."));
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
          Create Account
        </p>
        <h1 className="mt-3 text-3xl font-semibold tracking-tight text-slate-900 dark:text-white">
          Start using AlphaLens AI
        </h1>
        <p className="mt-3 text-sm leading-7 text-slate-600 dark:text-slate-300">
          Create your workspace with your professional details, email and password, or continue with Google.
        </p>

        <form className="mt-8 flex flex-col gap-4" onSubmit={handleEmailSignup}>
          <input
            type="text"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Full name"
            className="h-12 rounded-2xl border border-slate-200/80 bg-white/80 px-4 text-sm text-slate-900 outline-none backdrop-blur focus:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            className="h-12 rounded-2xl border border-slate-200/80 bg-white/80 px-4 text-sm text-slate-900 outline-none backdrop-blur focus:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
          <input
            type="tel"
            value={contactNumber}
            onChange={(event) => setContactNumber(event.target.value)}
            placeholder="Contact number"
            className="h-12 rounded-2xl border border-slate-200/80 bg-white/80 px-4 text-sm text-slate-900 outline-none backdrop-blur focus:border-cyan-400 dark:border-white/10 dark:bg-white/5 dark:text-white"
          />
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
            {submittingEmail ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="mt-4 flex items-center gap-3">
          <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
          <span className="text-xs uppercase tracking-[0.22em] text-slate-400">or</span>
          <div className="h-px flex-1 bg-slate-200 dark:bg-white/10" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={submittingGoogle}
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-2xl border border-slate-200/80 bg-white/80 px-4 text-sm font-semibold text-slate-900 backdrop-blur hover:-translate-y-0.5 hover:bg-white disabled:cursor-not-allowed disabled:opacity-70 dark:border-white/10 dark:bg-white/5 dark:text-white dark:hover:bg-white/10"
        >
          {submittingGoogle ? "Connecting to Google..." : "Continue with Google"}
        </button>

        {error ? <p className="mt-4 text-sm text-rose-500 dark:text-rose-300">{error}</p> : null}

        <div className="mt-6 flex items-center justify-between text-sm">
          <Link to="/login" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            Already have an account?
          </Link>
          <Link to="/welcome" className="text-slate-600 hover:text-slate-900 dark:text-slate-300 dark:hover:text-white">
            See product intro
          </Link>
        </div>
      </GlassPanel>
    </main>
  );
}

export default SignupPage;
