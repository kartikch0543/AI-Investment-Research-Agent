import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

import GoogleSignInCard from "../components/auth/GoogleSignInCard";

import { useAuth } from "../context/AuthContext";

function LoginPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();
  const { loginWithGoogle } = useAuth();

  async function handleGoogleLogin() {
    try {
      setSubmitting(true);
      setError("");
      await loginWithGoogle();
      navigate(location.state?.from?.pathname || "/app/dashboard", { replace: true });
    } catch (authError) {
      setError(authError.message || "Google sign-in failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <GoogleSignInCard
        title="Sign in to AlphaLens AI"
        description="Use your Google account to access your investment research workspace and continue where you left off."
        buttonLabel="Continue with Google"
        onClick={handleGoogleLogin}
        loading={submitting}
        error={error}
      />
    </main>
  );
}

export default LoginPage;
