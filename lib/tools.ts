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
