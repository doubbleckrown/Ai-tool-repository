"use client";

import {
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type KeyboardEvent,
} from "react";
import { useRouter } from "next/navigation";
import { getAllTools } from "@/lib/tools";
import ToolLogo from "@/components/ToolLogo";

const ALL_TOOLS = getAllTools();
const MAX_RESULTS = 8;

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);
  const openRef = useRef(open);
  const router = useRouter();

  const trimmed = query.trim().toLowerCase();
  const results = (
    trimmed
      ? ALL_TOOLS.filter(
          (tool) =>
            tool.name.toLowerCase().includes(trimmed) ||
            tool.tagline.toLowerCase().includes(trimmed) ||
            tool.description.toLowerCase().includes(trimmed)
        )
      : ALL_TOOLS
  ).slice(0, MAX_RESULTS);

  useEffect(() => {
    openRef.current = open;
  }, [open]);

  function openPalette() {
    setQuery("");
    setActiveIndex(0);
    setOpen(true);
  }

  useEffect(() => {
    function onKeyDown(e: globalThis.KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        if (openRef.current) {
          setOpen(false);
        } else {
          setQuery("");
          setActiveIndex(0);
          setOpen(true);
        }
      } else if (e.key === "Escape") {
        setOpen(false);
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, []);

  useEffect(() => {
    if (!open) {
      document.body.style.overflow = "";
      return;
    }
    document.body.style.overflow = "hidden";
    const frame = requestAnimationFrame(() => inputRef.current?.focus());
    return () => cancelAnimationFrame(frame);
  }, [open]);

  function selectTool(id: string) {
    setOpen(false);
    router.push(`/tool/${id}`);
  }

  function onQueryChange(e: ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value);
    setActiveIndex(0);
  }

  function onInputKeyDown(e: KeyboardEvent<HTMLInputElement>) {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => Math.max(i - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      const tool = results[activeIndex];
      if (tool) selectTool(tool.id);
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={openPalette}
        className="flex items-center gap-2 rounded-lg border border-black/15 px-3 py-1.5 text-sm text-black/60 transition hover:border-black/35 dark:border-white/20 dark:text-white/60 dark:hover:border-white/40"
      >
        <span aria-hidden="true">🔍</span>
        <span className="hidden sm:inline">Search</span>
        <kbd className="hidden rounded border border-black/15 px-1.5 py-0.5 font-sans text-xs text-black/50 sm:inline dark:border-white/20 dark:text-white/50">
          ⌘K
        </kbd>
      </button>

      {open && (
        <div
          className="animate-fade-in fixed inset-0 z-50 flex items-start justify-center bg-black/50 px-4 pt-[15vh]"
          onClick={() => setOpen(false)}
        >
          <div
            role="dialog"
            aria-modal="true"
            aria-label="Search tools"
            onClick={(e) => e.stopPropagation()}
            className="animate-palette-in w-full max-w-lg overflow-hidden rounded-xl border border-black/10 bg-white shadow-2xl dark:border-white/15 dark:bg-neutral-900"
          >
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={onQueryChange}
              onKeyDown={onInputKeyDown}
              placeholder="Search AI tools..."
              className="w-full border-b border-black/10 bg-transparent px-4 py-3 text-sm outline-none dark:border-white/15"
              aria-label="Search AI tools"
            />
            <div className="max-h-80 overflow-y-auto p-2">
              {results.length === 0 ? (
                <p className="px-3 py-6 text-center text-sm text-black/50 dark:text-white/50">
                  No tools found.
                </p>
              ) : (
                results.map((tool, index) => (
                  <button
                    key={tool.id}
                    type="button"
                    onClick={() => selectTool(tool.id)}
                    onMouseEnter={() => setActiveIndex(index)}
                    className={`flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition ${
                      index === activeIndex ? "bg-black/5 dark:bg-white/10" : ""
                    }`}
                  >
                    <ToolLogo id={tool.id} name={tool.name} />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-medium">
                        {tool.name}
                      </span>
                      <span className="block truncate text-xs text-black/60 dark:text-white/60">
                        {tool.tagline}
                      </span>
                    </span>
                  </button>
                ))
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
