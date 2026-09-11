/**
 * RENALYTICA LIVE TELEMETRY & DATA REGISTRY
 * Provides high-frequency macro indicators, commodity prices, currency pairs,
 * and intelligence package schemas for all platform modules.
 * Universal Module: works in browser (script tag / file:///), ES modules, and Node.
 */

const TELEMETRY_TICKER_ITEMS = [
  { symbol: 'BRENT CRUDE', value: '$82.40/BBL', change: '+1.24%', direction: 'up' },
  { symbol: 'FX NGN/USD', value: '₦1,480.50', change: '-0.38%', direction: 'down' },
  { symbol: 'CASHEW RAW FOB', value: '$1,240/MT', change: '+2.10%', direction: 'up' },
  { symbol: 'COCOA ICCO', value: '$7,850/MT', change: '+3.45%', direction: 'up' },
  { symbol: 'GOLD (OZ)', value: '$2,485.10', change: '+0.82%', direction: 'up' },
  { symbol: 'LITHIUM SPODUMENE', value: '$960/MT', change: '-1.15%', direction: 'down' },
  { symbol: 'SYSTEM LATENCY', value: '14MS', change: 'NOMINAL', direction: 'stable' },
  { symbol: 'VERIFIED SOURCES', value: '2,540 ACTIVE', change: '+12 TODAY', direction: 'up' }
];

const CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0 },
  EUR: { symbol: '€', rate: 0.92 },
  GBP: { symbol: '£', rate: 0.78 },
  NGN: { symbol: '₦', rate: 1480.0 }
};

const MACRO_SECTORS = [
  {
    id: 'macro',
    code: '01',
    name: 'Macro Intelligence & Sovereign Risk',
    tag: 'MACROECONOMICS',
    summary: 'High-frequency econometric surveillance of African fiscal deficits, central bank policy deviations, foreign exchange liquidity bottlenecks, and sovereign debt restructuring dynamics.',
    metrics: ['54 Economies Covered', 'Weekly FX Volatility Models', 'Central Bank Policy Trackers'],
    bullets: [
      'Empirical ground-level inflation tracking vs official statistics',
      'Parallel currency market liquidity & spread forecasting',
      'Sovereign Eurobond yield curve sensitivity stress testing',
      'Fiscal deficit & debt service coverage ratio projections'
    ],
    badge: 'TIER-1 MACRO'
  },
  {
    id: 'commodities',
    code: '02',
    name: 'Agritech & Food Security Telemetry',
    tag: 'AGRITECH',
    summary: 'Satellite synthetic-aperture radar (SAR) soil moisture indexation, port export manifests, and farm-gate commodity price tracking across West and East Africa.',
    metrics: ['12 Cash Commodities', '42 Ground Survey Hubs', 'Bi-Weekly Harvest Index'],
    bullets: [
      'Raw Cashew Nut (RCN) & Cocoa pod yield forecasting models',
      'Port dwell times at Abidjan, San Pedro, Lagos, and Mombasa',
      'Climate anomaly yield degradation probability distributions',
      'Fertilizer supply chain bottlenecks & farm-gate cost pass-through'
    ],
    badge: 'SAR SATELLITE'
  },
  {
    id: 'energy',
    code: '03',
    name: 'Energy Transition & Critical Minerals',
    tag: 'ENERGY',
    summary: 'Granular tracking of Sub-Saharan utility-scale solar buildouts, commercial & industrial (C&I) off-grid battery deployments, and critical mineral supply chains (Lithium, Cobalt, Copper).',
    metrics: ['8.4 GW Capacity Mapped', '34 Mineral Corridors', 'Grid Outage Indices'],
    bullets: [
      'Captive solar ROI models across commercial manufacturing hubs',
      'Sub-Saharan Lithium spodumene extraction & export logistics',
      'Discom tariff trajectory & national grid downtime analytics',
      'Carbon credit verification & integrity audits across forestry assets'
    ],
    badge: 'CLEANTECH'
  },
  {
    id: 'logistics',
    code: '04',
    name: 'Supply Chain & Freight Corridors',
    tag: 'LOGISTICS',
    summary: 'Real-time telemetry on interstate trade corridors, customs clearance velocity, maritime choke points, and infrastructure debt project execution milestones.',
    metrics: ['14 Trade Corridors', '22 Maritime Terminals', 'Daily Bottleneck Index'],
    bullets: [
      'Lekki, Tema, and Durban container terminal turnaround times',
      'Border post dwell time analytics (Seme Border, Malaba, Beitbridge)',
      'Cross-border trucking freight rate indices per ton-kilometer',
      'Railway freight rehabilitation progress & tonnage throughput'
    ],
    badge: 'LIVE FREIGHT'
  }
];

const FEATURED_REPORTS = [
  {
    id: 'rep-01',
    slug: 'sub-saharan-solar-offgrid-storage-2026',
    title: 'Sub-Saharan Solar & Off-Grid Storage Outlook 2026–2030',
    sector: 'ENERGY',
    sectorId: 'energy',
    pages: 142,
    priceUSD: 1850,
    edition: 'Q3 2026 EDITION',
    leadAnalyst: 'Dr. K. Adebayo',
    isExcelIncluded: true,
    coverColor: '#0F172A',
    description: 'Comprehensive econometric forecast of captive commercial solar adoption, battery energy storage systems (BESS) levelized cost of electricity (LCOE), and regulatory tariff shifts across Nigeria, Kenya, South Africa, and Ghana.',
    keyTakeaways: [
      'Commercial & Industrial solar installations will displace 34% of diesel generator capacity across tier-1 industrial zones by 2028.',
      'Containerized lithium iron phosphate (LFP) storage costs dropped to $185/kWh landed, driving grid parity in 4 major economies.',
      'Sovereign sovereign guarantee structures are being superseded by bilateral corporate power purchase agreements (PPAs).'
    ]
  },
  {
    id: 'rep-02',
    slug: 'west-african-cocoa-cashew-supply-fragility',
    title: 'West African Cocoa & Cashew Supply Chain Fragility Assessment',
    sector: 'AGRICULTURE',
    sectorId: 'commodities',
    pages: 98,
    priceUSD: 1450,
    edition: 'BI-ANNUAL 2026',
    leadAnalyst: 'Amina Mansour',
    isExcelIncluded: true,
    coverColor: '#1E293B',
    description: 'Satellite radar moisture analysis, port congestion tracking, and EU Deforestation Regulation (EUDR) compliance telemetry across Côte d’Ivoire, Ghana, and Nigeria.',
    keyTakeaways: [
      'Over 62% of smallholder cocoa acreage in Western Ghana faces GPS plot polygon compliance gaps under EUDR enforcement deadlines.',
      'Farm-gate price inflation has driven cross-border arbitrage smuggling volumes up 18% along the Ivorian border.',
      'Mechanized processing capacity utilization in Nigeria remains constrained below 40% due to local currency working capital bottlenecks.'
    ]
  },
  {
    id: 'rep-03',
    slug: 'african-sovereign-debt-fx-liquidity-stress-test',
    title: 'African Sovereign Debt & FX Liquidity Stress Test 2026–2027',
    sector: 'MACROECONOMICS',
    sectorId: 'macro',
    pages: 176,
    priceUSD: 2400,
    edition: 'ANNUAL STRATEGIC',
    leadAnalyst: 'F. E. Okonkwo',
    isExcelIncluded: true,
    coverColor: '#070A10',
    description: 'Empirical balance of payments modeling, Eurobond repayment schedules, parallel market spread regression, and capital controls analysis across 14 high-debt African sovereigns.',
    keyTakeaways: [
      'Debt-service-to-revenue ratios in 7 monitored countries exceed 55%, necessitating pre-emptive domestic bond reprofiling.',
      'Central bank FX intervention capacity is forecasted to stabilize in West Africa as multilateral disbursement conditions are met.',
      'Corporate treasury hedging costs via non-deliverable forwards (NDFs) have peaked, creating window for structured trade finance.'
    ]
  },
  {
    id: 'rep-04',
    slug: 'critical-minerals-lithium-cobalt-export-corridors',
    title: 'Critical Minerals & Battery Value Chain Export Corridors',
    sector: 'LOGISTICS',
    sectorId: 'logistics',
    pages: 115,
    priceUSD: 1650,
    edition: 'Q2 2026 SPECIAL',
    leadAnalyst: 'T. M. Ndlovu',
    isExcelIncluded: true,
    coverColor: '#151D2A',
    description: 'Detailed analysis of the Lobito Corridor, Dar es Salaam port throughput, and inland lithium processing facilities across Zimbabwe, DRC, and Zambia.',
    keyTakeaways: [
      'Lobito Atlantic Railway throughput has reduced transit time from Katanga to the Atlantic by 18 days compared to Durban routing.',
      'Raw ore export bans in Zimbabwe and Namibia have triggered a 300% surge in domestic spodumene concentrator capital expenditure.',
      'Grid power unreliability remains the single largest operational expense for in-country lithium hydroxide refining facilities.'
    ]
  }
];

const INSIGHTS_FEED = [
  {
    id: 'ins-01',
    date: 'SEP 04, 2026',
    title: 'Lekki Port Terminal Turnaround Drops to 36 Hours as Rail Connectivity Accelerates',
    sector: 'LOGISTICS',
    author: 'T. M. Ndlovu',
    readTime: '5 MIN READ',
    image: 'assets/brand/digital_mockup.png',
    summary: 'Container dwell time and hinterland haulage velocity report from the Lagos maritime corridor.'
  },
  {
    id: 'ins-02',
    date: 'AUG 28, 2026',
    title: 'The Real Cocoa Deficit: Satellite Synthetic-Aperture Radar Disproves Official Harvest Estimates',
    sector: 'AGRITECH',
    author: 'Amina Mansour',
    readTime: '8 MIN READ',
    image: 'assets/brand/emblem_variations_grid.png',
    summary: 'Why official harvest projections overestimated bean yield across the Western Basin by over 140,000 metric tons.'
  },
  {
    id: 'ins-03',
    date: 'AUG 19, 2026',
    title: 'Central Bank Dollar Reserves vs Net Usable Liquidity: The $12B Discrepancy',
    sector: 'MACROECONOMICS',
    author: 'F. E. Okonkwo',
    readTime: '11 MIN READ',
    image: 'assets/brand/stationery_mockup.png',
    summary: 'A forensic dissection of swap liabilities, forward obligations, and actual deliverable foreign exchange reserves.'
  },
  {
    id: 'ins-04',
    date: 'AUG 12, 2026',
    title: 'The 2026 Off-Grid Industrial Solar Boom: LCOE Drops Below 9 Cents per kWh',
    sector: 'ENERGY',
    author: 'Dr. K. Adebayo',
    readTime: '6 MIN READ',
    image: 'assets/brand/digital_mockup.png',
    summary: 'How industrial manufacturers in Ogun and Kano are severing grid dependencies in favor of captive solar-hybrid microgrids.'
  }
];

const FAQS_DATA = [
  {
    num: '01',
    q: 'How does Renalytica verify its ground-truth data in markets with weak statistical agencies?',
    a: 'Renalytica does not rely solely on self-reported government data or secondary consensus aggregates. We operate proprietary ground verification hubs across 42 commercial nodes in Africa. Our sensor network collects physical customs manifests, truck axle counter readings, port gate logs, and high-resolution SAR satellite radar scans. All ingested data is cryptographically timestamped and passed through our econometric triangulation engine before being audited by our blind peer review panel.'
  },
  {
    num: '02',
    q: 'What is included when I purchase an Enterprise Research Intelligence Report?',
    a: 'Every intelligence package includes a publication-grade executive PDF briefing (typically 100–180 pages), the complete un-obfuscated Excel econometric model with underlying formula assumptions, quarterly data refresh supplements, and a direct 60-minute confidential briefing session with the lead sector analyst.'
  },
  {
    num: '03',
    q: 'What is the difference between Single-User, Corporate, and Global Site Licenses?',
    a: 'A Single-User License grants access to one designated executive reader. A Corporate License allows unrestricted sharing within your departmental business unit (up to 25 seats). A Global Site License permits company-wide distribution across all international subsidiaries, integration into internal intranet databases, and permission to cite extracted charts in investor presentations.'
  },
  {
    num: '04',
    q: 'Can Renalytica execute custom bespoke research and RFP advisory mandates?',
    a: 'Yes. Our Advisory Desk conducts confidential single-client mandates for sovereign wealth funds, multinational conglomerates, private equity sponsors, and multilateral development banks. We execute on-the-ground supply chain audits, pre-acquisition commercial due diligence, and regulatory risk assessments with strict conflict-of-interest firewalls.'
  },
  {
    num: '05',
    q: 'What currencies and payment mechanisms do you support for report purchases?',
    a: 'We accept credit/debit card checkout in USD, EUR, GBP, and NGN. For institutional enterprise orders exceeding $2,500, we provide net-15 corporate invoices payable via international SWIFT bank wire, UK BACS, or Nigerian NIP/NIBSS settlement.'
  }
];

// Universal Environment Export
if (typeof window !== 'undefined') {
  window.TELEMETRY_TICKER_ITEMS = TELEMETRY_TICKER_ITEMS;
  window.CURRENCY_RATES = CURRENCY_RATES;
  window.MACRO_SECTORS = MACRO_SECTORS;
  window.FEATURED_REPORTS = FEATURED_REPORTS;
  window.INSIGHTS_FEED = INSIGHTS_FEED;
  window.FAQS_DATA = FAQS_DATA;
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    TELEMETRY_TICKER_ITEMS,
    CURRENCY_RATES,
    MACRO_SECTORS,
    FEATURED_REPORTS,
    INSIGHTS_FEED,
    FAQS_DATA
  };
}
