/**
 * RENALYTICA MEGA FOOTER COMPONENT
 * Implements Section 12 of 01_HOME_PAGE_CONTENT.md
 * Enhanced with large, full-bleed interactive particle point-cloud logo watermark.
 */

class MegaFooter extends HTMLElement {
  connectedCallback() {
    this.render();
    this.initTelemetryDataMatrix();
  }

  render() {
    this.innerHTML = `
      <footer class="mega-footer-v2">
        <div class="container footer-content-wrap">
          <div class="footer-grid-v2">
            <!-- Column 1: Company Info -->
            <div class="footer-col-v2 brand-col-v2">
              <a href="index.html" class="footer-brand-lockup">
                <img src="assets/brand/renalytica_logo_horizontal.png" alt="Renalytica" class="brand-img logo-light-theme" height="38" />
                <img src="assets/brand/renalytica_logo_horizontal_white.png" alt="Renalytica" class="brand-img logo-dark-theme" height="38" />
                <span class="footer-tagline-text">powering smart decisions</span>
              </a>
              <p class="footer-lead-p">
                Renalytica removes the guesswork from business decisions. We provide clear, high-quality market reports and data analysis across agriculture, commerce, and the economy.
              </p>
              <div class="footer-contact-block">
                <a href="tel:+12128593320" class="contact-line">
                  <span class="c-label">US Desk:</span> <strong>+1 (212) 859-3320</strong>
                </a>
                <a href="https://wa.me/2348137538723" class="contact-line">
                  <span class="c-label">WhatsApp:</span> <strong>+234 813 753 8723</strong>
                </a>
                <a href="mailto:info@renalytica.com" class="contact-line">
                  <span class="c-label">Email:</span> <strong>info@renalytica.com</strong>
                </a>
              </div>
            </div>

            <!-- Column 2: Quick Links (Sectors) -->
            <div class="footer-col-v2">
              <h4 class="col-heading-v2">KEY SECTORS</h4>
              <ul class="footer-ul-v2">
                <li><a href="reports.html">Research Store (All Reports)</a></li>
                <li><a href="reports.html?sector=agriculture">Agriculture & Agribusiness</a></li>
                <li><a href="reports.html?sector=economy">Macroeconomics & Currency</a></li>
                <li><a href="reports.html?sector=retail">Commerce, Retail & Logistics</a></li>
                <li><a href="reports.html?sector=energy">Energy & Natural Resources</a></li>
              </ul>
            </div>

            <!-- Column 3: Our Services -->
            <div class="footer-col-v2">
              <h4 class="col-heading-v2">OUR SERVICES</h4>
              <ul class="footer-ul-v2">
                <li><a href="services.html">Industry Research Reports</a></li>
                <li><a href="contact.html">Custom Research Studies</a></li>
                <li><a href="services.html#subscriptions">Corporate Subscriptions</a></li>
                <li><a href="services.html#briefings">Executive Board Briefings</a></li>
                <li><a href="insights.html">Market Insights & Dispatches</a></li>
                <li><a href="methodology.html">How We Verify Data</a></li>
              </ul>
            </div>

            <!-- Column 4: Support & Trust -->
            <div class="footer-col-v2">
              <h4 class="col-heading-v2">SUPPORT & TRUST</h4>
              <ul class="footer-ul-v2">
                <li><a href="about.html">About Renalytica</a></li>
                <li><a href="community.html">Community Network &amp; Guilds</a></li>
                <li><a href="careers.html">Careers &amp; Fellowships</a></li>
                <li><a href="blog.html">Perspectives &amp; Op-Eds (Blog)</a></li>
                <li><a href="news.html">Newsroom &amp; Market Wire</a></li>
                <li><a href="faq.html">Frequently Asked Questions</a></li>
                <li><a href="privacy.html">Privacy Policy</a></li>
                <li><a href="terms.html">Terms of Service</a></li>
                <li><a href="faq.html#delivery">Report Delivery Guarantee</a></li>
                <li><a href="contact.html">Get in Touch & Custom Quotes</a></li>
              </ul>
            </div>
          </div>

          <!-- Bottom Bar -->
          <div class="footer-bottom-bar-v2">
            <span class="copy-notice">© 2026 Renalytica. All Rights Reserved.</span>
            <div class="trust-tags">
              <span class="trust-tag">VERIFIED GROUND TRUTH</span>
              <span class="trust-tag">UNLOCKED EXCEL MODELS</span>
              <span class="trust-tag">100% INDEPENDENT</span>
            </div>
          </div>
        </div>

        <!-- TAIL-END INTERACTIVE ASCII TELEMETRY DATA-MATRIX STAGE -->
        <div class="footer-matrix-stage">
          <div class="matrix-hud-header">
            <div class="matrix-hud-left">
              <span class="matrix-live-dot"></span>
              <span class="matrix-hud-title">ACTIVE DATA MATRIX // GEO-TOPOGRAPHIC TELEMETRY STREAM</span>
            </div>
            <div class="matrix-coord-chip" id="matrix-coord-chip">
              SYS_LOC: [06°31'N, 03°23'E] // DENSITY: 2,400 NODES // HOVER TO ENGAGE
            </div>
          </div>

          <div class="matrix-canvas-wrapper">
            <canvas id="footer-data-matrix-canvas" aria-label="Interactive ASCII Telemetry Matrix"></canvas>
          </div>
        </div>
      </footer>
    `;
  }

  initTelemetryDataMatrix() {
    const canvas = this.querySelector('#footer-data-matrix-canvas');
    if (!canvas) return;

    const coordChip = this.querySelector('#matrix-coord-chip');
    const ctx = canvas.getContext('2d');

    let width = 0;
    let height = 0;
    let cols = 0;
    let rows = 0;
    const cellW = 13;
    const cellH = 14;

    let mouse = { x: -2000, y: -2000, radius: 180, isOver: false };
    let time = 0;
    let animId = null;
    let isVisible = true;
    let activation = 0; // Smooth transition factor for wordmark emergence (0 = ambient, 1 = fully active)
    let wordmarkAlpha = null; // High-resolution pixel-sampled density array for "RENALYTICA"

    const glyphsBase = ['·', '+', 'x', '-', '·'];
    const glyphsCluster = ['+', 'x', '*', '#', '·'];
    const glyphsWordmark = ['█', '#', 'X', '■', '✦'];

    const getTheme = () => {
      return document.documentElement.getAttribute('data-theme') || 'light';
    };

    const resize = () => {
      const container = canvas.parentElement;
      if (!container) return;
      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);

      width = rect.width > 0 ? rect.width : (window.innerWidth || 1200);
      height = 320; // Stately, cinematic footer telemetry stage

      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);

      cols = Math.ceil(width / cellW);
      rows = Math.ceil(height / cellH);

      rasterizeWordmarkMask();
    };

    // Deterministic 5x7 dot-matrix bitmap font for R-E-N-A-L-Y-T-I-C-A
    // Guarantees the wordmark ALWAYS renders even if web fonts fail to load or canvas is local
    const populateBitmapWordmarkFallback = () => {
      wordmarkAlpha = new Uint8Array(cols * rows);
      const letterBitmaps = {
        'R': [
          [1,1,1,1,0],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,1,1,1,0],
          [1,0,1,0,0],
          [1,0,0,1,0],
          [1,0,0,0,1]
        ],
        'E': [
          [1,1,1,1,1],
          [1,0,0,0,0],
          [1,0,0,0,0],
          [1,1,1,1,0],
          [1,0,0,0,0],
          [1,0,0,0,0],
          [1,1,1,1,1]
        ],
        'N': [
          [1,0,0,0,1],
          [1,1,0,0,1],
          [1,0,1,0,1],
          [1,0,0,1,1],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,0,0,0,1]
        ],
        'A': [
          [0,1,1,1,0],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,1,1,1,1],
          [1,0,0,0,1],
          [1,0,0,0,1],
          [1,0,0,0,1]
        ],
        'L': [
          [1,0,0,0,0],
          [1,0,0,0,0],
          [1,0,0,0,0],
          [1,0,0,0,0],
          [1,0,0,0,0],
          [1,0,0,0,0],
          [1,1,1,1,1]
        ],
        'Y': [
          [1,0,0,0,1],
          [1,0,0,0,1],
          [0,1,0,1,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0]
        ],
        'T': [
          [1,1,1,1,1],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0],
          [0,0,1,0,0]
        ],
        'I': [
          [1,1,1],
          [0,1,0],
          [0,1,0],
          [0,1,0],
          [0,1,0],
          [0,1,0],
          [1,1,1]
        ],
        'C': [
          [0,1,1,1,1],
          [1,0,0,0,0],
          [1,0,0,0,0],
          [1,0,0,0,0],
          [1,0,0,0,0],
          [1,0,0,0,0],
          [0,1,1,1,1]
        ]
      };

      const word = ['R','E','N','A','L','Y','T','I','C','A'];
      let totalColsNeeded = 0;
      word.forEach((letter, i) => {
        const bm = letterBitmaps[letter];
        totalColsNeeded += bm[0].length + (i < word.length - 1 ? 2 : 0);
      });

      const startCol = Math.max(1, Math.floor((cols - totalColsNeeded) / 2));
      const startRow = Math.max(1, Math.floor((rows - 7) / 2));

      let currentCol = startCol;
      word.forEach((letter) => {
        const bm = letterBitmaps[letter];
        const w = bm[0].length;
        for (let r = 0; r < 7; r++) {
          for (let c = 0; c < w; c++) {
            if (bm[r][c] === 1) {
              const targetR = startRow + r;
              const targetC = currentCol + c;
              if (targetR >= 0 && targetR < rows && targetC >= 0 && targetC < cols) {
                wordmarkAlpha[targetR * cols + targetC] = 255;
              }
            }
          }
        }
        currentCol += w + 2; // 2 blank columns spacing
      });
    };

    // Rasterize "RENALYTICA" at high resolution across full width & height
    const rasterizeWordmarkMask = () => {
      if (width <= 0 || height <= 0) return;
      const off = document.createElement('canvas');
      off.width = width;
      off.height = height;
      const offCtx = off.getContext('2d');
      offCtx.clearRect(0, 0, width, height);

      const text = 'RENALYTICA';
      const numChars = text.length;

      // Fit font size dynamically to viewport width and height
      let fontSize = Math.min(Math.floor(width * 0.105), Math.floor(height * 0.46));
      fontSize = Math.max(26, fontSize);

      offCtx.font = `900 ${fontSize}px 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial Black, Impact, sans-serif`;
      offCtx.textAlign = 'center';
      offCtx.textBaseline = 'middle';
      offCtx.fillStyle = '#FFFFFF';

      let totalCharWidth = 0;
      const charWidths = [];
      for (let i = 0; i < numChars; i++) {
        const w = offCtx.measureText(text[i]).width || (fontSize * 0.65);
        charWidths.push(w);
        totalCharWidth += w;
      }

      const desiredSpacing = Math.max(6, fontSize * 0.16);
      let totalWidth = totalCharWidth + (numChars - 1) * desiredSpacing;

      const maxWidth = width * 0.86;
      if (totalWidth > maxWidth && totalWidth > 0) {
        const scale = maxWidth / totalWidth;
        fontSize = Math.max(20, Math.floor(fontSize * scale));
        offCtx.font = `900 ${fontSize}px 'Montserrat', -apple-system, BlinkMacSystemFont, 'Segoe UI', Arial Black, Impact, sans-serif`;
        totalCharWidth = 0;
        for (let i = 0; i < numChars; i++) {
          const w = offCtx.measureText(text[i]).width || (fontSize * 0.65);
          charWidths[i] = w;
          totalCharWidth += w;
        }
        totalWidth = totalCharWidth + (numChars - 1) * (desiredSpacing * scale);
      }

      const spacing = (totalWidth - totalCharWidth) / (numChars - 1);
      let currentX = (width - totalWidth) / 2 + charWidths[0] / 2;
      const centerY = height / 2;

      for (let i = 0; i < numChars; i++) {
        offCtx.fillText(text[i], Math.round(currentX), Math.round(centerY));
        if (i < numChars - 1) {
          currentX += charWidths[i] / 2 + spacing + charWidths[i + 1] / 2;
        }
      }

      const imgData = offCtx.getImageData(0, 0, width, height).data;
      wordmarkAlpha = new Uint8Array(cols * rows);

      let nonZeroCount = 0;
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const sampleX = Math.min(width - 1, Math.max(0, Math.round(c * cellW + cellW / 2)));
          const sampleY = Math.min(height - 1, Math.max(0, Math.round(r * cellH + cellH / 2)));
          const idx = (sampleY * width + sampleX) * 4;
          const a = imgData[idx + 3];
          wordmarkAlpha[r * cols + c] = a;
          if (a > 30) nonZeroCount++;
        }
      }

      // If sampling returned few pixels (e.g. font loading race condition), use infallible bitmap font
      if (nonZeroCount < 30) {
        populateBitmapWordmarkFallback();
      }
    };

    // Responsive observers
    if (window.ResizeObserver && canvas.parentElement) {
      const ro = new ResizeObserver(() => resize());
      ro.observe(canvas.parentElement);
    }

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(() => resize());
    }

    // Intersection observer to pause rendering when not in view (saving CPU)
    if ('IntersectionObserver' in window) {
      const io = new IntersectionObserver((entries) => {
        isVisible = entries[0].isIntersecting;
      }, { threshold: 0.02 });
      io.observe(canvas);
    }

    const stage = this.querySelector('.footer-matrix-stage') || canvas;

    const onMove = (clientX, clientY) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = clientX - rect.left;
      mouse.y = clientY - rect.top;
      mouse.isOver = true;

      if (coordChip) {
        const clampedY = Math.max(0, Math.min(height, mouse.y));
        const clampedX = Math.max(0, Math.min(width, mouse.x));
        const simLat = (6.4 + (clampedY / height) * 0.35).toFixed(3);
        const simLon = (3.3 + (clampedX / width) * 0.45).toFixed(3);
        coordChip.innerHTML = `<span class="chip-active-dot"></span> LOC: [${simLat}°N, ${simLon}°E] // ASCII RADIAL FLUX: ACTIVE // NODES ENGAGED: ~${Math.round((mouse.radius / cellW) * 9)}`;
      }
    };

    const onLeave = () => {
      mouse.x = -2000;
      mouse.y = -2000;
      mouse.isOver = false;
      if (coordChip) {
        coordChip.textContent = 'SYS_LOC: [06°31\'N, 03°23\'E] // DENSITY: 2,400 NODES // HOVER TO ENGAGE';
      }
    };

    stage.addEventListener('mousemove', (e) => onMove(e.clientX, e.clientY));
    stage.addEventListener('mouseleave', onLeave);

    stage.addEventListener('touchmove', (e) => {
      if (e.touches && e.touches[0]) {
        onMove(e.touches[0].clientX, e.touches[0].clientY);
      }
    }, { passive: true });

    stage.addEventListener('touchend', onLeave);

    // Highly optimized 60fps animation loop with zero main-thread bottleneck
    const baseFont = "700 11px 'JetBrains Mono', Consolas, Monaco, monospace";
    const boldFont = "900 12px 'JetBrains Mono', Consolas, Monaco, monospace";

    const animate = () => {
      animId = requestAnimationFrame(animate);
      if (!isVisible || width <= 0 || height <= 0) return;

      time += 0.016;
      ctx.clearRect(0, 0, width, height);

      const targetActivation = mouse.isOver ? 1 : 0;
      activation += (targetActivation - activation) * 0.14;

      const isDark = (getTheme() === 'dark');

      const baseGlyphColor = isDark 
        ? 'rgba(165, 180, 252, 0.28)' 
        : 'rgba(129, 140, 248, 0.40)';
      const clusterColor = '#FF8000';
      const clusterAltColor = isDark ? '#FFA733' : '#EA580C';

      ctx.textBaseline = 'middle';
      ctx.textAlign = 'center';
      ctx.font = baseFont;
      ctx.shadowBlur = 0;

      // Active cells collected for second-pass rendering so shadowBlur is ONLY applied where needed
      const popCells = [];

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const originX = c * cellW + cellW / 2;
          const originY = r * cellH + cellH / 2;

          const maskIdx = r * cols + c;
          const alphaVal = wordmarkAlpha ? wordmarkAlpha[maskIdx] : 0;
          const isWordmark = alphaVal > 35;

          const wave1 = Math.sin(c * 0.085 + time * 0.6) * Math.cos(r * 0.12 + time * 0.4);
          const wave2 = Math.sin((c + r) * 0.06 - time * 0.5) * 0.5;
          const clusterIntensity = wave1 + wave2;
          const isCluster = (clusterIntensity > 0.36);

          // Interaction distance
          const dx = originX - mouse.x;
          const dy = originY - mouse.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const inRadius = dist < mouse.radius;

          if (inRadius) {
            popCells.push({
              r, c, originX, originY, dx, dy, dist,
              force: 1 - dist / mouse.radius,
              isWordmark, isCluster, alphaVal
            });
            continue; // Draw active hover cells in fast second pass
          }

          // Choose character glyph
          let char = '+';
          if (isWordmark) {
            if (alphaVal > 140) {
              const glyphIdx = Math.abs(Math.floor((c * 2 + r * 3) % glyphsWordmark.length));
              char = glyphsWordmark[glyphIdx];
            } else {
              char = (c % 2 === 0) ? '#' : '■';
            }
          } else if (isCluster) {
            const glyphIdx = Math.abs(Math.floor((c * 3 + r * 7 + time * 2) % glyphsCluster.length));
            char = glyphsCluster[glyphIdx];
          } else {
            const glyphIdx = Math.abs(Math.floor((c + r * 3) % glyphsBase.length));
            char = glyphsBase[glyphIdx];
          }

          if (isWordmark) {
            ctx.font = boldFont;
            if (isDark) {
              // Dark mode: Pure White luminous wordmark ingrained in matrix
              const pulse = (Math.sin(time * 2.2 + c * 0.15) + 1) * 0.5;
              ctx.fillStyle = `rgba(255, 255, 255, ${0.75 + activation * 0.25 + pulse * 0.10})`;
            } else {
              // Light mode: High-authority Stark Black wordmark ingrained in matrix
              ctx.fillStyle = alphaVal > 140 ? '#0A0A0A' : '#1E293B';
            }
          } else if (isCluster) {
            ctx.font = boldFont;
            ctx.fillStyle = (c % 2 === 0) ? clusterColor : clusterAltColor;
          } else {
            ctx.font = baseFont;
            ctx.fillStyle = baseGlyphColor;
          }

          ctx.fillText(char, originX, originY);
        }
      }

      // Fast Second Pass: Render ONLY the ~20 active pop-out cells under cursor with spring physics
      if (popCells.length > 0) {
        for (let i = 0; i < popCells.length; i++) {
          const p = popCells[i];
          const angle = Math.atan2(p.dy, p.dx);
          const push = Math.sin(p.force * Math.PI) * 24;
          const renderX = p.originX + Math.cos(angle) * push;
          const renderY = p.originY + Math.sin(angle) * push;
          const fontSize = (p.isWordmark ? 13 : 11) + Math.round(p.force * 15);

          ctx.font = `900 ${fontSize}px 'JetBrains Mono', Consolas, Monaco, monospace`;

          let char = '+';
          if (p.isWordmark) {
            char = (p.alphaVal > 140) ? '█' : '✦';
            ctx.fillStyle = isDark ? '#FFFFFF' : '#FF5C00';
            ctx.shadowColor = '#FF8000';
            ctx.shadowBlur = 16 * p.force;
          } else if (p.isCluster) {
            char = '*';
            ctx.fillStyle = isDark ? '#FFA733' : '#FF8000';
            ctx.shadowColor = '#FF8000';
            ctx.shadowBlur = 10 * p.force;
          } else {
            char = (p.c % 2 === 0) ? 'x' : '+';
            ctx.fillStyle = isDark ? '#F8FAFC' : '#0A0A0A';
            ctx.shadowColor = isDark ? 'rgba(255,255,255,0.4)' : 'rgba(0,0,0,0.2)';
            ctx.shadowBlur = 6 * p.force;
          }

          ctx.fillText(char, renderX, renderY);
        }
        ctx.shadowBlur = 0;
      }
    };

    resize();
    window.addEventListener('resize', resize);
    animate();
  }
}

if (typeof window !== 'undefined') {
  window.MegaFooter = MegaFooter;
}

if (!customElements.get('mega-footer')) {
  customElements.define('mega-footer', MegaFooter);
}
