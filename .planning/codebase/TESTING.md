# Testing Patterns

**Analysis Date:** 2026-01-30

## Test Framework

**Runner:**
- Not detected

**Assertion Library:**
- Not detected

**Run Commands:**
- No test framework configured
- No test scripts in `package.json` (only `build` and `watch` scripts for Tailwind compilation)

## Test File Organization

**Status:** No testing infrastructure in place

The codebase currently has:
- No `.test.*` or `.spec.*` files
- No jest.config.js or vitest.config.js
- No test directory structure
- No testing libraries installed (`jest`, `vitest`, `mocha`, `chai` not in package.json)

## Test Structure

**Current Approach:** Manual testing only

The project uses manual browser testing through:
- Direct HTML file opening in browsers
- Live preview during `npm run watch` (Tailwind build)
- Manual interaction testing of interactive features

## Mocking

**Status:** No mocking framework

No testing mocks are used because no automated tests exist. Code that would benefit from mocking:
- `index.html` video loading logic (lines 815-900): video play/pause/load operations
- HubSpot tracking code (lines 677, 82): external analytics integration
- Video switching and preloading operations

## Fixtures and Factories

**Status:** Not applicable

No test data factories or fixtures are used. Static data is defined in Vue component data properties:
- `aboutCards` array: Contains community feature cards with icon, title, content
- `benefits` array: Partnership benefits list
- `footerLinks` array: Footer contact links

These are defined inline in `index.html` (lines 617-650) and `confirmation.html` (lines 88-90).

## Coverage

**Requirements:** None

No code coverage tracking or targets are enforced or measured.

## Test Types

**Unit Tests:**
- Not implemented
- Candidates for unit testing:
  - Vue methods: `toggleMobileMenu()`, `closeMobileMenu()`, `updateBodyScroll()`
  - Video switching logic: `switchVideo()` async function
  - Menu state management

**Integration Tests:**
- Not implemented
- Manual testing covers:
  - Mobile menu open/close interaction
  - Form submission redirect flow
  - Video switching on 12-second intervals
  - Scroll-based video and SVG animations (citywalk.html)

**E2E Tests:**
- Not implemented
- Manual testing covers end-to-end flows:
  - Homepage → Partner Form → Confirmation page flow
  - Citywalk scroll experience with video fade-in/out

## Common Patterns

### Manual Testing Workflow

**Video Loading (index.html lines 827-895):**
- Manual browser testing: Open browser, check video plays
- Check developer console for logs:
  ```
  Preloaded video 0: ./video-output-E4E7476A-A746-4397-8515-58E3B7A0A0AA.mp4
  Initial video playing. Preloading subsequent videos.
  Switching to video 1: ./fountain.mp4
  ```
- Verify video switches every 12 seconds smoothly
- Test error handling by checking console for error messages

**Mobile Menu (index.html lines 352-405):**
- Manual testing: Resize browser to mobile width (< 768px)
- Click hamburger button
- Verify menu slides in from right
- Click menu item or overlay to close
- Test `body.menu-open` class prevents scroll overflow

**Form Submission (index.html lines 552-586):**
- Manual testing: Fill form fields and click Submit
- Verify redirect to `confirmation.html`
- Check that form state clears on submission

**Animation Testing (index.html lines 679-813):**
- Manual testing: Load page, observe:
  - Letter animation sequence (staggered GSAP animation)
  - White overlay circle expansion
  - Building entrance from bottom
  - Cloud and bird continuous motion
  - SVG parallax on scroll

### Debugging Approach

**Console Logging for Video State:**
```javascript
console.log(`Preloaded video ${index}: ${videos[index]}`);
console.log(`Switching to video ${nextIndex}: ${videos[nextIndex]}`);
console.error('Video error:', e);
```

**GSAP Timeline Inspection:**
- Timeline created with `gsap.timeline()` (line 682)
- Multiple animation sequences chained with `.to()`, `.add()`, `.set()`
- Timing controlled via `duration`, `delay`, `stagger` properties
- Can inspect timeline in browser DevTools GSAP plugin if installed

**Vue Reactivity Testing:**
- Manual testing of data binding: toggle `menuOpen` via button click
- Verify `v-for` loops update (about cards, benefits, footer links)
- Check conditional rendering with `v-if` (mobile menu visibility)

## Browser Compatibility Testing

**Manual testing approach:**
- Test in Chrome/Edge (desktop)
- Test in Safari (iOS mobile)
- Test in Chrome (Android mobile)
- Check responsive breakpoints:
  - `max-width: 768px`: Mobile menu appears, hero video hidden
  - `max-width: 700px`: Citywalk responsive layout adjustments
  - `max-width: 500px`: Further mobile optimizations

**Video Format Testing:**
- Browser support for MP4 video format
- Fallback text in video tags: "Your browser does not support the video tag" (index.html line 429)
- Mobile video loading: disabled on mobile (`window.innerWidth > 768` check, line 828)

## Testing Assets

**Video Files (used in manual testing):**
- `./video-output-E4E7476A-A746-4397-8515-58E3B7A0A0AA.mp4` (24KB preload time testing)
- `./fountain.mp4` (switching animation testing)
- `./night.mp4` (3-video rotation testing)

**Test Interaction Points:**
- Mobile hamburger button (tablet/mobile width testing)
- Form fields (input validation, submission flow)
- Navigation links (hash-based anchor navigation)
- Video playback state (desktop vs mobile)

## Performance Testing (Manual)

**Current approach:**
- Video preloading strategy visible in code:
  - First video preloaded immediately via HTML `<link rel="preload">` (line 13)
  - Subsequent videos preloaded via JS after first video plays (lines 833-843)
  - Smaller preload distance on mobile (lines 770-771)

**Areas without automated measurement:**
- Animation frame rate (GSAP handles requestAnimationFrame)
- Video file size impact on load time
- Cumulative Layout Shift (CLS) from animations
- First Contentful Paint (FCP) before intro animation completes

## Recommended Test Infrastructure

If tests are to be added, consider:

**Unit Testing:**
- Framework: Vitest (lighter than Jest for this size project)
- Test file location: `src/__tests__/` directory
- Testing Vue components: `@vue/test-utils`
- Example structure:
  ```
  src/__tests__/
  ├── menu.test.js           # Menu toggle/close methods
  ├── form.test.js           # Form submission logic
  └── video.test.js          # Video switching logic
  ```

**E2E Testing:**
- Framework: Playwright or Cypress
- Test files in `e2e/` directory
- Test flows: form submission → redirect, video rotation, mobile menu interaction

**Configuration files to add:**
- `vitest.config.js` or `jest.config.js`
- `playwright.config.js` if adding E2E tests
- `.eslintrc.json` for code quality checks before testing

---

*Testing analysis: 2026-01-30*
