import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../context/AuthContext";
import { useTheme, THEME_MODES } from "../context/ThemeContext";

/* ── Icons ───────────────────────────────────────── */
const GoogleIcon = () => (
  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none">
    <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
    <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
    <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" fill="#FBBC05"/>
    <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
  </svg>
);
const EyeIcon = ({ open }) => open ? (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
    <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
  </svg>
) : (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"/>
  </svg>
);
const SunIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="5"/><path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
  </svg>
);
const MoonIcon = () => (
  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
  </svg>
);

function FloatingInput({ id, label, type = "text", value, onChange, error, rightElement }) {
  const [focused, setFocused] = useState(false);
  const hasValue = value.length > 0;
  const isFloating = focused || hasValue;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-3.5 pointer-events-none font-medium transition-all duration-200 z-10 ${
          isFloating
            ? "top-1.5 text-[10px] text-[var(--color-accent)]"
            : "top-1/2 -translate-y-1/2 text-sm text-[var(--text-muted)]"
        }`}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        value={value}
        onChange={onChange}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        className={`w-full h-[3.25rem] pt-4 pb-1 px-3.5 rounded-xl border text-sm text-[var(--text-primary)] bg-[var(--bg-secondary)] outline-none transition-all duration-200 font-medium ${
          error
            ? "border-rose-400 focus:border-rose-500 focus:ring-2 focus:ring-rose-400/20"
            : focused
            ? "border-[var(--color-accent)] ring-2 ring-[var(--color-accent-light)]"
            : "border-[var(--border-color)] hover:border-[var(--border-color-strong)]"
        }`}
        style={{ paddingRight: rightElement ? "2.75rem" : undefined }}
      />
      {rightElement && (
        <div className="absolute right-3 top-1/2 -translate-y-1/2">{rightElement}</div>
      )}
    </div>
  );
}

function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submittingGoogle, setSubmittingGoogle] = useState(false);
  const [submittingEmail, setSubmittingEmail] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithGoogle, loginWithEmailPassword } = useAuth();
  const { themeMode, setTheme } = useTheme();

  async function handleEmailLogin(event) {
    event.preventDefault();
    if (!email.trim() || !password) { setError("Please fill in all fields."); return; }
    try {
      setSubmittingEmail(true);
      setError("");
      await loginWithEmailPassword(email.trim(), password);
      navigate(location.state?.from?.pathname || "/app/dashboard", { replace: true });
    } catch (authError) {
      console.error("Email Login Error:", authError);
      setError(authError.code === "auth/invalid-credential"
        ? "Incorrect email or password. Please try again."
        : `Login failed: ${authError.message}`);
    } finally {
      setSubmittingEmail(false);
    }
  }

  async function handleGoogleLogin() {
    setError("");
    setSubmittingGoogle(true);
    try {
      await loginWithGoogle();
      navigate(location.state?.from?.pathname || "/app/dashboard", { replace: true });
    } catch (authError) {
      console.error("Google Login Error:", authError);
      setError(`Google sign-in failed: ${authError.message}`);
      setSubmittingGoogle(false);
    }
  }

  return (
    <div className="min-h-screen flex bg-[var(--bg-primary)]">
      {/* ── Left decorative panel (desktop only) ── */}
      <div className="hidden lg:flex flex-col justify-between w-[45%] p-10 bg-[var(--color-accent)] relative overflow-hidden">
        {/* Abstract shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-white/10" />
          <div className="absolute top-1/3 -left-12 w-48 h-48 rounded-full bg-white/5" />
          <div className="absolute bottom-24 right-12 w-32 h-32 rounded-2xl bg-white/10 rotate-12" />
          <div className="absolute top-2/3 left-1/4 w-16 h-16 rounded-full bg-white/15" />
        </div>

        <Link to="/" className="relative flex items-center gap-2.5 w-fit">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
            <span className="text-sm font-bold text-white">TI</span>
          </div>
          <span className="text-base font-semibold text-white">TradeIntel AI</span>
        </Link>

        <div className="relative">
          <blockquote className="text-white">
            <p className="text-2xl font-semibold leading-snug mb-6">
              "Research-grade AI analysis that used to require a team of analysts — now available in seconds."
            </p>
            <footer className="text-white/70 text-sm">
              AI Investment Research Platform · Built with LangGraph
            </footer>
          </blockquote>
        </div>

        <div className="relative flex items-center gap-3 text-sm text-white/60">
          <span>7 AI Agents</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>Transparent Scoring</span>
          <span className="w-1 h-1 rounded-full bg-white/40" />
          <span>Explainable AI</span>
        </div>
      </div>

      {/* ── Right form panel ── */}
      <div className="flex-1 flex flex-col">
        {/* Top bar */}
        <div className="flex items-center justify-between p-6">
          <Link to="/" className="flex items-center gap-2 lg:hidden">
            <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-[var(--color-accent)]">
              <span className="text-[10px] font-bold text-white">TI</span>
            </div>
            <span className="text-sm font-semibold text-[var(--text-primary)]">TradeIntel AI</span>
          </Link>
          <div className="ml-auto flex items-center gap-3">
            <button
              onClick={() => setTheme(themeMode === THEME_MODES.DARK ? THEME_MODES.LIGHT : THEME_MODES.DARK)}
              className="flex h-9 w-9 items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
            >
              {themeMode === THEME_MODES.DARK ? <SunIcon /> : <MoonIcon />}
            </button>
            <Link to="/signup" className="text-sm font-medium text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-colors">
              Create account
            </Link>
          </div>
        </div>

        {/* Centered form */}
        <div className="flex-1 flex items-center justify-center px-6 py-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: [0.16,1,0.3,1] }}
            className="w-full max-w-[400px]"
          >
            <div className="mb-8">
              <h1 className="text-2xl font-bold tracking-tight text-[var(--text-primary)] mb-2">
                Welcome back
              </h1>
              <p className="text-sm text-[var(--text-secondary)]">
                Sign in to your TradeIntel workspace
              </p>
            </div>

            {/* Google */}
            <button
              type="button"
              id="login-google-btn"
              onClick={handleGoogleLogin}
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
              <span className="text-xs font-semibold text-[var(--text-muted)] uppercase tracking-widest">or</span>
              <div className="h-px flex-1 bg-[var(--border-color)]" />
            </div>

            {/* Email form */}
            <form id="login-form" onSubmit={handleEmailLogin} className="flex flex-col gap-4">
              <FloatingInput
                id="login-email"
                label="Email address"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                error={!!error}
              />
              <FloatingInput
                id="login-password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                error={!!error}
                rightElement={
                  <button
                    type="button"
                    onClick={() => setShowPassword(s => !s)}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors"
                  >
                    <EyeIcon open={showPassword} />
                  </button>
                }
              />

              {/* Error */}
              <AnimatePresence>
                {error && (
                  <motion.div
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-4 py-3"
                  >
                    <p className="text-sm text-rose-500 dark:text-rose-400 leading-relaxed">{error}</p>
                  </motion.div>
                )}
              </AnimatePresence>

              <button
                id="login-submit-btn"
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
                {submittingEmail ? "Signing in..." : "Sign in"}
              </button>
            </form>

            {/* Footer links */}
            <div className="mt-6 flex items-center justify-between text-sm">
              <Link to="/forgot-password" className="text-[var(--text-muted)] hover:text-[var(--color-accent)] transition-colors font-medium">
                Forgot password?
              </Link>
              <Link to="/signup" className="text-[var(--color-accent)] hover:text-[var(--color-accent-hover)] transition-colors font-semibold">
                Create account →
              </Link>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
