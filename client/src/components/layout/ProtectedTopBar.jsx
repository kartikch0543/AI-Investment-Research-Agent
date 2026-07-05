import { Link, useLocation } from "react-router-dom";

import ThemeToggle from "../theme/ThemeToggle";
import ProfileDropdown from "./ProfileDropdown";

const navigationItems = [
  { label: "Dashboard", to: "/app/dashboard" },
  { label: "History", to: "/app/history" },
  { label: "Settings", to: "/app/settings" }
];

function ProtectedTopBar() {
  const location = useLocation();

  return (
    <header className="sticky top-0 z-20 border-b border-slate-200/70 bg-white/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-950/50">
      <div className="mx-auto flex max-w-7xl flex-col gap-4 px-4 py-4 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:px-8">
        <div className="flex items-center gap-4">
          <Link to="/app/dashboard" className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-sm font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">
              AL
            </div>
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.24em] text-signal dark:text-cyan-300">
                AlphaLens AI
              </p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Investment research platform</p>
            </div>
          </Link>

          <nav className="hidden items-center gap-2 lg:flex">
            {navigationItems.map((item) => {
              const isActive = location.pathname === item.to;

              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    isActive
                      ? "bg-slate-900 text-white dark:bg-cyan-400 dark:text-slate-950"
                      : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-300 dark:hover:bg-white/10 dark:hover:text-white"
                  }`}
                >
                  {item.label}
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <ThemeToggle />
          <ProfileDropdown />
        </div>
      </div>
    </header>
  );
}

export default ProtectedTopBar;
