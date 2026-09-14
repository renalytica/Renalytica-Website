/**
 * ==============================================================================
 * RENALYTICA 404 DOT-MATRIX MOTION GRAPHIC ENGINE
 * ==============================================================================
 * High-performance, zero-dependency canvas particle grid rendering an animated
 * '404' numeral point-cloud with:
 * - Geometric font rasterization & mask sampling for razor-sharp '404' numerals
 * - Continuous organic sine/cosine wave undulation
 * - Per-dot twinkling micro-fluctuations
 * - Mouse cursor magnetic repulsion & illuminated aura
 * - Click / tap expanding sonar ripple waves
 * - Touch-enabled mobile drag and tap interaction
 * - High-DPI (Retina / 4K) resolution scaling & adaptive grid density
 * ==============================================================================
 */

(function () {
  'use strict';

  class NotFoundMatrix {
    constructor(canvasId, options = {}) {
      this.canvas = document.getElementById(canvasId);
      if (!this.canvas) {
        console.warn(`[NotFoundMatrix] Canvas #${canvasId} not found.`);
        return;
      }

      this.ctx = this.canvas.getContext('2d');
      this.options = Object.assign(
        {
          accentColor: '#FF5C00',       // Renalytica Momentum Orange
          glyphColor: '#FFFFFF',        // Numeral dot bright white
          glyphHaloColor: 'rgba(255, 128, 0, 0.45)', // Numeral warm orange glow
          baseColor: 'rgba(255, 185, 140, 0.22)',   // Inactive grid points
          vignetteColor: '#160703',
          fontFamily: "'Montserrat', 'Arial Black', 'Impact', sans-serif"
        },
        options
      );

      // State
      this.dots = [];
      this.ripples = [];
      this.mouse = { x: -9999, y: -9999, active: false };
      this.cols = 0;
      this.rows = 0;
      this.spacing = 18;
      this.dpr = Math.min(window.devicePixelRatio || 1, 2);
      this.width = 0;
      this.height = 0;
      this.animId = null;
      this.lastTime = performance.now();

      this.init();
    }

    init() {
      this.resize();
      this.setupEvents();
      if (document.fonts && document.fonts.ready) {
        document.fonts.ready.then(() => {
          this.buildGrid();
        });
      }
      this.animate(performance.now());
    }

    resize() {
      const rect = this.canvas.getBoundingClientRect();
      const w = Math.floor(rect.width);
      const h = Math.floor(rect.height);

      if (w === 0 || h === 0) return;

      this.width = w;
      this.height = h;
      this.canvas.width = Math.floor(w * this.dpr);
      this.canvas.height = Math.floor(h * this.dpr);

      // Determine responsive spacing
      if (w < 480) {
        // Mobile portrait: denser matrix with smaller pitch
        this.spacing = Math.max(11, Math.floor(w / 34));
      } else if (w < 768) {
        // Tablet / Large mobile
        this.spacing = Math.max(13, Math.floor(w / 44));
      } else if (w < 1200) {
        // Desktop standard
        this.spacing = Math.max(16, Math.floor(w / 58));
      } else {
        // Ultra-wide / 1440p+
        this.spacing = Math.max(18, Math.floor(w / 68));
      }

      this.cols = Math.floor(w / this.spacing);
      this.rows = Math.floor(h / this.spacing);

      // Center the grid within canvas
      this.offsetX = Math.floor((w - this.cols * this.spacing) / 2) + Math.floor(this.spacing / 2);
      this.offsetY = Math.floor((h - this.rows * this.spacing) / 2) + Math.floor(this.spacing / 2);

      this.buildGrid();
    }

    buildGrid() {
      // 1. Create off-screen canvas to sample the "404" glyphs
      const sampleCols = Math.max(10, this.cols);
      const sampleRows = Math.max(8, this.rows);

      const offCanvas = document.createElement('canvas');
      offCanvas.width = sampleCols;
      offCanvas.height = sampleRows;
      const offCtx = offCanvas.getContext('2d', { willReadFrequently: true });

      if (offCtx) {
        offCtx.fillStyle = '#000000';
        offCtx.fillRect(0, 0, sampleCols, sampleRows);

        // Adjust text size based on aspect ratio and measure to fit
        let fontSize = Math.floor(sampleRows * 0.76);
        offCtx.font = `900 ${fontSize}px ${this.options.fontFamily}`;
        let measured = offCtx.measureText('404').width;
        
        // Auto-scale to ensure 404 occupies ~75-80% of width
        if (measured > sampleCols * 0.82) {
          fontSize = Math.floor(fontSize * ((sampleCols * 0.82) / measured));
          offCtx.font = `900 ${fontSize}px ${this.options.fontFamily}`;
        }

        offCtx.textAlign = 'center';
        offCtx.textBaseline = 'middle';
        offCtx.fillStyle = '#FFFFFF';

        // Draw "404" in center of offscreen raster
        const textY = sampleRows * 0.50;
        offCtx.fillText('404', sampleCols / 2, textY);
      }

      let imgData = null;
      try {
        imgData = offCtx ? offCtx.getImageData(0, 0, sampleCols, sampleRows).data : null;
      } catch (e) {
        console.warn('[NotFoundMatrix] Canvas sampling warning:', e);
      }

      // 2. Build the dot array
      this.dots = [];

      for (let r = 0; r < this.rows; r++) {
        for (let c = 0; c < this.cols; c++) {
          const originX = this.offsetX + c * this.spacing;
          const originY = this.offsetY + r * this.spacing;

          // Check if this cell is part of the "404" numeral
          let isGlyph = false;
          let glyphWeight = 0;

          if (imgData) {
            const pixelIndex = (r * sampleCols + c) * 4;
            const alpha = imgData[pixelIndex]; // Red channel of white text
            if (alpha > 40) {
              isGlyph = true;
              glyphWeight = alpha / 255;
            }
          }

          // Individual random phase offset for organic twinkle
          const phase = Math.random() * Math.PI * 2;
          const twinkleSpeed = 1.2 + Math.random() * 2.2;
          const baseRadius = isGlyph ? (this.width < 480 ? 2.2 : 2.8) : (this.width < 480 ? 1.1 : 1.35);

          this.dots.push({
            c,
            r,
            originX,
            originY,
            x: originX,
            y: originY,
            vx: 0,
            vy: 0,
            baseRadius,
            isGlyph,
            glyphWeight,
            phase,
            twinkleSpeed,
            luminance: isGlyph ? 1.0 : 0.25
          });
        }
      }
    }

    setupEvents() {
      const getPos = (e) => {
        const rect = this.canvas.getBoundingClientRect();
        return {
          x: e.clientX - rect.left,
          y: e.clientY - rect.top
        };
      };

      // Mouse Events
      this.canvas.addEventListener('mousemove', (e) => {
        const pos = getPos(e);
        this.mouse.x = pos.x;
        this.mouse.y = pos.y;
        this.mouse.active = true;
      });

      this.canvas.addEventListener('mouseleave', () => {
        this.mouse.active = false;
      });

      this.canvas.addEventListener('click', (e) => {
        const pos = getPos(e);
        this.triggerRipple(pos.x, pos.y);
      });

      // Touch Events (Mobile Ergonomics)
      this.canvas.addEventListener(
        'touchstart',
        (e) => {
          if (e.touches && e.touches[0]) {
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            const tx = touch.clientX - rect.left;
            const ty = touch.clientY - rect.top;
            this.mouse.x = tx;
            this.mouse.y = ty;
            this.mouse.active = true;
            this.triggerRipple(tx, ty);
          }
        },
        { passive: true }
      );

      this.canvas.addEventListener(
        'touchmove',
        (e) => {
          if (e.touches && e.touches[0]) {
            const rect = this.canvas.getBoundingClientRect();
            const touch = e.touches[0];
            this.mouse.x = touch.clientX - rect.left;
            this.mouse.y = touch.clientY - rect.top;
            this.mouse.active = true;
          }
        },
        { passive: true }
      );

      this.canvas.addEventListener('touchend', () => {
        this.mouse.active = false;
      });

      // Window Resize (Debounced)
      let resizeTimeout = null;
      window.addEventListener('resize', () => {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(() => this.resize(), 120);
      });
    }

    triggerRipple(x, y) {
      this.ripples.push({
        x,
        y,
        radius: 0,
        maxRadius: Math.max(this.width, this.height) * 0.85,
        speed: 6.5,
        intensity: 1.0
      });
    }

    animate(timestamp) {
      const dt = Math.min((timestamp - this.lastTime) / 1000, 0.05);
      this.lastTime = timestamp;

      this.update(timestamp * 0.001, dt);
      this.render(timestamp * 0.001);

      this.animId = requestAnimationFrame((t) => this.animate(t));
    }

    update(time, dt) {
      // 1. Update Ripples
      for (let i = this.ripples.length - 1; i >= 0; i--) {
        const ripple = this.ripples[i];
        ripple.radius += ripple.speed * 60 * dt;
        ripple.intensity = 1.0 - ripple.radius / ripple.maxRadius;
        if (ripple.intensity <= 0 || ripple.radius >= ripple.maxRadius) {
          this.ripples.splice(i, 1);
        }
      }

      // Proximity radius for cursor interaction
      const mouseRadius = this.width < 480 ? 90 : 130;
      const mouseRadiusSq = mouseRadius * mouseRadius;

      // 2. Update Dots
      const numDots = this.dots.length;
      for (let i = 0; i < numDots; i++) {
        const dot = this.dots[i];

        // Ambient sine-wave field
        const wave =
          Math.sin(dot.originX * 0.012 + dot.originY * 0.008 + time * 2.2) *
          Math.cos(dot.originX * 0.006 - time * 1.4);

        // Twinkle factor
        const twinkle = Math.sin(time * dot.twinkleSpeed + dot.phase) * 0.35;

        // Base luminance calculation
        if (dot.isGlyph) {
          dot.luminance = 0.72 + dot.glyphWeight * 0.28 + wave * 0.12 + twinkle * 0.1;
        } else {
          dot.luminance = 0.18 + wave * 0.09 + twinkle * 0.06;
        }

        // Pointer proximity & repulsion
        let targetX = dot.originX;
        let targetY = dot.originY;

        if (this.mouse.active) {
          const dx = dot.x - this.mouse.x;
          const dy = dot.y - this.mouse.y;
          const distSq = dx * dx + dy * dy;

          if (distSq < mouseRadiusSq && distSq > 0.01) {
            const dist = Math.sqrt(distSq);
            const factor = (1.0 - dist / mouseRadius);
            const repelForce = factor * (this.width < 480 ? 14 : 22);

            targetX += (dx / dist) * repelForce;
            targetY += (dy / dist) * repelForce;

            // Cursor illuminates nearby points
            dot.luminance += factor * 0.55;
          }
        }

        // Sonar ripples interaction
        for (let r = 0; r < this.ripples.length; r++) {
          const rip = this.ripples[r];
          const rdx = dot.x - rip.x;
          const rdy = dot.y - rip.y;
          const rdist = Math.sqrt(rdx * rdx + rdy * rdy);
          const ringDiff = Math.abs(rdist - rip.radius);

          if (ringDiff < 45) {
            const ringFactor = (1.0 - ringDiff / 45) * rip.intensity;
            dot.luminance += ringFactor * 0.8;
            if (rdist > 0.1) {
              targetX += (rdx / rdist) * ringFactor * 8;
              targetY += (rdy / rdist) * ringFactor * 8;
            }
          }
        }

        // Smooth spring back to target
        const spring = 12 * dt;
        dot.x += (targetX - dot.x) * spring;
        dot.y += (targetY - dot.y) * spring;
      }
    }

    render(time) {
      const ctx = this.ctx;
      const w = this.width;
      const h = this.height;

      ctx.save();
      ctx.scale(this.dpr, this.dpr);

      // Clear previous frame
      ctx.clearRect(0, 0, w, h);

      // Render Dots
      const numDots = this.dots.length;
      for (let i = 0; i < numDots; i++) {
        const dot = this.dots[i];
        const lum = Math.max(0.05, Math.min(1.0, dot.luminance));

        ctx.beginPath();

        if (dot.isGlyph) {
          // GLYPH NUMERAL DOT
          const radius = dot.baseRadius * (0.85 + lum * 0.35);
          ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);

          // Outer soft glow halo for glyph dots
          ctx.fillStyle = `rgba(255, 245, 235, ${Math.min(1, lum * 0.95)})`;
          ctx.shadowColor = 'rgba(255, 120, 30, 0.65)';
          ctx.shadowBlur = this.width < 480 ? 4 : 8;
          ctx.fill();

          // Reset shadow for performance
          ctx.shadowBlur = 0;
        } else {
          // BACKGROUND GRID DOT
          const radius = dot.baseRadius * (0.9 + lum * 0.25);
          ctx.arc(dot.x, dot.y, radius, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(255, 195, 160, ${lum * 0.45})`;
          ctx.fill();
        }
      }

      ctx.restore();
    }

    destroy() {
      if (this.animId) {
        cancelAnimationFrame(this.animId);
      }
    }
  }

  // Auto-initialize on DOMContentLoaded or immediate if already loaded
  function bootMatrix() {
    const canvas = document.getElementById('matrix-canvas');
    if (canvas) {
      window._notfound_matrix = new NotFoundMatrix('matrix-canvas');
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootMatrix);
  } else {
    bootMatrix();
  }
})();
