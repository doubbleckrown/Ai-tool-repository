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
  name,
  size = "md",
}: {
  name: string;
  size?: "md" | "lg";
}) {
  const dimension = size === "lg" ? "h-16 w-16 text-2xl" : "h-10 w-10 text-base";

  return (
    <div
      className={`flex ${dimension} shrink-0 items-center justify-center rounded-xl font-semibold text-white ${colorForName(
        name
      )}`}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
