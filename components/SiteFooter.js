/**
 * ============================================================================
 * RENALYTICA MASTER SITE FOOTER COMPONENT (components/SiteFooter.js)
 * ============================================================================
 * Executive, institutional-grade footer engineered for internal & portal pages:
 * - admin.html (Executive Admin Desk)
 * - portal.html (Client Intelligence Portal)
 * - checkout.html (Secure Commercial Checkout)
 * - report.html (Institutional Publication PDP)
 *
 * Features:
 * 1. Strict emblem & horizontal logo dimension lock (immunity from global CSS img { height: auto })
 * 2. Enterprise status indicator (System: Nominal, 256-Bit SSL, RBAC Protected)
 * 3. Safe-area clearance preventing overlap with floating action buttons & chat launchers
 * 4. Responsive dual-tier layout with high-contrast, theme-adaptive typography
 * 5. Direct verified communication corridors (WhatsApp & Email with crisp vector badges)
 * ============================================================================
 */

class SiteFooter extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const currentYear = new Date().getFullYear();
    this.innerHTML = `
      <style>
        .site-footer-compact {
          background: linear-gradient(180deg, #070D1B 0%, #040813 100%);
          border-top: 1px solid rgba(255, 255, 255, 0.08);
          box-shadow: 0 -8px 24px -4px rgba(0, 0, 0, 0.45);
          padding: 2.25rem 0 1.75rem;
          margin-top: 0;
          font-family: var(--font-primary, 'Inter', -apple-system, BlinkMacSystemFont, sans-serif);
          position: relative;
          z-index: 10;
          color: #94A3B8;
          width: 100%;
        }

        .site-footer-compact .footer-container {
          max-width: 1240px;
          margin: 0 auto;
          padding: 0 1.5rem;
          box-sizing: border-box;
        }

        /* Top Row: Brand Lockup, Status Badges & Navigation */
        .site-footer-compact .footer-top-row {
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1.5rem;
          padding-bottom: 1.5rem;
          border-bottom: 1px solid rgba(255, 255, 255, 0.06);
        }

        .site-footer-compact .footer-brand-wrap {
          display: flex;
          align-items: center;
          gap: 14px;
          flex-wrap: wrap;
        }

        .site-footer-compact .footer-brand-link {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          text-decoration: none;
          color: #F8FAFC;
          transition: opacity 0.2s ease;
        }

        .site-footer-compact .footer-brand-link:hover {
          opacity: 0.9;
        }

        /* Strict logo sizing to prevent distortion from global img rules */
        .site-footer-compact .footer-logo-img {
          height: 28px !important;
          max-height: 28px !important;
          width: auto !important;
          display: inline-block !important;
          object-fit: contain !important;
          vertical-align: middle;
        }

        .site-footer-compact .footer-brand-text {
          font-weight: 800;
          font-size: 1.05rem;
          letter-spacing: -0.02em;
          color: #F8FAFC;
        }

        .site-footer-compact .footer-tagline-badge {
          font-size: 0.72rem;
          color: #64748B;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          border-left: 1px solid rgba(255, 255, 255, 0.12);
          padding-left: 12px;
          margin-left: 2px;
          text-transform: lowercase;
          letter-spacing: 0.02em;
        }

        /* Institutional Badges */
        .site-footer-compact .footer-status-cluster {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          background: rgba(15, 23, 42, 0.75);
          border: 1px solid rgba(255, 255, 255, 0.08);
          padding: 4px 10px;
          border-radius: 9999px;
          font-size: 0.7rem;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          color: #94A3B8;
        }

        .site-footer-compact .footer-status-dot {
          width: 7px;
          height: 7px;
          background-color: #10B981;
          border-radius: 50%;
          display: inline-block;
          box-shadow: 0 0 8px #10B981;
          animation: pulseStatus 2s infinite;
        }

        @keyframes pulseStatus {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.85); }
        }

        /* Nav Links */
        .site-footer-compact .footer-nav-links {
          display: flex;
          gap: 1.25rem;
          flex-wrap: wrap;
          align-items: center;
        }

        .site-footer-compact .footer-nav-link {
          font-size: 0.8rem;
          font-weight: 500;
          color: #94A3B8;
          text-decoration: none;
          padding: 4px 6px;
          border-radius: 4px;
          transition: all 0.2s ease;
        }

        .site-footer-compact .footer-nav-link:hover {
          color: #FF8000;
          background: rgba(255, 128, 0, 0.08);
        }

        /* Bottom Row: Legal Copyright & Direct Contact Pills */
        .site-footer-compact .footer-bottom-row {
          margin-top: 1.25rem;
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          align-items: center;
          gap: 1rem;
        }

        .site-footer-compact .footer-copyright-text {
          margin: 0;
          font-size: 0.75rem;
          color: #64748B;
          line-height: 1.5;
        }

        .site-footer-compact .footer-copyright-sub {
          font-size: 0.7rem;
          color: #475569;
          font-family: var(--font-mono, 'JetBrains Mono', monospace);
          display: block;
          margin-top: 2px;
        }

        .site-footer-compact .footer-contact-actions {
          display: flex;
          gap: 0.75rem;
          align-items: center;
          flex-wrap: wrap;
        }

        .site-footer-compact .footer-action-pill {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 5px 12px;
          border-radius: 6px;
          font-size: 0.75rem;
          font-weight: 500;
          text-decoration: none;
          background: rgba(15, 23, 42, 0.8);
          border: 1px solid rgba(255, 255, 255, 0.08);
          color: #CBD5E1;
          transition: all 0.2s ease;
        }

        .site-footer-compact .footer-action-pill:hover {
          border-color: rgba(255, 128, 0, 0.4);
          background: rgba(255, 128, 0, 0.1);
          color: #FF8000;
          transform: translateY(-1px);
        }

        .site-footer-compact .footer-action-pill.whatsapp:hover {
          border-color: rgba(37, 211, 102, 0.4);
          background: rgba(37, 211, 102, 0.1);
          color: #25D366;
        }

        /* Safe area clearance on wide displays to prevent collision with fixed floating launchers */
        @media (min-width: 992px) {
          .site-footer-compact .footer-container {
            padding-right: 4.5rem;
          }
        }

        @media (max-width: 768px) {
          .site-footer-compact {
            padding: 1.75rem 0 1.5rem;
          }
          .site-footer-compact .footer-top-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1.25rem;
          }
          .site-footer-compact .footer-bottom-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .site-footer-compact .footer-nav-links {
            gap: 0.75rem 1rem;
          }
        }
      </style>

      <footer class="site-footer-compact" id="renalytica-master-footer">
        <div class="footer-container">
          <!-- Top Row: Brand, System Status & Core Nav Links -->
          <div class="footer-top-row">
            <!-- Brand Lockup & System Status -->
            <div class="footer-brand-wrap">
              <a href="index.html" class="footer-brand-link">
                <img 
                  src="assets/brand/renalytica_logo_horizontal_white.png" 
                  alt="Renalytica" 
                  class="footer-logo-img" 
                  onerror="this.onerror=null; this.src='assets/brand/renalytica_emblem.png'; this.style.height='28px';"
                >
              </a>
              <span class="footer-tagline-badge">
                powering smart decisions
              </span>
              <div class="footer-status-cluster" title="System operational and secured by 256-bit TLS encryption">
                <span class="footer-status-dot"></span>
                <span>System: Nominal</span>
                <span style="opacity: 0.4;">|</span>
                <span>256-Bit SSL</span>
              </div>
            </div>

            <!-- Primary Navigation Links -->
            <nav class="footer-nav-links" aria-label="Footer Navigation">
              <a href="index.html" class="footer-nav-link">Home</a>
              <a href="reports.html" class="footer-nav-link">Reports</a>
              <a href="services.html" class="footer-nav-link">Services</a>
              <a href="markets.html" class="footer-nav-link">Markets</a>
              <a href="portal.html" class="footer-nav-link">Portal</a>
              <a href="contact.html" class="footer-nav-link">Contact</a>
              <a href="gdpr.html" class="footer-nav-link">GDPR</a>
              <a href="privacy.html" class="footer-nav-link">Privacy</a>
              <a href="terms.html" class="footer-nav-link">Terms</a>
            </nav>
          </div>

          <!-- Bottom Row: Institutional Copyright & Direct Channel Contacts -->
          <div class="footer-bottom-row">
            <div>
              <p class="footer-copyright-text">
                &copy; ${currentYear} Renalytica Limited. All rights reserved. &mdash; Lagos &bull; New York
              </p>
              <span class="footer-copyright-sub">
                Institutional Market Intelligence &bull; Quantitative Telemetry &bull; RBAC Protected
              </span>
            </div>

            <div class="footer-contact-actions">
              <a href="https://wa.me/2349020846138" target="_blank" rel="noopener" class="footer-action-pill whatsapp">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" style="display:inline-block; vertical-align: -2px;">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.971.53 1.942.81 2.802.81l.004-.001c3.182 0 5.768-2.587 5.769-5.766.001-3.182-2.585-5.77-5.77-5.771zm3.392 8.244c-.144.405-.837.774-1.17.824-.312.045-.698.077-2.072-.492-1.758-.727-2.887-2.502-2.975-2.617-.087-.116-.708-.941-.708-1.794s.448-1.273.607-1.446c.159-.175.347-.217.462-.217l.332.006c.106.005.249-.04.39.299.144.347.491 1.2.534 1.288.043.087.072.188.014.304-.058.116-.087.188-.173.289l-.26.304c-.087.086-.177.18-.076.354.101.174.449.741.964 1.201.662.591 1.221.774 1.394.861.174.086.275.072.376-.044.102-.115.434-.506.55-.679.115-.174.231-.145.39-.087s1.011.477 1.184.564.289.13.332.202c.043.073.043.419-.101.824z"/>
                </svg>
                WhatsApp: +234 902 084 6138
              </a>

              <a href="mailto:info@renalytica.com" class="footer-action-pill">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block; vertical-align: -2px;">
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                  <polyline points="22,6 12,13 2,6"></polyline>
                </svg>
                info@renalytica.com
              </a>
            </div>
          </div>
        </div>
      </footer>
    `;
  }
}

if (!customElements.get('site-footer')) {
  customElements.define('site-footer', SiteFooter);
}
