import { useState } from "react";
import { useNavigate } from "react-router-dom";

import GoogleSignInCard from "../components/auth/GoogleSignInCard";
import { useAuth } from "../context/AuthContext";

function SignupPage() {
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  async function handleGoogleSignup() {
    try {
      setSubmitting(true);
      setError("");
      await loginWithGoogle();
      navigate("/app/dashboard", { replace: true });
    } catch (authError) {
      setError(authError.message || "Google sign-up failed.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center px-4 py-8 sm:px-6 lg:px-8">
      <GoogleSignInCard
        title="Create your AlphaLens workspace"
        description="Sign up with Google to unlock your research dashboard, saved history, and personalized settings."
        buttonLabel="Sign up with Google"
        onClick={handleGoogleSignup}
        loading={submitting}
        error={error}
      />
    </main>
  );
}

export default SignupPage;
