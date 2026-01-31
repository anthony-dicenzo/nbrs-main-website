# NBRS Main Website v4

## What This Is

A polished, multi-page marketing website for NBRS — a missing middle housing developer in Toronto building neighborhood-scale rental buildings. The site serves as the brand's digital home, attracting investors, building resident waitlists, recruiting talent/partners, and telling the NBRS story with the personality and vibrancy the brand embodies.

NBRS isn't just a developer — it's a vibe. Playful, music-driven, community-rooted, vibrant colors. The website must reflect that energy while maintaining the polish of a top-tier brand.

## Core Value

**The site must feel alive and polished — smooth animations, instant video playback, buttery transitions — while capturing NBRS's unique personality.** If everything else fails, the experience of visiting the site should still feel premium and memorable.

## Requirements

### Validated

- Splash animation (GSAP letters flip in, white circle expands) — existing, must preserve
- NBRS brand identity (green #4fa64f, vibrant colors, playful tone) — existing
- HubSpot form integration — existing
- Mobile-responsive layout — existing (but needs improvement)

### Active

- [ ] Rebuild site in SvelteKit with Tailwind CSS and static adapter
- [ ] Migrate hosting from Porkbun to Cloudflare Pages
- [ ] Preserve and enhance GSAP splash animation in SvelteKit
- [ ] Optimize video experience (compression, web formats, multiple resolutions)
- [ ] Fix video playback (eliminate lag, choppy frames, buffering)
- [ ] Mobile video experience that actually works (not just removed)
- [ ] Smooth section transitions (no jarring jumps between video sections)
- [ ] Homepage with hero video, about section, partner form
- [ ] About/Mission page (the NBRS story, values)
- [ ] Individual Project page (first project with rendering video)
- [ ] Waitlist page for prospective residents
- [ ] Contact/Invest page for investor inquiries
- [ ] Visual consistency across all pages (spacing, typography, hover states)
- [ ] Fast performance (instant loads, no lag)

### Out of Scope

- Careers page — not needed for v4
- Blog/content management — keep it static for now
- User authentication — public marketing site only
- E-commerce/payments — not applicable
- Multiple project pages — just the first project for v4

## Context

**Brand Identity:**
- Tagline: "Sincerely, Your NBRS"
- Voice: Playful, witty, confident, bold
- Archetypes: Creator + Magician + Everyman
- "Good design isn't a luxury—it's the backdrop to life"
- "Good neighbors build good cities"

**Reference Site:**
- https://www.americanhousing.co/ — mission-driven polish, carousel sections, clean transitions
- NBRS wants that level of polish but with more personality and vibrancy

**Current Pain Points:**
- Videos lag on load (32MB+ files unoptimized)
- Choppy playback (frames drop, stuttering)
- Mobile video completely broken (currently just removed)
- Jarring transitions between video sections
- All code in single HTML file, no component organization

**Video Content Available:**
- Project showcases (renders, buildings)
- Process/how-we-build footage
- Lifestyle content
- Brand/culture/community videos

**Target Audiences:**
- Homeowners (prospective residents)
- Investors
- Talent/partners who want to work with NBRS

## Constraints

- **Tech Stack**: SvelteKit + Tailwind CSS + GSAP — chosen to match American Housing's approach and enable clean component organization with lifecycle hooks for animations
- **Hosting**: Cloudflare Pages (static output) — migrating from Porkbun for better CDN and performance
- **Video**: Self-hosted, optimized locally (compress, multiple formats/resolutions) — not using external video CDN
- **Splash Animation**: Must preserve existing GSAP animation exactly (letters flip in with 3D rotation, white circle expands)
- **Browser Support**: Modern browsers with ES6+, HTML5 video

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| SvelteKit over Next.js/Nuxt | Matches American Housing stack, lighter weight, clean GSAP integration, static output | — Pending |
| Cloudflare Pages over Porkbun | Better CDN, performance, free tier, good SvelteKit support | — Pending |
| Self-hosted optimized video over CDN | Control over compression, no external dependencies, works with static hosting | — Pending |
| Preserve splash animation exactly | Strong brand recognition, users expect it | — Pending |

---
*Last updated: 2026-01-31 after initialization*
