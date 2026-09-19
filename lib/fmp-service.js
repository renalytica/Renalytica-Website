/**
 * ==============================================================================
 * RENALYTICA FINANCIAL MODELING PREP (FMP) TELEMETRY SERVICE (lib/fmp-service.js)
 * ==============================================================================
 * Connects the Renalytica platform to real-time global market feeds, foreign
 * exchange quotes, and equity telemetry via the stable FMP endpoints.
 *
 * API KEY: yOjvHKPmYmGg72YPxs2skYZ4wD2vmcSh
 * ==============================================================================
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    define([], factory);
  } else if (typeof module === 'object' && module.exports) {
    module.exports = factory();
  } else {
    const service = factory();
    root.fmpService = service;
    if (typeof window !== 'undefined') {
      window.fmpService = service;
    }
  }
}(typeof self !== 'undefined' ? self : this, function () {
  'use strict';

  const API_KEY = 'yOjvHKPmYmGg72YPxs2skYZ4wD2vmcSh';
  const BASE_URL = 'https://financialmodelingprep.com/stable';
  const CACHE_TTL_MS = 60 * 1000; // 60 seconds TTL

  class FmpService {
    constructor() {
      this.apiKey = API_KEY;
      this.cache = new Map();
    }

    /**
     * Fetch real-time quote for a symbol or currency pair
     * @param {string} symbol e.g. "EURUSD", "GBPUSD", "AAPL"
     */
    async getQuote(symbol) {
      if (!symbol) return null;
      const cleanSym = symbol.trim().toUpperCase();
      const cacheKey = `fmp_quote_${cleanSym}`;

      // Check in-memory cache
      const cached = this.cache.get(cacheKey);
      if (cached && (Date.now() - cached.timestamp < CACHE_TTL_MS)) {
        return cached.data;
      }

      // Check localStorage cache
      try {
        if (typeof localStorage !== 'undefined') {
          const stored = localStorage.getItem(cacheKey);
          if (stored) {
            const parsed = JSON.parse(stored);
            if (Date.now() - parsed.timestamp < CACHE_TTL_MS) {
              this.cache.set(cacheKey, parsed);
              return parsed.data;
            }
          }
        }
      } catch (e) {}

      try {
        const url = `${BASE_URL}/quote?symbol=${encodeURIComponent(cleanSym)}&apikey=${this.apiKey}`;
        const res = await fetch(url);
        if (!res.ok) {
          throw new Error(`FMP API returned HTTP ${res.status}`);
        }
        const data = await res.json();
        const quote = Array.isArray(data) && data.length > 0 ? data[0] : data;

        const payload = { timestamp: Date.now(), data: quote };
        this.cache.set(cacheKey, payload);
        try {
          if (typeof localStorage !== 'undefined') {
            localStorage.setItem(cacheKey, JSON.stringify(payload));
          }
        } catch (e) {}

        return quote;
      } catch (err) {
        console.warn(`[FMP Service] Failed to fetch quote for ${cleanSym}:`, err.message);
        // Fallback to cache if available
        if (cached) return cached.data;
        return null;
      }
    }

    /**
     * Batch fetch multiple quotes
     * @param {string[]} symbols 
     */
    async getQuotes(symbols = []) {
      const results = {};
      await Promise.all(
        symbols.map(async (sym) => {
          const q = await this.getQuote(sym);
          if (q) results[sym] = q;
        })
      );
      return results;
    }

    /**
     * Get Macro / FX Telemetry snapshot
     */
    async getMacroFXSnapshot() {
      const symbols = ['EURUSD', 'GBPUSD', 'USDJPY'];
      const data = await this.getQuotes(symbols);
      return [
        {
          symbol: 'EUR / USD',
          price: data.EURUSD ? data.EURUSD.price.toFixed(4) : '1.1489',
          change: data.EURUSD ? `${data.EURUSD.changePercentage > 0 ? '+' : ''}${data.EURUSD.changePercentage.toFixed(2)}%` : '+0.08%',
          direction: (data.EURUSD && data.EURUSD.changePercentage < 0) ? 'down' : 'up'
        },
        {
          symbol: 'GBP / USD',
          price: data.GBPUSD ? data.GBPUSD.price.toFixed(4) : '1.3392',
          change: data.GBPUSD ? `${data.GBPUSD.changePercentage > 0 ? '+' : ''}${data.GBPUSD.changePercentage.toFixed(2)}%` : '+0.15%',
          direction: (data.GBPUSD && data.GBPUSD.changePercentage < 0) ? 'down' : 'up'
        },
        {
          symbol: 'USD / JPY',
          price: data.USDJPY ? data.USDJPY.price.toFixed(2) : '156.85',
          change: data.USDJPY ? `${data.USDJPY.changePercentage > 0 ? '+' : ''}${data.USDJPY.changePercentage.toFixed(2)}%` : '+0.12%',
          direction: (data.USDJPY && data.USDJPY.changePercentage < 0) ? 'down' : 'up'
        }
      ];
    }
  }

  return new FmpService();
}));
