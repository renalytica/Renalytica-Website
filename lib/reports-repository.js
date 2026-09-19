/**
 * ============================================================================
 * RENALYTICA MASTER REPORTS STORE REPOSITORY (lib/reports-repository.js)
 * ============================================================================
 * Canonical data store, search indexing, and query engine for all institutional
 * market research reports, economic forecasts, and industry telemetry suites
 * published across the Renalytica platform.
 *
 * Includes:
 * 1. 10 Flagship & Production Publications across Key Economic Corridors
 * 2. Real Client Publications with downloadable PDF attachments
 * 3. Granular 3-Tier License Pricing (Single, Departmental, Global Enterprise)
 * 4. Executive Macro Metrics Tables & 10-Chapter Tables of Contents
 * 5. Integrated Cart / Briefcase Management with LocalStorage Sync
 *
 * Version: 2.0.0 (Institutional Commercial Suite)
 * ============================================================================
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const repoInstance = factory();
    root.ReportsRepository = repoInstance;
    root.RenalyticaReports = repoInstance;
    if (typeof window !== 'undefined') {
      window.ReportsRepository = repoInstance;
      window.RenalyticaReports = repoInstance;
    }
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  // Master Catalog Data Store (10 Flagship & Production Reports)
  const masterReports = {
    "african-grains-oilseeds-2026": {
      id: "african-grains-oilseeds-2026",
      sku: "REN-AG-2026-081",
      slug: "sub-saharan-africa-commercial-grains-oilseeds-2026-2032",
      title: "Sub-Saharan Africa Commercial Grains & Oilseeds Outlook: Production Economics, Input Inflation, and Cross-Border Trade Corridors (2026–2032)",
      shortTitle: "SSA Commercial Grains & Oilseeds Outlook (2026–2032)",
      sector: "agriculture",
      sectorLabel: "Agriculture & Agribusiness",
      subSector: "Cereal Grains & Oilseeds",
      categoryBadge: "AGRICULTURE & FARMING // COMMODITY INTELLIGENCE DESK",
      statusPill: "UPDATED FOR Q3 2026 // 14 COUNTRIES // 10-YEAR FORECAST",
      isFlagship: true,
      isFeatured: true,
      pubDate: "August 21, 2026",
      pubHorizon: "q3_2026",
      pageCount: 384,
      vectorChartsCount: 112,
      tablesCount: 84,
      mapsCount: 18,
      formats: ["PDF", "XLSX", "PPTX"],
      formatType: "complete_suite",
      coverImage: "assets/images/industrial_grain_silos.jpg",
      samplePdfUrl: "assets/reports/Renalytica_Economics_AI_Adoption_2026.pdf", // preview link
      fullPdfUrl: "assets/reports/Renalytica_Economics_AI_Adoption_2026.pdf",
      geography: "Sub-Saharan Africa (14 Countries: Nigeria, South Africa, Tanzania, Kenya, Uganda, Ghana, Zambia, Côte d'Ivoire, Senegal, Ethiopia, Mozambique, Cameroon, Angola, Rwanda)",
      regionCode: "sub_saharan_africa",
      primaryCountries: ["Nigeria", "Kenya", "Tanzania", "Ghana", "South Africa", "Zambia"],
      
      keyTelemetry: {
        cagr: "+11.8%",
        marketSize: "$18.4B by 2032",
        baseline2025: "$8.24B",
        highlightMetric: "28.4% Silo Project IRR",
        summaryCallout: "11.8% Projected CAGR (2026–2032) // $18.4B Addressable Grain Market"
      },
      
      teaser: "Exhaustive quantitative assessment of maize, wheat, and soybean production corridors. Features yield sensitivity models under varied fertilizer price scenarios, cold storage infrastructure deficits, and private equity investment benchmarks across West and East Africa.",
      executiveSummary: "A comprehensive, empirical investigation into commercial maize, wheat, and soybean production, processing capacities, and storage infrastructure across 14 Sub-Saharan African economies. Evaluates how currency depreciation, fertilizer landing costs, and commercial outgrower contracts determine profitability for food millers, feed producers, and institutional investors.",
      
      pricing: {
        single: 150,
        departmental: 280,
        enterprise: 500,
        singleNgn: 225000,
        departmentalNgn: 420000,
        enterpriseNgn: 750000
      },

      macroMetrics: [
        { metric: "Total Commercial Grain Market Value", baseline: "$8.24 Billion", forecast: "$18.40 Billion", cagr: "+11.8%", driver: "Population growth, dietary protein shift, import substitution" },
        { metric: "Commercial Maize Production", baseline: "22.40 Million MT", forecast: "38.20 Million MT", cagr: "+7.9%", driver: "Yield improvement in Nigeria, Tanzania, and Zambia" },
        { metric: "Soybean Demand for Animal Feed", baseline: "4.10 Million MT", forecast: "8.60 Million MT", cagr: "+11.2%", driver: "Commercial poultry & aquaculture expansion" },
        { metric: "Average Crop Yield per Hectare (Maize)", baseline: "1.82 MT/Ha", forecast: "2.95 MT/Ha", cagr: "+7.1%", driver: "Hybrid seed adoption & improved fertilizer timing" },
        { metric: "Commercial Fertilizer Consumption", baseline: "19.4 kg/Ha", forecast: "34.2 kg/Ha", cagr: "+8.4%", driver: "Domestic blending expansion (Dangote, Indorama, OCP)" },
        { metric: "Grain Silo Storage Deficit", baseline: "14.80 Million MT", forecast: "6.20 Million MT", cagr: "-11.6%", driver: "Private commercial silo investments along rail corridors" },
        { metric: "Post-Harvest Grain Spoilage Rate", baseline: "22.4% of harvest", forecast: "11.8% of harvest", cagr: "-8.8%", driver: "Hermetic storage adoption & modern warehouse aggregation" },
        { metric: "Cross-Border Trade Corridor Volume", baseline: "3.20 Million MT", forecast: "7.40 Million MT", cagr: "+12.7%", driver: "AfCFTA tariff reduction along Lagos-Abidjan & Northern Corridors" }
      ],

      strategicFindings: [
        "Contract Farming Outperforms Spot Market Sourcing by 420 Basis Points: Food processors with structured outgrower contracts achieved 26.2% gross margin vs 22.0% for open market sourcing.",
        "Commercial Grain Silos Deliver an Unprecedented 28.4% Project IRR: Seasonal price spreads between harvest and lean seasons pay back total silo capex within 3.2 years.",
        "Soybean Meal is the Single Highest-Growth Agribusiness Commodity: Expanding poultry and aquaculture creates an annual deficit of 2.4 million metric tons.",
        "Domestic Fertilizer Blending is Displacing Pure Chemical Imports: Over 60% of regional fertilizer is blended domestically using Dangote & Indorama urea.",
        "Wheat Import Substitution is Driving Industrial Sorghum & Cassava Blending: Reduces foreign exchange import exposure by $620 million annually across Nigeria and Ghana.",
        "Logistics Haulage Costs Account for up to 31% of Final Landed Price: Rail-connected aggregation hubs are 40% cheaper than truck-only road corridors.",
        "Structured Farmer Aggregation Platforms are Dominating Regional Volume: Commodity exchanges (AFEX, Bakhresa, ETG) replace fragmented middlemen with certified receipts."
      ],

      tocChapters: [
        { chapter: 1, title: "Research Methodology, Dual-Track Data Architecture & Verification", pages: "14–48" },
        { chapter: 2, title: "The Macroeconomic, Policy & Trade Architecture (2020–2026)", pages: "49–88" },
        { chapter: 3, title: "Sub-Saharan Africa Grain Market Sizing & 2026–2032 Econometric Projections", pages: "89–134" },
        { chapter: 4, title: "Commercial Maize (Corn) Value Chain Deep-Dive", pages: "135–178" },
        { chapter: 5, title: "Wheat Production Dynamics, Bakery Demand & Substitution Programs", pages: "179–220" },
        { chapter: 6, title: "Soybean, Oilseeds & Protein Feed Economics", pages: "221–264" },
        { chapter: 7, title: "Fertilizer Landing Costs, Blending Economics & Soil Diagnostics", pages: "265–302" },
        { chapter: 8, title: "Storage Silos, Aggregation Warehousing & Post-Harvest Losses", pages: "303–338" },
        { chapter: 9, title: "Cross-Border Trade Corridors, Transport Costs & AfCFTA Tariffs", pages: "339–364" },
        { chapter: 10, title: "Strategic Recommendations & Private Equity Investment Playbook", pages: "365–384" }
      ]
    },

    "nigeria-stablecoins-cross-border-2026": {
      id: "nigeria-stablecoins-cross-border-2026",
      sku: "REN-FS-2026-092",
      slug: "stablecoins-and-nigerias-cross-border-economy-2026",
      title: "Stablecoins and Nigeria's Cross-Border Economy: Adoption, Use Cases and Regulatory Risks (2026 Edition)",
      shortTitle: "Stablecoins & Nigeria's Cross-Border Economy",
      sector: "fintech",
      sectorLabel: "Financial Systems & Digital Assets",
      subSector: "Digital Assets, FX & Cross-Border Rails",
      categoryBadge: "NIGERIA DIGITAL FINANCE OUTLOOK 2026 // MONETARY TELEMETRY",
      statusPill: "GENUINE RESEARCH REPORT // 80 PAGES // MODEL-BASED",
      isFlagship: true,
      isFeatured: true,
      pubDate: "August 25, 2026",
      pubHorizon: "q3_2026",
      pageCount: 80,
      vectorChartsCount: 38,
      tablesCount: 26,
      mapsCount: 6,
      formats: ["PDF", "XLSX"],
      formatType: "complete_suite",
      coverImage: "assets/images/sector_finance.jpg",
      samplePdfUrl: "assets/reports/Renalytica_Stablecoins_Report_2026.pdf",
      fullPdfUrl: "assets/reports/Renalytica_Stablecoins_Report_2026.pdf",
      geography: "Nigeria (with West Africa, UK, US, UAE & China trade corridors)",
      regionCode: "west_africa",
      primaryCountries: ["Nigeria", "United Arab Emirates", "China", "United Kingdom", "United States"],
      
      keyTelemetry: {
        cagr: "+18.2%",
        marketSize: "$7.9B Base Flow",
        baseline2025: "$7.9B",
        highlightMetric: "$22.6B 2030 Scenario",
        summaryCallout: "US$7.9B 2025 Economic Flow // US$205M Provider Revenue Pool // US$22.6B 2030 Managed Scenario"
      },
      
      teaser: "Empirical investigation reconciling $92.1B in gross crypto signals to $7.9B in true cross-border economic flow across B2B import settlement, digital work, and remittances. Profiles Tether, Circle, Yellow Card, Busha, Quidax, and PAPSS.",
      executiveSummary: "How much Nigeria-associated stablecoin activity represents an underlying cross-border payment, trade, income or treasury purpose? This landmark 80-page report applies rigorous anti-double-counting methods to separate speculative churn from productive economic use, mapping regulatory perimeters across CBN, SEC, and NFIU.",
      
      pricing: {
        single: 140,
        departmental: 260,
        enterprise: 480,
        singleNgn: 210000,
        departmentalNgn: 390000,
        enterpriseNgn: 720000
      },

      macroMetrics: [
        { metric: "All-Crypto Value Received (Reported)", baseline: "US$92.1 Billion", forecast: "US$165.0 Billion", cagr: "+12.4%", driver: "Chainalysis 2025 SSA baseline; high-volume trading and exchange transfers" },
        { metric: "Cross-Border Economic Flow (Modelled Base)", baseline: "US$7.90 Billion", forecast: "US$22.60 Billion", cagr: "+16.2%", driver: "B2B supplier invoices, freelancer payouts, family remittance" },
        { metric: "Provider Revenue Pool", baseline: "US$205 Million", forecast: "US$475 Million", cagr: "+12.8%", driver: "Exchange spreads, payment orchestration fees, liquidity services" },
        { metric: "User Cost Savings vs Conventional Rails", baseline: "US$124 Million", forecast: "US$360 Million", cagr: "+16.5%", driver: "2.25 percentage point cost advantage over conventional bank wires" },
        { metric: "Direct Nigerian Value Added", baseline: "US$84 Million", forecast: "US$220 Million", cagr: "+14.8%", driver: "Local onboarding, compliance operations, and banking rails" },
        { metric: "Economically Active Individuals", baseline: "2.40 Million", forecast: "5.80 Million", cagr: "+13.4%", driver: "Freelancers, remote tech talent, cross-border diaspora families" },
        { metric: "Economically Active Businesses", baseline: "105,000 SMEs", forecast: "280,000 SMEs", cagr: "+15.1%", driver: "Import-export merchants settling China and UAE goods" }
      ],

      strategicFindings: [
        "The Market is Material But Far Smaller Than Raw Blockchain Flow: Out of $92.1B in gross on-chain transfers, only $7.9B represents underlying cross-border economic settlement.",
        "B2B Import Settlement Forms the Demand Core (42%): Importers utilize stablecoins for settlement certainty with Chinese and UAE suppliers when official FX access is constrained.",
        "Freelancer & Digital Creator Payroll Accounts for 20%: Remote workers earn foreign exchange, converting into naira on compliant local off-ramps.",
        "Commercial Value Sits at the Service Layer, Not Pure Token Volume: Winning providers build accountable fiat edges, bank integrations, and Travel Rule compliance.",
        "Managed Integration is the Best Risk-Adjusted Path to 2030: Clear SEC & CBN perimeter coordination unlocks $22.6B in supervised flows vs $10.1B under opaque restriction."
      ],

      tocChapters: [
        { chapter: 1, title: "Why This Matters Now: Macro Context & Conventional Benchmarks", pages: "12–13" },
        { chapter: 2, title: "Measurement Framework & The Anti-Double-Counting Bridge", pages: "14–16" },
        { chapter: 3, title: "Stablecoin and Macro Context: Global Scale vs Nigerian Liquidity", pages: "17–19" },
        { chapter: 4, title: "Adoption Dynamics: Active Individuals and Businesses", pages: "20–23" },
        { chapter: 5, title: "Six Use Cases & Corridor Analysis (China, UAE, US, UK, Africa)", pages: "24–33" },
        { chapter: 6, title: "Market Size, Revenue Pools & 2030 Scenarios", pages: "34–38" },
        { chapter: 7, title: "Ecosystem Stack, Business Models & Unit Economics", pages: "40–43" },
        { chapter: 8, title: "Ten Case Profiles: Tether, Circle, Yellow Card, Busha, Quidax, PAPSS", pages: "44–49" },
        { chapter: 9, title: "The Regulatory Landscape: SEC, CBN, NFIU & International Comparators", pages: "51–57" },
        { chapter: 10, title: "Action Agenda: Sequenced Stakeholder Roadmap for 2026–2030", pages: "66–68" }
      ]
    },

    "nigeria-ai-adoption-economics-2026": {
      id: "nigeria-ai-adoption-economics-2026",
      sku: "REN-TC-2026-044",
      slug: "economics-of-ai-adoption-in-nigeria-2026",
      title: "The Economics of AI Adoption in Nigeria: Banking, Energy, Telecommunications & Manufacturing (2026 Edition)",
      shortTitle: "The Economics of AI Adoption in Nigeria",
      sector: "technology",
      sectorLabel: "Digital Economy & Advanced Tech",
      subSector: "Artificial Intelligence & Enterprise Operations",
      categoryBadge: "DIGITAL ECONOMY OUTLOOK 2026 // OPERATIONAL TELEMETRY",
      statusPill: "GENUINE RESEARCH REPORT // 27 PAGES // MODEL-BASED",
      isFlagship: true,
      isFeatured: true,
      pubDate: "August 25, 2026",
      pubHorizon: "q3_2026",
      pageCount: 27,
      vectorChartsCount: 16,
      tablesCount: 14,
      mapsCount: 4,
      formats: ["PDF", "PPTX"],
      formatType: "complete_suite",
      coverImage: "assets/images/analyst_holding_market_chart.jpg",
      samplePdfUrl: "assets/reports/Renalytica_Economics_AI_Adoption_2026.pdf",
      fullPdfUrl: "assets/reports/Renalytica_Economics_AI_Adoption_2026.pdf",
      geography: "Nigeria (National Enterprise Evaluation across 4 Pillar Sectors)",
      regionCode: "west_africa",
      primaryCountries: ["Nigeria"],
      
      keyTelemetry: {
        cagr: "+24.5%",
        marketSize: "4 Pillar Sectors Evaluated",
        baseline2025: "5.8M Disclosed Copilot Users",
        highlightMetric: "28.4% Margin Expansion",
        summaryCallout: "From Pilots to Productivity // 4 Sectors // One Unified Operating Model"
      },
      
      teaser: "A decision-led view of where AI creates verifiable economic value and what prevents conversion. Covers banking service copilots, telecom network optimization, energy predictive maintenance, and factory vision inspection.",
      executiveSummary: "Moving beyond software demos into unit economics: AI value equals addressable operating base multiplied by achievable improvement and adoption depth, minus recurring inference and governance costs. Analyzes case evidence from UBA Leo (5.8m users), MTN 9MW data center, NNPC RTI, and Dangote Cement.",
      
      pricing: {
        single: 130,
        departmental: 250,
        enterprise: 460,
        singleNgn: 195000,
        departmentalNgn: 375000,
        enterpriseNgn: 690000
      },

      macroMetrics: [
        { metric: "Banking Digital Banking Income Growth", baseline: "+107.8% YoY", forecast: "+145.0% YoY", cagr: "+22.1%", driver: "UBA Leo 5.8m chatbot users; high-frequency fraud detection and customer triage" },
        { metric: "Telecommunications Active Subscriptions", baseline: "179.60 Million", forecast: "215.0 Million", cagr: "+4.2%", driver: "NCC teledensity 82.87%; network load optimization and energy reduction" },
        { metric: "Hyperscale AI Data Center Pipeline", baseline: "9 MW (MTN)", forecast: "47 MW (Airtel+MTN)", cagr: "+39.4%", driver: "Local cloud hosting and lower latency inference clusters in Lagos" },
        { metric: "Power Grid Available Capacity", baseline: "4,286 MW", forecast: "8,500 MW", cagr: "+12.1%", driver: "NERC April 2026 factsheet; predictive maintenance on generation turbines" },
        { metric: "Manufacturing Real GDP Contribution", baseline: "8.05% of GDP", forecast: "11.2% of GDP", cagr: "+6.8%", driver: "Defect reduction via computer vision inspection on factory lines" }
      ],

      strategicFindings: [
        "The Model is Not the Business Case: Commodity access to foundational LLMs yields little advantage; value stems from proprietary workflow redesign, data pipelines, and control systems.",
        "Start Where Errors Are Reversible: High-volume customer triage and code assistance should precede autonomous safety-critical or credit-granting decisions.",
        "Integration Dominates Cost (29% of Total Budget): Data engineering and organizational change management typically cost far more than model API calls.",
        "Loss Avoidance Over Labour Reduction: Mitigating fraud, downtime, and energy wastage yields higher ROI than workforce displacement in frontier markets.",
        "Governance is the Primary Scaling Mechanism: Explicit human-in-the-loop escalation rules accelerate the transition from isolated pilots to auditable enterprise capability."
      ],

      tocChapters: [
        { chapter: 1, title: "Executive View: Nigeria's AI Prize is Operating Leverage, Not Novelty", pages: "4–6" },
        { chapter: 2, title: "Sector Economics: Banking, Telecommunications, Energy, and Manufacturing", pages: "8–16" },
        { chapter: 3, title: "Scaling the Investment: The 3-Year Enterprise AI Cost Stack", pages: "17–20" },
        { chapter: 4, title: "Governance, Data Protection & Workforce Evolution", pages: "21–22" },
        { chapter: 5, title: "Outlook & Action: The 90-Day Route to an Investable Portfolio", pages: "23–26" }
      ]
    },

    "west-africa-fx-liquidity-2026": {
      id: "west-africa-fx-liquidity-2026",
      sku: "REN-MC-2026-074",
      slug: "west-african-monetary-zone-fx-liquidity-sovereign-debt-2026-2030",
      title: "West African Monetary Zone (WAMZ) FX Liquidity & Sovereign Debt Telemetry: Corporate Hedging, Currency Volatility, and Trade Balance (2026–2030)",
      shortTitle: "West Africa FX Liquidity & Sovereign Debt (2026–2030)",
      sector: "economy",
      sectorLabel: "Economy, Currency & Banking",
      subSector: "Foreign Exchange & Sovereign Risk",
      categoryBadge: "MACROECONOMICS & POLICY // SOVEREIGN RISK DESK",
      statusPill: "PRODUCTION PUBLICATION // 4 SCENARIOS // 295 PAGES",
      isFlagship: false,
      isFeatured: true,
      pubDate: "July 18, 2026",
      pubHorizon: "q1_q2_2026",
      pageCount: 295,
      vectorChartsCount: 88,
      tablesCount: 62,
      mapsCount: 12,
      formats: ["PDF", "XLSX"],
      formatType: "complete_suite",
      coverImage: "assets/images/meeting_lagos.jpg",
      samplePdfUrl: "assets/reports/Renalytica_Stablecoins_Report_2026.pdf",
      fullPdfUrl: "assets/reports/Renalytica_Stablecoins_Report_2026.pdf",
      geography: "West Africa (Nigeria, Ghana, Côte d'Ivoire, Senegal, WAEMU Interface)",
      regionCode: "west_africa",
      primaryCountries: ["Nigeria", "Ghana", "Côte d'Ivoire", "Senegal"],
      
      keyTelemetry: {
        cagr: "N/A (Scenario-Based)",
        marketSize: "$45.8B Gross Reserves",
        baseline2025: "23.0% Inflation",
        highlightMetric: "4 Macro Scenarios",
        summaryCallout: "4 Quantitative Macro Scenarios // Sovereign Risk Sensitivity Matrix"
      },
      
      teaser: "Critical econometric modeling of central bank currency interventions, bilateral trade clearing mechanisms, and debt servicing ratios. Formulated specifically for corporate treasurers, multinational CFOs, and private capital allocators.",
      executiveSummary: "A multi-variable stress-testing benchmark assessing foreign exchange availability, balance of payments, and sovereign debt sustainability across West Africa. Evaluates currency hedging instruments, interest rate differentials, and trade corridor resilience through 2030.",
      
      pricing: {
        single: 160,
        departmental: 290,
        enterprise: 520,
        singleNgn: 240000,
        departmentalNgn: 435000,
        enterpriseNgn: 780000
      },

      macroMetrics: [
        { metric: "Nigeria Official Exchange Rate (Avg)", baseline: "₦1,520/US$", forecast: "₦1,435/US$", cagr: "-1.8%", driver: "Orthodox monetary tightening and FX market unification" },
        { metric: "Gross International Reserves", baseline: "US$45.8 Billion", forecast: "US$58.2 Billion", cagr: "+4.9%", driver: "Current account surplus and sovereign Eurobond issuance" },
        { metric: "Annual Average Inflation", baseline: "23.0%", forecast: "12.4%", cagr: "-8.5%", driver: "Food supply chain stabilization and base-effect normalization" },
        { metric: "External Debt Service-to-Revenue Ratio", baseline: "62.4%", forecast: "44.0%", cagr: "-5.8%", driver: "Fiscal tax consolidation and domestic revenue expansion" }
      ],

      strategicFindings: [
        "Synthetic Currency Forwards Offer Highest Protection: Corporate treasuries locking 180-day NDFs out-performed cash holding by 380 bps.",
        "Intra-Regional Trade Settlement Migrating to Local Units: Bilateral clearing mechanisms reduce gross dollar requirement by $1.8B annually.",
        "Sovereign Bond Spreads Tightening: Secondary market spreads over US Treasuries compressed 240 basis points as fiscal discipline took hold."
      ],

      tocChapters: [
        { chapter: 1, title: "Macroeconomic Backdrop: Monetary Transmission and Central Bank Balances", pages: "10–44" },
        { chapter: 2, title: "FX Inflow Composition: Crude Oil, Remittances, and Portfolio Inflows", pages: "45–92" },
        { chapter: 3, title: "Sovereign Debt Trajectories and Multilateral Refinancing Risk", pages: "93–148" },
        { chapter: 4, title: "Corporate Treasury Hedging Strategies & Empirical Stress-Tests", pages: "149–210" },
        { chapter: 5, title: "Four Forward Scenarios for WAMZ Currencies (2026–2030)", pages: "211–295" }
      ]
    },

    "fmcg-retail-distribution-2026": {
      id: "fmcg-retail-distribution-2026",
      sku: "REN-CM-2026-082",
      slug: "next-gen-fmcg-route-to-market-retail-distribution-2026-2031",
      title: "Next-Generation FMCG Route-to-Market & Retail Distribution Dynamics in Emerging Megacities: Lagos, Nairobi, and Johannesburg (2026–2031)",
      shortTitle: "FMCG Route-to-Market & Retail Distribution (2026–2031)",
      sector: "retail",
      sectorLabel: "Retail, Consumer Goods & Logistics",
      subSector: "FMCG, Route-to-Market & Cold Chain",
      categoryBadge: "COMMERCE & RETAIL // DISTRIBUTION LOGISTICS DESK",
      statusPill: "PRODUCTION PUBLICATION // 28 CONGLOMERATES // 312 PAGES",
      isFlagship: false,
      isFeatured: true,
      pubDate: "August 12, 2026",
      pubHorizon: "q3_2026",
      pageCount: 312,
      vectorChartsCount: 94,
      tablesCount: 70,
      mapsCount: 22,
      formats: ["PDF", "XLSX"],
      formatType: "complete_suite",
      coverImage: "assets/images/sector_retail.jpg",
      samplePdfUrl: "assets/reports/Renalytica_Economics_AI_Adoption_2026.pdf",
      fullPdfUrl: "assets/reports/Renalytica_Economics_AI_Adoption_2026.pdf",
      geography: "West, East and Southern Africa Megacities (Lagos, Nairobi, Johannesburg, Accra)",
      regionCode: "sub_saharan_africa",
      primaryCountries: ["Nigeria", "Kenya", "South Africa", "Ghana"],
      
      keyTelemetry: {
        cagr: "+16.4%",
        marketSize: "$52.4B Addressable",
        baseline2025: "84% Informal Retail",
        highlightMetric: "28 Top Brands Benchmarked",
        summaryCallout: "16.4% Digital B2B Trade Growth // 28 Consumer Conglomerates Profiled"
      },
      
      teaser: "Detailed spatial and economic mapping of modern supermarket penetration versus informal open-market distribution networks. Analyzes distributor credit risk, last-mile diesel freight overheads, and price elasticities across essential consumer goods.",
      executiveSummary: "A definitive field study tracking the transformation of fast-moving consumer goods distribution in Africa's largest urban conurbations. Compares modern supermarket formats with open-air traditional kiosk ecosystems, benchmarking distributor operating margins and digital inventory ordering platforms.",
      
      pricing: {
        single: 135,
        departmental: 250,
        enterprise: 450,
        singleNgn: 202500,
        departmentalNgn: 375000,
        enterpriseNgn: 675000
      },

      macroMetrics: [
        { metric: "Informal Open Market Channel Share", baseline: "84.2% of Volume", forecast: "71.5% of Volume", cagr: "-2.4%", driver: "Gradual formalization through neighborhood supermarket mini-marts" },
        { metric: "B2B Digital Retail Aggregation Flow", baseline: "$1.84 Billion", forecast: "$6.20 Billion", cagr: "+19.8%", driver: "Fintech working capital credit tied to fast-moving inventory reorders" },
        { metric: "Last-Mile Delivery Haulage Inflation", baseline: "+28.4% YoY", forecast: "+8.2% YoY", cagr: "-12.0%", driver: "Fleet transition to compressed natural gas (CNG) light vans" }
      ],

      strategicFindings: [
        "Traditional Kiosks Retain Price Advantage in Packaged Foods: Micro-merchants achieve 14% lower operational overhead than mall-based retailers.",
        "Mini-Mart Chains Growing at 3x the Speed of Hypermarkets: Proximity grocery formats within residential estates capture the highest frequency of footfall.",
        "B2B Ordering Platforms Require Working Capital Credit: Distributors bundling short-term 7-day inventory credit see 44% higher order retention."
      ],

      tocChapters: [
        { chapter: 1, title: "Urban Consumer Demographics and Household Expenditure Shifts", pages: "12–50" },
        { chapter: 2, title: "Modern Supermarket Footprint vs. Open-Air Traditional Wholesale Markets", pages: "51–98" },
        { chapter: 3, title: "Distributor Margin Analysis, Working Capital Cycles and Default Risk", pages: "99–160" },
        { chapter: 4, title: "Last-Mile Freight, Cold Chain Storage Deficits and Route Optimization", pages: "161–230" },
        { chapter: 5, title: "B2B E-Commerce & Retail Fintech Ordering Platforms Benchmark", pages: "231–312" }
      ]
    },

    "commercial-solar-africa-2026": {
      id: "commercial-solar-africa-2026",
      sku: "REN-EN-2026-068",
      slug: "commercial-industrial-solar-telemetry-africa-2026-2033",
      title: "Commercial & Industrial (C&I) Solar Telemetry & Off-Grid Utility Economics across Sub-Saharan Africa (2026–2033)",
      shortTitle: "C&I Solar Power for Factories & Farms (2026–2033)",
      sector: "energy",
      sectorLabel: "Energy, Solar & Natural Resources",
      subSector: "Commercial Solar, Storage & Microgrids",
      categoryBadge: "ENERGY & NATURAL RESOURCES // RENEWABLE INFRASTRUCTURE",
      statusPill: "PRODUCTION PUBLICATION // 340 PAGES // EXCEL PAYBACK MODEL",
      isFlagship: false,
      isFeatured: false,
      pubDate: "June 29, 2026",
      pubHorizon: "q1_q2_2026",
      pageCount: 340,
      vectorChartsCount: 104,
      tablesCount: 78,
      mapsCount: 14,
      formats: ["PDF", "XLSX", "PPTX"],
      formatType: "complete_suite",
      coverImage: "assets/images/solar_rooftop_factory.jpg",
      samplePdfUrl: "assets/reports/Renalytica_Stablecoins_Report_2026.pdf",
      fullPdfUrl: "assets/reports/Renalytica_Stablecoins_Report_2026.pdf",
      geography: "Sub-Saharan Africa (Nigeria, Ghana, Kenya, South Africa, Egypt)",
      regionCode: "sub_saharan_africa",
      primaryCountries: ["Nigeria", "Kenya", "South Africa", "Ghana"],
      
      keyTelemetry: {
        cagr: "+22.5%",
        marketSize: "$14.2B Cumulative Capex",
        baseline2025: "3.2 Year Payback",
        highlightMetric: "42% Diesel Bill Reduction",
        summaryCallout: "22.5% Annual Industry Growth // 3 to 4 Year Typical Payback Timeline"
      },
      
      teaser: "A clear financial and technical guide for factory managers, farm owners, and investors looking to cut electricity costs using rooftop solar and battery storage systems.",
      executiveSummary: "Examines the commercial viability of rooftop and ground-mounted photovoltaic systems paired with lithium battery energy storage systems (BESS) for industrial consumers facing grid unreliability and surging diesel tariffs.",
      
      pricing: {
        single: 155,
        departmental: 285,
        enterprise: 510,
        singleNgn: 232500,
        departmentalNgn: 427500,
        enterpriseNgn: 765000
      },

      macroMetrics: [
        { metric: "C&I Solar Installed Capacity", baseline: "1,240 MW", forecast: "5,800 MW", cagr: "+24.6%", driver: "Removal of fuel subsidies and industrial tariff surcharges" },
        { metric: "Levelized Cost of Electricity (LCOE) - Solar+BESS", baseline: "$0.14 / kWh", forecast: "$0.08 / kWh", cagr: "-7.6%", driver: "Declining battery cell costs and scale manufacturing in Asia" },
        { metric: "Displaced Diesel Generation Spend", baseline: "$1.40 Billion", forecast: "$4.90 Billion", cagr: "+19.8%", driver: "Industrial clusters replacing heavy gensets with hybrid microgrids" }
      ],

      strategicFindings: [
        "Solar-Diesel Hybrid Systems Pay Back in 3.4 Years: Fast-moving consumer goods factories with 1 MW+ peak load achieve immediate operating cash flow improvement.",
        "Battery Storage Density Doubling Every 4 Years: C&I battery storage enables factories to run 14-hour continuous nighttime shifts entirely off-grid.",
        "PPA (Power Purchase Agreement) Financing Dominating Installations: Over 68% of new industrial solar installs utilize zero-capex energy service company (ESCO) models."
      ],

      tocChapters: [
        { chapter: 1, title: "Grid Reliability Index and Industrial Power Tariffs Across 8 Countries", pages: "14–58" },
        { chapter: 2, title: "Solar-Diesel-Battery Engineering Architecture and LCOE Benchmarks", pages: "59–118" },
        { chapter: 3, title: "Financial Payback Modeling, Debt Sizing and Tax Incentive Structures", pages: "119–180" },
        { chapter: 4, title: "Factory and Agribusiness Case Studies: Brewery, Cement, Silo and Cold Store", pages: "181–260" },
        { chapter: 5, title: "ESCO Developer Landscape, Equipment Import Tariffs and PPA Contract Templates", pages: "261–340" }
      ]
    },

    "fertilizer-hybrid-seeds-africa-2026": {
      id: "fertilizer-hybrid-seeds-africa-2026",
      sku: "REN-AG-2026-079",
      slug: "fertilizer-crop-protection-hybrid-seed-adoption-africa-2026-2031",
      title: "Fertilizer, Crop Protection & Hybrid Seed Adoption in Africa: Pricing Trends and Supply Chains (2026–2031)",
      shortTitle: "Fertilizer, Crop Protection & Hybrid Seed Adoption (2026–2031)",
      sector: "agriculture",
      sectorLabel: "Agriculture & Agribusiness",
      subSector: "Agri-Inputs, Fertilizers & Seed Tech",
      categoryBadge: "AGRICULTURE & FARMING // AGRI-INPUTS INTELLIGENCE",
      statusPill: "PRODUCTION PUBLICATION // 18 BLENDERS PROFILED // 278 PAGES",
      isFlagship: false,
      isFeatured: false,
      pubDate: "July 04, 2026",
      pubHorizon: "q1_q2_2026",
      pageCount: 278,
      vectorChartsCount: 76,
      tablesCount: 54,
      mapsCount: 10,
      formats: ["PDF", "XLSX"],
      formatType: "complete_suite",
      coverImage: "assets/images/sector_agriculture.jpg",
      samplePdfUrl: "assets/reports/Renalytica_Economics_AI_Adoption_2026.pdf",
      fullPdfUrl: "assets/reports/Renalytica_Economics_AI_Adoption_2026.pdf",
      geography: "West and East Africa (Nigeria, Ghana, Côte d'Ivoire, Kenya, Tanzania)",
      regionCode: "sub_saharan_africa",
      primaryCountries: ["Nigeria", "Kenya", "Tanzania", "Ghana"],
      
      keyTelemetry: {
        cagr: "+13.1%",
        marketSize: "$9.6B Annual Market",
        baseline2025: "18 Blenders Profiled",
        highlightMetric: "60% Domestic Urea",
        summaryCallout: "13.1% Annual Market Growth // 18 Major Blenders & Importers Profiled"
      },
      
      teaser: "Accurate data on urea, NPK, and certified seeds. Examines port import costs, local blending plant capacities, and farmgate prices across West and East Africa.",
      executiveSummary: "Comprehensive empirical investigation of agricultural chemical input pricing, blending infrastructure, and certified hybrid seed distribution. Evaluates the commercial economics of blending plants and outgrower input distribution networks.",
      
      pricing: {
        single: 125,
        departmental: 235,
        enterprise: 430,
        singleNgn: 187500,
        departmentalNgn: 352500,
        enterpriseNgn: 645000
      },

      macroMetrics: [
        { metric: "Fertilizer Consumption Rate", baseline: "19.4 kg/Ha", forecast: "34.2 kg/Ha", cagr: "+8.4%", driver: "Expanding local urea production capacity from Dangote & Indorama" },
        { metric: "Hybrid Seed Market Penetration", baseline: "28.5% of Cultivated Area", forecast: "52.0% of Area", cagr: "+8.9%", driver: "Commercial outgrower contracts mandating certified hybrid seed" }
      ],

      strategicFindings: [
        "Domestic Urea Blending Cuts Farmgate Cost by 18%: Local synthesis insulates farmers from international shipping freight shocks.",
        "Certified Seed Delivers 2.4x Yield Multiplier: Farmers pairing hybrid seeds with micro-dosing fertilizer achieve double the gross operating profit."
      ],

      tocChapters: [
        { chapter: 1, title: "Global Phosphate, Potash and Gas Feedstock Cost Dynamics", pages: "10–48" },
        { chapter: 2, title: "Port Ingestion, Offloading Demurrage and Inland Haulage Costs", pages: "49–94" },
        { chapter: 3, title: "Country-by-Country Blending Plant Capacity and Utilization Rates", pages: "95–160" },
        { chapter: 4, title: "Certified Seed Certification Systems and Farmer Adoption Roadblocks", pages: "161–220" },
        { chapter: 5, title: "Commercial Input Financing and Ag-Retailer Working Capital Models", pages: "221–278" }
      ]
    },

    "cross-border-business-payments-2026": {
      id: "cross-border-business-payments-2026",
      sku: "REN-FS-2026-085",
      slug: "cross-border-business-payments-trade-rails-africa-2026-2032",
      title: "Cross-Border Business Payments and Trade Rails in Africa: Reducing Costs and Settlement Delays (2026–2032)",
      shortTitle: "Cross-Border B2B Payments & Trade Rails in Africa",
      sector: "fintech",
      sectorLabel: "Financial Systems & Digital Assets",
      subSector: "B2B Rails, Settlement & Fintech",
      categoryBadge: "FINANCIAL TECHNOLOGY // COMMERCIAL TRADE RAILS",
      statusPill: "PRODUCTION PUBLICATION // 15 RAILS BENCHMARKED // 326 PAGES",
      isFlagship: false,
      isFeatured: false,
      pubDate: "August 08, 2026",
      pubHorizon: "q3_2026",
      pageCount: 326,
      vectorChartsCount: 82,
      tablesCount: 58,
      mapsCount: 16,
      formats: ["PDF", "XLSX"],
      formatType: "complete_suite",
      coverImage: "assets/images/methodology_port_logistics.jpg",
      samplePdfUrl: "assets/reports/Renalytica_Stablecoins_Report_2026.pdf",
      fullPdfUrl: "assets/reports/Renalytica_Stablecoins_Report_2026.pdf",
      geography: "Pan-African & International Trade Corridors",
      regionCode: "pan_african",
      primaryCountries: ["Nigeria", "Kenya", "South Africa", "Egypt", "Ghana"],
      
      keyTelemetry: {
        cagr: "+21.4%",
        marketSize: "$42.0B B2B Flow by 2032",
        baseline2025: "15 Major Rails Benchmarked",
        highlightMetric: "68% Faster Settlement",
        summaryCallout: "$42 Billion in Formal B2B Transactions by 2032 // Top 15 Fintech Payment Rails"
      },
      
      teaser: "How are trading companies and manufacturers moving money across African borders? We look at payment speed, bank transfer fees, mobile money merchant adoption, and new regional payment systems.",
      executiveSummary: "Evaluates the infrastructure connecting enterprise bank accounts, card processing networks, PAPSS, and digital wallet APIs for corporate trade. Analyzes corridor completion rates, median FX spreads, and regulatory compliance standards across 18 jurisdictions.",
      
      pricing: {
        single: 145,
        departmental: 265,
        enterprise: 485,
        singleNgn: 217500,
        departmentalNgn: 397500,
        enterpriseNgn: 727500
      },

      macroMetrics: [
        { metric: "Formal Cross-Border B2B Digital Value", baseline: "$9.40 Billion", forecast: "$42.00 Billion", cagr: "+23.9%", driver: "AfCFTA implementation and expansion of digital treasury APIs" },
        { metric: "Average Settlement Duration", baseline: "3.4 Business Days", forecast: "14 Minutes", cagr: "-41.0%", driver: "Local currency netting and modern real-time gross settlement integration" }
      ],

      strategicFindings: [
        "Correspondent Banking Deductions Erode 4.2% of SME Invoice Value: Direct regional rails cut intermediary fee leakage by over half.",
        "Real-Time Netting Slashes Idle Corporate Working Capital: Multinational treasuries save an average of $340,000 annually in currency drag."
      ],

      tocChapters: [
        { chapter: 1, title: "The Architecture of African Trade Settlement and Correspondent Banking", pages: "12–54" },
        { chapter: 2, title: "PAPSS, SADC-RTGS, and Regional Central Bank Clearing Networks", pages: "55–110" },
        { chapter: 3, title: "Fintech APIs and Corporate Multi-Currency Virtual Account Gateways", pages: "111–180" },
        { chapter: 4, title: "Corridor-by-Corridor Cost Benchmarks: Nigeria, Ghana, Kenya, South Africa", pages: "181–250" },
        { chapter: 5, title: "The 2026–2032 Outlook: Unified Pan-African Commercial Payment Rails", pages: "251–326" }
      ]
    },

    "commercial-poultry-feed-west-africa-2026": {
      id: "commercial-poultry-feed-west-africa-2026",
      sku: "REN-AG-2026-072",
      slug: "commercial-poultry-animal-feed-west-africa-2026-2030",
      title: "Commercial Poultry & Animal Feed in West Africa: Raw Material Costs, Grain Substitutes, and Profit Margins (2026–2030)",
      shortTitle: "Commercial Poultry & Animal Feed in West Africa",
      sector: "agriculture",
      sectorLabel: "Agriculture & Agribusiness",
      subSector: "Livestock, Dairy & Poultry Economics",
      categoryBadge: "AGRICULTURE & FARMING // LIVESTOCK ECONOMICS",
      statusPill: "PRODUCTION PUBLICATION // 14 FEED MILLS // 245 PAGES",
      isFlagship: false,
      isFeatured: false,
      pubDate: "May 19, 2026",
      pubHorizon: "q1_q2_2026",
      pageCount: 245,
      vectorChartsCount: 68,
      tablesCount: 46,
      mapsCount: 8,
      formats: ["PDF", "XLSX"],
      formatType: "complete_suite",
      coverImage: "assets/images/meeting_kaduna.jpg",
      samplePdfUrl: "assets/reports/Renalytica_Economics_AI_Adoption_2026.pdf",
      fullPdfUrl: "assets/reports/Renalytica_Economics_AI_Adoption_2026.pdf",
      geography: "West Africa (Nigeria, Ghana, Côte d'Ivoire)",
      regionCode: "west_africa",
      primaryCountries: ["Nigeria", "Ghana", "Côte d'Ivoire"],
      
      keyTelemetry: {
        cagr: "+14.2%",
        marketSize: "$5.8B Regional Market",
        baseline2025: "14 Large Mills Benchmarked",
        highlightMetric: "68% Feed Cost Ratio",
        summaryCallout: "Feed-to-Meat Margin Analysis // 14 Large Feed Mills Benchmarked"
      },
      
      teaser: "A practical analysis of poultry feed production costs, looking at soybean and maize shortages and how farmers are managing feed costs to protect egg and meat profits.",
      executiveSummary: "Detailed feed mill operating economics, linear programming formulation models, and ingredient cost volatility. Investigates alternative proteins (black soldier fly larvae, groundnut cake) and grain substitutes.",
      
      pricing: {
        single: 115,
        departmental: 220,
        enterprise: 410,
        singleNgn: 172500,
        departmentalNgn: 330000,
        enterpriseNgn: 615000
      },

      macroMetrics: [
        { metric: "Commercial Feed Production Volume", baseline: "3.80 Million MT", forecast: "7.10 Million MT", cagr: "+13.3%", driver: "Per capita poultry meat and egg consumption growth in urban centers" }
      ],

      strategicFindings: [
        "Feed Formulation Accounts for 68% of Live Broiler Cost: Small fluctuations in maize price dictate farm solvency.",
        "Commercial Mills Backward-Integrating into Grain Silos: Securing 90-day raw material buffers protects mills from seasonal spot surges."
      ],

      tocChapters: [
        { chapter: 1, title: "Macro Drivers of Dietary Protein Demand in West Africa", pages: "10–40" },
        { chapter: 2, title: "Maize, Soya, and Micro-Ingredient Cost Decomposition", pages: "41–90" },
        { chapter: 3, title: "Feed Mill Operating Efficiencies and Pelletization Tech", pages: "91–150" },
        { chapter: 4, title: "Commercial Egg and Broiler Farm Profitability Models", pages: "151–200" },
        { chapter: 5, title: "Investment Opportunities in Raw Material Aggregation", pages: "201–245" }
      ]
    },


    "sub-saharan-africa-sports-business-2026": {
      id: "sub-saharan-africa-sports-business-2026",
      sku: "REN-SP-2026-031",
      slug: "sub-saharan-africa-sports-business-betting-media-infrastructure-2026-2032",
      title: "Sub-Saharan Africa Sports & Sports Business Outlook: Media Rights, Betting Telemetry, League Economics, and Stadium Infrastructure (2026–2032)",
      shortTitle: "SSA Sports & Sports Business Outlook (2026–2032)",
      sector: "sports",
      sectorLabel: "Sports & Sports Business Intelligence",
      subSector: "Broadcasting Rights, Betting Analytics & League Monetization",
      categoryBadge: "SPORTS ECONOMICS // TELEMETRY & MEDIA DESK",
      statusPill: "POWERED BY SHARP API // 24,200+ FIXTURES // COMMERCIAL DEEP-DIVE",
      isFlagship: true,
      isFeatured: true,
      pubDate: "September 02, 2026",
      pubHorizon: "q3_2026",
      pageCount: 240,
      vectorChartsCount: 78,
      tablesCount: 52,
      mapsCount: 14,
      formats: ["PDF", "XLSX", "PPTX"],
      formatType: "complete_suite",
      coverImage: "assets/images/analyst_holding_market_chart.jpg",
      samplePdfUrl: "assets/reports/Renalytica_Economics_AI_Adoption_2026.pdf",
      fullPdfUrl: "assets/reports/Renalytica_Economics_AI_Adoption_2026.pdf",
      geography: "Pan-African & Key Markets (Nigeria, South Africa, Kenya, Ghana, Egypt, Morocco, Rwanda)",
      regionCode: "pan_african",
      primaryCountries: ["Nigeria", "South Africa", "Kenya", "Ghana", "Morocco", "Rwanda"],
      
      keyTelemetry: {
        cagr: "+14.6%",
        marketSize: "$12.8B by 2032",
        baseline2025: "$4.92B",
        highlightMetric: "24,200+ Sharp Fixtures",
        summaryCallout: "14.6% Projected CAGR (2026–2032) // $12.8B Commercial Sports Ecosystem"
      },
      
      teaser: "Exhaustive telemetry and commercial valuation of African professional football (NPFL, PSL, KPL), Basketball Africa League (BAL), sports wagering volumes, digital media rights distribution, and private stadium concession models.",
      executiveSummary: "Comprehensive study integrating Sharp API fixture telemetry, licensed sports betting turnover across 18 African jurisdictions, and streaming rights contracts. Evaluates commercial sponsorship yields, athlete wage bills, and capital expenditure paybacks for modern athletic complexes.",
      
      pricing: {
        single: 120,
        departmental: 240,
        enterprise: 450,
        singleNgn: 180000,
        departmentalNgn: 360000,
        enterpriseNgn: 675000
      },

      macroMetrics: [
        { metric: "Commercial Sports Market Gross Value", baseline: "$4.92 Billion", forecast: "$12.80 Billion", cagr: "+14.6%", driver: "Media streaming contracts, licensed sports wagering, corporate sponsorship" },
        { metric: "Regulated Sports Wagering GGR (Africa)", baseline: "$2.15 Billion", forecast: "$5.40 Billion", cagr: "+14.1%", driver: "Mobile money micro-bets, live in-play wagering, Sharp API telemetry feeds" },
        { metric: "Continental Broadcast & Streaming Rights", baseline: "$480 Million", forecast: "$1.24 Billion", cagr: "+14.5%", driver: "Direct-to-consumer OTT mobile apps (Showmax, SuperSport, StarTimes)" },
        { metric: "Basketball Africa League (BAL) Ecosystem", baseline: "$95 Million", forecast: "$380 Million", cagr: "+21.9%", driver: "NBA Africa expansion, corporate merchandising, Kigali Arena concession model" },
        { metric: "Stadium & Arena Capital Investment Pipeline", baseline: "$1.40 Billion", forecast: "$3.85 Billion", cagr: "+15.5%", driver: "AFCON & youth tournament infrastructure modernization" }
      ],

      strategicFindings: [
        "In-Play Live Sports Telemetry Drives 68% of Digital Wagering GGR: Platforms integrated with sub-second API fixtures achieve 3.4x higher bet volume per match.",
        "Direct-to-Mobile Micro-Subscriptions Outpace Cable TV Bundles: Over 74% of football viewers under 30 stream games via mobile data passes rather than legacy satellite decoders.",
        "Sponsorship Rights Transitioning to Performance-Linked Digital Impressions: Jersey sponsorships now mandate social-first influencer tie-ins and digital affiliate conversions.",
        "Multipurpose Arenas Pay Back 2.8x Faster Than Single-Use Stadiums: Venues in Kigali and Dakar hosting music concerts and tech conferences alongside basketball achieve positive operating cash flow within 24 months."
      ],

      tocChapters: [
        { chapter: 1, title: "Commercial Architecture of African Sports: Sizing, Revenue Mix & Structural Growth", pages: "12–38" },
        { chapter: 2, title: "Sharp API Telemetry & The Economics of Regulated Sports Wagering", pages: "39–74" },
        { chapter: 3, title: "Media Rights Distribution: OTT Mobile Streaming vs. Legacy Satellite Broadcasts", pages: "75–112" },
        { chapter: 4, title: "League Economics: NPFL, PSL, KPL, and the Basketball Africa League (BAL)", pages: "113–152" },
        { chapter: 5, title: "Corporate Sponsorships, Athletic Apparel & Consumer Merchandising Corridors", pages: "153–188" },
        { chapter: 6, title: "Stadium Infrastructure, PPP Concessions & Real Estate Value Capture", pages: "189–218" },
        { chapter: 7, title: "Private Equity, Sovereign Wealth & Franchise Valuation Playbook", pages: "219–240" }
      ]
    },

    "africa-edtech-private-education-2026": {
      id: "africa-edtech-private-education-2026",
      sku: "REN-ED-2026-052",
      slug: "africa-edtech-private-education-k12-stem-vocational-skills-2026-2032",
      title: "Africa EdTech & Private Education Economics: K-12 Capacity Gaps, STEM Curricula, Tuition Yields, and Vocational Skills (2026–2032)",
      shortTitle: "Africa EdTech & Private Education Economics (2026–2032)",
      sector: "education",
      sectorLabel: "Education & EdTech Economics",
      subSector: "K-12 Private Schooling, Digital Classrooms & STEM Training",
      categoryBadge: "EDUCATION ECONOMICS // HUMAN CAPITAL DESK",
      statusPill: "FEATURING GOFAR ACADEMY // 12 COUNTRIES // 10-YEAR FORECAST",
      isFlagship: true,
      isFeatured: true,
      pubDate: "September 08, 2026",
      pubHorizon: "q3_2026",
      pageCount: 220,
      vectorChartsCount: 68,
      tablesCount: 46,
      mapsCount: 10,
      formats: ["PDF", "XLSX", "PPTX"],
      formatType: "complete_suite",
      coverImage: "assets/images/african_corporate_boardroom.jpg",
      samplePdfUrl: "assets/reports/Renalytica_Economics_AI_Adoption_2026.pdf",
      fullPdfUrl: "assets/reports/Renalytica_Economics_AI_Adoption_2026.pdf",
      geography: "Sub-Saharan Africa (Nigeria, Kenya, Ghana, South Africa, Uganda, Rwanda, Tanzania)",
      regionCode: "sub_saharan_africa",
      primaryCountries: ["Nigeria", "Kenya", "Ghana", "South Africa", "Uganda", "Rwanda"],
      
      keyTelemetry: {
        cagr: "+13.2%",
        marketSize: "$16.4B by 2032",
        baseline2025: "$6.85B",
        highlightMetric: "32.4% Private School Enrollment",
        summaryCallout: "13.2% Projected CAGR (2026–2032) // $16.4B Private Education & EdTech Ecosystem"
      },
      
      teaser: "Comprehensive economic assessment of private K-12 schools, EdTech software adoption, tuition collection dynamics, teacher wage models, and international STEM accreditation, featuring case studies from GoFar International Academy.",
      executiveSummary: "Detailed financial and operational analysis across 12 African school systems. Evaluates how public education budget shortfalls are driving parents toward affordable private academies, alongside the rapid integration of tablet-based hybrid curricula, AI tutoring engines, and international STEM certifications.",
      
      pricing: {
        single: 110,
        departmental: 220,
        enterprise: 420,
        singleNgn: 165000,
        departmentalNgn: 330000,
        enterpriseNgn: 630000
      },

      macroMetrics: [
        { metric: "Sub-Saharan Private Education Market Sizing", baseline: "$6.85 Billion", forecast: "$16.40 Billion", cagr: "+13.2%", driver: "Middle-class expansion, public school shortages, urbanization" },
        { metric: "Private K-12 Student Enrollment Share", baseline: "22.8% of primary students", forecast: "34.5% of primary students", cagr: "+6.1%", driver: "Parental demand for teacher accountability, smaller class sizes, and English/French fluency" },
        { metric: "EdTech & Digital Learning Software Spend", baseline: "$420 Million", forecast: "$1.58 Billion", cagr: "+20.8%", driver: "School management systems, digital textbooks, online assessments" },
        { metric: "STEM & Robotics Curriculum Adoption", baseline: "8.5% of accredited schools", forecast: "29.4% of accredited schools", cagr: "+19.4%", driver: "Demand for coding, AI literacy, and global university feeder pipelines (GoFar Academy model)" },
        { metric: "Private Academy Operating Margin", baseline: "18.5% EBITDA", forecast: "26.2% EBITDA", cagr: "+5.1%", driver: "Automated digital fee collection, energy solarization, centralized procurement" }
      ],

      strategicFindings: [
        "Affordable Private Schools Out-Enroll State Systems in Urban Centers: Over 52% of urban primary students in Lagos, Nairobi, and Accra attend independent low-to-mid fee schools.",
        "Integrated EdTech Platforms Cut Administrative Bad Debt by 78%: Real-time parent fee tracking apps like those audited at GoFar Academy reduce end-of-term tuition arrears from 24% to under 5%.",
        "International STEM Feeder Programs Yield 40% Tuition Premiums: Schools offering Cambridge IGCSE, SAT prep, and coding labs achieve 98% re-enrollment rates.",
        "Solar Mini-Grids Eliminate School Energy Vulnerabilities: Campuses equipped with commercial solar-plus-storage reduce recurring utility overhead by 42% compared to diesel gensets."
      ],

      tocChapters: [
        { chapter: 1, title: "Demographic Imperatives: Africa's Youth Wave and the Public Education Deficit", pages: "10–36" },
        { chapter: 2, title: "Private K-12 Market Sizing: Low-Fee, Mid-Tier, and Elite International Academies", pages: "37–72" },
        { chapter: 3, title: "EdTech Infrastructure: LMS Platforms, Digital Classrooms & AI Tutoring Tools", pages: "73–108" },
        { chapter: 4, title: "Institutional Case Study: GoFar International Academy's Hybrid Excellence Model", pages: "109–138" },
        { chapter: 5, title: "School Unit Economics: Tuition Pricing, Teacher Retention & CapEx Payback", pages: "139–174" },
        { chapter: 6, title: "Tertiary Education & Vocational STEM Skills Feeder Pipelines", pages: "175–202" },
        { chapter: 7, title: "Impact Investing, Impact Bonds & School Infrastructure Financing Playbook", pages: "203–220" }
      ]
    },
    "cement-clinker-building-materials-2026": {
      id: "cement-clinker-building-materials-2026",
      sku: "REN-IN-2026-061",
      slug: "cement-clinker-building-materials-west-central-africa-2026-2032",
      title: "Cement, Clinker & Building Materials in West and Central Africa: Factory Production Capacity and Price Trends (2026–2032)",
      shortTitle: "Cement, Clinker & Building Materials in Africa",
      sector: "industrial",
      sectorLabel: "Industrial & Building Materials",
      subSector: "Cement, Clinker & Infrastructure Materials",
      categoryBadge: "INDUSTRIAL MATERIALS // INFRASTRUCTURE INTELLIGENCE",
      statusPill: "PRODUCTION PUBLICATION // 8 MAKERS PROFILED // 290 PAGES",
      isFlagship: false,
      isFeatured: false,
      pubDate: "June 14, 2026",
      pubHorizon: "q1_q2_2026",
      pageCount: 290,
      vectorChartsCount: 72,
      tablesCount: 52,
      mapsCount: 12,
      formats: ["PDF", "XLSX"],
      formatType: "complete_suite",
      coverImage: "assets/images/sector_energy.jpg",
      samplePdfUrl: "assets/reports/Renalytica_Stablecoins_Report_2026.pdf",
      fullPdfUrl: "assets/reports/Renalytica_Stablecoins_Report_2026.pdf",
      geography: "West and Central Africa (Nigeria, Ghana, Cameroon, Senegal, DR Congo)",
      regionCode: "sub_saharan_africa",
      primaryCountries: ["Nigeria", "Ghana", "Cameroon", "Senegal"],
      
      keyTelemetry: {
        cagr: "+7.9%",
        marketSize: "72 Million MT Capacity",
        baseline2025: "8 Major Producers",
        highlightMetric: "38% Energy Cost Share",
        summaryCallout: "7.9% Annual Demand Growth // 8 Major Cement Makers Benchmarked"
      },
      
      teaser: "Tracks cement plant capacity, coal and gas energy costs, and infrastructure building pipelines to project supply and price changes over the next 6 years.",
      executiveSummary: "Evaluates production plant economics, kiln fuel switching (gas, coal, biomass), limestone reserves, and cross-border clinker haulage across the ECOWAS and CEMAC sub-regions.",
      
      pricing: {
        single: 130,
        departmental: 245,
        enterprise: 440,
        singleNgn: 195000,
        departmentalNgn: 367500,
        enterpriseNgn: 660000
      },

      macroMetrics: [
        { metric: "Regional Cement Consumption", baseline: "42.5 Million MT", forecast: "68.0 Million MT", cagr: "+6.9%", driver: "Rapid urbanization, housing construction, and commercial ports" }
      ],

      strategicFindings: [
        "Energy Costs Represent 38% of Finished Bag Production Cost: Producers with captive gas pipelines maintain a $14/MT margin lead.",
        "Cross-Border Clinker Trade Expanding Under AfCFTA: Coastal grinding mills import regional clinker, lowering finished bag costs in non-limestone states."
      ],

      tocChapters: [
        { chapter: 1, title: "The Macroeconomics of Urbanization and Infrastructure Pipelines", pages: "10–48" },
        { chapter: 2, title: "Plant Capacities, Kiln Fuel Mix and Energy Overhead Analysis", pages: "49–110" },
        { chapter: 3, title: "Competitor Benchmarking: Dangote, LafargeHolcim, BUA, CimIvoire", pages: "111–180" },
        { chapter: 4, title: "Supply Chain Haulage, Rail Links and Retail Bag Price Dispersion", pages: "181–240" },
        { chapter: 5, title: "Econometric Sizing & 2026–2032 Price Forecast Models", pages: "241–290" }
      ]
    }
  };

  // Cart Storage Keys
  const CART_ITEMS_KEY = 'renalytica_cart_items';
  const CART_COUNT_KEY = 'renalytica_cart_count';

  class ReportsRepository {
    constructor() {
      this.reports = masterReports;
    }

    /**
     * Get all reports (merged with local updates)
     */
    getAll() {
      let list = Object.values(this.reports);
      try {
        if (typeof localStorage !== 'undefined') {
          const custom = JSON.parse(localStorage.getItem('renalytica_custom_products') || '{}');
          Object.values(custom).forEach(cp => {
            const idx = list.findIndex(r => r.id === cp.id || (cp.sku && r.sku === cp.sku));
            if (idx > -1) {
              list[idx] = { ...list[idx], ...cp };
            } else {
              list.unshift(cp);
            }
          });
        }
      } catch (e) {}
      return list;
    }

    /**
     * Get report by ID or slug
     */
    getById(id) {
      if (!id) return null;
      try {
        if (typeof localStorage !== 'undefined') {
          const custom = JSON.parse(localStorage.getItem('renalytica_custom_products') || '{}');
          if (custom[id]) return { ...(this.reports[id] || {}), ...custom[id] };
          const foundCustom = Object.values(custom).find(r => r.slug === id || r.sku === id);
          if (foundCustom) return { ...(this.reports[foundCustom.id] || {}), ...foundCustom };
        }
      } catch (e) {}
      if (this.reports[id]) return this.reports[id];
      // Search by slug
      return Object.values(this.reports).find(r => r.slug === id) || null;
    }

    getBySku(sku) {
      if (!sku) return null;
      const all = this.getAll();
      return all.find(r => r.sku && r.sku.toLowerCase() === sku.toLowerCase()) || null;
    }

    /**
     * Standard Conversion Matrix based on Nigerian Naira (NGN)
     * USD: NGN / 1,500
     * EUR: NGN / 1,620
     * GBP: NGN / 1,920
     * KES: (NGN / 1,500) * 130
     * GHS: (NGN / 1,500) * 15.5
     * ZAR: (NGN / 1,500) * 18.2
     */
    convertNgnPrice(ngnAmount, targetCurrency = 'NGN') {
      const ngn = Number(ngnAmount) || 0;
      switch (String(targetCurrency).toUpperCase()) {
        case 'USD': return Math.round(ngn / 1500);
        case 'EUR': return Math.round(ngn / 1620);
        case 'GBP': return Math.round(ngn / 1920);
        case 'KES': return Math.round((ngn / 1500) * 130);
        case 'GHS': return Math.round((ngn / 1500) * 15.5);
        case 'ZAR': return Math.round((ngn / 1500) * 18.2);
        case 'NGN':
        default:
          return Math.round(ngn);
      }
    }

    /**
     * Get unique sectors with counts
     */
    getSectors() {
      const counts = {};
      Object.values(this.reports).forEach(r => {
        counts[r.sector] = (counts[r.sector] || 0) + 1;
      });
      return [
        { id: "all", name: "All Sectors", count: Object.keys(this.reports).length },
        { id: "agriculture", name: "Agriculture & Agribusiness", count: counts["agriculture"] || 0 },
        { id: "economy", name: "Economy, Currency & Banking", count: counts["economy"] || 0 },
        { id: "retail", name: "Retail, Consumer Goods & Logistics", count: counts["retail"] || 0 },
        { id: "energy", name: "Energy, Solar & Resources", count: counts["energy"] || 0 },
        { id: "fintech", name: "Financial Systems & Digital Assets", count: counts["fintech"] || 0 },
        { id: "technology", name: "Digital Economy & Advanced Tech", count: counts["technology"] || 0 },
        { id: "industrial", name: "Industrial & Building Materials", count: counts["industrial"] || 0 },
        { id: "sports", name: "Sports & Sports Business", count: counts["sports"] || 0 },
        { id: "education", name: "Education & EdTech", count: counts["education"] || 0 }
      ];
    }

    /**
     * Get unique geographies
     */
    getGeographies() {
      return [
        { id: "all", name: "All Regions" },
        { id: "sub_saharan_africa", name: "Sub-Saharan Africa (Pan-Regional)" },
        { id: "west_africa", name: "West Africa (Nigeria, Ghana, Côte d'Ivoire)" },
        { id: "pan_african", name: "Pan-African & Global Trade" }
      ];
    }

    /**
     * Filter and Search Reports
     */
    filter(criteria = {}) {
      let results = Object.values(this.reports);

      // 1. Sector / Industry filter
      if (criteria.sector && criteria.sector !== 'all') {
        results = results.filter(r => r.sector === criteria.sector);
      }

      // 2. Geography filter
      if (criteria.region && criteria.region !== 'all') {
        results = results.filter(r => r.regionCode === criteria.region);
      }

      // 3. Publication Horizon filter
      if (criteria.horizon && criteria.horizon !== 'all') {
        results = results.filter(r => r.pubHorizon === criteria.horizon);
      }

      // 4. Format filter
      if (criteria.format && criteria.format !== 'all') {
        results = results.filter(r => r.formats.includes(criteria.format.toUpperCase()));
      }

      // 5. Price Range filter (based on Single User price)
      if (criteria.priceRange && criteria.priceRange !== 'all') {
        if (criteria.priceRange === 'under_2000') {
          results = results.filter(r => r.pricing.single < 2000);
        } else if (criteria.priceRange === '2000_3500') {
          results = results.filter(r => r.pricing.single >= 2000 && r.pricing.single <= 3500);
        } else if (criteria.priceRange === '3500_5000') {
          results = results.filter(r => r.pricing.departmental >= 3500 && r.pricing.departmental <= 5000);
        } else if (criteria.priceRange === 'over_5000') {
          results = results.filter(r => r.pricing.enterprise >= 5000);
        }
      }

      // 6. Text Search Query
      if (criteria.search && criteria.search.trim()) {
        const query = criteria.search.trim().toLowerCase();
        results = results.filter(r => {
          return r.title.toLowerCase().includes(query) ||
                 r.sku.toLowerCase().includes(query) ||
                 r.teaser.toLowerCase().includes(query) ||
                 r.executiveSummary.toLowerCase().includes(query) ||
                 r.subSector.toLowerCase().includes(query) ||
                 r.sectorLabel.toLowerCase().includes(query) ||
                 r.geography.toLowerCase().includes(query);
        });
      }

      // 7. Sort
      const sortBy = criteria.sort || 'newest';
      if (sortBy === 'newest') {
        results.sort((a, b) => new Date(b.pubDate) - new Date(a.pubDate));
      } else if (sortBy === 'price_asc') {
        results.sort((a, b) => a.pricing.single - b.pricing.single);
      } else if (sortBy === 'price_desc') {
        results.sort((a, b) => b.pricing.single - a.pricing.single);
      } else if (sortBy === 'pages') {
        results.sort((a, b) => b.pageCount - a.pageCount);
      }

      return results;
    }

    /**
     * Get Popular Search Queries
     */
    getPopularSearches() {
      return [
        { label: "Grains & Fertilizer", query: "grains" },
        { label: "Stablecoins & FX", query: "stablecoin" },
        { label: "AI Economics", query: "AI adoption" },
        { label: "FMCG Distribution", query: "retail" },
        { label: "Commercial Solar", query: "solar" },
        { label: "Trade Rails", query: "payments" }
      ];
    }

    // ========================================================================
    // CART / BRIEFCASE SYSTEM
    // ========================================================================

    /**
     * Get current cart items
     */
    getCart() {
      try {
        const raw = localStorage.getItem(CART_ITEMS_KEY);
        if (raw) return JSON.parse(raw);
      } catch (e) {
        console.warn('Unable to load cart from storage', e);
      }
      return [];
    }

    /**
     * Save cart items and update count
     */
    saveCart(items) {
      try {
        localStorage.setItem(CART_ITEMS_KEY, JSON.stringify(items));
        localStorage.setItem(CART_COUNT_KEY, items.length.toString());
      } catch (e) {
        console.warn('Unable to save cart to storage', e);
      }
      this.dispatchCartUpdate(items);
    }

    /**
     * Add report to cart
     */
    addToCart(reportId, licenseType = 'departmental') {
      const report = this.getById(reportId);
      if (!report) return false;

      const cart = this.getCart();
      const existingIndex = cart.findIndex(item => item.id === report.id);

      const price = report.pricing[licenseType] || report.pricing.departmental;

      if (existingIndex > -1) {
        // Update license tier
        cart[existingIndex].licenseType = licenseType;
        cart[existingIndex].price = price;
      } else {
        cart.push({
          id: report.id,
          sku: report.sku,
          title: report.shortTitle || report.title,
          sector: report.sectorLabel,
          pageCount: report.pageCount,
          licenseType: licenseType,
          price: price,
          coverImage: report.coverImage
        });
      }

      this.saveCart(cart);
      return true;
    }

    /**
     * Update license tier for an item in cart
     */
    updateLicense(reportId, licenseType) {
      const cart = this.getCart();
      const item = cart.find(i => i.id === reportId);
      if (item) {
        const report = this.getById(reportId);
        if (report) {
          item.licenseType = licenseType;
          item.price = report.pricing[licenseType] || report.pricing.single;
          this.saveCart(cart);
          return true;
        }
      }
      return false;
    }

    /**
     * Remove item from cart
     */
    removeFromCart(reportId) {
      let cart = this.getCart();
      cart = cart.filter(item => item.id !== reportId);
      this.saveCart(cart);
      return true;
    }

    /**
     * Clear cart
     */
    clearCart() {
      this.saveCart([]);
    }

    /**
     * Get cart subtotal
     */
    getCartTotal() {
      const cart = this.getCart();
      return cart.reduce((total, item) => total + (item.price || 0), 0);
    }

    /**
     * Notify listeners that cart updated
     */
    dispatchCartUpdate(items) {
      if (typeof window !== 'undefined') {
        const event = new CustomEvent('renalytica:cart-updated', {
          detail: {
            items: items,
            count: items.length,
            total: this.getCartTotal()
          }
        });
        window.dispatchEvent(event);
      }
    }
  }

  return new ReportsRepository();
}));
