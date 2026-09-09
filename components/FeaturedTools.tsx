import { getFeaturedTools } from "@/lib/tools";
import ToolCard from "@/components/ToolCard";

export default function FeaturedTools() {
  const tools = getFeaturedTools();

  if (tools.length === 0) {
    return null;
  }

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-lg font-semibold">Featured Tools</h2>
      <div className="-mx-6 flex snap-x snap-mandatory gap-4 overflow-x-auto px-6 pb-2">
        {tools.map((tool) => (
          <div key={tool.id} className="w-72 shrink-0 snap-start">
            <ToolCard tool={tool} />
          </div>
        ))}
      </div>
    </section>
  );
}
