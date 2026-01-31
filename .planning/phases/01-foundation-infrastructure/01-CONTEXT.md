# Phase 1: Foundation & Infrastructure - Context

**Gathered:** 2026-01-31
**Status:** Ready for planning

<domain>
## Phase Boundary

SvelteKit project scaffolded with Tailwind, GSAP, and video optimization pipeline. Route structure exists for all pages. This phase delivers the technical foundation — no visible UI beyond confirming the stack works.

</domain>

<decisions>
## Implementation Decisions

### Tailwind configuration
- Extract brand colors from the current HTML site as source of truth
- Keep current fonts from the existing site (extract and configure)
- Skip dark mode for v1 — light theme only
- Style approach: Claude's discretion (likely hybrid of utilities and component classes)

### Video pipeline workflow
- Process videos at build time (integrated into npm run build)
- Target balanced compression: <5MB per video, good quality
- Source videos stored in gitignored folder (e.g., `/src/videos-source/`)
- Optimized outputs committed to assets folder
- Output formats: WebM primary, MP4 fallback (per roadmap requirements)
- Deployment: Cloudflare Pages (static output with videos included)

### Claude's Discretion
- Exact Tailwind utility vs component class balance
- FFmpeg preset details (CRF values, encoding settings)
- Folder structure and naming conventions
- Build script implementation details

</decisions>

<specifics>
## Specific Ideas

- Current workflow: process locally, upload to Porkbun — new workflow should feel similarly simple
- Videos should "just work" after running the build command
- Cloudflare Pages as deployment target influences static adapter choice

</specifics>

<deferred>
## Deferred Ideas

None — discussion stayed within phase scope

</deferred>

---

*Phase: 01-foundation-infrastructure*
*Context gathered: 2026-01-31*
