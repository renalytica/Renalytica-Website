/**
 * RENALYTICA GLOBAL NAVIGATION BAR
 * Implements Section 2 of 01_HOME_PAGE_CONTENT.md
 * Wordmark with tagline 'powering smart decisions', exact menu links,
 * Cart counter, and Light/Dark Mode Switcher.
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

    this.render();
    this.bindEvents();
    this.updateThemeButton();
  }

  render() {
    const navLinks = [
      { name: 'Research Store', href: 'reports.html' },
      { name: 'Services', href: 'services.html' },
      { name: 'Our Methodology', href: 'methodology.html' },
      { name: 'Community', href: 'community.html' },
      { name: 'Market Insights', href: 'insights.html' },
      { name: 'About Us', href: 'about.html' },
      { name: 'Contact', href: 'contact.html' }
    ];

    const linksHtml = navLinks.map(link => {
      const isActive = this.currentPath === link.href;
      return `
        <a href="${link.href}" class="nav-item ${isActive ? 'active' : ''}">
          <span class="nav-dot"></span>
          ${link.name}
        </a>
      `;
    }).join('');

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

            <!-- Client Portal Link -->
            <a href="portal.html" class="briefcase-btn portal-nav-btn" title="Subscriber Intelligence Portal">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              <span>PORTAL</span>
            </a>

            <!-- Primary Browse Reports Action Button -->
            <a href="reports.html" class="btn-pill-primary nav-cta">
              Browse Reports →
            </a>

            <!-- Mobile Menu Toggle -->
            <button class="menu-capsule mobile-menu-toggle" aria-label="Toggle Menu" aria-expanded="false">
              <span class="capsule-dots">••••</span>
              <span class="capsule-text">MENU</span>
            </button>
          </div>
        </div>

        <!-- Mobile Drawer Overlay -->
        <div class="mobile-drawer" id="mobile-drawer" aria-hidden="true">
          <div class="drawer-header">
            <a href="index.html" class="brand-logo-lockup">
              <img src="assets/brand/renalytica_logo_horizontal_white.png" alt="Renalytica" height="28" />
            </a>
            <button class="drawer-close" aria-label="Close Menu">✕</button>
          </div>
          <nav class="drawer-nav">
            <a href="reports.html" class="drawer-link">
              <span class="drawer-num">01</span> Research Store
            </a>
            <a href="portal.html" class="drawer-link">
              <span class="drawer-num">02</span> Client Portal (Subscribers)
            </a>
            <a href="services.html" class="drawer-link">
              <span class="drawer-num">03</span> Services &amp; Capabilities
            </a>
            <a href="methodology.html" class="drawer-link">
              <span class="drawer-num">04</span> Our Methodology
            </a>
            <a href="community.html" class="drawer-link">
              <span class="drawer-num">05</span> Community &amp; Guilds
            </a>
            <a href="insights.html" class="drawer-link">
              <span class="drawer-num">06</span> Market Insights
            </a>
            <a href="about.html" class="drawer-link">
              <span class="drawer-num">07</span> About Us
            </a>
            <a href="blog.html" class="drawer-link">
              <span class="drawer-num">08</span> Perspectives &amp; Blog
            </a>
            <a href="news.html" class="drawer-link">
              <span class="drawer-num">09</span> Newsroom &amp; Wire
            </a>
            <a href="contact.html" class="drawer-link">
              <span class="drawer-num">10</span> Contact &amp; Inquiries
            </a>
            <a href="careers.html" class="drawer-link">
              <span class="drawer-num">11</span> Careers &amp; Opportunities
            </a>
            <a href="faq.html" class="drawer-link">
              <span class="drawer-num">12</span> FAQ &amp; Knowledge Desk
            </a>
          </nav>
          <div class="drawer-footer">
            <div class="drawer-theme-row">
              <span>Color Theme:</span>
              <button class="theme-toggle-drawer-btn" id="drawer-theme-btn">
                Toggle ${this.currentTheme === 'dark' ? 'Light ☀️' : 'Dark 🌙'}
              </button>
            </div>
            <a href="reports.html" class="btn-pill-primary w-full text-center">Browse All Reports →</a>
          </div>
        </div>
      </header>
    `;
  }

  bindEvents() {
    const toggleBtn = this.querySelector('.mobile-menu-toggle');
    const closeBtn = this.querySelector('.drawer-close');
    const drawer = this.querySelector('#mobile-drawer');
    const themeBtn = this.querySelector('#theme-toggle-btn');
    const drawerThemeBtn = this.querySelector('#drawer-theme-btn');

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
      window.dispatchEvent(new CustomEvent('renalytica:theme-change', {
        detail: { theme: this.currentTheme }
      }));
    };

    themeBtn?.addEventListener('click', toggleTheme);
    drawerThemeBtn?.addEventListener('click', () => {
      toggleTheme();
      if (drawerThemeBtn) {
        drawerThemeBtn.textContent = `Toggle ${this.currentTheme === 'dark' ? 'Light ☀️' : 'Dark 🌙'}`;
      }
    });

    toggleBtn?.addEventListener('click', () => {
      drawer.classList.add('open');
      drawer.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    });

    closeBtn?.addEventListener('click', () => {
      drawer.classList.remove('open');
      drawer.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    });

    window.addEventListener('renalytica:cart-updated', (e) => {
      const badge = this.querySelector('#briefcase-badge');
      if (badge && e.detail && typeof e.detail.count !== 'undefined') {
        badge.textContent = e.detail.count;
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
