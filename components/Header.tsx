import ThemeToggle from "@/components/ThemeToggle";
import CommandPalette from "@/components/CommandPalette";
import NavLink from "@/components/NavLink";

export default function Header() {
  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-y-3 px-6 py-4">
        <NavLink href="/" className="text-lg font-semibold">
          AI Tools Directory
        </NavLink>
        <nav className="flex items-center gap-4 text-sm">
          <NavLink href="/" className="hover:underline">
            Browse
          </NavLink>
          <NavLink href="/about" className="hover:underline">
            About
          </NavLink>
          <CommandPalette />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
