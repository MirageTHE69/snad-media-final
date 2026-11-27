/* Open roles, perks and hiring steps. EXAMPLE content: replace with real openings. */
export type Role = { slug: string; title: string; short: string; type: string; where: string; shop: string; desc: string; you: string[] };

export const ROLES: Role[] = [
  {
    slug: "graphic-designer", title: "Graphic Designer", short: "Designer", type: "Full-time", where: "Vadodara", shop: "Brand Bazaar",
    desc: "Make social posts, campaigns and brand systems that stop the scroll.",
    you: ["2+ years of design work you're proud of", "Fluent in Figma and Adobe", "Loves Indian pop culture as much as Swiss grids"],
  },
  {
    slug: "video-editor", title: "Video Editor & Motion", short: "Editor", type: "Full-time", where: "Vadodara", shop: "Brand Bazaar",
    desc: "Cut reels, ad films and motion graphics with rhythm and punch.",
    you: ["Premiere, After Effects or CapCut", "Knows what makes the first 2 seconds work", "Takes a brief to a final cut fassst"],
  },
  {
    slug: "performance-marketer", title: "Performance Marketer", short: "Marketer", type: "Full-time", where: "Vadodara · Hybrid", shop: "Media Mandi",
    desc: "Plan, run and optimise Meta and Google campaigns that pay back.",
    you: ["Hands-on with Meta and Google Ads", "Comfortable with GA4 and spreadsheets", "Tests everything, assumes nothing"],
  },
  {
    slug: "frontend-developer", title: "Frontend Developer", short: "Developer", type: "Full-time", where: "Vadodara · Remote", shop: "Tech Tapri",
    desc: "Build fast, playful websites and stores with Next.js and React.",
    you: ["Strong React, Next.js and CSS", "Cares about speed and accessibility", "Enjoys turning wild designs into real pages"],
  },
];

export const PERKS = [
  { t: "Unlimited cutting chai", d: "The kettle never sleeps." },
  { t: "₹25k learning budget", d: "Courses, books, workshops: your call." },
  { t: "Navratri week, sorted", d: "Short days so you can garba all night." },
  { t: "Hybrid Fridays", d: "Work from wherever the chai is good." },
  { t: "Health insurance", d: "For you and your family." },
  { t: "Birthday leave", d: "Nobody should work on their birthday." },
];

export const HIRING_STEPS = [
  { key: "sun-ke", hi: "Sun-ke", en: "Send your work", desc: "Share your portfolio or a few things you've made. No fancy cover letter needed." },
  { key: "soch-ke", hi: "Soch-ke", en: "Chai pe charcha", desc: "A relaxed 30-minute call, or chai at the adda, to get to know each other." },
  { key: "bana-ke", hi: "Bana-ke", en: "A small paid task", desc: "A short, real-world task, paid, so we both see how we work together." },
  { key: "dikha-ke", hi: "Dikha-ke", en: "Welcome aboard", desc: "Offer within a week. Your permit card gets printed." },
];
