import type { Category } from "@/lib/types";
import NavLink from "@/components/NavLink";
import { tapBounce } from "@/lib/ui";

export default function CategoryFilterBar({
  categories,
  activeSlug,
}: {
  categories: Category[];
  activeSlug?: string;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <NavLink
        href="/"
        className={`${tapBounce} rounded-full border px-3 py-1.5 text-sm ${
          !activeSlug
            ? "border-foreground bg-foreground text-background"
            : "border-black/15 hover:border-black/35 dark:border-white/20 dark:hover:border-white/40"
        }`}
      >
        All
      </NavLink>
      {categories.map((category) => (
        <NavLink
          key={category.slug}
          href={`/category/${category.slug}`}
          className={`${tapBounce} rounded-full border px-3 py-1.5 text-sm ${
            activeSlug === category.slug
              ? "border-foreground bg-foreground text-background"
              : "border-black/15 hover:border-black/35 dark:border-white/20 dark:hover:border-white/40"
          }`}
        >
          {category.name}
        </NavLink>
      ))}
    </div>
  );
}
