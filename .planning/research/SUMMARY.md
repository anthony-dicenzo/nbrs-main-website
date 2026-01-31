# Project Research Summary

**Project:** NBRS Main Website v4
**Domain:** Premium Marketing Website (Video-Heavy, SvelteKit Static)
**Researched:** 2026-01-31
**Confidence:** HIGH

## Executive Summary

This is a premium, multi-page marketing website for a housing developer that must balance brand vibrancy with technical polish. The product category is well-understood: video-heavy marketing sites for real estate/development have established patterns, with the key challenge being video performance optimization. The recommended approach uses SvelteKit with static generation, GSAP for animations, and Tailwind CSS, following patterns from successful reference sites like American Housing.

The critical success factor is video optimization. Research confirms the current site's main failure (32MB+ unoptimized videos causing lag and broken mobile experience) is a known pitfall with well-documented solutions. Videos must be aggressively compressed (under 5MB for mobile, under 10MB for desktop), delivered in modern formats (WebM/VP9 with MP4 fallback), and served with proper poster images for LCP performance. The splash animation must be migrated carefully using GSAP context-based cleanup to avoid route change bugs.

Key risks are manageable: GSAP ScrollTrigger breaking on SvelteKit navigation (solved with context cleanup pattern), mobile video autoplay failures (solved with required attributes and file size limits), and Core Web Vitals failures from video CLS (solved with aspect-ratio CSS). The stack is mature, documentation is excellent, and all major pitfalls have proven prevention strategies. With proper video pipeline setup in Phase 1, this is a low-risk build.

## Key Findings

### Recommended Stack

The research validates the SvelteKit + GSAP + Tailwind approach. SvelteKit 2 with Svelte 5 provides file-based routing, static site generation via adapter-static, and excellent DX with Vite. Tailwind v4 eliminates PostCSS config via the native Vite plugin. GSAP 3.14 handles complex animations that Svelte transitions cannot (timeline sequences, ScrollTrigger). The stack is current, well-documented, and proven for this use case.

**Core technologies:**
- **SvelteKit ^2.50** with **@sveltejs/adapter-static ^3.0** — Static HTML generation for Cloudflare Pages, file-based routing, layout inheritance
- **Svelte ^5.49** with Runes syntax — Minimal compiled JS, ideal for performance-critical marketing sites, clean GSAP integration via actions
- **Tailwind CSS ^4.1** with **@tailwindcss/vite** — Utility-first CSS with native Vite integration, no PostCSS config, tree-shakable
- **GSAP ^3.14** — Industry standard for splash animation and scroll effects, works with Svelte via actions pattern
- **FFmpeg** (local tooling) — Video transcoding with H.264, VP9, and optional AV1 support, targeting 3-5MB for 10-15s clips

**Critical version requirements:**
- SvelteKit 2 requires Svelte 5
- Tailwind v4 requires @tailwindcss/vite (versions must match)
- GSAP should use context-based cleanup for SvelteKit compatibility

### Expected Features

Research distinguishes table stakes from differentiators. The core finding: users expect mobile-first responsive design, fast load times (Core Web Vitals), clear navigation, contact forms, and accessibility (WCAG 2.2 AA). These are non-negotiable for 2026 marketing sites.

**Must have (table stakes):**
- Mobile-first responsive design — 60%+ of traffic is mobile, Google mobile-first indexing
- Core Web Vitals compliance (LCP <2.5s, CLS <0.1) — Critical for SEO and trust
- Clear navigation with sticky header — Expected UX pattern
- Contact/partner inquiry forms with validation — Basic lead capture
- Privacy policy and legal pages — GDPR/CCPA compliance
- High-quality imagery optimized for web — Visual-first industry

**Should have (competitive):**
- Video hero with optimized performance — Creates emotional connection, American Housing pattern
- Scroll-triggered animations — Premium feel, modern brand signal
- Waitlist with social proof counter — Builds anticipation, higher intent leads
- Playful micro-interactions — Reinforces "vibey, community" brand personality
- Community-focused content — Emphasizes lifestyle over square footage, 2026 trend
- Project-specific video showcase — Brings unbuilt projects to life

**Defer (v2+):**
- Page transitions (View Transitions API) — Nice-to-have, significant architecture implications
- Blog/content section — Only with committed content strategy, stale blog worse than none
- Virtual 3D walkthrough — Apple Vision Pro still niche, video serves 95% of use case
- Multi-language support — Only if audience demands it

**Anti-features (avoid):**
- AI chatbot — Generic responses hurt premium brand, simple contact form better
- Newsletter popup on arrival — Interrupts first impression, high bounce
- Autoplay video with sound — Universally hated, blocked by browsers
- Parallax on everything — Performance killer on mobile, motion sickness risk

### Architecture Approach

The architecture follows standard SvelteKit patterns: file-based routing with layout inheritance, components grouped by concern (layout/animation/video/forms/ui), and Svelte actions for GSAP integration. The key insight is that splash animation state must persist across navigation using stores + sessionStorage, and GSAP cleanup is critical using context-based patterns to avoid ScrollTrigger bugs on route changes.

**Major components:**
1. **Root Layout (+layout.svelte)** — Navigation, footer, splash animation orchestration, shared state persistence
2. **Video Components (VideoHero, VideoSection)** — Resolution switching by viewport, IntersectionObserver lazy loading, poster image preloading for LCP
3. **GSAP Actions (animate, inview, lazyVideo)** — Reusable Svelte actions for animation lifecycle, proper cleanup on destroy
4. **Splash Animation** — GSAP timeline with letters flip (3D rotation) + circle expansion, session-gated playback
5. **Form Components (HubSpotForm, ContactForm)** — Embedded HubSpot script, validation, separate investor vs resident flows

**Key patterns:**
- GSAP integration via Svelte actions (not inline onMount) for reusability and cleanup
- Video lazy loading via IntersectionObserver action below the fold
- Resolution switching based on viewport width and connection speed
- Context-based GSAP cleanup to prevent route change bugs

### Critical Pitfalls

Research identified six critical pitfalls, all with proven prevention strategies. These are not theoretical risks — they are documented failures from the current site and similar projects.

1. **Unoptimized video files** — Current site ships 32MB+ files causing 10s+ load times. Prevention: FFmpeg pipeline with H.264 (3-5MB for 10-15s), strip audio, 720p max for backgrounds, WebM/VP9 variant. Target <5MB mobile, <10MB desktop.

2. **Missing video poster images (LCP killer)** — Without preloaded posters, LCP waits for video decode (fails <2.5s threshold). Prevention: Always include poster attribute, use `<link rel="preload" as="image" fetchpriority="high">`, match aspect ratio exactly.

3. **GSAP ScrollTrigger breaking on SvelteKit route changes** — Animations work on first visit, fail after navigation. Well-documented issue. Prevention: Use `gsap.context()` and `ctx.revert()` in onDestroy, call `invalidateOnRefresh: true`.

4. **Mobile video autoplay failing silently** — Current site removed mobile video entirely. Prevention: Always use `autoplay muted loop playsinline`, keep under 5MB, detect failure and show fallback image.

5. **Animation-caused layout thrashing (jank)** — Scroll animations drop below 60fps when animating layout properties. Prevention: Only animate transform/opacity (GPU-accelerated), use `will-change: transform`, respect `prefers-reduced-motion`.

6. **Video CLS (Cumulative Layout Shift)** — Videos without dimensions cause content jumps, fail Core Web Vitals. Prevention: Always set `aspect-ratio` in CSS, match poster dimensions, reserve space with containers.

## Implications for Roadmap

Based on research, the critical path is: **foundation first (including video pipeline), then layout, then animation/video components, then content population, then polish**. Video optimization cannot be deferred — it must be Phase 1 infrastructure or every subsequent phase inherits broken performance.

### Phase 1: Foundation & Infrastructure
**Rationale:** SvelteKit setup, static adapter, video optimization pipeline must exist before any component development. The current site's failure is shipping unoptimized videos — this cannot happen again.

**Delivers:**
- SvelteKit project with adapter-static configured for Cloudflare Pages
- Tailwind v4 with Vite plugin, theme configured (NBRS green, brand colors)
- FFmpeg video compression workflow (H.264 + WebM/VP9, mobile + desktop resolutions)
- File structure with organized directories (routes, components, actions, utils)
- Basic routing structure (/, /about, /project, /waitlist, /contact)

**Addresses:**
- Video optimization infrastructure (prevents Pitfall #1)
- Stack setup (STACK.md recommendations)
- Performance foundation (Core Web Vitals baseline)

**Avoids:** Shipping unoptimized videos, missing video pipeline

**Research flag:** Skip research-phase — standard SvelteKit setup, well-documented

---

### Phase 2: Layout & Navigation
**Rationale:** Layout must exist before pages can render. Navigation patterns are table stakes and dependency-free.

**Delivers:**
- Root layout with navigation and footer
- Responsive mobile menu
- Layout persistence across routes
- Basic page structure for all routes

**Uses:**
- SvelteKit layout inheritance
- Tailwind responsive utilities
- Component organization pattern from ARCHITECTURE.md

**Addresses:**
- Clear navigation (table stakes from FEATURES.md)
- Mobile-first responsive (table stakes)

**Research flag:** Skip research-phase — standard patterns

---

### Phase 3: GSAP Animation Foundation
**Rationale:** Splash animation and GSAP lifecycle patterns must be established before building scroll animations. Context cleanup is critical to avoid route change bugs.

**Delivers:**
- GSAP context-based setup with proper cleanup
- Splash animation migration (letters flip, circle expand)
- Splash state management (store + sessionStorage)
- Reusable animation actions (animate, inview)

**Uses:**
- GSAP with context pattern
- Svelte actions for lifecycle management
- Stores for splash state persistence

**Avoids:**
- GSAP route change bugs (Pitfall #3)
- Memory leaks from missing cleanup

**Implements:** SplashAnimation component from ARCHITECTURE.md

**Research flag:** Skip research-phase — GSAP patterns documented in PITFALLS.md

---

### Phase 4: Video Components
**Rationale:** Video infrastructure (pipeline) exists from Phase 1, GSAP foundation exists from Phase 3. Now build video components with performance baked in.

**Delivers:**
- VideoHero component (resolution switching, poster preload)
- VideoSection component (lazy loading below fold)
- Mobile fallback logic (detect autoplay failure)
- Aspect-ratio CSS for CLS prevention

**Uses:**
- FFmpeg pipeline from Phase 1
- IntersectionObserver for lazy loading
- Svelte actions for lazyVideo

**Avoids:**
- Missing poster images (Pitfall #2)
- Mobile autoplay failures (Pitfall #4)
- Video CLS (Pitfall #6)

**Implements:** Video component architecture from ARCHITECTURE.md

**Research flag:** Skip research-phase — patterns documented in STACK.md and PITFALLS.md

---

### Phase 5: Scroll Animations & Micro-interactions
**Rationale:** GSAP foundation exists, video components exist. Now layer in scroll effects and playful interactions.

**Delivers:**
- GSAP ScrollTrigger animations
- Micro-interactions (hover states, button feedback)
- Performance-tested scroll effects (60fps target)

**Uses:**
- GSAP ScrollTrigger with invalidateOnRefresh
- Transform/opacity only (GPU-accelerated)

**Avoids:**
- Animation jank (Pitfall #5)
- Layout thrashing from animating width/height

**Implements:** Playful micro-interactions (differentiator from FEATURES.md)

**Research flag:** Skip research-phase — performance patterns in PITFALLS.md

---

### Phase 6: Content & Forms
**Rationale:** All infrastructure and components exist. Now populate pages with content and integrate forms.

**Delivers:**
- Homepage content (hero video, about, partner form)
- About/Mission page
- Project page (with project video)
- Waitlist page (with social proof counter)
- Contact/Invest page
- HubSpot form integration

**Uses:**
- Video components from Phase 4
- Layout from Phase 2
- HubSpot embed pattern from ARCHITECTURE.md

**Addresses:**
- Content population across all pages
- Waitlist with social proof (differentiator)
- Separate investor/resident forms

**Research flag:** Skip research-phase — content population, standard patterns

---

### Phase 7: Performance & Accessibility Polish
**Rationale:** All features built, now optimize and ensure compliance.

**Delivers:**
- Core Web Vitals passing (LCP <2.5s, CLS <0.1, FID <100ms)
- WCAG 2.2 AA compliance
- Performance budget enforcement
- SEO meta tags and Open Graph
- Final optimizations (image compression, bundle analysis)

**Uses:**
- @sveltejs/enhanced-img for static image optimization
- svelte-meta-tags for SEO (optional, can use native svelte:head)

**Addresses:**
- Core Web Vitals (table stakes)
- Accessibility (table stakes)
- SEO fundamentals

**Research flag:** Skip research-phase — standard performance/a11y testing

---

### Phase Ordering Rationale

- **Video pipeline must be Phase 1** because every subsequent phase with video content depends on it. Deferring optimization creates technical debt and risks shipping broken performance.

- **Layout before pages** because SvelteKit's layout inheritance means pages render inside layouts. Cannot build pages without layout structure.

- **GSAP foundation before scroll animations** because cleanup patterns must be established before building complex ScrollTrigger code. Route change bugs are easier to prevent than debug.

- **Video components after GSAP foundation** because splash animation (blocking overlay) must work before hero video loads. User sees splash, then video.

- **Scroll animations after video components** because performance testing requires both to coexist. Scroll + video decode creates CPU contention that must be measured.

- **Content last** because components must exist before they can be populated. Content is the easiest phase to parallelize once infrastructure is solid.

- **Polish final** because performance testing requires complete features. Cannot measure LCP without real content, cannot test CLS without real video dimensions.

### Research Flags

**Skip research-phase for all phases:**
- Phase 1-7 all use well-documented patterns
- STACK.md provides setup instructions
- ARCHITECTURE.md provides component patterns
- PITFALLS.md provides prevention strategies
- Official SvelteKit, GSAP, Tailwind docs are comprehensive

**Why no deep research needed:**
- Marketing site patterns are mature and proven
- Video optimization has established workflows (FFmpeg)
- GSAP + SvelteKit integration documented in forums and community
- Core Web Vitals optimization well-documented by web.dev
- All critical pitfalls have known prevention strategies

**When to research:**
- If adding features not in this research (e.g., CMS, authentication, 3D)
- If pivoting to server-side features (would need adapter-cloudflare research)
- If adding video CDN later (Cloudflare Stream, Mux)

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Official SvelteKit, Tailwind, GSAP docs verified. Versions confirmed via npm. Reference site (American Housing) validates approach. |
| Features | HIGH | 2026 web design trends from multiple sources, real estate marketing patterns verified, table stakes aligned across sources. |
| Architecture | HIGH | SvelteKit project structure from official docs, GSAP patterns from official forums, video optimization from web.dev (Google). |
| Pitfalls | HIGH | All 6 critical pitfalls verified with official sources (web.dev, GSAP forums) or documented failures from current site. |

**Overall confidence:** HIGH

All research areas have HIGH confidence because findings are backed by official documentation (SvelteKit, GSAP, Tailwind, web.dev) or multiple authoritative sources. The current site provides real-world validation of what NOT to do (unoptimized videos, broken mobile experience), and reference sites like American Housing validate what DOES work.

### Gaps to Address

**Video CDN decision deferred:** Research assumes self-hosted optimized video (constraint from PROJECT.md). If bandwidth costs become an issue at scale, will need to research Cloudflare Stream or Mux. This is a v2+ consideration (site will start at <10k visits/month where self-hosted is fine).

**Exact splash animation preservation:** Current site has specific GSAP timeline (letters flip with 3D rotation, white circle expands). Research provides migration pattern, but exact timing/easing will need to be measured from existing code during Phase 3.

**HubSpot form embed specifics:** Research confirms HubSpot forms load script dynamically in onMount. Exact form IDs and embed code will need to be pulled from current site during Phase 6.

**Content specifics:** Research defines feature types (hero video, about section, project showcase) but actual video files, copy, images are TBD. This is expected — research defines structure, content comes during implementation.

**None of these gaps block roadmap creation.** They are implementation details that resolve during their respective phases.

## Sources

### Primary (HIGH confidence)
- [SvelteKit Official Docs](https://svelte.dev/docs/kit/introduction) — Framework features, adapter-static, project structure
- [Svelte 5 Official Docs](https://svelte.dev/docs/svelte/what-are-runes) — Runes syntax, lifecycle hooks
- [Tailwind CSS v4 Guide](https://tailwindcss.com/docs/guides/sveltekit) — Vite plugin installation
- [GSAP Official Docs](https://gsap.com/docs/v3/Installation) — Installation, version info
- [GSAP Community Forums](https://gsap.com/community/forums/topic/40926-sveltekit-2-svelte-5-gsap-stuck-on-scrolltrigger-not-working-as-expected-after-route-change/) — SvelteKit integration patterns, route change bug solutions
- [web.dev Video Performance](https://web.dev/learn/performance/video-performance) — Google's official video optimization guidance
- [web.dev Core Web Vitals](https://web.dev/articles/lcp) — LCP, CLS, FID optimization
- [MDN Animation Performance](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Animation_performance_and_frame_rate) — GPU acceleration best practices

### Secondary (MEDIUM confidence)
- [Content Marketing Strategy 2026](https://www.impactplus.com/learn/content-marketing-strategy) — Marketing trends
- [Digital Marketing Trends 2026](https://astoundz.com/top-10-digital-marketing-trends-2026/) — Industry patterns
- [Real Estate Web Design Trends 2025-2026](https://realogixs.com/top-real-estate-web-design-trends-for-2025) — Domain-specific patterns
- [Waitlist Landing Page Optimization Guide](https://waitlister.me/growth-hub/guides/waitlist-landing-page-optimization-guide) — Waitlist best practices
- [Video Optimization Best Practices](https://cloudinary.com/guides/web-performance/video-optimization-why-you-need-it-and-5-critical-best-practices) — Video compression strategies
- [FFmpeg VP9/AV1 Optimization](https://pixelpoint.io/blog/web-optimized-video-ffmpeg/) — Encoding presets

### Tertiary (Community patterns, verified against official docs)
- [GSAP + Svelte Integration Pattern](https://dev.to/jasper-clarke/integrating-svelte-5-with-gsap-3-54no) — Community pattern, aligns with official action docs
- [SvelteKit Project Structure Explained](https://joyofcode.xyz/sveltekit-project-structure) — Verified against official docs
- [Lazy-loading videos with Svelte actions](https://www.leereamsnyder.com/lazy-loading-videos-svelte-action) — Community pattern

---
*Research completed: 2026-01-31*
*Ready for roadmap: yes*
