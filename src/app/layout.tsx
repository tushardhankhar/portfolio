import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import PageIntro from "@/components/ui/PageIntro";
import AmbientBackground from "@/components/ui/AmbientBackground";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const raleway = Raleway({
  variable: "--font-raleway",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
});

const SITE_URL = "https://tushardhankhar.com";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: "Tushar Dhankhar — Senior Software Engineer",
  description:
    "Senior Software Engineer with 6+ years building scalable web applications in React, Next.js, TypeScript and Node.js. Architecting domain logic, design systems and performant product experiences.",
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Tushar Dhankhar",
    "Senior Software Engineer",
    "Full Stack Engineer",
    "React",
    "Next.js",
    "Node.js",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Tushar Dhankhar" }],
  creator: "Tushar Dhankhar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Tushar Dhankhar — Senior Software Engineer",
    description:
      "Senior Software Engineer with 6+ years building scalable web applications in React, Next.js, TypeScript and Node.js.",
    siteName: "Tushar Dhankhar Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tushar Dhankhar — Senior Software Engineer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tushar Dhankhar — Senior Software Engineer",
    description:
      "Senior Software Engineer with 6+ years building scalable web applications in React, Next.js, TypeScript and Node.js.",
    creator: "@tushardhankhar",
  },
  robots: {
    index: true,
    follow: true,
  },
  verification: {
    // Set GOOGLE_SITE_VERIFICATION in your host env to the token from
    // Search Console (HTML-tag method). Safe to leave unset.
    google: process.env.GOOGLE_SITE_VERIFICATION,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${raleway.variable} h-full`}
      suppressHydrationWarning
    >
      <body className="min-h-full antialiased">
        <AmbientBackground />
        <SmoothScrollProvider>
          {process.env.NEXT_PUBLIC_NO_INTRO !== "1" && <PageIntro />}
          {children}
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
