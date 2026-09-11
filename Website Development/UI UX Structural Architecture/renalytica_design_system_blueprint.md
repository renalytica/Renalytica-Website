# RENALYTICA ARCHITECTURAL BLUEPRINT & DESIGN SYSTEM
**Document ID:** `REN-DS-2026-ARCH`  
**Foundation:** Reverse-Engineered from Benchmark UI/UX Screen-Recordings (15 Modules) & Renalytica Brand Guidelines v4.0  
**Target Platform:** `www.renalytica.com` & Digital Research Storefront  
**Design Archetype:** The Precision Vanguard & Institutional Telemetry Showroom  

---

## 1. Executive Summary & Design System Philosophy

The benchmark website screen recordings reveal an award-winning digital experience (FWA of the Day winner) that elevated an otherwise traditional B2B service into an ultra-premium, cinematic, high-velocity digital showroom. 

The core power of this design does not lie in arbitrary decoration, but in **five underlying structural principles**:
1. **The Light/Dark Cadence (Bipolar Atmosphere):** Alternating between deep Obsidian Black (`#0B0F17`) for high-impact cinematic moments (3D global horizons, interactive scrollytelling, vehicle/pipeline stages, closing CTAs) and sterile Pure White (`#FFFFFF`) for high-density reading, quantitative data tables, accordion FAQs, and editorial feeds.
2. **Monumental Typographic Scale with Micro-Telemetry:** Extreme contrast between gargantuan geometric display headlines (72px–110px, tight tracking `-0.03em`, leading `0.95–1.0`) and ultra-dense, tracked-out monospace telemetry tags (11px–13px, `letter-spacing: 2px–3px`).
3. **Scrollytelling Pin-and-Scrub Geometry:** Pinned full-viewport (`100vh`) stages where vertical scrolling scrubs interactive 3D WebGL meshes, video playback, and horizontal translation of graphic elements in perfect synchronization.
4. **Sub-Pixel Dotted Matrix Glyphs & Halftone Texture:** Use of digital bitmap LED dot-matrix icons, halftone silhouette placeholders, and animated particle point-clouds to symbolize data points, network nodes, and computing precision.
5. **Interactive Density with Reactive Media Previews:** List components that invert contrast upon hover while dynamically swapping out adjacent rich media preview cards without page reload.

---

## 2. Design Tokens & Core Variable Architecture

The Renalytica Design System unifies the reverse-engineered architectural physics with Renalytica's approved chromatic matrix:

```css
:root {
  /* ==========================================================================
     COLOR TOKENS: THE CHROMATIC MATRIX
     ========================================================================== */
  /* Light Canvas (Pure Institutional Precision) */
  --canvas-light: #FFFFFF;
  --surface-light: #F8FAFC;
  --surface-tint: #F1F5F9;
  --border-light: #E2E8F0;
  --border-subtle: rgba(88, 100, 114, 0.12);
  --text-light-primary: #0F172A;
  --text-light-secondary: #475569;
  --text-light-tertiary: #64748B;
  --text-light-muted: #94A3B8;

  /* Dark Canvas (Obsidian Terminal & Cinematic Viewport) */
  --canvas-dark: #0B0F17;
  --canvas-dark-gradient: radial-gradient(circle at 50% 30%, #151D2A 0%, #0B0F17 80%, #070A10 100%);
  --surface-dark: #151D2A;
  --surface-dark-card: rgba(21, 29, 42, 0.75);
  --border-dark: rgba(255, 255, 255, 0.10);
  --border-dark-highlight: rgba(255, 255, 255, 0.22);
  --text-dark-primary: #F8FAFC;
  --text-dark-secondary: #94A3B8;
  --text-dark-muted: #586472;

  /* Brand Accents (Momentum & Energy) */
  --accent-momentum: #FF8000;
  --accent-momentum-hover: #EA7300;
  --accent-momentum-glow: rgba(255, 128, 0, 0.25);
  --accent-momentum-subtle: rgba(255, 128, 0, 0.08);

  /* Structure & Data Axes */
  --structure-slate: #586472;
  --structure-slate-rgb: 88, 100, 114;

  /* ==========================================================================
     TYPOGRAPHY TOKENS
     ========================================================================== */
  --font-primary: 'Montserrat', -apple-system, BlinkMacSystemFont, sans-serif;
  --font-mono: 'JetBrains Mono', SFMono-Regular, Menlo, Monaco, Consolas, monospace;

  /* Scale: Modular Scale 1.25 / 1.33 */
  --text-micro: 11px;
  --text-xs: 12px;
  --text-sm: 14px;
  --text-base: 16px;
  --text-md: 18px;
  --text-lg: 20px;
  --text-xl: 24px;
  --text-2xl: 32px;
  --text-3xl: 42px;
  --text-4xl: 56px;
  --text-mega: clamp(44px, 5.5vw, 104px);
  --text-watermark: clamp(80px, 12vw, 180px);

  /* Tracking (Letter Spacing) */
  --tracking-tightest: -0.04em;
  --tracking-tight: -0.02em;
  --tracking-normal: 0em;
  --tracking-wide: 0.08em;
  --tracking-telemetry: 0.18em;

  /* Line Heights */
  --leading-display: 0.95;
  --leading-headline: 1.15;
  --leading-snug: 1.3;
  --leading-body: 1.65;

  /* ==========================================================================
     SPATIAL & LAYOUT TOKENS
     ========================================================================== */
  --container-max: 1680px;
  --container-editorial: 1240px;
  --gutter-desktop: clamp(24px, 4.5vw, 80px);
  --grid-gap: 32px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-pill: 9999px;

  /* ==========================================================================
     ANIMATION & PHYSICS TOKENS
     ========================================================================== */
  --ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-elastic: cubic-bezier(0.34, 1.56, 0.64, 1);
  --duration-fast: 0.2s;
  --duration-base: 0.4s;
  --duration-slow: 0.8s;
  --duration-scrolly: 1.2s;
}
```

---

## 3. Reverse-Engineered Layout Constraints & Spatial Blueprint

```
┌─────────────────────────────────────────────────────────────────────────────┐
│ 1. TOP UTILITY TICKER (h: 36px | Mono 11px | Live Telemetry + Market Quotes)│
├─────────────────────────────────────────────────────────────────────────────┤
│ 2. GLOBAL STICKY NAV (h: 72px | Logo + Centered Vert/Horiz Nav + Pill CTA)  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 3. ASYMMETRIC HERO STAGE (min-h: 100vh | 55% Copy + 45% 3D Globe Viewport)   │
│   ┌─────────────────────────────────┐   ┌───────────────────────────────┐   │
│   │ [EYEBROW TELEMETRY TAG]         │   │                               │   │
│   │ MEGA DISPLAY HEADLINE           │   │      3D INTERACTIVE GLOBE     │   │
│   │ TWO-TONE WEIGHT (SOLID + GHOST) │   │    (WebGl Point Cloud + Arcs) │   │
│   │ Paragraph Subtitle (w: 480px)   │   │                               │   │
│   │ [SOLID PILL CTA] [GHOST PILL]   │   │                               │   │
│   └─────────────────────────────────┘   └───────────────────────────────┘   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 4. COLOR INVERSION BOUNDARY (Smooth CSS Interpolation: Dark -> Light)       │
├─────────────────────────────────────────────────────────────────────────────┤
│ 5. STATISTICAL PROOF STAGE (Split: Media Preview Left | Stats 2,500+ Right) │
├─────────────────────────────────────────────────────────────────────────────┤
│ 6. PINNED SCROLLY STAGE (100vh Pin | Horizontal Translation of Assets)      │
├─────────────────────────────────────────────────────────────────────────────┤
│ 7. BENTO GRID & SECTOR STRIPS (1px Hairline Dividers | Tabular Num 01-04)   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 8. DYNAMIC PREVIEW DATA ROWS (Hover on List -> Image/Video Swaps on Right)   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 9. ACCORDION FAQ STAGE (Number + Question + Expanding Answer + Toggle Dot)  │
├─────────────────────────────────────────────────────────────────────────────┤
│ 10. CLOSING RADAR CTA (Concentric Orbit Rings | Dark Canvas | Massive H2)   │
├─────────────────────────────────────────────────────────────────────────────┤
│ 11. MEGA FOOTER (Tab Selector + Multi-Col Meta + Particle Canvas Watermark) │
└─────────────────────────────────────────────────────────────────────────────┘
```

### 3.1 Layout Grid Formulas
* **Master Container:** `max-width: var(--container-max); margin-inline: auto; padding-inline: var(--gutter-desktop);`
* **Asymmetric 55/45 Hero Grid:**
  ```css
  .hero-grid {
    display: grid;
    grid-template-columns: 1.15fr 0.85fr;
    align-items: center;
    min-height: calc(100vh - 108px);
    gap: clamp(32px, 5vw, 80px);
  }
  ```
* **Bento Grid Architecture:**
  `display: grid; grid-template-columns: repeat(12, 1fr); gap: 1px; background: var(--border-light);` with cards utilizing `background: var(--canvas-light);` to form crisp 1px structural dividing lines without bulky borders.

---

## 4. Component Hierarchy & Atomic Specifications

### 4.1 Global Utility & Navigation
* **Top Utility Bar:** Full width, height `36px`, border-bottom `1px solid var(--border-dark)`. Monospace font (11px, weight 600, uppercase). Left side: Real-time news/ticker; Right side: Currency switcher (`USD | EUR | GBP | NGN`) and Knowledge Terminal portal link.
* **Global Navigation Bar:** Height `72px`, sticky with glassmorphism backdrop (`backdrop-filter: blur(20px); background: rgba(11, 15, 23, 0.8)` in dark mode, `rgba(255, 255, 255, 0.85)` in light mode).
  * **Brand Lockup:** Geometric logotype with precision apex letterforms.
  * **Pill Buttons:**
    * *Solid Pill:* `padding: 10px 24px; border-radius: 9999px; font-weight: 700; font-size: 13px; letter-spacing: 1px; text-transform: uppercase; background: #FF8000; color: #FFFFFF;`
    * *Ghost Pill:* Transparent with `1px solid currentColor`.
    * *Menu Toggle Pill:* Compact capsule with dot glyph (`.... MENU`).

### 4.2 Monumental Typography Lockups
* **Two-Tone Title Formula:**
  A hallmark of the benchmark design is stacking a ghosted/muted line on top of a solid line:
  ```html
  <h1 class="hero-display">
    <span class="text-ghost">DEMOCRATIZING</span><br>
    <span class="text-solid">DIRECTION.</span>
  </h1>
  ```
  * `.text-ghost`: Color `#586472` or `rgba(255, 255, 255, 0.45)`, font-weight 700.
  * `.text-solid`: Color `#FFFFFF` (dark) or `#0F172A` (light), font-weight 900.
* **Watermark Background Typography:**
  Massive background type (`140px–180px`) placed with `position: absolute; z-index: 0; pointer-events: none; opacity: 0.04;` creating institutional depth behind content sections (e.g. "SERVICES", "INDUSTRIES", "REPORTS").

### 4.3 Dotted Matrix Glyphs & Halftone Elements
* Custom SVG or CSS dot grids representing service categories (e.g., 5x5 or 7x7 LED dot matrix representations of agriculture sheaves, balance scales, warehouse racks, bar graphs).
* Team Carousel Silhouette State: Inactive team members rendered as cyan/slate dotted matrix halftone silhouettes that resolve into crisp photography on active slide focus.

### 4.4 3-Column Sector Strip Row
Used on Industry & Services overview pages:
* **Col 1 (Index & Action - 20%):** Monospace index `01`, brief subtitle, ghost pill CTA button.
* **Col 2 (Core Content & Bullets - 50%):** Bold uppercase title (32px), detailed narrative paragraph, `WHY CHOOSE US` eyebrow, and bullet list with dot-matrix bullets.
* **Col 3 (Media Preview - 30%):** Aspect ratio 16:10 video or photography with subtle zoom on card hover.

### 4.5 Dynamic Hover-Reactive Data Rows
Used on Insights, Case Studies, and Market Updates:
* Split layout: Left side contains category filters with counter badges; Center contains table rows (`DATE | TITLE | SECTOR TAG`).
* **Interaction:** When mouse hovers on any row, the row inverts (`background: #000; color: #fff`), and the Right Stage dynamically updates its image/video preview with an instant fade-cross transition (200ms).

### 4.6 Numbered Accordion FAQs
* Clean, 3-column accordion layout:
  * Left: Huge `F.A.Q` title + subtitle.
  * Center: Stacked numbered rows (`01`, `02`, `03` in monospace), bold question, expanding answer, with a right-aligned toggle dot (grey when closed, black when active).
  * Right: Dedicated contact hook ("Still have questions? EMAIL US").

### 4.7 Interactive Telemetry World Map & Form Selector
* Contact page features a vector dot-matrix world map with illuminated blue/orange glowing radar nodes representing regional desks (Melbourne, Auckland, Hong Kong, Lagos/West Africa, London).
* Form uses a 2-column radio pill selection grid where clicking toggles a large circular radio button.

### 4.8 Particle Point-Cloud Footer Watermark
* The bottom of the footer features an interactive HTML5 Canvas point-cloud particle logo that animates with mouse displacement and returns smoothly into the wordmark structure.

---

## 5. Scroll-Linked Animation Architecture & Physics

```
Scroll Scrub Timeline:
[0.00] Enter Stage: 3D Globe at Scale 0.8, Opacity 0.4
[0.25] Hero Pinned: Globe rotates to Regional Focus (APAC / Africa), Text at full opacity
[0.50] Scrub Progress: Hero Text translates Y -80px & fades, Globe zooms to orbital limb view
[0.75] Theme Inversion Trigger: Background shifts #0B0F17 -> #FFFFFF (duration 0.6s)
[1.00] Stage Unpinned: Enters Statistical Proof & Bento Grid on clean white canvas
```

### 5.1 GSAP ScrollTrigger Implementation Blueprint
All major cinematic transitions must be orchestrated using hardware-accelerated transforms (`translate3d`, `scale3d`, `opacity`):

```javascript
// Register GSAP ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Theme Color Inversion Trigger
ScrollTrigger.create({
  trigger: "#section-stats",
  start: "top 60%",
  end: "top 20%",
  onEnter: () => document.body.setAttribute("data-theme", "light"),
  onLeaveBack: () => document.body.setAttribute("data-theme", "dark"),
  scrub: 0.5
});

// 2. Hero 3D / Scrollytelling Pinned Sequence
const heroTl = gsap.timeline({
  scrollTrigger: {
    trigger: "#hero-stage",
    start: "top top",
    end: "+=150%",
    pin: true,
    scrub: 1,
    anticipatePin: 1
  }
});

heroTl
  .to(".hero-copy-group", { y: -100, opacity: 0, ease: "power2.inOut" }, 0)
  .to(".globe-canvas-container", { scale: 1.2, xPercent: -15, ease: "none" }, 0)
  .fromTo(".metric-stat-counter", { opacity: 0, y: 50 }, { opacity: 1, y: 0, stagger: 0.1 }, 0.5);

// 3. Horizontal Transport / Data Pipeline Scrub
gsap.to(".pipeline-scroller-track", {
  xPercent: -50,
  ease: "none",
  scrollTrigger: {
    trigger: "#pipeline-section",
    start: "top top",
    end: "+=200%",
    pin: true,
    scrub: 1
  }
});
```

---

## 6. Renalytica Website Page-by-Page Architectural Blueprint

Here is the exact architectural blueprint mapping the reverse-engineered design system directly into the 12 production pages planned for Renalytica:

| Page / Route | Theme State | Primary Cinematic Element | Structural Layout Archetype |
| :--- | :--- | :--- | :--- |
| **01. Home (`/`)** | **Obsidian -> White -> Obsidian** | 3D WebGL Economic Velocity Globe + Horizontal Data Pipeline Vehicle Scroller | Asymmetric 55/45 Hero -> Live Telemetry Ticker -> 2x2 Sector Cards -> 4-Column Report Shelf -> Video Testimonial -> Concentric Radar CTA |
| **02. About Us (`/about`)** | **White with Dark Terminal Accents** | Team Interactive Carousel with Dotted Silhouette placeholders resolving into photo portraits | Hero Mission Statement -> "TRUSTED BY" Marquee -> Origin Story Split -> Leadership Carousel (`01/20`) -> Ethical Independence Matrix |
| **03. Services (`/services`)** | **Obsidian -> White** | Full-Bleed Port/Satellite Cinematic Video Header with horizontal ticker marquee | Two-Tone Headline -> 4 Core Service Pillars (Horizontal 3-Column Strips) -> Software Platform Bento Grid (API + Terminal) |
| **04. Research Store (`/reports`)** | **Pure White Canvas** | Dynamic Multi-Tag Filter Engine with real-time hover media card preview | Left Sticky Category/Sector Facets -> Top Search Bar with Trending Chips -> 4-Card Responsive Grid with Excel/Forecast Badges |
| **05. Report Detail / PDP (`/reports/:slug`)** | **Pure White with Dark Data Insets** | Sticky Executive Video Briefing widget + 3D Table of Contents reader | Breadcrumb Bar -> Title + License Pricing Switcher (Single/Multi-User) -> Numbered Key Takeaways (`01`, `02`, `03`) -> Sample Data Table -> Buyer FAQs |
| **06. Methodology (`/methodology`)** | **Obsidian Deep Mode** | Animated Interactive Data Verification Flowchart (5-Stage Empirical Pipeline) | Hero Telemetry Tag -> Step Progression Cards with Dotted Texture Column (`01-05`) -> Primary Source Map -> Confidence Rating Widget |
| **07. Market Insights (`/insights`)** | **Pure White Canvas** | High-contrast Category Navigation + Hover-reactive table rows with dynamic media swap | Category Sidebar with Badge Counts -> Featured Article Hero Card -> Interactive Report Feed with Row Inversion on Hover |
| **08. Contact & RFP (`/contact`)** | **Pure White Canvas** | Interactive Regional Node Map (Vector with glowing radar pulses) | Left Team/Desk Portrait -> Center 2-Column Radio Pill Form Selector -> Right Multi-Office Directory (Lagos, London, Nairobi) |
| **09. Legal & FAQ (`/faq`)** | **Pure White Canvas** | Numbered Minimalist Accordion with toggle-dot indicators | Left Monumental `F.A.Q` Header -> Center Tabular Numbered List (`01–12`) -> Right Concierge Help Card |
| **10. Careers (`/careers`)** | **White -> Obsidian Inset** | Interactive Recruitment Process Cards with Dotted Texture Panels | "WHERE EXPERTISE MEETS AUTHENTICITY" Two-Tone Hero -> 4 Culture Pillars -> `HOW WE BRING PEOPLE ON BOARD` (`01-04`) -> Open Roles Accordion |
| **11. Blog & Newsroom (`/news`)** | **Pure White Canvas** | Asymmetric Editorial Grid with Timestamp Badges and Press Release Downloaders | News Category Tabs -> Two-Tone Header -> Top Feature Story -> 3-Column Editorial Grid -> Media Kit Drawer |
| **12. Community (`/community`)** | **Pure White -> Obsidian** | Dynamic Event Horizontal Photo Reel / Scroller (variable aspect ratio cards) | Headline Narrative -> 3 Core Meetup Pillars -> Horizontal Photo Wall -> Upcoming Roundtables List -> Host a Linkup Form |

---

## 7. Media & Visual Asset Strategy

Where and how rich media must be integrated across Renalytica:
1. **Interactive 3D WebGL Canvas (Hero):**
   - A rotating wireframe/point-cloud sphere with glowing data nodes representing key trade and agricultural centers.
   - Fallback: Pre-rendered MP4 looping video encoded in WebM/H.264 with an atmospheric radial glow overlay.
2. **Full-Bleed Aerial Drone & Operational Videos:**
   - 4K drone cinematography of modern container terminals, vast grain harvest silos, solar utility arrays, and high-frequency boardroom strategy sessions.
   - Embedded with subtle cinematic grade (slight blue/desaturated shadows, crisp highlights).
3. **Product & Report Mockups:**
   - Ultra-crisp vector and 3D mockups of Renalytica's printed reports, executive binders, and live desktop browser dashboards with glowing soft drop-shadows (`box-shadow: 0 25px 60px rgba(0,0,0,0.12);`).
4. **Editorial Portraits & Halftone Silhouettes:**
   - Studio lighting portraits on light grey/neutral studio background.
   - Halftone bitmap algorithms applied to upcoming or prospective team member profiles.
5. **Dotted LED Matrix Glyphs:**
   - Custom SVG icons constructed on a 16x16 or 24x24 grid of micro-circles (`r="1"`, spacing `3px`).

---

## 8. Verification & Architectural Guardrails

* **Zero Placeholder Rule:** All video widgets must feature working video streams or high-fidelity looped demo clips; all report items must have realistic mock covers, prices, and tags.
* **Accessibility (WCAG 2.1 AA):** High contrast verified: White text on `#0B0F17` has contrast ratio `18.5:1`; Dark text `#0F172A` on `#FFFFFF` has contrast ratio `16.8:1`; Momentum Orange `#FF8000` meets AA for large text and UI components.
* **Performance Benchmark:**
  - Fast first frame via CSS skeleton shimmer.
  - Video elements set to `preload="metadata"`, `muted`, `playsinline`, `loop`, with `IntersectionObserver` auto-pause when out of viewport.
  - 3D WebGL instances capped to 60fps with automatic DPR scaling down to `1.0` on mobile.
