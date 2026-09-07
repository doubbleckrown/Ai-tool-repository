import SearchBar from "@/components/SearchBar";
import ToolGrid from "@/components/ToolGrid";
import { filterTools, getAllTools } from "@/lib/tools";

export default async function SearchPage({
  searchParams,
}: PageProps<"/search">) {
  const { q } = await searchParams;
  const query = Array.isArray(q) ? q[0] : q ?? "";

  const tools = filterTools(getAllTools(), { query });

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col items-start gap-4">
        <h1 className="text-3xl font-bold sm:text-4xl">Search results</h1>
        <SearchBar defaultValue={query} />
        <p className="text-sm text-black/60 dark:text-white/60">
          {query
            ? `${tools.length} result${tools.length === 1 ? "" : "s"} for "${query}"`
            : "Enter a search term to find AI tools."}
        </p>
      </section>

      <ToolGrid tools={tools} />
    </div>
  );
}
