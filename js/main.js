/**
 * Minimalist Motion Web Architect — Interactive Runtime
 * Enforces 60/120fps GPU compositing, deterministic listener cleanup via AbortController,
 * and reduced-motion accessibility compliance.
 */

(() => {
  'use strict';

  const runtimeController = new AbortController();
  const { signal } = runtimeController;

  /* --------------------------------------------------------------------------
     1. Project Detail Data Store (Preserved from wendycahya.github.io)
     -------------------------------------------------------------------------- */
  const PROJECT_ARCHIVE = {
    'proj-1': {
      category: 'Education · Curriculum Innovation',
      title: 'Media Practice: Convolutional Neural Network for Intelligent System Course',
      description:
        'Development of Convolutional Neural Network practicum media for the Intelligent Systems course at Universitas Negeri Malang. Designed for hybrid online and offline learning, this curriculum leverages Google Colaboratory to overcome local hardware constraints where student machines lack dedicated Graphics Processing Units (GPUs).',
      highlights: [
        'Aligned with the Electrical Engineering Education Study Program curriculum.',
        'Cloud-native GPU execution via Google Colaboratory zero-setup notebooks.',
        'Structured interactive jobsheets for hands-on deep learning experimentation.'
      ],
      images: [
        { src: 'img/portfolio/01.jpg', caption: 'CNN Practicum Media & Cloud Colaboratory Workflow' }
      ]
    },
    'proj-2': {
      category: 'Research & Innovation · Computer Vision',
      title: 'Wide-Angle QR Code Detection Using Convolutional Neural Networks',
      description:
        'QR codes are pervasive across manufacturing, logistics, healthcare, and autonomous robotics, yet conventional scanners fail under extreme Euler angles or low-resolution camera sensors. This research introduces an image-processing and Convolutional Neural Network (CNN) pipeline capable of reliably detecting multi-version QR codes from steep perspective angles on low-resolution hardware.',
      highlights: [
        '+40° detection angle improvement on low-resolution camera sensors.',
        '+15° detection angle improvement on high-resolution sensors.',
        'Surpassed 90% recognition accuracy across varied perspective distortions.'
      ],
      images: [
        { src: 'img/portfolio/02.jpg', caption: 'Wide-Angle Euler Perspective QR Detection Pipeline' }
      ]
    },
    'proj-3': {
      category: 'Research & Innovation · Marine IoT & Acoustics',
      title: 'SASORI: Smart Automatic Sonar Coral Reef Health Detection',
      description:
        'Developed under the PKM-KC research initiative, SASORI (Smart Automatic Sonar Technology and Restoration) is an ultrasonic sonar and IoT telemetry system engineered to detect seabed coral reef degradation and assist marine restoration in real time.',
      highlights: [
        'Automated ultrasonic wave transmission and seabed echo profiling.',
        'Real-time IoT cloud telemetry accessible across web and mobile dashboards.',
        'Awarded Gold & Silver honors at international invention exhibitions (ISAIID & IYIA).'
      ],
      images: [
        { src: 'img/portfolio/03.jpg', caption: 'SASORI Ultrasonic Reef Monitoring Architecture' }
      ]
    },
    'proj-4': {
      category: 'Education · Mobile Cloud Learning',
      title: 'e-Collab Classroom: Mobile Application for Intelligent System Learning',
      description:
        'An evolution of the browser-based e-Collab Classroom into a unified one-gate mobile learning application for Intelligent Systems coursework. Focused on practical Convolutional Neural Network (CNN) simulation via cloud computing, developed through rigorous prototyping, risk identification, and empirical student evaluation.',
      highlights: [
        'Unified mobile gateway integrating CNN jobsheets, cloud execution, and classroom management.',
        'Published at the 4th International Conference on Vocational Education and Training (ICOVET 2020).'
      ],
      images: [
        { src: 'img/portfolio/04.jpg', caption: 'e-Collab Classroom Mobile Interface & Cloud Architecture' }
      ]
    },
    'proj-5': {
      category: 'Community Service · Digital Transformation',
      title: 'Village Information & Tourism Promotion Website Socialization',
      description:
        'Community outreach initiative conducted in collaboration with Sayyid Ali Rahmatullah State Islamic University (UIN SATU) Tulungagung in Ngadipuro Village, Blitar. Focused on empowering local youth organizations to build digital information portals for sustainable village tourism promotion.',
      highlights: [
        'Strategic workshops on digital media literacy and regional tourism branding.',
        'Hands-on training for youth organization stewards in Ngadipuro Village, Blitar.'
      ],
      images: [
        { src: 'img/portfolio/05.png', caption: 'Community Digital Literacy Workshop in Ngadipuro Village' }
      ]
    },
    'proj-6': {
      category: 'Community Service · International STEM Outreach',
      title: 'Arduino Project Course Winter Camp — National Taipei University of Technology',
      description:
        'Organized jointly by National Taipei University of Technology (Taipei Tech) and Art Together, this international winter camp introduced elementary students to embedded hardware, logical programming, and collaborative engineering.',
      highlights: [
        'Introduction to Arduino microcontrollers and circuit logic behavior.',
        'Hands-on builds: (1) Automated Traffic Light Controller and (2) Smart Garden System.',
        'Culminated in a student project exhibition, peer review, and contest.'
      ],
      images: [
        { src: 'img/portfolio/06.jpg', caption: 'Arduino Winter Camp Cohort at National Taipei University of Technology' }
      ]
    },
    'proj-7': {
      category: 'Community Service · Interactive Media Outreach',
      title: 'Makey Makey Project Course Winter Camp — National Taipei University of Technology',
      description:
        'An international creative-computing camp hosted by National Taipei University of Technology and Art Together, guiding elementary students to bridge physical conductivity, Scratch programming, and interactive installation art.',
      highlights: [
        'Foundations of human-circuit conductivity with Makey Makey and Scratch.',
        'Project implementations: Custom Game Controllers and Interactive Acoustic/Visual Art.',
        'Team presentations and interactive exhibition.'
      ],
      images: [
        { src: 'img/portfolio/wendycahya-7a.jpg', caption: 'Interactive Prototyping Session' },
        { src: 'img/portfolio/wendycahya-7b.jpg', caption: 'Student Circuit & Scratch Integration' },
        { src: 'img/portfolio/wendycahya-7c.jpg', caption: 'Winter Camp Exhibition & Team Showcase' }
      ]
    },
    'proj-8': {
      category: 'Research & Innovation · Human-Robot Collaboration (Best Paper Award)',
      title: 'Investigation of Safety Design for Human-Robot Collaboration Based on Hybrid Method',
      description:
        'Addressing the productivity bottleneck of ISO/TS 10566 safety stops in Human-Robot Collaboration (HRC), this research proposes a hybrid safety framework combining Speed and Separation Monitoring (SSM) with Power and Force Limiting (PFL). Dynamic speed regulation allows the collaborative robot to adapt smoothly to human proximity without abrupt halts.',
      highlights: [
        '56% robot speed improvement at each trajectory point compared to baseline protocols.',
        '+12.43% productivity gain in far-distance interaction and +32.10% gain in close-proximity collaboration.',
        'Honored with the Best Student Paper Award at CACS 2023.'
      ],
      images: [
        { src: 'img/portfolio/SafetyHRC-1.png', caption: 'Hybrid SSM + PFL Dynamic Velocity Regulation Framework' },
        { src: 'img/portfolio/paper-award-wendy-cahya.jpg', caption: 'CACS 2023 Best Student Paper Award Recognition' }
      ]
    }
  };

  /* --------------------------------------------------------------------------
     2. Theme Controller (Swiss Light / Dark Minimalist)
     -------------------------------------------------------------------------- */
  const initTheme = () => {
    const toggleBtn = document.getElementById('theme-toggle');
    const toggleLabel = document.getElementById('theme-toggle-label');
    if (!toggleBtn || !toggleLabel) return;

    const storedTheme = localStorage.getItem('wendy-theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = storedTheme || (prefersDark ? 'dark' : 'light');

    const applyTheme = (theme) => {
      document.documentElement.setAttribute('data-theme', theme);
      toggleLabel.textContent = theme === 'dark' ? 'Dark' : 'Light';
      toggleBtn.setAttribute('aria-pressed', String(theme === 'dark'));
    };

    applyTheme(initialTheme);

    toggleBtn.addEventListener(
      'click',
      () => {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'dark' ? 'light' : 'dark';
        localStorage.setItem('wendy-theme', next);
        applyTheme(next);
      },
      { signal }
    );
  };

  /* --------------------------------------------------------------------------
     3. Mobile Navigation Drawer
     -------------------------------------------------------------------------- */
  const initMobileNav = () => {
    const menuBtn = document.getElementById('mobile-menu-btn');
    const navList = document.getElementById('nav-links');
    if (!menuBtn || !navList) return;

    const closeMenu = () => {
      navList.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = 'Menu';
    };

    menuBtn.addEventListener(
      'click',
      () => {
        const isOpen = navList.classList.toggle('is-open');
        menuBtn.setAttribute('aria-expanded', String(isOpen));
        menuBtn.textContent = isOpen ? 'Close' : 'Menu';
      },
      { signal }
    );

    navList.querySelectorAll('a').forEach((link) => {
      link.addEventListener('click', closeMenu, { signal });
    });
  };

  /* --------------------------------------------------------------------------
     4. Scroll-Linked Reveal & Active Section Observer (Zero Scroll Thrashing)
     -------------------------------------------------------------------------- */
  const initObservers = () => {
    const revealElements = document.querySelectorAll('.reveal');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (prefersReducedMotion || !('IntersectionObserver' in window)) {
      revealElements.forEach((el) => el.classList.add('is-visible'));
    } else {
      const revealObserver = new IntersectionObserver(
        (entries, observer) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target); // Deterministic one-shot cleanup
            }
          });
        },
        { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
      );

      revealElements.forEach((el) => revealObserver.observe(el));
      signal.addEventListener('abort', () => revealObserver.disconnect());
    }

    // Active Navigation Link Highlighting via IntersectionObserver
    const sections = document.querySelectorAll('main section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    if ('IntersectionObserver' in window && sections.length && navLinks.length) {
      const sectionObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const id = entry.target.getAttribute('id');
              navLinks.forEach((link) => {
                const isMatch = link.getAttribute('href') === `#${id}`;
                link.classList.toggle('is-active', isMatch);
              });
            }
          });
        },
        { rootMargin: '-30% 0px -55% 0px', threshold: 0 }
      );

      sections.forEach((sec) => sectionObserver.observe(sec));
      signal.addEventListener('abort', () => sectionObserver.disconnect());
    }
  };

  /* --------------------------------------------------------------------------
     5. Journey Era Filtering & Full Archive Toggle
     -------------------------------------------------------------------------- */
  const initJourneyFilter = () => {
    const eraButtons = document.querySelectorAll('[data-era-filter]');
    const timelineItems = document.querySelectorAll('.timeline-item');
    const toggleBtn = document.getElementById('toggle-journey-archive');
    if (!eraButtons.length || !timelineItems.length) return;

    let currentEra = 'all';
    let isExpanded = false;

    const updateTimelineView = () => {
      let visibleCount = 0;
      timelineItems.forEach((item) => {
        const itemEra = item.getAttribute('data-era');
        const isPrimary = item.hasAttribute('data-primary');
        const matchesEra = currentEra === 'all' || itemEra === currentEra;
        const shouldShow = matchesEra && (currentEra !== 'all' || isExpanded || isPrimary);

        if (shouldShow) {
          item.removeAttribute('hidden');
          visibleCount += 1;
        } else {
          item.setAttribute('hidden', '');
        }
      });

      if (toggleBtn) {
        if (currentEra !== 'all') {
          toggleBtn.setAttribute('hidden', '');
        } else {
          toggleBtn.removeAttribute('hidden');
          toggleBtn.setAttribute('aria-expanded', String(isExpanded));
          toggleBtn.textContent = isExpanded
            ? 'Collapse to Selected Milestones ↑'
            : `View Complete Career Archive (${timelineItems.length} Milestones) ↓`;
        }
      }
      return visibleCount;
    };

    eraButtons.forEach((btn) => {
      btn.addEventListener(
        'click',
        () => {
          currentEra = btn.getAttribute('data-era-filter') || 'all';
          eraButtons.forEach((b) => {
            const active = b === btn;
            b.classList.toggle('is-active', active);
            b.setAttribute('aria-selected', String(active));
          });
          updateTimelineView();
        },
        { signal }
      );
    });

    if (toggleBtn) {
      toggleBtn.addEventListener(
        'click',
        () => {
          isExpanded = !isExpanded;
          updateTimelineView();
        },
        { signal }
      );
    }

    updateTimelineView();
  };

  /* --------------------------------------------------------------------------
     6. Publications Archive Expand Toggle
     -------------------------------------------------------------------------- */
  const initPublicationsToggle = () => {
    const toggleBtn = document.getElementById('toggle-pub-archive');
    const extraPubs = document.querySelectorAll('.pub-card[data-pub-archive]');
    if (!toggleBtn || !extraPubs.length) return;

    let expanded = false;

    const syncPubs = () => {
      extraPubs.forEach((card) => {
        if (expanded) {
          card.removeAttribute('hidden');
        } else {
          card.setAttribute('hidden', '');
        }
      });
      toggleBtn.setAttribute('aria-expanded', String(expanded));
      toggleBtn.textContent = expanded
        ? 'Show Selected Recent Publications ↑'
        : `Show Complete Publication Index (+${extraPubs.length} Conference & Thesis Papers) ↓`;
    };

    toggleBtn.addEventListener(
      'click',
      () => {
        expanded = !expanded;
        syncPubs();
      },
      { signal }
    );

    syncPubs();
  };

  /* --------------------------------------------------------------------------
     7. Projects Category Filter & Accessible <dialog> Detail Modal
     -------------------------------------------------------------------------- */
  const initProjectsAndModal = () => {
    const filterBtns = document.querySelectorAll('[data-project-filter]');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach((btn) => {
      btn.addEventListener(
        'click',
        () => {
          const category = btn.getAttribute('data-project-filter') || 'all';
          filterBtns.forEach((b) => {
            const active = b === btn;
            b.classList.toggle('is-active', active);
            b.setAttribute('aria-selected', String(active));
          });

          projectCards.forEach((card) => {
            const cardCat = card.getAttribute('data-category');
            if (category === 'all' || cardCat === category) {
              card.removeAttribute('hidden');
            } else {
              card.setAttribute('hidden', '');
            }
          });
        },
        { signal }
      );
    });

    // Accessible Dialog Controller
    const dialog = document.getElementById('project-dialog');
    const closeBtn = document.getElementById('dialog-close');
    const metaEl = document.getElementById('dialog-meta');
    const titleEl = document.getElementById('dialog-title');
    const descEl = document.getElementById('dialog-description');
    const highlightsEl = document.getElementById('dialog-highlights');
    const galleryEl = document.getElementById('dialog-gallery');

    if (!dialog || !closeBtn || !metaEl || !titleEl || !descEl || !highlightsEl || !galleryEl) return;

    let lastFocusedTrigger = null;

    const openProjectModal = (projectId, triggerEl) => {
      const data = PROJECT_ARCHIVE[projectId];
      if (!data) return;

      lastFocusedTrigger = triggerEl;
      metaEl.textContent = data.category;
      titleEl.textContent = data.title;
      descEl.textContent = data.description;

      highlightsEl.innerHTML = '';
      data.highlights.forEach((point) => {
        const li = document.createElement('li');
        li.textContent = point;
        highlightsEl.appendChild(li);
      });

      galleryEl.innerHTML = '';
      data.images.forEach((imgObj) => {
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = imgObj.src;
        img.alt = imgObj.caption;
        img.loading = 'lazy';
        img.decoding = 'async';

        const caption = document.createElement('figcaption');
        caption.textContent = imgObj.caption;

        figure.appendChild(img);
        figure.appendChild(caption);
        galleryEl.appendChild(figure);
      });

      document.body.classList.add('modal-open');
      if (typeof dialog.showModal === 'function') {
        dialog.showModal();
      } else {
        dialog.setAttribute('open', '');
      }
      closeBtn.focus();
    };

    const closeProjectModal = () => {
      if (typeof dialog.close === 'function' && dialog.open) {
        dialog.close();
      } else {
        dialog.removeAttribute('open');
      }
      document.body.classList.remove('modal-open');
      if (lastFocusedTrigger && typeof lastFocusedTrigger.focus === 'function') {
        lastFocusedTrigger.focus();
      }
    };

    projectCards.forEach((card) => {
      card.addEventListener(
        'click',
        () => {
          const projId = card.getAttribute('data-project-id');
          if (projId) openProjectModal(projId, card);
        },
        { signal }
      );
    });

    closeBtn.addEventListener('click', closeProjectModal, { signal });

    dialog.addEventListener(
      'click',
      (event) => {
        const rect = dialog.getBoundingClientRect();
        const clickedInDialog =
          rect.top <= event.clientY &&
          event.clientY <= rect.top + rect.height &&
          rect.left <= event.clientX &&
          event.clientX <= rect.left + rect.width;
        if (!clickedInDialog) {
          closeProjectModal();
        }
      },
      { signal }
    );

    dialog.addEventListener(
      'close',
      () => {
        document.body.classList.remove('modal-open');
      },
      { signal }
    );
  };

  /* --------------------------------------------------------------------------
     8. Tactile Email Copy Micro-Interaction
     -------------------------------------------------------------------------- */
  const initEmailCopy = () => {
    const copyBtn = document.getElementById('copy-email-btn');
    const copyText = document.getElementById('copy-email-text');
    if (!copyBtn || !copyText) return;

    const email = 'wendycahya@gmail.com';

    copyBtn.addEventListener(
      'click',
      async () => {
        try {
          await navigator.clipboard.writeText(email);
          copyText.textContent = 'Copied to Clipboard ✓';
          setTimeout(() => {
            copyText.textContent = 'Copy Email Address';
          }, 2200);
        } catch {
          window.location.href = `mailto:${email}`;
        }
      },
      { signal }
    );
  };

  /* --------------------------------------------------------------------------
     Initialize All Modules & Register Unload Cleanup
     -------------------------------------------------------------------------- */
  const boot = () => {
    initTheme();
    initMobileNav();
    initObservers();
    initJourneyFilter();
    initPublicationsToggle();
    initProjectsAndModal();
    initEmailCopy();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', boot, { once: true });
  } else {
    boot();
  }

  window.addEventListener('pagehide', () => runtimeController.abort(), { once: true });
})();

