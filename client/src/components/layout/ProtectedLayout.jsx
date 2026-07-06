import { useState, useEffect } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useTheme, THEME_MODES } from "../../context/ThemeContext";
import ThemeToggle from "../theme/ThemeToggle";
import ProfileDropdown from "./ProfileDropdown";
import ChatbotDrawer from "../ChatbotDrawer";

const NAV_GROUPS = [
  {
    title: "Workspace",
    items: [
      {
        label: "Dashboard",
        to: "/app/dashboard",
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2H6a2 2 0 01-2-2v-4zM14 16a2 2 0 012-2h2a2 2 0 012 2v4a2 2 0 01-2 2h-2a2 2 0 01-2-2v-4z" />
          </svg>
        )
      },
      {
        label: "History",
        to: "/app/history",
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        )
      }
    ]
  },
  {
    title: "Account",
    items: [
      {
        label: "Profile",
        to: "/app/profile",
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
        )
      },
      {
        label: "Settings",
        to: "/app/settings",
        icon: (
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        )
      }
    ]
  }
];

function ProtectedLayout() {
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    return saved === "true";
  });
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { logout, user } = useAuth();
  const { themeMode, setTheme } = useTheme();

  useEffect(() => {
    localStorage.setItem("sidebar-collapsed", isCollapsed.toString());
  }, [isCollapsed]);

  const activePageLabel = () => {
    for (const group of NAV_GROUPS) {
      const matched = group.items.find(item => item.to === location.pathname);
      if (matched) return matched.label;
    }
    return "TradeIntel";
  };

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">
      {/* Mobile Drawer Backdrop */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* Sidebar - Desktop and Mobile */}
      <aside
        className={`fixed inset-y-0 left-0 z-35 flex flex-col border-r border-[var(--border-color)] bg-[var(--bg-surface)] transition-all duration-300 ease-in-out lg:sticky lg:z-30 h-screen shrink-0
          ${isCollapsed ? "w-20" : "w-64"}
          ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >
        {/* Sidebar Header */}
        <div className="flex h-16 items-center justify-between px-4 border-b border-[var(--border-color)] shrink-0">
          <Link to="/app/dashboard" className="flex items-center gap-3 overflow-hidden">
            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)] text-xs font-bold text-white dark:text-[var(--text-inverse)] shadow-sm">
              TI
            </div>
            {!isCollapsed && (
              <motion.div
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                className="flex flex-col"
              >
                <span className="text-xs font-bold uppercase tracking-[0.24em] text-[var(--text-primary)]">
                  TradeIntel
                </span>
                <span className="text-[10px] text-[var(--text-muted)]">Research Hub</span>
              </motion.div>
            )}
          </Link>

          {/* Toggle sidebar button (Desktop) */}
          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden h-8 w-8 items-center justify-center rounded-lg border border-[var(--border-color)] bg-[var(--bg-primary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] lg:flex"
            style={{ cursor: "pointer" }}
          >
            <svg
              className={`h-4 w-4 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        </div>

        {/* User Profile Summary (Expanded Sidebar View) */}
        {!isCollapsed && user && (
          <div className="px-4 py-3 border-b border-[var(--border-color)] bg-[var(--bg-secondary)]/30 shrink-0">
            <div className="flex items-center gap-3">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="h-8 w-8 rounded-lg object-cover border border-[var(--border-color)]" />
              ) : (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)] text-xs font-bold text-white dark:text-[var(--text-inverse)] shadow-sm">
                  {(user.displayName || user.email || "U").slice(0, 1).toUpperCase()}
                </div>
              )}
              <div className="flex flex-col min-w-0">
                <span className="text-xs font-semibold text-[var(--text-primary)] truncate">{user.displayName || "TradeIntel User"}</span>
                <span className="text-[10px] text-[var(--text-muted)] truncate">{user.email}</span>
              </div>
            </div>
          </div>
        )}

        {/* Navigation Items */}
        <nav className="flex-1 space-y-5 overflow-y-auto p-4">
          {NAV_GROUPS.map((group) => (
            <div key={group.title} className="space-y-1.5">
              {!isCollapsed && (
                <h3 className="px-3.5 text-[10px] font-bold uppercase tracking-wider text-[var(--text-muted)]">
                  {group.title}
                </h3>
              )}
              <div className="space-y-1">
                {group.items.map((item) => {
                  const isActive = location.pathname === item.to;
                  return (
                    <Link
                      key={item.to}
                      to={item.to}
                      onClick={() => setMobileOpen(false)}
                      className={`group relative flex items-center gap-3 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all duration-200
                        ${isActive
                          ? "bg-[var(--color-accent-light)] text-[var(--color-accent)] shadow-sm border border-[var(--color-accent)]/10"
                          : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                        }`}
                    >
                      {isActive && (
                        <motion.div
                          layoutId="activeIndicator"
                          className="absolute left-0 w-1 h-5 rounded-r bg-[var(--color-accent)]"
                          transition={{ type: "spring", stiffness: 380, damping: 30 }}
                        />
                      )}
                      <div className={`shrink-0 transition-colors ${isActive ? "text-[var(--color-accent)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"}`}>
                        {item.icon}
                      </div>
                      {!isCollapsed && (
                        <motion.span
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          className="truncate"
                        >
                          {item.label}
                        </motion.span>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        {/* Pinned Copilot Block */}
        <div className="p-3 border-t border-[var(--border-color)] shrink-0">
          {isCollapsed ? (
            <button
              onClick={() => setIsChatOpen(true)}
              className="group relative flex h-12 w-12 items-center justify-center rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all mx-auto"
              style={{ cursor: "pointer" }}
              title="Open Copilot"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
              </svg>
              <span className="absolute top-1 right-1 flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
            </button>
          ) : (
            <div 
              onClick={() => setIsChatOpen(true)}
              className="group rounded-2xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] p-3 border border-[var(--border-color)] hover:border-[var(--color-accent)] cursor-pointer transition-all duration-200"
            >
              <div className="flex items-center justify-between mb-1.5">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span className="text-[11px] font-semibold text-[var(--text-primary)]">TradeIntel Copilot</span>
                </div>
                <span className="text-[9px] uppercase tracking-wider text-emerald-500 font-bold">Online</span>
              </div>
              <p className="text-[10px] text-[var(--text-muted)] leading-relaxed mb-2">
                Ask anything about active stock metrics.
              </p>
              <div className="relative">
                <div className="w-full flex items-center justify-between rounded-xl bg-[var(--bg-surface)] px-2.5 py-1.5 text-[10px] border border-[var(--border-color)] text-[var(--text-muted)]">
                  <span>Ask copilot...</span>
                  <svg className="h-3 w-3 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Theme Toggle row at bottom */}
        <div className="py-2 border-t border-[var(--border-color)] shrink-0 flex justify-center">
          {isCollapsed ? (
            <button
              onClick={() => setTheme(themeMode === THEME_MODES.DARK ? THEME_MODES.LIGHT : THEME_MODES.DARK)}
              className="flex h-10 w-10 items-center justify-center rounded-xl bg-[var(--bg-secondary)] hover:bg-[var(--bg-primary)] border border-[var(--border-color)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all"
              style={{ cursor: "pointer" }}
              title="Toggle Appearance"
            >
              {themeMode === THEME_MODES.DARK ? (
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.343l-.707-.707M14 12a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              ) : (
                <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
                </svg>
              )}
            </button>
          ) : (
            <div className="w-full px-4 flex items-center justify-between text-xs text-[var(--text-secondary)]">
              <span className="font-medium">Theme</span>
              <div className="flex rounded-lg bg-[var(--bg-secondary)] p-0.5 border border-[var(--border-color)]">
                {["light", "dark", "system"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setTheme(mode)}
                    className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase transition-all ${
                      themeMode === mode 
                        ? "bg-[var(--bg-surface)] text-[var(--color-accent)] shadow-sm" 
                        : "hover:text-[var(--text-primary)]"
                    }`}
                    style={{ cursor: "pointer" }}
                  >
                    {mode.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Logout at bottom */}
        <div className="p-3 border-t border-[var(--border-color)] shrink-0">
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="flex w-full items-center justify-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-rose-500 hover:bg-rose-500/10 transition-colors"
            style={{ cursor: "pointer" }}
          >
            <svg className="h-5 w-5 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            {!isCollapsed && <span>Logout</span>}
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col min-w-0 h-screen overflow-hidden">
        {/* Sticky Top Navbar */}
        <header className="flex h-16 items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-surface)]/80 px-6 backdrop-blur-md shrink-0">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="rounded-lg p-2 text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] lg:hidden"
              style={{ cursor: "pointer" }}
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            <div className="flex items-center gap-2 text-sm font-medium text-[var(--text-secondary)]">
              <span>App</span>
              <span className="text-[var(--text-muted)]">/</span>
              <span className="text-[var(--text-primary)] font-semibold">{activePageLabel()}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <ThemeToggle />
            <ProfileDropdown />
          </div>
        </header>

        {/* Content Canvas */}
        <main className="flex-1 overflow-y-auto px-6 py-6 bg-[var(--bg-primary)]">
          <div className="mx-auto max-w-full">
            <Outlet />
          </div>
        </main>
      </div>

      {/* Contextual AI Assistant Chat Drawer */}
      <ChatbotDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} onOpen={() => setIsChatOpen(true)} />
    </div>
  );
}

export default ProtectedLayout;
