import type { Metadata, Viewport } from "next";
import { Outfit, Yatra_One } from "next/font/google";
import "./globals.css";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const yatra = Yatra_One({ weight: "400", subsets: ["latin", "devanagari"], variable: "--font-yatra", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: "SNAD Media | SNAD ki Sawari",
  description:
    "SNAD Media is a creative, media and technology agency from Alkapuri, Vadodara. Hop in for a rickshaw ride through our seven services. #FassstYoung&Sorted",
  openGraph: {
    title: "SNAD Media | SNAD ki Sawari",
    description: "Brands people can’t stop looking at. A creative, media and technology agency from Vadodara.",
    images: ["/img/hero-bg-hd.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF4DC",
  width: "device-width",
  initialScale: 1,
};

/* Runs before paint: skip the splash on repeat visits in the same session, or for reduced motion. */
const splashScript = `try{if(sessionStorage.getItem('snad-splash')||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('no-splash')}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${yatra.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashScript }} />
        <link rel="preload" as="image" href="/img/hero-bg-hd.webp" type="image/webp" fetchPriority="high" />
      </head>
      <body>{children}</body>
    </html>
  );
}
