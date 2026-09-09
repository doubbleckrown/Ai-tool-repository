import Link from "next/link";
import ThemeToggle from "@/components/ThemeToggle";

export default function Header() {
  return (
    <header className="border-b border-black/10 dark:border-white/10">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link href="/" className="text-lg font-semibold">
          AI Tools Directory
        </Link>
        <nav className="flex items-center gap-6 text-sm">
          <Link href="/" className="hover:underline">
            Browse
          </Link>
          <Link href="/about" className="hover:underline">
            About
          </Link>
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
