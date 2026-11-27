/* Service detail content for the 7 shops. Numbers marked as stats are EXAMPLE figures: replace with real ones. */
import { STOPS, type Stop } from "./data";

export type ShelfItem = { key: string; name: string; desc: string };
export type ServiceDetail = {
  slug: string;
  stopId: string;
  tagline: string;
  intro: string;
  keeperLine: string;
  items: ShelfItem[];
  stats: { v: string; l: string }[];
  faqs: { q: string; a: string }[];
  caseIdx: number;
  /** pin position on svc-map (percent of the image) */
  pin: { x: number; y: number };
  /** false = no detail page yet; links go to the contact form with this stop picked */
  detail: boolean;
  /** blank card painted in the interior art (percent box): the site writes a shop sign on it */
  sign?: { left: number; top: number; width: number; height: number };
};

export const STEPS = [
  { key: "sun-ke", hi: "Sun-ke", en: "We listen", desc: "A chai-and-chat call to understand your business, goals, budget and what's not working." },
  { key: "soch-ke", hi: "Soch-ke", en: "We plan", desc: "Research, strategy and a clear plan with timelines, so you know exactly what's coming." },
  { key: "bana-ke", hi: "Bana-ke", en: "We make", desc: "Our team designs, builds and produces, sharing progress at every stop." },
  { key: "dikha-ke", hi: "Dikha-ke", en: "We launch", desc: "We go live, measure what matters and keep improving every month." },
];

export const SERVICES: ServiceDetail[] = [
  {
    slug: "media-mandi", stopId: "stop-media", pin: { x: 18.4, y: 89.3 }, caseIdx: 2, detail: true,
    tagline: "Attention, bought at the right price.",
    intro: "Media Mandi is where your money meets the right eyeballs. We plan where your audience actually is, buy it smart, and keep tuning until every rupee pulls its weight.",
    keeperLine: "Aao seth! Fresh reach, best rates. Today's special: performance that pays back.",
    items: [
      { key: "buying", name: "Media buying", desc: "TV, radio, print, outdoor and digital, negotiated hard and bought smart so your budget goes further." },
      { key: "planning", name: "Media planning", desc: "We map where your audience scrolls, watches and walks, then build a plan with the right mix and timing." },
      { key: "performance", name: "Performance marketing", desc: "Meta, Google and marketplace ads run on data, tested weekly and pushed toward leads and sales, not likes." },
      { key: "martech", name: "MarTech", desc: "Pixels, CRMs, automations and dashboards wired together so every lead is tracked and nothing leaks." },
    ],
    stats: [{ v: "3.8x", l: "average ROAS on performance" }, { v: "₹40Cr+", l: "media managed" }, { v: "-32%", l: "cost per lead in 90 days" }],
    faqs: [
      { q: "What budget do I need to start?", a: "Performance campaigns can start around ₹50,000 a month in ad spend. We'll tell you honestly if your goal needs more, or less." },
      { q: "Do you only do digital?", a: "No. We plan and buy across TV, radio, print, outdoor and digital, and pick the mix that fits your audience." },
      { q: "How soon will I see results?", a: "Performance campaigns show signals in 2–3 weeks. We optimise weekly and share a clear report every month." },
      { q: "Who owns the ad accounts?", a: "You do. Everything runs in your accounts, and you keep the data, pixels and audiences." },
    ],
  },
  {
    slug: "brand-bazaar", stopId: "stop-brand", pin: { x: 39.3, y: 50.5 }, caseIdx: 1, detail: true,
    sign: { left: 18.5, top: 79, width: 18, height: 17.5 },
    tagline: "Everything your brand says, shows and shoots.",
    intro: "From the daily reel to the big launch film, Brand Bazaar is our content kitchen. Ideas that feel native to the feed, made fast and looking sharp.",
    keeperLine: "Lights, camera, content! Tell me your story, I'll make the whole city share it.",
    items: [
      { key: "social", name: "Social media", desc: "Calendars, reels, carousels and community management that keep your feed alive and your audience talking." },
      { key: "content", name: "Content", desc: "Copy, design and video built for every platform, in English, Hindi and Gujarati." },
      { key: "film", name: "Film production", desc: "Ad films, brand films and product shoots, from script and casting to edit and grade." },
      { key: "influencers", name: "Influencers", desc: "The right creators for your brand, briefed properly, tracked honestly and paid fairly." },
      { key: "launches", name: "Launches", desc: "Product launches and campaigns that land with noise: on ground, on screen and in the feed." },
    ],
    stats: [{ v: "12M+", l: "views on one film" }, { v: "150+", l: "reels made every month" }, { v: "400+", l: "creators in our network" }],
    faqs: [
      { q: "How many posts a month?", a: "Most brands do 12–20 posts plus 4–8 reels a month. We'll suggest the right rhythm for your goals and budget." },
      { q: "Do you shoot in-house?", a: "Yes. We have an in-house team for shoots and edits, and partner crews for bigger films." },
      { q: "Can you work in regional languages?", a: "Yes: English, Hindi and Gujarati in-house, other languages with partner writers." },
      { q: "How do you choose influencers?", a: "By audience fit, real engagement and past brand work, not just follower count." },
    ],
  },
  {
    slug: "tech-tapri", stopId: "stop-technology", pin: { x: 55.5, y: 40.3 }, caseIdx: 0, detail: true,
    sign: { left: 6, top: 76.9, width: 27.8, height: 19.2 },
    tagline: "Websites, stores and the machinery behind them.",
    intro: "Tech Tapri brews fast websites, smooth stores and the automations that keep your marketing running while you sleep. Served hot, built to last.",
    keeperLine: "Ek cutting chai and one fast website, coming right up! Kya banana hai?",
    items: [
      { key: "web", name: "Web development", desc: "Fast, secure websites on Next.js or WordPress, built to rank, convert and be easy to update." },
      { key: "uiux", name: "UI/UX", desc: "Research, wireframes and design systems that make your site and app feel effortless." },
      { key: "seo", name: "SEO", desc: "Technical SEO, content and local search so customers find you before your competitors." },
      { key: "ecommerce", name: "E-commerce", desc: "Shopify and custom stores with payments, shipping and WhatsApp built in." },
      { key: "automation", name: "Automation", desc: "CRMs, chatbots and workflows that capture leads and follow up automatically." },
    ],
    stats: [{ v: "<1.5s", l: "load time on our builds" }, { v: "+140%", l: "organic traffic in 6 months" }, { v: "60+", l: "sites and stores launched" }],
    faqs: [
      { q: "Which platform should I use?", a: "It depends on your goals. We use Next.js for speed and custom work, WordPress or Shopify when your team needs to edit easily." },
      { q: "How long does a website take?", a: "A focused business site takes 3–5 weeks; stores and custom builds take 6–10 weeks." },
      { q: "Do you handle hosting and maintenance?", a: "Yes. We can host, monitor, back up and update your site on a monthly plan." },
      { q: "Will my site be SEO-ready?", a: "Yes. Every build ships with clean code, fast load times, meta tags, schema and analytics set up." },
    ],
  },
  {
    slug: "research-raddiwala", stopId: "stop-research", pin: { x: 50.8, y: 89.9 }, caseIdx: 0, detail: true,
    sign: { left: 5.3, top: 81.8, width: 24.8, height: 16.9 },
    tagline: "We dig through the data so you don't have to.",
    intro: "Every big decision deserves more than a hunch. Research Raddiwala sorts the useful from the raddi: market studies, customer insight and campaign numbers, turned into plain answers.",
    keeperLine: "Har kagaz mein kuch kaam ka hai. Give me your questions, I'll find the answers.",
    items: [
      { key: "market", name: "Market research", desc: "Market size, competitors, pricing and trends, studied before you spend." },
      { key: "behaviour", name: "Consumer behaviour", desc: "Surveys, interviews and social listening to learn what your customers really want." },
      { key: "analytics", name: "Campaign analytics", desc: "Dashboards and reports that show what's working, what's not and what to do next." },
      { key: "usability", name: "Usability testing", desc: "Real people testing your website or app, so you fix problems before launch." },
    ],
    stats: [{ v: "2,500+", l: "customer interviews & surveys" }, { v: "40+", l: "market studies delivered" }, { v: "1 page", l: "summary with every report" }],
    faqs: [
      { q: "How long does a research project take?", a: "Most studies take 2–4 weeks, depending on the sample and the questions." },
      { q: "Can you research a small or local market?", a: "Yes. We work with local field teams and online panels across Gujarat and India." },
      { q: "What will I get at the end?", a: "A clear report, a one-page summary and a call where we walk you through what to do next." },
      { q: "Do you set up analytics too?", a: "Yes. We set up GA4, tracking and dashboards so you can see results yourself." },
    ],
  },
  {
    slug: "logo-lohar", stopId: "stop-identity", pin: { x: 70.4, y: 27.7 }, caseIdx: 1, detail: true,
    sign: { left: 7.2, top: 80, width: 27, height: 16.9 },
    tagline: "Logos and identities, forged to last.",
    intro: "A brand identity has to survive a business card, a billboard and a phone screen. At Logo Lohar we hammer out logos and systems that are simple, strong and unmistakably yours.",
    keeperLine: "Garam loha, sahi chot! Bring me your brand, I'll forge something that lasts.",
    items: [
      { key: "logos", name: "Logos", desc: "Logo design from first sketch to final files, built to work small, big and in one colour." },
      { key: "identity", name: "Identity systems", desc: "Colours, type, patterns, icons and imagery that make every touchpoint feel like you." },
      { key: "guidelines", name: "Brand guidelines", desc: "A clear rulebook so your team, printers and partners use the brand right, every time." },
    ],
    stats: [{ v: "120+", l: "brands forged" }, { v: "3", l: "routes in every logo project" }, { v: "100%", l: "source files you own" }],
    faqs: [
      { q: "How many logo options will I see?", a: "We share three distinct routes, then refine your favourite over two rounds." },
      { q: "How long does a brand identity take?", a: "A logo takes 2–3 weeks; a full identity with guidelines takes 4–6 weeks." },
      { q: "Do I own the final design?", a: "Yes. You get full ownership and all source files once the project is complete." },
      { q: "Can you refresh an existing logo?", a: "Yes. Sometimes a careful refresh is smarter than starting over, and we'll tell you which." },
    ],
  },
  {
    slug: "chai-pe-charcha", stopId: "stop-strategy", pin: { x: 71.5, y: 83 }, caseIdx: 0, detail: false,
    tagline: "Strategy, sorted over chai.",
    intro: "Before a single pixel moves, we sit down and talk. Chai pe Charcha is where we work out who you're for, what you stand for and what you should say, so everything after it hits harder.",
    keeperLine: "Baitho beta, chai piyo. First we understand, then we make a plan.",
    items: [
      { key: "positioning", name: "Positioning", desc: "Find the space in your market only you can own, and the reason customers should pick you." },
      { key: "audience", name: "Audience", desc: "Clear customer personas built from research, so every message has someone to talk to." },
      { key: "messaging", name: "Messaging", desc: "Your story, tagline and key messages, written so your whole team says the same thing." },
    ],
    stats: [{ v: "40+", l: "brands repositioned" }, { v: "2 wks", l: "typical strategy sprint" }, { v: "1", l: "clear brand story" }],
    faqs: [
      { q: "What is a strategy workshop?", a: "A half-day session with your team where we dig into your business, customers and competition, over plenty of chai." },
      { q: "Do I need strategy if I just want ads?", a: "Ads work much better when the message is clear. Even a short strategy sprint makes every rupee of media go further." },
      { q: "What do I get at the end?", a: "A brand strategy deck: positioning, audience, messaging and a plan of what to do first." },
      { q: "Is it only for new brands?", a: "No. Growing brands use it to reposition, launch new products or enter new markets." },
    ],
  },
  {
    slug: "printing-press", stopId: "stop-print", pin: { x: 88.3, y: 56.6 }, caseIdx: 0, detail: false,
    tagline: "From your pocket to the shelf.",
    intro: "Some things still need to be held. SNAD Printing Press designs and produces print that people keep: business cards, packaging that sells from the shelf and outdoor that stops traffic.",
    keeperLine: "Chhapai ekdum first class! Cards, boxes, banners: sab kuch, time pe.",
    items: [
      { key: "cards", name: "Business cards", desc: "Cards, letterheads and stationery in special papers and finishes that feel premium." },
      { key: "packaging", name: "Packaging", desc: "Packaging design and production that stands out on the shelf and arrives in one piece." },
      { key: "ooh", name: "OOH & print ads", desc: "Hoardings, bus shelters, newspaper ads and flyers, designed big and printed right." },
    ],
    stats: [{ v: "1M+", l: "prints delivered" }, { v: "48 hrs", l: "express card turnaround" }, { v: "200+", l: "packaging SKUs designed" }],
    faqs: [
      { q: "What's the minimum order?", a: "Business cards start from 100. Packaging minimums depend on the material and finish, and we'll quote clearly." },
      { q: "Do you design as well as print?", a: "Yes. We design, prepare print-ready files, print and deliver, all in one place." },
      { q: "Can you deliver outside Vadodara?", a: "Yes. We ship across India and handle outdoor printing and mounting in most major cities." },
      { q: "Do you offer eco-friendly options?", a: "Yes: recycled papers, soy inks and plastic-free packaging options are available." },
    ],
  },
];

export const stopFor = (s: ServiceDetail): Stop => STOPS.find((x) => x.id === s.stopId)!;
export const serviceBySlug = (slug: string) => SERVICES.find((s) => s.slug === slug);
export const slugForStop = (stopId: string) => SERVICES.find((s) => s.stopId === stopId)!.slug;
/** shops that have their own page */
export const DETAIL_SERVICES = SERVICES.filter((s) => s.detail);
/** where a shop links: its own page, or the contact form with the stop pre-selected */
export const serviceHref = (s: ServiceDetail) => (s.detail ? `/services/${s.slug}` : `/contact?stop=${encodeURIComponent(stopFor(s).short)}`);
export const serviceHrefByStop = (stopId: string) => serviceHref(SERVICES.find((s) => s.stopId === stopId)!);
export const serviceCta = (s: ServiceDetail) => (s.detail ? "Step inside →" : "Book this stop →");

export const IMG = {
  interior: (slug: string) => `/img/pages/services/svc-${slug}-interior.webp`,
  keeper: (slug: string) => `/img/pages/services/svc-${slug}-keeper.webp`,
  item: (slug: string, key: string) => `/img/pages/services/svc-${slug}-item-${key}.webp`,
  step: (i: number) => `/img/pages/services/step-${i + 1}-${STEPS[i].key}.webp`,
};
