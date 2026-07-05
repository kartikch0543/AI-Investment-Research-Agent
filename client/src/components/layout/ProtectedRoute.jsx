import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function ProtectedRoute() {
  const { isAuthenticated, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6">
        <div className="rounded-[28px] border border-slate-200/70 bg-white/70 px-8 py-6 text-sm text-slate-600 shadow-panel backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/65 dark:text-slate-300 dark:shadow-glow">
          Restoring your AlphaLens workspace...
        </div>
      </main>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
