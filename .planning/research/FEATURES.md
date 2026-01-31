# Feature Research

**Domain:** Premium Marketing Website (Housing Developer)
**Researched:** 2026-01-31
**Confidence:** HIGH (verified via multiple 2026 sources)

## Feature Landscape

### Table Stakes (Users Expect These)

Features users assume exist. Missing these = product feels incomplete or unprofessional.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Mobile-first responsive design** | 60%+ of traffic is mobile; Google prioritizes mobile-first indexing | MEDIUM | Must be designed mobile-first, not desktop-adjusted. Load <3s on mobile or lose 50% of visitors |
| **Fast page load (Core Web Vitals)** | Slow sites = bounce. LCP <2.5s, FID <100ms, CLS <0.1 | MEDIUM | Critical for SEO and conversions. Performance directly impacts trust |
| **Clear navigation** | Users expect to find pages within 2-3 clicks | LOW | Sticky header, minimal top-level items. Homepage, About, Projects, Contact |
| **Contact information visible** | Basic credibility signal; legal requirement in some jurisdictions | LOW | Footer minimum: email, phone, address. Contact page with form |
| **SSL/HTTPS** | Browser warnings without it; Google ranking factor | LOW | Non-negotiable in 2026 |
| **Privacy policy & legal pages** | GDPR/CCPA compliance; trust signal | LOW | Link in footer. Clear, readable language |
| **Accessible design (WCAG 2.2 AA)** | Legal requirement trending; 26% of US adults have disabilities; overlaps 40-50% with SEO best practices | MEDIUM | Color contrast, keyboard navigation, alt text, focus states. Overlay widgets do NOT provide compliance |
| **High-quality imagery** | Visual-first industry; low-quality images signal low-quality product | LOW | Professional photography or high-end renders. Optimize for web (<200KB per image) |
| **Clear value proposition above fold** | Users decide in <5 seconds if they'll stay | LOW | "What do you do?" answered immediately. For NBRS: housing developer, community-focused |
| **Working forms with validation** | Broken forms = lost leads | LOW | Real-time validation, clear error messages, success confirmation |
| **Social links** | Expected for brand verification | LOW | LinkedIn, Instagram minimum. Links in footer |
| **404 page** | Broken links happen; 404 should guide users back | LOW | Brand-consistent, helpful navigation back to main pages |

### Differentiators (Competitive Advantage)

Features that set NBRS apart. Not required, but valued highly by visitors and signal premium brand.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Video hero with optimized performance** | Creates emotional connection; showcases lifestyle/community vibe. American Housing uses this effectively | HIGH | Keep <5MB, 10-30s loop, 720p, strip audio, poster image for LCP. Mobile fallback to static image. CDN-hosted |
| **Scroll-triggered animations** | Premium feel; guides attention; modern brand signal | MEDIUM | GSAP ScrollTrigger or Framer Motion. Use transform/opacity only (GPU-accelerated). Kill timelines on unmount |
| **Playful, brand-consistent micro-interactions** | Reinforces "vibey, community" brand. 2026 trend: expressive design over minimalism | MEDIUM | Hover states, button feedback, cursor effects. Don't overdo--purposeful not decorative |
| **Project-specific video rendering showcase** | Brings project to life before it exists; differentiates from static competitor sites | HIGH | Similar to hero video optimization. Consider autoplay on scroll-into-view |
| **Waitlist with social proof** | Builds anticipation; collects leads with higher intent. Live counters beat "thousands have joined" | MEDIUM | Email-only form. "Join X others" counter. Position in queue ("You're #157") creates urgency |
| **Partner/investor inquiry form (segmented)** | Separates investor leads from resident leads; enables targeted follow-up | LOW | Distinct CTA from waitlist. Multi-step if qualifying questions needed |
| **Storytelling page structure** | StoryBrand-style: visitor is hero, NBRS is guide. Short sentences, benefit-focused copy | LOW | Cristo Homes example: "Your Home. Your Style." Make it personal immediately |
| **Press/credibility logos** | American Housing shows NYT, Vox, etc. Trust transfer from known brands | LOW | "As seen in" section. Only if actual press coverage exists |
| **Community-focused content** | Emphasizes lifestyle over square footage. 2026 trend: brands want to be "felt not just seen" | LOW | Photos of people, not just buildings. Neighborhood context. Events/activities |
| **Cinematic page transitions** | Premium feel during navigation. Common on award-winning sites | HIGH | Requires SPA or view transitions API. Can hurt perceived performance if slow |
| **Custom cursor or branded elements** | 2026 trend: custom everything (icons, fonts, interactions). Shows design investment | MEDIUM | Subtle custom cursor on desktop. Custom icons vs generic. Brand character optional |
| **Footer with video/engagement element** | Increases session length 28.9%. Conversion opportunity at page end | MEDIUM | Background video loop or animated element. Final CTA for waitlist/contact |

### Anti-Features (Commonly Requested, Often Problematic)

Features that seem good but create problems for a marketing site.

| Feature | Why Requested | Why Problematic | Alternative |
|---------|---------------|-----------------|-------------|
| **AI chatbot** | "Everyone has one now" | Requires ongoing training; generic responses hurt brand; adds complexity for low-volume site | Simple contact form + clear FAQ page. Human response > bot for premium brand |
| **Full property listing search** | Real estate sites have it | NBRS is a developer, not a brokerage. Few active projects. Overkill for current scale | Individual project pages with clear CTAs |
| **User accounts/login** | "People expect accounts" | Unnecessary for marketing site; GDPR/privacy burden; maintenance overhead | Waitlist captures emails without account friction |
| **Blog/news section at launch** | "Good for SEO" | Requires ongoing content commitment; stale blog worse than no blog; distracts from core conversion goals | Consider post-launch if content strategy exists. Static pages rank fine initially |
| **Virtual tour/3D walkthrough** | Competitors have VR | Apple Vision Pro still niche; adds major complexity; video serves 95% of use case better | High-quality video rendering. Defer VR to project-specific microsites if needed |
| **Live chat** | "Instant response" | Requires staffing or expensive service; missed chats worse than no chat; not expected for developer site | Prominent contact form with clear response time expectation ("We respond within 24h") |
| **Newsletter popup on arrival** | "Capture emails immediately" | Interrupts first impression; high bounce; feels desperate | Inline waitlist CTAs in natural scroll positions |
| **Autoplay video with sound** | "Grab attention" | Universally hated; blocked by browsers; accessibility nightmare | Muted autoplay with clear play button for sound. User-initiated audio only |
| **Parallax on everything** | "Modern and cool" | Performance killer on mobile; motion sickness for some users; distracts from content | Strategic parallax on 1-2 sections max. Respect prefers-reduced-motion |
| **Mega-menu navigation** | "Shows all our pages" | Overkill for 5-page site; mobile nightmare; confuses simple structure | Simple nav: Home, About, Projects, Waitlist, Contact. Dropdown only if multiple projects |
| **Background music** | "Sets the vibe" | Auto-audio blocked; accessibility issue; polarizing; adds load time | Muted video hero. Optional sound toggle if critical to brand |

## Feature Dependencies

```
[Video Hero]
    |--requires--> [Video optimization pipeline (compression, CDN)]
    |--requires--> [Poster image for LCP]
    |--requires--> [Mobile fallback image]

[Scroll Animations]
    |--requires--> [Animation library setup (GSAP or Framer Motion)]
    |--conflicts--> [Excessive parallax (pick one approach)]

[Waitlist with Social Proof]
    |--requires--> [Backend/database for storing emails + count]
    |--requires--> [Form validation]
    |--enhances--> [Homepage conversion]
    |--enhances--> [Project pages]

[Partner/Investor Form]
    |--requires--> [Form handling backend]
    |--should-separate--> [Waitlist (different audience, different workflow)]

[Page Transitions]
    |--requires--> [SPA framework OR View Transitions API]
    |--conflicts--> [Static HTML approach]
    |--enhances--> [Scroll animations (cohesive experience)]

[Project Video Showcase]
    |--requires--> [Video optimization pipeline (shared with hero)]
    |--requires--> [Project page template]
```

### Dependency Notes

- **Video Hero requires optimization pipeline:** Cannot just embed raw video. Need compression workflow, CDN hosting, poster images. Budget time for this.
- **Scroll Animations require library setup:** GSAP or Framer Motion choice affects architecture. GSAP for maximum control, Framer Motion for React integration.
- **Waitlist needs backend:** Even simple email collection requires storage. Could use Supabase, Airtable, or serverless function to start.
- **Page transitions conflict with static HTML:** If using pure HTML/CSS, view transitions API is an option but limited browser support. Full SPA (Next.js, Astro) makes this easier.

## MVP Definition

### Launch With (v1)

Minimum viable product -- what's needed to validate and collect leads.

- [x] **Mobile-first responsive 5-page site** -- Homepage, About, Project (1), Waitlist, Contact
- [x] **Video hero on homepage** -- Optimized, muted autoplay, mobile fallback
- [x] **Clear navigation + footer** -- Sticky header, contact/social in footer
- [x] **Waitlist signup form** -- Email-only, confirmation message
- [x] **Contact/Partner inquiry form** -- Simple form with validation
- [x] **Basic accessibility** -- WCAG 2.2 AA compliance for core flows
- [x] **Performance optimized** -- Core Web Vitals passing
- [x] **Legal pages** -- Privacy policy, terms

### Add After Validation (v1.x)

Features to add once core is working and traffic exists.

- [ ] **Scroll animations** -- Add after confirming performance baseline
- [ ] **Waitlist social proof counter** -- Add when meaningful numbers exist (>50 signups)
- [ ] **Additional project pages** -- As new projects launch
- [ ] **Press/credibility section** -- When press coverage happens
- [ ] **Micro-interactions refinement** -- Polish based on user feedback

### Future Consideration (v2+)

Features to defer until clear need emerges.

- [ ] **Page transitions** -- Nice-to-have; significant architecture implications
- [ ] **Blog/content section** -- Only with committed content strategy
- [ ] **Project-specific microsites** -- For flagship developments
- [ ] **Multi-language support** -- If audience demands
- [ ] **Event/community calendar** -- Post-occupancy feature

## Feature Prioritization Matrix

| Feature | User Value | Implementation Cost | Priority |
|---------|------------|---------------------|----------|
| Video hero (optimized) | HIGH | MEDIUM | P1 |
| Mobile-first responsive | HIGH | LOW | P1 |
| Waitlist form | HIGH | LOW | P1 |
| Contact form | HIGH | LOW | P1 |
| Core Web Vitals compliance | HIGH | MEDIUM | P1 |
| WCAG 2.2 AA accessibility | MEDIUM | MEDIUM | P1 |
| Clear navigation | HIGH | LOW | P1 |
| Scroll animations | MEDIUM | MEDIUM | P2 |
| Waitlist social proof | MEDIUM | LOW | P2 |
| Project video showcase | HIGH | MEDIUM | P2 |
| Micro-interactions | LOW | MEDIUM | P2 |
| Press logos section | LOW | LOW | P2 |
| Page transitions | LOW | HIGH | P3 |
| Custom cursor | LOW | LOW | P3 |
| Footer video element | LOW | MEDIUM | P3 |

**Priority key:**
- P1: Must have for launch -- site feels broken without these
- P2: Should have, add when possible -- elevates from functional to premium
- P3: Nice to have, future consideration -- polish that can wait

## Competitor Feature Analysis

| Feature | American Housing | Typical RE Developer | NBRS Approach |
|---------|------------------|---------------------|---------------|
| Video hero | Yes, prominent | Rare | Yes -- key differentiator for vibey brand |
| Scroll animations | Subtle, refined | None | Yes -- but purposeful, not excessive |
| Waitlist/signup | Newsletter focus | Contact form only | Waitlist with urgency/social proof |
| About/Mission | Strong storytelling | Generic "about us" | StoryBrand approach -- visitor as hero |
| Press logos | NYT, Vox, etc. | Usually none | If earned -- major credibility boost |
| Mobile experience | Excellent | Often mediocre | Mobile-first non-negotiable |
| Load performance | Good | Often slow | Target <2s LCP |
| Forms | Multi-step, polished | Basic | Minimal friction, clear CTAs |
| Accessibility | Good | Inconsistent | WCAG 2.2 AA minimum |

## Sources

### 2026 Web Design & Marketing Trends
- [Content Marketing Strategy 2026 - Impact Plus](https://www.impactplus.com/learn/content-marketing-strategy)
- [Digital Marketing Trends 2026 - Astoundz](https://astoundz.com/top-10-digital-marketing-trends-2026/)
- [Digital Marketing Trends 2026 - Google](https://business.google.com/us/think/consumer-insights/digital-marketing-trends-2026/)

### Real Estate Website Design
- [Real Estate Web Design Trends 2025-2026 - Realogixs](https://realogixs.com/top-real-estate-web-design-trends-for-2025)
- [Real Estate Website Design 2026 - HousingWire](https://www.housingwire.com/articles/real-estate-website-design/)
- [Real Estate Marketing Trends 2025 - Placester](https://placester.com/real-estate-marketing-academy/trends)

### Video Hero Optimization
- [Silent Background Video Optimization - Design TLC](https://designtlc.com/how-to-optimize-a-silent-background-video-for-your-websites-hero-area/)
- [High-Impact Hero Sections - Stellar](https://www.gostellar.app/blog/high-impact-hero-sections-that-dont-hurt-page-speed)
- [Video Optimization Tips - KeyCDN](https://www.keycdn.com/blog/video-optimization)

### Waitlist & Forms
- [Waitlist Landing Page Optimization 2026 - Waitlister](https://waitlister.me/growth-hub/guides/waitlist-landing-page-optimization-guide)
- [Waitlist Landing Page Best Practices - Moosend](https://moosend.com/blog/waitlist-landing-page/)
- [Lead Generation Forms - Monday.com](https://monday.com/blog/crm-and-sales/lead-generation-forms/)

### Animations & Premium UX
- [Scroll Animation Tools 2026 - CSS Author](https://cssauthor.com/scroll-animation-tools/)
- [GSAP vs Framer Motion - Semaphore](https://semaphore.io/blog/react-framer-motion-gsap)
- [Motion UI Trends 2026 - Loma Technology](https://lomatechnology.com/blog/motion-ui-trends-2026/2911)

### Accessibility
- [WCAG 2.2 Compliance 2026 - Accessibility.works](https://www.accessibility.works/blog/wcag-ada-website-compliance-standards-requirements/)
- [WCAG Overview - W3C](https://www.w3.org/WAI/standards-guidelines/wcag/)

### Branding & Design Trends
- [Brand Design Trends 2026 - The Branding Journal](https://www.thebrandingjournal.com/2026/01/top-branding-design-trends-2026/)
- [Web Design Trends 2026 - WD Strategies](https://www.wd-strategies.com/articles/my-graphic-and-web-design-trend-predictions-for-2026)
- [StoryBrand Website Examples - Big Orange Marketing](https://bigorange.marketing/who-is-the-hero-of-your-website-storybrand-examples-that-make-your-customer-the-hero/)

### Footer Design
- [Footer Design Best Practices - Orbit Media](https://www.orbitmedia.com/blog/website-footer-design-best-practices/)
- [Footer Design Examples 2026 - Digital Silk](https://www.digitalsilk.com/digital-trends/website-footer-design-examples/)

---
*Feature research for: NBRS Premium Marketing Website*
*Researched: 2026-01-31*
