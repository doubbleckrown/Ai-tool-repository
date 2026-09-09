import {
  siClaude,
  siCursor,
  siElevenlabs,
  siGithubcopilot,
  siGrammarly,
  siNotion,
  siPerplexity,
  siReplit,
  siSuno,
  type SimpleIcon,
} from "simple-icons";

const BRAND_ICONS: Record<string, SimpleIcon> = {
  claude: siClaude,
  "github-copilot": siGithubcopilot,
  cursor: siCursor,
  "replit-ai": siReplit,
  "notion-ai": siNotion,
  grammarly: siGrammarly,
  perplexity: siPerplexity,
  elevenlabs: siElevenlabs,
  suno: siSuno,
};

const COLORS = [
  "bg-rose-500",
  "bg-orange-500",
  "bg-amber-500",
  "bg-emerald-500",
  "bg-teal-500",
  "bg-sky-500",
  "bg-indigo-500",
  "bg-violet-500",
  "bg-fuchsia-500",
];

function colorForName(name: string): string {
  const hash = Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return COLORS[hash % COLORS.length];
}

export default function ToolLogo({
  id,
  name,
  size = "md",
}: {
  id: string;
  name: string;
  size?: "md" | "lg";
}) {
  const boxSize = size === "lg" ? "h-16 w-16" : "h-10 w-10";
  const icon = BRAND_ICONS[id];

  if (icon) {
    return (
      <div
        className={`flex ${boxSize} shrink-0 items-center justify-center rounded-xl p-2.5`}
        style={{ backgroundColor: `#${icon.hex}` }}
        aria-hidden="true"
      >
        <svg role="img" viewBox="0 0 24 24" fill="#fff" className="h-full w-full">
          <path d={icon.path} />
        </svg>
      </div>
    );
  }

  const textSize = size === "lg" ? "text-2xl" : "text-base";

  return (
    <div
      className={`flex ${boxSize} ${textSize} shrink-0 items-center justify-center rounded-xl font-semibold text-white ${colorForName(
        name
      )}`}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
