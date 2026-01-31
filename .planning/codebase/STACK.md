# Technology Stack

**Analysis Date:** 2026-01-30

## Languages

**Primary:**
- HTML5 - Markup language for page structure and content
- CSS3 - Styling via Tailwind CSS and inline styles
- JavaScript (ES6+) - Client-side interactivity via Vue 3

**Secondary:**
- Bash/Shell - Build script execution (Tailwind CLI)

## Runtime

**Environment:**
- Browser (client-side only)
- No server runtime currently in use for this static site

**Package Manager:**
- npm 9+
- Lockfile: `package-lock.json` (present and committed)

## Frameworks

**Core:**
- Vue 3 3.x (unpkg CDN distribution) - Reactive component framework for dynamic UI
- Tailwind CSS 4.1.10 - Utility-first CSS framework

**Styling:**
- PostCSS 8.5.5 - CSS transformation pipeline
- Autoprefixer 10.4.21 - Browser vendor prefixing

**Animation:**
- GSAP 3.12.5 (unpkg CDN) - Greensock Animation Platform for complex animations

**UI Components:**
- Lucide Icons 0.16.29 (jsdelivr CDN) - Icon library via static CSS font

## Key Dependencies

**Critical:**
- `tailwindcss` 4.1.10 - Core styling framework, used for all responsive design and utility classes
- `postcss` 8.5.5 - CSS processor required by Tailwind
- `autoprefixer` 10.4.21 - Ensures browser compatibility for CSS rules
- Vue 3 (CDN) - Dynamic UI framework for form interactions and mobile menu
- GSAP (CDN) - Complex animation library for intro sequences and video transitions

**Build/Dev:**
- `postcss` 8.5.5 - Build pipeline processor
- `autoprefixer` 10.4.21 - Post-processing vendor prefixes
- `browserslist` 4.25.0 - Browser compatibility database
- `caniuse-lite` 1.0.30001723 - Can I Use database for feature detection

**Supporting:**
- `nanoid` 3.3.11 - ID generation (indirect dependency)
- `picocolors` 1.1.1 - Terminal colors (indirect dependency)
- `source-map-js` 1.2.1 - Source map support (indirect dependency)

## Configuration

**Environment:**
- No `.env` files detected
- All configuration hardcoded in `index.html` script tags and tailwind.config.js

**Build:**
- `tailwind.config.js` - Tailwind configuration
  - Content scanning: `./**/*.{html,js}`
  - Theme extensions: Default (none currently)
  - Plugins: None

**Package Scripts:**
```json
{
  "build": "tailwindcss -i ./src/input.css -o ./css/tailwind.min.css --minify",
  "watch": "tailwindcss -i ./src/input.css -o ./css/tailwind.min.css --watch"
}
```

## Platform Requirements

**Development:**
- Node.js 10+ (for npm and Tailwind CLI)
- npm 6+
- No specific OS requirements

**Production:**
- Modern browser with ES6+ support
- HTML5 video support (for hero section video playback)
- JavaScript enabled
- Minimum 50MB bandwidth for initial video assets (~32MB for tasteofitaly.mp4, ~5MB for other videos)

**Deployment Target:**
- Static file hosting (Vercel, Netlify, traditional web server, etc.)
- No backend server required
- Can be served from any CDN or static host

## External CDN Dependencies

**Cloudflare CDN:**
- GSAP 3.12.5: `https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js`

**jsDelivr CDN:**
- Lucide Icons 0.16.29: `https://cdn.jsdelivr.net/npm/lucide-static@0.16.29/font/lucide.min.css`

**Tailwind CDN:**
- `https://cdn.tailwindcss.com` - Dynamic Tailwind CSS compilation (dev/demo only, not recommended for production)

**unpkg CDN:**
- Vue 3 global distribution: `https://unpkg.com/vue@3/dist/vue.global.js`

## Assets

**Media:**
- Local MP4 videos: `tasteofitaly.mp4` (32MB), `fountain.mp4` (~5MB), `night.mp4` (~5MB), `video-output-E4E7476A-A746-4397-8515-58E3B7A0A0AA.mp4` (~5MB)
- Local images: `mainimage.png` (98KB)
- SVG assets: Embedded inline in HTML for buildings, clouds, birds

---

*Stack analysis: 2026-01-30*
