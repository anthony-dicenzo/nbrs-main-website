---
phase: 01-foundation-infrastructure
plan: 03
subsystem: build-tools
tags: [ffmpeg, video-compression, webm, mp4, shell-script]
dependency-graph:
  requires: []
  provides: [video-optimization-script, output-directories]
  affects: [02-homepage, 03-pages]
tech-stack:
  added: []
  patterns: [shell-script-tooling, ffmpeg-video-pipeline]
key-files:
  created:
    - scripts/optimize-videos.sh
    - static/videos/.gitkeep
    - static/images/.gitkeep
    - videos-source/README.md
  modified:
    - .gitignore
decisions:
  - id: video-formats
    choice: "WebM (VP9) primary, MP4 (H.264) fallback"
    rationale: "VP9 offers better compression for modern browsers, H.264 provides universal fallback"
  - id: target-size
    choice: "5MB max per video with CRF-based quality control"
    rationale: "Balance between quality and fast loading"
  - id: poster-generation
    choice: "Auto-generate WebP poster from first frame"
    rationale: "Provides instant visual feedback while video loads"
metrics:
  duration: "4 minutes"
  completed: "2026-01-31"
---

# Phase 01 Plan 03: Video Optimization Pipeline Summary

**FFmpeg shell script producing WebM (VP9) and MP4 (H.264) under 5MB with auto-generated poster images**

## What Was Built

Created a video optimization pipeline that transforms source videos into web-optimized formats suitable for the NBRS marketing site. The pipeline produces dual formats for browser compatibility and includes automatic poster image generation.

### Key Components

**scripts/optimize-videos.sh**
- Compresses any video to WebM (VP9) and MP4 (H.264)
- Generates WebP poster image from first frame
- Includes file size warning when outputs exceed 5MB
- Has built-in ffmpeg availability check
- Provides clear usage instructions

**Directory Structure**
- `videos-source/` - Gitignored source files (user places raw videos here)
- `static/videos/` - Committed optimized outputs (WebM and MP4)
- `static/images/` - Committed poster images (WebP)

### Encoding Settings

| Format | Codec | CRF | Other Settings |
|--------|-------|-----|----------------|
| WebM | VP9 (libvpx-vp9) | 30 | Quality-based encoding, no audio |
| MP4 | H.264 (libx264) | 23 | Slow preset, faststart for streaming |

### Usage Example

```bash
./scripts/optimize-videos.sh videos-source/hero-raw.mov hero
```

Produces:
- `static/videos/hero.webm` (primary, modern browsers)
- `static/videos/hero.mp4` (fallback, universal)
- `static/images/hero-poster.webp` (first frame)

## Implementation Notes

### FFmpeg Availability

FFmpeg is not currently installed on the development machine. The script handles this gracefully with an error message instructing the user to install via `brew install ffmpeg`. This is expected behavior - the script is ready for use once FFmpeg is installed.

### Git Configuration

Updated `.gitignore` to:
- Ignore `videos-source/` (large source files)
- Ignore root-level `.mp4` and `.mov` files (legacy videos in project root)
- Allow `static/videos/*.mp4` and `static/videos/*.webm` (optimized outputs)

## Task Completion

| Task | Name | Commit | Files |
|------|------|--------|-------|
| 1 | Create video optimization script and folder structure | 88cb741, dc4c73f | scripts/optimize-videos.sh, static/videos/.gitkeep, static/images/.gitkeep, .gitignore |
| 2 | Verify FFmpeg availability and document workflow | d8983ef | scripts/optimize-videos.sh (line ending fix) |

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Fixed line endings in shell script**
- **Found during:** Task 2 verification
- **Issue:** Script had Windows-style line endings (CRLF) causing "bad interpreter" error
- **Fix:** Removed carriage returns with sed
- **Commit:** d8983ef

## Verification Results

All verification criteria passed:

1. scripts/optimize-videos.sh exists and is executable (-rwxr-xr-x)
2. Script shows usage when run without arguments
3. .gitignore includes videos-source/
4. Directory structure exists: static/videos/, static/images/, videos-source/
5. Script contains WebM VP9 (libvpx-vp9) and MP4 H.264 (libx264) encoding commands
6. Script includes file size warning logic (MAX_SIZE = 5MB)

## Next Phase Readiness

**Ready for Phase 2 (Homepage)**
- Video optimization pipeline is complete
- Output directories are prepared for optimized videos
- SvelteKit can reference static/videos/ and static/images/ directly

**Dependencies**
- FFmpeg must be installed before processing videos: `brew install ffmpeg`
- Source videos should be placed in videos-source/ before running the script

## Open Questions

None - plan executed as specified.
