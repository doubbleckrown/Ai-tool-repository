"use client";

import { useSyncExternalStore } from "react";

const listeners = new Set<() => void>();

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => listeners.delete(listener);
}

function getSnapshot() {
  return document.documentElement.classList.contains("dark");
}

function getServerSnapshot() {
  return false;
}

function setTheme(isDark: boolean) {
  document.documentElement.classList.toggle("dark", isDark);
  try {
    localStorage.setItem("theme", isDark ? "dark" : "light");
  } catch {
    // localStorage may be unavailable (e.g. private browsing); theme just won't persist.
  }
  listeners.forEach((listener) => listener());
}

export default function ThemeToggle() {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  return (
    <button
      type="button"
      onClick={() => setTheme(!isDark)}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      className="rounded-lg border border-black/15 px-3 py-1.5 text-sm transition hover:border-black/35 dark:border-white/20 dark:hover:border-white/40"
    >
      {isDark ? "☀️ Light" : "🌙 Dark"}
    </button>
  );
}
