# Phase 2: Layout & Navigation - Context

**Gathered:** 2026-01-31
**Status:** Ready for planning

<domain>
## Phase Boundary

Shared layout with navigation header and footer across all routes. Navigation shows/hides based on scroll direction. Footer includes branding, links, social icons, and email signup. Mobile responsiveness handled without hamburger menu (only two nav links).

</domain>

<decisions>
## Implementation Decisions

### Navigation behavior
- Visible on initial page load at top
- Hides when user scrolls down
- Reappears when user scrolls up
- Animation duration: 300ms (medium speed)
- No hover effects on nav links

### Navigation layout
- Logo left-aligned, links right-aligned
- Two links only: Mission, Partner
- When visible after scroll: solid backdrop (green or white based on context)
- Green nav → white logo; White nav → green logo
- At page top: white text on transparent background (for dark hero content)

### Navigation color logic
- Claude has discretion to choose green or white backdrop based on page context
- Must ensure contrast: green nav gets white logo/text, white nav gets green logo/text

### Mobile navigation
- No hamburger menu (only two links, they fit at all sizes)
- Claude has discretion on responsive behavior for very small screens (320px)

### Footer design
- Reference: American Housing footer screenshot (but "Neighbourhood Scale" instead)
- Large "Neighbourhood Scale" text at top
- Bottom left: Social icons (LinkedIn, X, Instagram)
- Bottom right: Navigation links (Contact, Mission, FAQs) + email signup field + Sign up button
- Very bottom left: Copyright "© Neighbourhood Scale, 2026"
- Background: NBRS brand green
- White text throughout

### Visual layout
- Full-bleed backgrounds, contained content (mix approach)
- Max content width: 1280px (standard)
- Generous vertical spacing between sections
- Clean aesthetic: no textures or patterns, just color, typography, and imagery

### Typography
- Clean sans-serif matching the American Housing reference style
- Claude to find similar font

### Page transitions
- Subtle fade between routes (150-200ms)

### Claude's Discretion
- Responsive nav layout on very small screens (320px) — stack or shrink
- Exact font selection (clean sans-serif similar to reference)
- Nav backdrop color per page (green vs white based on content)

</decisions>

<specifics>
## Specific Ideas

- Footer exactly like the American Housing screenshot: large brand name at top, social icons bottom-left, links + email signup bottom-right, copyright at very bottom
- Nav should feel responsive to scroll direction — appears on scroll-up, hides on scroll-down
- Site should feel clean and modern with generous whitespace

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 02-layout-navigation*
*Context gathered: 2026-01-31*
