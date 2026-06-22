import type { Metadata } from "next";
import { Poppins, Raleway } from "next/font/google";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";

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

export const metadata: Metadata = {
  title: "Tushar Dhankhar — Full Stack Engineer & AI Builder",
  description:
    "Senior Full Stack Engineer specializing in React, Next.js, Node.js, and AI-powered applications. Building fast, beautiful, and intelligent web experiences.",
  keywords: [
    "Tushar Dhankhar",
    "Full Stack Engineer",
    "React",
    "Next.js",
    "Node.js",
    "AI Builder",
    "TypeScript",
    "Portfolio",
  ],
  authors: [{ name: "Tushar Dhankhar" }],
  creator: "Tushar Dhankhar",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tushardhankhar.dev",
    title: "Tushar Dhankhar — Full Stack Engineer & AI Builder",
    description:
      "Senior Full Stack Engineer specializing in React, Next.js, Node.js, and AI-powered applications.",
    siteName: "Tushar Dhankhar Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Tushar Dhankhar — Full Stack Engineer & AI Builder",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Tushar Dhankhar — Full Stack Engineer & AI Builder",
    description:
      "Senior Full Stack Engineer specializing in React, Next.js, Node.js, and AI-powered applications.",
    creator: "@tushardhankhar",
  },
  robots: {
    index: true,
    follow: true,
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
      <body className="min-h-full antialiased bg-dark-bg text-white">
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  );
}
