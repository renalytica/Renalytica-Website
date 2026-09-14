/**
 * RENALYTICA FINNHUB LIVE STREAMING SERVICE
 * Connects to Finnhub native WebSocket API for real-time tick-by-tick trade data.
 * Zero webhook dependencies, zero server backend required.
 */

const FINNHUB_API_KEY = 'dafqh3pr01quvmmh1amgdafqh3pr01quvmmh1an0';
const FINNHUB_WS_URL = `wss://ws.finnhub.io?token=${FINNHUB_API_KEY}`;
const FINNHUB_REST_BASE = 'https://finnhub.io/api/v1';

class FinnhubLiveStream {
  constructor() {
    this.socket = null;
    this.isConnected = false;
    this.subscribedSymbols = ['AAPL', 'BINANCE:BTCUSDT', 'BINANCE:ETHUSDT', 'OANDA:EUR_USD'];
    this.listeners = new Map();
    this.reconnectAttempts = 0;
    this.maxReconnectAttempts = 5;
    this.prices = new Map();
  }

  /**
   * Initialize WebSocket connection
   */
  init() {
    if (typeof window === 'undefined' || typeof WebSocket === 'undefined') return;

    try {
      this.socket = new WebSocket(FINNHUB_WS_URL);

      this.socket.addEventListener('open', () => {
        this.isConnected = true;
        this.reconnectAttempts = 0;
        this.updateConnectionBadge(true);

        // Subscribe to default symbols
        this.subscribedSymbols.forEach(symbol => {
          this.subscribe(symbol);
        });

        window.dispatchEvent(new CustomEvent('renalytica:finnhub-connected'));
      });

      this.socket.addEventListener('message', (event) => {
        try {
          const data = JSON.parse(event.data);
          if (data.type === 'trade' && Array.isArray(data.data)) {
            data.data.forEach(trade => {
              this.handleTrade(trade);
            });
          }
        } catch (err) {
          console.warn('[Finnhub] Message parsing error:', err);
        }
      });

      this.socket.addEventListener('close', () => {
        this.isConnected = false;
        this.updateConnectionBadge(false);
        this.attemptReconnect();
      });

      this.socket.addEventListener('error', (err) => {
        console.warn('[Finnhub] WebSocket error:', err);
        this.isConnected = false;
        this.updateConnectionBadge(false);
      });
    } catch (e) {
      console.warn('[Finnhub] Connection initialization error:', e);
    }
  }

  subscribe(symbol) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'subscribe', symbol }));
    }
  }

  unsubscribe(symbol) {
    if (this.socket && this.socket.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify({ type: 'unsubscribe', symbol }));
    }
  }

  handleTrade(trade) {
    const { s: symbol, p: price, t: timestamp, v: volume } = trade;
    const prevPrice = this.prices.get(symbol);
    const direction = prevPrice ? (price > prevPrice ? 'up' : price < prevPrice ? 'down' : 'same') : 'same';
    
    this.prices.set(symbol, price);

    const detail = { symbol, price, prevPrice, direction, timestamp, volume };

    // Dispatch global event
    window.dispatchEvent(new CustomEvent('renalytica:live-tick', { detail }));

    // Update target DOM elements with class or data attribute
    this.updateDomTick(detail);
  }

  updateDomTick({ symbol, price, direction }) {
    const cleanId = symbol.replace(/[^a-zA-Z0-9]/g, '_');
    const elPrice = document.querySelectorAll(`[data-finnhub-price="${symbol}"], #tick-price-${cleanId}`);
    const elDir = document.querySelectorAll(`[data-finnhub-dir="${symbol}"]`);

    elPrice.forEach(el => {
      const formatted = price > 1000 ? price.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 }) : price.toFixed(4);
      el.textContent = `$${formatted}`;
      el.classList.remove('tick-flash-up', 'tick-flash-down');
      void el.offsetWidth; // Trigger DOM reflow
      el.classList.add(direction === 'up' ? 'tick-flash-up' : 'tick-flash-down');
    });

    elDir.forEach(el => {
      el.textContent = direction === 'up' ? '▲' : '▼';
      el.className = `tick-dir ${direction}`;
    });
  }

  updateConnectionBadge(connected) {
    const badges = document.querySelectorAll('.finnhub-status-badge');
    badges.forEach(badge => {
      badge.innerHTML = connected 
        ? `<span class="pulse-green-dot"></span> <span class="badge-text">FINNHUB LIVE STREAM: ACTIVE</span>`
        : `<span class="pulse-amber-dot"></span> <span class="badge-text">FINNHUB STREAM: RECONNECTING</span>`;
      badge.className = `finnhub-status-badge ${connected ? 'connected' : 'reconnecting'}`;
    });
  }

  attemptReconnect() {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      const delay = Math.min(1000 * Math.pow(2, this.reconnectAttempts), 30000);
      setTimeout(() => this.init(), delay);
    }
  }

  /**
   * REST API Helper: Fetch latest stock quote (AAPL, etc.)
   */
  async fetchQuote(symbol = 'AAPL') {
    try {
      const res = await fetch(`${FINNHUB_REST_BASE}/quote?symbol=${encodeURIComponent(symbol)}&token=${FINNHUB_API_KEY}`);
      if (!res.ok) throw new Error(`Finnhub quote error: ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn(`[Finnhub] Failed to fetch quote for ${symbol}:`, e);
      return null;
    }
  }

  /**
   * REST API Helper: Fetch market news
   */
  async fetchMarketNews(category = 'general') {
    try {
      const res = await fetch(`${FINNHUB_REST_BASE}/news?category=${encodeURIComponent(category)}&token=${FINNHUB_API_KEY}`);
      if (!res.ok) throw new Error(`Finnhub news error: ${res.status}`);
      return await res.json();
    } catch (e) {
      console.warn('[Finnhub] Failed to fetch market news:', e);
      return [];
    }
  }
}

// Global Singleton
if (typeof window !== 'undefined') {
  window.finnhubStream = new FinnhubLiveStream();
}
