import type { Metadata, Viewport } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import CursorFollower from "@/components/CursorFollower";
import ScrollProgress from "@/components/ScrollProgress";
import AnimatedBackground from "@/components/AnimatedBackground";

export const metadata: Metadata = {
  title: "Kareem Medhat | Premium Front-End Developer Portfolio",
  description: "Explore the portfolio of Kareem Medhat, a React & Next.js specialist building high-performance, visually stunning web applications.",
  keywords: ["Front-End Developer", "React", "Next.js", "Portfolio", "Kareem Medhat", "Web Design"],
  authors: [{ name: "Kareem Medhat" }],
  openGraph: {
    title: "Kareem Medhat | Premium Front-End Developer Portfolio",
    description: "React & Next.js specialist building high-performance, visually stunning web applications.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kareem Medhat | Portfolio",
    description: "React & Next.js specialist building high-performance web applications.",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#030014",
};

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Kareem Medhat",
  url: "https://kareemmedhat.vercel.app",
  jobTitle: "Front-End Developer",
  knowsAbout: ["React", "Next.js", "TypeScript", "Framer Motion", "UI/UX Design"],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
        />
      </head>
      <body className="antialiased">
        <ScrollProgress />
        <CursorFollower />
        <AnimatedBackground />
        <Navbar />
        <main style={{ position: 'relative', zIndex: 1 }}>
          {children}
        </main>

        <footer style={{ padding: '4rem 2rem', textAlign: 'center', opacity: 0.5, fontSize: '0.9rem' }}>
          <p>© {new Date().getFullYear()} Kareem Medhat. Built with Next.js & Framer Motion.</p>
        </footer>
      </body>
    </html>
  );
}
