#!/bin/bash

# Update Resume PDF Script
# Copies your latest resume PDF to the public folder

echo "📄 Updating resume PDF..."

# Find the most recent resume PDF in Downloads (handles duplicate names like "resume (2).pdf")
LATEST_PDF=$(ls -t ~/Downloads/resume*.pdf ~/Downloads/*Resume*.pdf 2>/dev/null | head -1)

if [ -n "$LATEST_PDF" ]; then
    cp "$LATEST_PDF" public/Resume_Joseph_Charland.pdf
    echo "✅ Copied from $(basename "$LATEST_PDF")"
elif [ -f "resume/resume.pdf" ]; then
    cp resume/resume.pdf public/Resume_Joseph_Charland.pdf
    echo "✅ Copied from resume/resume.pdf"
else
    echo "❌ No resume PDF found!"
    echo "Please download your resume PDF to ~/Downloads/"
    echo "Expected filename patterns: resume*.pdf or *Resume*.pdf"
    exit 1
fi

# Verify
if [ -f "public/Resume_Joseph_Charland.pdf" ]; then
    SIZE=$(ls -lh public/Resume_Joseph_Charland.pdf | awk '{print $5}')
    echo "📊 PDF size: $SIZE"
    echo "🌐 Download will be available at: /Resume_Joseph_Charland.pdf"
else
    echo "❌ Failed to copy PDF"
    exit 1
fi

