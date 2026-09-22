/**
 * RENALYTICA CINEMATIC ENTRANCE GATEWAY & QUANTUM DATA VORTEX ENGINE
 * Option B: Quantum Data Vortex & Hyper-Drive Reveal
 */

(function () {
  'use strict';

  // 1. Check if user prefers reduced motion
  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // DOM Elements
  let entranceStage = null;
  let vortexCanvas = null;
  let ctx = null;
  let cursorDot = null;
  let cursorRing = null;
  let enterBtn = null;
  let shockwave = null;

  // State
  let isHyperdrive = false;
  let isTransitionComplete = false;
  let animationFrameId = null;
  let autoRevealTimerId = null;
  const AUTO_REVEAL_DELAY_MS = 10000; // 10s underground auto-reveal timer
  let width = window.innerWidth;
  let height = window.innerHeight;

  // Magnetic Cursor Coordinates
  let mouseX = width / 2;
  let mouseY = height / 2;
  let dotX = mouseX;
  let dotY = mouseY;
  let ringX = mouseX;
  let ringY = mouseY;
  let isHovering = false;

  // Quantum Particle Engine Storage
  const PARTICLE_COUNT = 110;
  const particles = [];
  const telemetryLabels = ['NODE_01', 'NODE_42', '+4.8%', 'DATA_STREAM', 'TELEMETRY', 'VERIFIED', 'SECURE', '78.4%', 'RE-2026', 'YIELD', 'ACC_09'];
  const particleColors = [
    '#FF5C00', // Momentum Orange
    '#FF8000', // Amber
    '#FFFFFF', // Crisp White
    '#FFA040', // Light Orange
    '#00B4D8'  // Cyan Telemetry
  ];

  class QuantumParticle {
    constructor(centerDist, angle) {
      this.reset(centerDist, angle);
    }

    reset(centerDist, angle) {
      this.r = centerDist !== undefined ? centerDist : (Math.random() * Math.min(width, height) * 0.48 + 70);
      this.baseR = this.r;
      this.theta = angle !== undefined ? angle : Math.random() * Math.PI * 2;
      this.speed = (0.003 + Math.random() * 0.007) * (Math.random() > 0.4 ? 1 : -1);
      this.radialDrift = (Math.random() - 0.5) * 0.15;
      this.size = Math.random() * 2.8 + 1.2;
      this.color = particleColors[Math.floor(Math.random() * particleColors.length)];
      this.alpha = Math.random() * 0.65 + 0.25;
      this.baseAlpha = this.alpha;
      this.pulseSpeed = 0.02 + Math.random() * 0.03;
      this.pulseOffset = Math.random() * Math.PI * 2;
      
      // 10% chance of being a telemetry glyph
      this.hasLabel = Math.random() < 0.12;
      this.label = telemetryLabels[Math.floor(Math.random() * telemetryLabels.length)];
      
      // Hyperdrive physics
      this.hyperAngleSpeed = this.speed * 8;
      this.hyperRadiusSpeed = 0;
      this.warpX = 0;
      this.warpY = 0;
    }

    update(time) {
      const centerX = width / 2;
      const centerY = height / 2;

      if (!isHyperdrive) {
        // Normal Ambient Quantum Orbit
        this.theta += this.speed;
        this.r += this.radialDrift;
        
        // Soft boundary reflection
        const minBound = 65;
        const maxBound = Math.min(width, height) * 0.52;
        if (this.r < minBound || this.r > maxBound) {
          this.radialDrift *= -1;
        }

        this.x = centerX + Math.cos(this.theta) * this.r;
        this.y = centerY + Math.sin(this.theta) * this.r;
        
        // Twinkle
        this.alpha = this.baseAlpha + Math.sin(time * this.pulseSpeed + this.pulseOffset) * 0.2;
      } else {
        // Hyper-Drive Vortex Implosion & Warp Burst
        this.hyperAngleSpeed *= 1.08;
        this.theta += this.hyperAngleSpeed;
        
        if (this.r > 20) {
          this.r *= 0.88; // Rapid inward collapse to singularity
        } else {
          // Explosive outward warp streaks
          this.r += 35;
          this.size *= 1.05;
        }

        this.x = centerX + Math.cos(this.theta) * this.r;
        this.y = centerY + Math.sin(this.theta) * this.r;
        this.alpha = Math.min(this.alpha * 1.08, 1);
      }
    }

    draw(ctx) {
      ctx.save();
      ctx.globalAlpha = Math.max(0, Math.min(1, this.alpha));
      ctx.fillStyle = this.color;
      ctx.shadowColor = this.color;
      ctx.shadowBlur = isHyperdrive ? 18 : 6;

      ctx.beginPath();
      ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
      ctx.fill();

      // Render micro-telemetry tags on labeled nodes
      if (this.hasLabel && !isHyperdrive && this.size > 2) {
        ctx.font = '9px ui-monospace, SFMono-Regular, monospace';
        ctx.fillStyle = 'rgba(255, 255, 255, 0.45)';
        ctx.fillText(this.label, this.x + 8, this.y + 3);
      }

      ctx.restore();
    }
  }

  /**
   * Initializes the Quantum Data Vortex Canvas
   */
  function initVortexEngine() {
    vortexCanvas = document.getElementById('vortex-canvas');
    if (!vortexCanvas) return;

    ctx = vortexCanvas.getContext('2d');
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas, { passive: true });

    // Seed particles
    particles.length = 0;
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      const dist = 70 + (i / PARTICLE_COUNT) * (Math.min(width, height) * 0.46);
      const angle = (i / PARTICLE_COUNT) * Math.PI * 2 + (Math.random() * 0.5);
      particles.push(new QuantumParticle(dist, angle));
    }

    // Start render loop
    renderVortex();
  }

  function resizeCanvas() {
    width = window.innerWidth;
    height = window.innerHeight;
    if (vortexCanvas) {
      vortexCanvas.width = width;
      vortexCanvas.height = height;
    }
  }

  function renderVortex(time = 0) {
    if (isTransitionComplete) return;

    ctx.clearRect(0, 0, width, height);

    const centerX = width / 2;
    const centerY = height / 2;

    // 1. Draw subtle ambient orbital guiding rings
    ctx.save();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(255, 92, 0, 0.05)';
    ctx.setLineDash([4, 12]);
    [100, 180, 260, 340].forEach(radius => {
      if (radius < Math.min(width, height) * 0.45) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
        ctx.stroke();
      }
    });
    ctx.restore();

    // 2. Update and draw particles
    for (let i = 0; i < particles.length; i++) {
      particles[i].update(time * 0.05);
      particles[i].draw(ctx);
    }

    // 3. Draw inter-particle telemetry strands (closest neighbors)
    if (!isHyperdrive) {
      ctx.save();
      for (let i = 0; i < particles.length; i += 2) {
        for (let j = i + 1; j < particles.length; j += 4) {
          const dx = particles[i].x - particles[j].x;
          const dy = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < 4800) { // approx 69px
            const lineAlpha = (1 - distSq / 4800) * 0.18;
            ctx.strokeStyle = `rgba(255, 128, 0, ${lineAlpha})`;
            ctx.lineWidth = 0.75;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }
      ctx.restore();
    }

    animationFrameId = requestAnimationFrame(renderVortex);
  }

  /**
   * Initializes Magnetic Cursor Logic
   */
  function initMagneticCursor() {
    cursorDot = document.getElementById('gateway-cursor-dot');
    cursorRing = document.getElementById('gateway-cursor-ring');

    if (!cursorDot || !cursorRing) return;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    }, { passive: true });

    function renderCursor() {
      if (isTransitionComplete) {
        cursorDot.style.opacity = '0';
        cursorRing.style.opacity = '0';
        return;
      }

      dotX += (mouseX - dotX) * 0.5;
      dotY += (mouseY - dotY) * 0.5;
      ringX += (mouseX - ringX) * 0.16;
      ringY += (mouseY - ringY) * 0.16;

      cursorDot.style.transform = `translate(-50%, -50%) translate(${dotX}px, ${dotY}px)`;
      cursorRing.style.transform = `translate(-50%, -50%) translate(${ringX}px, ${ringY}px)`;

      requestAnimationFrame(renderCursor);
    }
    requestAnimationFrame(renderCursor);

    // Magnetic target hovering
    document.querySelectorAll('.gateway-magnetic-target').forEach(el => {
      el.addEventListener('mouseenter', () => document.body.classList.add('gateway-hovering'));
      el.addEventListener('mouseleave', () => document.body.classList.remove('gateway-hovering'));
    });
  }

  /**
   * Triggers the Hyper-Drive Reveal and smooth transition to Renalytica Index Page
   */
  function executeEntranceReveal() {
    if (isTransitionComplete) return;

    // Clear underground auto-reveal timer if active
    if (autoRevealTimerId) {
      clearTimeout(autoRevealTimerId);
      autoRevealTimerId = null;
    }

    isHyperdrive = true;
    shockwave = document.getElementById('hyperdrive-shockwave');
    const content = document.querySelector('.gateway-content');

    if (entranceStage) {
      entranceStage.style.pointerEvents = 'none';
    }

    // 1. Activate shockwave burst
    if (shockwave) {
      shockwave.classList.add('active');
    }

    // 2. Animate logo element away with GSAP or CSS fallback
    if (typeof gsap !== 'undefined') {
      gsap.to('#gateway-logo-btn', {
        scale: 1.35,
        opacity: 0,
        filter: 'blur(16px)',
        duration: 0.45,
        ease: 'power2.in'
      });

      gsap.to('#entrance-stage', {
        scale: 1.25,
        opacity: 0,
        duration: 0.7,
        delay: 0.18,
        ease: 'power3.inOut',
        onComplete: finalizeReveal
      });
    } else {
      const logoBtn = document.getElementById('gateway-logo-btn');
      if (logoBtn) logoBtn.style.opacity = '0';
      if (entranceStage) entranceStage.classList.add('stage-fading');
      setTimeout(finalizeReveal, 650);
    }
  }

  // Expose global trigger for accessibility & external callers
  window.executeRenalyticaReveal = executeEntranceReveal;

  /**
   * Finalizes the transition, unlocks scrolling, and wakes up hero visual systems
   */
  function finalizeReveal() {
    isTransitionComplete = true;
    if (autoRevealTimerId) {
      clearTimeout(autoRevealTimerId);
      autoRevealTimerId = null;
    }
    if (animationFrameId) {
      cancelAnimationFrame(animationFrameId);
      animationFrameId = null;
    }

    // Unlock document scrolling
    document.body.classList.remove('entrance-locked');
    document.body.classList.remove('gateway-hovering');

    // Hide entrance overlay completely
    if (entranceStage) {
      entranceStage.classList.add('stage-hidden');
    }
    if (shockwave) {
      shockwave.style.display = 'none';
    }
    if (cursorDot) cursorDot.style.display = 'none';
    if (cursorRing) cursorRing.style.display = 'none';

    // Store in session so internal page visits are smooth
    try {
      sessionStorage.setItem('renalytica_gateway_entered', 'true');
    } catch (e) {}

    // Notify listeners (Cookie Consent, Chat Widgets, Analytics) that the gateway reveal is complete
    window.dispatchEvent(new CustomEvent('renalytica:gateway-revealed'));

    // Wake up and refresh the 3D rotating globe canvas
    if (window.renalyticaGlobe && typeof window.renalyticaGlobe.resize === 'function') {
      window.renalyticaGlobe.resize();
    }

    // Trigger hero entrance reveals if motion engine is active
    const heroElements = document.querySelectorAll('.hero-headline-v2, .category-badge-pill, .hero-subheadline-v2, .hero-btn-group, .hero-search-card');
    if (typeof gsap !== 'undefined') {
      gsap.fromTo(heroElements, 
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, stagger: 0.12, ease: 'power2.out', clearProps: 'all' }
      );
    }
  }

  /**
   * Bootstraps the Entrance Gateway on Page Load
   */
  function initGateway() {
    entranceStage = document.getElementById('entrance-stage');
    if (!entranceStage) return;

    // If user prefers reduced motion or already entered, bypass immediately
    try {
      if (sessionStorage.getItem('renalytica_gateway_entered') === 'true') {
        finalizeReveal();
        return;
      }
    } catch (e) {}

    if (prefersReducedMotion) {
      finalizeReveal();
      return;
    }

    // Lock page scroll initially
    document.body.classList.add('entrance-locked');

    // Setup interactive glowing logo button trigger
    const logoBtn = document.getElementById('gateway-logo-btn');
    if (logoBtn) {
      logoBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        executeEntranceReveal();
      });
      logoBtn.addEventListener('touchend', (e) => {
        e.stopPropagation();
        e.preventDefault();
        executeEntranceReveal();
      });
      logoBtn.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          executeEntranceReveal();
        }
      });
    }

    // Also allow clicking anywhere on the entrance stage as a seamless fallback
    entranceStage.addEventListener('click', () => {
      executeEntranceReveal();
    });

    // Keyboard support: pressing Enter or Space triggers access
    window.addEventListener('keydown', (e) => {
      if ((e.key === 'Enter' || e.key === ' ' || e.key === 'Escape') && !isTransitionComplete) {
        executeEntranceReveal();
      }
    });

    // Initialize engines
    initVortexEngine();
    initMagneticCursor();

    // GSAP Intro choreography for the glowing logo
    if (typeof gsap !== 'undefined') {
      gsap.from('#gateway-logo-btn', { 
        scale: 0.75, 
        opacity: 0, 
        filter: 'blur(12px)', 
        duration: 1.3, 
        delay: 0.25, 
        ease: 'back.out(1.5)' 
      });
    }

    // Start underground auto-reveal timer
    autoRevealTimerId = setTimeout(() => {
      if (!isTransitionComplete && !isHyperdrive) {
        executeEntranceReveal();
      }
    }, AUTO_REVEAL_DELAY_MS);
  }

  // Self-execute on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGateway);
  } else {
    initGateway();
  }

})();
