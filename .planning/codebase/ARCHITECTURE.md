# Architecture

**Analysis Date:** 2026-01-30

## Pattern Overview

**Overall:** Single-Page Application (SPA) with Client-Side Rendering and Progressive Enhancement

**Key Characteristics:**
- Monolithic HTML/CSS/JavaScript codebase (no build process beyond Tailwind)
- Vue 3 (CDN) for component-like state management and interactivity
- GSAP animations for intro sequence and continuous background effects
- Video-based hero section with intelligent fallbacks for mobile
- Server-side form submission to external service (HubSpot)

## Layers

**Presentation Layer:**
- Purpose: Render all UI components, animations, and visual effects
- Location: `./index.html` (924 lines), `./confirmation.html`
- Contains: HTML markup, inline CSS styles, inline Vue.js logic
- Depends on: Tailwind CSS (CDN), Vue 3 (CDN), GSAP (CDN), Lucide Icons (CDN), HubSpot script
- Used by: Client browser directly

**Animation & Interaction Layer:**
- Purpose: Handle page load animations, video switching, mobile menu state, and continuous background animations (clouds, birds, buildings)
- Location: `./index.html` (lines 670-880 GSAP timeline), Vue methods (lines 650-660)
- Contains: GSAP animation sequences, event listeners for video switching, DOM manipulation for intro overlay
- Depends on: GSAP library, DOM APIs
- Used by: Presentation layer

**Data & State Layer:**
- Purpose: Manage reactive component state (menu toggle, form data, card collections)
- Location: `./index.html` (lines 613-660 Vue data object)
- Contains: Page content (aboutCards array, benefits array, formFields array, footerLinks array), form state
- Depends on: Vue 3 reactivity
- Used by: Vue templates for rendering

**Styling Layer:**
- Purpose: Provide responsive design and utility classes
- Location: `./src/input.css` (Tailwind directives), inline `<style>` in `./index.html` (lines 14-300+), generated from `./tailwind.config.js`
- Contains: Tailwind imports, custom CSS for positioning, animations, media queries, specific component styling
- Depends on: Tailwind CSS framework (CDN)
- Used by: HTML markup via class attributes

**Static Assets:**
- Purpose: Store videos, images, and configuration
- Location: Root directory and subdirectories
- Contains: `.mp4` video files (hero videos, background videos), `.png` images, `.mov` backup videos
- Used by: Hero section video element, background imagery

## Data Flow

**Page Load & Initialization:**

1. HTML loads with external dependencies (Vue 3, GSAP, Tailwind, Lucide, HubSpot)
2. DOM content triggers `DOMContentLoaded` event listener (line 670)
3. GSAP timeline creates intro animation sequence:
   - Animates intro text letters with staggered effects
   - Expands white-overlay circle to fill screen
   - Fades in main content sections with staggered timing
   - Triggers building, cloud, and bird animations
4. Vue application mounts to `#app` element with reactive data
5. Video element initializes, preloads first video, sets up switching logic

**User Interaction Flow (Video Switching):**

1. Video plays for 12 seconds
2. `setInterval` triggers (line 808)
3. `switchVideo()` function pauses current video, fades to black
4. Loads next video from `videos` array
5. Fades back in when video is ready to play
6. Subsequent videos preloaded in background after first video starts

**User Interaction Flow (Mobile Menu):**

1. Hamburger icon click calls Vue method `toggleMobileMenu()`
2. Method toggles `menuOpen` boolean
3. Calls `updateBodyScroll()` to add/remove `menu-open` class on body
4. Template uses `v-if="menuOpen"` to conditionally render mobile menu overlay
5. Clicking overlay or menu links calls `closeMobileMenu()`

**User Interaction Flow (Form Submission):**

1. User fills in form fields (firstName, lastName, email, phone, streetAddress, city)
2. Clicks "Partner With Us" button
3. Form `@submit` handler calls `submitForm()` method
4. Method redirects to `confirmation.html` via `window.location.href`
5. Server-side form handling via HubSpot (external service)

**State Management:**

- Vue reactive data object contains all page state
- No external state management library (Vuex/Pinia)
- Menu state: `menuOpen` boolean
- Form data: Collected from form inputs (no explicit state binding visible - likely direct form submission)
- Animation state: Managed by GSAP, not Vue

## Key Abstractions

**Vue Application:**
- Purpose: Provide reactive UI updates for mobile menu, about cards, benefits list, form fields, footer links
- Examples: `./index.html` lines 611-665
- Pattern: Options API with data(), methods(), and mounted hook

**GSAP Timeline:**
- Purpose: Coordinate complex sequential animations and parallel effects
- Examples: `./index.html` lines 674-747 (introTimeline), subsequent animations
- Pattern: GSAP timeline for intro, individual tweens for video, clouds, birds

**Video Management System:**
- Purpose: Intelligent video switching with preloading and error handling
- Examples: `./index.html` lines 759-823
- Pattern: Map-based cache for preloaded videos, async switching with fade transitions, error fallback to first video

**Component Cards:**
- Purpose: Reusable about section cards rendered from data array
- Examples: `./index.html` lines 516-527 (template), lines 617-625 (data)
- Pattern: `v-for` loop over `aboutCards` array with icon, title, content

## Entry Points

**Primary:**
- Location: `./index.html`
- Triggers: Direct browser navigation or links to root
- Responsibilities: Render main landing page with hero, about, partner sections; handle all animations and interactions

**Secondary:**
- Location: `./confirmation.html`
- Triggers: Form submission redirect from primary entry point
- Responsibilities: Display thank you message and confirmation of contact submission

**Configuration:**
- Location: `./tailwind.config.js` (lines 1-6)
- Triggers: Build process (npm run build)
- Responsibilities: Configure Tailwind content paths and theme extensions

**Server Configuration:**
- Location: `./.htaccess`
- Triggers: Apache web server startup
- Responsibilities: Set MIME types for video, enable CORS, configure caching headers, prevent directory listing

## Error Handling

**Strategy:** Try-catch with console logging and graceful fallbacks

**Patterns:**

**Video Switching Errors:**
- Location: `./index.html` lines 793-802
- Catches: Video loading and switching errors
- Fallback: Fades video back in, logs error, potentially switches to first video if error persists
- User Experience: Video playback may pause but page continues to function

**Video Loading Fallback:**
- Location: `./index.html` lines 731-734
- Strategy: If mobile (`window.innerWidth <= 768`), removes video element entirely
- Fallback: Hero section background color (`#4fa64f`) displays instead
- User Experience: Mobile users see solid color background instead of video

**HubSpot Script:**
- Location: `./index.html` lines 667-669
- Strategy: Script loads asynchronously (async/defer)
- Failure Mode: If HubSpot fails to load, form submission still redirects to confirmation page
- No explicit error handling visible for this integration

## Cross-Cutting Concerns

**Logging:**
- Approach: Direct `console.log()` and `console.error()` calls throughout animation and video code
- Not disabled in production; all logging visible in browser console
- Examples: Video preload logging (line 783), video state logging (lines 790, 805, 815-818)

**Validation:**
- No client-side form validation visible in code
- Form fields rely on HTML5 `type` attributes for basic validation (email, tel)
- Server-side validation assumed to occur via HubSpot integration

**Authentication:**
- Not applicable for this public marketing website
- No user authentication or authorization

**Responsive Design:**
- Approach: Mobile-first Tailwind utilities throughout (md: breakpoints for medium screens, lg: for large)
- Critical breakpoint: `768px` for video display logic
- Mobile menu implemented with separate navigation structure

**Performance Optimization:**
- Video preloading strategy in place (preload first video in HTML head, lazy preload others)
- GSAP animations use hardware acceleration
- Tailwind CDN provides minimal initial CSS; full CSS may be larger on first load
- Form submission is simple POST to external service

---

*Architecture analysis: 2026-01-30*
