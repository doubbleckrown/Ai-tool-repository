import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";
import CommandPalette from "@/components/CommandPalette";

export default function Header() {
  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-3 px-6 py-4">
        <Link href="/" className="text-lg font-semibold">
          AI Tools Directory
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          <Link href="/" className="hover:underline">
            Browse
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <CommandPalette />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
