export default function AboutPage() {
  return (
    <div className="flex max-w-2xl flex-col gap-4">
      <h1 className="text-3xl font-bold sm:text-4xl">About</h1>
      <p className="text-black/80 dark:text-white/80">
        AI Tools Directory is a simple, curated directory that helps people
        discover useful AI tools by category — writing, image generation,
        video, audio, coding, productivity, and more.
      </p>
      <p className="text-black/80 dark:text-white/80">
        Have a tool you think should be listed? Send a suggestion to{" "}
        <a
          href="mailto:hello@example.com"
          className="underline underline-offset-2"
        >
          hello@example.com
        </a>
        .
      </p>
      <p className="text-sm text-black/60 dark:text-white/60">
        Built by Doubbleckrown
      </p>
    </div>
  );
}
