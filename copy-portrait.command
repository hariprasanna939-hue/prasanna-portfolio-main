#!/bin/bash
# Move to the script's directory (prasanna-portfolio-main root)
cd "$(dirname "$0")"

echo "=========================================================="
echo "  Copying Prasanna Hari Portrait Cutout into Portfolio"
echo "=========================================================="

mkdir -p public/images

COPIED=0

for f in "$HOME/Downloads"/prasanna*portfolio*.png "$HOME/Downloads"/prasanna*hari*.png "$HOME/Downloads"/*portfolio*.png; do
  if [ -f "$f" ]; then
    echo "Found portrait: $f"
    cp "$f" "public/images/prasanna-cutout.png"
    cp "$f" "public/images/prasanna-portfolio.png"
    echo "✓ Successfully copied to public/images/prasanna-cutout.png!"
    COPIED=1
    break
  fi
done

if [ $COPIED -eq 0 ]; then
  echo "⚠️ Could not automatically locate the PNG in ~/Downloads."
  echo "Listing all .png files in ~/Downloads:"
  ls -la "$HOME/Downloads"/*.png 2>/dev/null || true
fi

echo "Done! You can close this window."
