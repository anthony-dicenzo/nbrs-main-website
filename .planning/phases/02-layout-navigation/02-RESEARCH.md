# Phase 2: Layout & Navigation - Research

**Researched:** 2026-01-31
**Domain:** SvelteKit layouts, scroll-based navigation, page transitions, responsive footer
**Confidence:** HIGH

## Summary

This phase implements shared layout components across all routes: a scroll-responsive navigation header and a comprehensive footer with social links and email signup. The research identifies standard SvelteKit patterns for persistent layouts, Svelte 5 rune-based scroll detection, and appropriate transition approaches.

**Key findings:**
- SvelteKit's `+layout.svelte` with `{@render children()}` handles persistent layouts natively
- Svelte 5's `$state` rune combined with `<svelte:window bind:scrollY>` provides clean scroll tracking
- View Transitions API via `onNavigate` is the modern approach for page transitions (with fallback)
- Inter font family is the recommended clean sans-serif for this design aesthetic
- Email signup on static sites requires third-party form services (Formspree) or Cloudflare Workers

**Primary recommendation:** Build navigation/footer as Svelte components in `$lib/components/`, use native `<svelte:window>` bindings for scroll detection, implement 150ms fade transitions via Svelte's built-in `fade` transition.

## Standard Stack

The established libraries/tools for this domain:

### Core
| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| SvelteKit | ^2.15 | Layout system, routing | Already installed; native layout support |
| Svelte 5 | ^5.19 | Component framework with runes | Already installed; provides `$state`, `$effect` |
| Tailwind CSS | v4.1 | Styling, responsive utilities | Already installed; CSS-first config via `@theme` |

### Supporting
| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| svelte/transition | built-in | Page fade transitions | Needed for 150ms route fade |
| Inter font | variable | Typography | Clean sans-serif matching design reference |
| GSAP | ^3.14 | Complex animations (optional) | Only if scroll-hide needs advanced easing |

### Alternatives Considered
| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| CSS transitions for nav | GSAP timeline | GSAP is overkill for simple translateY; CSS is simpler |
| View Transitions API | #key block with transitions | View Transitions is progressive enhancement, requires Chrome |
| Inter font | Poppins, DM Sans | Inter has better variable font support and ligatures |

**No new installations required.** All dependencies already in project.

## Architecture Patterns

### Recommended Project Structure
```
src/
├── lib/
│   └── components/
│       ├── Nav.svelte          # Scroll-responsive navigation
│       ├── Footer.svelte       # Site-wide footer
│       └── PageTransition.svelte # Optional wrapper component
├── routes/
│   ├── +layout.svelte          # Root layout (imports Nav, Footer)
│   ├── +layout.ts              # Provides pathname for transitions
│   └── [all page routes]/
└── app.css                     # Tailwind, fonts, theme
```

### Pattern 1: Scroll-Responsive Navigation (Svelte 5)

**What:** Hide nav on scroll down, show on scroll up using native Svelte bindings
**When to use:** For the navigation header behavior specified in requirements

```svelte
<!-- Nav.svelte -->
<script lang="ts">
  let scrollY = $state(0);
  let lastScrollY = $state(0);
  let visible = $state(true);

  $effect(() => {
    // At top of page: always visible
    if (scrollY < 50) {
      visible = true;
    } else {
      // Compare current to last position
      visible = scrollY < lastScrollY;
    }
    lastScrollY = scrollY;
  });
</script>

<svelte:window bind:scrollY />

<nav
  class="fixed top-0 left-0 right-0 z-50 transition-transform duration-300"
  class:translate-y-0={visible}
  class:-translate-y-full={!visible}
>
  <!-- Nav content -->
</nav>
```

**Source:** Adapted from [Svelte Playground example](https://svelte.dev/playground/ad6e0fc0cb524eaaaac0fa74a32b8993) and [svelte:window docs](https://svelte.dev/docs/svelte/svelte-window)

### Pattern 2: Page Transitions with #key Block

**What:** Subtle fade transition between routes
**When to use:** For the 150-200ms page transition requirement

```svelte
<!-- +layout.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';

  let { children, data } = $props();
</script>

<Nav />

{#key data.pathname}
  <main in:fade={{ duration: 150, delay: 150 }} out:fade={{ duration: 150 }}>
    {@render children()}
  </main>
{/key}

<Footer />
```

```typescript
// +layout.ts
export const load = ({ url }) => {
  return { pathname: url.pathname };
};
```

**Source:** [SvelteKit Page Transitions](https://joshcollinsworth.com/blog/sveltekit-page-transitions), [Svelte transitions docs](https://svelte.dev/docs/svelte/svelte-transition)

### Pattern 3: Tailwind v4 Font Configuration

**What:** Add Inter font family via CSS-first configuration
**When to use:** For typography setup

```css
/* app.css */
@import url("https://rsms.me/inter/inter.css");
@import "tailwindcss";

@theme {
  --font-sans: "Inter", system-ui, sans-serif;
  --font-sans--font-feature-settings: "liga" 1, "calt" 1;

  /* Existing brand colors */
  --color-nbrs-green: #4fa64f;
  --color-nbrs-green-dark: #3d8b3d;
  --color-nbrs-coral: #FF6B6B;
  --color-nbrs-coral-hover: #FF8787;
}

/* Variable font support */
@supports (font-variation-settings: normal) {
  :root {
    font-family: "InterVariable", system-ui, sans-serif;
  }
}
```

**Source:** [Inter font documentation](https://rsms.me/inter/), [Tailwind v4 custom fonts](https://harrisonbroadbent.com/blog/tailwind-custom-fonts/)

### Pattern 4: Static Site Form Handling

**What:** Email signup form on static site without backend
**When to use:** For footer email signup requirement

```svelte
<!-- Footer.svelte (form portion) -->
<form
  action="https://formspree.io/f/YOUR_FORM_ID"
  method="POST"
  class="flex gap-2"
>
  <input
    type="email"
    name="email"
    required
    placeholder="Enter your email"
    class="px-4 py-2 rounded bg-white/10 text-white placeholder-white/60"
  />
  <button type="submit" class="px-6 py-2 bg-white text-nbrs-green rounded font-semibold">
    Sign up
  </button>
</form>
```

**Alternative:** Use Cloudflare Pages Functions for more control (requires `functions/` directory)

**Source:** [Cloudflare Pages Formspree tutorial](https://developers.cloudflare.com/pages/tutorials/add-an-html-form-with-formspree/)

### Anti-Patterns to Avoid

- **Using `on:scroll` handler instead of `bind:scrollY`:** The binding approach is more Svelte-idiomatic and handles cleanup automatically
- **GSAP for simple CSS transitions:** The 300ms nav slide and 150ms page fade are simple enough for CSS/Svelte transitions; GSAP adds unnecessary complexity
- **View Transitions API without fallback:** Only works in Chrome/Chromium; always ensure graceful degradation
- **Using slots instead of children prop:** Svelte 5 prefers `{@render children()}` over `<slot />`

## Don't Hand-Roll

Problems that look simple but have existing solutions:

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| Scroll position tracking | Custom scroll listener | `<svelte:window bind:scrollY>` | Native binding handles SSR, cleanup, updates |
| Page transitions | Custom animation system | `svelte/transition` fade | Built-in, optimized, declarative |
| Form submission | Custom API endpoint | Formspree or Cloudflare Workers | Static site has no backend; these handle spam |
| Responsive utilities | Custom media queries | Tailwind responsive prefixes | Already configured, battle-tested |

**Key insight:** This phase's requirements are straightforward UI patterns. The complexity is in getting the interactions right (scroll thresholds, transition timing), not in building infrastructure. Use native platform features.

## Common Pitfalls

### Pitfall 1: Scroll Event Firing During SSR

**What goes wrong:** Code that references `window` runs during server-side rendering, causing "window is not defined" errors
**Why it happens:** SvelteKit prerenders pages by default; scroll listeners assume browser context
**How to avoid:**
- Use `<svelte:window bind:scrollY>` (Svelte handles SSR)
- OR wrap window access in `browser` check from `$app/environment`
- OR use `onMount` which only runs client-side
**Warning signs:** 500 errors during build, "window is not defined" in logs

### Pitfall 2: Transition Flash on Initial Load

**What goes wrong:** Page content animates in on first load, looking glitchy
**Why it happens:** Svelte 5's `mount()` plays transitions by default, unlike Svelte 4
**How to avoid:**
- For layout transitions: Use delay on `in` transition so it doesn't fire on initial render
- Consider `intro: false` option if using programmatic mounting
**Warning signs:** Content fades in on page refresh when it should just appear

### Pitfall 3: Fixed Nav Overlap with Content

**What goes wrong:** First section content hidden behind fixed navigation
**Why it happens:** Fixed positioning removes nav from document flow
**How to avoid:** Add `pt-[nav-height]` or a spacer div equal to nav height to main content
**Warning signs:** Hero section appears cropped at top

### Pitfall 4: Transition Timing Overlap

**What goes wrong:** Old page and new page visible simultaneously during transition
**Why it happens:** `in` and `out` transitions run at same time without delay coordination
**How to avoid:** Set `in` transition delay >= `out` transition duration
```svelte
in:fade={{ duration: 150, delay: 150 }}
out:fade={{ duration: 150 }}
```
**Warning signs:** Page "jumps" or flashes during navigation

### Pitfall 5: Layout Shift When Nav Hides

**What goes wrong:** Content jumps when navigation shows/hides
**Why it happens:** Nav backdrop affects layout or scroll position
**How to avoid:**
- Use `transform: translateY(-100%)` not `display: none` for hiding
- Ensure nav is `position: fixed` with solid height
**Warning signs:** Content visibly shifts when scrolling

## Code Examples

Verified patterns from official sources:

### Complete Nav Component Structure

```svelte
<!-- src/lib/components/Nav.svelte -->
<script lang="ts">
  let scrollY = $state(0);
  let lastScrollY = $state(0);
  let visible = $state(true);
  let atTop = $state(true);

  $effect(() => {
    atTop = scrollY < 50;

    if (atTop) {
      visible = true;
    } else {
      // Show when scrolling up, hide when scrolling down
      visible = scrollY < lastScrollY;
    }
    lastScrollY = scrollY;
  });
</script>

<svelte:window bind:scrollY />

<header
  class="fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-out"
  class:translate-y-0={visible}
  class:-translate-y-full={!visible}
  class:bg-transparent={atTop}
  class:bg-nbrs-green={!atTop}
>
  <nav class="max-w-[1280px] mx-auto px-6 py-4 flex items-center justify-between">
    <!-- Logo (white when at top for hero, adapts when scrolled) -->
    <a href="/" class="text-white font-bold text-xl">
      Neighbourhood Scale
    </a>

    <!-- Navigation links -->
    <div class="flex gap-8">
      <a href="/mission" class="text-white">Mission</a>
      <a href="/partner" class="text-white">Partner</a>
    </div>
  </nav>
</header>
```

### Complete Footer Component Structure

```svelte
<!-- src/lib/components/Footer.svelte -->
<script lang="ts">
  // Social links configuration
  const socialLinks = [
    { name: 'LinkedIn', href: '#', icon: 'linkedin' },
    { name: 'X', href: '#', icon: 'x' },
    { name: 'Instagram', href: '#', icon: 'instagram' }
  ];

  const navLinks = [
    { name: 'Contact', href: '/contact' },
    { name: 'Mission', href: '/mission' },
    { name: 'FAQs', href: '/faqs' }
  ];
</script>

<footer class="bg-nbrs-green text-white py-16">
  <div class="max-w-[1280px] mx-auto px-6">
    <!-- Large brand name -->
    <h2 class="text-4xl md:text-6xl font-bold mb-12">
      Neighbourhood Scale
    </h2>

    <!-- Bottom section: social left, links+signup right -->
    <div class="flex flex-col md:flex-row justify-between items-start gap-8">
      <!-- Social icons -->
      <div class="flex gap-4">
        {#each socialLinks as { name, href }}
          <a {href} aria-label={name} class="hover:opacity-80">
            <!-- SVG icon here -->
          </a>
        {/each}
      </div>

      <!-- Right side: nav + signup -->
      <div class="flex flex-col md:flex-row gap-8 md:items-center">
        <!-- Navigation links -->
        <nav class="flex gap-6">
          {#each navLinks as { name, href }}
            <a {href} class="hover:opacity-80">{name}</a>
          {/each}
        </nav>

        <!-- Email signup -->
        <form action="https://formspree.io/f/FORM_ID" method="POST" class="flex gap-2">
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email"
            class="px-4 py-2 rounded bg-white/10 placeholder-white/60"
          />
          <button type="submit" class="px-6 py-2 bg-white text-nbrs-green rounded font-semibold">
            Sign up
          </button>
        </form>
      </div>
    </div>

    <!-- Copyright -->
    <p class="mt-12 text-sm opacity-80">
      &copy; Neighbourhood Scale, 2026
    </p>
  </div>
</footer>
```

### Root Layout with Transitions

```svelte
<!-- src/routes/+layout.svelte -->
<script lang="ts">
  import { fade } from 'svelte/transition';
  import Nav from '$lib/components/Nav.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.css';

  let { children, data } = $props();
</script>

<Nav />

<!-- Main content with page transitions -->
{#key data.pathname}
  <main
    class="min-h-screen pt-16"
    in:fade={{ duration: 150, delay: 150 }}
    out:fade={{ duration: 150 }}
  >
    {@render children()}
  </main>
{/key}

<Footer />
```

```typescript
// src/routes/+layout.ts
export const load = ({ url }) => {
  return { pathname: url.pathname };
};
```

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `export let` props | `$props()` rune | Svelte 5 (Oct 2024) | Must use new syntax |
| `<slot />` | `{@render children()}` | Svelte 5 (Oct 2024) | Layouts must update |
| `on:scroll` events | `bind:scrollY` | Svelte 3+ (preferred) | Cleaner, auto-cleanup |
| tailwind.config.js | `@theme` in CSS | Tailwind v4 (2024) | CSS-first config |
| Custom page transitions | View Transitions API | SvelteKit 1.24+ (2023) | Progressive enhancement option |

**Deprecated/outdated:**
- `export let data` in layouts - Use `let { children, data } = $props()` instead
- `<slot />` - Use `{@render children()}` for default content
- `on:click` event syntax - Use `onclick` (though both work in Svelte 5)

## Open Questions

Things that couldn't be fully resolved:

1. **Email signup form backend**
   - What we know: Formspree or Cloudflare Workers both work for static sites
   - What's unclear: Which service the project will use, whether signup list exists
   - Recommendation: Use placeholder Formspree action; configure actual endpoint during implementation or later phase

2. **Logo asset format**
   - What we know: Need white and green logo variants for nav contrast
   - What's unclear: Whether SVG logo exists, current asset format
   - Recommendation: Plan to reference placeholder, implement actual asset when available

3. **Social media URLs**
   - What we know: Footer needs LinkedIn, X, Instagram links
   - What's unclear: Actual profile URLs for the organization
   - Recommendation: Use placeholder `#` hrefs initially

4. **Nav color per-page**
   - What we know: Context says Claude has discretion for green vs white nav backdrop
   - What's unclear: Exact criteria for each page's hero content
   - Recommendation: Default to green backdrop after scroll; can be adjusted per-page if needed

## Sources

### Primary (HIGH confidence)
- [Svelte svelte:window docs](https://svelte.dev/docs/svelte/svelte-window) - scroll bindings, event handlers
- [Svelte transition docs](https://svelte.dev/docs/svelte/svelte-transition) - fade, all built-in transitions
- [Svelte 5 migration guide](https://svelte.dev/docs/svelte/v5-migration-guide) - $props, children, @render
- [SvelteKit routing docs](https://svelte.dev/docs/kit/routing) - layout files, load functions
- [Inter font official](https://rsms.me/inter/) - font usage, CDN, features
- [Tailwind v4 fonts](https://harrisonbroadbent.com/blog/tailwind-custom-fonts/) - @theme CSS configuration

### Secondary (MEDIUM confidence)
- [SvelteKit page transitions blog](https://joshcollinsworth.com/blog/sveltekit-page-transitions) - #key block pattern
- [Svelte Playground scroll nav](https://svelte.dev/playground/ad6e0fc0cb524eaaaac0fa74a32b8993) - scroll direction detection
- [Cloudflare Pages Formspree tutorial](https://developers.cloudflare.com/pages/tutorials/add-an-html-form-with-formspree/) - static form handling
- [Integrating Svelte 5 with GSAP](https://dev.to/jasper-clarke/integrating-svelte-5-with-gsap-3-54no) - action-based pattern

### Tertiary (LOW confidence)
- WebSearch results for font recommendations - Inter confirmed via multiple sources
- Community footer examples - patterns verified against Tailwind docs

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH - All libraries already installed, official docs consulted
- Architecture: HIGH - Patterns verified from Svelte official docs and playground
- Pitfalls: MEDIUM - Based on community reports and documented behavior changes
- Code examples: HIGH - Adapted from official documentation with Svelte 5 syntax

**Research date:** 2026-01-31
**Valid until:** 2026-03-01 (stable stack, no major changes expected)
