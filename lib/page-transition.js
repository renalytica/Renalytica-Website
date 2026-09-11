/**
 * RENALYTICA SIGNATURE REVEAL & VORTEX TRANSITION ENGINE
 * Orchestrates multi-stage emblem assembly (staggered chart blocks, ascending line draw,
 * node pops, arrowhead reveal) followed by high-velocity vortex exit prior to page routing.
 */

(function() {
  'use strict';

  let isTransitioning = false;
  let safetyTimeout = null;

  // The Master Emblem SVG Template
  const OVERLAY_ID = 'renalytica-overlay';
  const OVERLAY_HTML = `
    <div id="${OVERLAY_ID}" class="transition-overlay hidden" aria-hidden="true">
      <div id="renalytica-logo" class="logo-container">
        <svg viewBox="0 0 100 100" style="width: 100%; height: 100%; overflow: visible;" aria-label="Renalytica Transition Reveal">
          <!-- Box-style Bars (Built from individual blocks) -->
          <g class="chart-bars">
            <!-- Bar 1 -->
            <rect x="10" y="82" width="12" height="8" fill="#ef7d00" class="animate-box delay-1" />
            <rect x="10" y="72" width="12" height="8" fill="#ef7d00" class="animate-box delay-2" />
            
            <!-- Bar 2 -->
            <rect x="30" y="82" width="12" height="8" fill="#ef7d00" class="animate-box delay-2" />
            <rect x="30" y="72" width="12" height="8" fill="#ef7d00" class="animate-box delay-3" />
            <rect x="30" y="62" width="12" height="8" fill="#ef7d00" class="animate-box delay-4" />
            <rect x="30" y="52" width="12" height="8" fill="#ef7d00" class="animate-box delay-5" />
            
            <!-- Bar 3 -->
            <rect x="50" y="82" width="12" height="8" fill="#ef7d00" class="animate-box delay-3" />
            <rect x="50" y="72" width="12" height="8" fill="#ef7d00" class="animate-box delay-4" />
            <rect x="50" y="62" width="12" height="8" fill="#ef7d00" class="animate-box delay-5" />
            <rect x="50" y="52" width="12" height="8" fill="#ef7d00" class="animate-box delay-6" />
            <rect x="50" y="42" width="12" height="8" fill="#ef7d00" class="animate-box delay-7" />
            
            <!-- Bar 4 -->
            <rect x="70" y="82" width="12" height="8" fill="#ef7d00" class="animate-box delay-4" />
            <rect x="70" y="72" width="12" height="8" fill="#ef7d00" class="animate-box delay-5" />
            <rect x="70" y="62" width="12" height="8" fill="#ef7d00" class="animate-box delay-6" />
            <rect x="70" y="52" width="12" height="8" fill="#ef7d00" class="animate-box delay-7" />
            <rect x="70" y="42" width="12" height="8" fill="#ef7d00" class="animate-box delay-8" />
            <rect x="70" y="32" width="12" height="8" fill="#ef7d00" class="animate-box delay-9" />
            <rect x="70" y="22" width="12" height="8" fill="#ef7d00" class="animate-box delay-10" />
          </g>

          <!-- Growing Arrow Line -->
          <path 
            d="M 5 90 L 35 65 L 65 45 L 90 20" 
            fill="none" 
            stroke="#ef7d00" 
            stroke-width="6" 
            stroke-linecap="round"
            stroke-linejoin="round"
            class="animate-line"
          />

          <!-- Nodes/Dots -->
          <circle cx="35" cy="65" r="5" fill="#ef7d00" class="animate-dot-1" />
          <circle cx="65" cy="45" r="5" fill="#ef7d00" class="animate-dot-2" />
          
          <!-- Arrow Head -->
          <polygon points="80,15 95,10 95,25" fill="#ef7d00" class="animate-arrow" />
        </svg>
      </div>
    </div>
  `;

  /**
   * Ensures the overlay DOM node exists
   */
  function ensureOverlay() {
    let overlay = document.getElementById(OVERLAY_ID);
    if (!overlay) {
      const wrapper = document.createElement('div');
      wrapper.innerHTML = OVERLAY_HTML.trim();
      overlay = wrapper.firstElementChild;
      document.body.appendChild(overlay);
    }
    return overlay;
  }

  /**
   * Resets overlay to clean dormant hidden state
   */
  function resetOverlay() {
    const overlay = document.getElementById(OVERLAY_ID);
    if (overlay) {
      overlay.classList.remove('is-animating', 'vortex-active');
      overlay.classList.add('hidden');
      overlay.setAttribute('aria-hidden', 'true');
    }
    isTransitioning = false;
    if (safetyTimeout) {
      clearTimeout(safetyTimeout);
      safetyTimeout = null;
    }
  }

  /**
   * Triggers the full signature reveal animation and redirects
   * @param {string|null} destinationUrl - URL to navigate to once vortex completes
   */
  function triggerReveal(destinationUrl = null) {
    if (isTransitioning) return;
    isTransitioning = true;

    const overlay = ensureOverlay();
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Fast-path for users who requested reduced motion
    if (prefersReducedMotion) {
      overlay.classList.remove('hidden');
      overlay.setAttribute('aria-hidden', 'false');
      setTimeout(() => {
        if (destinationUrl) {
          window.location.href = destinationUrl;
        } else {
          resetOverlay();
        }
      }, 150);
      return;
    }

    // 1. Reset any previous animation states and force reflow
    overlay.classList.remove('hidden', 'vortex-active');
    overlay.setAttribute('aria-hidden', 'false');
    void overlay.offsetWidth; // Force layout recalculation to restart SVG animations
    overlay.classList.add('is-animating');

    // 2. Logo build-up phase (1250ms for snappy 1.8s overall duration)
    setTimeout(() => {
      // Trigger the vortex exit animation (0.55s)
      overlay.classList.add('vortex-active');

      // 3. Complete vortex animation and navigate (550ms, total = 1800ms = 1.8s)
      setTimeout(() => {
        if (destinationUrl) {
          window.location.href = destinationUrl;
        } else {
          // Preview/demo mode: smoothly hide overlay
          overlay.classList.remove('is-animating', 'vortex-active');
          overlay.classList.add('hidden');
          overlay.setAttribute('aria-hidden', 'true');
          isTransitioning = false;
        }
      }, 550);

    }, 1250);

    // Fallback safety watchdog (reset after 5s if navigation is blocked/delayed)
    safetyTimeout = setTimeout(() => {
      if (isTransitioning) {
        resetOverlay();
      }
    }, 5000);
  }

  /**
   * Determines whether an anchor points to an internal page transition
   */
  function isInternalTransitionLink(anchor) {
    if (!anchor || !anchor.getAttribute) return false;

    // Check explicit opt-out
    if (anchor.hasAttribute('data-no-transition') || anchor.classList.contains('no-transition')) {
      return false;
    }

    // Ignore new tabs, windows, or frame targets
    const target = anchor.getAttribute('target');
    if (target && target !== '_self') return false;

    // Ignore download links
    if (anchor.hasAttribute('download')) return false;

    const href = anchor.getAttribute('href');
    if (!href) return false;

    // Ignore anchor links, javascript, mailto, tel
    if (href.startsWith('#') || href.startsWith('javascript:') || href.startsWith('mailto:') || href.startsWith('tel:')) {
      return false;
    }

    // Ignore external origins
    try {
      const resolved = new URL(anchor.href, window.location.href);

      // In file:/// environment
      if (window.location.protocol === 'file:') {
        if (resolved.protocol !== 'file:') return false;
        // Don't trigger if it's the exact same file and only hash differs
        if (resolved.pathname === window.location.pathname && resolved.search === window.location.search && resolved.hash) {
          return false;
        }
        // Check if destination is an HTML file
        return resolved.pathname.endsWith('.html') || resolved.pathname.endsWith('/') || !resolved.pathname.includes('.');
      }

      // In HTTP/HTTPS environment
      if (resolved.origin !== window.location.origin) {
        return false;
      }

      // Same page anchor navigation
      if (resolved.pathname === window.location.pathname && resolved.search === window.location.search && resolved.hash) {
        return false;
      }

      return true;
    } catch (e) {
      // Fallback relative path check
      return !href.startsWith('http:') && !href.startsWith('https:') && !href.startsWith('//');
    }
  }

  /**
   * Global click interceptor
   */
  function handleDocumentClick(e) {
    // Ignore right/middle clicks or modified clicks (Ctrl, Cmd, Shift, Alt)
    if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey) {
      return;
    }

    // Check for explicit button navigation
    const navBtn = e.target.closest('button[data-href], [data-transition-to]');
    if (navBtn) {
      const dest = navBtn.getAttribute('data-href') || navBtn.getAttribute('data-transition-to');
      if (dest) {
        e.preventDefault();
        triggerReveal(dest);
        return;
      }
    }

    // Check for anchor links
    const anchor = e.target.closest('a');
    if (!anchor) return;

    if (isInternalTransitionLink(anchor)) {
      e.preventDefault();
      triggerReveal(anchor.href);
    }
  }

  // Setup DOM and Event Handlers
  function init() {
    ensureOverlay();
    document.addEventListener('click', handleDocumentClick, false);

    // Browser back/forward navigation (bfcache) restore handler
    window.addEventListener('pageshow', function(event) {
      resetOverlay();
    });

    window.addEventListener('popstate', function() {
      resetOverlay();
    });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  // Expose global methods
  window.triggerReveal = triggerReveal;
  window.RenalyticaTransition = {
    trigger: triggerReveal,
    reset: resetOverlay
  };

})();
