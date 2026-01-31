# Phase 1: Foundation & Infrastructure - Research

**Researched:** 2026-01-31
**Domain:** SvelteKit static site scaffolding with Tailwind, GSAP, and video optimization
**Confidence:** HIGH

## Summary

This phase establishes the technical foundation for the NBRS marketing website rebuild. The standard approach is:

1. **SvelteKit 2 + Svelte 5** scaffolded via `npx sv create` with TypeScript enabled
2. **Tailwind CSS v4** integrated via the native Vite plugin (no PostCSS config needed)
3. **GSAP 3.14** installed via npm with Svelte actions pattern for lifecycle management
4. **adapter-static** for Cloudflare Pages deployment (fully prerendered static output)
5. **FFmpeg presets** for video compression to WebM/MP4 under 5MB

The key insight is that Tailwind v4 dramatically simplifies setup (just `@import "tailwindcss"` with the Vite plugin), and adapter-static outputs directly to a `build/` folder ready for Cloudflare Pages. The video pipeline is a one-time FFmpeg script, not a build-time process.

**Primary recommendation:** Use `npx sv create` for scaffolding, configure adapter-static with precompress enabled, and establish FFmpeg video presets before any content work begins.

## Standard Stack

The established libraries/tools for this phase:

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| [@sveltejs/kit](https://svelte.dev/docs/kit/introduction) | ^2.50.1 | Full-stack Svelte framework | Official framework. Built-in routing, SSG, Vite integration. |
| [svelte](https://svelte.dev/docs/svelte/overview) | ^5.49.1 | UI framework | Latest stable with Runes ($state, $derived, $effect, $props). |
| [@sveltejs/adapter-static](https://svelte.dev/docs/kit/adapter-static) | ^3.0.10 | Static site generator | Prerenders all pages. Required for Cloudflare Pages static hosting. |
| [tailwindcss](https://tailwindcss.com/docs/guides/sveltekit) | ^4.1.18 | Utility-first CSS | v4 with native Vite plugin. No PostCSS config needed. |
| [@tailwindcss/vite](https://tailwindcss.com/docs/installation) | ^4.1.18 | Tailwind Vite integration | Required for Tailwind v4 with Vite/SvelteKit. |
| [gsap](https://gsap.com/docs/v3/Installation) | ^3.14.2 | Animation library | Industry standard. Existing splash animation uses GSAP. |

### Supporting

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| [lucide-svelte](https://lucide.dev/guide/packages/lucide-svelte) | ^0.563.0 | Icon library | Replace Lucide CSS font with tree-shakable Svelte components. |
| TypeScript | bundled | Type safety | Enabled during `sv create`. SvelteKit has first-class support. |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| adapter-static | adapter-cloudflare | Use adapter-cloudflare only if server-side features (form actions, KV, D1) needed later |
| Tailwind v4 | Tailwind v3 | v3 requires PostCSS config, more setup. v4 is simpler. |
| GSAP | Svelte transitions | Built-in transitions lack timelines, ScrollTrigger. GSAP required for splash animation. |

**Installation:**

```bash
# Create SvelteKit project with TypeScript
npx sv create nbrs-website
cd nbrs-website

# Core dependencies
npm install gsap

# Dev dependencies (SvelteKit, Svelte, Vite included by sv create)
npm install -D tailwindcss @tailwindcss/vite @sveltejs/adapter-static

# Supporting libraries
npm install lucide-svelte
```

## Architecture Patterns

### Recommended Project Structure

```
nbrs-website/
├── src/
│   ├── app.css              # Tailwind import + brand CSS variables
│   ├── app.html              # HTML template
│   ├── lib/
│   │   ├── actions/          # Svelte actions (GSAP integration)
│   │   │   └── animate.ts    # Reusable GSAP action
│   │   ├── components/       # Reusable Svelte components
│   │   └── styles/           # Additional CSS if needed
│   └── routes/
│       ├── +layout.svelte    # Root layout (imports app.css)
│       ├── +layout.js        # Enable prerendering
│       ├── +page.svelte      # Homepage
│       ├── partner/
│       │   └── +page.svelte  # Partner page
│       ├── waitlist/
│       │   └── +page.svelte  # Waitlist page
│       └── family-1/
│           └── +page.svelte  # FAMILY 1 project page
├── static/
│   ├── videos/               # Optimized video files (committed)
│   │   ├── hero.webm
│   │   └── hero.mp4
│   └── images/               # Static images
├── videos-source/            # Source videos (gitignored)
├── scripts/
│   └── optimize-videos.sh    # FFmpeg compression script
├── svelte.config.js          # SvelteKit + adapter-static config
├── vite.config.ts            # Vite + Tailwind plugin config
└── package.json
```

### Pattern 1: Tailwind v4 Vite Plugin Integration

**What:** Configure Tailwind via Vite plugin without PostCSS.
**When to use:** All SvelteKit + Tailwind v4 projects.

```typescript
// vite.config.ts
// Source: https://tailwindcss.com/docs/guides/sveltekit
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),  // MUST be before sveltekit()
    sveltekit()
  ]
});
```

```css
/* src/app.css */
/* Source: https://tailwindcss.com/docs/guides/sveltekit */
@import "tailwindcss";

/* Brand CSS variables extracted from existing site */
:root {
  --color-nbrs-green: #4fa64f;
  --color-nbrs-coral: #FF6B6B;
  --color-nbrs-coral-hover: #FF8787;
}
```

### Pattern 2: Static Adapter Configuration

**What:** Configure adapter-static for Cloudflare Pages.
**When to use:** Any static-only deployment.

```javascript
// svelte.config.js
// Source: https://svelte.dev/docs/kit/adapter-static
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,    // No SPA fallback - fully static
      precompress: true,      // Generate .br and .gz files
      strict: true
    })
  }
};

export default config;
```

```javascript
// src/routes/+layout.js
// Source: https://svelte.dev/docs/kit/adapter-static
export const prerender = true;
```

### Pattern 3: GSAP Svelte Action

**What:** Clean GSAP lifecycle with Svelte actions.
**When to use:** Any GSAP animation in a Svelte component.

```typescript
// src/lib/actions/animate.ts
// Source: https://dev.to/jasper-clarke/integrating-svelte-5-with-gsap-3-54no
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
```

```svelte
<!-- Usage in component -->
<script>
  import { animate } from '$lib/actions/animate';
</script>

<div use:animate={{ opacity: 0, y: 50, duration: 1, ease: "power2.out" }}>
  Animated content
</div>
```

### Pattern 4: Root Layout with Tailwind

**What:** Minimal root layout that imports Tailwind.
**When to use:** Every SvelteKit project.

```svelte
<!-- src/routes/+layout.svelte -->
<!-- Source: https://tailwindcss.com/docs/guides/sveltekit -->
<script>
  let { children } = $props();
  import '../app.css';
</script>

{@render children()}
```

### Anti-Patterns to Avoid

- **Tailwind CDN:** No tree-shaking, no custom config, blocks build optimization. Use Vite plugin.
- **PostCSS config for Tailwind v4:** Unnecessary complexity. v4 Vite plugin handles everything.
- **adapter-auto:** Unclear deployment target. Use adapter-static explicitly for Cloudflare Pages.
- **GSAP without cleanup:** Memory leaks on route changes. Always return destroy() or use ctx.revert().
- **Processing videos at build time:** Too slow. Process once locally with FFmpeg, commit optimized outputs.

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Animation lifecycle cleanup | Manual addEventListener/removeEventListener | GSAP context with `ctx.revert()` | Handles all nested timelines, ScrollTriggers automatically |
| CSS utility framework | Custom utility classes | Tailwind CSS | 1000s of edge cases, responsive variants, dark mode |
| Video compression | Custom shell scripts from scratch | FFmpeg with documented presets | Codec settings, two-pass encoding, faststart flag |
| Static site building | Custom build scripts | adapter-static | Prerendering, asset hashing, compression handled |
| Icon components | Custom SVG components | lucide-svelte | Tree-shakable, consistent styling, accessible |

**Key insight:** The foundation phase is about assembling proven tools, not building custom infrastructure. Every hour spent on custom solutions is an hour not spent on visible features.

## Common Pitfalls

### Pitfall 1: Tailwind Plugin Order in Vite Config

**What goes wrong:** Tailwind styles don't apply. Classes appear in HTML but have no effect.
**Why it happens:** Tailwind Vite plugin must run before SvelteKit's Vite plugin to process CSS correctly.
**How to avoid:** Always list `tailwindcss()` before `sveltekit()` in the plugins array.
**Warning signs:** Utility classes like `text-3xl` or `bg-green-500` have no visual effect.

```typescript
// CORRECT
plugins: [tailwindcss(), sveltekit()]

// WRONG - will fail silently
plugins: [sveltekit(), tailwindcss()]
```

### Pitfall 2: Missing prerender = true

**What goes wrong:** Build fails with "Error: Cannot prerender page with dynamic route" or similar.
**Why it happens:** adapter-static requires all pages to be prerenderable. Default is to assume dynamic.
**How to avoid:** Add `export const prerender = true;` to `src/routes/+layout.js`.
**Warning signs:** Build errors mentioning prerendering or dynamic routes.

### Pitfall 3: Video Files Bloating Repository

**What goes wrong:** Git repo becomes 500MB+, cloning takes forever, GitHub limits hit.
**Why it happens:** Source video files (30MB+ each) accidentally committed.
**How to avoid:**
1. Add `videos-source/` to `.gitignore` immediately
2. Only commit optimized videos (under 5MB each) to `static/videos/`
**Warning signs:** `git status` showing large .mov or uncompressed .mp4 files.

### Pitfall 4: GSAP Import Breaking SSR

**What goes wrong:** Build fails with "ReferenceError: window is not defined" or similar.
**Why it happens:** GSAP accesses browser globals during import, which fails during SvelteKit's SSR.
**How to avoid:** Import GSAP only in `onMount` or use dynamic imports:

```typescript
import { onMount } from 'svelte';
import { browser } from '$app/environment';

onMount(async () => {
  if (browser) {
    const { gsap } = await import('gsap');
    // Use gsap here
  }
});
```

**Warning signs:** Build succeeds but errors on any page with GSAP imports.

### Pitfall 5: Wrong app.css Import Syntax

**What goes wrong:** Tailwind classes don't work, or CSS not loading at all.
**Why it happens:** Using wrong import syntax for Tailwind v4.
**How to avoid:** Use exactly `@import "tailwindcss";` - not `@tailwind base;` (v3 syntax).
**Warning signs:** No Tailwind preflight styles applied, or console errors about @tailwind directives.

## Code Examples

Verified patterns from official sources:

### Complete svelte.config.js

```javascript
// Source: https://svelte.dev/docs/kit/adapter-static
import adapter from '@sveltejs/adapter-static';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
  preprocess: vitePreprocess(),
  kit: {
    adapter: adapter({
      pages: 'build',
      assets: 'build',
      fallback: undefined,
      precompress: true,
      strict: true
    }),
    // Alias for cleaner imports
    alias: {
      $components: 'src/lib/components',
      $actions: 'src/lib/actions'
    }
  }
};

export default config;
```

### Complete vite.config.ts

```typescript
// Source: https://tailwindcss.com/docs/guides/sveltekit
import { sveltekit } from '@sveltejs/kit/vite';
import tailwindcss from '@tailwindcss/vite';
import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [
    tailwindcss(),
    sveltekit()
  ]
});
```

### Complete app.css with Brand Colors

```css
/* Source: https://tailwindcss.com/docs/guides/sveltekit + existing site inspection */
@import "tailwindcss";

/* NBRS Brand Colors - extracted from current site */
:root {
  --color-nbrs-green: #4fa64f;
  --color-nbrs-green-dark: #3d8b3d;
  --color-nbrs-coral: #FF6B6B;
  --color-nbrs-coral-hover: #FF8787;
}

/* Tailwind v4 theme extension */
@theme {
  --color-nbrs-green: #4fa64f;
  --color-nbrs-green-dark: #3d8b3d;
  --color-nbrs-coral: #FF6B6B;
  --color-nbrs-coral-hover: #FF8787;
}
```

### FFmpeg Video Optimization Script

```bash
#!/bin/bash
# scripts/optimize-videos.sh
# Source: https://pixelpoint.io/blog/web-optimized-video-ffmpeg/

# Usage: ./scripts/optimize-videos.sh input.mov output-name

INPUT="$1"
OUTPUT="$2"

if [ -z "$INPUT" ] || [ -z "$OUTPUT" ]; then
  echo "Usage: ./optimize-videos.sh <input-file> <output-name>"
  echo "Example: ./optimize-videos.sh videos-source/hero.mov hero"
  exit 1
fi

# Create output directory if it doesn't exist
mkdir -p static/videos

# WebM VP9 (primary - 30-50% smaller than H.264)
# CRF 30 for good compression, -b:v 0 for quality-based encoding
ffmpeg -i "$INPUT" \
  -c:v libvpx-vp9 -crf 30 -b:v 0 \
  -vf "scale=1920:-2" \
  -an \
  -movflags +faststart \
  "static/videos/${OUTPUT}.webm"

# MP4 H.264 (fallback - universal compatibility)
# CRF 23 for high quality, faststart for progressive loading
ffmpeg -i "$INPUT" \
  -c:v libx264 -crf 23 -preset slow \
  -vf "scale=1920:-2" \
  -an \
  -movflags +faststart \
  "static/videos/${OUTPUT}.mp4"

# Generate poster image from first frame
ffmpeg -i "$INPUT" \
  -vframes 1 \
  -vf "scale=1920:-2" \
  -q:v 2 \
  "static/images/${OUTPUT}-poster.webp"

echo "Created:"
echo "  static/videos/${OUTPUT}.webm"
echo "  static/videos/${OUTPUT}.mp4"
echo "  static/images/${OUTPUT}-poster.webp"

# Show file sizes
ls -lh "static/videos/${OUTPUT}."* "static/images/${OUTPUT}-poster.webp"
```

### Minimal Test Page

```svelte
<!-- src/routes/+page.svelte -->
<!-- Test that stack is working -->
<script>
  import { onMount } from 'svelte';

  let gsapLoaded = $state(false);

  onMount(async () => {
    const { gsap } = await import('gsap');
    gsapLoaded = true;

    // Quick animation test
    gsap.from('.test-box', {
      opacity: 0,
      y: 20,
      duration: 0.5
    });
  });
</script>

<main class="min-h-screen bg-[--color-nbrs-green] p-8">
  <h1 class="text-4xl font-bold text-white mb-4">
    NBRS Website v4
  </h1>

  <div class="space-y-2 text-white">
    <p>Tailwind: <span class="font-bold text-[--color-nbrs-coral]">Working</span></p>
    <p>GSAP: <span class="font-bold">{gsapLoaded ? 'Loaded' : 'Loading...'}</span></p>
  </div>

  <div class="test-box mt-8 p-4 bg-white rounded-lg text-[--color-nbrs-green] font-bold">
    If you see this animated in, GSAP works!
  </div>
</main>
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `create-svelte` | `npx sv create` | Late 2025 | Unified CLI with svelte-add integrations |
| Tailwind v3 + PostCSS | Tailwind v4 + Vite plugin | Early 2025 | No postcss.config.js needed, simpler setup |
| `@tailwind base/components/utilities` | `@import "tailwindcss"` | Tailwind v4 | Single import replaces three directives |
| Svelte stores | Svelte 5 Runes ($state, $derived) | Late 2024 | More explicit reactivity, better TypeScript |
| Svelte `export let` props | `$props()` rune | Svelte 5 | Cleaner prop destructuring |

**Deprecated/outdated:**
- `create-svelte`: Replaced by `sv` CLI
- `postcss.config.js` for Tailwind: Not needed with v4 Vite plugin
- `tailwind.config.js` content globs: Not needed with v4 Vite plugin auto-detection
- Svelte stores for component state: Use $state rune instead
- `export let` for props: Use $props() instead

## Open Questions

Things that couldn't be fully resolved:

1. **Tailwind v4 @theme syntax for custom colors**
   - What we know: Tailwind v4 uses @theme for custom theme values
   - What's unclear: Exact syntax for extending color palette confirmed in official v4 docs
   - Recommendation: Start with CSS variables in :root, add @theme if needed for Tailwind class generation

2. **GSAP license for commercial use**
   - What we know: Standard GSAP is free for most uses
   - What's unclear: Whether marketing site with forms requires Club GreenSock license
   - Recommendation: Standard license should be fine for static marketing site without premium plugins

## Sources

### Primary (HIGH confidence)
- [SvelteKit adapter-static docs](https://svelte.dev/docs/kit/adapter-static) - Configuration options, prerender requirements
- [Tailwind CSS SvelteKit Guide](https://tailwindcss.com/docs/guides/sveltekit) - v4 Vite plugin setup
- [GSAP Installation docs](https://gsap.com/docs/v3/Installation) - npm installation, plugin registration

### Secondary (MEDIUM confidence)
- [Cloudflare Pages SvelteKit Guide](https://developers.cloudflare.com/pages/framework-guides/deploy-a-svelte-kit-site/) - Deployment configuration
- [DEV.to: Tailwind v4 + SvelteKit Setup](https://dev.to/fedor-pasynkov/setting-up-tailwind-css-v4-in-sveltekit-the-vite-plugin-way-a-guide-based-on-real-issues-380n) - Troubleshooting guide
- [DEV.to: GSAP + Svelte 5 Integration](https://dev.to/jasper-clarke/integrating-svelte-5-with-gsap-3-54no) - Actions pattern
- [Pixel Point: FFmpeg Web Video](https://pixelpoint.io/blog/web-optimized-video-ffmpeg/) - VP9/H.264 presets
- [Mux: FFmpeg Compression](https://www.mux.com/articles/how-to-compress-video-files-while-maintaining-quality-with-ffmpeg) - CRF recommendations

### Tertiary (LOW confidence)
- npm registry version checks (2026-01-31) - Current versions verified

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - Official docs and npm verified all versions
- Architecture: HIGH - Patterns from official SvelteKit/Tailwind docs
- Video pipeline: MEDIUM - FFmpeg presets from community sources, need real-world testing
- Pitfalls: HIGH - Documented in official docs and verified via multiple sources

**Research date:** 2026-01-31
**Valid until:** 2026-03-01 (30 days - stack is stable)

---

*Phase 1 research for: NBRS Main Website v4*
*Stack: SvelteKit 2 + Svelte 5 + Tailwind v4 + GSAP 3 + adapter-static*
