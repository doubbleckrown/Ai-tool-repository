import { notFound } from "next/navigation";
import SearchBar from "@/components/SearchBar";
import CategoryFilterBar from "@/components/CategoryFilterBar";
import ToolGrid from "@/components/ToolGrid";
import {
  getAllCategories,
  getCategoryBySlug,
  getToolsByCategory,
} from "@/lib/tools";

export function generateStaticParams() {
  return getAllCategories().map((category) => ({ slug: category.slug }));
}

export default async function CategoryPage({
  params,
}: PageProps<"/category/[slug]">) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);

  if (!category) {
    notFound();
  }

  const tools = getToolsByCategory(slug);
  const categories = getAllCategories();

  return (
    <div className="flex flex-col gap-10">
      <section className="flex flex-col items-start gap-4">
        <h1 className="text-3xl font-bold sm:text-4xl">{category.name}</h1>
        <p className="max-w-2xl text-black/70 dark:text-white/70">
          {category.description}
        </p>
        <SearchBar />
      </section>

      <section className="flex flex-col gap-4">
        <CategoryFilterBar categories={categories} activeSlug={slug} />
        <ToolGrid tools={tools} />
      </section>
    </div>
  );
}
