#!/bin/bash
# Video optimization script for NBRS website
# Produces web-optimized WebM (primary) and MP4 (fallback) under 5MB
#
# Usage: ./scripts/optimize-videos.sh <input-file> <output-name>
# Example: ./scripts/optimize-videos.sh videos-source/hero.mov hero

set -e

INPUT="$1"
OUTPUT="$2"

if [ -z "$INPUT" ] || [ -z "$OUTPUT" ]; then
  echo "Usage: ./scripts/optimize-videos.sh <input-file> <output-name>"
  echo "Example: ./scripts/optimize-videos.sh videos-source/hero.mov hero"
  echo ""
  echo "This script creates:"
  echo "  static/videos/<output-name>.webm  (VP9, primary format)"
  echo "  static/videos/<output-name>.mp4   (H.264, fallback)"
  echo "  static/images/<output-name>-poster.webp (first frame)"
  exit 1
fi

if [ ! -f "$INPUT" ]; then
  echo "Error: Input file '$INPUT' not found"
  exit 1
fi

# Check for ffmpeg
if ! command -v ffmpeg &> /dev/null; then
  echo "Error: ffmpeg is not installed"
  echo "Install with: brew install ffmpeg"
  exit 1
fi

# Create output directories if they don't exist
mkdir -p static/videos
mkdir -p static/images

echo "Optimizing: $INPUT -> $OUTPUT"
echo ""

# WebM VP9 (primary - better compression, modern browsers)
# CRF 30 = good compression while maintaining quality
# -b:v 0 = quality-based encoding (let CRF control quality)
# scale=1920:-2 = max 1920px wide, height divisible by 2
# -an = no audio (background videos)
echo "[1/3] Creating WebM (VP9)..."
ffmpeg -i "$INPUT" \
  -c:v libvpx-vp9 \
  -crf 30 \
  -b:v 0 \
  -vf "scale=1920:-2" \
  -an \
  -movflags +faststart \
  -y \
  "static/videos/${OUTPUT}.webm"

# MP4 H.264 (fallback - universal compatibility)
# CRF 23 = high quality (lower = better quality, larger file)
# preset slow = better compression (takes longer)
# faststart = progressive loading (starts playing before fully downloaded)
echo "[2/3] Creating MP4 (H.264)..."
ffmpeg -i "$INPUT" \
  -c:v libx264 \
  -crf 23 \
  -preset slow \
  -vf "scale=1920:-2" \
  -an \
  -movflags +faststart \
  -y \
  "static/videos/${OUTPUT}.mp4"

# Poster image from first frame
echo "[3/3] Creating poster image..."
ffmpeg -i "$INPUT" \
  -vframes 1 \
  -vf "scale=1920:-2" \
  -q:v 2 \
  -y \
  "static/images/${OUTPUT}-poster.webp"

echo ""
echo "Done! Created:"
ls -lh "static/videos/${OUTPUT}.webm" "static/videos/${OUTPUT}.mp4" "static/images/${OUTPUT}-poster.webp"

# File size check
echo ""
WEBM_SIZE=$(stat -f%z "static/videos/${OUTPUT}.webm" 2>/dev/null || stat -c%s "static/videos/${OUTPUT}.webm")
MP4_SIZE=$(stat -f%z "static/videos/${OUTPUT}.mp4" 2>/dev/null || stat -c%s "static/videos/${OUTPUT}.mp4")
MAX_SIZE=$((5 * 1024 * 1024))  # 5MB in bytes

if [ "$WEBM_SIZE" -gt "$MAX_SIZE" ]; then
  echo "WARNING: WebM is larger than 5MB. Consider increasing CRF or reducing resolution."
fi

if [ "$MP4_SIZE" -gt "$MAX_SIZE" ]; then
  echo "WARNING: MP4 is larger than 5MB. Consider increasing CRF or reducing resolution."
fi
