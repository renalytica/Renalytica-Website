/**
 * RENALYTICA 3D ECONOMIC VELOCITY GLOBE
 * Enhanced high-resolution 3D Canvas / WebGL Particle Point-Cloud Engine
 * Configured for crisp White Canvas (#FFFFFF) with 30% Momentum Orange (#FF8000) arcs,
 * Stark Black continent points, and glowing trade nodes.
 */

class RenalyticaDataGlobe {
  constructor(canvasElement, options = {}) {
    this.canvas = typeof canvasElement === 'string' ? document.querySelector(canvasElement) : canvasElement;
    if (!this.canvas) return;

    this.ctx = this.canvas.getContext('2d');
    this.options = Object.assign({
      dotColor: '#0A0A0A',                 // Stark Black points on white canvas
      accentColor: '#FF8000',              // 30% Momentum Orange
      hubColor: '#00B4D8',                 // Cyan/Teal trading node
      arcColor: 'rgba(255, 128, 0, 0.70)', // High-contrast orange arcs
      particleCount: 2200,                 // High density for massive, crisp presentation
      radiusRatio: 0.49,                   // Fills canvas up to borders (half-page scale)
      rotationSpeed: 0.0032,
      interactive: true
    }, options);

    this.width = 0;
    this.height = 0;
    this.radius = 360;
    this.rotationX = 0.22;
    this.rotationY = 0;
    this.targetRotationY = 0;
    this.targetRotationX = 0.22;
    this.isDragging = false;
    this.previousMousePosition = { x: 0, y: 0 };
    this.isVisible = true;
    this.animationFrameId = null;

    this.points = [];
    this.arcs = [];
    this.hubs = [
      { name: 'Lagos Hub', lat: 6.52, lon: 3.37, primary: true },
      { name: 'London HQ', lat: 51.50, lon: -0.12, primary: true },
      { name: 'Nairobi Desk', lat: -1.29, lon: 36.82, primary: false },
      { name: 'Dubai Desk', lat: 25.20, lon: 55.27, primary: false },
      { name: 'Johannesburg', lat: -26.20, lon: 28.04, primary: false },
      { name: 'Hong Kong Desk', lat: 22.31, lon: 114.16, primary: false },
      { name: 'New York Desk', lat: 40.71, lon: -74.00, primary: false }
    ];

    this.init();
  }

  init() {
    this.resize();
    this.generateSpherePoints();
    this.generateArcs();
    this.bindEvents();
    this.setupIntersectionObserver();
    this.render();
  }

  resize() {
    const rect = this.canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    this.width = rect.width || 800;
    this.height = rect.height || 800;
    this.canvas.width = Math.round(this.width * dpr);
    this.canvas.height = Math.round(this.height * dpr);
    this.ctx.setTransform(1, 0, 0, 1, 0, 0);
    this.ctx.scale(dpr, dpr);
    this.radius = Math.min(this.width, this.height) * this.options.radiusRatio;
  }

  generateSpherePoints() {
    this.points = [];
    const count = this.options.particleCount;
    const phi = Math.PI * (3 - Math.sqrt(5)); // Golden angle

    for (let i = 0; i < count; i++) {
      const y = 1 - (i / (count - 1)) * 2;
      const radiusAtY = Math.sqrt(1 - y * y);
      const theta = phi * i;

      const x = Math.cos(theta) * radiusAtY;
      const z = Math.sin(theta) * radiusAtY;

      // Higher density over African & Atlantic/Indian trade latitudes
      const isTradeFocus = (x > -0.3 && x < 0.75 && y > -0.75 && y < 0.65);
      const isOrangeNode = isTradeFocus && Math.random() > 0.78;

      this.points.push({
        baseX: x,
        baseY: y,
        baseZ: z,
        size: isTradeFocus ? (Math.random() * 2.1 + 1.3) : (Math.random() * 1.3 + 0.8),
        color: isOrangeNode ? this.options.accentColor : this.options.dotColor,
        isOrangeNode: isOrangeNode
      });
    }

    this.hubs.forEach(hub => {
      const phi = (90 - hub.lat) * (Math.PI / 180);
      const theta = (hub.lon + 180) * (Math.PI / 180);
      hub.baseX = -(Math.sin(phi) * Math.cos(theta));
      hub.baseY = Math.cos(phi);
      hub.baseZ = Math.sin(phi) * Math.sin(theta);
    });
  }

  generateArcs() {
    const lagos = this.hubs.find(h => h.name === 'Lagos Hub');
    const partners = this.hubs.filter(h => h !== lagos);

    this.arcs = partners.map(partner => ({
      from: lagos,
      to: partner,
      progress: Math.random(),
      speed: 0.007 + Math.random() * 0.006
    }));
  }

  bindEvents() {
    window.addEventListener('resize', () => this.resize());

    if (!this.options.interactive) return;

    let startX = 0;
    let startY = 0;

    const onPointerDown = (e) => {
      this.isDragging = true;
      startX = e.clientX || (e.touches && e.touches[0].clientX);
      startY = e.clientY || (e.touches && e.touches[0].clientY);
    };

    const onPointerMove = (e) => {
      if (!this.isDragging) return;
      const currentX = e.clientX || (e.touches && e.touches[0].clientX);
      const currentY = e.clientY || (e.touches && e.touches[0].clientY);
      const deltaX = currentX - startX;
      const deltaY = currentY - startY;

      this.targetRotationY += deltaX * 0.005;
      this.targetRotationX = Math.max(-0.6, Math.min(0.6, this.targetRotationX - deltaY * 0.005));

      startX = currentX;
      startY = currentY;
    };

    const onPointerUp = () => {
      this.isDragging = false;
    };

    this.canvas.addEventListener('mousedown', onPointerDown);
    window.addEventListener('mousemove', onPointerMove);
    window.addEventListener('mouseup', onPointerUp);

    this.canvas.addEventListener('touchstart', onPointerDown, { passive: true });
    window.addEventListener('touchmove', onPointerMove, { passive: true });
    window.addEventListener('touchend', onPointerUp);
  }

  setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        this.isVisible = entry.isIntersecting;
        if (this.isVisible && !this.animationFrameId) {
          this.render();
        }
      });
    }, { threshold: 0.1 });

    observer.observe(this.canvas);
  }

  render() {
    if (!this.isVisible) {
      this.animationFrameId = null;
      return;
    }

    if (!this.isDragging) {
      this.targetRotationY += this.options.rotationSpeed;
    }

    this.rotationY += (this.targetRotationY - this.rotationY) * 0.08;
    this.rotationX += (this.targetRotationX - this.rotationX) * 0.08;

    const ctx = this.ctx;
    const cx = this.width / 2;
    const cy = this.height / 2;
    const radius = this.radius;

    ctx.clearRect(0, 0, this.width, this.height);

    // Subtle ambient orange radial glow
    const grad = ctx.createRadialGradient(cx, cy, radius * 0.2, cx, cy, radius * 1.25);
    grad.addColorStop(0, 'rgba(255, 128, 0, 0.08)');
    grad.addColorStop(0.6, 'rgba(255, 128, 0, 0.02)');
    grad.addColorStop(1, 'transparent');
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(cx, cy, radius * 1.25, 0, Math.PI * 2);
    ctx.fill();

    // Subtle meridian border circle
    ctx.strokeStyle = 'rgba(88, 100, 114, 0.18)';
    ctx.lineWidth = 1.2;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.stroke();

    const sinY = Math.sin(this.rotationY);
    const cosY = Math.cos(this.rotationY);
    const sinX = Math.sin(this.rotationX);
    const cosX = Math.cos(this.rotationX);

    const project = (x, y, z) => {
      let x1 = x * cosY - z * sinY;
      let z1 = z * cosY + x * sinY;

      let y2 = y * cosX - z1 * sinX;
      let z2 = z1 * cosX + y * sinX;

      const scale = 2.4 / (2.4 + z2);
      const px = cx + x1 * radius * scale;
      const py = cy - y2 * radius * scale;

      return { px, py, z: z2, scale, visible: z2 > -0.2 };
    };

    // Draw back arcs
    this.drawArcs(project, false);

    // 3D Equatorial and Coordinate Reference Rings (Live 180° Curvature)
    const drawCoordinateRing = (latAngle, strokeStyle, lineWidth, dash) => {
      const ringY = Math.sin(latAngle);
      const ringR = Math.cos(latAngle);
      const segments = 48;
      ctx.save();
      ctx.strokeStyle = strokeStyle;
      ctx.lineWidth = lineWidth;
      if (dash) ctx.setLineDash(dash);

      ctx.beginPath();
      let started = false;
      for (let s = 0; s <= segments; s++) {
        const angle = (s / segments) * Math.PI * 2;
        const rx = Math.cos(angle) * ringR;
        const rz = Math.sin(angle) * ringR;
        const p = project(rx, ringY, rz);
        if (p.z > -0.15) {
          if (!started) {
            ctx.moveTo(p.px, p.py);
            started = true;
          } else {
            ctx.lineTo(p.px, p.py);
          }
        } else {
          started = false;
        }
      }
      ctx.stroke();
      ctx.restore();
    };

    // Equator ring (Momentum Orange telemetry line)
    drawCoordinateRing(0, 'rgba(255, 128, 0, 0.28)', 1.4, [4, 4]);
    // Tropic latitudes (Subtle Slate precision lines)
    drawCoordinateRing(0.44, 'rgba(88, 100, 114, 0.15)', 1.0, [2, 4]);
    drawCoordinateRing(-0.44, 'rgba(88, 100, 114, 0.15)', 1.0, [2, 4]);

    // Project points and sort by depth
    const projectedPoints = this.points.map(pt => {
      const proj = project(pt.baseX, pt.baseY, pt.baseZ);
      return { ...pt, ...proj };
    });

    projectedPoints.sort((a, b) => a.z - b.z);

    for (let i = 0; i < projectedPoints.length; i++) {
      const pt = projectedPoints[i];
      const alpha = Math.max(0.12, (pt.z + 1.1) / 2.1);
      ctx.globalAlpha = alpha;
      ctx.fillStyle = pt.color;
      ctx.beginPath();
      ctx.arc(pt.px, pt.py, pt.size * pt.scale, 0, Math.PI * 2);
      ctx.fill();
    }

    // Draw front arcs
    this.drawArcs(project, true);

    // Regional Hubs
    this.hubs.forEach(hub => {
      const proj = project(hub.baseX, hub.baseY, hub.baseZ);
      if (proj.z > -0.15) {
        const hubAlpha = Math.min(1, (proj.z + 0.6) * 1.3);
        ctx.globalAlpha = hubAlpha;

        const pulseSize = (Date.now() % 1800) / 1800;
        ctx.strokeStyle = hub.primary ? 'rgba(255, 128, 0, ' + (1 - pulseSize) + ')' : 'rgba(0, 180, 216, ' + (1 - pulseSize) + ')';
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, (7 + pulseSize * 18) * proj.scale, 0, Math.PI * 2);
        ctx.stroke();

        ctx.fillStyle = hub.primary ? this.options.accentColor : this.options.hubColor;
        ctx.beginPath();
        ctx.arc(proj.px, proj.py, (hub.primary ? 5.5 : 4.0) * proj.scale, 0, Math.PI * 2);
        ctx.fill();

        if (proj.z > 0.05) {
          ctx.font = `700 ${Math.round(11 * proj.scale)}px 'JetBrains Mono', monospace`;
          const isDark = (document.documentElement.getAttribute('data-theme') === 'dark');
          ctx.fillStyle = hub.primary ? (isDark ? '#F8FAFC' : '#0A0A0A') : (isDark ? '#94A3B8' : '#586472');
          ctx.fillText(hub.name, proj.px + 12, proj.py + 4);
        }
      }
    });

    ctx.globalAlpha = 1.0;
    this.animationFrameId = requestAnimationFrame(() => this.render());
  }

  drawArcs(project, frontOnly) {
    const ctx = this.ctx;

    this.arcs.forEach(arc => {
      const p1 = project(arc.from.baseX, arc.from.baseY, arc.from.baseZ);
      const p2 = project(arc.to.baseX, arc.to.baseY, arc.to.baseZ);

      const midZ = (p1.z + p2.z) / 2;
      const isFront = midZ >= 0;

      if (frontOnly !== isFront) return;

      const midX = (arc.from.baseX + arc.to.baseX) / 2 * 1.38;
      const midY = (arc.from.baseY + arc.to.baseY) / 2 * 1.38;
      const midZ_elevated = (arc.from.baseZ + arc.to.baseZ) / 2 * 1.38;
      const ctrl = project(midX, midY, midZ_elevated);

      const alpha = Math.max(0.15, (midZ + 0.8) / 1.8) * 0.85;
      ctx.globalAlpha = alpha;
      ctx.strokeStyle = this.options.arcColor;
      ctx.lineWidth = 1.6;
      ctx.setLineDash([4, 4]);

      ctx.beginPath();
      ctx.moveTo(p1.px, p1.py);
      ctx.quadraticCurveTo(ctrl.px, ctrl.py, p2.px, p2.py);
      ctx.stroke();
      ctx.setLineDash([]);

      arc.progress = (arc.progress + arc.speed) % 1;
      const t = arc.progress;
      const photonX = (1 - t) * (1 - t) * p1.px + 2 * (1 - t) * t * ctrl.px + t * t * p2.px;
      const photonY = (1 - t) * (1 - t) * p1.py + 2 * (1 - t) * t * ctrl.py + t * t * p2.py;

      ctx.fillStyle = '#FF8000';
      ctx.globalAlpha = alpha * 1.8;
      ctx.beginPath();
      ctx.arc(photonX, photonY, 3.5 * ctrl.scale, 0, Math.PI * 2);
      ctx.fill();
    });
  }

  setTheme(theme) {
    if (theme === 'dark') {
      this.options.dotColor = 'rgba(248, 250, 252, 0.75)';
      this.options.arcColor = 'rgba(255, 128, 0, 0.88)';
    } else {
      this.options.dotColor = '#0A0A0A';
      this.options.arcColor = 'rgba(255, 128, 0, 0.70)';
    }
    this.points.forEach(pt => {
      pt.color = pt.isOrangeNode ? this.options.accentColor : this.options.dotColor;
    });
  }

  destroy() {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
    }
  }
}

if (typeof window !== 'undefined') {
  window.RenalyticaDataGlobe = RenalyticaDataGlobe;
}
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { RenalyticaDataGlobe };
}
