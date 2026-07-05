import { useState } from "react";
import { Link } from "react-router-dom";

import { useAuth } from "../../context/AuthContext";

function getInitials(name = "") {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function ProfileDropdown() {
  const [open, setOpen] = useState(false);
  const { user, logout } = useAuth();

  return (
    <div className="relative">
      <button
        type="button"
        onClick={() => setOpen((currentOpen) => !currentOpen)}
        className="flex items-center gap-3 rounded-full border border-slate-200/70 bg-white/70 px-3 py-2 text-left shadow-lg shadow-slate-200/40 backdrop-blur hover:-translate-y-0.5 dark:border-white/10 dark:bg-white/5 dark:shadow-none"
      >
        {user?.photoURL ? (
          <img
            src={user.photoURL}
            alt={user.displayName || "User"}
            className="h-10 w-10 rounded-full object-cover"
          />
        ) : (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white dark:bg-cyan-400 dark:text-slate-950">
            {getInitials(user?.displayName || user?.email || "A")}
          </div>
        )}
        <div className="hidden min-w-0 sm:block">
          <p className="truncate text-sm font-semibold text-slate-900 dark:text-white">
            {user?.displayName || "AlphaLens User"}
          </p>
          <p className="truncate text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
        </div>
      </button>

      {open ? (
        <div className="absolute right-0 top-[calc(100%+0.75rem)] z-20 w-72 rounded-3xl border border-slate-200/70 bg-white/90 p-3 shadow-2xl shadow-slate-200/70 backdrop-blur-xl dark:border-white/10 dark:bg-slate-900/90 dark:shadow-black/20">
          <div className="rounded-2xl bg-slate-50 px-4 py-3 dark:bg-white/5">
            <p className="text-sm font-semibold text-slate-900 dark:text-white">
              {user?.displayName || "AlphaLens User"}
            </p>
            <p className="mt-1 text-xs text-slate-500 dark:text-slate-400">{user?.email}</p>
          </div>

          <div className="mt-3 flex flex-col gap-1">
            <Link
              to="/app/profile"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Profile
            </Link>
            <Link
              to="/app/settings"
              onClick={() => setOpen(false)}
              className="rounded-2xl px-4 py-3 text-sm font-medium text-slate-700 hover:bg-slate-100 dark:text-slate-200 dark:hover:bg-white/10"
            >
              Settings
            </Link>
            <button
              type="button"
              onClick={async () => {
                setOpen(false);
                await logout();
              }}
              className="rounded-2xl px-4 py-3 text-left text-sm font-medium text-rose-600 hover:bg-rose-50 dark:text-rose-300 dark:hover:bg-rose-400/10"
            >
              Logout
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default ProfileDropdown;
