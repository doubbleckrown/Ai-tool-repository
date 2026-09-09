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

export const BRAND_ICONS: Record<string, SimpleIcon> = {
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

// Self-hosted brand marks not available in simple-icons. These are black
// marks on a transparent background, so they sit on a white badge to stay
// visible in both light and dark mode.
export const LOGO_IMAGES: Record<string, string> = {
  chatgpt: "/logos/chatgpt.png",
  runway: "/logos/runway.png",
  pika: "/logos/pika.png",
};

const FALLBACK_COLORS = [
  { bg: "bg-rose-500", hex: "#f43f5e" },
  { bg: "bg-orange-500", hex: "#f97316" },
  { bg: "bg-amber-500", hex: "#f59e0b" },
  { bg: "bg-emerald-500", hex: "#10b981" },
  { bg: "bg-teal-500", hex: "#14b8a6" },
  { bg: "bg-sky-500", hex: "#0ea5e9" },
  { bg: "bg-indigo-500", hex: "#6366f1" },
  { bg: "bg-violet-500", hex: "#8b5cf6" },
  { bg: "bg-fuchsia-500", hex: "#d946ef" },
];

function fallbackColor(name: string) {
  const hash = Array.from(name).reduce((sum, char) => sum + char.charCodeAt(0), 0);
  return FALLBACK_COLORS[hash % FALLBACK_COLORS.length];
}

export function fallbackBgClass(name: string): string {
  return fallbackColor(name).bg;
}

/** A representative brand color for a tool, used for hover glow effects. */
export function getAccentColor(id: string, name: string): string {
  const icon = BRAND_ICONS[id];
  if (icon) return `#${icon.hex}`;
  if (LOGO_IMAGES[id]) return "#6b7280";
  return fallbackColor(name).hex;
}
