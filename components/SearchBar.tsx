import { tapBounce } from "@/lib/ui";

export default function SearchBar({ defaultValue = "" }: { defaultValue?: string }) {
  return (
    <form action="/search" method="get" className="flex w-full max-w-xl gap-2">
      <input
        type="text"
        name="q"
        defaultValue={defaultValue}
        placeholder="Search AI tools by name or description..."
        className="w-full rounded-lg border border-black/15 bg-white px-4 py-2.5 text-sm outline-none focus:border-black/40 dark:border-white/20 dark:bg-black dark:focus:border-white/50"
        aria-label="Search AI tools"
      />
      <button
        type="submit"
        className={`${tapBounce} shrink-0 rounded-lg bg-foreground px-4 py-2.5 text-sm font-medium text-background hover:opacity-90`}
      >
        Search
      </button>
    </form>
  );
}
