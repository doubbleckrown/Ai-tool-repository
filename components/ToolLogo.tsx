import { BRAND_ICONS, LOGO_IMAGES, fallbackBgClass } from "@/lib/brand";

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
  const image = LOGO_IMAGES[id];
  const icon = BRAND_ICONS[id];

  if (image) {
    return (
      <div
        className={`flex ${boxSize} shrink-0 items-center justify-center rounded-xl border border-black/10 bg-white p-2.5`}
        aria-hidden="true"
      >
        {/* eslint-disable-next-line @next/next/no-img-element -- static local asset, no next/image config in this project */}
        <img src={image} alt="" className="h-full w-full object-contain" />
      </div>
    );
  }

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
      className={`flex ${boxSize} ${textSize} shrink-0 items-center justify-center rounded-xl font-semibold text-white ${fallbackBgClass(
        name
      )}`}
      aria-hidden="true"
    >
      {name.charAt(0).toUpperCase()}
    </div>
  );
}
