import toolsData from "@/data/tools.json";
import categoriesData from "@/data/categories.json";
import type { Category, Pricing, Tool } from "@/lib/types";

const tools: Tool[] = toolsData as Tool[];
const categories: Category[] = categoriesData as Category[];

export function getAllTools(): Tool[] {
  return tools;
}

export function getAllCategories(): Category[] {
  return categories;
}

export function getFeaturedTools(): Tool[] {
  return tools.filter((tool) => tool.featured);
}

export function getToolById(id: string): Tool | undefined {
  return tools.find((tool) => tool.id === id);
}

export function getCategoryBySlug(slug: string): Category | undefined {
  return categories.find((category) => category.slug === slug);
}

export function getToolsByCategory(slug: string): Tool[] {
  return tools.filter((tool) => tool.categories.includes(slug));
}

export function getRelatedTools(tool: Tool, limit = 3): Tool[] {
  return tools
    .filter(
      (other) =>
        other.id !== tool.id &&
        other.categories.some((category) => tool.categories.includes(category))
    )
    .slice(0, limit);
}

export type SortKey = "name" | "category" | "price";

const PRICE_ORDER: Record<Pricing, number> = { free: 0, freemium: 1, paid: 2 };

function primaryCategoryName(tool: Tool): string {
  const category = categories.find((c) => c.slug === tool.categories[0]);
  return category?.name ?? tool.categories[0] ?? "";
}

export function sortTools(tools_: Tool[], sortBy: SortKey): Tool[] {
  const sorted = [...tools_];

  if (sortBy === "name") {
    sorted.sort((a, b) => a.name.localeCompare(b.name));
  } else if (sortBy === "category") {
    sorted.sort((a, b) => {
      const byCategory = primaryCategoryName(a).localeCompare(primaryCategoryName(b));
      return byCategory !== 0 ? byCategory : a.name.localeCompare(b.name);
    });
  } else if (sortBy === "price") {
    sorted.sort((a, b) => {
      const byPrice = PRICE_ORDER[a.pricing] - PRICE_ORDER[b.pricing];
      return byPrice !== 0 ? byPrice : a.name.localeCompare(b.name);
    });
  }

  return sorted;
}

export interface ToolFilters {
  query?: string;
  category?: string;
  pricing?: Pricing;
}

export function filterTools(tools_: Tool[], filters: ToolFilters): Tool[] {
  const query = filters.query?.trim().toLowerCase();

  return tools_.filter((tool) => {
    const matchesQuery =
      !query ||
      tool.name.toLowerCase().includes(query) ||
      tool.tagline.toLowerCase().includes(query) ||
      tool.description.toLowerCase().includes(query);

    const matchesCategory =
      !filters.category || tool.categories.includes(filters.category);

    const matchesPricing = !filters.pricing || tool.pricing === filters.pricing;

    return matchesQuery && matchesCategory && matchesPricing;
  });
}
