export default function EmptyState({
  message = "No tools found. Try a different search or filter.",
}: {
  message?: string;
}) {
  return (
    <div className="rounded-xl border border-dashed border-black/15 p-10 text-center text-black/60 dark:border-white/20 dark:text-white/60">
      {message}
    </div>
  );
}
