import SearchBar from "@/components/SearchBar";
import CategoryFilterBar from "@/components/CategoryFilterBar";
import ToolGrid from "@/components/ToolGrid";
import { getAllCategories, getAllTools } from "@/lib/tools";

export default function HomePage() {
  const tools = getAllTools();
  const categories = getAllCategories();

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col items-start gap-4">
        <h1 className="text-3xl font-bold sm:text-4xl">
          Discover useful AI tools
        </h1>
        <p className="max-w-2xl text-black/70 dark:text-white/70">
          Browse a curated directory of AI tools for writing, images, video,
          audio, coding, and more.
        </p>
        <SearchBar />
      </section>

      <section className="flex flex-col gap-4">
        <CategoryFilterBar categories={categories} />
        <ToolGrid tools={tools} />
      </section>
    </div>
  );
}
