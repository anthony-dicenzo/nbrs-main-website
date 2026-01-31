# Roadmap: NBRS Main Website v4

## Overview

This roadmap transforms a laggy, monolithic HTML site into a polished SvelteKit marketing experience. The journey follows a strict dependency chain: infrastructure and video pipeline first (the root cause of current failures), then layout, then animations, then content. Each phase delivers something observable and testable, building toward a site that feels alive with smooth videos, buttery animations, and NBRS personality.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [x] **Phase 1: Foundation & Infrastructure** - SvelteKit project with video optimization pipeline
- [ ] **Phase 2: Layout & Navigation** - Shared layout, nav, footer working across routes
- [ ] **Phase 3: GSAP Animation Foundation** - Splash animation migrated with proper lifecycle
- [ ] **Phase 4: Video Components** - Optimized video playback with mobile fallbacks
- [ ] **Phase 5: Scroll Animations & Micro-interactions** - Scroll effects and hover polish
- [ ] **Phase 6: Content & Forms** - All pages populated, forms integrated with HubSpot
- [ ] **Phase 7: Performance & Accessibility** - Core Web Vitals passing, WCAG 2.2 AA compliant

## Phase Details

### Phase 1: Foundation & Infrastructure
**Goal**: Project scaffolded with SvelteKit, Tailwind, GSAP, and video optimization pipeline ready for content
**Depends on**: Nothing (first phase)
**Requirements**: INFRA-01, INFRA-02, INFRA-03, INFRA-04, INFRA-05
**Plans**: 3 plans in 2 waves

**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` serves a working SvelteKit app with Tailwind styles applied
  2. Running `npm run build` produces static output suitable for Cloudflare Pages
  3. GSAP can be imported and used in a component without errors
  4. FFmpeg scripts exist to compress any video to <5MB WebM/MP4
  5. Route structure exists for all pages (/, /partner, /waitlist, /family-1)

Plans:
- [x] 01-01-PLAN.md — SvelteKit + Tailwind + GSAP project setup (Wave 1)
- [x] 01-02-PLAN.md — Static adapter and route structure (Wave 2)
- [x] 01-03-PLAN.md — Video optimization pipeline with FFmpeg presets (Wave 1)

### Phase 2: Layout & Navigation
**Goal**: Users see consistent navigation and footer on every page
**Depends on**: Phase 1
**Requirements**: PAGE-01, HOME-06
**Success Criteria** (what must be TRUE):
  1. Navigation header appears on all routes with links to all pages
  2. Footer with navigation links and social media appears on all routes
  3. Mobile menu opens/closes smoothly on small screens
  4. Layout persists across route navigation (no flash or reload)
**Plans**: TBD

Plans:
- [ ] 02-01: Root layout with header and footer components
- [ ] 02-02: Responsive mobile navigation

### Phase 3: GSAP Animation Foundation
**Goal**: Splash animation works exactly like the current site with proper cleanup on route changes
**Depends on**: Phase 2
**Requirements**: ANI-01, ANI-02, ANI-05
**Success Criteria** (what must be TRUE):
  1. First visit shows splash animation (letters appear staggered with scale/bounce, pulse, settle, white circle expands)
  2. Navigating away and back does NOT replay splash animation (session-gated)
  3. Navigating between pages does NOT cause GSAP errors or memory leaks
  4. Animation respects prefers-reduced-motion (skips or simplifies)
**Plans**: TBD

Plans:
- [ ] 03-01: GSAP context pattern and reusable actions
- [ ] 03-02: Splash animation component with session gating

### Phase 4: Video Components
**Goal**: Videos load fast, play smoothly, and gracefully handle mobile
**Depends on**: Phase 3 (splash must work before video hero shows)
**Requirements**: VID-01, VID-02, VID-03, VID-04, PERF-04
**Success Criteria** (what must be TRUE):
  1. Hero video starts playing within 2 seconds of splash completion
  2. Videos are under 5MB with WebM primary and MP4 fallback
  3. Mobile devices show static poster image instead of video (no broken playback)
  4. Transitioning between video sections shows smooth fade (no jarring cut)
  5. Below-fold videos only load when scrolled into view
**Plans**: TBD

Plans:
- [ ] 04-01: VideoHero component with poster preload
- [ ] 04-02: VideoSection component with lazy loading
- [ ] 04-03: Mobile detection and image fallback

### Phase 5: Scroll Animations & Micro-interactions
**Goal**: Site feels alive with scroll reveals and interactive feedback
**Depends on**: Phase 4
**Requirements**: ANI-03, ANI-04
**Success Criteria** (what must be TRUE):
  1. Content sections fade/slide in as user scrolls (not instant appearance)
  2. Buttons and links have visible hover states with subtle animation
  3. Animations run at 60fps (no jank or frame drops)
  4. Animations respect prefers-reduced-motion
**Plans**: TBD

Plans:
- [ ] 05-01: ScrollTrigger section reveals
- [ ] 05-02: Micro-interactions and hover states

### Phase 6: Content & Forms
**Goal**: All pages have content and forms submit to HubSpot
**Depends on**: Phase 5
**Requirements**: HOME-01, HOME-02, HOME-03, HOME-04, HOME-05, PAGE-02, PAGE-03, FORM-01, FORM-02, FORM-03, FORM-04
**Success Criteria** (what must be TRUE):
  1. Homepage shows hero video, FAMILY 1 preview, How We Build, About, and Partner form sections
  2. Partner page explains investment/partnership opportunities with contact form
  3. Waitlist page collects name, email, phone, household size, neighborhood, unit type
  4. Form submissions appear in HubSpot within 30 seconds
  5. Invalid form input shows clear error messages
  6. Successful submission shows confirmation message
**Plans**: TBD

Plans:
- [ ] 06-01: Homepage sections (hero, project preview, about)
- [ ] 06-02: Partner and Waitlist pages
- [ ] 06-03: HubSpot form integration
- [ ] 06-04: Form validation and success states

### Phase 7: Performance & Accessibility
**Goal**: Site passes Core Web Vitals and accessibility audits
**Depends on**: Phase 6
**Requirements**: PERF-01, PERF-02, PERF-03, A11Y-01, A11Y-02, A11Y-03
**Success Criteria** (what must be TRUE):
  1. Lighthouse scores green for Performance, Accessibility, Best Practices, SEO (>90)
  2. LCP under 2.5 seconds on mobile 4G
  3. CLS under 0.1 (no layout shifts from video loading)
  4. All interactive elements reachable via keyboard (Tab, Enter, Escape)
  5. Screen reader announces all content meaningfully (VoiceOver test)
  6. Site works correctly on mobile viewport (320px to 428px width)
**Plans**: TBD

Plans:
- [ ] 07-01: Core Web Vitals optimization
- [ ] 07-02: Accessibility audit and fixes
- [ ] 07-03: Mobile responsive polish

## Progress

**Execution Order:**
Phases execute in numeric order: 1 -> 2 -> 3 -> 4 -> 5 -> 6 -> 7

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation & Infrastructure | 3/3 | ✓ Complete | 2026-01-31 |
| 2. Layout & Navigation | 0/2 | Not started | - |
| 3. GSAP Animation Foundation | 0/2 | Not started | - |
| 4. Video Components | 0/3 | Not started | - |
| 5. Scroll Animations & Micro-interactions | 0/2 | Not started | - |
| 6. Content & Forms | 0/4 | Not started | - |
| 7. Performance & Accessibility | 0/3 | Not started | - |

---
*Roadmap created: 2026-01-31*
*Total requirements: 34 | Total phases: 7 | Total plans: 19*
