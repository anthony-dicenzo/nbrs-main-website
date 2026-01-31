# Coding Conventions

**Analysis Date:** 2026-01-30

## Naming Patterns

**Files:**
- HTML files: kebab-case or index.html (`index.html`, `confirmation.html`, `citywalk.html`)
- CSS files: input.css, tailwind.min.css
- JavaScript: Inline in HTML files, no separate .js files
- Asset files: descriptive with unique identifiers (`video-output-E4E7476A-A746-4397-8515-58E3B7A0A0AA.mp4`, `fountain.mp4`, `night.mp4`)

**Vue.js Data Properties and Methods:**
- camelCase for data properties (`menuOpen`, `aboutCards`, `formFields`, `footerLinks`)
- camelCase for methods (`submitForm`, `toggleMobileMenu`, `closeMobileMenu`, `updateBodyScroll`)
- camelCase for event handlers (`@click`, `@submit.prevent`)

**CSS Classes:**
- kebab-case for CSS utility and custom classes (`intro-overlay`, `slide-content`, `buildings-container`, `mobile-menu-overlay`, `hamburger-button`)
- Tailwind utility classes used extensively (`text-white`, `flex`, `items-center`, `justify-center`, `rounded-lg`, `transition-colors`, `duration-300`)

**SVG Elements and IDs:**
- kebab-case for class names within SVGs (`.cloud`, `.cloud1`, `.cloud2`, `.cloud3`, `.bird`, `.bird1`, `.bird2`, `.bird3`, `.building`)
- Descriptive IDs for elements (`#app`, `#heroVideo`, `#heroVideoSource`, `#cityscape`)

**Variables:**
- camelCase for JavaScript variables (`currentVideo`, `videoCache`, `isSwitching`, `introTimeline`, `diagonal`, `nextIndex`, `sourceElement`)
- camelCase for configuration objects (`aboutCards`, `benefits`, `formFields`, `footerLinks`)

**Types:**
- No TypeScript usage; vanilla JavaScript with Vue 3
- No explicit type declarations

## Code Style

**Formatting:**
- 4-space indentation in HTML
- 2-space indentation in inline CSS
- Inline styles mixed with Tailwind classes
- Long class attribute strings on single line for readability

**Linting:**
- No linting configuration detected (no .eslintrc, .prettierrc files)
- Code follows consistent HTML5 structure and semantic markup

**Vue.js Structure:**
- Single-file components using inline Vue.js (embedded in HTML)
- Data-driven reactive components with `v-for`, `v-if`, `@click` directives
- Methods defined in component methods object

## Import Organization

**CDN-based Loading:**
1. Core framework/utilities (Vue, Tailwind, GSAP)
2. Icon libraries (Lucide)
3. Analytics (HubSpot)

**Script Order in `index.html`:**
```html
<!-- Tailwind CSS -->
<script src="https://cdn.tailwindcss.com"></script>

<!-- Vue 3 -->
<script src="https://unpkg.com/vue@3/dist/vue.global.js"></script>

<!-- GSAP Animation -->
<script src="https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js"></script>

<!-- Icon Library -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/lucide-static@0.16.29/font/lucide.min.css">

<!-- Analytics -->
<script type="text/javascript" id="hs-script-loader" async defer src="//js.hs-scripts.com/48114106.js"></script>
```

**Path Aliases:**
- No path aliases used (no module resolution configuration)
- Relative paths used for local assets (`./video-output-...mp4`, `./fountain.mp4`, `./index.html`)

## Error Handling

**Patterns:**
- Vanilla try-catch for video operations in `index.html` (lines 855-874)
- Async/await with error logging in video switching logic:
  ```javascript
  try {
      // Pause current video
      videoElement.pause();
      // Update source and load
      await videoElement.load();
      videoElement.play();
      currentVideo = nextIndex;
      isSwitching = false;
  } catch (error) {
      console.error('Error switching video:', error);
      isSwitching = false;
      // Fallback: fade video back in
      gsap.to(videoElement, { opacity: 1, duration: 0.5 });
  }
  ```
- Console logging for debugging (`console.log`, `console.error`)
- Silent failures for video loading with fallback opacity restoration
- No structured error reporting or error boundaries

## Logging

**Framework:** console object

**Patterns:**
- `console.log()` for informational messages: tracking video states, preload events
- `console.error()` for error cases: video loading failures
- No centralized logging service
- Logs appear at: `index.html` lines 842, 850, 882, 898-899

**Examples:**
```javascript
console.log(`Preloaded video ${index}: ${videos[index]}`);
console.log(`Switching to video ${nextIndex}: ${videos[nextIndex]}`);
console.error('Video error:', e);
console.error('Error switching video:', error);
```

## Comments

**When to Comment:**
- Comments used sparingly; code intent is generally clear from context
- Comments appear before major functional blocks
- Comments explain "why" rather than "what"

**JSDoc/TSDoc:**
- No JSDoc or TypeDoc used
- No formal function documentation

**Examples:**
- `index.html` line 449: `<!-- Add this after the Hero Section and before the About Section -->`
- `index.html` line 815: `// Video switching logic - Optimized for seamless playback`
- `citywalk.html` line 195: `// Animate video fade-in/out and parallax SVGs on scroll`

## Function Design

**Size:**
- Small utility functions (20-50 lines): `toggleMobileMenu`, `closeMobileMenu`, `updateBodyScroll`
- Moderate functions (50-150 lines): `switchVideo` async function with video state management
- Large orchestration functions (500+ lines): Inline animation timeline setup with GSAP

**Parameters:**
- Simple single-value parameters for Vue methods
- No destructuring or complex parameter patterns
- Event parameters passed directly in templates (`@click`, `@submit.prevent`)

**Return Values:**
- Promise returns for async operations (`switchVideo` returns Promise)
- Void returns for state mutations (`toggleMobileMenu`, `closeMobileMenu`)
- No explicit return type annotations

## Module Design

**Exports:**
- No module exports or imports (monolithic HTML files)
- All code contained within single HTML files

**Barrel Files:**
- Not applicable; no module structure

**Organization:**
- Monolithic single-page applications
- All assets, styles, markup, and scripts in one file
- Clear separation of concerns within HTML structure:
  - `<style>` section for CSS
  - HTML markup in body
  - `<script>` tags for Vue and GSAP logic

**Special Patterns:**
- Vue.js mount point: `#app` div
- Separate files for different routes: `index.html` (home), `citywalk.html` (experience), `confirmation.html` (success page)
- Shared styling through Tailwind and Lucide icons
- HubSpot integration script included in both `index.html` and `confirmation.html`

---

*Convention analysis: 2026-01-30*
