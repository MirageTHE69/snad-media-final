// All site copy lives here so it can be edited without touching layout code.
// Items marked SAMPLE are stand-ins until SNAD supplies the real material.

export const CONTACT = {
  email: "hello@snadmedia.com",
  phone: "089802 07979",
  phoneHref: "tel:+918980207979",
  addressLines: ["23 Nandanvan Society, Faramji Rd,", "Alkapuri, Vadodara 390007"],
};

export const SOCIALS = [
  { label: "Instagram", href: "https://www.instagram.com/" },
  { label: "Facebook", href: "https://www.facebook.com/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/" },
];

export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "Work", href: "/#work" },
  { label: "Studio Seven Nine", href: "/#studio" },
  { label: "Team", href: "/#team" },
  { label: "Blog", href: "/#blog" },
];

export type Vertical = {
  id: string;
  short: string;
  title: string;
  summary: string; // used on the home page card
  body: string; // used on the services page
  tags: string[];
  art: string;
  artAlt: string;
  // Home card colours
  homeHover: string;
  homeTilt: string;
  homeDark?: boolean;
  // Services page colours
  bg: string;
  numBg: string;
  numColor: string;
  tagBg: string;
  tagColor: string;
  bodyWeight?: number;
  pillHover: string;
};

const INK = "#262724";
const CREAM = "#F1EFE8";

export const VERTICALS: Vertical[] = [
  {
    id: "media",
    short: "Media",
    title: "Media Solutions",
    summary: "Media buying, media planning, performance marketing, MarTech.",
    body: "We plan and buy media where your audience already spends time, then tune every campaign against performance.",
    tags: ["Media buying", "Media planning", "Performance marketing", "MarTech"],
    art: "/illustrations/svc-media.svg",
    artAlt: "Illustration of two media planners reviewing growth charts on a board",
    homeHover: "#FFC531",
    homeTilt: "-1deg",
    bg: CREAM,
    numBg: "#FFC531",
    numColor: INK,
    tagBg: "#FFC531",
    tagColor: INK,
    pillHover: "#FFC531",
  },
  {
    id: "brand",
    short: "Brand",
    title: "Brand Solutions",
    summary: "Social media, content, design, film, campaigns, influencers, launches.",
    body: "Day-to-day brand building, from the social calendar to films, campaigns and launches.",
    tags: [
      "Social media management",
      "Content and copywriting",
      "Graphic design and illustration",
      "Film production",
      "AVs and product photography",
      "Campaign planning",
      "Video editing and animation",
      "Influencer management",
      "Print, OOH and mainline ads",
      "Brand launch and rebranding",
    ],
    art: "/illustrations/svc-brand.svg",
    artAlt: "Illustration of a creator filming content with a camera",
    homeHover: "#FF4A1C",
    homeTilt: "1deg",
    homeDark: true,
    bg: "#FF4A1C",
    numBg: INK,
    numColor: CREAM,
    tagBg: INK,
    tagColor: CREAM,
    bodyWeight: 500,
    pillHover: "#FF4A1C",
  },
  {
    id: "technology",
    short: "Technology",
    title: "Technology Solutions",
    summary: "Web development, UI/UX, SEO, e-commerce, CRM, automation.",
    body: "Websites, stores and the marketing systems that run behind them.",
    tags: [
      "Custom web development",
      "Web personalization",
      "UI/UX",
      "SEO",
      "CRM and ERP",
      "E-commerce",
      "Email marketing",
      "Marketing automation",
      "Chatbots",
    ],
    art: "/illustrations/svc-tech.svg",
    artAlt: "Illustration of a developer working across several browser windows",
    homeHover: "#9B8CFF",
    homeTilt: "-1deg",
    bg: "#9B8CFF",
    numBg: INK,
    numColor: CREAM,
    tagBg: CREAM,
    tagColor: INK,
    bodyWeight: 500,
    pillHover: "#9B8CFF",
  },
  {
    id: "research",
    short: "Research",
    title: "Consulting & Research",
    summary: "Market research, consumer behaviour, campaign analytics, usability testing.",
    body: "Research that shows who your customers are and which campaigns are working.",
    tags: ["Market research", "Consumer behaviour analysis", "Campaign analytics", "Usability testing"],
    art: "/illustrations/svc-research.svg",
    artAlt: "Illustration of a researcher with a magnifying glass",
    homeHover: "#48C78E",
    homeTilt: "1deg",
    bg: "#48C78E",
    numBg: INK,
    numColor: CREAM,
    tagBg: INK,
    tagColor: CREAM,
    bodyWeight: 500,
    pillHover: "#48C78E",
  },
  {
    id: "identity",
    short: "Identity",
    title: "Brand Identity",
    summary: "Logos and complete brand identity systems.",
    body: "How the brand looks. Logos and complete identity systems that keep it recognisable everywhere it appears.",
    tags: ["Logos", "Brand identity systems"],
    art: "/illustrations/svc-identity.svg",
    artAlt: "Illustration of designers drawing a brand logo",
    homeHover: "#FFC531",
    homeTilt: "1deg",
    bg: "#FFC531",
    numBg: INK,
    numColor: CREAM,
    tagBg: INK,
    tagColor: CREAM,
    bodyWeight: 500,
    pillHover: "#FFC531",
  },
  {
    id: "strategy",
    short: "Strategy",
    title: "Brand Strategy",
    summary: "Positioning, audience and messaging, set before design begins.",
    body: "What the brand says and to whom. Positioning, audience and messaging, set before any design begins.",
    tags: [],
    art: "/illustrations/svc-strategy.svg",
    artAlt: "Illustration of a team planning at a whiteboard",
    homeHover: "#9B8CFF",
    homeTilt: "-1deg",
    bg: CREAM,
    numBg: "#9B8CFF",
    numColor: INK,
    tagBg: INK,
    tagColor: CREAM,
    pillHover: "#9B8CFF",
  },
  {
    id: "print",
    short: "Print",
    title: "Print & Packaging",
    summary: "Business cards through product packaging.",
    body: "Everything printed, from business cards through product packaging.",
    tags: ["Business cards", "Product packaging"],
    art: "/illustrations/svc-print.svg",
    artAlt: "Illustration of people stacking packaging boxes on shelves",
    homeHover: "#48C78E",
    homeTilt: "1deg",
    bg: "#FFFFFF",
    numBg: "#48C78E",
    numColor: INK,
    tagBg: "#48C78E",
    tagColor: INK,
    pillHover: "#48C78E",
  },
];

export const MARQUEE = ["Performance marketing", "Branding", "Social media marketing", "Social media management"];

export const TAGS = [
  { label: "Media buying", bg: "#FFC531", r: "-6deg", dur: "5s", delay: "0s" },
  { label: "Brand strategy", bg: "#48C78E", r: "4deg", dur: "6s", delay: "-1s" },
  { label: "UI/UX", bg: "#9B8CFF", r: "-2deg", dur: "5.5s", delay: "-2s" },
  { label: "Film production", bg: "#FF4A1C", r: "7deg", dur: "6.5s", delay: "-3s" },
  { label: "SEO", bg: "#262724", color: "#F1EFE8", r: "-5deg", dur: "5s", delay: "-1.5s" },
  { label: "Influencer management", bg: "#FFC531", r: "3deg", dur: "6s", delay: "-2.5s" },
  { label: "Market research", bg: "#9B8CFF", r: "-4deg", dur: "5.5s", delay: "-.5s" },
  { label: "Packaging", bg: "#48C78E", r: "5deg", dur: "6s", delay: "-3.5s" },
];

export const ACRONYM = ["Digital", "Integrated", "Gravitating", "Induced", "Bold", "Enough", "Adaptive"];

export const WHY = [
  { title: "Data-driven decisions", bg: "#FFC531", square: false },
  { title: "Turning data into insights", bg: "#9B8CFF", square: true },
  { title: "Creatives built for conversion", bg: "#FF4A1C", square: false, dark: true },
  { title: "Ad campaigns and social media management", bg: "#48C78E", square: true },
  { title: "A/B-tested content", bg: "#FFC531", square: false },
];

// SAMPLE: placeholder client marks. Replace the SVGs in /public/logos with real client logos
// (one colour, transparent background) and update the names here.
export const CLIENT_LOGOS = [
  "Northwind", "Kaleo", "Lumina", "Verdant", "Aster & Co", "Pixelo", "Halo Foods", "Oakridge", "Sundar", "Mintly",
  "Zephyr", "Kraft Hub", "Bloom", "Orbit", "Saffron", "Nova", "Peakline", "Tidal", "Crest", "Makers",
].map((name, i) => ({ name, src: `/logos/client-${String(i + 1).padStart(2, "0")}.svg` }));

// SAMPLE: case studies — replace with real SNAD work.
export const CASES = [
  {
    img: "/images/case-1.jpg",
    alt: "Social media app icons on a dark background",
    meta: "D2C fashion label · Social media",
    title: "Built an always-on Instagram and Reels engine",
    stat: "3.4x",
    statLabel: "growth in monthly reach",
  },
  {
    img: "/images/case-2.jpg",
    alt: "Colour swatches and a tablet with brand sketches",
    meta: "Specialty café chain · Brand identity",
    title: "A full rebrand, from logo to packaging",
    stat: "42%",
    statLabel: "lift in repeat visits",
  },
  {
    img: "/images/case-3.jpg",
    alt: "Laptop showing an analytics dashboard",
    meta: "Real-estate developer · Performance",
    title: "Lead-gen funnels across Meta and Google",
    stat: "18K",
    statLabel: "qualified leads in a year",
  },
];

export const STUDIO_POINTS = [
  { label: "Advertising audience", shape: { background: "#FFC531", borderRadius: "50%" } },
  { label: "Journey builder", shape: { background: "#9B8CFF" } },
  { label: "Lead capture", shape: { background: "#48C78E", transform: "rotate(45deg)" } },
];

// SAMPLE: team — replace names, roles and photos with the real team.
export const TEAM = [
  { name: "Aarav Shah", role: "Founder & Strategy Lead", img: "/images/team-1.jpg", shape: "circle", tag: "#FFC531", rot: "-3deg" },
  { name: "Nisha Patel", role: "Creative Director", img: "/images/team-2.jpg", shape: "pill", tag: "#9B8CFF", rot: "2deg" },
  { name: "Dev Mehta", role: "Head of Performance", img: "/images/team-3.jpg", shape: "circle", tag: "#48C78E", rot: "-2deg" },
  { name: "Riya Desai", role: "Lead Designer", img: "/images/team-4.jpg", shape: "pill", tag: "#FF4A1C", rot: "3deg" },
] as const;

// SAMPLE: blog posts — replace with real articles.
export const POSTS = [
  {
    img: "/images/blog-1.jpg",
    alt: "Letter tiles spelling digital marketing",
    meta: "Strategy · Nov 2026",
    title: "Where digital budgets in tier-2 cities should go next year",
  },
  {
    img: "/images/blog-2.jpg",
    alt: "Hands sketching a marketing plan beside a phone",
    meta: "Social · Oct 2026",
    title: "Planning a month of Reels in one afternoon",
  },
  {
    img: "/images/blog-3.jpg",
    alt: "Analytics dashboard with charts",
    meta: "Performance · Sep 2026",
    title: "Reading your ROAS without fooling yourself",
  },
];
