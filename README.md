# joecharland.dev — Personal Portfolio

Welcome to the source code for **joecharland.dev**, my personal software engineering portfolio site.

This version (2025 refresh) is a complete rebuild using [Astro](https://astro.build) and [Tailwind CSS](https://tailwindcss.com).

It's designed to be modern, minimal-maintenance, and free to host on **GitHub Pages**.

---

## 🎯 Overview

**Purpose:**  
Showcase my background, Georgia Tech OMSCS studies, and personal software projects in a clean, responsive, and easily maintained site.

**Key objectives:**

- ⚡️ Lightweight and fast (static site only)
- 🧩 Modular structure — each page and project is self-contained
- 💰 Zero-cost hosting (GitHub Pages)
- 🪶 Easy project updates via simple Markdown files
- 🧠 Powered by Astro + Tailwind for minimal boilerplate

---

## 🧱 Tech Stack

| Layer | Tool | Notes |
|:------|:-----|:------|
| Static Framework | **Astro** | HTML-first static site generator |
| Styling | **Tailwind CSS** | Utility CSS for rapid design |
| Package Manager | `npm` | Node 18+ |
| Deployment | **GitHub Pages** | Free, automated hosting |
| Content Format | **Markdown (.md)** | For projects and pages |

---

## ⚙️ Project Structure

```text
src/
├── components/          # Reusable Astro components
│   ├── Layout.astro    # Main layout wrapper with cursor spotlight
│   ├── Navbar.astro    # Navigation with mobile menu
│   ├── Footer.astro    # Site footer (with easter egg 🐧)
│   └── ProjectCard.astro  # Project display card
├── content/            # Markdown content
│   ├── about.md       # About page content
│   └── projects/      # Individual project files
├── data/              # Structured data
│   └── resume.json    # Parsed resume data
├── pages/             # Routes
│   ├── index.astro    # Home page with animations
│   ├── about.astro    # About page
│   ├── projects.astro # Projects listing
│   ├── resume.astro   # Interactive resume with timeline
│   ├── play.astro     # Easter egg game page
│   └── 404.astro      # Fun 404 with Arctic Adventure game
└── styles/
    └── global.css     # Global styles

public/
├── CNAME              # Custom domain config
└── Resume_Joseph_Charland.pdf  # Downloadable resume

scripts/
├── parse-latex-resume.js  # LaTeX → JSON converter
└── update-resume-pdf.sh   # PDF sync script

resume/
└── resume.tex         # Source LaTeX resume
```

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server (localhost:4321)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Update resume from LaTeX source
npm run resume:sync
```

---

## ✨ Features

- 🎨 **Modern Design**: Clean, responsive layout with Tailwind CSS
- ⚡️ **Fast Performance**: Static site generation with Astro
- 🎮 **Interactive Elements**: 
  - Cursor spotlight effect on all pages
  - Arctic Adventure game on 404 page
  - Hidden `/play` easter egg in footer
  - Hover animations throughout
- 📄 **Resume Automation**: LaTeX-to-JSON pipeline for easy updates
- 📱 **Mobile Responsive**: Works perfectly on all devices
- 🔍 **SEO Optimized**: Proper meta tags and semantic HTML

---

## 📝 Content Management

### Adding Projects

Create a new `.md` file in `src/content/projects/`:

```markdown
---
title: "Your Project Name"
description: "Brief description"
image: "/images/your-project.jpg"
tech: ["React", "Node.js", "PostgreSQL"]
github: "https://github.com/username/repo"
demo: "https://demo-url.com"
order: 1
---

Optional detailed description here.
```

### Updating Resume

1. Edit `resume/resume.tex` with your LaTeX resume
2. Run `npm run update:pdf` to sync the latest PDF
3. Run `npm run build` (auto-generates `resume.json` from LaTeX)
4. Commit and push - changes deploy automatically!

**Note:** `resume.json` is auto-generated during builds and doesn't need to be in Git.

---

## 🚢 Deployment

The site automatically deploys to GitHub Pages via GitHub Actions on every push to `main`.

**Quick Setup:**
1. Push code to GitHub
2. Enable GitHub Pages in repository settings (source: GitHub Actions)
3. Configure custom domain in Settings → Pages
4. Add DNS records at your domain registrar

**See `DEPLOY.md` for complete step-by-step deployment instructions.**

---

## 📄 License

This portfolio site is open source for reference and learning purposes. Feel free to use it as inspiration for your own portfolio!

---

## 🔗 Links

- **Live Site:** [joecharland.dev](https://joecharland.dev)
- **LinkedIn:** [joseph-charland](https://www.linkedin.com/in/joseph-charland)
- **GitHub:** [jdc141](https://github.com/jdc141)

---

Built with ❤️ using Astro & Tailwind CSS
