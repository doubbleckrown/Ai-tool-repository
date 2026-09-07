import Link from "next/link";
import type { Tool } from "@/lib/types";
import PricingBadge from "@/components/PricingBadge";
import ToolLogo from "@/components/ToolLogo";

export default function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={`/tool/${tool.id}`}
      className="flex flex-col gap-3 rounded-xl border border-black/10 p-5 transition hover:border-black/25 hover:shadow-sm dark:border-white/15 dark:hover:border-white/30"
    >
      <div className="flex items-start justify-between gap-3">
        <ToolLogo name={tool.name} />
        <PricingBadge pricing={tool.pricing} />
      </div>
      <div>
        <h3 className="font-semibold">{tool.name}</h3>
        <p className="mt-1 text-sm text-black/70 dark:text-white/70">
          {tool.tagline}
        </p>
      </div>
    </Link>
  );
}
