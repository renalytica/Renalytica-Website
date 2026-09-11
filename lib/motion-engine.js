/**
 * RENALYTICA GLOBAL MOTION & SCROLLYTELLING ENGINE (v2 - ENHANCED)
 * Orchestrates kinetic typography reveals, line masking, scroll reading progress,
 * methodology scrollytelling, metric counter roll-ups, and interactive physics.
 */

class RenalyticaMotionEngine {
  constructor() {
    this.hasGSAP = typeof window.gsap !== 'undefined';
    this.init();
  }

  init() {
    this.initProgressBar();
    this.initKineticTypography();
    this.initScrollReveals();
    this.initStatCounters();
    this.initMethodologyScrolly();
    this.initParallax();
    this.initHorizontalRail();
    this.initMagneticButtons();
    this.initThemeInversion();
    this.initImmediateCheck();
  }

  /**
   * 1. Global Scroll Reading Progress Bar (Fixed 3px Momentum Orange Top Rail)
   */
  initProgressBar() {
    let bar = document.querySelector('.global-scroll-progress');
    if (!bar) {
      bar = document.createElement('div');
      bar.className = 'global-scroll-progress';
      bar.id = 'global-scroll-progress';
      document.body.prepend(bar);
    }

    const updateProgress = () => {
      const scrollY = window.scrollY || window.pageYOffset;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      const pct = maxScroll > 0 ? Math.min(Math.max((scrollY / maxScroll) * 100, 0), 100) : 0;
      bar.style.width = `${pct}%`;
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
    updateProgress();
  }

  /**
   * 2. Kinetic Typography: Masked Line & Heading Reveals
   * Wraps headline lines into masked overflow containers for silky rising typography.
   */
  initKineticTypography() {
    const targets = document.querySelectorAll(
      '.hero-headline-v2, .about-hero-title, .methodology-hero-title, .blog-hero-title, .news-hero-title, .community-hero-title, .careers-hero-title, .faq-hero-title, .legal-hero-title, .services-hero-title, .insights-hero-title, .flagship-headline, .section-title-v2, .section-title-standard, .section-headline-standard, .cta-headline, .cta-headline-obsidian, .sub-headline, .cta-title-v2, .newsletter-headline, .news-subscribe-title, .pillar-title, .calc-section-title'
    );

    targets.forEach(heading => {
      if (heading.dataset.kineticReady) return;
      heading.dataset.kineticReady = 'true';

      const originalHTML = heading.innerHTML;

      // If heading already has <br>, split along the line breaks
      if (/<br\s*[\/]?>/i.test(originalHTML)) {
        const parts = originalHTML.split(/<br\s*[\/]?>/i);
        heading.innerHTML = parts
          .map((part, idx) => `
            <span class="kinetic-line-mask">
              <span class="kinetic-line-inner" style="transition-delay: ${idx * 130}ms;">
                ${part.trim()}
              </span>
            </span>
          `)
          .join('');
      } else {
        // Single block headline
        heading.innerHTML = `
          <span class="kinetic-line-mask">
            <span class="kinetic-line-inner">
              ${originalHTML.trim()}
            </span>
          </span>
        `;
      }
    });
  }

  /**
   * 3. Cinematic Staggered Scroll Reveals (IntersectionObserver + Real-Time Scroll Trigger)
   */
  initScrollReveals() {
    // Prevent browser auto-restoration from jumping and skipping scroll reveals
    if (typeof history !== 'undefined' && 'scrollRestoration' in history) {
      history.scrollRestoration = 'manual';
    }

    // Auto-tag any unadorned cards, intros, and section headers
    const cardGroups = [
      '.bento-sectors-grid > *',
      '.featured-reports-deck > *',
      '.steps-container-v2 > *',
      '.feedback-grid-v2 > *',
      '.sub-options-grid > *',
      '.dual-hq-grid > *',
      '.principles-grid > *',
      '.team-grid > *',
      '.governance-grid > *',
      '.bento-contrast-grid > *',
      '.dual-track-grid > *',
      '.protocols-3col-grid > *',
      '.independence-4col-grid > *',
      '.horizontal-rail-track > *',
      '.curated-articles-grid > *',
      '.precision-columns-grid > *',
      '.guidelines-standards-grid > *',
      '.data-alerts-grid > *',
      '.announcements-grid > *',
      '.press-downloads-cluster > *',
      '.release-cards-stack > *',
      '.community-bento-grid > *',
      '.working-groups-grid > *',
      '.roundtables-grid > *',
      '.fellows-spotlight-grid > *',
      '.membership-tiers-grid > *',
      '.code-rules-grid > *',
      '.careers-bento-grid > *',
      '.perks-grid > *',
      '.open-roles-stack > *',
      '.hiring-steps-list > *',
      '.bundle-anatomy-grid > *',
      '.coverage-desks-grid > *',
      '.licensing-tiers-grid > *',
      '.bespoke-practice-grid > *',
      '.lifecycle-steps-grid > *',
      '.terminal-privileges-grid > *',
      '.rfp-steps-grid > *',
      '.telemetry-trackers-grid > *',
      '.articles-grid-stack > *',
      '.calculators-dual-grid > *',
      '.topic-archives-grid > *'
    ];

    cardGroups.forEach(selector => {
      document.querySelectorAll(selector).forEach((card, idx) => {
        if (!card.hasAttribute('data-reveal')) {
          card.setAttribute('data-reveal', 'card');
        }
        if (!card.style.transitionDelay) {
          card.style.transitionDelay = `${(idx % 4) * 110}ms`;
        }
      });
    });

    const candidates = document.querySelectorAll(
      '.section-header-v2, .section-head-center, .section-intro-v2, .comparison-table-wrapper, .final-cta-card, .methodology-media-card, .triangulation-bridge-card, .ethics-showcase-card, .about-cta-card, [data-reveal]'
    );

    candidates.forEach((el, idx) => {
      if (!el.hasAttribute('data-reveal')) {
        el.setAttribute('data-reveal', 'fade-up');
        if (!el.style.transitionDelay) {
          el.style.transitionDelay = `${(idx % 3) * 100}ms`;
        }
      }
    });

    const revealElement = (target) => {
      target.classList.add('revealed');

      const highlight = target.querySelector('.headline-highlight, .title-accent');
      if (highlight) highlight.classList.add('active');

      target.querySelectorAll('.kinetic-line-inner').forEach(line => {
        line.classList.add('revealed');
      });

      target.querySelectorAll('[data-reveal]').forEach(child => {
        child.classList.add('revealed');
      });
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          revealElement(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('[data-reveal]').forEach(item => observer.observe(item));
    document.querySelectorAll('.kinetic-line-mask').forEach(mask => observer.observe(mask));

    // High-performance passive scroll trigger fallback:
    // Guarantees elements visibly glide up as the user scrolls down
    let scrollTicking = false;
    const checkRevealsOnScroll = () => {
      if (!scrollTicking) {
        requestAnimationFrame(() => {
          const triggerLine = window.innerHeight - 40;
          document.querySelectorAll('[data-reveal]:not(.revealed)').forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top <= triggerLine && rect.bottom > 0) {
              revealElement(el);
            }
          });
          scrollTicking = false;
        });
        scrollTicking = true;
      }
    };

    window.addEventListener('scroll', checkRevealsOnScroll, { passive: true });
    // Initial check right after load
    setTimeout(checkRevealsOnScroll, 100);
  }

  /**
   * 4. Immediate Check for Hero Viewport Elements (Hero safety & Staggered Entrance)
   * Reveals hero elements immediately on load with deliberate cadence so below-the-fold content animates on scroll
   */
  initImmediateCheck() {
    const heroRoots = document.querySelectorAll('#hero-stage, #hero-about, #hero-methodology, #hero-community, #hero-careers');
    
    heroRoots.forEach(hero => {
      const heroItems = hero.querySelectorAll(
        '[data-reveal], .hero-headline-v2, .about-hero-title, .methodology-hero-title, .community-hero-title, .careers-hero-title, .hero-subheadline-v2, .about-hero-desc, .methodology-hero-desc, .community-hero-desc, .careers-hero-desc, .hero-telemetry-badge-group, .careers-hero-badges, .hero-search-card, .about-hero-actions, .methodology-hero-actions, .community-hero-actions, .careers-hero-actions, .hero-visual-frame, .careers-visual-frame, .hero-data-lab-card, .community-hero-media, .careers-hero-media, .about-hero-stats-ribbon, .hero-integrity-ribbon, .community-hero-stats-ribbon, .careers-hero-stats-ribbon'
      );

      heroItems.forEach((el, index) => {
        setTimeout(() => {
          el.classList.add('revealed');
          const highlight = el.querySelector('.headline-highlight, .title-accent');
          if (highlight) highlight.classList.add('active');
          el.querySelectorAll('.kinetic-line-inner').forEach(line => line.classList.add('revealed'));
        }, index * 90);
      });
    });
  }

  /**
   * 5. Methodology Stepper Scrollytelling
   * Highlights steps 1 -> 2 -> 3 consecutively as the user scrolls through Section 8.
   */
  initMethodologyScrolly() {
    const steps = document.querySelectorAll('.step-card-v2');
    if (!steps.length) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const triggerLine = window.innerHeight * 0.58;
          steps.forEach(step => {
            const rect = step.getBoundingClientRect();
            if (rect.top <= triggerLine && rect.bottom >= triggerLine - 100) {
              step.classList.add('active-scrolly');
            } else if (rect.top > triggerLine + 80) {
              step.classList.remove('active-scrolly');
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /**
   * 6. Number Counter Animation (Smooth Odometers)
   */
  initStatCounters() {
    const counters = document.querySelectorAll('[data-counter-target]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          const target = parseFloat(el.getAttribute('data-counter-target'));
          const prefix = el.getAttribute('data-counter-prefix') || '';
          const suffix = el.getAttribute('data-counter-suffix') || '';
          const isDecimal = target % 1 !== 0;
          const duration = 1800; // ms
          const startTime = performance.now();

          const updateNumber = (now) => {
            const elapsed = now - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const easeProgress = 1 - Math.pow(1 - progress, 3);
            const current = target * easeProgress;

            el.textContent = `${prefix}${isDecimal ? current.toFixed(1) : Math.floor(current).toLocaleString()}${suffix}`;

            if (progress < 1) {
              requestAnimationFrame(updateNumber);
            } else {
              el.textContent = `${prefix}${isDecimal ? target.toFixed(1) : target.toLocaleString()}${suffix}`;
            }
          };

          requestAnimationFrame(updateNumber);
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.15 });

    counters.forEach(c => observer.observe(c));
  }

  /**
   * 7. Multi-Layer Cinematic Parallax Controller
   * Applies smooth depth translation to elements with [data-parallax] or [data-parallax-reverse].
   */
  initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax], [data-parallax-reverse]');
    if (!parallaxElements.length) return;

    let ticking = false;
    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const vh = window.innerHeight;
          parallaxElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            if (rect.top < vh + 100 && rect.bottom > -100) {
              const isReverse = el.hasAttribute('data-parallax-reverse');
              const defaultSpeed = isReverse ? -0.12 : 0.08;
              const speed = parseFloat(el.getAttribute('data-parallax') || el.getAttribute('data-parallax-reverse')) || defaultSpeed;
              const relativeY = rect.top - vh / 2;
              const yOffset = relativeY * speed;
              el.style.transform = `translateY(${yOffset.toFixed(1)}px)`;
            }
          });
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /**
   * 8. Multi-Instance Horizontal Rail Controller (Drag + Click + Momentum + Wheel)
   */
  initHorizontalRail() {
    const rails = document.querySelectorAll('.horizontal-rail-track, .featured-reports-deck');
    if (!rails.length) return;

    rails.forEach(track => {
      const container = track.closest('.horizontal-rail-wrapper, .featured-reports-section, .hubs-rail-wrapper, .protocols-rail-wrapper') || track.parentElement;
      const prevBtn = container.querySelector('.rail-prev, .rail-nav-btn.prev, [data-rail-prev]');
      const nextBtn = container.querySelector('.rail-next, .rail-nav-btn.next, [data-rail-next]');

      const card = track.querySelector('.rail-card-item, .report-card-v2, .hub-card, .protocol-card');
      const stepWidth = card ? card.offsetWidth + 24 : 380;

      if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
          e.preventDefault();
          track.scrollBy({ left: -stepWidth, behavior: 'smooth' });
        });
      }

      if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
          e.preventDefault();
          track.scrollBy({ left: stepWidth, behavior: 'smooth' });
        });
      }

      // Touch / Mouse Drag Physics
      let isDown = false;
      let startX = 0;
      let scrollLeft = 0;

      track.addEventListener('mousedown', (e) => {
        isDown = true;
        startX = e.pageX - track.offsetLeft;
        scrollLeft = track.scrollLeft;
        track.style.cursor = 'grabbing';
        track.style.scrollSnapType = 'none';
      });

      window.addEventListener('mouseup', () => {
        if (!isDown) return;
        isDown = false;
        track.style.cursor = '';
        track.style.scrollSnapType = 'x mandatory';
      });

      track.addEventListener('mousemove', (e) => {
        if (!isDown) return;
        e.preventDefault();
        const x = e.pageX - track.offsetLeft;
        const walk = (x - startX) * 1.5;
        track.scrollLeft = scrollLeft - walk;
      });
    });
  }

  /**
   * 9. Magnetic Subtle Button Physics
   */
  initMagneticButtons() {
    const buttons = document.querySelectorAll('.btn-pill-primary, .menu-capsule, .rail-arrow-btn');
    buttons.forEach(btn => {
      btn.addEventListener('mousemove', (e) => {
        const rect = btn.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
      });

      btn.addEventListener('mouseleave', () => {
        btn.style.transform = 'translate(0px, 0px)';
      });
    });
  }

  /**
   * 10. Theme Inversion Observer (Optional Dark Section Transitions)
   */
  initThemeInversion() {
    const darkSections = document.querySelectorAll('[data-theme-section="dark"]');
    if (!darkSections.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          document.body.setAttribute('data-theme', 'dark');
        } else {
          const anyDark = Array.from(darkSections).some(sec => {
            const r = sec.getBoundingClientRect();
            return r.top < window.innerHeight / 2 && r.bottom > window.innerHeight / 2;
          });
          if (!anyDark) {
            document.body.removeAttribute('data-theme');
          }
        }
      });
    }, { threshold: 0.25 });

    darkSections.forEach(sec => observer.observe(sec));
  }
}

// Resilient auto-bootstrapper (handles loading, interactive, complete states)
if (typeof window !== 'undefined') {
  window.RenalyticaMotionEngine = RenalyticaMotionEngine;
  const startEngine = () => {
    if (!window.renalyticaMotion) {
      window.renalyticaMotion = new RenalyticaMotionEngine();
    }
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', startEngine);
  } else {
    startEngine();
  }
  window.addEventListener('load', startEngine);
}
