import { useState, useEffect } from "react";
import { Link, useLocation, Outlet, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAuth } from "../../context/AuthContext";
import { useTheme, THEME_MODES } from "../../context/ThemeContext";
import ProfileDropdown from "./ProfileDropdown";
import ChatbotDrawer from "../ChatbotDrawer";

/* ── Nav config ─────────────────────────────────── */
const NAV_ITEMS = [
  {
    group: "Workspace",
    items: [
      {
        label: "Dashboard",
        to: "/app/dashboard",
        icon: (
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"/>
          </svg>
        )
      },
      {
        label: "History",
        to: "/app/history",
        icon: (
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"/>
          </svg>
        )
      }
    ]
  },
  {
    group: "Account",
    items: [
      {
        label: "Profile",
        to: "/app/profile",
        icon: (
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"/>
          </svg>
        )
      },
      {
        label: "Settings",
        to: "/app/settings",
        icon: (
          <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"/>
            <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
          </svg>
        )
      }
    ]
  }
];

/* ── Tooltip wrapper ────────────────────────────── */
function Tooltip({ label, children }) {
  return (
    <div className="relative group/tip">
      {children}
      <div className="pointer-events-none absolute left-full top-1/2 -translate-y-1/2 ml-3 z-50 opacity-0 group-hover/tip:opacity-100 transition-opacity duration-150">
        <div className="whitespace-nowrap rounded-lg bg-[var(--bg-elevated)] border border-[var(--border-color-strong)] px-2.5 py-1.5 text-xs font-medium text-[var(--text-primary)] shadow-lg">
          {label}
        </div>
      </div>
    </div>
  );
}

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

  // Close mobile sidebar on route change
  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  const activeLabel = () => {
    for (const group of NAV_ITEMS) {
      const match = group.items.find(i => i.to === location.pathname);
      if (match) return match.label;
    }
    return "TradeIntel";
  };

  const userInitial = (user?.displayName || user?.email || "U").slice(0, 1).toUpperCase();
  const userName = user?.displayName || user?.email?.split("@")[0] || "Investor";
  const userEmail = user?.email || "";

  return (
    <div className="flex min-h-screen bg-[var(--bg-primary)] text-[var(--text-primary)]">

      {/* ── Mobile overlay ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileOpen(false)}
            className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
          />
        )}
      </AnimatePresence>

      {/* ── SIDEBAR ─────────────────────────────────── */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-[var(--border-color)] bg-[var(--bg-surface)] transition-all duration-300 ease-in-out lg:sticky lg:z-30 h-screen shrink-0 ${
          isCollapsed ? "w-[68px]" : "w-60"
        } ${mobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}
      >

        {/* ─ Sidebar Header ─ */}
        <div className="flex h-14 items-center justify-between px-3 border-b border-[var(--border-color)] shrink-0">
          <Link to="/app/dashboard" className="flex items-center gap-2.5 overflow-hidden min-w-0">
            <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)] shadow-sm">
              <span className="text-[10px] font-bold text-white">TI</span>
            </div>
            <AnimatePresence>
              {!isCollapsed && (
                <motion.span
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -8 }}
                  transition={{ duration: 0.2 }}
                  className="text-sm font-semibold text-[var(--text-primary)] truncate"
                >
                  TradeIntel AI
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          <button
            onClick={() => setIsCollapsed(!isCollapsed)}
            className="hidden lg:flex h-7 w-7 items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all shrink-0"
            title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
          >
            <svg
              className={`h-3.5 w-3.5 transition-transform duration-300 ${isCollapsed ? "rotate-180" : ""}`}
              fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5"
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7"/>
            </svg>
          </button>
        </div>

        {/* ─ User section ─ */}
        {!isCollapsed && user && (
          <div className="px-3 py-3 border-b border-[var(--border-color)] shrink-0">
            <div className="flex items-center gap-2.5 rounded-xl p-2 bg-[var(--bg-secondary)] border border-[var(--border-color)]">
              {user.photoURL ? (
                <img src={user.photoURL} alt="Avatar" className="h-8 w-8 rounded-lg object-cover border border-[var(--border-color)] shrink-0" />
              ) : (
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[var(--color-accent)] text-xs font-bold text-white">
                  {userInitial}
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-xs font-semibold text-[var(--text-primary)] truncate">{userName}</p>
                <p className="text-[10px] text-[var(--text-muted)] truncate">{userEmail}</p>
              </div>
              <span className="shrink-0 text-[9px] font-bold px-1.5 py-0.5 rounded-md bg-[var(--color-accent-light)] text-[var(--color-accent)] uppercase tracking-wide">
                Pro
              </span>
            </div>
          </div>
        )}

        {/* Collapsed user avatar */}
        {isCollapsed && user && (
          <div className="px-3 pt-3 pb-2 border-b border-[var(--border-color)] shrink-0 flex justify-center">
            {user.photoURL ? (
              <img src={user.photoURL} alt="Avatar" className="h-8 w-8 rounded-lg object-cover border border-[var(--border-color)]" />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[var(--color-accent)] text-xs font-bold text-white">
                {userInitial}
              </div>
            )}
          </div>
        )}

        {/* ─ Navigation ─ */}
        <nav className="flex-1 overflow-y-auto py-4 px-3 space-y-5">
          {NAV_ITEMS.map((group) => (
            <div key={group.group} className="space-y-1">
              {!isCollapsed && (
                <p className="px-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-[var(--text-muted)]">
                  {group.group}
                </p>
              )}
              {group.items.map((item) => {
                const isActive = location.pathname === item.to;
                const content = (
                  <Link
                    key={item.to}
                    to={item.to}
                    className={`relative flex items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium transition-all duration-150 ${
                      isActive
                        ? "bg-[var(--color-accent-light)] text-[var(--color-accent)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)]"
                    } ${isCollapsed ? "justify-center" : ""}`}
                  >
                    {isActive && (
                      <motion.div
                        layoutId="sidebar-active"
                        className="absolute left-0 w-0.5 h-5 rounded-r-full bg-[var(--color-accent)]"
                        transition={{ type: "spring", stiffness: 400, damping: 30 }}
                      />
                    )}
                    <span className={`shrink-0 ${isActive ? "text-[var(--color-accent)]" : "text-[var(--text-muted)] group-hover:text-[var(--text-primary)]"}`}>
                      {item.icon}
                    </span>
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

                return isCollapsed ? (
                  <Tooltip key={item.to} label={item.label}>{content}</Tooltip>
                ) : content;
              })}
            </div>
          ))}
        </nav>

        {/* ─ Copilot CTA ─ */}
        <div className="px-3 pb-3 border-t border-[var(--border-color)] pt-3 shrink-0">
          {isCollapsed ? (
            <Tooltip label="AI Copilot">
              <button
                onClick={() => setIsChatOpen(true)}
                className="relative flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--color-accent)] hover:border-[var(--color-accent-medium)] hover:bg-[var(--color-accent-light)] transition-all mx-auto"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"/>
                </svg>
                <span className="absolute top-1 right-1 flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-buy)] opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-buy)]" />
                </span>
              </button>
            </Tooltip>
          ) : (
            <button
              onClick={() => setIsChatOpen(true)}
              className="w-full rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] hover:border-[var(--color-accent-medium)] hover:bg-[var(--color-accent-light)] p-3 text-left transition-all group"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--color-buy)] opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[var(--color-buy)]" />
                  </span>
                  <span className="text-xs font-semibold text-[var(--text-primary)]">AI Copilot</span>
                </div>
                <span className="text-[9px] font-bold uppercase tracking-wide text-[var(--color-buy)]">Live</span>
              </div>
              <p className="text-[11px] text-[var(--text-muted)] leading-relaxed mb-2.5">
                Ask questions about any stock metric or active report.
              </p>
              <div className="flex items-center justify-between rounded-lg bg-[var(--bg-surface)] border border-[var(--border-color)] px-2.5 py-1.5 group-hover:border-[var(--color-accent-medium)] transition-colors">
                <span className="text-[11px] text-[var(--text-muted)]">Ask copilot...</span>
                <svg className="h-3 w-3 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M14 5l7 7m0 0l-7 7m7-7H3"/>
                </svg>
              </div>
            </button>
          )}
        </div>

        {/* ─ Theme + Logout ─ */}
        <div className="px-3 pb-3 border-t border-[var(--border-color)] pt-3 shrink-0 space-y-1">
          {/* Theme toggle */}
          {isCollapsed ? (
            <Tooltip label={themeMode === THEME_MODES.DARK ? "Light mode" : "Dark mode"}>
              <button
                onClick={() => setTheme(themeMode === THEME_MODES.DARK ? THEME_MODES.LIGHT : THEME_MODES.DARK)}
                className="flex h-10 w-10 items-center justify-center rounded-xl border border-[var(--border-color)] bg-[var(--bg-secondary)] text-[var(--text-secondary)] hover:text-[var(--text-primary)] transition-all mx-auto"
              >
                {themeMode === THEME_MODES.DARK ? (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="5"/>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                  </svg>
                ) : (
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                  </svg>
                )}
              </button>
            </Tooltip>
          ) : (
            <div className="flex items-center justify-between px-2.5 py-1.5 rounded-xl">
              <span className="text-xs font-medium text-[var(--text-secondary)]">Appearance</span>
              <div className="flex rounded-lg bg-[var(--bg-secondary)] p-0.5 border border-[var(--border-color)] gap-0.5">
                {["light","dark","system"].map((mode) => (
                  <button
                    key={mode}
                    onClick={() => setTheme(mode)}
                    className={`px-2 py-1 rounded-md text-[9px] font-bold uppercase tracking-wide transition-all ${
                      themeMode === mode
                        ? "bg-[var(--bg-surface)] text-[var(--color-accent)] shadow-sm border border-[var(--border-color)]"
                        : "text-[var(--text-muted)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    {mode.slice(0,3)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Logout */}
          {isCollapsed ? (
            <Tooltip label="Sign out">
              <button
                onClick={() => { logout(); navigate("/login"); }}
                className="flex h-10 w-10 items-center justify-center rounded-xl text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10 transition-all mx-auto"
              >
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
                </svg>
              </button>
            </Tooltip>
          ) : (
            <button
              onClick={() => { logout(); navigate("/login"); }}
              className="flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2 text-sm font-medium text-[var(--text-muted)] hover:text-rose-500 hover:bg-rose-500/10 transition-all"
            >
              <svg className="h-4 w-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"/>
              </svg>
              Sign out
            </button>
          )}
        </div>
      </aside>

      {/* ── MAIN AREA ────────────────────────────────── */}
      <div className="flex flex-1 flex-col min-w-0 h-screen overflow-hidden">

        {/* ─ Top Navbar ─ */}
        <header className="flex h-14 items-center justify-between border-b border-[var(--border-color)] bg-[var(--bg-surface)]/90 px-5 backdrop-blur-xl shrink-0 gap-4">
          {/* Left */}
          <div className="flex items-center gap-3">
            {/* Mobile hamburger */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-secondary)] hover:bg-[var(--bg-secondary)] hover:text-[var(--text-primary)] transition-all lg:hidden"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
              </svg>
            </button>

            {/* Breadcrumb */}
            <nav className="flex items-center gap-1.5 text-sm">
              <span className="text-[var(--text-muted)] font-medium">App</span>
              <svg className="h-3.5 w-3.5 text-[var(--text-muted)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
              </svg>
              <span className="font-semibold text-[var(--text-primary)]">{activeLabel()}</span>
            </nav>
          </div>

          {/* Right */}
          <div className="flex items-center gap-2">
            {/* Notification bell (decorative) */}
            <button className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all relative">
              <svg className="h-4.5 w-4.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.75">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"/>
              </svg>
              <span className="absolute top-1.5 right-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
            </button>

            {/* Theme quick toggle */}
            <button
              onClick={() => setTheme(themeMode === THEME_MODES.DARK ? THEME_MODES.LIGHT : THEME_MODES.DARK)}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-[var(--bg-secondary)] transition-all"
            >
              {themeMode === THEME_MODES.DARK ? (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <circle cx="12" cy="12" r="5"/>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42"/>
                </svg>
              ) : (
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
                </svg>
              )}
            </button>

            {/* Profile dropdown */}
            <ProfileDropdown />
          </div>
        </header>

        {/* ─ Page content ─ */}
        <main className="flex-1 overflow-y-auto bg-[var(--bg-primary)]">
          <div className="mx-auto max-w-[1400px] px-6 py-6">
            <Outlet />
          </div>
        </main>
      </div>

      {/* AI Copilot */}
      <ChatbotDrawer isOpen={isChatOpen} onClose={() => setIsChatOpen(false)} onOpen={() => setIsChatOpen(true)} />
    </div>
  );
}

export default ProtectedLayout;
