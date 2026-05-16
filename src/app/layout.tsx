import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Japanese Test Prep",
  description: "Prepare for JLPT N5-N1 and BJT with vocabulary, kanji, grammar, and reading practice",
  manifest: "/manifest.json",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Noto+Serif+JP:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="stage">
          <div className="orb o1" />
          <div className="orb o2" />
          <div className="orb o3" />
          {children}
        </div>
      </body>
    </html>
  );
}
