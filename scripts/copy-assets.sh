#!/bin/bash
set -e

PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DOWNLOADS_DIR="$HOME/Downloads"

mkdir -p "$PROJECT_DIR/public/images/events"
mkdir -p "$PROJECT_DIR/public/images/bootcamp"
mkdir -p "$PROJECT_DIR/public/images/hackathon"

echo "Copying Hero Cutout Portrait..."
for f in "$DOWNLOADS_DIR"/prasanna*portfolio*.png "$DOWNLOADS_DIR"/prasanna*hari*.png "$DOWNLOADS_DIR"/*portfolio*.png; do
  if [ -f "$f" ]; then
    echo "Found portrait: $f"
    cp "$f" "$PROJECT_DIR/public/images/prasanna-cutout.png"
    cp "$f" "$PROJECT_DIR/public/images/prasanna-portfolio.png"
    break
  fi
done

echo "Copying Startup Event images..."
cp "$DOWNLOADS_DIR/founder.jpeg" "$PROJECT_DIR/public/images/events/" 2>/dev/null || true
cp "$DOWNLOADS_DIR/1769410436399.jpeg" "$PROJECT_DIR/public/images/events/" 2>/dev/null || true
cp "$DOWNLOADS_DIR/1769410435425.jpeg" "$PROJECT_DIR/public/images/events/" 2>/dev/null || true

echo "Copying Bootcamp images..."
cp "$DOWNLOADS_DIR/WhatsApp Image 2026-10-11 at 18.27.43.jpeg" "$PROJECT_DIR/public/images/bootcamp/" 2>/dev/null || true
cp "$DOWNLOADS_DIR/IMG_5071.JPG" "$PROJECT_DIR/public/images/bootcamp/" 2>/dev/null || true
cp "$DOWNLOADS_DIR/IMG_5150.JPG" "$PROJECT_DIR/public/images/bootcamp/" 2>/dev/null || true
cp "$DOWNLOADS_DIR/WhatsApp Image 2026-10-11 at 18.27.04.jpeg" "$PROJECT_DIR/public/images/bootcamp/" 2>/dev/null || true
cp "$DOWNLOADS_DIR/WhatsApp Image 2026-10-11 at 18.27.21.jpeg" "$PROJECT_DIR/public/images/bootcamp/" 2>/dev/null || true
cp "$DOWNLOADS_DIR/WhatsApp Image 2026-10-11 at 18.28.08.jpeg" "$PROJECT_DIR/public/images/bootcamp/" 2>/dev/null || true

echo "Copying Smart India Hackathon 26 images..."
cp "$DOWNLOADS_DIR/IMG_6549.JPG" "$PROJECT_DIR/public/images/hackathon/" 2>/dev/null || true
cp "$DOWNLOADS_DIR/IMG_6354.JPG" "$PROJECT_DIR/public/images/hackathon/" 2>/dev/null || true
cp "$DOWNLOADS_DIR/IMG_6359.JPG" "$PROJECT_DIR/public/images/hackathon/" 2>/dev/null || true
cp "$DOWNLOADS_DIR/IMG_6362.JPG" "$PROJECT_DIR/public/images/hackathon/" 2>/dev/null || true
cp "$DOWNLOADS_DIR/IMG_6364.JPG" "$PROJECT_DIR/public/images/hackathon/" 2>/dev/null || true
cp "$DOWNLOADS_DIR/IMG_6380.JPG" "$PROJECT_DIR/public/images/hackathon/" 2>/dev/null || true
cp "$DOWNLOADS_DIR/IMG_6519.JPG" "$PROJECT_DIR/public/images/hackathon/" 2>/dev/null || true
cp "$DOWNLOADS_DIR/IMG_6375.JPG" "$PROJECT_DIR/public/images/hackathon/" 2>/dev/null || true

echo "✓ All portfolio assets copied to public/images!"
