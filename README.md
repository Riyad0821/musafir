# Musafir (المُسَافِر)

> *"A traveler's notebook of revelation, remembrance, and reflection."*

Musafir is an ultra-fast, calm, reading-focused personal content-collection website built with **Astro**, **Tailwind CSS**, and **Pagefind**. It is designed as a personal spiritual way-station where Quranic ayat, prophetic traditions (hadith), Islamic historical events, biographies of the Sahaba, and contemplative reflections are curated and preserved as static Markdown files.

---

## Table of Contents
1. [Core Features](#core-features)
2. [Tech Stack](#tech-stack)
3. [Quick Start & Local Development](#quick-start--local-development)
4. [How to Add New Entries](#how-to-add-new-entries)
5. [Content Guidelines & Authenticity Standards](#content-guidelines--authenticity-standards)
6. [Deployment to Cloudflare Pages & GitHub Pages](#deployment-to-cloudflare-pages--github-pages)
7. [Submitting Sitemap to Search Engines](#submitting-sitemap-to-search-engines)
8. [Configuration & Customization](#configuration--customization)

---

## 1. Core Features

- **Five Curated Collections**:
  1. `ayat` — Sacred Quranic verses with verified Uthmani script and translations.
  2. `hadith` — Prophetic narrations with narrator, grading, and canonical references.
  3. `events` — Milestones in Islamic history with Hijri dates, eras, and chronicles.
  4. `sahaba` — Biographical moments and steadfast faith of the Companions.
  5. `writings` — Personal contemplations, classical wisdom quotes, articles, and poems.
- **RTL Arabic Typography**: Amiri & Noto Naskh Arabic loaded with proper tashkeel spacing, 1.5x font scale, and generous line height (`leading-[2.1]`).
- **Zero-Latency Search**: Client-side full-text search powered by Pagefind (no servers, no external APIs).
- **Dynamic Open Graph Images**: Build-time branded PNG OG cards generated automatically for every entry using Satori and Resvg.
- **Robust SEO & Schema Markup**:
  - Full Open Graph, Twitter card, and canonical tags.
  - JSON-LD structured data (`WebSite`, `Article`, `BreadcrumbList`).
  - Auto-generated `sitemap-index.xml`, `robots.txt`, and combined `rss.xml` feed.
- **Accessible & Responsive**: Dark and light mode toggle with zero-flash on load, semantic HTML5 hierarchy, AA contrast, and mobile navigation drawer.

---

## 2. Tech Stack

- **Framework**: [Astro 7](https://astro.build) (Static HTML output)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com)
- **Content Engine**: Astro Content Layer with Zod type-safe schemas
- **Search**: [Pagefind](https://pagefind.app)
- **OG Image Generation**: [Satori](https://github.com/vercel/satori) + [@resvg/resvg-js](https://github.com/yisibl/resvg-js)
- **Syndication & SEO**: `@astrojs/rss`, `@astrojs/sitemap`

---

## 3. Quick Start & Local Development

### Prerequisites
- Node.js `v22` or higher (Use `nvm use 22` or `.nvmrc`)

### Installation
```bash
# Clone the repository
git clone <your-repo-url>
cd musafir

# Install dependencies
npm install
```

### Running Locally
```bash
# Start Astro local dev server
npm run dev

# Or with background dev server as defined in workspace rules:
astro dev --background
```
Open your browser at `http://localhost:4321`.

### Production Build & Search Indexing
To compile static pages and build the client-side Pagefind search index:
```bash
npm run build
```
The output is generated in the `dist/` directory.

### Preview Production Build
```bash
npm run preview
```

---

## 4. How to Add New Entries

Every collection lives inside `src/content/<collection-name>/` as a Markdown (`.md`) file.

Templates are available in the `content-templates/` directory:
- `content-templates/ayat.md`
- `content-templates/hadith.md`
- `content-templates/events.md`
- `content-templates/sahaba.md`
- `content-templates/writings.md`

### 1. Adding an Ayah (`src/content/ayat/my-ayah.md`)
```markdown
---
surah: "Al-Baqarah"
surahNumber: 2
ayahFrom: 286
ayahTo: 286
arabic: "لَا يُكَلِّفُ اللَّهُ نَفْسًا إِلَّا وُسْعَهَا"
translation: "Allah does not burden a soul beyond that it can bear..."
translationSource: "Saheeh International"
tags: ["sabr", "tawakkul"]
note: "The concluding verse of Surah Al-Baqarah"
dateAdded: 2026-10-15
featured: false
draft: false
seoTitle: "Allah Does Not Burden a Soul Beyond Its Capacity"
seoDescription: "A reflection on Surah Al-Baqarah 2:286 and the boundless mercy in divine accountability."
---

Your personal reflection, linguistic commentary, or context here in Markdown.
```

### 2. Adding a Hadith (`src/content/hadith/my-hadith.md`)
```markdown
---
collection: "Sahih al-Bukhari"
bookNumber: 1
hadithNumber: "1"
narrator: "Umar ibn al-Khattab (RA)"
grading: "Sahih (Agreed Upon)"
arabic: "إِنَّمَا الأَعْمَالُ بِالنِّيَّاتِ"
translation: "Actions are but by intentions, and every person will have only that which they intended..."
translationSource: "Sunnah.com / Darussalam"
reference: "Sahih al-Bukhari 1, Book 1, Hadith 1"
tags: ["akhlaq", "tawhid"]
note: "Foundational hadith regarding sincere purpose"
dateAdded: 2026-10-15
featured: false
draft: false
---

Lessons (fawa'id) and contemplation regarding intentions.
```

### 3. Adding an Islamic Event (`src/content/events/my-event.md`)
```markdown
---
title: "The Conquest of Mecca (Fath Makkah)"
hijriDate: "Ramadan 8 AH"
gregorianDate: "December 629 / January 630 CE"
era: "Madinan Period"
location: "Mecca"
summary: "The peaceful entry into Mecca, characterized by prophetic magnanimity and universal amnesty."
sources:
  - "Ibn Hisham, As-Seerah an-Nabawiyyah"
  - "Sahih al-Bukhari, Kitab al-Maghazi"
tags: ["compassion", "tawhid"]
dateAdded: 2026-10-15
featured: false
draft: false
---

Full historical narrative, chronology, and spiritual lessons.
```

### 4. Adding a Sahabi Account (`src/content/sahaba/my-sahabi.md`)
```markdown
---
title: "Bilal ibn Rabah and Steadfast Monotheism"
sahabi: "Bilal ibn Rabah (RA)"
relatedEvent: "Early Meccan Persecution"
summary: "The steadfastness of Bilal under scorching desert stones, repeating 'Ahad, Ahad' (One, One)."
sources:
  - "Ibn Sa'd, Kitab at-Tabaqat al-Kabir"
  - "Al-Dhahabi, Siyar A'lam an-Nubala"
tags: ["tawhid", "sabr", "sahaba-stories"]
dateAdded: 2026-10-15
featured: false
draft: false
---

Full biographical narrative and reflection on spiritual fortitude.
```

### 5. Adding a Writing / Quote / Poem (`src/content/writings/my-writing.md`)
```markdown
---
title: "The Three Degrees of Patience"
author: "Ibn al-Qayyim al-Jawziyya"
originalSource: "Madarij as-Salikin"
type: "reflection" # quote | article | reflection | poem
summary: "An exposition on patience in obeying commands, avoiding prohibitions, and enduring divine decrees."
tags: ["sabr", "hereafter"]
dateAdded: 2026-10-15
featured: false
draft: false
---

Full text of the piece and contemplation.
```

---

## 5. Content Guidelines & Authenticity Standards

1. **Verify Before Publishing**: Never publish unverified or fabricated hadith. Always check the primary collection, book number, hadith number, and established grading (*Sahih*, *Hasan*).
2. **Preserve Arabic Diacritics**: Ensure Uthmani script contains accurate tashkeel to preserve recitation and meaning.
3. **Explicit Attribution**: Always cite the translator, author, or historical chronicle.
4. **Context & Contemplation**: Add personal context, historical background, or spiritual contemplation in the markdown body.
5. **Manage Themes via `src/data/tags.json`**: When introducing a new theme tag, add its display name and a 2-3 sentence introduction to `src/data/tags.json`.

---

## 6. Deployment to Cloudflare Pages & GitHub Pages

### Deploying to Cloudflare Pages (Recommended)
1. Push your repository to GitHub or GitLab.
2. In the [Cloudflare Dashboard](https://dash.cloudflare.com/), navigate to **Workers & Pages** > **Create application** > **Pages** > **Connect to Git**.
3. Configure your build settings:
   - **Framework preset**: `None` or `Astro`
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
   - **Environment Variable**: Set `NODE_VERSION` to `22` (or `22.22.3`).
4. Click **Save and Deploy**.
5. Once deployed, click **Custom domains** in your Cloudflare Pages project and add your domain (e.g. `musafir.yourdomain.com`).

### Deploying to GitHub Pages
The site generates static HTML output in `dist/`, fully compatible with GitHub Actions using the official `actions/deploy-pages` workflow.

---

## 7. Submitting Sitemap to Search Engines

Musafir automatically creates a search-engine-ready sitemap at:
`https://yourdomain.com/sitemap-index.xml`

### Google Search Console
1. Go to [Google Search Console](https://search.google.com/search-console).
2. Add your domain property and complete DNS verification.
3. In the left navigation, click **Sitemaps**.
4. Enter `sitemap-index.xml` in the "Add a new sitemap" box and click **Submit**.

### Bing Webmaster Tools
1. Go to [Bing Webmaster Tools](https://www.bing.com/webmasters).
2. Import your verified property from Google Search Console (or add manually).
3. Navigate to **Sitemaps** > **Submit sitemap**.
4. Submit `https://yourdomain.com/sitemap-index.xml`.

---

## 8. Configuration & Customization

Central site settings are managed in [`src/config.ts`](file:///home/hossain_riyad/Documents/practice/musafir/src/config.ts):
- **Site Name**: `Musafir`
- **Tagline**: `"A traveler's notebook of revelation, remembrance, and reflection."`
- **Site URL**: Update `siteUrl` to your live production domain (also update `astro.config.mjs` and `public/robots.txt`).
- **Author & Social Links**: Configure your GitHub, Twitter/X, and contact info.
