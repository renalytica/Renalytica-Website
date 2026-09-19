/**
 * ==============================================================================
 * RENALYTICA STRATEGIC PARTNERS TICKER & MARQUEE COMPONENT (components/PartnerTicker.js)
 * ==============================================================================
 * Features official brand partners:
 * 1. United Carriers (Freight & Logistics)
 * 2. AXiA Active (Performance Wear & Wellness)
 * 3. GoFar International Academy (Global Education & STEM)
 * ==============================================================================
 */

class PartnerTicker extends HTMLElement {
  connectedCallback() {
    this.render();
    this._onUpdate = () => this.render();
    window.addEventListener('renalytica_partners_updated', this._onUpdate);
    window.addEventListener('storage', this._onUpdate);
  }

  disconnectedCallback() {
    if (this._onUpdate) {
      window.removeEventListener('renalytica_partners_updated', this._onUpdate);
      window.removeEventListener('storage', this._onUpdate);
    }
  }

  render() {
    let partners = [
      {
        name: 'United Carriers',
        tagline: 'Pan-African Freight & Cold-Chain Logistics',
        logo: 'assets/partners/united-carriers-logo.svg',
        url: 'partners.html#united-carriers',
        externalUrl: 'https://unitedcarriers.com'
      },
      {
        name: 'AXiA Active',
        tagline: 'Athletic Gear, Activewear & Wellness Retail',
        logo: 'assets/partners/axia-active-logo.png',
        url: 'partners.html#axia-active',
        externalUrl: 'https://axiaactive.com'
      },
      {
        name: 'GoFar International Academy',
        tagline: 'Accredited STEM Education & Leadership Academy',
        logo: 'assets/partners/gofar-academy-logo.webp',
        url: 'partners.html#gofar-academy',
        externalUrl: 'https://gofarinternationalacademy.com'
      },
      {
        name: 'TradingView',
        tagline: 'Institutional Charting & Telemetry Engine',
        logo: 'assets/partners/tradingview-logo.svg',
        url: 'partners.html#tradingview',
        externalUrl: 'https://www.tradingview.com'
      },
      {
        name: 'Finnhub',
        tagline: 'Real-Time WebSocket Trade & Quote Telemetry',
        logo: 'assets/partners/finnhub-logo.svg',
        url: 'partners.html#finnhub',
        externalUrl: 'https://finnhub.io'
      },
      {
        name: 'Financial Modeling Prep (FMP)',
        tagline: 'African & Frontier Market Telemetry API',
        logo: 'assets/partners/fmp-logo.svg',
        url: 'partners.html#fmp',
        externalUrl: 'https://site.financialmodelingprep.com'
      },
      {
        name: 'Alpha Vantage',
        tagline: 'Global Commodity Benchmarks & Macro Metrics',
        logo: 'assets/partners/alphavantage-logo.svg',
        url: 'partners.html#alphavantage',
        externalUrl: 'https://www.alphavantage.co'
      },
      {
        name: 'Sharp API',
        tagline: 'Live Sports Business Intelligence & Analytics',
        logo: 'assets/partners/sharpapi-logo.svg',
        url: 'partners.html#sharpapi',
        externalUrl: 'https://sharpapi.com'
      }
    ];

    try {
      const raw = localStorage.getItem('renalytica_partners');
      if (raw) {
        let parsed = JSON.parse(raw);
        if (Array.isArray(parsed) && parsed.length > 0) {
          // If stored cache is missing telemetry partners, upgrade it
          if (parsed.length < 8) {
            const existingIds = new Set(parsed.map(p => p.id));
            const defaultsToAdd = [
              { id: 'tradingview', name: 'TradingView', tagline: 'Institutional Charting & Telemetry Engine', logoUrl: 'assets/partners/tradingview-logo.svg', websiteUrl: 'https://www.tradingview.com', status: 'published' },
              { id: 'finnhub', name: 'Finnhub', tagline: 'Real-Time WebSocket Trade & Quote Telemetry', logoUrl: 'assets/partners/finnhub-logo.svg', websiteUrl: 'https://finnhub.io', status: 'published' },
              { id: 'fmp', name: 'Financial Modeling Prep (FMP)', tagline: 'African & Frontier Market Telemetry API', logoUrl: 'assets/partners/fmp-logo.svg', websiteUrl: 'https://site.financialmodelingprep.com', status: 'published' },
              { id: 'alphavantage', name: 'Alpha Vantage', tagline: 'Global Commodity Benchmarks & Macro Metrics', logoUrl: 'assets/partners/alphavantage-logo.svg', websiteUrl: 'https://www.alphavantage.co', status: 'published' },
              { id: 'sharpapi', name: 'Sharp API', tagline: 'Live Sports Business Intelligence & Analytics', logoUrl: 'assets/partners/sharpapi-logo.svg', websiteUrl: 'https://sharpapi.com', status: 'published' }
            ].filter(d => !existingIds.has(d.id));
            if (defaultsToAdd.length > 0) {
              parsed = [...parsed, ...defaultsToAdd];
              try { localStorage.setItem('renalytica_partners', JSON.stringify(parsed)); } catch(e){}
            }
          }
          const published = parsed.filter(p => p.status !== 'draft');
          if (published.length > 0) {
            partners = published.map(p => ({
              name: p.name,
              tagline: p.tagline || p.sector || 'Strategic Alliance Partner',
              logo: p.logoUrl || 'assets/brand/renalytica_emblem.png',
              url: `partners.html#${p.id || ''}`,
              externalUrl: p.websiteUrl || '#'
            }));
          }
        }
      }
    } catch (e) {}

    const generatePartnerCards = () => {
      return partners.map(p => `
        <a href="${p.url}" class="partner-marquee-card" title="${p.name} — ${p.tagline}">
          <div class="partner-logo-box">
            <img src="${p.logo}" alt="${p.name}" class="partner-img" loading="lazy">
          </div>
          <div class="partner-meta-box">
            <strong class="partner-name">${p.name}</strong>
            <span class="partner-tagline">${p.tagline}</span>
          </div>
        </a>
      `).join('');
    };

    const cardsHtml = generatePartnerCards();

    this.innerHTML = `
      <style>
        .partner-ticker-section {
          width: 100%;
          background: var(--surface-gray, #F8FAFC);
          border-top: 1px solid var(--border-light, #E2E8F0);
          border-bottom: 1px solid var(--border-light, #E2E8F0);
          padding: 1.5rem 0;
          overflow: hidden;
          position: relative;
        }

        [data-theme="dark"] .partner-ticker-section {
          background: #090E1A;
          border-top-color: rgba(255, 255, 255, 0.08);
          border-bottom-color: rgba(255, 255, 255, 0.08);
        }

        .partner-ticker-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          max-width: 1240px;
          margin: 0 auto 1rem;
          padding: 0 1.5rem;
        }

        .partner-ticker-title {
          font-family: var(--font-mono, monospace);
          font-size: 0.72rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.12em;
          color: var(--text-tertiary, #64748B);
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .partner-ticker-title .live-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #10B981;
          box-shadow: 0 0 8px #10B981;
        }

        .partner-view-all-link {
          font-size: 0.78rem;
          font-weight: 700;
          color: var(--accent-momentum, #FF8000);
          text-decoration: none;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: gap 0.2s ease;
        }

        .partner-view-all-link:hover {
          gap: 7px;
          text-decoration: underline;
        }

        .partner-marquee-track {
          display: flex;
          overflow: hidden;
          user-select: none;
          mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
          -webkit-mask-image: linear-gradient(to right, transparent, black 10%, black 90%, transparent);
        }

        .partner-marquee-group {
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: space-around;
          min-width: 100%;
          gap: 2rem;
          padding: 0 1rem;
          animation: partnerScroll 26s linear infinite;
        }

        .partner-marquee-track:hover .partner-marquee-group {
          animation-play-state: paused;
        }

        @keyframes partnerScroll {
          from { transform: translateX(0); }
          to { transform: translateX(-100%); }
        }

        .partner-marquee-card {
          display: inline-flex;
          align-items: center;
          gap: 14px;
          background: var(--canvas-surface, #FFFFFF);
          border: 1px solid var(--border-light, #E2E8F0);
          border-radius: 12px;
          padding: 0.75rem 1.4rem;
          text-decoration: none;
          color: inherit;
          box-shadow: 0 2px 10px rgba(0,0,0,0.03);
          transition: all 0.25s ease;
          min-width: 280px;
        }

        [data-theme="dark"] .partner-marquee-card {
          background: #101626;
          border-color: rgba(255, 255, 255, 0.08);
          box-shadow: 0 4px 16px rgba(0,0,0,0.3);
        }

        .partner-marquee-card:hover {
          transform: translateY(-2px);
          border-color: var(--accent-momentum, #FF8000);
          box-shadow: 0 8px 24px rgba(255, 128, 0, 0.15);
        }

        .partner-logo-box {
          width: 52px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(255, 255, 255, 0.9);
          border-radius: 6px;
          padding: 4px;
          border: 1px solid rgba(0,0,0,0.06);
        }

        [data-theme="dark"] .partner-logo-box {
          background: rgba(255, 255, 255, 0.95);
        }

        .partner-img {
          max-width: 100%;
          max-height: 100%;
          object-fit: contain;
        }

        .partner-meta-box {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .partner-name {
          font-size: 0.88rem;
          font-weight: 800;
          color: var(--text-primary, #0A0A0A);
          letter-spacing: -0.01em;
        }

        [data-theme="dark"] .partner-name {
          color: #F8FAFC;
        }

        .partner-tagline {
          font-size: 0.72rem;
          color: var(--text-secondary, #64748B);
          font-family: var(--font-primary, sans-serif);
          white-space: nowrap;
        }

        .partner-inquiry-badge {
          transition: all 0.2s ease;
        }
        .partner-inquiry-badge:hover {
          background: rgba(56, 189, 248, 0.2) !important;
          border-color: #38BDF8 !important;
          transform: translateY(-1px);
        }
      </style>

      <section class="partner-ticker-section" aria-label="Strategic Enterprise Partners">
        <div class="partner-ticker-header">
          <div class="partner-ticker-title">
            <span class="live-dot"></span>
            <span>STRATEGIC ALLIANCES &amp; ENTERPRISE PARTNERS</span>
          </div>
          <div style="display: flex; align-items: center; gap: 12px; flex-wrap: wrap;">
            <a href="mailto:partnerships@renalytica.com" class="partner-inquiry-badge" style="font-size: 0.72rem; color: #38BDF8; background: rgba(56, 189, 248, 0.1); border: 1px solid rgba(56, 189, 248, 0.3); padding: 4px 12px; border-radius: 9999px; text-decoration: none; font-weight: 600; display: inline-flex; align-items: center; gap: 5px;">
              <span>🤝</span> Partner with Renalytica &bull; partnerships@renalytica.com
            </a>
            <a href="partners.html" class="partner-view-all-link">
              Explore All Alliances →
            </a>
          </div>
        </div>

        <div class="partner-marquee-track">
          <div class="partner-marquee-group">
            ${cardsHtml}
            ${cardsHtml}
          </div>
          <div class="partner-marquee-group" aria-hidden="true">
            ${cardsHtml}
            ${cardsHtml}
          </div>
        </div>
      </section>
    `;
  }
}

if (!customElements.get('partner-ticker')) {
  customElements.define('partner-ticker', PartnerTicker);
}

if (typeof window !== 'undefined') {
  window.PartnerTicker = PartnerTicker;
}
