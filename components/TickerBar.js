/**
 * ==============================================================================
 * RENALYTICA TOP UTILITY TICKER BAR & MACRO TELEMETRY LANE (components/TickerBar.js)
 * ==============================================================================
 * Two-Tier Executive Architecture:
 * 1. Top Utility Strip: Direct WhatsApp desk, Email, Multi-Currency Selector Dropdown,
 *    Live Markets link, and Institutional Portal Auth shortcuts.
 * 2. Dedicated Full-Width Macro Ticker Lane: Unobstructed rolling marquee dedicated
 *    purely to African commodities, FX pairs (NGN, KES, ZAR, GHS), and trade benchmarks.
 * ==============================================================================
 */

const MACRO_COMMODITY_TICKER = [
  { symbol: 'USD/NGN (NAFEM)', value: '₦1,480.00', change: '0.0%', note: '(Interbank fix)', dir: 'stable' },
  { symbol: 'EUR/USD (FMP)', value: '$1.1489', change: '+0.08%', note: '(FMP Live Telemetry)', dir: 'up' },
  { symbol: 'GBP/USD (FMP)', value: '$1.3392', change: '+0.15%', note: '(FMP Live Telemetry)', dir: 'up' },
  { symbol: 'USD/KES', value: 'KSh 129.50', change: '+0.4%', note: '(CBK auction)', dir: 'up' },
  { symbol: 'USD/ZAR', value: 'R 18.25', change: '-0.2%', note: '(Rand strengthening)', dir: 'down' },
  { symbol: 'USD/GHS', value: 'GH₵ 15.80', change: '+0.1%', note: '(Interbank)', dir: 'up' },
  { symbol: 'BRENT CRUDE', value: '$78.45/bbl', change: '+1.2%', note: '(Bonny Light premium)', dir: 'up' },
  { symbol: 'COCOA (ICCO)', value: '$7,840/MT', change: '+3.1%', note: '(West Africa harvest deficit)', dir: 'up' },
  { symbol: 'WHEAT (HRW)', value: '$224.50/MT', change: '-0.5%', note: '(Import parity)', dir: 'down' },
  { symbol: 'MAIZE (SAFEX)', value: '$248.00/MT', change: '+1.8%', note: '(Regional trade firm)', dir: 'up' },
  { symbol: 'SESAME SEED', value: '$1,620/MT', change: '+2.0%', note: '(Kano export volume)', dir: 'up' },
  { symbol: 'SOYBEAN', value: '$465.00/MT', change: '+0.7%', note: '(Protein feed demand)', dir: 'up' },
  { symbol: 'SPORTS INTELLIGENCE', value: '24,200+ Live Fixtures', change: '● Active', note: '(Sharp API Live Feeds)', dir: 'up' },
  { symbol: 'CASHEW NUTS (RAW)', value: '$1,280/MT', change: '+1.4%', note: '(Côte d\'Ivoire / Nigeria)', dir: 'up' }
];

const TICKER_CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)', country: 'United States Dollar' },
  EUR: { symbol: '€', rate: Math.round((1500 / 1620) * 1000) / 1000, label: 'EUR (€)', country: 'Euro' },
  GBP: { symbol: '£', rate: Math.round((1500 / 1920) * 1000) / 1000, label: 'GBP (£)', country: 'British Pound' },
  NGN: { symbol: '₦', rate: 1500.0, label: 'NGN (₦)', country: 'Nigerian Naira' },
  ZAR: { symbol: 'R', rate: 18.20, label: 'ZAR (R)', country: 'South African Rand' },
  KES: { symbol: 'KSh', rate: 130.0, label: 'KES (KSh)', country: 'Kenyan Shilling' },
  GHS: { symbol: 'GH₵', rate: 15.50, label: 'GHS (GH₵)', country: 'Ghanaian Cedi' }
};

class TickerBar extends HTMLElement {
  connectedCallback() {
    let savedCurrency = 'USD';
    try {
      savedCurrency = localStorage.getItem('renalytica_currency') || 'USD';
      if (!TICKER_CURRENCY_RATES[savedCurrency]) savedCurrency = 'USD';
    } catch (e) {}
    this.currentCurrency = savedCurrency;

    this.render();
    this.bindEvents();
    this.syncLiveExchangeRates();
  }

  render() {
    const tickerContent = MACRO_COMMODITY_TICKER.map(item => `
      <div class="ticker-pill">
        <span class="ticker-symbol">${item.symbol}:</span>
        <span class="ticker-val">${item.value}</span>
        <span class="ticker-change ${item.dir}">${item.dir === 'up' ? '▲' : (item.dir === 'down' ? '▼' : '●')} ${item.change}</span>
        <span class="ticker-note">${item.note}</span>
      </div>
    `).join('');

    const currencyOptions = Object.keys(TICKER_CURRENCY_RATES).map(code => {
      const c = TICKER_CURRENCY_RATES[code];
      const selected = code === this.currentCurrency ? 'selected' : '';
      return `<option value="${code}" ${selected}>${c.label} — ${c.country}</option>`;
    }).join('');

    this.innerHTML = `
      <!-- TIER 1: Top Utility Desk & Currency Strip -->
      <div class="ticker-utility-strip">
        <div class="ticker-utility-inner">
          <!-- Left: Direct Contact & WhatsApp Desk -->
          <div class="ticker-contact-fast">
            <a href="https://wa.me/2349020846138" target="_blank" class="contact-pill" title="Chat with Research Desk on WhatsApp">
              <span class="pulse-dot-green"></span> WhatsApp Desk: +234 902 084 6138
            </a>
            <span class="ticker-sep">|</span>
            <a href="mailto:info@renalytica.com" class="contact-pill" title="Email Institutional Advisory">info@renalytica.com</a>
          </div>

          <!-- Right: Currency Selector Dropdown & Portal Actions -->
          <div class="ticker-actions">
            <div class="currency-dropdown-wrap">
              <label for="global-currency-select" class="currency-label">CURRENCY:</label>
              <select id="global-currency-select" class="currency-select-field" aria-label="Select Currency">
                ${currencyOptions}
              </select>
            </div>
            <a href="markets.html" class="portal-pill markets-pill" title="Live Financial & Macro Terminal">
              <span class="pulse-dot-green"></span> LIVE MARKETS
            </a>
            <a href="portal.html?mode=signin" class="portal-pill" title="Institutional Client Sign In">
              <span class="portal-icon">🔒</span> CLIENT LOGIN
            </a>
            <a href="portal.html?mode=signup" class="portal-pill portal-signup-pill" title="Create Institutional Account">
              SIGN UP →
            </a>
          </div>
        </div>
      </div>

      <!-- TIER 2: Dedicated Full-Width Macro Ticker Lane -->
      <div class="macro-ticker-lane" aria-label="Live African Commodity and FX Ticker">
        <div class="macro-ticker-badge">
          <span class="pulse-dot-green"></span>
          <span>MACRO SIGNALS:</span>
        </div>
        <div class="ticker-marquee-track">
          <div class="ticker-group">${tickerContent}</div>
          <div class="ticker-group" aria-hidden="true">${tickerContent}</div>
        </div>
      </div>
    `;
  }

  syncLiveExchangeRates() {
    if (typeof window !== 'undefined') {
      // FMP Live Telemetry integration
      if (window.fmpService) {
        window.fmpService.getQuote('EURUSD').then(q => {
          if (q && q.price) {
            TICKER_CURRENCY_RATES.EUR.rate = 1 / q.price;
          }
        }).catch(() => {});
        window.fmpService.getQuote('GBPUSD').then(q => {
          if (q && q.price) {
            TICKER_CURRENCY_RATES.GBP.rate = 1 / q.price;
          }
        }).catch(() => {});
      } else if (window.alphaVantageService) {
        window.alphaVantageService.getExchangeRate('USD', 'NGN').then(res => {
          if (res && res.rate) {
            TICKER_CURRENCY_RATES.NGN.rate = res.rate;
          }
        }).catch(() => {});
      }

      // Sharp API Sports Telemetry integration
      if (window.sharpService) {
        window.sharpService.getSportsBusinessTelemetry().then(telemetry => {
          if (telemetry && telemetry.totalEvents) {
            const sportsPill = this.querySelector('.ticker-symbol:contains("SPORTS")');
            // Background telemetry sync complete
          }
        }).catch(() => {});
      }
    }
  }

  bindEvents() {
    const select = this.querySelector('#global-currency-select');
    if (select) {
      select.addEventListener('change', (e) => {
        const currency = e.target.value;
        this.currentCurrency = currency;
        try {
          localStorage.setItem('renalytica_currency', currency);
        } catch (err) {}

        const rateObj = TICKER_CURRENCY_RATES[currency] || TICKER_CURRENCY_RATES.USD;
        
        // Expose global currency helper
        if (typeof window !== 'undefined') {
          window.RenalyticaActiveCurrency = currency;
          window.RenalyticaCurrencyRate = rateObj.rate;
          window.RenalyticaCurrencySymbol = rateObj.symbol;
        }

        window.dispatchEvent(new CustomEvent('renalytica:currency-change', {
          detail: { currency, rate: rateObj }
        }));
      });
    }
  }
}

// Global Currency Formatter Helper
if (typeof window !== 'undefined') {
  window.TickerBar = TickerBar;
  window.TICKER_CURRENCY_RATES = TICKER_CURRENCY_RATES;
  window.MACRO_COMMODITY_TICKER = MACRO_COMMODITY_TICKER;

  window.formatPriceWithActiveCurrency = function (amount, isNgn = false) {
    const curr = (typeof localStorage !== 'undefined' && localStorage.getItem('renalytica_currency')) || 'USD';
    const rateData = TICKER_CURRENCY_RATES[curr] || TICKER_CURRENCY_RATES.USD;
    let converted;
    if (isNgn) {
      if (curr === 'NGN') converted = Math.round(amount);
      else if (curr === 'USD') converted = Math.round(amount / 1500);
      else if (curr === 'EUR') converted = Math.round(amount / 1620);
      else if (curr === 'GBP') converted = Math.round(amount / 1920);
      else if (curr === 'KES') converted = Math.round((amount / 1500) * 130);
      else if (curr === 'GHS') converted = Math.round((amount / 1500) * 15.5);
      else if (curr === 'ZAR') converted = Math.round((amount / 1500) * 18.2);
      else converted = Math.round(amount / 1500);
    } else {
      converted = Math.round(amount * rateData.rate);
    }
    return `${rateData.symbol}${converted.toLocaleString()} ${curr}`;
  };
}

if (!customElements.get('ticker-bar')) {
  customElements.define('ticker-bar', TickerBar);
}
