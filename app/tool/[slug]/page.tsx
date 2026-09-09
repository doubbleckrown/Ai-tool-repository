import { notFound } from "next/navigation";
import Link from "next/link";
import PricingBadge from "@/components/PricingBadge";
import ToolLogo from "@/components/ToolLogo";
import ToolGrid from "@/components/ToolGrid";
import { getAllTools, getRelatedTools, getToolById } from "@/lib/tools";

export function generateStaticParams() {
  return getAllTools().map((tool) => ({ slug: tool.id }));
}

export default async function ToolDetailPage({
  params,
}: PageProps<"/tool/[slug]">) {
  const { slug } = await params;
  const tool = getToolById(slug);

  if (!tool) {
    notFound();
  }

  const relatedTools = getRelatedTools(tool);

  return (
    <div className="flex flex-col gap-10">
      <Link href="/" className="text-sm text-black/60 hover:underline dark:text-white/60">
        ← Back to all tools
      </Link>

      <section className="flex flex-col gap-4">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-4">
            <ToolLogo id={tool.id} name={tool.name} size="lg" />
            <div>
              <h1 className="text-2xl font-bold sm:text-3xl">{tool.name}</h1>
              <p className="text-black/70 dark:text-white/70">{tool.tagline}</p>
            </div>
          </div>
          <PricingBadge pricing={tool.pricing} />
        </div>

        <p className="max-w-2xl text-black/80 dark:text-white/80">
          {tool.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {tool.categories.map((category) => (
            <Link
              key={category}
              href={`/category/${category}`}
              className="rounded-full border border-black/15 px-3 py-1 text-xs hover:border-black/35 dark:border-white/20 dark:hover:border-white/40"
            >
              {category}
            </Link>
          ))}
        </div>

        <a
          href={tool.website}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-fit rounded-lg bg-foreground px-5 py-2.5 text-sm font-medium text-background transition hover:opacity-90"
        >
          Visit website ↗
        </a>
      </section>

      {relatedTools.length > 0 && (
        <section className="flex flex-col gap-4">
          <h2 className="text-lg font-semibold">Similar tools</h2>
          <ToolGrid tools={relatedTools} />
        </section>
      )}
    </div>
  );
}
