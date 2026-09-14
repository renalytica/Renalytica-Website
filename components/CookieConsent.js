/**
 * ==============================================================================
 * RENALYTICA COOKIE CONSENT ALERT COMPONENT (components/CookieConsent.js)
 * ==============================================================================
 * Self-initializing native web component and script that displays a branded,
 * highly performant Cookie Consent banner on the user's first visit.
 *
 * Requirements:
 * 1. Pops in once when users first visit the site (controlled via localStorage).
 * 2. "Learn more" links to the Cookies section of the Privacy Policy (privacy.html#cookies).
 * 3. Exact matching copy from sample reference:
 *    "We use cookie to improve your experience on our site. By using our site you consent cookies. Learn more"
 * 4. Action buttons: "Allow Cookies" (primary white), "Decline" (outline), and "Manage Cookies" (institutional preferences).
 * 5. Elevated z-index 2147483647 to never be obscured by floating chat widgets.
 * ==============================================================================
 */

class CookieConsent extends HTMLElement {
  connectedCallback() {
    this.init();
  }

  init() {
    // Check if consent has already been registered
    try {
      const savedConsent = localStorage.getItem('renalytica_cookie_consent');
      if (savedConsent) {
        return; // User has already responded, do not show again
      }
    } catch (e) {
      // If localStorage is disabled/restricted, proceed with banner
    }

    // Render banner and preferences modal HTML
    this.innerHTML = `
      <aside class="renalytica-cookie-banner" id="renalytica-cookie-banner" role="region" aria-label="Cookie consent">
        <div class="cookie-banner-inner">
          <div class="cookie-banner-left">
            <div class="cookie-icon-wrap" aria-hidden="true">
              <svg viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="24" cy="24" r="21" fill="#DF8A2F" stroke="#C5741E" stroke-width="2"/>
                <circle cx="24" cy="24" r="20" fill="url(#cookie-grad)"/>
                <!-- Chocolate chips matching reference -->
                <circle cx="16" cy="18" r="3.2" fill="#3B1C0B"/>
                <circle cx="27" cy="15" r="2.8" fill="#3B1C0B"/>
                <circle cx="33" cy="22" r="3" fill="#3B1C0B"/>
                <circle cx="24" cy="26" r="3.4" fill="#3B1C0B"/>
                <circle cx="15" cy="30" r="2.6" fill="#3B1C0B"/>
                <circle cx="31" cy="33" r="2.7" fill="#3B1C0B"/>
                <circle cx="22" cy="36" r="2.2" fill="#3B1C0B"/>
                <circle cx="18" cy="24" r="1.5" fill="#5A2E12"/>
                <circle cx="29" cy="28" r="1.6" fill="#5A2E12"/>
                <!-- Highlight specks -->
                <circle cx="19" cy="12" r="1" fill="#F4B875"/>
                <circle cx="34" cy="17" r="1" fill="#F4B875"/>
                <defs>
                  <radialGradient id="cookie-grad" cx="40%" cy="35%" r="65%">
                    <stop offset="0%" stop-color="#F2A855"/>
                    <stop offset="70%" stop-color="#DE892E"/>
                    <stop offset="100%" stop-color="#C77520"/>
                  </radialGradient>
                </defs>
              </svg>
            </div>
            <p class="cookie-banner-text">
              We use cookie to improve your experience on our site. By using our site you consent cookies. <a href="privacy.html#cookies" class="cookie-learn-more-link" id="cookie-learn-more">Learn more</a>
            </p>
          </div>
          <div class="cookie-banner-actions">
            <button type="button" class="cookie-btn-manage" id="cookie-btn-manage" title="Customize cookie preferences">Manage Cookies</button>
            <button type="button" class="cookie-btn-decline" id="cookie-btn-decline">Decline</button>
            <button type="button" class="cookie-btn-allow" id="cookie-btn-allow">Allow Cookies</button>
          </div>
        </div>
      </aside>

      <!-- Institutional Cookie Preferences Modal -->
      <div class="cookie-pref-modal-backdrop" id="cookie-pref-modal" aria-hidden="true">
        <div class="cookie-pref-dialog" role="dialog" aria-labelledby="cookie-pref-title">
          <div class="cookie-pref-header">
            <div>
              <span class="cookie-pref-tag">DATA GOVERNANCE &amp; PRIVACY</span>
              <h3 class="cookie-pref-title" id="cookie-pref-title">Institutional Cookie Preferences</h3>
            </div>
            <button type="button" class="cookie-pref-close" id="cookie-pref-close" aria-label="Close preferences">✕</button>
          </div>

          <p class="cookie-pref-desc">
            Renalytica uses cookies and telemetry storage to deliver enterprise market intelligence, secure corporate sessions, and remember your multi-currency preferences. You can customize your settings below:
          </p>

          <div class="cookie-pref-sections">
            <!-- 1. Strictly Necessary -->
            <div class="cookie-pref-card locked">
              <div class="cookie-pref-card-header">
                <div>
                  <strong>Strictly Necessary Cookies</strong>
                  <span class="cookie-pref-status-pill locked">Always Active</span>
                </div>
              </div>
              <p>Essential for cryptographic authentication, secure client portal access, checkout processing, and CSRF protection. These cannot be switched off.</p>
            </div>

            <!-- 2. Functional & Preferences -->
            <div class="cookie-pref-card">
              <div class="cookie-pref-card-header">
                <div>
                  <strong>Functional &amp; Platform Preferences</strong>
                  <span class="cookie-pref-status-pill">Configurable</span>
                </div>
                <label class="pref-switch">
                  <input type="checkbox" id="pref-functional" checked>
                  <span class="pref-slider"></span>
                </label>
              </div>
              <p>Remembers your selected benchmark currency (USD, EUR, GBP, NGN, ZAR, KES, GHS) and interface dark/light canvas mode across visits.</p>
            </div>

            <!-- 3. Research Telemetry & Performance -->
            <div class="cookie-pref-card">
              <div class="cookie-pref-card-header">
                <div>
                  <strong>Research Telemetry &amp; Analytics</strong>
                  <span class="cookie-pref-status-pill">Configurable</span>
                </div>
                <label class="pref-switch">
                  <input type="checkbox" id="pref-telemetry" checked>
                  <span class="pref-slider"></span>
                </label>
              </div>
              <p>Aggregated, strictly anonymous metrics to evaluate publication popularity, reading completion rates, and market terminal streaming latency.</p>
            </div>

            <!-- 4. Advisory Signals & Market Updates -->
            <div class="cookie-pref-card">
              <div class="cookie-pref-card-header">
                <div>
                  <strong>Advisory Signals &amp; Briefings</strong>
                  <span class="cookie-pref-status-pill">Configurable</span>
                </div>
                <label class="pref-switch">
                  <input type="checkbox" id="pref-marketing">
                  <span class="pref-slider"></span>
                </label>
              </div>
              <p>Enables tailored invitations to executive economist briefings, new report release notifications, and commodity flash alerts.</p>
            </div>
          </div>

          <div class="cookie-pref-actions">
            <button type="button" class="cookie-pref-btn-secondary" id="cookie-pref-save">Save Preferences</button>
            <button type="button" class="cookie-pref-btn-primary" id="cookie-pref-accept-all">Accept All Cookies</button>
          </div>
        </div>
      </div>
    `;

    const banner = this.querySelector('#renalytica-cookie-banner');
    const allowBtn = this.querySelector('#cookie-btn-allow');
    const declineBtn = this.querySelector('#cookie-btn-decline');
    const manageBtn = this.querySelector('#cookie-btn-manage');
    const learnMoreLink = this.querySelector('#cookie-learn-more');

    const modal = this.querySelector('#cookie-pref-modal');
    const modalClose = this.querySelector('#cookie-pref-close');
    const savePrefBtn = this.querySelector('#cookie-pref-save');
    const acceptAllPrefBtn = this.querySelector('#cookie-pref-accept-all');

    // Handle "Learn more" in-page anchor navigation if already on privacy.html
    if (learnMoreLink && window.location.pathname.endsWith('privacy.html')) {
      learnMoreLink.addEventListener('click', (e) => {
        const target = document.getElementById('cookies') || document.getElementById('sec-6');
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          history.pushState(null, '', '#cookies');
        }
      });
    }

    // Pop-in animation with polite 650ms delay after initial paint
    setTimeout(() => {
      if (banner) banner.classList.add('is-visible');
    }, 650);

    const closeBanner = (consentDecision, customPreferences = null) => {
      try {
        localStorage.setItem('renalytica_cookie_consent', consentDecision);
        if (customPreferences) {
          localStorage.setItem('renalytica_cookie_preferences', JSON.stringify(customPreferences));
        } else if (consentDecision === 'accepted') {
          localStorage.setItem('renalytica_cookie_preferences', JSON.stringify({
            necessary: true,
            functional: true,
            telemetry: true,
            advisory: true
          }));
        } else {
          localStorage.setItem('renalytica_cookie_preferences', JSON.stringify({
            necessary: true,
            functional: false,
            telemetry: false,
            advisory: false
          }));
        }
        // Set standard persistent browser cookie for 1 year
        document.cookie = `renalytica_cookie_consent=${consentDecision}; max-age=31536000; path=/; SameSite=Lax`;
      } catch (err) {
        // Storage access fallback
      }

      window.dispatchEvent(new CustomEvent('renalytica:cookie-consent', {
        detail: { consent: consentDecision, preferences: customPreferences }
      }));

      if (modal) modal.classList.remove('is-active');

      if (banner) {
        banner.classList.remove('is-visible');
        banner.classList.add('is-closing');
        setTimeout(() => {
          this.remove();
        }, 450);
      }
    };

    if (allowBtn) {
      allowBtn.addEventListener('click', () => closeBanner('accepted'));
    }

    if (declineBtn) {
      declineBtn.addEventListener('click', () => closeBanner('declined'));
    }

    // Open Preferences Modal
    if (manageBtn && modal) {
      manageBtn.addEventListener('click', () => {
        modal.classList.add('is-active');
      });
    }

    if (modalClose && modal) {
      modalClose.addEventListener('click', () => {
        modal.classList.remove('is-active');
      });
    }

    // Modal Save Preferences
    if (savePrefBtn) {
      savePrefBtn.addEventListener('click', () => {
        const prefs = {
          necessary: true,
          functional: !!this.querySelector('#pref-functional')?.checked,
          telemetry: !!this.querySelector('#pref-telemetry')?.checked,
          advisory: !!this.querySelector('#pref-marketing')?.checked
        };
        closeBanner('customized', prefs);
      });
    }

    // Modal Accept All
    if (acceptAllPrefBtn) {
      acceptAllPrefBtn.addEventListener('click', () => {
        closeBanner('accepted');
      });
    }
  }
}

// Register custom element if not already registered
if (!customElements.get('cookie-consent')) {
  customElements.define('cookie-consent', CookieConsent);
}

// Auto-mount function: ensures the cookie consent alert displays on any page
function autoMountCookieConsent() {
  try {
    if (localStorage.getItem('renalytica_cookie_consent')) {
      return; // Already resolved
    }
  } catch (e) {}

  if (document.querySelector('cookie-consent') || document.getElementById('renalytica-cookie-banner')) {
    return; // Already mounted
  }

  const consentEl = document.createElement('cookie-consent');
  document.body.appendChild(consentEl);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', autoMountCookieConsent);
} else {
  autoMountCookieConsent();
}
