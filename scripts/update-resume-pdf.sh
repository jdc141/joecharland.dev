#!/bin/bash

# Update Resume PDF Script
# Copies your latest resume PDF to the public folder

echo "📄 Updating resume PDF..."

# Check if source PDF exists
if [ -f "/Users/jcharland/Downloads/resume.pdf" ]; then
    cp /Users/jcharland/Downloads/resume.pdf /Users/jcharland/Repos/joecharland.dev/public/Resume_Joseph_Charland.pdf
    echo "✅ Copied from Downloads/resume.pdf"
elif [ -f "/Users/jcharland/Downloads/CharlandResume.pdf" ]; then
    cp /Users/jcharland/Downloads/CharlandResume.pdf /Users/jcharland/Repos/joecharland.dev/public/Resume_Joseph_Charland.pdf
    echo "✅ Copied from Downloads/CharlandResume.pdf"
elif [ -f "resume/resume.pdf" ]; then
    cp resume/resume.pdf public/Resume_Joseph_Charland.pdf
    echo "✅ Copied from resume/resume.pdf"
else
    echo "❌ No resume PDF found!"
    echo "Please place your resume PDF in one of these locations:"
    echo "  - ~/Downloads/resume.pdf"
    echo "  - ~/Downloads/CharlandResume.pdf"
    echo "  - resume/resume.pdf"
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

