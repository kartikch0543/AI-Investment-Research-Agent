import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTheme, THEME_MODES } from "../context/ThemeContext";
import GlassPanel from "../components/ui/GlassPanel";

const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);

const SunIcon = () => (
  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
);

const MoonIcon = () => (
  <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
  </svg>
);

function SignupPage() {
  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [submittingGoogle, setSubmittingGoogle] = useState(false);
  const [submittingEmail, setSubmittingEmail] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginWithGoogle, signupWithEmailPassword } = useAuth();
  const { themeMode, setTheme } = useTheme();

  async function handleEmailSignup(event) {
    event.preventDefault();
    if (!displayName.trim() || !email.trim() || !password || !confirmPassword) {
      setError("Please fill in all required fields.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }
    try {
      setSubmittingEmail(true);
      setError("");
      await signupWithEmailPassword({
        email: email.trim(),
        password,
        displayName: displayName.trim(),
        username: "",
        contactNumber: ""
      });
      navigate("/app/dashboard", { replace: true });
    } catch (authError) {
      console.error("Email Signup Error:", authError);
      setError(authError.code === "auth/email-already-in-use"
        ? "An account with this email already exists."
        : "Sign-up failed. Please verify your details.");
    } finally {
      setSubmittingEmail(false);
    }
  }

  async function handleGoogleSignup() {
    setError("");
    setSubmittingGoogle(true);
    try {
      await loginWithGoogle();
      navigate("/app/dashboard", { replace: true });
    } catch (authError) {
      console.error("Google Signup Error:", authError);
      setError("Google sign-up failed. Please try again.");
      setSubmittingGoogle(false);
    }
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-primary)] px-4 py-12 relative overflow-hidden">
      {/* Background accents */}
      <div className="absolute -top-40 -left-40 w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 rounded-full bg-[var(--color-accent)] opacity-[0.03] blur-3xl pointer-events-none" />

      {/* Floating Theme Toggle */}
      <div className="absolute top-6 right-6">
        <button
          onClick={() => setTheme(themeMode === THEME_MODES.DARK ? THEME_MODES.LIGHT : THEME_MODES.DARK)}
          className="flex h-9 w-9 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-all shadow-sm"
        >
          {themeMode === THEME_MODES.DARK ? <SunIcon /> : <MoonIcon />}
        </button>
      </div>

      <div className="w-full max-w-[420px] z-10 flex flex-col items-center">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2.5 mb-8">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--color-accent)] text-white shadow-md shadow-[var(--color-accent)]/20">
            <span className="text-base font-bold">TI</span>
          </div>
          <span className="text-lg font-bold text-[var(--text-primary)]">TradeIntel AI</span>
        </Link>

        {/* Form Card */}
        <GlassPanel className="w-full p-8 shadow-lg">
          <div className="mb-6">
            <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">Create account</h1>
            <p className="text-sm text-[var(--text-secondary)] mt-1">Start your AI investment research workspace</p>
          </div>

          {/* Google Auth Button */}
          <button
            type="button"
            onClick={handleGoogleSignup}
            disabled={submittingGoogle}
            className="w-full flex items-center justify-center gap-3 h-11 rounded-xl border border-[var(--border-color-strong)] bg-[var(--bg-surface)] text-sm font-semibold text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] disabled:opacity-60 disabled:cursor-not-allowed transition-all mb-5 shadow-sm"
          >
            {submittingGoogle ? (
              <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
              </svg>
            ) : <GoogleIcon />}
            {submittingGoogle ? "Connecting..." : "Continue with Google"}
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="h-px flex-1 bg-[var(--border-color)]" />
            <span className="text-[10px] font-bold text-[var(--text-muted)] uppercase tracking-widest">or</span>
            <div className="h-px flex-1 bg-[var(--border-color)]" />
          </div>

          {/* Email Signup Form */}
          <form onSubmit={handleEmailSignup} className="flex flex-col gap-4">
            <div>
              <input
                type="text"
                placeholder="Full name"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)] transition-all"
                required
              />
            </div>

            <div>
              <input
                type="email"
                placeholder="Email address"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)] transition-all"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)] transition-all"
                required
              />
            </div>

            <div>
              <input
                type="password"
                placeholder="Confirm password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-11 px-4 rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-sm text-[var(--text-primary)] outline-none focus:border-[var(--color-accent)] transition-all"
                required
              />
            </div>

            {/* Error Message */}
            <AnimatePresence>
              {error && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="rounded-xl border border-rose-500/20 bg-rose-500/5 px-4 py-2.5"
                >
                  <p className="text-xs text-rose-500 dark:text-rose-400 font-medium leading-normal">{error}</p>
                </motion.div>
              )}
            </AnimatePresence>

            <button
              type="submit"
              disabled={submittingEmail}
              className="w-full h-11 rounded-xl bg-[var(--color-accent)] hover:bg-[var(--color-accent-hover)] text-sm font-semibold text-white disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2 shadow-sm"
            >
              {submittingEmail && (
                <svg className="h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"/>
                </svg>
              )}
              {submittingEmail ? "Creating account..." : "Create account"}
            </button>
          </form>

          {/* Footer links */}
          <div className="mt-6 text-center text-sm">
            <span className="text-[var(--text-secondary)] font-medium">Already have an account? </span>
            <Link to="/login" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] font-bold transition-colors">
              Sign in
            </Link>
          </div>
        </GlassPanel>
      </div>
    </div>
  );
}

export default SignupPage;
