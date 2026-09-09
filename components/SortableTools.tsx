"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { ChangeEvent } from "react";
import type { Tool } from "@/lib/types";
import { sortTools, type SortKey } from "@/lib/tools";
import ToolGrid from "@/components/ToolGrid";

const SORT_OPTIONS: { value: SortKey | ""; label: string }[] = [
  { value: "", label: "Sort by" },
  { value: "name", label: "Name (A–Z)" },
  { value: "category", label: "Category" },
  { value: "price", label: "Price" },
];

export default function SortableTools({ tools }: { tools: Tool[] }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sort = (searchParams.get("sort") ?? "") as SortKey | "";

  const sorted = sort ? sortTools(tools, sort) : tools;

  function onSortChange(e: ChangeEvent<HTMLSelectElement>) {
    const params = new URLSearchParams(searchParams.toString());
    if (e.target.value) {
      params.set("sort", e.target.value);
    } else {
      params.delete("sort");
    }
    const query = params.toString();
    router.replace(query ? `${pathname}?${query}` : pathname, { scroll: false });
  }

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-end">
        <select
          value={sort}
          onChange={onSortChange}
          aria-label="Sort tools"
          className="rounded-lg border border-black/15 bg-white px-3 py-1.5 text-sm outline-none focus:border-black/40 dark:border-white/20 dark:bg-black dark:focus:border-white/50"
        >
          {SORT_OPTIONS.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
      <ToolGrid tools={sorted} />
    </div>
  );
}
