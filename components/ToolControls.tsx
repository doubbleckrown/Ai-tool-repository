"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";
import type { Category, Pricing, Tool } from "@/lib/types";
import { filterTools, sortToolsByName, type NameSortDirection } from "@/lib/tools";
import ToolGrid from "@/components/ToolGrid";
import { showNavigationLoader } from "@/lib/navigationLoader";

const PRICE_OPTIONS: { value: Pricing | ""; label: string }[] = [
  { value: "", label: "All Prices" },
  { value: "free", label: "Free" },
  { value: "freemium", label: "Freemium" },
  { value: "paid", label: "Paid" },
];

const NAME_OPTIONS: { value: NameSortDirection | ""; label: string }[] = [
  { value: "", label: "Name" },
  { value: "asc", label: "Name: A–Z" },
  { value: "desc", label: "Name: Z–A" },
];

const selectClass =
  "w-full flex-1 min-w-[9rem] rounded-xl border border-black/15 bg-white px-4 py-3.5 text-base font-medium outline-none focus:border-black/40 dark:border-white/20 dark:bg-black dark:focus:border-white/50";

export default function ToolControls({
  tools,
  categories,
  activeCategorySlug,
}: {
  tools: Tool[];
  categories?: Category[];
  activeCategorySlug?: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const price = (searchParams.get("price") ?? "") as Pricing | "";
  const nameSort = (searchParams.get("sort") ?? "") as NameSortDirection | "";

  let visible = filterTools(tools, { pricing: price || undefined });
  if (nameSort) {
    visible = sortToolsByName(visible, nameSort);
  }

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) {
      params.set(key, value);
    } else {
      params.delete(key);
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  function onCategoryChange(e: ChangeEvent<HTMLSelectElement>) {
    const slug = e.target.value;
    const href = slug ? `/category/${slug}` : "/";
    showNavigationLoader(() => router.push(href));
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap gap-3">
        {categories && (
          <select
            value={activeCategorySlug ?? ""}
            onChange={onCategoryChange}
            aria-label="Filter by category"
            className={selectClass}
          >
            <option value="">All Categories</option>
            {categories.map((category) => (
              <option key={category.slug} value={category.slug}>
                {category.name}
              </option>
            ))}
          </select>
        )}
        <select
          value={price}
          onChange={(e) => updateParam("price", e.target.value)}
          aria-label="Filter by price"
          className={selectClass}
        >
          {PRICE_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
        <select
          value={nameSort}
          onChange={(e) => updateParam("sort", e.target.value)}
          aria-label="Sort by name"
          className={selectClass}
        >
          {NAME_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <ToolGrid tools={visible} />
    </div>
  );
}
