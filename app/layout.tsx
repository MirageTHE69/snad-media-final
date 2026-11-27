import type { Metadata, Viewport } from "next";
import { Outfit, Yatra_One } from "next/font/google";
import "./globals.css";
import "./inner.css";
import "./pages.css";
import { SoundProvider } from "@/components/SoundProvider";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import Tiger from "@/components/Tiger";
import GlobalFx from "@/components/GlobalFx";

const outfit = Outfit({ subsets: ["latin"], variable: "--font-outfit", display: "swap" });
const yatra = Yatra_One({ weight: "400", subsets: ["latin", "devanagari"], variable: "--font-yatra", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"),
  title: { default: "SNAD Media | SNAD ki Sawari", template: "%s | SNAD Media" },
  description:
    "SNAD Media is a creative, media and technology agency from Alkapuri, Vadodara. Hop in for a rickshaw ride through our seven services. #FassstYoung&Sorted",
  openGraph: {
    title: { default: "SNAD Media | SNAD ki Sawari", template: "%s | SNAD Media" },
    description: "Brands people can’t stop looking at. A creative, media and technology agency from Vadodara.",
    images: ["/img/hero-bg-hd.webp"],
  },
};

export const viewport: Viewport = {
  themeColor: "#FFF4DC",
  width: "device-width",
  initialScale: 1,
};

/* Runs before paint: the splash plays once per session, only when the visit starts on the homepage,
 * and never for reduced motion. */
const splashScript = `try{var s=sessionStorage,k='snad-splash';if(location.pathname!=='/')s.setItem(k,'1');if(s.getItem(k)||matchMedia('(prefers-reduced-motion: reduce)').matches)document.documentElement.classList.add('no-splash')}catch(e){}`;

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${outfit.variable} ${yatra.variable}`} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: splashScript }} />
      </head>
      <body>
        <SoundProvider>
          <div data-root="" className="root" id="top">
            <Nav />
            {children}
            <Footer />
            <Tiger />
            <GlobalFx />
          </div>
        </SoundProvider>
      </body>
    </html>
  );
}
