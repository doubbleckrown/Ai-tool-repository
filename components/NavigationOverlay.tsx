"use client";

import { useSyncExternalStore } from "react";
import {
  isNavigationLoaderVisible,
  subscribeNavigationLoader,
} from "@/lib/navigationLoader";

function getServerSnapshot() {
  return false;
}

export default function NavigationOverlay() {
  const visible = useSyncExternalStore(
    subscribeNavigationLoader,
    isNavigationLoaderVisible,
    getServerSnapshot
  );

  if (!visible) return null;

  return (
    <div className="animate-fade-in fixed inset-0 z-[100] flex flex-col items-center justify-center gap-4 bg-background">
      <div
        aria-hidden="true"
        className="h-10 w-10 animate-spin rounded-full border-2 border-black/15 border-t-black/70 dark:border-white/15 dark:border-t-white/70"
      />
      <p className="text-sm font-medium text-black/70 dark:text-white/70">
        Built by Doubbleckrown
      </p>
    </div>
  );
}
