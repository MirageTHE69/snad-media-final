import type { Metadata, Viewport } from "next";
import { Archivo, Instrument_Sans } from "next/font/google";
import Nav from "@/components/Nav";
import Footer, { Contact } from "@/components/Footer";
import "./globals.css";

const archivo = Archivo({
  variable: "--font-archivo",
  subsets: ["latin"],
  axes: ["wdth"],
  display: "swap",
});

const instrument = Instrument_Sans({
  variable: "--font-instrument",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://snadmedia.com"),
  title: {
    default: "SNAD Media — Fassst, Young & Sorted | Digital marketing agency in Vadodara",
    template: "%s | SNAD Media",
  },
  description:
    "SNAD Media is a digital marketing and creative agency in Alkapuri, Vadodara. A strategic partner across creative, media and technology.",
  openGraph: {
    title: "SNAD Media — Fassst, Young & Sorted",
    description: "Digital marketing and creative agency in Vadodara. Creative, media and technology under one roof.",
    type: "website",
    locale: "en_IN",
  },
};

export const viewport: Viewport = {
  themeColor: "#262724",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${archivo.variable} ${instrument.variable}`}>
      <body id="top">
        <div className="page">
          <Nav />
          <main>{children}</main>
          <Contact />
          <Footer />
        </div>
      </body>
    </html>
  );
}
