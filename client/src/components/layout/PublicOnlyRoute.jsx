import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function PublicOnlyRoute() {
  const { isAuthenticated, authLoading } = useAuth();

  if (authLoading) {
    return (
      <main className="flex min-h-screen items-center justify-center px-6 bg-[var(--bg-primary)]">
        <div className="rounded-2xl border border-[var(--border-color)] bg-[var(--bg-surface)] px-6 py-4 text-xs font-semibold text-[var(--text-secondary)] shadow-sm">
          Preparing your TradeIntel experience...
        </div>
      </main>
    );
  }

  if (isAuthenticated) {
    return <Navigate to="/app/dashboard" replace />;
  }

  return <Outlet />;
}

export default PublicOnlyRoute;
