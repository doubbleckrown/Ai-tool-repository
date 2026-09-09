import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import NavigationOverlay from "@/components/NavigationOverlay";

export const metadata: Metadata = {
  title: "AI Tools Directory",
  description: "Discover useful AI tools by category.",
};

const themeInitScript = `
  try {
    var stored = localStorage.getItem("theme");
    var isDark = stored ? stored === "dark" : window.matchMedia("(prefers-color-scheme: dark)").matches;
    document.documentElement.classList.toggle("dark", isDark);
  } catch (e) {}
  // iOS Safari only applies :active styles on tap if some ancestor has a
  // touchstart listener. This no-op listener enables tap feedback (button
  // press/bounce effects) site-wide.
  document.addEventListener("touchstart", function () {}, { passive: true });
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="flex min-h-full flex-col">
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
        <NavigationOverlay />
        <Header />
        <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
