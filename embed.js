/**
 * ==============================================================================
 * RENALYTICA PAYHIP-STYLE EMBEDDABLE CHECKOUT ENGINE (embed.js)
 * ==============================================================================
 * Allows external B2B blogs, institutional portals, and partner media sites to
 * embed 1-click report acquisition buttons, pricing cards, or full checkout overlays.
 * ==============================================================================
 */

(function () {
  'use strict';

  // Avoid multiple initializations
  if (window.RenalyticaEmbedLoaded) return;
  window.RenalyticaEmbedLoaded = true;

  // Configuration
  const SCRIPT_ORIGIN = (function () {
    const scripts = document.getElementsByTagName('script');
    for (let i = 0; i < scripts.length; i++) {
      const src = scripts[i].src;
      if (src && src.includes('embed.js')) {
        try {
          const u = new URL(src);
          return u.origin;
        } catch (e) {
          // fallback
        }
      }
    }
    return window.location.origin;
  })();

  // Inject Styles
  const style = document.createElement('style');
  style.textContent = `
    .rnly-embed-overlay {
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      background: rgba(4, 9, 20, 0.78);
      backdrop-filter: blur(8px);
      -webkit-backdrop-filter: blur(8px);
      z-index: 999999;
      display: flex;
      align-items: center;
      justify-content: center;
      opacity: 0;
      visibility: hidden;
      transition: opacity 0.25s cubic-bezier(0.16, 1, 0.3, 1), visibility 0.25s;
    }
    .rnly-embed-overlay.is-active {
      opacity: 1;
      visibility: visible;
    }
    .rnly-embed-modal {
      width: 92%;
      max-width: 540px;
      background: #0d1527;
      border: 1px solid rgba(59, 130, 246, 0.3);
      border-radius: 16px;
      box-shadow: 0 25px 60px -15px rgba(0, 0, 0, 0.7), 0 0 30px rgba(59, 130, 246, 0.15);
      color: #f8fafc;
      font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif;
      overflow: hidden;
      transform: scale(0.95) translateY(10px);
      transition: transform 0.25s cubic-bezier(0.16, 1, 0.3, 1);
    }
    .rnly-embed-overlay.is-active .rnly-embed-modal {
      transform: scale(1) translateY(0);
    }
    .rnly-embed-header {
      padding: 18px 24px;
      background: rgba(15, 23, 42, 0.85);
      border-bottom: 1px solid rgba(255, 255, 255, 0.08);
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .rnly-embed-brand {
      display: flex;
      align-items: center;
      gap: 10px;
      font-weight: 700;
      font-size: 0.95rem;
      letter-spacing: 0.5px;
      color: #ffffff;
    }
    .rnly-embed-brand-dot {
      width: 8px;
      height: 8px;
      border-radius: 50%;
      background: #3b82f6;
      box-shadow: 0 0 10px #3b82f6;
    }
    .rnly-embed-close {
      background: transparent;
      border: none;
      color: #94a3b8;
      font-size: 1.4rem;
      cursor: pointer;
      line-height: 1;
      padding: 4px;
      transition: color 0.15s;
    }
    .rnly-embed-close:hover {
      color: #ffffff;
    }
    .rnly-embed-body {
      padding: 24px;
    }
    .rnly-embed-tag {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 999px;
      background: rgba(59, 130, 246, 0.15);
      border: 1px solid rgba(59, 130, 246, 0.3);
      color: #60a5fa;
      font-size: 0.75rem;
      font-weight: 600;
      text-transform: uppercase;
      margin-bottom: 12px;
    }
    .rnly-embed-title {
      font-size: 1.15rem;
      font-weight: 700;
      line-height: 1.35;
      color: #ffffff;
      margin: 0 0 10px 0;
    }
    .rnly-embed-desc {
      font-size: 0.88rem;
      color: #94a3b8;
      line-height: 1.5;
      margin: 0 0 20px 0;
    }
    .rnly-embed-price-row {
      display: flex;
      align-items: baseline;
      gap: 8px;
      padding: 14px 18px;
      background: rgba(30, 41, 59, 0.5);
      border: 1px solid rgba(255, 255, 255, 0.06);
      border-radius: 10px;
      margin-bottom: 20px;
    }
    .rnly-embed-price {
      font-size: 1.6rem;
      font-weight: 800;
      color: #38bdf8;
    }
    .rnly-embed-tier {
      font-size: 0.8rem;
      color: #64748b;
      text-transform: uppercase;
      font-weight: 600;
    }
    .rnly-embed-form {
      display: flex;
      flex-direction: column;
      gap: 12px;
    }
    .rnly-embed-input {
      width: 100%;
      padding: 12px 14px;
      background: rgba(15, 23, 42, 0.7);
      border: 1px solid rgba(255, 255, 255, 0.12);
      border-radius: 8px;
      color: #ffffff;
      font-size: 0.9rem;
      outline: none;
      box-sizing: border-box;
      transition: border-color 0.15s;
    }
    .rnly-embed-input:focus {
      border-color: #3b82f6;
    }
    .rnly-embed-submit {
      width: 100%;
      padding: 14px;
      background: linear-gradient(135deg, #2563eb, #1d4ed8);
      color: #ffffff;
      font-weight: 700;
      font-size: 0.95rem;
      border: none;
      border-radius: 8px;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      transition: filter 0.15s, transform 0.1s;
      box-shadow: 0 4px 14px rgba(37, 99, 235, 0.4);
    }
    .rnly-embed-submit:hover {
      filter: brightness(1.1);
      transform: translateY(-1px);
    }
    .rnly-embed-footer-badges {
      margin-top: 14px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      font-size: 0.72rem;
      color: #64748b;
    }
    .renalytica-embed-btn {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      padding: 10px 20px;
      background: #0f172a;
      color: #f8fafc;
      border: 1px solid #3b82f6;
      border-radius: 8px;
      font-weight: 600;
      font-size: 0.88rem;
      text-decoration: none;
      cursor: pointer;
      transition: all 0.2s;
    }
    .renalytica-embed-btn:hover {
      background: #1e293b;
      box-shadow: 0 0 15px rgba(59, 130, 246, 0.3);
    }
  `;
  document.head.appendChild(style);

  // Create Modal DOM Elements
  const overlay = document.createElement('div');
  overlay.className = 'rnly-embed-overlay';
  overlay.innerHTML = `
    <div class="rnly-embed-modal" role="dialog" aria-modal="true">
      <div class="rnly-embed-header">
        <div class="rnly-embed-brand">
          <span class="rnly-embed-brand-dot"></span>
          RENALYTICA LICENSED CHECKOUT
        </div>
        <button type="button" class="rnly-embed-close" aria-label="Close modal">&times;</button>
      </div>
      <div class="rnly-embed-body">
        <span class="rnly-embed-tag" id="rnly-modal-cat">Market Insights</span>
        <h3 class="rnly-embed-title" id="rnly-modal-title">Proprietary Research Report</h3>
        <p class="rnly-embed-desc" id="rnly-modal-desc">Instant verified licensing with dynamic PDF watermarking and 24-hour delivery tokens.</p>
        
        <div class="rnly-embed-price-row">
          <div class="rnly-embed-price" id="rnly-modal-price">₦150,000</div>
          <div class="rnly-embed-tier">Institutional License</div>
        </div>

        <form class="rnly-embed-form" id="rnly-embed-form">
          <input type="text" class="rnly-embed-input" id="rnly-input-name" placeholder="Full Name or Representative" required />
          <input type="email" class="rnly-embed-input" id="rnly-input-email" placeholder="Corporate / Business Email" required />
          <input type="text" class="rnly-embed-input" id="rnly-input-company" placeholder="Organization / Firm Legal Name" required />
          
          <button type="submit" class="rnly-embed-submit" id="rnly-submit-btn">
            Proceed with Flutterwave Gateway →
          </button>
        </form>

        <div class="rnly-embed-footer-badges">
          <span>🔒 256-bit Encrypted Settlement</span>
          <span>⚡ FLW Multi-Currency Engine</span>
          <span>📄 Dynamic PDF Watermark</span>
        </div>
      </div>
    </div>
  `;
  document.body.appendChild(overlay);

  const closeBtn = overlay.querySelector('.rnly-embed-close');
  closeBtn.addEventListener('click', () => overlay.classList.remove('is-active'));
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) overlay.classList.remove('is-active');
  });

  // State
  let currentReport = null;

  // Catalog defaults for immediate embed hydration
  const CATALOG = {
    'nigeria-ai-adoption-economics-2026': {
      title: 'The Economics of AI Adoption in Africa (2026)',
      category: 'Data Analysis',
      price: '₦150,000',
      currency: 'NGN',
      amount: 150000,
      desc: 'Comprehensive 84-page macroeconomic model assessing generative AI productivity dividends across commercial banking and cross-border payments.'
    },
    'nigeria-stablecoins-cross-border-2026': {
      title: 'Sub-Saharan Africa Stablecoins & Digital FX Corridors (2026-2027)',
      category: 'Market Insights',
      price: '$450',
      currency: 'USD',
      amount: 450,
      desc: '92-page proprietary quantitative research report detailing USDT/USDC settlement volumes, FX liquidity pipelines, and corporate treasury clearing.'
    },
    'pan-african-fintech-venture-capital-2026': {
      title: 'Pan-African Sovereign Debt & Fintech Liquidity Monitor',
      category: 'Industry Research',
      price: '₦250,000',
      currency: 'NGN',
      amount: 250000,
      desc: 'High-frequency macroeconomic monitor analyzing sovereign debt maturities, currency depreciations, and early-stage venture liquidity trends.'
    }
  };

  function openCheckout(reportId) {
    currentReport = CATALOG[reportId] || {
      id: reportId,
      title: 'Renalytica Institutional Market Report',
      category: 'Market Intelligence',
      price: '$450',
      currency: 'USD',
      amount: 450,
      desc: 'Proprietary institutional intelligence report with executive summary, econometric models, and dynamic watermarked PDF.'
    };

    document.getElementById('rnly-modal-title').textContent = currentReport.title;
    document.getElementById('rnly-modal-cat').textContent = currentReport.category;
    document.getElementById('rnly-modal-price').textContent = currentReport.price;
    document.getElementById('rnly-modal-desc').textContent = currentReport.desc;

    overlay.classList.add('is-active');
  }

  // Handle Form Submission
  const form = document.getElementById('rnly-embed-form');
  form.addEventListener('submit', async function (e) {
    e.preventDefault();
    const btn = document.getElementById('rnly-submit-btn');
    const name = document.getElementById('rnly-input-name').value;
    const email = document.getElementById('rnly-input-email').value;
    const company = document.getElementById('rnly-input-company').value;

    btn.disabled = true;
    btn.textContent = 'Connecting Flutterwave Gateway...';

    try {
      const resp = await fetch(`${SCRIPT_ORIGIN}/api/checkout`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: currentReport.amount,
          currency: currentReport.currency,
          email: email,
          name: name,
          reportId: currentReport.id || 'nigeria-ai-adoption-economics-2026',
          reportTitle: currentReport.title,
          licenseType: 'enterprise',
          companyName: company
        })
      });

      const data = await resp.json();

      if (data.paymentLink) {
        window.location.href = data.paymentLink;
      } else {
        // Fallback checkout modal or redirect
        window.location.href = `${SCRIPT_ORIGIN}/checkout.html?report=${encodeURIComponent(currentReport.id || 'nigeria-ai-adoption-economics-2026')}&email=${encodeURIComponent(email)}&name=${encodeURIComponent(name)}&company=${encodeURIComponent(company)}`;
      }
    } catch (err) {
      console.warn('Backend link routing to direct checkout:', err.message);
      window.location.href = `${SCRIPT_ORIGIN}/checkout.html?report=${encodeURIComponent(currentReport.id || 'nigeria-ai-adoption-economics-2026')}&email=${encodeURIComponent(email)}`;
    }
  });

  // Attach listener to any trigger buttons in page
  function attachListeners() {
    const buttons = document.querySelectorAll('[data-renalytica-report-id], .renalytica-buy-button');
    buttons.forEach(btn => {
      if (btn.getAttribute('data-rnly-bound')) return;
      btn.setAttribute('data-rnly-bound', 'true');
      btn.addEventListener('click', function (e) {
        e.preventDefault();
        const repId = btn.getAttribute('data-renalytica-report-id') || 'nigeria-ai-adoption-economics-2026';
        openCheckout(repId);
      });
    });
  }

  // Expose API
  window.RenalyticaEmbed = {
    open: openCheckout,
    refresh: attachListeners
  };

  // Run on load and DOM mutations
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', attachListeners);
  } else {
    attachListeners();
  }
})();
