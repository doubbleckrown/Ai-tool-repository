import SearchBar from "@/components/SearchBar";
import CategoryFilterBar from "@/components/CategoryFilterBar";
import ToolGrid from "@/components/ToolGrid";
import FeaturedTools from "@/components/FeaturedTools";
import { getAllCategories, getAllTools } from "@/lib/tools";

export default function HomePage() {
  const tools = getAllTools();
  const categories = getAllCategories();

  return (
    <div className="flex flex-col gap-14">
      <section className="hero-glow relative flex min-h-[22rem] flex-col items-start gap-4 py-4">
        <h1 className="bg-gradient-to-r from-violet-600 via-fuchsia-500 to-sky-500 bg-clip-text text-4xl font-extrabold tracking-tight text-transparent sm:text-5xl">
          Discover useful AI tools
        </h1>
        <p className="max-w-2xl text-black/70 dark:text-white/70">
          Browse a curated directory of AI tools for writing, images, video,
          audio, coding, and more.
        </p>
        <SearchBar />
      </section>

      <FeaturedTools />

      <section className="flex flex-col gap-4">
        <CategoryFilterBar categories={categories} />
        <ToolGrid tools={tools} />
      </section>
    </div>
  );
}
