# SNAD Media website

Next.js 16 (App Router) build of the "SNAD Creative Agency Overview" design: Home and Services pages.

## Run

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start   # production
```

## Where things live

| What | Where |
| --- | --- |
| All text (services, case studies, team, blog, contact) | `lib/content.ts` |
| Styles (colours, type, animation) | `app/globals.css` |
| Home / Services pages | `app/page.tsx`, `app/services/page.tsx` |
| Nav, footer, splash, scroll effects | `components/` |
| Animated illustrations (Storyset, cuate style) | `public/illustrations/*.svg` |
| Photos (Unsplash) | `public/images/` |
| Client logos | `public/logos/client-01.svg` … `client-20.svg` |
| SNAD logo files | `public/snad-logo-light.svg`, `snad-logo-dark.svg`, `snad-wordmark.svg` |

## Replace before launch

These are **sample** stand-ins, marked `SAMPLE` in `lib/content.ts`:

- **Case studies**: client, title and result figures, plus the cover images `public/images/case-*.jpg` (4:3).
- **Team**: names, roles and photos `public/images/team-*.jpg` (1 and 3 square, 2 and 4 portrait 3:4).
- **Blog posts**: titles, dates, covers `public/images/blog-*.jpg` (16:10).
- **Client logos**: the 20 marks in `public/logos/` are made-up brands. Drop in real one-colour SVG/PNG logos with
  the same file names (add more by extending `CLIENT_LOGOS`).
- **Social links**: `SOCIALS` points to the platform home pages; set SNAD's profile URLs.
- **SNAD logo**: built from Archivo Black Expanded to match the design's wordmark. If SNAD has an official logo,
  swap `components/Logo.tsx` (nav/footer/splash) and `app/icon.svg` (favicon).

## Credits

Illustrations by [Storyset](https://storyset.com) (free licence requires the attribution kept in the footer).
Photos from [Unsplash](https://unsplash.com).
