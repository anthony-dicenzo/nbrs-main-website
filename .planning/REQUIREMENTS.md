# Requirements: NBRS Main Website v4

**Defined:** 2026-01-31
**Core Value:** The site must feel alive and polished — smooth animations, instant video playback, buttery transitions — while capturing NBRS's unique personality.

## v1 Requirements

Requirements for initial release. Each maps to roadmap phases.

### Infrastructure

- [x] **INFRA-01**: Project scaffolded with SvelteKit 2 + Svelte 5 + TypeScript
- [x] **INFRA-02**: Tailwind CSS v4 configured with Vite plugin
- [x] **INFRA-03**: GSAP integrated with Svelte actions pattern for clean lifecycle
- [x] **INFRA-04**: Static adapter configured for Cloudflare Pages deployment
- [x] **INFRA-05**: Video optimization pipeline established (ffmpeg presets for WebM/MP4)

### Video & Media

- [ ] **VID-01**: All videos optimized to <5MB with WebM primary + MP4 fallback
- [ ] **VID-02**: Mobile devices show static image fallback instead of video
- [ ] **VID-03**: Smooth fade transitions between video sections
- [ ] **VID-04**: Video lazy loading for below-fold content

### Animation

- [ ] **ANI-01**: Splash animation preserved (GSAP letters appear staggered with scale/bounce, pulse, settle, then white circle expands to reveal content)
- [ ] **ANI-02**: Splash only plays once per session (persisted in sessionStorage)
- [ ] **ANI-03**: Scroll-triggered animations for section reveals (fade in, slide up)
- [ ] **ANI-04**: Micro-interactions on interactive elements (hover states, button feedback)
- [ ] **ANI-05**: GSAP context cleanup on route changes (ctx.revert() pattern)

### Homepage Sections

- [ ] **HOME-01**: Video hero section with headline and "Sincerely, Your NBRS" tagline
- [ ] **HOME-02**: FAMILY 1 project preview section (renders, video showcase)
- [ ] **HOME-03**: How We Build section (NBRS process/approach)
- [ ] **HOME-04**: About/Mission section (NBRS story, values, personality)
- [ ] **HOME-05**: Partner With Us CTA section with contact form
- [x] **HOME-06**: Footer with navigation links and social media

### Pages

- [x] **PAGE-01**: Shared layout with navigation header and footer
- [ ] **PAGE-02**: Partner/Investor page for non-profits, landowners, investors
- [ ] **PAGE-03**: FAMILY 1 Waitlist page with rich form experience

### Forms

- [ ] **FORM-01**: Contact/Partner form integrated with HubSpot
- [ ] **FORM-02**: Waitlist form collecting: name, email, phone, household size, current neighborhood, unit type (1BD/1BD+DEN/2BD/3BD)
- [ ] **FORM-03**: Form validation with clear error states
- [ ] **FORM-04**: Success confirmation after form submission

### Performance

- [ ] **PERF-01**: Core Web Vitals passing (LCP <2.5s, CLS <0.1, INP <200ms)
- [ ] **PERF-02**: Mobile-first responsive design across all pages
- [ ] **PERF-03**: Fast initial load with optimized bundle size
- [ ] **PERF-04**: Video poster images for instant visual before load

### Accessibility

- [ ] **A11Y-01**: WCAG 2.2 AA compliance for all pages
- [ ] **A11Y-02**: Keyboard navigation support
- [ ] **A11Y-03**: Screen reader compatible content

## v2 Requirements

Deferred to future release. Tracked but not in current roadmap.

### Enhanced Features

- **ENH-01**: Page transitions (smooth animations between routes)
- **ENH-02**: Waitlist social proof counter ("Join 247 others")
- **ENH-03**: Multiple project pages (beyond FAMILY 1)
- **ENH-04**: Media recognition section (press logos)
- **ENH-05**: Blog/news section
- **ENH-06**: Careers page

## Out of Scope

Explicitly excluded. Documented to prevent scope creep.

| Feature | Reason |
|---------|--------|
| User authentication | Public marketing site only |
| E-commerce/payments | Not applicable |
| CMS/admin panel | Keep it static for v4, content managed via code |
| AI chatbot | Research shows it hurts premium feel |
| Newsletter popup | Kills first impressions per research |
| Autoplay audio | Blocked by browsers, hated by users |
| Complex parallax | Performance killer per research |

## Traceability

Which phases cover which requirements. Updated during roadmap creation.

| Requirement | Phase | Status |
|-------------|-------|--------|
| INFRA-01 | Phase 1 | Complete |
| INFRA-02 | Phase 1 | Complete |
| INFRA-03 | Phase 1 | Complete |
| INFRA-04 | Phase 1 | Complete |
| INFRA-05 | Phase 1 | Complete |
| VID-01 | Phase 4 | Pending |
| VID-02 | Phase 4 | Pending |
| VID-03 | Phase 4 | Pending |
| VID-04 | Phase 4 | Pending |
| ANI-01 | Phase 3 | Pending |
| ANI-02 | Phase 3 | Pending |
| ANI-03 | Phase 5 | Pending |
| ANI-04 | Phase 5 | Pending |
| ANI-05 | Phase 3 | Pending |
| HOME-01 | Phase 6 | Pending |
| HOME-02 | Phase 6 | Pending |
| HOME-03 | Phase 6 | Pending |
| HOME-04 | Phase 6 | Pending |
| HOME-05 | Phase 6 | Pending |
| HOME-06 | Phase 2 | Complete |
| PAGE-01 | Phase 2 | Complete |
| PAGE-02 | Phase 6 | Pending |
| PAGE-03 | Phase 6 | Pending |
| FORM-01 | Phase 6 | Pending |
| FORM-02 | Phase 6 | Pending |
| FORM-03 | Phase 6 | Pending |
| FORM-04 | Phase 6 | Pending |
| PERF-01 | Phase 7 | Pending |
| PERF-02 | Phase 7 | Pending |
| PERF-03 | Phase 7 | Pending |
| PERF-04 | Phase 4 | Pending |
| A11Y-01 | Phase 7 | Pending |
| A11Y-02 | Phase 7 | Pending |
| A11Y-03 | Phase 7 | Pending |

**Coverage:**
- v1 requirements: 34 total
- Mapped to phases: 34
- Unmapped: 0

---
*Requirements defined: 2026-01-31*
*Last updated: 2026-01-31 after roadmap creation*
