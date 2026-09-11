/**
 * RENALYTICA TOP UTILITY TICKER BAR
 * Implements Section 2 & 4 of 01_HOME_PAGE_CONTENT.md
 * Direct Desk, WhatsApp, Currency Selector, and Key Benchmark Economic Indicators.
 */

const TICKER_ITEMS_V2 = [
  { symbol: 'AGRICULTURE INDEX', value: '142.85', change: '+2.4%', note: '(Steady harvest supply)', dir: 'up' },
  { symbol: 'REGIONAL INFLATION TRACKER', value: '18.20', change: '-0.6%', note: '(Easing pressure)', dir: 'down' },
  { symbol: 'RETAIL TRADE VELOCITY', value: '312.40', change: '+1.8%', note: '(Consumer demand rising)', dir: 'up' },
  { symbol: 'CROSS-BORDER FREIGHT INDEX', value: '98.15', change: '+0.9%', note: '(Corridors active)', dir: 'up' },
  { symbol: 'COMMODITY PRICE COMPOSITE', value: '204.60', change: '-0.3%', note: '(Stable inputs)', dir: 'down' }
];

const TICKER_CURRENCY_RATES = {
  USD: { symbol: '$', rate: 1.0, label: 'USD ($)' },
  EUR: { symbol: '€', rate: 0.92, label: 'EUR (€)' },
  GBP: { symbol: '£', rate: 0.78, label: 'GBP (£)' },
  NGN: { symbol: '₦', rate: 1480.0, label: 'NGN (₦)' }
};

class TickerBar extends HTMLElement {
  connectedCallback() {
    this.render();
    this.bindEvents();
  }

  render() {
    const tickerContent = TICKER_ITEMS_V2.map(item => `
      <div class="ticker-pill">
        <span class="ticker-symbol">${item.symbol}:</span>
        <span class="ticker-val">${item.value}</span>
        <span class="ticker-change ${item.dir}">${item.dir === 'up' ? '▲' : '▼'} ${item.change}</span>
        <span class="ticker-note">${item.note}</span>
      </div>
    `).join('');

    this.innerHTML = `
      <div class="ticker-container">
        <!-- Direct Contact & WhatsApp -->
        <div class="ticker-contact-fast">
          <a href="https://wa.me/2348137538723" target="_blank" class="contact-pill" title="Chat on WhatsApp">
            <span class="pulse-dot-green"></span> WhatsApp: +234 813 753 8723
          </a>
          <span class="ticker-sep">|</span>
          <a href="mailto:info@renalytica.com" class="contact-pill">info@renalytica.com</a>
        </div>

        <!-- Center Running Marquee -->
        <div class="ticker-marquee-track">
          <div class="ticker-group">${tickerContent}</div>
          <div class="ticker-group" aria-hidden="true">${tickerContent}</div>
        </div>

        <!-- Currency Selector & Corporate Portal -->
        <div class="ticker-actions">
          <div class="currency-selector-group">
            <span class="currency-label">CURRENCY:</span>
            <button class="curr-btn active" data-currency="USD">USD ($)</button>
            <button class="curr-btn" data-currency="EUR">EUR (€)</button>
            <button class="curr-btn" data-currency="GBP">GBP (£)</button>
            <button class="curr-btn" data-currency="NGN">NGN (₦)</button>
          </div>
          <a href="contact.html" class="portal-pill">
            <span class="portal-icon">🔒</span> CLIENT LOGIN
          </a>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const buttons = this.querySelectorAll('.curr-btn');
    buttons.forEach(btn => {
      btn.addEventListener('click', () => {
        buttons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const currency = btn.getAttribute('data-currency');
        const rateObj = (typeof CURRENCY_RATES !== 'undefined' ? CURRENCY_RATES : TICKER_CURRENCY_RATES)[currency];
        window.dispatchEvent(new CustomEvent('renalytica:currency-change', {
          detail: { currency, rate: rateObj }
        }));
      });
    });
  }
}

if (typeof window !== 'undefined') {
  window.TickerBar = TickerBar;
  window.TICKER_ITEMS_V2 = TICKER_ITEMS_V2;
}

if (!customElements.get('ticker-bar')) {
  customElements.define('ticker-bar', TickerBar);
}
