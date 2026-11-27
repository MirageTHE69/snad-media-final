/* Case studies ("films"). EXAMPLE content: fictional clients and numbers, replace with real work. */
import { COLORS } from "./data";

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  year: string;
  genre: string;
  services: string[]; // service slugs
  poster: string;
  posterW: number;
  posterH: number;
  color: string;
  metric: string;
  metricLabel: string;
  logline: string;
  plot: string;
  twist: string;
  climax: string[];
  results: { v: string; l: string }[];
  quote: string;
  quoteBy: string;
  rating: number;
};

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "kesar-dairy", client: "Kesar Dairy", industry: "Dairy & FMCG", year: "2025", genre: "Performance",
    services: ["media-mandi", "tech-tapri"], poster: "/img/pages/work/poster-dairy.webp", posterW: 1400, posterH: 1020, color: COLORS.pink,
    metric: "+218%", metricLabel: "growth in leads", logline: "Rebuilt the funnel, reel to WhatsApp.",
    plot: "Kesar Dairy had a loyal local following, but online leads for its home-delivery subscription were flat and every lead cost more each month.",
    twist: "Instead of selling milk, we sold mornings: short reels of real Vadodara families' 6 a.m. routines, each ending with a one-tap WhatsApp subscription.",
    climax: ["30 vertical films shot in real homes", "Meta + Google campaigns split by neighbourhood", "A WhatsApp bot that books a free trial in 3 taps", "Weekly creative tests and budget shifts"],
    results: [{ v: "+218%", l: "subscription leads" }, { v: "-41%", l: "cost per lead" }, { v: "3.2x", l: "return on ad spend" }],
    quote: "SNAD didn't just run our ads. They understood our customers' mornings.", quoteBy: "Head of Marketing, Kesar Dairy", rating: 5,
  },
  {
    slug: "patang-toys", client: "Patang Toys", industry: "Toys & games", year: "2025", genre: "Film",
    services: ["brand-bazaar", "media-mandi"], poster: "/img/pages/work/poster-toys.webp", posterW: 805, posterH: 1200, color: COLORS.yellow,
    metric: "12M+", metricLabel: "views on one film", logline: "One Uttarayan film. Every family group.",
    plot: "A homegrown toy brand up against global names, with a festive budget a fraction of theirs.",
    twist: "We skipped the toy shelf and told the story of a grandmother teaching her grandkids to fly a kite, with Patang's kite kit at the centre.",
    climax: ["One 90-second festive film + 12 cut-downs", "Collabs with 40 family creators", "Rooftop kite events in 3 cities"],
    results: [{ v: "12M+", l: "views" }, { v: "4.1x", l: "festive sales" }, { v: "40", l: "creators on board" }],
    quote: "The film made our customers cry, then buy. Our best festive season ever.", quoteBy: "Founder, Patang Toys", rating: 5,
  },
  {
    slug: "urja-solar", client: "Urja Solar", industry: "Clean energy", year: "2024", genre: "Media",
    services: ["media-mandi", "research-raddiwala"], poster: "/img/pages/work/poster-solar.webp", posterW: 805, posterH: 1200, color: COLORS.teal,
    metric: "6.4x", metricLabel: "return on ad spend", logline: "Smart buying, sunny results.",
    plot: "Rooftop solar sounds expensive and complicated, so most families never get past the first question.",
    twist: "We turned the savings into a superhero, 'Suraj Bhai', who pays your electricity bill, backed by a simple savings calculator.",
    climax: ["A study of 600 homeowners across Gujarat", "Calculator landing page with an instant quote", "Search, YouTube and local cable TV media mix"],
    results: [{ v: "6.4x", l: "return on ad spend" }, { v: "1,800+", l: "site visits booked" }, { v: "-28%", l: "cost per lead" }],
    quote: "Our sales team finally gets calls from people who already understand solar.", quoteBy: "Sales Director, Urja Solar", rating: 4,
  },
];

export const caseBySlug = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
export const GENRES = ["All", ...Array.from(new Set(CASE_STUDIES.map((c) => c.genre)))];
