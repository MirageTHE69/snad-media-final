# SNAD Media | SNAD ki Sawari

Agency website for **SNAD Media**, a creative, media & technology agency from Alkapuri, Vadodara.
Scrolling the site is an auto-rickshaw ride through an Indian truck-art world; each of SNAD's 7 services is a painted shop the rickshaw drives past.

Built with **Next.js 16 (App Router) + React 19 + TypeScript**. No UI libraries: plain CSS in `app/globals.css`.

## Run it

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

Requires Node 20.9+.

## Structure

```
app/
  layout.tsx            fonts (Outfit + Yatra One via next/font), metadata, splash pre-paint script
  page.tsx              composes all sections
  globals.css           all styles: brand tokens, keyframes, sections, responsive rules
  api/contact/route.ts  contact form endpoint (validates + logs; wire to email/CRM)
  icon.svg              favicon
components/             one file per section (Splash, Nav, Hero, Ride, Clients, Cinema,
                        Acronym, Milestones, Studio, Cast, Contact, Footer) + Tiger mascot,
                        GlobalFx (scroll reveals, doodle cursor, click stickers), SoundProvider
lib/data.ts             ALL site content (stops, case studies, stats, team, clients, contact)
lib/motion.ts           reduced-motion / pointer helpers
public/img/             illustrations (.webp)
public/team/            team photos
```

## Sections

1. Splash (shop shutter, once per session, skippable)
2. Sticky nav, sound toggle (off by default; horn + roar are synthesised with Web Audio)
3. Hero: watching poster eyes, word rotator, magnetic CTAs, always-driving rickshaw
4. The Ride: pinned horizontal scroll on desktop (≥900px), parallax layers, 7 shop stops, HUD; vertical list on mobile/tablet
5. Clients marquee, 6. Cinema / work, 7. SNAD acronym on the rickshaw back,
8. Milestones (count-up), 9. Studio Seven Nine, 10. The Cast, 11. Contact form, 12. Footer

Everything respects `prefers-reduced-motion`.

## Brand tokens

| Token | Value |
|---|---|
| SNAD red | `#E3101B` |
| Ink | `#141414` |
| Cream | `#FFF4DC` |
| Yellow | `#FFC72C` |
| Pink | `#FF2E88` |
| Teal | `#00A6A6` |
| Green | `#2FB55A` |
| Orange | `#FF6B1A` |
| Purple | `#7B3FE4` |

## Example content to replace (all in `lib/data.ts`)

- **Stats** (`MILESTONES`): 9+ years, 250+ brands, 1,200+ campaigns, 45+ people
- **Case studies** (`CASES`): fictional clients and results
- **Client wordmarks** (`CLIENTS_A/B`): fictional brands; replace with real logo files
- **Team** (`CAST`): placeholder names; photos are Unsplash stock (`public/team/`)
- Social links in `components/Footer.tsx` (`href="#"`)
- Contact form: `app/api/contact/route.ts` only logs submissions; connect email (e.g. Resend), a CRM or WhatsApp
- Set `NEXT_PUBLIC_SITE_URL` in production for correct Open Graph URLs
