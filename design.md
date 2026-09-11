# RENALYTICA MASTER DESIGN SYSTEM & TECHNICAL SPECIFICATION
**Document Version:** `2.0.0-PROD`  
**Foundation:** Reverse-Engineered from Benchmark Digital Telemetry Suites (15 Architectural Modules) & Renalytica Brand Guidelines v4.0 / Design Brief v2.0  
**Target Platform:** `www.renalytica.com` & Digital Research Storefront  
**Design Archetype:** The Precision Vanguard & Institutional Telemetry Showroom  

---

# SECTION 1: GLOBAL DESIGN SYSTEM

## 1.1 Architectural Philosophy: The High-Contrast SaaS Revolution
Renalytica's digital design system rejects the muddy, homogeneous dark themes common in legacy enterprise software. As mandated in the **Renalytica Design Brief v2**, it establishes a **High-Contrast B2B Visual System** characterized by:
* **The Bipolar Atmospheric Cadence:** Alternating deliberately between **Obsidian Black (`#0B0F17` / `#0A0A0A`)** for cinematic moments (3D global data horizons, pinned scrollytelling stages, pipeline engines, closing radar CTAs) and **Crisp White (`#FFFFFF`)** for high-density reading, quantitative data tables, accordion FAQs, and editorial feeds.
* **Monumental Typographic Scale with Micro-Telemetry:** Extreme contrast between gargantuan geometric display headlines (72px–110px, tight tracking `-0.03em`, leading `0.95–1.0`) and ultra-dense, tracked-out monospace telemetry tags (11px–13px, `letter-spacing: 0.18em`).
* **Sub-Pixel Dotted Matrix Glyphs & Halftone Texture:** Custom SVG digital bitmap LED dot-matrix icons, halftone silhouette placeholders, and animated particle point-clouds to symbolize data points, network nodes, and computing precision.
* **1px Hairline Bento Grid:** Surfaces structured using 1px hair-thin lines (`#E2E8F0` on light, `rgba(255, 255, 255, 0.10)` on dark) creating razor-sharp architectural cells without heavy bevels or drop shadows.
* **Interactive Density with Reactive Media Previews:** List components that invert contrast upon hover while dynamically swapping out adjacent rich media preview cards without page reload.

---

## 1.2 Color Architecture & Strict CSS Custom Properties
The color system fuses Renalytica’s approved chromatic identity from Brand Guidelines v4 with the high-velocity signals from Design Brief v2:

```css
:root {
  /* ==========================================================================
     COLOR TOKENS: THE CHROMATIC MATRIX
     ========================================================================== */
  
  /* Light Canvas (Pure Institutional Precision & High-Density Reading) */
  --canvas-light: #FFFFFF;
  --surface-light: #F8FAFC;
  --surface-light-card: #FFFFFF;
  --surface-tint: #F1F5F9;
  --surface-subtle-gray: #F4F4F5;
  --border-light: #E2E8F0;
  --border-light-subtle: rgba(88, 100, 114, 0.12);
  --text-light-primary: #0A0A0A;
  --text-light-secondary: #475569;
  --text-light-tertiary: #64748B;
  --text-light-muted: #94A3B8;

  /* Dark Canvas (Obsidian Terminal & Cinematic Viewport) */
  --canvas-dark: #0B0F17;
  --canvas-dark-stark: #0A0A0A;
  --canvas-dark-gradient: radial-gradient(circle at 50% 30%, #151D2A 0%, #0B0F17 80%, #070A10 100%);
  --surface-dark: #151D2A;
  --surface-dark-card: rgba(21, 29, 42, 0.75);
  --surface-dark-elevated: #1E293B;
  --border-dark: rgba(255, 255, 255, 0.10);
  --border-dark-highlight: rgba(255, 255, 255, 0.22);
  --text-dark-primary: #F8FAFC;
  --text-dark-secondary: #94A3B8;
  --text-dark-muted: #586472;

  /* Primary Momentum Orange (Presentation, Energy, High-Priority Action) */
  --accent-momentum: #FF5C00;              /* Brand Brief v2 Signal Orange */
  --accent-momentum-brand: #FF8000;        /* Brand Guidelines v4 Secondary */
  --accent-momentum-hover: #EA4C00;
  --accent-momentum-glow: rgba(255, 92, 0, 0.28);
  --accent-momentum-subtle: rgba(255, 92, 0, 0.08);

  /* Structural & Telemetry Axes */
  --structure-slate: #586472;
  --structure-slate-rgb: 88, 100, 114;
  --structure-midnight: #0F172A;

  /* Status & Signal Indicators */
  --signal-success: #10B981;
  --signal-warning: #F59E0B;
  --signal-error: #EF4444;
  --signal-info: #0284C7;
  --signal-pulse: rgba(16, 185, 129, 0.35);

  /* ==========================================================================
     TYPOGRAPHY TOKENS
     ========================================================================== */
  --font-primary: 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  --font-mono: 'JetBrains Mono', 'SFMono-Regular', Menlo, Monaco, Consolas, monospace;

  /* Font Weights */
  --font-weight-light: 300;
  --font-weight-regular: 400;
  --font-weight-medium: 500;
  --font-weight-semibold: 600;
  --font-weight-bold: 700;
  --font-weight-extrabold: 800;
  --font-weight-black: 900;

  /* Typographic Modular Scale (Fluid clamp values for responsive fidelity) */
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
  --text-mega: clamp(48px, 6vw, 104px);
  --text-watermark: clamp(80px, 12vw, 180px);

  /* Tracking & Letter Spacing */
  --tracking-tightest: -0.04em;
  --tracking-tight: -0.02em;
  --tracking-normal: 0em;
  --tracking-wide: 0.08em;
  --tracking-telemetry: 0.18em;

  /* Line Heights */
  --leading-display: 0.95;
  --leading-headline: 1.15;
  --leading-snug: 1.30;
  --leading-body: 1.65;

  /* ==========================================================================
     SPATIAL & LAYOUT TOKENS
     ========================================================================== */
  --container-max: 1680px;
  --container-editorial: 1240px;
  --container-narrow: 960px;
  --gutter-desktop: clamp(24px, 4.5vw, 80px);
  --gutter-mobile: 20px;
  
  --radius-xs: 2px;
  --radius-sm: 4px;
  --radius-md: 8px;
  --radius-lg: 16px;
  --radius-xl: 24px;
  --radius-pill: 9999px;

  /* Depth & Elevation */
  --shadow-subtle: 0 4px 12px rgba(0, 0, 0, 0.04);
  --shadow-card: 0 12px 32px rgba(0, 0, 0, 0.06);
  --shadow-elevation: 0 25px 60px rgba(0, 0, 0, 0.12);
  --shadow-glow: 0 0 40px var(--accent-momentum-glow);

  /* ==========================================================================
     ANIMATION & PHYSICS EASING CURVES
     ========================================================================== */
  --ease-cinematic: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-in-out: cubic-bezier(0.65, 0, 0.35, 1);
  --ease-elastic: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-sharp: cubic-bezier(0.25, 1, 0.5, 1);
  --ease-out-expo: cubic-bezier(0.19, 1, 0.22, 1);

  /* Duration Standards */
  --duration-fast: 150ms;
  --duration-base: 300ms;
  --duration-medium: 500ms;
  --duration-slow: 800ms;
  --duration-scrolly: 1200ms;
}
```

---

## 1.3 Layout Formats & Component Hierarchy Blueprint

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
│   │ TWO-TONE WEIGHT (SOLID + GHOST) │   │    (WebGL Point Cloud + Arcs) │   │
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

### 1.3.1 Two-Tone Typographic Lockup Formula
A foundational signature of the benchmark design is stacking a ghosted/muted line on top of a high-impact solid line:
```html
<h1 class="hero-display">
  <span class="text-ghost">DEMOCRATIZING</span><br>
  <span class="text-solid">DIRECTION.</span>
</h1>
```
* `.text-ghost`: Color `#586472` (on light) or `rgba(255, 255, 255, 0.45)` (on dark), font-weight 700.
* `.text-solid`: Color `#0A0A0A` (on light) or `#FFFFFF` (on dark), font-weight 900.

### 1.3.2 1px Hairline Bento Grid Rule
Rather than using bulky card borders, cards sit on a parent grid with a `1px` gap and a border color background:
```css
.bento-grid {
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 1px;
  background-color: var(--border-light);
  border: 1px solid var(--border-light);
  border-radius: var(--radius-lg);
  overflow: hidden;
}
.bento-card {
  background-color: var(--canvas-light);
  padding: clamp(24px, 3vw, 48px);
}
```

### 1.3.3 Button & Interactive Capsule Primitives
* **Primary Solid Pill:** `padding: 12px 28px; border-radius: var(--radius-pill); font-family: var(--font-mono); font-size: 13px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; background: var(--accent-momentum); color: #FFFFFF; transition: all var(--duration-fast) var(--ease-sharp);`
* **Ghost Pill:** `border: 1px solid currentColor; background: transparent; color: inherit;`
* **Menu Pill Capsule:** `display: inline-flex; align-items: center; gap: 8px; padding: 8px 18px; border-radius: var(--radius-pill); border: 1px solid var(--border-light); background: rgba(255, 255, 255, 0.8); backdrop-filter: blur(12px);`

---

# SECTION 2: PAGE-BY-PAGE ARCHITECTURE

Here is the exact structural architecture, section sequence, interactive component specs, and generated asset mapping for all 12 platform pages:

```
                      RENALYTICA 12-PAGE PLATFORM ARCHITECTURE
                      
  [01 HOME] ───► [02 ABOUT] ───► [03 SERVICES] ───► [04 REPORTS STORE] ───► [05 REPORT PDP]
     │              │                │                   │                      │
     ▼              ▼                ▼                   ▼                      ▼
  [06 METHOD] ──► [07 INSIGHTS] ─► [08 CONTACT] ───► [09 LEGAL/FAQ] ────► [10 CAREERS]
     │              │
     ▼              ▼
  [11 NEWSROOM] ─► [12 COMMUNITY]
```

---

## 2.1 Page 01: Home (`/`)
* **Atmospheric Cadence:** Obsidian Dark (`#0B0F17`) ➔ Pure White (`#FFFFFF`) ➔ Obsidian Dark (`#0B0F17`)
* **Reference Module:** `UX 1 Home Page Scrolly.webm` & `UX 15 Home Page Scrolly Twist.webm`
* **Content Source:** `Project Renalytica/Content/01_HOME_PAGE_CONTENT.md`

### Section & Component Breakdown
1. **Live Global Telemetry Ticker (Top Bar, 36px):**
   - Left: Running real-time macro indicators (`BRENT CRUDE: $82.40 ▲ 1.2% | FX NGN/USD: 1,480.50 ▼ 0.4% | CASHEW METRIC FOB: $1,240/MT ▲ 2.1% | SYSTEM LATENCY: 14MS`).
   - Right: Currency Switcher (`USD | EUR | GBP | NGN`) and Knowledge Terminal portal link.
2. **Global Sticky Navigation Bar (72px):**
   - Glassmorphic backdrop (`backdrop-filter: blur(20px)`).
   - Brand lockup: Horizontal white logo.
   - Central navigation links with active orange status dots.
   - Right action: Pill CTA ("REQUEST ACCESS") + Menu capsule trigger.
3. **Asymmetric 55/45 Hero Stage (`100vh` Pinned):**
   - Left 55%: Monospace telemetry eyebrow (`[SYS_INIT // AFRICAN ECONOMIC VELOCITY]`), Two-Tone Headline (`DEMOCRATIZING` in ghost slate, `DIRECTION.` in solid white), 480px paragraph narrative, Dual Pill CTAs (`EXPLORE INTELLIGENCE` & `VIEW METHODOLOGY`).
   - Right 45%: Interactive 3D WebGL Economic Velocity Globe (particle point-cloud with rotating orbital trade arcs between West Africa, Europe, Asia, and the Americas).
4. **Color Inversion Boundary (Scroll-Linked Transition):**
   - GSAP ScrollTrigger interpolates canvas background from `#0B0F17` to `#FFFFFF` over 600ms as user scrolls into the quantitative proof stage.
5. **Statistical Proof Stage (Split 40/60):**
   - Left 40%: Media card preview with looping operational clip.
   - Right 60%: 4 Monumental Metrics (`2,500+` Primary Data Sources, `54` African Economies Tracked, `99.4%` Empirical Verification Rate, `15,000+` Citations).
6. **Pinned Horizontal Data Pipeline Scroller (Pin `100vh`, scrub: 1):**
   - Pinned viewport where vertical scroll translates horizontal data cards: `01 Ground Sensor Ingestion` ➔ `02 Cryptographic Verification` ➔ `03 Econometric Modeling` ➔ `04 Executive Dissemination`.
7. **2x2 Sector Cards Bento Grid:**
   - 1px hairline rule architecture showcasing Macroeconomics, Agriculture & Commodities, Energy Transition, Logistics & Supply Chains.
8. **Curated Research Shelf (4-Column Grid):**
   - High-contrast product cards with Excel dataset badges, publication timestamps, and instant quick-look triggers.
9. **Full-Bleed Video Testimonial Stage:**
   - Cinematic full-width video container with centered executive quote and ambient play controls.
10. **Closing Concentric Radar CTA:**
    - Dark canvas return with animated concentric SVG radar rings and high-energy `#FF5C00` button.
11. **Mega Footer:**
    - Interactive HTML5 Canvas particle point-cloud logo watermark that reacts to mouse physics.

### Assets Mapped
* `brand_assets/renalytica_logo_horizontal_white.png` (Sticky Nav)
* `brand_assets/renalytica_emblem.png` (Pill triggers & Favicon)
* `renalytica_brand_launch.mp4` (Full-bleed testimonial video stage)
* `digital_mockup.png` (Data terminal preview in Bento)
* WebGL 3D Globe Shaders (Procedural canvas)

---

## 2.2 Page 02: About Us (`/about`)
* **Atmospheric Cadence:** Crisp White (`#FFFFFF`) with Obsidian Terminal Accents
* **Reference Module:** `UX 12 About Us Straight.webm` & `UX 13 About Us Twist.webm`
* **Content Source:** `Project Renalytica/Content/02_ABOUT_US_CONTENT.md`

### Section & Component Breakdown
1. **Hero Mission Statement:**
   - Giant Two-Tone typography: `GROUND TRUTH` in slate ghost, `IN AN ERA OF SYNTHETIC NOISE` in stark black.
   - Telemetry stamp: `FOUNDED 2026 // LAGOS & LONDON`.
2. **"TRUSTED BY" Dynamic Velocity Marquee:**
   - Continuous infinite marquee of institutional partners, sovereign funds, commercial banks, and multinational logistics operators.
3. **Origin & The Epistemological Divide (Split Layout):**
   - Left: The founding mandate (challenging desk-bound Western estimates with raw ground truth).
   - Right: Interactive archival slider showing satellite imagery cross-referenced against on-the-ground customs manifests.
4. **Interactive Leadership & Analyst Carousel (`01 / 20`):**
   - Team carousel featuring Halftone Dot-Matrix silhouette placeholders for inactive cards that resolve into crisp high-definition photography on active focus.
   - Interactive bio drawer with analyst specialization tags and published reports list.
5. **The Renalytica Independence Matrix:**
   - 3-column structural comparison demonstrating 100% proprietary funding, zero vendor conflicts, and blind peer auditing.
6. **Global Desks Bento Grid:**
   - Hairline cards for London HQ, Lagos Operations Terminal, Nairobi East Africa Desk, and Johannesburg Southern Hub.

### Assets Mapped
* `brand_assets/stationery_mockup.png` (Corporate governance section)
* `brand_assets/emblem_variations_grid.png` (Brand evolution section)
* `Brand_Guidelines_Pages/Page_01.png` to `Page_06.png` (Philosophy graphics)
* Halftone SVG dot-matrix filter shaders

---

## 2.3 Page 03: Services (`/services`)
* **Atmospheric Cadence:** Obsidian Dark Header ➔ Pure White Body
* **Reference Module:** `UX 11 Our Services.webm`
* **Content Source:** `Project Renalytica/Content/03_SERVICES_CONTENT.md`

### Section & Component Breakdown
1. **Cinematic Hero Header:**
   - Full-bleed looping port/logistics drone b-roll with dark radial gradient overlay.
   - Monospace telemetry tag: `[SYS_CAPABILITIES // CROSS-SECTOR ANALYTICS]`.
   - Massive two-tone headline: `PRECISION DATA.` `DECISIVE DIRECTION.`
2. **4 Core Service Pillars (3-Column Sector Strip Layout):**
   - **Pillar 01: Macroeconomic Intelligence & Country Risk:**
     - Col 1: Index `01`, sub-title, Ghost Pill `EXPLORE RISK MODELS`.
     - Col 2: In-depth narrative, "KEY CAPABILITIES" bullet list with SVG dot-matrix glyphs.
     - Col 3: Video/interactive chart preview showing foreign exchange liquidity modeling.
   - **Pillar 02: Supply Chain & Logistics Analytics:**
     - Port dwell time tracking, freight corridor bottlenecks, customs clearance telemetry.
   - **Pillar 03: Agritech & Commodity Forecasting:**
     - Yield projection algorithms, weather anomaly impact, farm-gate price indices.
   - **Pillar 04: Energy Transition & Mineral Intelligence:**
     - Off-grid solar deployment, critical battery minerals, grid reliability indices.
3. **The Software Delivery Platform Bento:**
   - Hairline bento showcasing Renalytica Terminal (Web UI), Developer API (REST/GraphQL), and Custom Executive Advisory.
4. **Engagement Scope & SLA Matrix:**
   - Tabular comparison of Ad-hoc Briefings vs Annual Enterprise Retainers.

### Assets Mapped
* `brand_assets/digital_mockup.png` (Terminal platform bento)
* Video b-roll (Port crane telemetry, drone farm surveys)
* SVG Dot-Matrix service glyphs

---

## 2.4 Page 04: Research Store Catalog (`/reports`)
* **Atmospheric Cadence:** Crisp White (`#FFFFFF`) with High-Contrast `#0A0A0A` Accents
* **Reference Module:** `UX 7 Report Overview.webm` & `UX 14 Report Brief.webm`
* **Content Source:** `Project Renalytica/Content/04_REPORTS_STORE_CATALOG.md`

### Section & Component Breakdown
1. **Catalog Control Center (Header & Sticky Filter Bar):**
   - Real-time catalog counter (`DISPLAYING 48 VERIFIED INTELLIGENCE PACKAGES`).
   - Top predictive search bar with trending topic pills (`#LithiumCorridors`, `#FXLiquidity`, `#CocoaYields2026`).
2. **Faceted Filter Sidebar (Left Column, Sticky):**
   - Sector Accordion (Macro, Agriculture, Energy, Logistics).
   - Geographic Coverage (Continental, West Africa, East Africa, Single Country).
   - License Tier (Single Reader, Departmental, Global Enterprise).
   - Dataset Inclusions (Checkbox: "Includes Raw Excel Model").
3. **4-Column Responsive Intelligence Grid:**
   - Report Cards featuring:
     - Aspect ratio 4:3 3D book cover render with soft drop-shadow.
     - Live badges: `NEW RELEASE`, `EXCEL INCLUDED`, `Q3 2026 EDITION`.
     - Monospace metadata: Page count, file format, price in active currency.
     - Hover interaction: Subtle 3D tilt + quick-look eye trigger.
4. **Quick-Look Modal Overlay:**
   - Instant drawer preview without page navigation: Executive summary snippet, full Table of Contents, sample data table extract, instant "ADD TO BRIEFCASE" action.
5. **Floating Briefcase / Cart Drawer:**
   - Slide-out shopping cart supporting multi-currency conversion, invoice request, and direct credit card/wire checkout.

### Assets Mapped
* 3D Report Binder Renders (Pre-rendered book covers)
* `brand_assets/renalytica_logo_horizontal.png` (Watermarked sample extracts)
* Data badge SVG icons (XLSX, PDF, CSV, API)

---

## 2.5 Page 05: Sample Report Detail / PDP (`/reports/:slug`)
* **Atmospheric Cadence:** Pure White (`#FFFFFF`) with Dark Slate Data Insets
* **Reference Module:** `UX 14 Report Brief.webm`
* **Content Source:** `Project Renalytica/Content/05_SAMPLE_REPORT_PDP_CONTENT.md`

### Section & Component Breakdown
1. **Breadcrumb Bar & Executive Overview Header:**
   - Breadcrumbs: `HOME / REPORTS / ENERGY / SUB-SAHARAN SOLAR & OFF-GRID STORAGE 2026`.
   - Title: Sub-Saharan Solar & Off-Grid Storage Outlook 2026–2030.
   - Lead author telemetry pill: `LEAD ANALYST: DR. K. ADEBAYO // SENIOR ENERGY FELLOW`.
2. **Split Purchase & Binder Showcase Hero:**
   - Left 50%: Interactive 3D Report Binder with click-to-flip sample page viewer.
   - Right 50%: License Tier Selector (Single User $1,850 | Corporate $4,500 | Enterprise $9,200) with instant multi-currency toggle and primary action button (`DOWNLOAD EXECUTIVE BRIEF // BUY FULL REPORT`).
3. **Executive Key Findings Numbered Strip:**
   - Horizontal cards with monumental indices `01`, `02`, `03` highlighting the 3 primary quantitative conclusions of the report.
4. **Interactive Sample Data Table:**
   - Sortable table showing 5 rows of actual sanitized data from the included model with a blurred overlay prompting purchase for full 5,000-row access.
5. **Sticky Executive Video Briefing Drawer:**
   - Compact 2-minute video overview from the lead author embedded in a floating expandable bottom-right card.
6. **Full Table of Contents Accordion:**
   - Numbered chapters (`1.0 Executive Summary`, `2.0 Tariff Disruption`, `3.0 Supply Chain Fragility`, etc.) with sub-bullet page references.
7. **Related Research Intelligence Shelf:**
   - 3-card cross-sell grid linking adjacent sector reports.

### Assets Mapped
* Sample PDF preview pages
* 3D Binder render with realistic page curl
* Lead analyst photo portrait

---

## 2.6 Page 06: Research Methodology (`/methodology`)
* **Atmospheric Cadence:** Deep Obsidian (`#0B0F17`) Terminal Mode
* **Reference Module:** `UX 10 Industries.webm` (Data Pipeline Sequence)
* **Content Source:** `Project Renalytica/Content/06_METHODOLOGY_CONTENT.md`

### Section & Component Breakdown
1. **Hero Terminal Eyebrow & Display Title:**
   - Eyebrow: `[RIGOR_STANDARDS // EMPIRICAL VALIDATION ENGINE]`.
   - Display: `TRUTH BEFORE CONSENSUS.` `DATA BEFORE DOCTRINE.`
2. **5-Stage Interactive Verification Flowchart:**
   - SVG interactive data pipeline with animated glowing packet pulses moving between nodes:
     - **Stage 01: Raw Sensor & Multi-Source Harvest** (Ground survey collectors, port IoT sensors, satellite radar).
     - **Stage 02: Cryptographic Timestamping & Ingestion** (Data immutable logging to prevent retroactive tampering).
     - **Stage 03: Algorithmic Triangulation & Cross-Checking** (Discarding outliers, cross-referencing customs vs export manifests).
     - **Stage 04: Blind Peer Review Panel** (Senior sector economists blind-auditing regression parameters).
     - **Stage 05: Confidence Index Scoring** (Final report tagged with algorithmic reliability score: `AAA`, `AA`, `A`).
3. **The Confidence Rating Widget:**
   - Interactive slider allowing users to inspect what data conditions trigger downgrades in data confidence.
4. **Primary Ground Footprint Map:**
   - Dark vector map showing 42 ground verification hubs across Africa.

### Assets Mapped
* Interactive SVG flowchart pipeline with GSAP motion paths
* Vector Africa sensor map with pulsing radar nodes

---

## 2.7 Page 07: Market Insights (`/insights`)
* **Atmospheric Cadence:** Crisp White Canvas (`#FFFFFF`)
* **Reference Module:** `UX 3 Insights.webm`, `UX 4 Featured.webm`, & `UX 6 Market Updates.webm`
* **Content Source:** `Project Renalytica/Content/07_MARKET_INSIGHTS_CONTENT.md`

### Section & Component Breakdown
1. **Asymmetric Featured Editorial Hero (60/40 Split):**
   - Left 60%: High-impact editorial photography with high-contrast text overlay and category badge (`MACRO INTELLIGENCE`).
   - Right 40%: Key takeaway summary, publication timestamp, read time (6 min), and direct reading CTA.
2. **Category Navigation Bar with Quantitative Badges:**
   - Horizontal tab bar: `ALL (142)`, `MACRO (48)`, `COMMODITIES (36)`, `ENERGY (28)`, `POLICY (30)`.
3. **Dynamic Hover-Reactive Data Rows:**
   - The signature benchmark interaction: Left/Center contains tabular article rows (`DATE | TITLE | AUTHOR | SECTOR`).
   - **Interaction:** Hovering over any row inverts its background to `#0A0A0A` with white text, while the sticky right preview card instantly cross-fades into the corresponding article's diagram/photo without page reload.
4. **Weekly Executive Dispatch Newsletter Capsule:**
   - Minimalist form with monospace input field and orange pill submit action.

### Assets Mapped
* Editorial high-contrast photography
* SVG category icons

---

## 2.8 Page 08: Contact & RFP (`/contact`)
* **Atmospheric Cadence:** Crisp White Canvas with Slate Dividers
* **Reference Module:** `UX 8 Contact.webm`
* **Content Source:** `Project Renalytica/Content/08_CONTACT_AND_RFP_CONTENT.md`

### Section & Component Breakdown
1. **Hero Header & Interactive Regional Node Map:**
   - Two-Tone Header: `DIRECT ENGAGEMENT.` `INSTITUTIONAL ACCESS.`
   - Interactive vector world map displaying illuminated glowing radar rings over London, Lagos, Nairobi, and Johannesburg. Clicking a node centers the office details.
2. **Interactive 2-Column Radio Pill RFP Form:**
   - Step 1: Engagement Type (`Custom Research Brief`, `Enterprise Data License`, `Keynote Advisory`, `Media Inquiries`).
   - Step 2: Target Sector (`Macroeconomics`, `Agriculture`, `Energy`, `Logistics`).
   - Step 3: Project Budget & Timeline radio pills.
   - Step 4: Contact credentials & file attachment dropzone.
3. **Direct Desk Telephone & PGP Directory:**
   - Multi-desk cards with direct telephone lines, encrypted PGP fingerprint keys, and verified SLA response guarantees (`AVERAGE RESPONSE: < 47 MINUTES`).

### Assets Mapped
* Vector world map with geo-node coordinates
* Desk lead photo avatars

---

## 2.9 Page 09: Legal, Compliance & FAQ (`/faq` / `/legal`)
* **Atmospheric Cadence:** Pure White Canvas (`#FFFFFF`)
* **Reference Module:** `UX 12 About Us Straight.webm` (FAQ Module)
* **Content Source:** `Project Renalytica/Content/09_LEGAL_AND_FAQ_CONTENT.md`

### Section & Component Breakdown
1. **Monumental FAQ Display Header:**
   - Giant Two-Tone typography: `CLEAR ANSWERS.` `UNCOMPROMISING COMPLIANCE.`
2. **Category Switcher Tabs:**
   - `REPORT LICENSING`, `DATA ACCURACY & LIABILITY`, `PAYMENT & TAXATION`, `PRIVACY & GDPR/NDPR`.
3. **3-Column Numbered Accordion FAQ:**
   - Left: Category anchor indicator.
   - Center: Numbered stacked rows (`01`, `02`, `03` in monospace), bold question, expanding answer container, right-aligned toggle dot (grey when closed, solid black when active).
   - Right: "Still have questions?" Concierge Help Card with direct email trigger.
4. **Compliance & Data Privacy Shield:**
   - Cards verifying adherence to ISO/IEC 27001 standards, GDPR (EU), and NDPR (Nigeria Data Protection Regulation).

---

## 2.10 Page 10: Careers & Fellows (`/careers`)
* **Atmospheric Cadence:** Crisp White ➔ Obsidian Inset
* **Reference Module:** `UX 2 Careeers Join Our Team.webm`
* **Content Source:** `Project Renalytica/Content/10_CAREERS_WORK_WITH_US_CONTENT.md`

### Section & Component Breakdown
1. **Hero Mission Statement:**
   - Display: `WHERE INTELLECTUAL HONESTY REIGNS.`
   - Subtitle: "We do not hire consensus-seekers. We hire empirical investigators who follow data wherever it leads."
2. **4 Culture Pillars Bento Grid:**
   - Radical Candor, Ground Truth Primacy, Zero Desk Assumptions, Total Intellectual Ownership.
3. **4-Stage Hiring Protocol Strip:**
   - Dotted texture panels displaying: `01 Quantitative Diagnostic` ➔ `02 Empirical Case Defense` ➔ `03 Peer Cross-Examination` ➔ `04 Partner Offer`.
4. **Filterable Open Positions Accordion:**
   - Department filters (`Econometrics`, `Field Intelligence`, `Frontend Engineering`, `Client Solutions`).
   - Expandable role cards with salary bands, equity ranges, and instant application modal.

---

## 2.11 Page 11: Newsroom & Media (`/news`)
* **Atmospheric Cadence:** Pure White Canvas
* **Reference Module:** `UX 6 Market Updates.webm` & `UX 4 Featured.webm`
* **Content Source:** `Project Renalytica/Content/11_BLOG_AND_NEWS_CONTENT.md`

### Section & Component Breakdown
1. **Breaking News Ticker & Primary Release:**
   - Monospace live timestamp (`FOR IMMEDIATE RELEASE // 04 SEPTEMBER 2026`).
   - Lead story card with downloadable press kit PDF.
2. **Filterable Press Archive:**
   - 3-column editorial grid for corporate announcements, report launch releases, and executive media appearances.
3. **Official Brand Asset & Media Kit Download Center:**
   - Horizontal card with one-click download of logos, executive headshots, and brand guidelines in vector format.

### Assets Mapped
* `brand_assets/renalytica_logo_horizontal.png` & `renalytica_logo_stacked.png`
* Media kit ZIP packaging

---

## 2.12 Page 12: Community & Exchange (`/community`)
* **Atmospheric Cadence:** Pure White ➔ Deep Obsidian
* **Reference Module:** `UX 9 Community.webm`
* **Content Source:** `Project Renalytica/Content/12_COMMUNITY_PAGE_CONTENT.md`

### Section & Component Breakdown
1. **Hero Narrative:**
   - `THE RENALYTICA FELLOWSHIP.` `WHERE AFRICA'S TOP ECONOMIC MINDS CONVENE.`
2. **3 Core Community Pillars:**
   - Chatham House Rule Roundtables, Closed-Door Macro Briefings, Academic Guild & University Fellowships.
3. **Variable Aspect-Ratio Horizontal Photo Scroller:**
   - Infinite horizontal photo reel capturing past private roundtables in London, Lagos, and Kigali.
4. **Upcoming Roundtable Calendar & RSVP Gate:**
   - Calendar list with verified accreditation requirements.

---

# SECTION 3: STEP-BY-STEP TECHNICAL IMPLEMENTATION PLAN

Here is the exact technical roadmap detailing the execution order for building the master shell, layout files, integrations, and individual pages:

```
                                IMPLEMENTATION ROADMAP
                                
  ┌────────────────────────┐       ┌────────────────────────┐       ┌────────────────────────┐
  │ PHASE 1: SCAFFOLDING   │ ────► │ PHASE 2: MOTION CORE   │ ────► │ PHASE 3: MASTER SHELL  │
  │ • Next.js 14 / Vite    │       │ • GSAP & ScrollTrigger │       │ • Top Telemetry Bar    │
  │ • CSS Design Tokens    │       │ • Lenis Smooth Scroll  │       │ • Sticky Glass Nav     │
  │ • Typography Engine    │       │ • Three.js 3D Globe    │       │ • Point-Cloud Footer   │
  └────────────────────────┘       └────────────────────────┘       └────────────────────────┘
               │                                                                 │
               ▼                                                                 ▼
  ┌────────────────────────┐       ┌────────────────────────┐       ┌────────────────────────┐
  │ PHASE 6: E-COMMERCE    │ ◄──── │ PHASE 5: 12-PAGE BUILD │ ◄──── │ PHASE 4: ATOMIC SUITE  │
  │ • Zustand Cart Store   │       │ • Home -> PDP Sequence │       │ • Hairline Bento Grid  │
  │ • Multi-Currency Engine│       │ • Scrollytelling Pinned│       │ • 3-Col Sector Strips  │
  │ • Download Generator   │       │ • Dynamic Hover Rows   │       │ • Numbered Accordions  │
  └────────────────────────┘       └────────────────────────┘       └────────────────────────┘
               │
               ▼
  ┌────────────────────────┐
  │ PHASE 7: POLISH & PROD │
  │ • 60fps WebGL Cap      │
  │ • WCAG AA Verification │
  │ • SEO / OpenGraph JSON │
  └────────────────────────┘
```

---

## Phase 1: Project Scaffolding & Design Foundation
* **Objective:** Establish the clean, production-grade frontend environment and encode the full CSS token dictionary.
* **Steps:**
  1. **Framework Initialization:** Set up standard web application environment with zero bloat.
  2. **Token Compilation:** Author `styles/tokens.css` with all color variables, typography scales, fluid clamp formulas, spatial dimensions, and cubic-bezier easing curves.
  3. **Typography Loading:** Configure Google Fonts imports for `Montserrat` (weights: 300, 400, 500, 600, 700, 800, 900) and `JetBrains Mono` (weights: 400, 500, 700) with `font-display: swap`.
  4. **Base Reset & Utility Rules:** Create `styles/globals.css` with CSS custom resets, hairline 1px grid layout rules, two-tone text helpers (`.text-ghost`, `.text-solid`), and accessibility focus rings.

---

## Phase 2: Global Motion & Scrollytelling Engine
* **Objective:** Build the high-performance animation framework that drives the cinematic pin-and-scrub physics.
* **Steps:**
  1. **Smooth Scrolling Core:** Integrate Lenis smooth scrolling with delta normalization for 60fps momentum scroll.
  2. **GSAP & ScrollTrigger Pipeline:** Initialize GSAP with hardware-accelerated transforms (`translate3d`, `scale3d`, `opacity`).
  3. **Theme Inversion Controller:** Create an intersection-based theme switcher that flips the root attribute `data-theme="dark"` / `data-theme="light"` dynamically as user crosses section boundaries.
  4. **Interactive 3D WebGL Globe:** Code the Three.js point-cloud sphere with rotating particle nodes, trade flight arcs, and mouse-drag rotation controls.

---

## Phase 3: Master Shell & Global Layout
* **Objective:** Code the persistent navigational shell and interactive footer.
* **Steps:**
  1. **Top Telemetry Ticker Component (`TickerBar`):** Build the 36px monospace bar with live fluctuating commodity prices, currency switcher, and knowledge terminal links.
  2. **Sticky Precision Navigation (`HeaderNav`):** Build the 72px glassmorphic nav bar with responsive desktop links, active orange indicator dots, and pill CTA triggers.
  3. **Full-Screen Mobile Navigation Overlay (`MobileNavDrawer`):** Construct the slide-out navigation menu with animated staggered link reveals.
  4. **Mega Footer with Point-Cloud Canvas (`MegaFooter`):** Build the multi-column footer with regional desk selectors, copyright compliance metadata, and an interactive HTML5 Canvas point-cloud particle logo that reacts to cursor proximity.

---

## Phase 4: Reusable Component Suite Development
* **Objective:** Build the core architectural components extracted from the benchmark videos.
* **Steps:**
  1. **Hairline Bento Grid (`BentoGrid`):** 12-column CSS grid with 1px border gap architecture.
  2. **3-Column Sector Strip (`SectorStripRow`):** Monospace index `01`, detailed narrative with bullet list, and right-aligned media preview card with hover zoom.
  3. **Dynamic Hover-Reactive Data Rows (`HoverDataRowTable`):** Table rows that invert background to black on mouse hover and swap the adjacent media card instantly.
  4. **Numbered Accordion FAQ (`NumberedAccordion`):** Stacked numbered accordion rows with smooth height expansion and animated toggle dot glyphs.
  5. **Team Halftone Carousel (`TeamCarousel`):** Carousel component featuring dot-matrix halftone silhouettes that transition into high-res photos on active slide focus.
  6. **Interactive Vector Node Map (`RegionalNodeMap`):** SVG map with pulsing animated radar waves over key African and international economic centers.

---

## Phase 5: Page-by-Page Construction Order
Pages will be built in the exact sequential order that respects architectural dependencies and user conversion priority:
* **Sprint 5.1: Home Page (`/`)**
  - Implement Asymmetric 55/45 Hero Stage with WebGL 3D Globe.
  - Implement Statistical Proof counter bar with count-up animations.
  - Implement Pinned 100vh horizontal data pipeline scroller.
  - Implement Sector Bento Grid, Curated Report Shelf, Full-Bleed Video Testimonial, and Concentric Radar Closing CTA.
* **Sprint 5.2: About Us (`/about`)**
  - Mission statement, partner velocity marquee, origin split view, team halftone carousel, independence matrix.
* **Sprint 5.3: Services (`/services`)**
  - Cinematic drone port header, 4 Sector Strip pillars, software platform bento, SLA matrix.
* **Sprint 5.4: Reports Catalog & Sample PDP (`/reports` & `/reports/:slug`)**
  - Faceted filter engine, search with trending tags, 4-column report shelf, quick-look modal.
  - PDP: 3D report binder showcase, license switcher, key takeaways strip, sample data table.
* **Sprint 5.5: Research Methodology (`/methodology`)**
  - 5-stage interactive SVG verification flowchart, confidence index rating widget, primary ground sensor map.
* **Sprint 5.6: Market Insights (`/insights`)**
  - Featured editorial hero, category navigation tabs, hover-reactive data rows, newsletter dispatch capsule.
* **Sprint 5.7: Contact & RFP (`/contact`)**
  - Regional node map, 2-column radio pill RFP form, direct desk directory.
* **Sprint 5.8: Supporting Pages Suite (`/faq`, `/careers`, `/news`, `/community`)**
  - Build out remaining 4 pages using established atomic primitives.

---

## Phase 6: E-Commerce Storefront & State Management
* **Objective:** Power the digital research storefront with live commercial capabilities.
* **Steps:**
  1. **Cart & Currency Store:** Lightweight client state management storing active currency (`USD`, `EUR`, `GBP`, `NGN`), selected license tier, and items in briefcase.
  2. **Checkout & Licensing Modal:** Multi-step modal for instantaneous digital delivery, corporate invoicing, and credit card processing.
  3. **Automated Sample Watermarking:** Delivery logic for watermarked PDF executive briefs and sanitized XLSX data model extracts.

---

## Phase 7: Optimization, Performance & Production Verification
* **Objective:** Ensure maximum speed, zero layout shifts, full accessibility, and search engine dominance.
* **Steps:**
  1. **Performance Tuning:** WebGL frame throttling when out of viewport, video lazy-loading with `IntersectionObserver`, sub-pixel rendering optimizations.
  2. **Accessibility Audit:** Verify WCAG 2.1 AA compliance across all high-contrast modes. Ensure all interactive elements have visible focus rings and ARIA attributes.
  3. **SEO & Structured Data:** Generate OpenGraph social share cards and JSON-LD structured schemas for all reports, research articles, and corporate organizational data.
