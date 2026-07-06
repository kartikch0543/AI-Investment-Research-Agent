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

      <GlassPanel className="w-full max-w-md p-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent-light)] text-sm font-bold text-[var(--color-accent)] mb-3">
          TI
        </div>
        <p className="text-xs font-semibold uppercase tracking-[0.28em] text-[var(--color-accent)]">
          Create Account
        </p>
        <h1 className="mt-2 text-2xl font-semibold tracking-tight text-[var(--text-primary)]">
          Start using TradeIntel AI
        </h1>
        <p className="mt-2 text-xs leading-relaxed text-[var(--text-secondary)]">
          Create your workspace with your details, email and password, or continue with Google.
        </p>

        <form className="mt-5 flex flex-col gap-2.5" onSubmit={handleEmailSignup}>
          <input
            type="text"
            value={displayName}
            onChange={(event) => setDisplayName(event.target.value)}
            placeholder="Full name"
            className="h-10.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)]"
          />
          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Username"
            className="h-10.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)]"
          />
          <input
            type="tel"
            value={contactNumber}
            onChange={(event) => setContactNumber(event.target.value)}
            placeholder="Contact number"
            className="h-10.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)]"
          />
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="Email address"
            className="h-10.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)]"
          />
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Password"
            className="h-10.5 rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 text-xs text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)]"
          />

          <button
            type="submit"
            disabled={submittingEmail}
            className="h-10.5 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] px-4 text-xs font-semibold text-white dark:text-[var(--text-inverse)] hover:-translate-y-0.5 hover:opacity-95 disabled:cursor-not-allowed disabled:opacity-70"
          >
            {submittingEmail ? "Creating account..." : "Sign up"}
          </button>
        </form>

        <div className="mt-3 flex items-center gap-3">
          <div className="h-px flex-1 bg-[var(--border-color)]" />
          <span className="text-[9px] font-bold uppercase tracking-[0.22em] text-[var(--text-muted)]">or</span>
          <div className="h-px flex-1 bg-[var(--border-color)]" />
        </div>

        <button
          type="button"
          onClick={handleGoogleSignup}
          disabled={submittingGoogle}
          className="mt-3 inline-flex h-10.5 w-full items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-4 text-xs font-semibold text-[var(--text-secondary)] hover:-translate-y-0.5 hover:bg-[var(--bg-secondary)] disabled:cursor-not-allowed disabled:opacity-70"
        >
          {submittingGoogle ? "Connecting to Google..." : "Continue with Google"}
        </button>

        {error ? <p className="mt-4 text-sm text-rose-500 dark:text-rose-300">{error}</p> : null}

        <div className="mt-6 flex items-center justify-between text-xs font-medium">
          <Link to="/login" className="text-[var(--text-secondary)] hover:text-[var(--color-accent)]">
            Already have an account?
          </Link>
          <Link to="/welcome" className="text-[var(--text-secondary)] hover:text-[var(--color-accent)]">
            See product intro
          </Link>
        </div>
      </GlassPanel>
    </main>
  );
}

export default SignupPage;
