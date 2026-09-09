import type { Pricing } from "@/lib/types";

const LABELS: Record<Pricing, string> = {
  free: "Free",
  freemium: "Freemium",
  paid: "Paid",
};

const STYLES: Record<Pricing, string> = {
  free: "bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300",
  freemium: "bg-blue-100 text-blue-800 dark:bg-blue-900/40 dark:text-blue-300",
  paid: "bg-purple-100 text-purple-800 dark:bg-purple-900/40 dark:text-purple-300",
};

export default function PricingBadge({ pricing }: { pricing: Pricing }) {
  return (
    <span
      className={`inline-block rounded-full px-2.5 py-0.5 text-xs font-medium ${STYLES[pricing]}`}
    >
      {LABELS[pricing]}
    </span>
  );
}
