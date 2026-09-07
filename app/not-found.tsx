import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex flex-col items-start gap-4">
      <h1 className="text-3xl font-bold">Page not found</h1>
      <p className="text-black/70 dark:text-white/70">
        The page you&apos;re looking for doesn&apos;t exist.
      </p>
      <Link href="/" className="underline underline-offset-2">
        Back to home
      </Link>
    </div>
  );
}
