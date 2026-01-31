# Stack Research

**Domain:** Marketing Website with Video (SvelteKit Static)
**Researched:** 2026-01-31
**Confidence:** HIGH

## Recommended Stack

### Core Technologies

| Technology | Version | Purpose | Why Recommended |
|------------|---------|---------|-----------------|
| [SvelteKit](https://svelte.dev/docs/kit/introduction) | ^2.50.1 | Full-stack framework | Official recommendation for Svelte apps. Built-in routing, SSG via adapter-static, excellent DX with Vite. Reference site americanhousing.co uses SvelteKit. |
| [Svelte](https://svelte.dev/docs/svelte/what-are-runes) | ^5.49.1 | UI framework | Latest stable with Runes syntax ($state, $derived, $effect, $props). Compiles to minimal JS, ideal for performance-critical marketing sites. |
| [Tailwind CSS](https://tailwindcss.com/docs/guides/sveltekit) | ^4.1.18 | Utility-first CSS | v4 is current stable. Native Vite plugin (@tailwindcss/vite) eliminates PostCSS config. Existing site uses Tailwind - preserves team familiarity. |
| [GSAP](https://gsap.com/docs/v3/Installation) | ^3.14.2 | Animation library | Industry standard for complex web animations. Existing splash animation uses GSAP. Works with Svelte via actions pattern. |
| [@sveltejs/adapter-static](https://svelte.dev/docs/kit/adapter-static) | ^3.0.10 | Static site generation | Prerenders all pages to static HTML. Required for Cloudflare Pages static hosting. Output to `/build` directory. |

### Supporting Libraries

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| [@tailwindcss/vite](https://tailwindcss.com/docs/installation) | ^4.1.18 | Tailwind Vite integration | Always - required for Tailwind v4 with Vite/SvelteKit |
| [lucide-svelte](https://lucide.dev/guide/packages/lucide-svelte) | ^0.563.0 | Icon library | Replace Lucide CSS font with proper Svelte components. 1500+ icons, tree-shakable. |
| [svelte-meta-tags](https://github.com/oekazuma/svelte-meta-tags) | ^4.5.0 | SEO meta tags | Optional - for structured Open Graph/Twitter cards. Can also use native `<svelte:head>`. |
| [@sveltejs/enhanced-img](https://svelte.dev/docs/kit/images) | latest | Image optimization | Optimize static images at build time. Uses Sharp for WebP/AVIF generation. |

### Development Tools

| Tool | Purpose | Notes |
|------|---------|-------|
| [Vite](https://vitejs.dev) ^7.3.1 | Build tool | Bundled with SvelteKit. Lightning-fast HMR, native ESM. |
| TypeScript (optional) | Type safety | SvelteKit has first-class TS support. Recommended for larger projects. |
| [Wrangler](https://developers.cloudflare.com/workers/wrangler/) | Cloudflare CLI | For local dev with Cloudflare bindings and deployment verification. |

### Video Optimization Tooling

| Tool | Purpose | Recommended Settings |
|------|---------|---------------------|
| FFmpeg | Video transcoding | Required locally for video preparation |

**FFmpeg Presets for Web Video:**

```bash
# MP4 with H.264 (universal fallback) - faststart for streaming
ffmpeg -i input.mov -c:v libx264 -crf 23 -preset slow \
  -c:a aac -b:a 128k -movflags faststart \
  -vf "scale=1920:-2" output.mp4

# WebM with VP9 (30-50% smaller, modern browsers)
ffmpeg -i input.mov -c:v libvpx-vp9 -crf 30 -b:v 0 \
  -c:a libopus -b:a 128k \
  -vf "scale=1920:-2" output.webm

# AV1 (best compression, newest browsers) - slow encode, cache result
ffmpeg -i input.mov -c:v libaom-av1 -crf 30 -b:v 0 \
  -c:a libopus -b:a 128k -cpu-used 4 \
  -vf "scale=1920:-2" output_av1.webm

# Mobile-optimized (720p, smaller file)
ffmpeg -i input.mov -c:v libx264 -crf 26 -preset slow \
  -c:a aac -b:a 96k -movflags faststart \
  -vf "scale=1280:-2" output_mobile.mp4
```

**Video Format Strategy:**
- Primary: WebM VP9 (desktop) - best balance of quality/size/support
- Fallback: MP4 H.264 - universal compatibility
- Future: WebM AV1 when Safari support matures
- Mobile: Static poster image or 720p MP4 under 2MB

## Installation

```bash
# Create SvelteKit project with Svelte 5
npx sv create nbrs-website
cd nbrs-website

# Core dependencies
npm install gsap

# Dev dependencies (SvelteKit, Svelte, Vite included by sv create)
npm install -D tailwindcss @tailwindcss/vite @sveltejs/adapter-static

# Supporting libraries
npm install lucide-svelte
npm install -D @sveltejs/enhanced-img
```

## Configuration Files

### svelte.config.js

```javascript
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined, // No SPA fallback - fully static
      precompress: true,   // Generate .br and .gz files
      strict: true
    }),
    prerender: {
      handleHttpError: 'warn'
    }
  }
};

export default config;
```

### vite.config.ts

```typescript
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(), // MUST be before sveltekit()
    sveltekit()
  ]
});
```

### src/app.css

```css
@import "tailwindcss";

/* Custom CSS variables and base styles */
:root {
  --color-nbrs-green: #4fa64f;
  --color-nbrs-coral: #FF6B6B;
}
```

### src/routes/+layout.svelte

```svelte
<script>
  let { children } = $props();
  import '../app.css';
</script>

{@render children()}
```

### src/routes/+layout.js (Enable Prerendering)

```javascript
export const prerender = true;
```

## Alternatives Considered

| Recommended | Alternative | When to Use Alternative |
|-------------|-------------|-------------------------|
| adapter-static | adapter-cloudflare | Need server-side features (KV, D1, R2, form actions with server processing) |
| Tailwind v4 | Tailwind v3 | Legacy project migration, v4 breaking changes unacceptable |
| GSAP | Svelte transitions | Simple enter/exit animations only; GSAP needed for timeline sequences, ScrollTrigger |
| lucide-svelte | Heroicons, Phosphor | Team preference, different icon aesthetic |
| svelte-meta-tags | Native svelte:head | Simple sites; svelte-meta-tags better for complex OG/Twitter/JSON-LD |

## What NOT to Use

| Avoid | Why | Use Instead |
|-------|-----|-------------|
| Vue.js (CDN) | Current site uses Vue for reactivity; unnecessary with Svelte's built-in reactivity | Svelte $state rune |
| Tailwind CDN | No tree-shaking, no custom config, blocks build optimization | @tailwindcss/vite plugin |
| Lucide CSS font | 400KB+ font file, not tree-shakable | lucide-svelte components |
| adapter-auto | Unclear deployment target, may not optimize for static | adapter-static explicitly |
| PostCSS config | Tailwind v4 eliminates need for postcss.config.js | @tailwindcss/vite plugin |

## Stack Patterns by Variant

**If deploying to Cloudflare Pages (recommended for this project):**
- Use `@sveltejs/adapter-static` (static assets only)
- Build output: `build/` directory
- No server functions needed for marketing site
- Cloudflare Pages build command: `npm run build`

**If future needs require server features (form handling, A/B testing):**
- Switch to `@sveltejs/adapter-cloudflare`
- Build output: `.svelte-kit/cloudflare/`
- Enables Cloudflare Workers for server endpoints
- Forms can use SvelteKit form actions

## Version Compatibility

| Package A | Compatible With | Notes |
|-----------|-----------------|-------|
| SvelteKit ^2.50 | Svelte ^5.0 | SvelteKit 2 requires Svelte 5 |
| Tailwind ^4.1 | @tailwindcss/vite ^4.1 | Versions must match |
| GSAP ^3.14 | Svelte 5 | Use Svelte actions pattern for integration |
| adapter-static ^3.0 | SvelteKit ^2.0 | Major versions aligned |

## GSAP + Svelte Integration Pattern

```svelte
<!-- src/lib/actions/animate.ts -->
<script context="module" lang="ts">
  import { gsap } from 'gsap';

  export function animate(
    node: HTMLElement,
    params: gsap.TweenVars
  ): { destroy: () => void } {
    const tween = gsap.from(node, params);

    return {
      destroy() {
        tween.kill();
      }
    };
  }
</script>

<!-- Usage in component -->
<script>
  import { animate } from '$lib/actions/animate';
</script>

<div use:animate={{ opacity: 0, y: 50, duration: 1 }}>
  Animated content
</div>
```

## Video Implementation Pattern

```svelte
<!-- src/lib/components/HeroVideo.svelte -->
<script>
  import { onMount } from 'svelte';

  let videoEl: HTMLVideoElement;
  let isLoaded = $state(false);

  // Desktop-only video
  const isMobile = $derived(
    typeof window !== 'undefined' && window.innerWidth < 768
  );

  onMount(() => {
    if (!isMobile && videoEl) {
      videoEl.addEventListener('canplaythrough', () => {
        isLoaded = true;
      }, { once: true });
    }
  });
</script>

{#if !isMobile}
  <video
    bind:this={videoEl}
    class="hero-video"
    class:loaded={isLoaded}
    autoplay
    muted
    loop
    playsinline
    preload="auto"
    poster="/images/hero-poster.webp"
  >
    <source src="/videos/hero.webm" type="video/webm" />
    <source src="/videos/hero.mp4" type="video/mp4" />
  </video>
{:else}
  <img src="/images/hero-mobile.webp" alt="NBRS Community" />
{/if}

<style>
  .hero-video {
    opacity: 0;
    transition: opacity 0.5s ease;
  }
  .hero-video.loaded {
    opacity: 1;
  }
</style>
```

## Sources

**HIGH Confidence (Official Documentation):**
- [SvelteKit Docs - Introduction](https://svelte.dev/docs/kit/introduction) - Framework features, version info
- [SvelteKit Docs - adapter-static](https://svelte.dev/docs/kit/adapter-static) - SSG configuration
- [SvelteKit Docs - adapter-cloudflare](https://svelte.dev/docs/kit/adapter-cloudflare) - Alternative adapter
- [Tailwind CSS - SvelteKit Guide](https://tailwindcss.com/docs/guides/sveltekit) - v4 installation steps
- [GSAP Installation Docs](https://gsap.com/docs/v3/Installation) - v3.14.1 confirmed
- [Lucide Svelte Guide](https://lucide.dev/guide/packages/lucide-svelte) - Icon library usage

**MEDIUM Confidence (Verified via npm):**
- npm package versions verified 2026-01-31:
  - @sveltejs/kit: 2.50.1
  - svelte: 5.49.1
  - tailwindcss: 4.1.18
  - gsap: 3.14.2
  - @sveltejs/adapter-static: 3.0.10
  - lucide-svelte: 0.563.0

**MEDIUM Confidence (Community Best Practices):**
- [GSAP + Svelte Actions Pattern](https://dev.to/jasper-clarke/integrating-svelte-5-with-gsap-3-54no) - Integration approach
- [Tailwind v4 + SvelteKit Setup](https://dev.to/fedor-pasynkov/setting-up-tailwind-css-v4-in-sveltekit-the-vite-plugin-way-a-guide-based-on-real-issues-380n) - Troubleshooting guide
- [Video Performance Best Practices](https://web.dev/learn/performance/video-performance) - Web.dev guidance
- [FFmpeg VP9/AV1 Optimization](https://pixelpoint.io/blog/web-optimized-video-ffmpeg/) - Encoding presets

---
*Stack research for: NBRS Marketing Website v4*
*Researched: 2026-01-31*
