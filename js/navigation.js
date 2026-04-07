// Navigation and section management

/**
 * Navigate to a specific section
 * @param {string} section - Section ID to navigate to (landing, job, night)
 */
function navigateTo(section) {
  // Hide all sections
  document.querySelectorAll(SELECTORS.SECTION_VIEW).forEach(v => {
    v.classList.remove('active');
  });

  // Show target section
  if (section === SECTIONS.LANDING) {
    document.getElementById(SECTIONS.LANDING).classList.add('active');
  } else if (section === SECTIONS.JOB) {
    document.getElementById(SECTIONS.JOB).classList.add('active');
  } else if (section === SECTIONS.NIGHT) {
    document.getElementById(SECTIONS.NIGHT).classList.add('active');
  }

  // Scroll to top
  document.querySelector(SELECTORS.APP_ROOT).scrollTop = 0;

  // Re-render Lucide icons
  lucide.createIcons();
}

/**
 * Switch job section tabs
 * @param {string} tab - Tab name (profile, tnc, ratecard, compcard, featured)
 */
function switchJobTab(tab) {
  // Update active tab
  clearActive(SELECTORS.JOB_TABS + ' ' + SELECTORS.JOB_TAB);
  document
    .querySelector(`${SELECTORS.JOB_TABS} [data-tab="${tab}"]`)
    .classList.add('active');

  // Hide all job content
  hideAll(SELECTORS.JOB_CONTENT);

  // Show target content with animation
  const element = document.getElementById('job-' + tab);
  showWithAnimation(element);

  // Re-render Lucide icons
  lucide.createIcons();
}

/**
 * Switch night section tabs
 * @param {string} tab - Tab name (profile, tnc, ratecard, compcard, featured)
 */
function switchNightTab(tab) {
  // Update active tab
  clearActive(SELECTORS.NIGHT_TABS + ' ' + SELECTORS.NIGHT_TAB);
  document
    .querySelector(`${SELECTORS.NIGHT_TABS} [data-tab="${tab}"]`)
    .classList.add('active');

  // Hide all night content
  hideAll(SELECTORS.NIGHT_CONTENT);

  // Show target content with animation
  const element = document.getElementById('night-' + tab);
  showWithAnimation(element);

  // Re-render Lucide icons
  lucide.createIcons();
}

/**
 * Handle gallery item click
 * @param {Element} element - Clicked gallery item
 */
function openGalleryModal(element) {
  const label = element.querySelector(SELECTORS.GALLERY_LABEL).textContent;
  console.log('Gallery item clicked:', label);
}

function setupScrollNav(navSelector, sectionPrefix) {
  const nav = document.querySelector(navSelector);
  if (!nav) return;
  const scrollContainer = document.querySelector('#app');

  const links = Array.from(nav.querySelectorAll('a[data-tab], a[href^="#"]'));
  if (!links.length) return;

  const toggle = document.createElement('button');
  toggle.type = 'button';
  toggle.className = 'detail-scroll-nav-toggle font-mono';
  toggle.setAttribute('aria-expanded', 'false');
  toggle.setAttribute('aria-label', 'Toggle section navigation');
  toggle.innerHTML = `
    <span class="detail-scroll-nav-toggle-label"></span>
    <span class="detail-scroll-nav-toggle-icon" aria-hidden="true">v</span>
  `;
  nav.prepend(toggle);

  const toggleLabel = toggle.querySelector('.detail-scroll-nav-toggle-label');

  const setDropdownState = isOpen => {
    nav.classList.toggle('is-open', isOpen);
    toggle.setAttribute('aria-expanded', String(isOpen));
  };

  const updateToggleLabel = activeLink => {
    if (!toggleLabel) return;
    toggleLabel.textContent = activeLink ? activeLink.textContent.trim() : 'Sections';
  };

  toggle.addEventListener('click', () => {
    if (!nav.classList.contains('is-dropdown')) return;
    setDropdownState(!nav.classList.contains('is-open'));
  });

  const sectionMap = new Map();
  links.forEach(link => {
    const tab = link.dataset.tab;
    const href = link.getAttribute('href');
    const targetId = tab ? `${sectionPrefix}-${tab}` : href?.slice(1);
    if (!targetId) return;
    const section = document.getElementById(targetId);
    if (!section) return;
    sectionMap.set(link, section);

    link.addEventListener('click', event => {
      event.preventDefault();
      if (nav.classList.contains('is-dropdown')) {
        setDropdownState(false);
      }
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });

  const setActive = activeId => {
    let activeLink = null;
    links.forEach(link => {
      const tab = link.dataset.tab;
      const href = link.getAttribute('href');
      const targetId = tab ? `${sectionPrefix}-${tab}` : href?.slice(1);
      const isActive = targetId === activeId;
      link.classList.toggle('active', isActive);
      if (isActive) activeLink = link;
    });
    updateToggleLabel(activeLink || links[0]);
  };

  const syncActiveSection = () => {
    const navHeight = nav.getBoundingClientRect().height;
    const activationLine = navHeight + 48;
    let activeSection = links[0] ? sectionMap.get(links[0]) : null;

    sectionMap.forEach(section => {
      if (section.getBoundingClientRect().top <= activationLine) {
        activeSection = section;
      }
    });

    if (activeSection) {
      setActive(activeSection.id);
    }
  };

  const updateResponsiveNav = () => {
    const wasDropdown = nav.classList.contains('is-dropdown');
    const wasOpen = nav.classList.contains('is-open');
    nav.classList.remove('is-dropdown', 'is-open');

    const tops = links.map(link => Math.round(link.offsetTop));
    const wraps = new Set(tops).size > 1;
    const mobileDropdown = window.innerWidth <= 768;
    nav.classList.toggle('is-dropdown', mobileDropdown || wraps);

    if ((mobileDropdown || wraps) && wasDropdown && wasOpen) {
      setDropdownState(true);
      return;
    }

    setDropdownState(false);
  };

  const scheduleNavMeasurement = () => {
    window.requestAnimationFrame(updateResponsiveNav);
  };

  updateToggleLabel(links.find(link => link.classList.contains('active')) || links[0]);
  syncActiveSection();
  scheduleNavMeasurement();

  if (typeof ResizeObserver === 'function') {
    const resizeObserver = new ResizeObserver(scheduleNavMeasurement);
    resizeObserver.observe(nav);
    links.forEach(link => resizeObserver.observe(link));
  }

  window.addEventListener('resize', () => {
    scheduleNavMeasurement();
    syncActiveSection();
  });
  if (scrollContainer) {
    scrollContainer.addEventListener('scroll', syncActiveSection, { passive: true });
  } else {
    window.addEventListener('scroll', syncActiveSection, { passive: true });
  }
  document.addEventListener('click', event => {
    if (!nav.classList.contains('is-dropdown')) return;
    if (nav.contains(event.target)) return;
    setDropdownState(false);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  setupScrollNav('#masterTabs', '');
  setupScrollNav('#jobTabs', 'job');
  setupScrollNav('#nightTabs', 'night');
});
