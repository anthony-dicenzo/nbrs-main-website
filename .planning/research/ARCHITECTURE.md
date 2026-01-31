# Architecture Research

**Domain:** SvelteKit Marketing Site with GSAP Animations
**Researched:** 2026-01-31
**Confidence:** HIGH

## Standard Architecture

### System Overview

```
+-----------------------------------------------------------------------+
|                         Browser/Client Layer                          |
+-----------------------------------------------------------------------+
|  +---------------+  +---------------+  +---------------+              |
|  |  Page Routes  |  |  Page Routes  |  |  Page Routes  |              |
|  |  /home        |  |  /about       |  |  /project     |   ...        |
|  +-------+-------+  +-------+-------+  +-------+-------+              |
|          |                  |                  |                      |
|          +------------------+------------------+                      |
|                             |                                         |
+-----------------------------v-----------------------------------------+
|                       +layout.svelte                                  |
|   +-----------------+------------------------+-------------------+    |
|   |   Navigation    |      {@render}         |     Footer        |    |
|   +-----------------+------------------------+-------------------+    |
+-----------------------------------------------------------------------+
|                         Component Layer                               |
|  +---------------+  +---------------+  +---------------+              |
|  | SplashAnim    |  | VideoHero     |  | HubSpotForm   |              |
|  +---------------+  +---------------+  +---------------+              |
|  +---------------+  +---------------+  +---------------+              |
|  | NavBar        |  | VideoSection  |  | ContactForm   |              |
|  +---------------+  +---------------+  +---------------+              |
+-----------------------------------------------------------------------+
|                         Services/Utils Layer                          |
|  +---------------+  +---------------+  +---------------+              |
|  | gsap/         |  | video/        |  | forms/        |              |
|  | animations.ts |  | loader.ts     |  | hubspot.ts    |              |
|  +---------------+  +---------------+  +---------------+              |
+-----------------------------------------------------------------------+
|                         Static Assets (static/)                       |
|  +---------------+  +---------------+  +---------------+              |
|  | videos/       |  | images/       |  | fonts/        |              |
|  +---------------+  +---------------+  +---------------+              |
+-----------------------------------------------------------------------+
```

### Component Responsibilities

| Component | Responsibility | Typical Implementation |
|-----------|----------------|------------------------|
| `+layout.svelte` | Root layout with nav, footer, shared state | Single file at `src/routes/+layout.svelte` |
| `+page.svelte` | Individual page content | One per route: `/`, `/about`, `/project`, etc. |
| `SplashAnimation` | GSAP intro animation (letters flip, circle expand) | Reusable component in `$lib/components/` |
| `VideoHero` | Hero section with background video | Component with video preloading logic |
| `VideoSection` | Video sections within pages | Lazy-loaded videos with IntersectionObserver |
| `Navigation` | Responsive nav with mobile menu | Shared component in layout |
| `Footer` | Site footer with links | Shared component in layout |
| `HubSpotForm` | HubSpot embedded form | Component wrapping HubSpot embed script |

## Recommended Project Structure

```
src/
├── routes/                      # File-based routing
│   ├── +layout.svelte           # Root layout (nav, footer, splash)
│   ├── +layout.ts               # Shared layout data (prerender config)
│   ├── +page.svelte             # Homepage
│   ├── about/
│   │   └── +page.svelte         # About/Mission page
│   ├── project/
│   │   └── +page.svelte         # First project showcase
│   ├── waitlist/
│   │   └── +page.svelte         # Resident waitlist
│   └── contact/
│       └── +page.svelte         # Contact/Invest page
│
├── lib/                         # Shared code ($lib alias)
│   ├── components/              # Reusable Svelte components
│   │   ├── layout/              # Layout-specific components
│   │   │   ├── Navigation.svelte
│   │   │   ├── Footer.svelte
│   │   │   └── MobileMenu.svelte
│   │   ├── animation/           # Animation components
│   │   │   ├── SplashAnimation.svelte
│   │   │   └── PageTransition.svelte
│   │   ├── video/               # Video components
│   │   │   ├── VideoHero.svelte
│   │   │   ├── VideoSection.svelte
│   │   │   └── VideoBackground.svelte
│   │   ├── forms/               # Form components
│   │   │   ├── HubSpotForm.svelte
│   │   │   └── ContactForm.svelte
│   │   └── ui/                  # Generic UI components
│   │       ├── Button.svelte
│   │       ├── Card.svelte
│   │       └── Section.svelte
│   │
│   ├── actions/                 # Svelte actions (use:directive)
│   │   ├── lazyVideo.ts         # Lazy load videos with IntersectionObserver
│   │   ├── animate.ts           # GSAP animation action
│   │   └── inview.ts            # Trigger animations on scroll
│   │
│   ├── utils/                   # Utility functions
│   │   ├── gsap.ts              # GSAP setup and registration
│   │   ├── video.ts             # Video preloading utilities
│   │   └── breakpoints.ts       # Responsive breakpoint helpers
│   │
│   ├── stores/                  # Svelte stores for shared state
│   │   ├── splash.ts            # Splash animation state
│   │   └── video.ts             # Video preload state
│   │
│   └── styles/                  # Global styles (if not using Tailwind only)
│       └── animations.css       # GSAP animation keyframes
│
├── app.html                     # HTML template
├── app.css                      # Global Tailwind imports
└── app.d.ts                     # TypeScript definitions

static/
├── videos/                      # Video assets
│   ├── hero/                    # Hero videos by resolution
│   │   ├── hero-720p.mp4
│   │   ├── hero-720p.webm
│   │   ├── hero-1080p.mp4
│   │   └── hero-1080p.webm
│   ├── project/                 # Project showcase videos
│   └── sections/                # Section background videos
├── images/                      # Image assets
│   ├── og/                      # Open Graph images
│   └── posters/                 # Video poster images
├── fonts/                       # Custom fonts
└── favicon.ico
```

### Structure Rationale

- **`routes/`:** File-based routing keeps pages discoverable. Each folder = URL path. Layout inheritance gives shared nav/footer for free.
- **`lib/components/`:** Grouped by concern (layout, animation, video, forms, ui) rather than flat. Prevents scrolling through 50 components.
- **`lib/actions/`:** Svelte actions are the cleanest way to integrate GSAP and lazy loading. Actions are element-level lifecycle functions.
- **`lib/utils/`:** Keep GSAP registration and video utilities separate from components for reuse and testing.
- **`lib/stores/`:** Splash animation state needs to persist across navigation. Svelte stores handle this.
- **`static/videos/`:** Organized by purpose and resolution. Multiple formats (mp4/webm) for browser compatibility.

## Architectural Patterns

### Pattern 1: GSAP Animation Integration with Svelte Actions

**What:** Use Svelte actions (`use:directive`) for GSAP animations instead of inline `onMount` code.
**When to use:** Any element that needs GSAP animation, especially reusable animations.
**Trade-offs:**
- PRO: Reusable, clean component code, proper cleanup
- CON: Slightly more setup than inline onMount

**Example:**
```typescript
// src/lib/actions/animate.ts
import gsap from 'gsap';

export function fadeIn(node: HTMLElement, params = { duration: 0.5, delay: 0 }) {
  gsap.from(node, {
    opacity: 0,
    y: 20,
    duration: params.duration,
    delay: params.delay
  });

  return {
    destroy() {
      gsap.killTweensOf(node);
    }
  };
}
```

```svelte
<!-- Usage in component -->
<script>
  import { fadeIn } from '$lib/actions/animate';
</script>

<div use:fadeIn={{ duration: 0.8, delay: 0.2 }}>
  Content fades in
</div>
```

### Pattern 2: Splash Animation as Blocking Overlay

**What:** Splash animation runs once per session, blocking content until complete.
**When to use:** Brand introduction animations that should only play on first visit.
**Trade-offs:**
- PRO: Strong brand impression, polished feel
- CON: Delays time-to-interactive, accessibility concerns

**Example:**
```svelte
<!-- src/lib/components/animation/SplashAnimation.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import gsap from 'gsap';
  import { splashComplete } from '$lib/stores/splash';

  let overlayEl: HTMLDivElement;
  let lettersEl: HTMLSpanElement[] = [];
  let circleEl: HTMLDivElement;

  onMount(() => {
    if ($splashComplete) return; // Skip if already played

    const tl = gsap.timeline({
      onComplete: () => {
        splashComplete.set(true);
        overlayEl.remove();
      }
    });

    // Letters flip in with 3D rotation
    tl.from(lettersEl, {
      rotateX: -90,
      opacity: 0,
      stagger: 0.1,
      duration: 0.6,
      ease: 'back.out(1.7)'
    });

    // White circle expands
    tl.to(circleEl, {
      width: '300vmax',
      height: '300vmax',
      duration: 0.8,
      ease: 'power2.inOut'
    }, '+=0.5');

    return () => tl.kill();
  });
</script>
```

### Pattern 3: Lazy Video Loading with Svelte Action

**What:** Videos below the fold use `preload="none"` and load via IntersectionObserver when approaching viewport.
**When to use:** Any video not immediately visible on page load.
**Trade-offs:**
- PRO: Fast initial page load, reduced bandwidth
- CON: Brief delay when scrolling to video

**Example:**
```typescript
// src/lib/actions/lazyVideo.ts
export function lazyVideo(node: HTMLElement) {
  const videos = node.querySelectorAll('video.lazy');

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const video = entry.target as HTMLVideoElement;
          video.load();
          video.classList.remove('lazy');
          observer.unobserve(video);
        }
      });
    },
    { rootMargin: '100px' } // Start loading 100px before visible
  );

  videos.forEach((video) => observer.observe(video));

  return {
    destroy() {
      observer.disconnect();
    }
  };
}
```

### Pattern 4: Video Resolution Switching by Viewport

**What:** Serve different video resolutions based on viewport width and connection speed.
**When to use:** Hero videos that need to look good on all devices without destroying mobile performance.
**Trade-offs:**
- PRO: Optimal quality/performance balance per device
- CON: More video assets to manage, slightly complex logic

**Example:**
```svelte
<!-- src/lib/components/video/VideoHero.svelte -->
<script lang="ts">
  import { onMount } from 'svelte';
  import { browser } from '$app/environment';

  export let sources: {
    mobile: string;
    desktop: string;
    poster: string;
  };

  let videoEl: HTMLVideoElement;
  let currentSource = sources.mobile;

  onMount(() => {
    if (!browser) return;

    // Select resolution based on viewport
    const isMobile = window.innerWidth < 768;
    currentSource = isMobile ? sources.mobile : sources.desktop;

    // Handle slow connections
    const connection = (navigator as any).connection;
    if (connection?.effectiveType === '2g' || connection?.saveData) {
      // Don't autoplay on slow connections
      videoEl.removeAttribute('autoplay');
    }
  });
</script>

<video
  bind:this={videoEl}
  autoplay
  muted
  loop
  playsinline
  preload="metadata"
  poster={sources.poster}
>
  <source src={currentSource} type="video/mp4" />
</video>
```

## Data Flow

### Page Load Flow (Static Site)

```
[Initial Request]
    |
    v
[CDN/Cloudflare Pages] --> Serves pre-rendered HTML
    |
    v
[Browser Parses HTML]
    |
    +--> [Critical CSS loads inline]
    +--> [Splash overlay visible]
    +--> [GSAP loads (async)]
    |
    v
[Svelte Hydrates]
    |
    +--> [Splash animation plays (GSAP)]
    +--> [Hero video preloads (if desktop)]
    |
    v
[Splash Complete]
    |
    +--> [Main content visible]
    +--> [LazyVideo action observes below-fold videos]
    +--> [Page fully interactive]
```

### State Management Flow

```
[Splash Store] -----> [SplashAnimation] -----> [Layout]
      |                      |                     |
      | (splashComplete)     | (animation state)   | (show/hide content)
      v                      v                     v
[sessionStorage] <---- [onComplete] <---- [GSAP Timeline]
```

### Key Data Flows

1. **Splash State:** Single store tracks whether splash has played this session. Stored in sessionStorage. Layout reads this to conditionally render splash.

2. **Video Preload:** Hero video begins loading during splash animation. Store tracks load progress. VideoHero shows poster until video is ready.

3. **Form Submission:** HubSpot form handles its own submission. No local state management needed beyond embedding the script.

4. **Navigation:** SvelteKit handles client-side navigation. No additional state needed. Layout persists across pages.

## Scaling Considerations

| Scale | Architecture Adjustments |
|-------|--------------------------|
| 0-10k visits/month | Current architecture is overkill. Static hosting on Cloudflare Pages handles this trivially. |
| 10k-100k visits/month | No changes needed. Cloudflare's CDN handles traffic. Consider video CDN if bandwidth costs rise. |
| 100k+ visits/month | Move videos to dedicated CDN (Cloudflare Stream, Mux). Consider edge-side includes for dynamic content. |

### Scaling Priorities

1. **First bottleneck: Video bandwidth.** Large hero videos are the main cost driver. Optimization order: compress aggressively, use WebM, implement adaptive bitrate, then move to video CDN.

2. **Second bottleneck: Build times.** With only 5 pages, this won't be an issue. If pages grow to 100+, consider incremental builds or partial prerendering.

## Anti-Patterns

### Anti-Pattern 1: GSAP in $effect Instead of onMount

**What people do:** Use Svelte 5's `$effect` rune for GSAP animations.
**Why it's wrong:** `$effect` reruns when reactive dependencies change, causing animations to replay unexpectedly. It also doesn't handle async the same way.
**Do this instead:** Use `onMount` for one-time animations, return cleanup function to kill tweens.

### Anti-Pattern 2: Autoplay Video Without Muted + Playsinline

**What people do:** Add `autoplay` without the required companion attributes.
**Why it's wrong:** Browsers block unmuted autoplay. iOS forces fullscreen without `playsinline`. Video appears broken.
**Do this instead:** Always use `autoplay muted loop playsinline` together for background videos.

### Anti-Pattern 3: Loading All Videos Eagerly

**What people do:** Preload all videos on page load.
**Why it's wrong:** Wastes bandwidth, slows initial load, especially harmful on mobile.
**Do this instead:** Use `preload="none"` for below-fold videos, lazy load with IntersectionObserver.

### Anti-Pattern 4: GSAP Animations Without Cleanup

**What people do:** Create GSAP tweens in `onMount` without returning cleanup.
**Why it's wrong:** Tweens continue running after component unmounts, causing memory leaks and errors.
**Do this instead:** Return `() => tl.kill()` from `onMount`, or use `gsap.context()` for automatic cleanup.

### Anti-Pattern 5: Mobile-Specific CSS Hide for Videos

**What people do:** Use `display: none` to hide videos on mobile.
**Why it's wrong:** Browser still downloads the video file even if hidden with CSS.
**Do this instead:** Conditionally render the video element in Svelte based on viewport/device detection.

## Integration Points

### External Services

| Service | Integration Pattern | Notes |
|---------|---------------------|-------|
| HubSpot Forms | Embed script in component | Load script dynamically in `onMount`, render form into container div |
| Cloudflare Pages | Static adapter output | Configure `adapter-static`, deploy `build/` folder |
| GSAP | npm package, register plugins | Import from `gsap/dist/*` for SSR compatibility |

### Internal Boundaries

| Boundary | Communication | Notes |
|----------|---------------|-------|
| Layout <-> Pages | `{@render children()}` slot | Pages render inside layout's slot |
| Components <-> Actions | `use:directive` | Actions receive DOM node, return cleanup |
| Components <-> Stores | `$store` subscription | Reactive stores for shared state |
| Components <-> Utils | Import functions | Pure utilities for video, GSAP setup |

## Build Order Implications

Based on this architecture, the recommended build order for roadmap phases is:

1. **Foundation Phase:** SvelteKit setup, static adapter config, basic routing structure, Tailwind integration
2. **Layout Phase:** Navigation, footer, root layout, mobile menu
3. **Animation Phase:** GSAP integration, splash animation migration, page transitions
4. **Video Phase:** Video components, lazy loading, mobile handling, optimization
5. **Content Phase:** Individual pages, HubSpot forms, content population
6. **Polish Phase:** Performance testing, accessibility, final optimizations

**Critical dependencies:**
- Layout must exist before pages (pages render into layout)
- GSAP setup must exist before splash animation
- Video utilities must exist before video components
- Splash animation should be Phase 3 because it blocks content and needs GSAP

## Sources

### HIGH Confidence (Official Documentation)
- [SvelteKit Project Structure](https://svelte.dev/docs/kit/project-structure) - Official documentation on file organization
- [SvelteKit Static Adapter](https://svelte.dev/docs/kit/adapter-static) - Official static generation documentation
- [Svelte Lifecycle Hooks](https://svelte.dev/docs/svelte/lifecycle-hooks) - Official onMount/onDestroy documentation

### MEDIUM Confidence (Verified with Official Sources)
- [SvelteKit Project Structure Explained - Joy of Code](https://joyofcode.xyz/sveltekit-project-structure) - Verified against official docs
- [GSAP + Svelte Integration - GSAP Forums](https://gsap.com/community/forums/topic/40949-svelte-and-gsap/) - Official GSAP community resource
- [Video Performance - web.dev](https://web.dev/learn/performance/video-performance) - Google's official performance guidance

### MEDIUM Confidence (Multiple Sources Agree)
- [Lazy-loading videos with Svelte actions](https://www.leereamsnyder.com/lazy-loading-videos-svelte-action) - Community pattern, aligns with official action docs
- [Autoplay best practices - Cloudinary](https://cloudinary.com/guides/video-effects/video-autoplay-in-html) - Industry standard guidance
- [SvelteKit Page Transitions - Josh Collinsworth](https://joshcollinsworth.com/blog/sveltekit-page-transitions) - Community pattern, verified approach

---
*Architecture research for: NBRS Marketing Site (SvelteKit + GSAP)*
*Researched: 2026-01-31*
