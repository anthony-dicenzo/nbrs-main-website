# NBRS Main Website - Claude Code Memory

## Deployment (MUST FOLLOW)

**Cloudflare Workers** - Auto-deploy from GitHub is NOT working. After pushing to GitHub, manually deploy:

```bash
npm run build && rm -f build/videos/new/*.mov && npx wrangler deploy
```

- **Production URL**: https://nbrs-main-website.adicenzo1.workers.dev
- **Custom domain**: nbrs.ca (points to Workers)

## Video Handling

- Videos use poster images as fallback when autoplay is blocked (Low Power Mode, Data Saver)
- All videos must be under 5MB (optimized for web)
- `.mov` source files should NOT be deployed (remove from build before deploy)
- Poster images are auto-generated from video URLs (`.mp4` → `.jpg`)

## Tech Stack

- SvelteKit with `adapter-static`
- Tailwind CSS
- Cloudflare Workers for hosting
- Build output: `build/` directory
