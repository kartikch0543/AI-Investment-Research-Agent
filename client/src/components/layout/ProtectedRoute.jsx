import { Navigate, Outlet, useLocation } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function ProtectedRoute() {
  const { isAuthenticated, authLoading } = useAuth();
  const location = useLocation();

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 bg-[var(--bg-primary)]">
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] shadow-sm">
          Restoring your TradeIntel workspace...
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
