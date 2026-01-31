# Ralph Agent Instructions - NBRS Website

You are an autonomous coding agent building the NBRS marketing website.

## Project Context

**Reference Site:** https://www.americanhousing.co/ - mission-driven polish, carousel sections, clean transitions
**Existing Site:** https://nbrs.ca - source for videos, splash animation, brand assets
**Brand:** NBRS green #4fa64f, playful/vibrant personality, "Sincerely, Your NBRS"

**Tech Stack:** SvelteKit + Svelte 5 + Tailwind CSS v4 + GSAP

## Your Task

1. Read the PRD at `scripts/ralph/prd.json`
2. Read the progress log at `scripts/ralph/progress.txt` (check Codebase Patterns section first)
3. Check you're on the correct branch from PRD `branchName`. If not, check it out or create from main.
4. Pick the **highest priority** user story where `passes: false`
5. Implement that single user story
6. Run quality checks: `npm run build` (must pass), `npm run check` (if available)
7. If checks pass, commit ALL changes with message: `feat: [Story ID] - [Story Title]`
8. Update the PRD to set `passes: true` for the completed story
9. Append your progress to `scripts/ralph/progress.txt`

## Project-Specific Quality Checks

```bash
# Required - must pass
npm run build

# Verify dev server works
npm run dev &
sleep 3
curl -s http://localhost:5173 | head -20
pkill -f vite
```

## Progress Report Format

APPEND to scripts/ralph/progress.txt (never replace, always append):
```
## [Date/Time] - [Story ID]
- What was implemented
- Files changed
- **Learnings for future iterations:**
  - Patterns discovered
  - Gotchas encountered
  - Useful context
---
```

## Consolidate Patterns

If you discover a **reusable pattern**, add it to the `## Codebase Patterns` section at the TOP of progress.txt:

```
## Codebase Patterns
- Svelte 5 uses $state() and $effect() runes, not let/reactive statements
- GSAP must be dynamically imported in onMount to avoid SSR errors
- Brand colors defined in src/app.css @theme block as --color-nbrs-green
- Use Tailwind classes like bg-nbrs-green, text-nbrs-green
- Page transitions use #key block with pathname in +layout.svelte
```

## NBRS-Specific Patterns

- **Svelte 5 Runes:** Use `let x = $state(0)` not `let x = 0` for reactive state
- **GSAP:** Dynamic import in onMount: `const gsap = (await import('gsap')).default`
- **Tailwind v4:** Uses @theme block in app.css, not tailwind.config.js
- **Static Build:** Must work with adapter-static for Cloudflare Pages
- **Reference Quality:** All UI should match americanhousing.co polish level

## Stop Condition

After completing a user story, check if ALL stories have `passes: true`.

If ALL stories are complete, reply with:
<promise>COMPLETE</promise>

If there are still stories with `passes: false`, end your response normally.

## Important

- Work on ONE story per iteration
- Match americanhousing.co visual quality
- Videos from nbrs.ca are on Cloudinary
- Commit frequently with atomic changes
- Keep build passing
