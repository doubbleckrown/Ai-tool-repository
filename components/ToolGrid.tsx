import type { Tool } from "@/lib/types";
import ToolCard from "@/components/ToolCard";
import EmptyState from "@/components/EmptyState";

export default function ToolGrid({ tools }: { tools: Tool[] }) {
  if (tools.length === 0) {
    return <EmptyState />;
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {tools.map((tool) => (
        <ToolCard key={tool.id} tool={tool} />
      ))}
    </div>
  );
}
