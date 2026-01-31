# External Integrations

**Analysis Date:** 2026-01-30

## APIs & External Services

**Marketing & CRM:**
- HubSpot - Lead capture and contact management
  - SDK/Client: HubSpot Embed Code script (loaded asynchronously)
  - Script ID: `hs-script-loader`
  - Script URL: `//js.hs-scripts.com/48114106.js`
  - Portal ID: 48114106
  - Purpose: Form tracking and lead management for partnership form submissions

## Data Storage

**Databases:**
- None - This is a static website with no backend database

**File Storage:**
- Local filesystem only
- All media assets (videos, images) served from same domain

**Caching:**
- Browser caching via HTML headers
- CDN caching for external dependencies (GSAP, Vue 3, Lucide Icons)

## Authentication & Identity

**Auth Provider:**
- None - No authentication implemented
- Form submission redirects to static confirmation page

**Form Handling:**
- Client-side form validation and data collection
- Form submission via redirect to `confirmation.html` (no backend processing)
- All form data submitted via client-side redirect only

## Monitoring & Observability

**Error Tracking:**
- None detected - No error monitoring service integrated

**Logs:**
- Browser console logging only
- Console logs for video switching debugging:
  - Video preload events
  - Video load/play state transitions
  - Video switching errors
  - Video timing information

## CI/CD & Deployment

**Hosting:**
- Not specified - Static files can be deployed to any host

**CI Pipeline:**
- None detected

**Build Process:**
- Manual: `npm run build` - Compiles Tailwind CSS from `src/input.css` to `css/tailwind.min.css`
- Manual: `npm run watch` - Watch mode for development

## Environment Configuration

**No environment variables required** - All configuration is hardcoded

**HubSpot Configuration:**
- Portal ID hardcoded: `48114106`
- No API keys required (pixel-based tracking)

**External Dependency Versions:**
- Vue 3: Version pulled from unpkg (currently latest)
- GSAP: 3.12.5 (hardcoded)
- Lucide Icons: 0.16.29 (hardcoded)
- Tailwind CSS: Via CDN (development only)

**Secrets location:**
- None - No secrets stored in this codebase

## Webhooks & Callbacks

**Incoming:**
- HubSpot form tracking webhook (embedded script handles submission data)

**Outgoing:**
- Form redirects to `confirmation.html` after submission
- No API calls or webhooks triggered by form submission

## Asset Loading

**External Resources:**
- GSAP animation library (Cloudflare CDN)
- Vue 3 framework (unpkg CDN)
- Lucide Icons font stylesheet (jsDelivr CDN)
- Tailwind CSS (Tailwind CDN - development)
- HubSpot embed script (HubSpot servers)

**Preload Strategy:**
- Hero video preloaded in HTML head: `video-output-E4E7476A-A746-4397-8515-58E3B7A0A0AA.mp4`
- Other videos preloaded dynamically via JavaScript when first video starts playing

## Form Submission Flow

**Contact Form at `#partner` section:**
1. User fills form with First Name, Last Name, Email, Phone, Property Address, City
2. Form submit button triggers `submitForm()` Vue method
3. Form redirects to `confirmation.html`
4. HubSpot pixel tracks form submission asynchronously
5. No server-side processing occurs

## Third-Party Dependencies

**Production-Ready:**
- GSAP - Fully production-ready animation library
- Vue 3 - Production-ready framework (loaded from CDN)
- Lucide Icons - Production-ready icon library
- HubSpot - Production integration for lead tracking

**Dev-Only:**
- Tailwind CSS dev server (CDN distribution in HTML, should use built CSS in production)

---

*Integration audit: 2026-01-30*
