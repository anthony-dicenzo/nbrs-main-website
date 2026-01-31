# Codebase Structure

**Analysis Date:** 2026-01-30

## Directory Layout

```
v3/
├── index.html                          # Main landing page (924 lines)
├── confirmation.html                   # Thank you page after form submission
├── citywalk.html                       # Alternative/archived page variant
├── index-combined.html                 # Archived version with combined assets
├── .htaccess                           # Apache server configuration
├── package.json                        # Node.js project metadata and build scripts
├── package-lock.json                   # Locked dependency versions
├── tailwind.config.js                  # Tailwind CSS configuration
├── src/
│   └── input.css                       # Tailwind directives (base, components, utilities)
├── css/
│   └── (compiled CSS output directory - currently empty)
├── node_modules/                       # Dependencies (tailwindcss, postcss, autoprefixer)
├── Archive/                            # Old versions of index.html from June 2025
├── Backup/                             # Backup versions from various dates
├── .planning/
│   ├── codebase/                       # This directory - analysis documents
│   └── ...
├── .claude/                            # Claude Code editor settings
├── .cursorrules                        # Cursor IDE rules
├── .DS_Store                           # macOS metadata
├── mainimage.png                       # Logo/header image (98 KB)
├── *.mp4                               # Hero section videos:
│   ├── video-output-E4E7476A-A746-4397-8515-58E3B7A0A0AA.mp4  # Primary hero video
│   ├── fountain.mp4                    # Video rotation option 1
│   ├── night.mp4                       # Video rotation option 2
│   ├── tasteofitaly.mp4                # Additional video (32 MB)
│   ├── combined-video.mp4              # Merged video file
│   └── *.mov                           # Backup video formats
└── .planning/
```

## Directory Purposes

**Root Directory:**
- Purpose: Static website hosting root - all files served directly by web server
- Contains: HTML entry points, configuration files, static media (videos, images)
- Deployment: Files committed to git or deployed directly to hosting

**`./src/`:**
- Purpose: Tailwind CSS source directory
- Contains: `input.css` with Tailwind directives
- Build Process: `npm run build` or `npm run watch` compiles to `./css/tailwind.min.css`
- Note: Currently `css/` directory exists but compiled output missing; uses Tailwind CDN in production

**`./css/`:**
- Purpose: Compiled CSS output from Tailwind build process
- Currently empty - using Tailwind CDN in production instead
- Will contain: `tailwind.min.css` when `npm run build` is executed

**`./node_modules/`:**
- Purpose: Local development dependencies for build tooling
- Contains: tailwindcss, postcss, autoprefixer, and their sub-dependencies
- Used for: `npm run build` and `npm run watch` commands
- Not committed to git (in .gitignore)

**`./Archive/`:**
- Purpose: Old versions of index.html from June 2025 and earlier
- Contains: index.html, index-2.html, index3.html, index copy-June13-1153.html
- Status: Historical - not used in production

**`./Backup/`:**
- Purpose: Backup copies for disaster recovery
- Contains: Multiple index.html versions from June 2025
- Examples: index-working-June18-448PM.html, index-combined(2025-10-10).html
- Status: Emergency recovery only

**`./.planning/`:**
- Purpose: GSD (Get Stuff Done) project planning and codebase analysis
- Contains: Phase plans, requirements, roadmap, and codebase documentation
- Subdirectory `codebase/`: ARCHITECTURE.md, STRUCTURE.md, CONVENTIONS.md, TESTING.md, CONCERNS.md

**`./.claude/`:**
- Purpose: Claude Code editor session data and settings
- Contains: settings.local.json and editor metadata
- Note: Project-specific to your development environment

## Key File Locations

**Entry Points:**

- `./index.html`: Primary landing page with hero section, about cards, partner form, footer. 924 lines with inline HTML, CSS, and JavaScript.
- `./confirmation.html`: Thank you page displayed after successful form submission. Simpler structure with confirmation message and return link.

**Configuration:**

- `./package.json`: Build scripts (`build` and `watch` for Tailwind), project metadata, devDependencies (tailwindcss, postcss, autoprefixer).
- `./tailwind.config.js`: Tailwind configuration specifying content paths for scanning HTML files.
- `./.htaccess`: Apache server rules for MIME types, CORS, video caching, compression, and directory listing prevention.

**Core Logic:**

- `./index.html` (lines 611-665): Vue.js application definition with data object containing aboutCards, formFields, benefits, footerLinks; methods for menu toggle and form submission.
- `./index.html` (lines 670-880): GSAP animation setup, video switching logic, DOM event listeners.

**Styling:**

- `./src/input.css`: Tailwind directives (3 lines) - starting point for CSS generation.
- `./index.html` (`<style>` tag, lines 14-610): Custom CSS for intro overlay, animations, hero section, mobile menu, responsive styling. Over 600 lines of inline styles.
- `./tailwind.config.js`: Tailwind theme extensions (currently empty `theme.extend`).

**Static Media:**

- Videos (hero): `./video-output-E4E7476A-A746-4397-8515-58E3B7A0A0AA.mp4` (4.9 MB - preloaded), `./fountain.mp4` (4.9 MB), `./night.mp4` (4.9 MB)
- Image: `./mainimage.png` (98 KB - header logo)
- Legacy: `.mov` files, combined video, archived HTML files

## Naming Conventions

**Files:**

- HTML files: lowercase with hyphen separators (`index.html`, `confirmation.html`, `index-combined.html`)
- CSS files: lowercase with hyphen separators, no spaces
- Video files: descriptive or UUID-based names with format extension (`fountain.mp4`, `video-output-E4E7476A...mp4`)
- Config files: dot-prefix for hidden files (`.htaccess`, `.DS_Store`)

**Directories:**

- Lowercase single words for functional directories (`src`, `css`, `node_modules`)
- PascalCase for archive directories (`Archive`, `Backup`)
- No spaces in directory names

**HTML/CSS Classes and IDs:**

- Classes: kebab-case (`intro-overlay`, `mobile-menu`, `hero-section`, `slide-content`)
- IDs: kebab-case or single word (`app`, `about`, `partner`, `heroVideo`)
- Vue data properties: camelCase (`menuOpen`, `aboutCards`, `formFields`, `currentVideo`)

**JavaScript Functions & Variables:**

- Function names: camelCase (`submitForm`, `toggleMobileMenu`, `updateBodyScroll`, `switchVideo`, `preloadVideo`)
- Variables: camelCase (`videoElement`, `sourceElement`, `currentVideo`, `isSwitching`, `videoCache`)
- Constants: camelCase (videos array - should arguably be UPPERCASE)

## Where to Add New Code

**New Feature (landing page section):**

1. **HTML markup**: Add `<section id="feature-name">` to `./index.html` main element, before closing `</main>` (around line 600)
2. **CSS styles**: Add styles to the `<style>` block at top of `./index.html` (lines 14-610)
3. **Vue data**: If reactive content needed, add arrays/objects to the `data()` return object (lines 615-660)
4. **Vue methods**: If interactivity needed, add methods to the `methods` object (lines 650-660)

Example structure (new cards section):
```html
<!-- In main element, around line 600 -->
<section id="features" class="w-full py-20 md:py-32">
    <div class="container mx-auto px-4 md:px-6">
        <h2 class="text-4xl font-bold text-white mb-12 text-center">Features</h2>
        <div v-for="feature in features" :key="feature.id" class="feature-card">
            <!-- card content -->
        </div>
    </div>
</section>
```

**New Animation:**

- GSAP code: Add to the DOMContentLoaded event listener, around lines 750-850
- Use existing patterns: `gsap.timeline()` for coordinated sequences, individual `gsap.to()` for tweens
- Follow timeline pattern: create timeline, add animations with `.to()`, use delays and offsets with strings like `"+=0.5"` or `"-=1"`

**New Vue Component-Like Card/Item:**

1. Add data array to `data()` object (e.g., `newItems: [{ id: 1, title: '...', ... }]`)
2. Use template `v-for="item in newItems" :key="item.id"` to render
3. Add method if click handler needed to `methods` object

**New Page:**

1. Create new `.html` file in root directory (e.g., `./services.html`)
2. Copy header and footer from `./index.html` or `./confirmation.html`
3. Keep same Vue CDN imports and Tailwind CDN link
4. Include HubSpot script if form submission needed
5. Add GSAP and Lucide imports if animations or icons needed

## Special Directories

**`./Archive/`:**
- Purpose: Historical versions (not deployed)
- Generated: No (manually created backups)
- Committed: Yes, for version history

**`./Backup/`:**
- Purpose: Manual backups for recovery
- Generated: No (created manually)
- Committed: Yes (included in repo)

**`./node_modules/`:**
- Purpose: npm dependencies
- Generated: Yes (by `npm install`)
- Committed: No (in .gitignore)

**`./.planning/codebase/`:**
- Purpose: GSD codebase analysis documents (ARCHITECTURE.md, STRUCTURE.md, etc.)
- Generated: Yes (created by GSD commands)
- Committed: Yes (tracked in git for reference)

---

*Structure analysis: 2026-01-30*
