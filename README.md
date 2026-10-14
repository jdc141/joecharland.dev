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

# Rebuild resume data + PDF from LaTeX source
npm run resume:sync
```

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

`resume/resume.tex` is the single source of truth — the resume page and the downloadable PDF are both generated from it.

1. Edit `resume/resume.tex`
2. Commit and push!

The deploy workflow compiles the PDF with [tectonic](https://tectonic-typesetting.github.io), so nothing else needs to be uploaded.

**To preview locally** (optional): `brew install tectonic`, then `npm run resume:sync` builds `public/Resume_Joseph_Charland.pdf`. `npm run dev` does this automatically.

---

## 🔗 Links

- **Live Site:** [joecharland.dev](https://joecharland.dev)
- **LinkedIn:** [joseph-charland](https://www.linkedin.com/in/joseph-charland)
- **GitHub:** [jdc141](https://github.com/jdc141)

---

Built with ❤️ using Astro & Tailwind CSS
