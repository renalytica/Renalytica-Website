/**
 * RENALYTICA NATIVE MULTI-CHANNEL CHAT WIDGET
 * Provides instant direct contact channels across X/Twitter, WhatsApp, Phone, Instagram, Email, and Telegram.
 * Floating launcher with notification badge and interactive chat bubble popup.
 */

class MultiChannelChat extends HTMLElement {
  connectedCallback() {
    this.ensureStylesLoaded();
    this.render();
    this.bindEvents();
  }

  ensureStylesLoaded() {
    if (!document.querySelector('link[href*="styles/chat-widget.css"]')) {
      const link = document.createElement('link');
      link.rel = 'stylesheet';
      link.href = 'styles/chat-widget.css';
      document.head.appendChild(link);
    }
  }

  render() {
    // Format current local time (e.g. "7:53 PM")
    const now = new Date();
    const timeString = now.toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });

    this.innerHTML = `
      <div class="renalytica-chat-widget" id="renalytica-chat-root">
        <!-- Floating Launcher Button -->
        <button type="button" class="chat-launcher-btn" id="chat-launcher-toggle" aria-label="Open Direct Support Channels" aria-expanded="false">
          <span class="chat-launcher-tooltip">Chat with Research Experts</span>
          
          <!-- Launcher Icon: Smooth Rounded Speech Bubble with 3 Dots -->
          <div class="chat-launcher-icon icon-bubble">
            <svg viewBox="0 0 24 24" fill="none">
              <!-- White Speech Bubble -->
              <path d="M20 11.5c0 4.142-3.582 7.5-8 7.5-1.393 0-2.705-.333-3.837-.923L4 19.5l1.558-3.62A7.37 7.37 0 0 1 4 11.5C4 7.358 7.582 4 12 4s8 3.358 8 7.5z" fill="#FFFFFF"/>
              <!-- Three Orange Dots -->
              <circle cx="8.8" cy="11.5" r="1.25" fill="#FF8000"/>
              <circle cx="12" cy="11.5" r="1.25" fill="#FF8000"/>
              <circle cx="15.2" cy="11.5" r="1.25" fill="#FF8000"/>
            </svg>
          </div>

          <!-- Red Notification Dot -->
          <span class="chat-launcher-badge" id="chat-notification-badge" aria-label="1 new message"></span>
        </button>

        <!-- Chat Modal / Popup Card -->
        <div class="chat-card-popup" id="chat-card-popup" role="dialog" aria-modal="true" aria-labelledby="chat-expert-title">
          
          <!-- Card Header -->
          <div class="chat-card-header">
            <div class="chat-header-profile">
              <div class="chat-avatar-frame">
                <img src="assets/brand/renalytica_emblem.png" alt="Renalytica Research" class="chat-avatar-img" />
                <span class="chat-online-dot" title="Online & Available"></span>
              </div>
              <div class="chat-header-text">
                <h3 class="chat-header-title" id="chat-expert-title">Chat</h3>
                <span class="chat-header-subtitle">Research and Data Analysis Expert</span>
              </div>
            </div>
            <button type="button" class="chat-close-btn" id="chat-close-trigger" aria-label="Close Chat Window">
              ✕
            </button>
          </div>

          <!-- Card Body -->
          <div class="chat-card-body">
            <!-- Timestamp -->
            <div class="chat-timestamp" id="chat-live-timestamp">${timeString}</div>

            <!-- Assistant Greeting Message Bubble -->
            <div class="chat-bubble-row">
              <div class="bubble-avatar-mini">
                <img src="assets/brand/renalytica_emblem.png" alt="Renalytica" />
              </div>
              <div class="chat-message-bubble">
                Sourcing for reliable data for your research project? Let Renalytica help you.
              </div>
            </div>

            <!-- Start Chat CTA -->
            <div class="chat-channels-heading">
              Start Chat on:
            </div>

            <!-- 6 Direct Channel Buttons -->
            <div class="chat-channels-grid">
              
              <!-- 1. Twitter / X -->
              <a href="https://x.com/renalytica" target="_blank" rel="noopener noreferrer" class="channel-pill-btn btn-twitter" data-tip="Chat on X" aria-label="Chat on X (Twitter)">
                <svg viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>

              <!-- 2. WhatsApp -->
              <a href="https://wa.me/2349020846138?text=Hello%20Renalytica%20team,%20I%20would%20like%20to%20inquire%20about%20your%20market%20research%20reports." target="_blank" rel="noopener noreferrer" class="channel-pill-btn btn-whatsapp" data-tip="WhatsApp" aria-label="Chat on WhatsApp">
                <svg viewBox="0 0 24 24">
                  <path d="M12.031 6.172c-3.181 0-5.767 2.586-5.768 5.766-.001 1.298.38 2.27 1.019 3.287l-.711 2.598 2.664-.698c.969.585 1.961.905 2.796.905 3.181 0 5.767-2.587 5.768-5.766.001-3.181-2.585-5.792-5.768-5.792zm3.376 8.204c-.149.419-.757.771-1.054.821-.297.05-.668.08-2.029-.482-1.636-.677-2.684-2.339-2.766-2.449-.081-.11-.663-.881-.663-1.681 0-.8.419-1.192.568-1.353.149-.162.325-.203.433-.203.108 0 .216.002.311.007.108.005.244-.041.379.284.149.352.514 1.259.555 1.348.041.09.068.196.014.305-.054.108-.081.176-.162.271-.081.095-.176.216-.244.284-.081.081-.166.169-.071.332.095.162.419.691.899 1.118.618.55 1.14.72 1.302.801.162.081.257.068.352-.041.095-.108.406-.474.514-.636.108-.162.216-.135.366-.081.149.054.947.447 1.11.528.162.081.271.122.311.189.041.068.041.393-.108.812z"/>
                  <path d="M12.004 2c-5.523 0-10 4.477-10 10 0 1.81.487 3.541 1.414 5.061l-1.418 5.189 5.342-1.401c1.47.809 3.136 1.236 4.842 1.236 5.523 0 10-4.477 10-10 0-5.523-4.477-10-10-10zm0 18.232c-1.574 0-3.119-.425-4.469-1.229l-.321-.191-3.323.871.887-3.238-.209-.333c-.881-1.404-1.348-3.033-1.348-4.712 0-4.76 3.873-8.633 8.633-8.633 4.76 0 8.633 3.873 8.633 8.633 0 4.76-3.873 8.632-8.483 8.632z"/>
                </svg>
              </a>

              <!-- 3. Phone Call -->
              <a href="tel:+2349020846138" class="channel-pill-btn btn-phone" data-tip="Call Us" aria-label="Direct Phone Desk">
                <svg viewBox="0 0 24 24">
                  <path d="M6.62 10.79a15.053 15.053 0 006.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
              </a>

              <!-- 4. Instagram -->
              <a href="https://www.instagram.com/renalytica/" target="_blank" rel="noopener noreferrer" class="channel-pill-btn btn-instagram" data-tip="Instagram" aria-label="Follow on Instagram">
                <svg viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>

              <!-- 5. Email -->
              <a href="mailto:info@renalytica.com?subject=Research%20Inquiry%20-%20Renalytica" class="channel-pill-btn btn-email" data-tip="Email Us" aria-label="Send Email">
                <svg viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
              </a>

              <!-- 6. Telegram -->
              <a href="https://t.me/+2349020846138" target="_blank" rel="noopener noreferrer" class="channel-pill-btn btn-telegram" data-tip="Telegram" aria-label="Chat on Telegram (+234 902 084 6138)">
                <svg viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </a>

            </div>
          </div>
        </div>
      </div>
    `;
  }

  bindEvents() {
    const root = this.querySelector('#renalytica-chat-root');
    const toggleBtn = this.querySelector('#chat-launcher-toggle');
    const closeBtn = this.querySelector('#chat-close-trigger');
    const popup = this.querySelector('#chat-card-popup');
    const badge = this.querySelector('#chat-notification-badge');

    const openChat = () => {
      root.classList.add('is-open');
      toggleBtn.setAttribute('aria-expanded', 'true');
      if (badge) badge.style.display = 'none';
      
      // Update timestamp when opened
      const timeEl = this.querySelector('#chat-live-timestamp');
      if (timeEl) {
        timeEl.textContent = new Date().toLocaleTimeString([], { hour: 'numeric', minute: '2-digit', hour12: true });
      }
    };

    const closeChat = () => {
      root.classList.remove('is-open');
      toggleBtn.setAttribute('aria-expanded', 'false');
    };

    toggleBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      if (root.classList.contains('is-open')) {
        closeChat();
      } else {
        openChat();
      }
    });

    closeBtn?.addEventListener('click', (e) => {
      e.stopPropagation();
      closeChat();
    });

    // Close when clicking outside
    document.addEventListener('click', (e) => {
      if (root && root.classList.contains('is-open') && !root.contains(e.target)) {
        closeChat();
      }
    });

    // Close on ESC key
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && root && root.classList.contains('is-open')) {
        closeChat();
      }
    });
  }
}

// Register Custom Element and auto-mount
if (typeof window !== 'undefined') {
  window.MultiChannelChat = MultiChannelChat;
  if (!customElements.get('multi-channel-chat')) {
    customElements.define('multi-channel-chat', MultiChannelChat);
  }

  // Auto-mount function: ensures the multi-channel chat widget appears on all pages
  function autoMountMultiChannelChat() {
    if (document.querySelector('multi-channel-chat') || document.getElementById('renalytica-chat-root')) {
      return; // Already present
    }
    const chatEl = document.createElement('multi-channel-chat');
    document.body.appendChild(chatEl);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', autoMountMultiChannelChat);
  } else {
    autoMountMultiChannelChat();
  }
}
