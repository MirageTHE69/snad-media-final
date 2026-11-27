/* SNAD Media | SNAD ki Sawari: all site content in one place.
 * Anything marked EXAMPLE is sample content: swap it for real SNAD data. */

export const COLORS = {
  red: "#E3101B",
  ink: "#141414",
  cream: "#FFF4DC",
  yellow: "#FFC72C",
  pink: "#FF2E88",
  teal: "#00A6A6",
  green: "#2FB55A",
  orange: "#FF6B1A",
  purple: "#7B3FE4",
} as const;

export type Stop = {
  id: string;
  no: string;
  name: string;
  hindi: string;
  service: string;
  short: string;
  color: string;
  badgeText: string;
  img: string;
  w: number;
  h: number;
  /** signboard box, in % of the shop image (measured from the artwork) */
  board: { left: number; top: number; width: number; height: number };
  blurb: string;
  tags: string[];
};

export const STOPS: Stop[] = [
  {
    id: "stop-media", no: "01", name: "Media Mandi", hindi: "मीडिया मंडी", service: "Media Solutions", short: "Media",
    color: COLORS.ink, badgeText: COLORS.ink, img: "/img/shop-media.webp", w: 707, h: 625,
    board: { left: 17.2, top: 6.6, width: 73.3, height: 16.8 },
    blurb: "We buy attention at the right price. Planning, buying and performance marketing that pays back.",
    tags: ["Media buying", "Media planning", "Performance marketing", "MarTech"],
  },
  {
    id: "stop-brand", no: "02", name: "Brand Bazaar", hindi: "ब्रांड बाज़ार", service: "Brand Solutions", short: "Brand",
    color: COLORS.pink, badgeText: COLORS.ink, img: "/img/shop-brand.webp", w: 795, h: 625,
    board: { left: 26.6, top: 6.6, width: 64.9, height: 16.8 },
    blurb: "Everything your brand says, shows and shoots. Social, content, film, influencers, launches.",
    tags: ["Social media", "Content", "Film production", "Influencers", "Launches"],
  },
  {
    id: "stop-technology", no: "03", name: "Tech Tapri", hindi: "टेक टपरी", service: "Technology Solutions", short: "Tech",
    color: COLORS.teal, badgeText: COLORS.ink, img: "/img/shop-tech.webp", w: 650, h: 625,
    board: { left: 9.8, top: 6.6, width: 79.9, height: 16.8 },
    blurb: "Websites, stores and the marketing machinery behind them. Brewed fresh, served hot.",
    tags: ["Web development", "UI/UX", "SEO", "E-commerce", "Automation"],
  },
  {
    id: "stop-research", no: "04", name: "Research Raddiwala", hindi: "रिसर्च रद्दीवाला", service: "Consulting & Research", short: "Research",
    color: COLORS.green, badgeText: COLORS.ink, img: "/img/shop-research.webp", w: 650, h: 625,
    board: { left: 9.8, top: 6.6, width: 79.9, height: 16.8 },
    blurb: "We dig through the data so you don’t have to. Then we tell you what it means.",
    tags: ["Market research", "Consumer behaviour", "Campaign analytics", "Usability testing"],
  },
  {
    id: "stop-identity", no: "05", name: "Logo Lohar", hindi: "लोगो लोहार", service: "Brand Identity", short: "Identity",
    color: COLORS.orange, badgeText: COLORS.ink, img: "/img/shop-identity.webp", w: 649, h: 637,
    board: { left: 9.8, top: 8.4, width: 80, height: 16.4 },
    blurb: "Logos and identity systems, hammered into shape and forged to last.",
    tags: ["Logos", "Identity systems", "Brand guidelines"],
  },
  {
    id: "stop-strategy", no: "06", name: "Chai pe Charcha", hindi: "चाय पे चर्चा", service: "Brand Strategy", short: "Strategy",
    color: COLORS.red, badgeText: "#fff", img: "/img/shop-strategy.webp", w: 776, h: 639,
    board: { left: 24.7, top: 8.2, width: 66.7, height: 16.4 },
    blurb: "Positioning, audience and message. Sorted over chai, before a single pixel moves.",
    tags: ["Positioning", "Audience", "Messaging"],
  },
  {
    id: "stop-print", no: "07", name: "SNAD Printing Press", hindi: "स्नैड प्रिंटिंग प्रेस", service: "Print & Packaging", short: "Print",
    color: COLORS.purple, badgeText: "#fff", img: "/img/shop-print.webp", w: 796, h: 640,
    board: { left: 26.6, top: 8.2, width: 64.9, height: 16.5 },
    blurb: "From the business card in your pocket to the box on the shelf.",
    tags: ["Business cards", "Packaging", "OOH & print ads"],
  },
];

/** Signboard colour for the shop name (Media Mandi is painted in ink) */
export const boardColor = (s: Stop) => (s.id === "stop-media" ? COLORS.ink : s.color);
/** Accent used for badges / underlines (Media Mandi uses yellow) */
export const accent = (s: Stop) => (s.id === "stop-media" ? COLORS.yellow : s.color);

export const WORDS: [string, string][] = [
  ["Digital", "Born online, raised on reels."],
  ["Integrated", "Media, brand and tech in one vehicle."],
  ["Gravitating", "We pull attention. Politely."],
  ["Induced", "Every idea comes with a reason."],
  ["Bold", "Loud when it matters."],
  ["Enough", "No fluff. Just enough."],
  ["Adaptive", "Algorithm changed? So did we."],
];

export const ROTATOR = ["looking at.", "talking about.", "sharing.", "remembering."];

export const STICKERS = ["st-notes", "st-umbrella", "st-vinyl", "st-camera", "st-clapper", "st-rose-hand", "st-woman", "tiger-wink"];

/** EXAMPLE client wordmarks (fictional brands). Replace with real logo files from SNAD. */
export type Client = { name: string; tag: string; color: string; style: "serif" | "sans" | "script" | "mono" };
export const CLIENTS_A: Client[] = [
  { name: "Kesar Dairy", tag: "est. 1986", color: "#E3101B", style: "serif" },
  { name: "PATANG", tag: "toys & games", color: "#7B3FE4", style: "sans" },
  { name: "Urja Solar", tag: "clean power", color: "#FF6B1A", style: "sans" },
  { name: "Tiffin Tales", tag: "home kitchens", color: "#2FB55A", style: "script" },
  { name: "MITTI", tag: "ceramics", color: "#8A4B2A", style: "mono" },
  { name: "Saffron Stays", tag: "boutique hotels", color: "#FF2E88", style: "serif" },
  { name: "Baroda Brew", tag: "coffee co.", color: "#141414", style: "script" },
  { name: "NIRMAL", tag: "textiles", color: "#00A6A6", style: "sans" },
];
export const CLIENTS_B: Client[] = [
  { name: "Lotus Realty", tag: "homes", color: "#00A6A6", style: "serif" },
  { name: "Desi Denim", tag: "since 2009", color: "#1F4BB8", style: "sans" },
  { name: "Chai Sutta Co.", tag: "tapri chain", color: "#E3101B", style: "script" },
  { name: "VAAYU", tag: "e-bikes", color: "#2FB55A", style: "mono" },
  { name: "Rangrez", tag: "paints", color: "#FF2E88", style: "serif" },
  { name: "GRAINSMITH", tag: "bakery", color: "#FF6B1A", style: "sans" },
  { name: "Sangam Jewels", tag: "fine gold", color: "#B8860B", style: "serif" },
  { name: "PulsePlus", tag: "clinics", color: "#7B3FE4", style: "sans" },
];

/** EXAMPLE case studies */
export const CASES = [
  { client: "Kesar Dairy", service: "Performance", metric: "+218%", label: "growth in leads", line: "Rebuilt the funnel, reel to WhatsApp.", bg: COLORS.pink },
  { client: "Patang Toys", service: "Film", metric: "12M+", label: "views on one film", line: "One Diwali film. Every family group.", bg: COLORS.yellow },
  { client: "Urja Solar", service: "Media", metric: "6.4x", label: "return on ad spend", line: "Smart buying, sunny results.", bg: COLORS.teal },
];

/** EXAMPLE stats */
export const MILESTONES = [
  { value: 9, suffix: "+", label: "years on the road", rot: -2 },
  { value: 250, suffix: "+", label: "brands on board", rot: 1.5 },
  { value: 1200, suffix: "+", label: "campaigns shipped", rot: -1 },
  { value: 45, suffix: "+", label: "sorted humans", rot: 2 },
];

export const STUDIO = [
  { n: 1, label: "Advertising audience", desc: "Find the right people, everywhere they scroll.", color: COLORS.yellow },
  { n: 2, label: "Journey builder", desc: "Guide them from first look to first buy.", color: COLORS.pink },
  { n: 3, label: "Lead capture", desc: "Catch every enquiry. Lose none.", color: COLORS.teal },
];

/** EXAMPLE team (stock photos from Unsplash, names are placeholders) */
export const CAST = [
  { name: "Riya Mehta", role: "Creative Director", img: "/team/member-1.webp", color: COLORS.yellow, rot: -2 },
  { name: "Kabir Shah", role: "Founder & Chief Driver", img: "/team/member-2.webp", color: COLORS.teal, rot: 1.5 },
  { name: "Ananya Desai", role: "Head of Social", img: "/team/member-3.webp", color: COLORS.pink, rot: -1.5 },
  { name: "Arjun Patel", role: "Tech Lead", img: "/team/member-4.webp", color: COLORS.green, rot: 2 },
];

export const CONTACT = {
  email: "hello@snadmedia.com",
  phone: "089802 07979",
  tel: "+918980207979",
  address: ["23 Nandanvan Society, Faramji Rd,", "Alkapuri, Vadodara 390007"],
};

export const NAV = [
  { href: "#ride", label: "The Ride" },
  { href: "#work", label: "Work" },
  { href: "#garage", label: "Studio 79" },
  { href: "#cast", label: "The Cast" },
  { href: "#stop-media", label: "Services" },
];
