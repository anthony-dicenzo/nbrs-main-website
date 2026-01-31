# Pitfalls Research

**Domain:** Video-heavy marketing website (SvelteKit + GSAP + Tailwind)
**Researched:** 2026-01-31
**Confidence:** HIGH (verified across official docs and multiple sources)

## Critical Pitfalls

### Pitfall 1: Serving Unoptimized Video Files

**What goes wrong:**
Videos are uploaded directly from editing software at original quality (32MB+ files). Page load times exceed 10 seconds, videos buffer constantly, and mobile users abandon the site. This is the exact problem described in the current broken site.

**Why it happens:**
Teams treat video like images — export once and upload. But a 30-second 1080p video can be 30-50MB uncompressed. Video requires a dedicated optimization pipeline that most web developers skip.

**How to avoid:**
1. **Compress aggressively**: Use H.264 for compatibility, targeting 3-5MB for 10-15 second clips
2. **Strip audio**: Background videos don't need audio tracks — removing them cuts 20-30% file size
3. **Resolution limits**: 720p at 24fps for backgrounds (not 1080p/4K)
4. **Use modern codecs**: WebM/VP9 for Chrome/Firefox with MP4 fallback for Safari
5. **Target file sizes**: Under 5MB for mobile autoplay, under 10MB for desktop hero videos

**Warning signs:**
- Video files over 10MB in the repo
- Videos taking more than 2 seconds to start playing
- Network tab showing video requests blocking other resources
- Mobile users seeing loading spinners instead of content

**Phase to address:**
Phase 1 (Foundation) — Establish video processing pipeline before ANY video integration

**Sources:**
- [web.dev Video Performance](https://web.dev/learn/performance/video-performance)
- [Cloudinary Video Optimization Guide](https://cloudinary.com/guides/web-performance/video-optimization-why-you-need-it-and-5-critical-best-practices)

---

### Pitfall 2: Missing Video Poster Images (LCP Killer)

**What goes wrong:**
Videos load without poster images, causing the browser to wait for the first video frame before painting LCP. This fails Core Web Vitals (LCP > 2.5s) and hurts SEO. Worse: on slow connections, users see a black box for several seconds.

**Why it happens:**
Developers assume the video will load quickly and forget that the poster image IS the LCP candidate for video elements. Without a preloaded poster, LCP waits for video decode.

**How to avoid:**
1. **Always include poster attribute**: Extract a representative frame as a compressed JPEG/WebP
2. **Preload the poster**: Use `<link rel="preload" href="poster.jpg" as="image" fetchpriority="high">`
3. **Match poster dimensions**: Poster must match video aspect ratio exactly to prevent CLS
4. **Use preload="none" or "metadata"**: Don't preload the video file itself, just the poster

```html
<!-- Correct pattern -->
<link rel="preload" href="/video-poster.webp" as="image" fetchpriority="high">
<video
  poster="/video-poster.webp"
  preload="none"
  playsinline
  muted
  autoplay
>
  <source src="/video.webm" type="video/webm">
  <source src="/video.mp4" type="video/mp4">
</video>
```

**Warning signs:**
- LCP scores above 2.5 seconds on PageSpeed Insights
- Black/empty video areas visible during page load
- Lighthouse flagging "Largest Contentful Paint element was an video"
- CLS spikes when video dimensions change

**Phase to address:**
Phase 2 (Video Component) — Bake into reusable video component from the start

**Sources:**
- [web.dev LCP Article](https://web.dev/articles/lcp)
- [web.dev Video Vitals Patterns](https://web.dev/patterns/web-vitals-patterns/video/video/)

---

### Pitfall 3: GSAP ScrollTrigger Breaking on SvelteKit Route Changes

**What goes wrong:**
Animations work perfectly on initial page load, but after navigating to another route and back, ScrollTrigger miscalculates positions. Animations fire at wrong scroll positions, don't trigger at all, or trigger immediately on page load. This is a well-documented SvelteKit + GSAP issue.

**Why it happens:**
SvelteKit's client-side navigation preserves the scroll position and doesn't fully reset the page. ScrollTrigger calculates start/end positions on mount, but the DOM state from the previous route can interfere. Additionally, GSAP's cleanup isn't automatic with Svelte's lifecycle.

**How to avoid:**
1. **Kill ScrollTriggers on component destroy**: Use `onDestroy` to call `ScrollTrigger.kill()` for all triggers
2. **Use context-based cleanup**: Create a GSAP context and revert it on unmount
3. **Call ScrollTrigger.refresh() on route change**: Hook into SvelteKit's navigation events
4. **Use `invalidateOnRefresh: true`**: For triggers that need recalculation

```typescript
// Correct pattern for SvelteKit + GSAP
import { onMount, onDestroy } from 'svelte';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let ctx: gsap.Context;

onMount(() => {
  gsap.registerPlugin(ScrollTrigger);

  ctx = gsap.context(() => {
    // All GSAP code here
    gsap.to('.element', {
      scrollTrigger: {
        trigger: '.element',
        invalidateOnRefresh: true
      }
    });
  });
});

onDestroy(() => {
  ctx?.revert(); // Cleans up ALL animations in this context
});
```

**Warning signs:**
- Animations work on first visit but break on subsequent navigations
- Console warnings about "ScrollTrigger cannot find element"
- Animations triggering immediately instead of on scroll
- Memory usage increasing with each page navigation

**Phase to address:**
Phase 2 (Animation Foundation) — Establish GSAP lifecycle patterns before building animations

**Sources:**
- [GSAP Forum: SvelteKit 2 + Svelte 5 + GSAP ScrollTrigger Issues](https://gsap.com/community/forums/topic/40926-sveltekit-2-svelte-5-gsap-stuck-on-scrolltrigger-not-working-as-expected-after-route-change/)
- [GSAP Forum: SvelteKit ScrollTrigger Bug](https://gsap.com/community/forums/topic/36847-sveltekit-and-gsap-scrolltrigger-bug/)

---

### Pitfall 4: Mobile Video Autoplay Failing Silently

**What goes wrong:**
Videos work on desktop but show nothing on mobile. The current site "solved" this by removing mobile video entirely — a terrible UX. iOS and Android have strict autoplay policies that most developers don't understand.

**Why it happens:**
Mobile browsers block autoplay to save battery and data. Without `muted` and `playsinline` attributes, iOS forces fullscreen or blocks entirely. Large file sizes cause iOS to refuse loading when on Low Power Mode.

**How to avoid:**
1. **Required attributes**: Always use `autoplay muted loop playsinline`
2. **File size limits**: Keep under 5MB for mobile autoplay to work reliably
3. **Provide image fallback**: Detect autoplay failure and fall back gracefully
4. **Test on real devices**: iOS Simulator doesn't replicate all restrictions

```html
<!-- Mobile-safe autoplay pattern -->
<video
  autoplay
  muted
  loop
  playsinline
  poster="/fallback.webp"
  preload="metadata"
>
  <source src="/video-mobile.webm" type="video/webm">
  <source src="/video-mobile.mp4" type="video/mp4">
</video>
```

```typescript
// Detect autoplay failure
video.play().catch(() => {
  // Show static image fallback
  video.style.display = 'none';
  fallbackImage.style.display = 'block';
});
```

**Warning signs:**
- Videos play on desktop but not mobile
- Black boxes on iOS devices
- Console errors about "play() interrupted" or "NotAllowedError"
- Mobile Lighthouse showing poor performance scores

**Phase to address:**
Phase 2 (Video Component) — Build mobile-first with fallback from day one

**Sources:**
- [Cloudinary: Video Autoplay Best Practices](https://cloudinary.com/guides/video-effects/video-autoplay-in-html)
- [web.dev Video Performance](https://web.dev/learn/performance/video-performance)

---

### Pitfall 5: Animation-Caused Layout Thrashing (Jank)

**What goes wrong:**
Scroll animations drop below 60fps, creating visible stuttering. This is especially bad when video and GSAP animations run simultaneously. Users perceive the site as "broken" or "cheap."

**Why it happens:**
Animations trigger layout recalculation (reflow) instead of using GPU-accelerated properties. Common mistakes: animating `width`, `height`, `top`, `left`, `margin`, or `padding` instead of `transform`. Combining this with video decode creates CPU contention.

**How to avoid:**
1. **Only animate transform and opacity**: These are GPU-accelerated and don't trigger layout
2. **Use GSAP's defaults**: GSAP automatically uses hardware acceleration when possible
3. **Add `will-change: transform`**: Hint browser to promote element to GPU layer
4. **Reduce animated elements on mobile**: Use `prefers-reduced-motion` media query
5. **Don't animate during video load**: Sequence video load completion before starting animations

```typescript
// Good: GPU-accelerated
gsap.to('.element', {
  x: 100,
  y: 50,
  scale: 1.2,
  opacity: 0.5
});

// Bad: Causes layout thrashing
gsap.to('.element', {
  width: '200px',
  height: '200px',
  marginLeft: '50px'
});
```

**Warning signs:**
- DevTools Performance tab showing long "Layout" or "Recalculate Style" bars
- FPS dropping below 60 during scroll
- Visible stuttering on mid-range mobile devices
- CPU usage spiking during animations

**Phase to address:**
Phase 3 (Scroll Animations) — Performance budget established before complex animations

**Sources:**
- [DEV.to: High-Performance Web Animation with GSAP](https://dev.to/kolonatalie/high-performance-web-animation-gsap-webgl-and-the-secret-to-60fps-2l1g)
- [MDN Animation Performance Guide](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Animation_performance_and_frame_rate)

---

### Pitfall 6: Video CLS (Cumulative Layout Shift)

**What goes wrong:**
Page content jumps around as videos load, causing jarring visual experience and failing Core Web Vitals CLS threshold (> 0.1). Google penalizes this in search rankings.

**Why it happens:**
Videos without explicit dimensions cause the browser to reserve no space initially. When the video loads, it pushes other content around. This is especially common with responsive video embeds.

**How to avoid:**
1. **Always set aspect ratio**: Use CSS `aspect-ratio` or padding-bottom hack
2. **Match poster dimensions**: Poster and video must have identical aspect ratios
3. **Reserve space with containers**: Wrap videos in containers with fixed aspect ratio
4. **Test with slow 3G throttling**: CLS issues are most visible on slow connections

```css
/* Modern aspect ratio approach */
.video-container {
  aspect-ratio: 16 / 9;
  width: 100%;
  background: #000;
}

.video-container video {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Fallback for older browsers */
.video-container-fallback {
  position: relative;
  padding-bottom: 56.25%; /* 16:9 */
  height: 0;
}
```

**Warning signs:**
- PageSpeed Insights CLS score above 0.1
- Content "jumping" visible during page load
- Users accidentally clicking wrong elements
- Lighthouse showing "Avoid large layout shifts"

**Phase to address:**
Phase 2 (Video Component) — CSS architecture must include aspect ratio handling

**Sources:**
- [web.dev Optimize CLS](https://web.dev/articles/optimize-cls)
- [Medium: CLS Guide 2026](https://medium.com/@sahoo.arpan7/cumulative-layout-shift-cls-guide-to-one-of-the-most-misunderstood-core-web-vitals-5f135c68cb6f)

---

## Technical Debt Patterns

Shortcuts that seem reasonable but create long-term problems.

| Shortcut | Immediate Benefit | Long-term Cost | When Acceptable |
|----------|-------------------|----------------|-----------------|
| Self-hosting large videos | Simple setup, no CDN config | Slow loads, bandwidth costs, poor caching | Never for production |
| Using GSAP without context cleanup | Faster initial dev | Memory leaks, broken animations on route change | Never |
| Skipping video compression | Faster workflow | 10x file sizes, failed mobile playback | Only for prototypes |
| Standard YouTube embeds | Fast integration | 1.7s main thread blocking, slow INP | Only if video is below fold |
| Animating layout properties | More animation options | Jank, poor mobile performance | Never for scroll animations |
| Skipping poster images | Less asset management | Failed LCP, poor UX on slow connections | Never for hero videos |

## Integration Gotchas

Common mistakes when connecting to external services.

| Integration | Common Mistake | Correct Approach |
|-------------|----------------|------------------|
| YouTube/Vimeo embeds | Using standard embed code | Use lite-youtube-embed or facade pattern — load player only on click |
| CDN for video | Serving from origin server | Use Cloudflare Stream, Mux, or Bunny CDN with edge caching |
| GSAP in SvelteKit | Importing without SSR check | Use dynamic import or check `browser` from $app/environment |
| HLS.js for adaptive streaming | Loading library on all pages | Lazy load HLS.js only when video enters viewport |
| Analytics on video | Tracking every play/pause | Debounce events, track meaningful milestones (25%, 50%, etc.) |

## Performance Traps

Patterns that work at small scale but fail as usage grows.

| Trap | Symptoms | Prevention | When It Breaks |
|------|----------|------------|----------------|
| All videos loading on page mount | Slow initial load, high bandwidth | Intersection Observer lazy loading | Immediately with 3+ videos |
| Single video resolution | Desktop OK, mobile breaks | Serve different resolutions via `<source>` media queries | Mobile users (50%+ of traffic) |
| No video preloading strategy | Visible loading delays | Strategic `preload="metadata"` for above-fold only | First visit experience |
| Scroll animations without throttle | 60fps drops, battery drain | Use GSAP's built-in throttling, reduce on mobile | Mid-range devices |
| No CDN for video delivery | High TTFB, buffering | Edge delivery with multi-region CDN | Any user > 100ms from server |

## UX Pitfalls

Common user experience mistakes in this domain.

| Pitfall | User Impact | Better Approach |
|---------|-------------|-----------------|
| Looping videos indefinitely | Battery drain, distraction, accessibility issues | Stop after 2-3 loops, provide pause control |
| No video controls visible | Users can't pause/mute when needed | Show controls on hover/tap, accessible pause button |
| Videos with unexpected audio | Startles users, triggers autoplay blocks | Always mute by default, clear audio toggle |
| Black loading states | Feels broken, anxiety-inducing | Skeleton loaders or blurred poster during load |
| Jarring video transitions | Feels choppy and unpolished | Crossfade between videos, preload next video |
| Removing mobile video entirely | Mobile users get inferior experience | Optimize video for mobile, don't remove it |

## "Looks Done But Isn't" Checklist

Things that appear complete but are missing critical pieces.

- [ ] **Video component:** Often missing poster preload — verify `<link rel="preload">` exists
- [ ] **GSAP animations:** Often missing cleanup — verify `ctx.revert()` in onDestroy
- [ ] **Mobile video:** Often missing playsinline — test on real iOS device, not simulator
- [ ] **Video compression:** Often missing WebM variant — check both .mp4 AND .webm exist
- [ ] **Responsive video:** Often missing mobile resolution — verify different sources for mobile
- [ ] **CLS handling:** Often missing aspect-ratio — test with 3G throttling in DevTools
- [ ] **Lazy loading:** Often missing cleanup — verify IntersectionObserver.disconnect() on destroy
- [ ] **Scroll animations:** Often missing invalidateOnRefresh — test after browser resize

## Recovery Strategies

When pitfalls occur despite prevention, how to recover.

| Pitfall | Recovery Cost | Recovery Steps |
|---------|---------------|----------------|
| Unoptimized videos shipped | LOW | Batch compress with FFmpeg, update sources, redeploy |
| GSAP memory leaks | MEDIUM | Add cleanup to all components, may need to audit all animation code |
| Mobile video broken | MEDIUM | Add missing attributes, may need to re-encode all videos smaller |
| CLS issues | LOW | Add aspect-ratio CSS, update video containers |
| Animation jank | HIGH | May require rewriting animations to avoid layout properties |
| Failed Core Web Vitals | MEDIUM | Audit with PageSpeed Insights, address one metric at a time |

## Pitfall-to-Phase Mapping

How roadmap phases should address these pitfalls.

| Pitfall | Prevention Phase | Verification |
|---------|------------------|--------------|
| Unoptimized video files | Phase 1: Video Pipeline | All videos under 5MB, WebM + MP4 variants exist |
| Missing poster images | Phase 2: Video Component | Every video element has poster, LCP < 2.5s |
| GSAP route change bugs | Phase 2: Animation Foundation | Navigate between pages 10x, no console errors |
| Mobile autoplay failure | Phase 2: Video Component | Test on real iPhone in Low Power Mode |
| Animation jank | Phase 3: Scroll Animations | DevTools Performance shows 60fps during scroll |
| Video CLS | Phase 2: Video Component | PageSpeed Insights CLS < 0.1 |
| Large bundle sizes | Phase 4: Optimization | Bundle analyzer shows no unexpected bloat |

## Sources

- [GSAP Forum: SvelteKit + ScrollTrigger Issues](https://gsap.com/community/forums/topic/40926-sveltekit-2-svelte-5-gsap-stuck-on-scrolltrigger-not-working-as-expected-after-route-change/) (HIGH confidence)
- [GSAP Forum: Performance Issue Discussion](https://gsap.com/community/forums/topic/29465-gsap-scrolltrigger-with-sveltekit-performance-issue/) (HIGH confidence)
- [web.dev: Video Performance](https://web.dev/learn/performance/video-performance) (HIGH confidence)
- [web.dev: LCP Optimization](https://web.dev/articles/lcp) (HIGH confidence)
- [web.dev: CLS Optimization](https://web.dev/articles/optimize-cls) (HIGH confidence)
- [DEV.to: High-Performance Web Animation](https://dev.to/kolonatalie/high-performance-web-animation-gsap-webgl-and-the-secret-to-60fps-2l1g) (MEDIUM confidence)
- [MDN: Animation Performance](https://developer.mozilla.org/en-US/docs/Web/Performance/Guides/Animation_performance_and_frame_rate) (HIGH confidence)
- [Cloudinary: Video Optimization](https://cloudinary.com/guides/web-performance/video-optimization-why-you-need-it-and-5-critical-best-practices) (HIGH confidence)
- [Lee Reamsnyder: Lazy Loading Videos with Svelte](https://www.leereamsnyder.com/lazy-loading-videos-svelte-action) (MEDIUM confidence)

---
*Pitfalls research for: Video-heavy marketing website (SvelteKit + GSAP + Tailwind)*
*Researched: 2026-01-31*
