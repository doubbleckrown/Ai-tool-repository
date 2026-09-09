/**
 * Shared tap/press feedback classes for buttons and button-styled links.
 * `tap-bounce` (see globals.css) supplies the :active scale; `transition`
 * (Tailwind's default, which covers transform) plus a bounce easing
 * animates it back out on release.
 */
export const tapBounce =
  "tap-bounce transition duration-200 ease-[cubic-bezier(0.34,1.56,0.64,1)]";
