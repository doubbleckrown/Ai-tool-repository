import Link from "next/link";
import type { CSSProperties } from "react";
import type { Tool } from "@/lib/types";
import PricingBadge from "@/components/PricingBadge";
import ToolLogo from "@/components/ToolLogo";
import { getAccentColor } from "@/lib/brand";

export default function ToolCard({ tool }: { tool: Tool }) {
  const accent = getAccentColor(tool.id, tool.name);
  const style = {
    "--accent": accent,
    "--accent-glow": `${accent}40`,
  } as CSSProperties;

  return (
    <Link
      href={`/tool/${tool.id}`}
      style={style}
      className="group flex flex-col gap-3 rounded-xl border border-black/10 p-5 transition-all duration-300 ease-out hover:-translate-y-1 hover:border-[var(--accent)]/50 hover:shadow-[0_16px_40px_-14px_var(--accent-glow)] dark:border-white/15 dark:hover:border-[var(--accent)]/50"
    >
      <div className="flex items-start justify-between gap-3">
        <ToolLogo id={tool.id} name={tool.name} />
        <PricingBadge pricing={tool.pricing} />
      </div>
      <div>
        <h3 className="font-semibold transition-colors group-hover:text-[var(--accent)]">
          {tool.name}
        </h3>
        <p className="mt-1 text-sm text-black/70 dark:text-white/70">
          {tool.tagline}
        </p>
      </div>
    </Link>
  );
}
