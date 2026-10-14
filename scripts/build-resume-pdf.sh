#!/bin/bash

# Build Resume PDF Script
# Compiles resume/resume.tex straight to the public folder using tectonic

set -euo pipefail

cd "$(dirname "$0")/.."

SOURCE="resume/resume.tex"
OUTPUT="public/Resume_Joseph_Charland.pdf"

echo "📄 Building resume PDF..."

if ! command -v tectonic >/dev/null 2>&1; then
    # CI must always produce the PDF; locally the site still runs without it
    if [ -n "${CI:-}" ]; then
        echo "❌ tectonic not found!"
        exit 1
    fi
    echo "⚠️  tectonic not found, skipping PDF build"
    echo "Install it with: brew install tectonic"
    exit 0
fi

BUILD_DIR=$(mktemp -d)
trap 'rm -rf "$BUILD_DIR"' EXIT

tectonic "$SOURCE" --outdir "$BUILD_DIR" --keep-logs

cp "$BUILD_DIR/resume.pdf" "$OUTPUT"

SIZE=$(ls -lh "$OUTPUT" | awk '{print $5}')
echo "✅ Built $OUTPUT"
echo "📊 PDF size: $SIZE"

# Catch the resume spilling past one page
PAGES=$(sed -n 's/^Output written on .*(\([0-9]*\) page.*/\1/p' "$BUILD_DIR/resume.log")
if [ -n "$PAGES" ] && [ "$PAGES" != "1" ]; then
    echo "⚠️  Resume is $PAGES pages long (expected 1)"
fi
