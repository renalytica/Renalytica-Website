/**
 * RENALYTICA GLOBAL NAVIGATION BAR
 * Implements Section 2 of 01_HOME_PAGE_CONTENT.md
 * Wordmark with tagline 'powering smart decisions', exact menu links,
 * Cart counter, Light/Dark Mode Switcher, and High-Precision Mobile Drawer Portal.
 */

class HeaderNav extends HTMLElement {
  connectedCallback() {
    this.currentPath = window.location.pathname.split('/').pop() || 'index.html';
    let storedCart = '0';
    let storedTheme = 'light';
    try {
      storedCart = localStorage.getItem('renalytica_cart_count') || '0';
      storedTheme = localStorage.getItem('renalytica_theme') || 'light';
    } catch (e) {}
    this.cartCount = parseInt(storedCart, 10);
    this.currentTheme = storedTheme;
    this.authUser = this.getAuthUser();
    
    // Sync active document theme
    document.documentElement.setAttribute('data-theme', this.currentTheme);
    document.body.setAttribute('data-theme', this.currentTheme);
    if (this.currentTheme === 'dark') {
      document.body.classList.remove('light-canvas');
      document.body.classList.add('dark-canvas');
    } else {
      document.body.classList.add('light-canvas');
      document.body.classList.remove('dark-canvas');
    }

    // Ensure site-wide Cookie Consent Alert is initialized on first visit
    if (!customElements.get('cookie-consent') && !document.querySelector('script[src*="CookieConsent.js"]')) {
      const consentScript = document.createElement('script');
      consentScript.src = 'components/CookieConsent.js';
      consentScript.async = true;
      document.head.appendChild(consentScript);
    }

    // Ensure site-wide Multi-Channel Chat Widget is initialized
    if (!customElements.get('multi-channel-chat') && !document.querySelector('script[src*="MultiChannelChat.js"]')) {
      const chatScript = document.createElement('script');
      chatScript.src = 'components/MultiChannelChat.js';
      chatScript.async = true;
      document.head.appendChild(chatScript);
    }

    this.render();
    this.bindEvents();
    this.updateThemeButton();
  }

  disconnectedCallback() {
    // Clean up portal elements when component unmounts
    const backdrop = document.getElementById('drawer-backdrop');
    if (backdrop) backdrop.remove();
    const drawer = document.getElementById('mobile-drawer');
    if (drawer) drawer.remove();
    document.body.style.overflow = '';
  }

  getAuthUser() {
    try {
      if (typeof window !== 'undefined' && window.RenalyticaAuth && window.RenalyticaAuth.getUser) {
        const u = window.RenalyticaAuth.getUser();
        if (u) return u;
      }
      const raw = localStorage.getItem('renalytica_auth_session');
      if (raw) {
        const parsed = JSON.parse(raw);
        return parsed.user || null;
      }
    } catch (e) {}
    return null;
  }

  render() {
    // Structured Mega-Navigation HTML
    const isPlatformActive = ['reports.html', 'markets.html', 'methodology.html', 'portal.html'].includes(this.currentPath);
    const isCompanyActive = ['about.html', 'services.html', 'careers.html', 'contact.html'].includes(this.currentPath);
    const isResourcesActive = ['insights.html', 'community.html', 'faq.html', 'gdpr.html', 'privacy.html', 'terms.html', 'blog.html', 'news.html'].includes(this.currentPath);

    const linksHtml = `
      <!-- 1. Direct High-Priority Link: Research Store -->
      <a href="reports.html" class="direct-store-link ${this.currentPath === 'reports.html' ? 'active' : ''}" title="Browse Research Store">
        <span class="nav-dot"></span>
        <span>Research Store</span>
      </a>

      <!-- 2. Mega Dropdown: Platform -->
      <div class="nav-dropdown-item" data-dropdown="platform">
        <button type="button" class="nav-dropdown-btn ${isPlatformActive ? 'active' : ''}" aria-expanded="false" aria-haspopup="true">
          <span>Platform</span>
          <svg class="dropdown-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 1L5 5L9 1"/>
          </svg>
        </button>
        
        <div class="mega-dropdown-menu" role="menu">
          <div class="mega-menu-grid">
            <div class="mega-menu-items">
              <a href="reports.html" class="mega-item-link" role="menuitem">
                <div class="mega-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
                    <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
                  </svg>
                </div>
                <div class="mega-text-box">
                  <div class="mega-item-title">Research Store</div>
                  <div class="mega-item-desc">Browse 2,500+ commercial industry reports & unlocked models.</div>
                </div>
              </a>

              <a href="markets.html" class="mega-item-link" role="menuitem">
                <div class="mega-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <line x1="18" y1="20" x2="18" y2="10"></line>
                    <line x1="12" y1="20" x2="12" y2="4"></line>
                    <line x1="6" y1="20" x2="6" y2="14"></line>
                  </svg>
                </div>
                <div class="mega-text-box">
                  <div class="mega-item-title">Live Markets</div>
                  <div class="mega-item-desc">Real-time agricultural commodity prices, forex & trade telemetry.</div>
                </div>
              </a>

              <a href="methodology.html" class="mega-item-link" role="menuitem">
                <div class="mega-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <circle cx="12" cy="12" r="4"></circle>
                    <line x1="4.93" y1="4.93" x2="9.17" y2="9.17"></line>
                    <line x1="14.83" y1="14.83" x2="19.07" y2="19.07"></line>
                  </svg>
                </div>
                <div class="mega-text-box">
                  <div class="mega-item-title">Our Methodology</div>
                  <div class="mega-item-desc">Empirical field weigh-bridges calibrated with orbital radar telemetry.</div>
                </div>
              </a>

              <a href="portal.html" class="mega-item-link" role="menuitem">
                <div class="mega-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                    <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                  </svg>
                </div>
                <div class="mega-text-box">
                  <div class="mega-item-title">Client Portal</div>
                  <div class="mega-item-desc">256-bit encrypted gateway to unlocked econometric models & files.</div>
                </div>
              </a>
            </div>

            <div class="mega-featured-card">
              <div>
                <div class="mega-card-badge">FLAGSHIP PUBLICATION</div>
                <h4 class="mega-card-title">2026 Agribusiness Intelligence Suite</h4>
                <p class="mega-card-desc">380 pages of primary ground-truth yields, logistics corridors & Excel models.</p>
              </div>
              <a href="reports.html" class="mega-card-cta">Explore Catalog →</a>
            </div>
          </div>
        </div>
      </div>

      <!-- 3. Mega Dropdown: Company -->
      <div class="nav-dropdown-item" data-dropdown="company">
        <button type="button" class="nav-dropdown-btn ${isCompanyActive ? 'active' : ''}" aria-expanded="false" aria-haspopup="true">
          <span>Company</span>
          <svg class="dropdown-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 1L5 5L9 1"/>
          </svg>
        </button>
        
        <div class="mega-dropdown-menu" role="menu">
          <div class="mega-menu-grid">
            <div class="mega-menu-items">
              <a href="about.html" class="mega-item-link" role="menuitem">
                <div class="mega-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="12" y1="16" x2="12" y2="12"></line>
                    <line x1="12" y1="8" x2="12.01" y2="8"></line>
                  </svg>
                </div>
                <div class="mega-text-box">
                  <div class="mega-item-title">About Us</div>
                  <div class="mega-item-desc">Learn about our mission, executive leadership, and pan-African pedigree.</div>
                </div>
              </a>

              <a href="services.html" class="mega-item-link" role="menuitem">
                <div class="mega-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="7" width="20" height="14" rx="2" ry="2"></rect>
                    <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"></path>
                  </svg>
                </div>
                <div class="mega-text-box">
                  <div class="mega-item-title">Services</div>
                  <div class="mega-item-desc">Custom market research, corporate subscriptions & executive briefings.</div>
                </div>
              </a>

              <a href="careers.html" class="mega-item-link" role="menuitem">
                <div class="mega-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                    <circle cx="9" cy="7" r="4"></circle>
                    <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                  </svg>
                </div>
                <div class="mega-text-box">
                  <div class="mega-item-title">Careers</div>
                  <div class="mega-item-desc">Join our growing field enumerator and quantitative analytics teams.</div>
                </div>
              </a>

              <a href="contact.html" class="mega-item-link" role="menuitem">
                <div class="mega-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path>
                    <polyline points="22,6 12,13 2,6"></polyline>
                  </svg>
                </div>
                <div class="mega-text-box">
                  <div class="mega-item-title">Contact &amp; Inquiries</div>
                  <div class="mega-item-desc">Request customized research proposals, RFP quotes, or consultations.</div>
                </div>
              </a>
            </div>

            <div class="mega-featured-card">
              <div>
                <div class="mega-card-badge">CONSULTATIVE DESK</div>
                <h4 class="mega-card-title">Need Bespoke Market Feasibility?</h4>
                <p class="mega-card-desc">Our agronomic and macroeconomic economists deliver custom 48-hour proposals.</p>
              </div>
              <a href="contact.html" class="mega-card-cta">Request Consultation →</a>
            </div>
          </div>
        </div>
      </div>

      <!-- 4. Mega Dropdown: Resources -->
      <div class="nav-dropdown-item" data-dropdown="resources">
        <button type="button" class="nav-dropdown-btn ${isResourcesActive ? 'active' : ''}" aria-expanded="false" aria-haspopup="true">
          <span>Resources</span>
          <svg class="dropdown-chevron" width="10" height="6" viewBox="0 0 10 6" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round">
            <path d="M1 1L5 5L9 1"/>
          </svg>
        </button>
        
        <div class="mega-dropdown-menu" role="menu">
          <div class="mega-menu-grid has-cols-2">
            <div class="mega-menu-items cols-2">
              <a href="insights.html" class="mega-item-link" role="menuitem">
                <div class="mega-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"></path>
                  </svg>
                </div>
                <div class="mega-text-box">
                  <div class="mega-item-title">Market Insights</div>
                  <div class="mega-item-desc">Weekly analytical dispatches & commodity updates.</div>
                </div>
              </a>

              <a href="community.html" class="mega-item-link" role="menuitem">
                <div class="mega-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <line x1="2" y1="12" x2="22" y2="12"></line>
                    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
                  </svg>
                </div>
                <div class="mega-text-box">
                  <div class="mega-item-title">Community &amp; Guilds</div>
                  <div class="mega-item-desc">Pan-African network of economists & fellows.</div>
                </div>
              </a>

              <a href="faq.html" class="mega-item-link" role="menuitem">
                <div class="mega-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="12" cy="12" r="10"></circle>
                    <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path>
                    <line x1="12" y1="17" x2="12.01" y2="17"></line>
                  </svg>
                </div>
                <div class="mega-text-box">
                  <div class="mega-item-title">FAQ &amp; Knowledge Desk</div>
                  <div class="mega-item-desc">Licensing tiers, SLAs & delivery guarantees.</div>
                </div>
              </a>

              <a href="gdpr.html" class="mega-item-link" role="menuitem">
                <div class="mega-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                    <polyline points="9 11 12 14 22 4"></polyline>
                  </svg>
                </div>
                <div class="mega-text-box">
                  <div class="mega-item-title">GDPR Compliance</div>
                  <div class="mega-item-desc">Data protection charter & international rights.</div>
                </div>
              </a>

              <a href="privacy.html" class="mega-item-link" role="menuitem">
                <div class="mega-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
                  </svg>
                </div>
                <div class="mega-text-box">
                  <div class="mega-item-title">Privacy Policy</div>
                  <div class="mega-item-desc">NDPA 2023 compliance & zero data broker policy.</div>
                </div>
              </a>

              <a href="terms.html" class="mega-item-link" role="menuitem">
                <div class="mega-icon-box">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                  </svg>
                </div>
                <div class="mega-text-box">
                  <div class="mega-item-title">Terms of Service</div>
                  <div class="mega-item-desc">Commercial licensing rules & confidentiality.</div>
                </div>
              </a>
            </div>

            <div class="mega-featured-card">
              <div>
                <div class="mega-card-badge">WEEKLY WIRE</div>
                <h4 class="mega-card-title">Pan-African Crop Yield Outlook</h4>
                <p class="mega-card-desc">Ground-truth price analysis & corridor transport logistics.</p>
              </div>
              <a href="insights.html" class="mega-card-cta">Read Insights →</a>
            </div>
          </div>
        </div>
      </div>
    `;

    const user = this.authUser;
    const isAdmin = user && (user.role === 'admin' || (user.email && user.email.includes('renalytica')));

    let authNavHtml = '';
    if (user) {
      if (isAdmin) {
        authNavHtml = `
          <a href="admin.html" class="briefcase-btn admin-nav-pill" title="Executive Admin Desk">
            <span>👑</span> <span class="auth-btn-label">ADMIN</span>
          </a>
          <a href="portal.html" class="briefcase-btn portal-nav-btn" title="Client Intelligence Portal">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
            <span class="auth-btn-label">PORTAL</span>
          </a>
          <button type="button" class="btn-nav-signout" id="nav-signout-btn" title="Sign Out of Session">Sign Out ⎋</button>
        `;
      } else {
        authNavHtml = `
          <a href="portal.html" class="briefcase-btn portal-nav-btn" title="Client Intelligence Portal">
            <span class="pulse-dot-green"></span>
            <span class="auth-btn-label">PORTAL</span>
          </a>
          <button type="button" class="btn-nav-signout" id="nav-signout-btn" title="Sign Out of Session">Sign Out ⎋</button>
        `;
      }
    }

    this.innerHTML = `
      <header class="site-header">
        <div class="nav-container">
          <!-- Brand Lockup with Tagline -->
          <a href="index.html" class="brand-logo-lockup" aria-label="Renalytica — powering smart decisions">
            <img src="assets/brand/renalytica_logo_horizontal.png" alt="Renalytica" class="brand-img logo-light-theme" height="34" />
            <img src="assets/brand/renalytica_logo_horizontal_white.png" alt="Renalytica" class="brand-img logo-dark-theme" height="34" />
            <span class="brand-tagline-sub">powering smart decisions</span>
          </a>

          <!-- Desktop Navigation -->
          <nav class="desktop-nav" aria-label="Primary Navigation">
            ${linksHtml}
          </nav>

          <!-- Header Actions -->
          <div class="header-actions">
            <!-- Theme Toggle Switcher (Light / Dark) -->
            <button class="theme-toggle-btn" id="theme-toggle-btn" title="Toggle Light / Dark Mode" aria-label="Toggle Color Theme">
              <span class="theme-icon-sun" title="Switch to Light Mode">☀️</span>
              <span class="theme-icon-moon" title="Switch to Dark Mode">🌙</span>
            </button>

            <!-- Cart / Briefcase Pill -->
            <a href="reports.html#briefcase" class="briefcase-btn" title="View Intelligence Briefcase">
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span class="briefcase-label">CART</span>
              <span class="briefcase-badge" id="briefcase-badge">${this.cartCount}</span>
            </a>

            <!-- Authenticated User Actions (if signed in) -->
            ${authNavHtml}

            <!-- Primary Action CTA Button (only for unauthenticated guests) -->
            ${!user ? `
            <a href="reports.html" class="btn-pill-primary nav-cta" id="nav-browse-reports-btn" title="Browse Research Store">
              Browse Reports →
            </a>
            ` : ''}

            <!-- Mobile Menu Toggle -->
            <button class="menu-capsule mobile-menu-toggle" aria-label="Toggle Navigation Menu" aria-expanded="false" id="mobile-menu-toggle-btn">
              <span class="capsule-dots">••••</span>
              <span class="capsule-text">MENU</span>
            </button>
          </div>
        </div>
      </header>
    `;

    // Mount Drawer & Backdrop as Body Portal to escape all ancestor backdrop-filter/clip constraints
    this.mountDrawerPortal();
  }

  mountDrawerPortal() {
    let backdrop = document.getElementById('drawer-backdrop');
    if (!backdrop) {
      backdrop = document.createElement('div');
      backdrop.className = 'drawer-backdrop';
      backdrop.id = 'drawer-backdrop';
      backdrop.setAttribute('aria-hidden', 'true');
      document.body.appendChild(backdrop);
    }

    let drawer = document.getElementById('mobile-drawer');
    if (!drawer) {
      drawer = document.createElement('aside');
      drawer.className = 'mobile-drawer';
      drawer.id = 'mobile-drawer';
      drawer.setAttribute('aria-hidden', 'true');
      drawer.setAttribute('role', 'dialog');
      drawer.setAttribute('aria-label', 'Navigation Menu');
      document.body.appendChild(drawer);
    }

    const user = this.authUser;
    const isAdmin = user && (user.role === 'admin' || (user.email && user.email.includes('renalytica')));

    drawer.innerHTML = `
      <!-- 1. Pinned Drawer Header -->
      <div class="drawer-header">
        <a href="index.html" class="drawer-brand" aria-label="Renalytica — powering smart decisions">
          <img src="assets/brand/renalytica_logo_horizontal_white.png" alt="Renalytica" class="drawer-brand-logo" />
          <span class="drawer-brand-tagline">powering smart decisions</span>
        </a>
        <button type="button" class="drawer-close" id="drawer-close-btn" aria-label="Close navigation menu">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>

      <!-- 2. Scrollable Body -->
      <div class="drawer-scroll-body">
        <!-- Auth Gateway Box -->
        <div class="drawer-auth-box">
          ${user ? `
            <div class="drawer-auth-header">
              <span class="drawer-auth-badge">ACTIVE SUBSCRIBER SESSION</span>
              <span class="pulse-dot-green"></span>
            </div>
            <div class="drawer-user-name">${user.fullName || user.email}</div>
            <div class="drawer-user-org">${user.organization || 'Renalytica Institutional Client'}</div>
            <div class="drawer-auth-actions">
              <a href="portal.html" class="btn-drawer-auth primary">Access Portal 📚</a>
              ${isAdmin ? '<a href="admin.html" class="btn-drawer-auth ghost">Admin Desk 👑</a>' : ''}
            </div>
          ` : `
            <div class="drawer-auth-header">
              <span class="drawer-auth-badge">INSTITUTIONAL GATEWAY</span>
              <span class="pulse-dot-green" title="Live Terminal Status"></span>
            </div>
            <p class="drawer-auth-desc">Direct access to verified African market datasets, econometric models &amp; proprietary reports.</p>
            <div class="drawer-auth-actions">
              <a href="portal.html?mode=signin" class="btn-drawer-auth ghost">🔒 Client Sign In</a>
              <a href="portal.html?mode=signup" class="btn-drawer-auth primary">Open Account →</a>
            </div>
          `}
        </div>

        <!-- Group 1: Intelligence & Terminals -->
        <div class="drawer-nav-group">
          <div class="drawer-group-title">INTELLIGENCE &amp; TERMINALS</div>
          <nav class="drawer-nav" aria-label="Intelligence & Terminals">
            <a href="reports.html" class="drawer-link ${this.currentPath === 'reports.html' ? 'active' : ''}">
              <span class="drawer-num">01</span>
              <span class="drawer-label">Research Store</span>
              <span class="drawer-chip">2,500+ Reports</span>
            </a>
            <a href="markets.html" class="drawer-link ${this.currentPath === 'markets.html' ? 'active' : ''}">
              <span class="drawer-num">02</span>
              <span class="drawer-label">Live Markets Terminal</span>
              <span class="drawer-chip live">Live Feeds</span>
            </a>
            <a href="portal.html" class="drawer-link ${this.currentPath === 'portal.html' ? 'active' : ''}">
              <span class="drawer-num">03</span>
              <span class="drawer-label">Client Portal (Subscribers)</span>
              <span class="drawer-chip">Terminal</span>
            </a>
            <a href="services.html" class="drawer-link ${this.currentPath === 'services.html' ? 'active' : ''}">
              <span class="drawer-num">04</span>
              <span class="drawer-label">Services &amp; Capabilities</span>
              <span class="drawer-arrow">→</span>
            </a>
          </nav>
        </div>

        <!-- Group 2: Research & Advisory -->
        <div class="drawer-nav-group">
          <div class="drawer-group-title">RESEARCH &amp; ADVISORY</div>
          <nav class="drawer-nav" aria-label="Research & Advisory">
            <a href="methodology.html" class="drawer-link ${this.currentPath === 'methodology.html' ? 'active' : ''}">
              <span class="drawer-num">05</span>
              <span class="drawer-label">Our Methodology</span>
              <span class="drawer-arrow">→</span>
            </a>
            <a href="insights.html" class="drawer-link ${this.currentPath === 'insights.html' ? 'active' : ''}">
              <span class="drawer-num">06</span>
              <span class="drawer-label">Market Insights</span>
              <span class="drawer-arrow">→</span>
            </a>
            <a href="blog.html" class="drawer-link ${this.currentPath === 'blog.html' ? 'active' : ''}">
              <span class="drawer-num">07</span>
              <span class="drawer-label">Perspectives &amp; Blog</span>
              <span class="drawer-arrow">→</span>
            </a>
            <a href="news.html" class="drawer-link ${this.currentPath === 'news.html' ? 'active' : ''}">
              <span class="drawer-num">08</span>
              <span class="drawer-label">Newsroom &amp; Wire</span>
              <span class="drawer-arrow">→</span>
            </a>
          </nav>
        </div>

        <!-- Group 3: Organization & Desk -->
        <div class="drawer-nav-group">
          <div class="drawer-group-title">ORGANIZATION &amp; DESK</div>
          <nav class="drawer-nav" aria-label="Organization & Desk">
            <a href="about.html" class="drawer-link ${this.currentPath === 'about.html' ? 'active' : ''}">
              <span class="drawer-num">09</span>
              <span class="drawer-label">About Us</span>
              <span class="drawer-arrow">→</span>
            </a>
            <a href="community.html" class="drawer-link ${this.currentPath === 'community.html' ? 'active' : ''}">
              <span class="drawer-num">10</span>
              <span class="drawer-label">Community &amp; Guilds</span>
              <span class="drawer-arrow">→</span>
            </a>
            <a href="careers.html" class="drawer-link ${this.currentPath === 'careers.html' ? 'active' : ''}">
              <span class="drawer-num">11</span>
              <span class="drawer-label">Careers &amp; Opportunities</span>
              <span class="drawer-arrow">→</span>
            </a>
            <a href="contact.html" class="drawer-link ${this.currentPath === 'contact.html' ? 'active' : ''}">
              <span class="drawer-num">12</span>
              <span class="drawer-label">Contact &amp; Inquiries</span>
              <span class="drawer-arrow">→</span>
            </a>
            <a href="faq.html" class="drawer-link ${this.currentPath === 'faq.html' ? 'active' : ''}">
              <span class="drawer-num">13</span>
              <span class="drawer-label">FAQ &amp; Knowledge Desk</span>
              <span class="drawer-arrow">→</span>
            </a>
            <a href="gdpr.html" class="drawer-link ${this.currentPath === 'gdpr.html' ? 'active' : ''}">
              <span class="drawer-num">14</span>
              <span class="drawer-label">GDPR Compliance</span>
              <span class="drawer-arrow">→</span>
            </a>
          </nav>
        </div>
      </div>

      <!-- 3. Pinned Drawer Footer -->
      <div class="drawer-footer">
        <div class="drawer-quick-row">
          <a href="reports.html#briefcase" class="drawer-cart-pill" title="View Intelligence Briefcase">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="9" cy="21" r="1"></circle>
              <circle cx="20" cy="21" r="1"></circle>
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
            </svg>
            <span>Cart</span>
            <span class="drawer-cart-badge" id="drawer-briefcase-badge">${this.cartCount}</span>
          </a>

          <button type="button" class="drawer-theme-pill" id="drawer-theme-btn" aria-label="Toggle Color Theme">
            ${this.currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode'}
          </button>
        </div>

        ${user ? `
          <button type="button" class="btn-drawer-signout" id="drawer-signout-action">
            Sign Out of Session ⎋
          </button>
        ` : ''}

        <div class="drawer-telemetry">
          <span class="telemetry-live-dot"></span>
          <span>42 VERIFICATION NODES // LIVE TELEMETRY</span>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const toggleBtn = this.querySelector('.mobile-menu-toggle');
    const closeBtn = document.getElementById('drawer-close-btn');
    const drawer = document.getElementById('mobile-drawer');
    const backdrop = document.getElementById('drawer-backdrop');
    const themeBtn = this.querySelector('#theme-toggle-btn');
    const drawerThemeBtn = document.getElementById('drawer-theme-btn');
    const signoutBtn = this.querySelector('#nav-signout-btn');
    const drawerSignoutBtn = document.getElementById('drawer-signout-action');

    const openDrawer = () => {
      if (!drawer || !backdrop) return;
      drawer.classList.add('open');
      backdrop.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      backdrop.setAttribute('aria-hidden', 'false');
      toggleBtn?.setAttribute('aria-expanded', 'true');
      document.body.style.overflow = 'hidden';
      document.body.classList.add('drawer-open');
    };

    const closeDrawer = () => {
      if (!drawer || !backdrop) return;
      drawer.classList.remove('open');
      backdrop.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      backdrop.setAttribute('aria-hidden', 'true');
      toggleBtn?.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
      document.body.classList.remove('drawer-open');
    };

    const handleSignout = () => {
      if (typeof window !== 'undefined' && window.RenalyticaAuth && window.RenalyticaAuth.signOut) {
        window.RenalyticaAuth.signOut();
      } else {
        localStorage.removeItem('renalytica_auth_session');
      }
      this.authUser = null;
      window.dispatchEvent(new CustomEvent('renalytica:auth-change', { detail: { user: null } }));
      window.location.href = 'index.html';
    };

    signoutBtn?.addEventListener('click', handleSignout);
    drawerSignoutBtn?.addEventListener('click', handleSignout);

    const toggleTheme = () => {
      this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', this.currentTheme);
      document.body.setAttribute('data-theme', this.currentTheme);
      if (this.currentTheme === 'dark') {
        document.body.classList.remove('light-canvas');
        document.body.classList.add('dark-canvas');
      } else {
        document.body.classList.add('light-canvas');
        document.body.classList.remove('dark-canvas');
      }
      try {
        localStorage.setItem('renalytica_theme', this.currentTheme);
      } catch (e) {}
      this.updateThemeButton();
      const dtb = document.getElementById('drawer-theme-btn');
      if (dtb) {
        dtb.textContent = this.currentTheme === 'dark' ? '☀️ Light Mode' : '🌙 Dark Mode';
      }
      window.dispatchEvent(new CustomEvent('renalytica:theme-change', {
        detail: { theme: this.currentTheme }
      }));
    };

    themeBtn?.addEventListener('click', toggleTheme);
    drawerThemeBtn?.addEventListener('click', toggleTheme);

    toggleBtn?.addEventListener('click', openDrawer);
    closeBtn?.addEventListener('click', closeDrawer);
    backdrop?.addEventListener('click', closeDrawer);

    // Close on Escape key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && drawer?.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Close drawer when any navigation link inside drawer is clicked
    drawer?.querySelectorAll('.drawer-link, .drawer-brand, .btn-drawer-auth').forEach(link => {
      link.addEventListener('click', closeDrawer);
    });

    // Auto-close if resized to desktop width
    window.addEventListener('resize', () => {
      if (window.innerWidth > 1160 && drawer?.classList.contains('open')) {
        closeDrawer();
      }
    });

    // Cart update event sync
    window.addEventListener('renalytica:cart-updated', (e) => {
      const headerBadge = this.querySelector('#briefcase-badge');
      const drawerBadge = document.getElementById('drawer-briefcase-badge');
      if (e.detail && typeof e.detail.count !== 'undefined') {
        if (headerBadge) headerBadge.textContent = e.detail.count;
        if (drawerBadge) drawerBadge.textContent = e.detail.count;
      }
    });

    // Desktop Mega Dropdown Toggles (Click & Click-outside & Escape handling)
    const dropdownItems = this.querySelectorAll('.nav-dropdown-item');
    dropdownItems.forEach(item => {
      const btn = item.querySelector('.nav-dropdown-btn');
      btn?.addEventListener('click', (e) => {
        e.stopPropagation();
        const isOpen = item.classList.contains('is-open');
        dropdownItems.forEach(d => {
          d.classList.remove('is-open');
          d.querySelector('.nav-dropdown-btn')?.setAttribute('aria-expanded', 'false');
        });
        if (!isOpen) {
          item.classList.add('is-open');
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });

    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) {
        dropdownItems.forEach(d => {
          d.classList.remove('is-open');
          d.querySelector('.nav-dropdown-btn')?.setAttribute('aria-expanded', 'false');
        });
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        dropdownItems.forEach(d => {
          d.classList.remove('is-open');
          d.querySelector('.nav-dropdown-btn')?.setAttribute('aria-expanded', 'false');
        });
      }
    });
  }

  updateThemeButton() {
    const themeBtn = this.querySelector('#theme-toggle-btn');
    if (themeBtn) {
      themeBtn.setAttribute('title', this.currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
      themeBtn.setAttribute('aria-label', this.currentTheme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode');
    }
  }
}

if (typeof window !== 'undefined') {
  window.HeaderNav = HeaderNav;
}

if (!customElements.get('header-nav')) {
  customElements.define('header-nav', HeaderNav);
}
