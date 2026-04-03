// Configuration management and SDK initialization

/**
 * Update DOM with new configuration
 * @param {Object} config - Configuration object
 */
async function onConfigChange(config) {
  const c = { ...defaultConfig, ...config };

  const centerImageEl = document.getElementById('centerImage');
  if (centerImageEl) centerImageEl.src = c.hero_image;

  // Job section updates
  const jobProfileName = document.getElementById('jobProfileName');
  if (jobProfileName) jobProfileName.textContent = c.job_name;

  const jobTitle = document.querySelector('#job-profile .font-mono');
  if (jobTitle) jobTitle.textContent = c.job_title;

  const jobProfileBio = document.getElementById('jobProfileBio');
  if (jobProfileBio) jobProfileBio.textContent = c.job_bio;

  const jobAvatarInitial = document.getElementById('jobAvatarInitial');
  if (jobAvatarInitial)
    jobAvatarInitial.textContent = getInitials(c.job_name);

  // Night section updates
  const nightProfileName = document.getElementById('nightProfileName');
  if (nightProfileName) nightProfileName.textContent = c.night_name;

  const nightTitle = document.querySelector('#night-profile .font-mono');
  if (nightTitle) nightTitle.textContent = c.night_title;

  const nightProfileBio = document.getElementById('nightProfileBio');
  if (nightProfileBio) nightProfileBio.textContent = c.night_bio;

  const nightAvatarInitial = document.getElementById('nightAvatarInitial');
  if (nightAvatarInitial)
    nightAvatarInitial.textContent = getInitials(c.night_name);

  // Colors
  const landingWrapper = document.querySelector('.landing-wrapper');
  if (landingWrapper)
    landingWrapper.style.background = `linear-gradient(135deg, ${c.background_color} 0%, #0a0814 100%)`;

  document.querySelectorAll('.job-card').forEach(el => {
    el.style.background = c.surface_color;
  });
  document.querySelectorAll('.job-accent').forEach(el => {
    el.style.color = c.primary_action_color;
  });
  document.querySelectorAll('.night-accent').forEach(el => {
    el.style.color = c.secondary_action_color;
  });

  // Font
  const fontStack = `${c.font_family}, sans-serif`;
  document.querySelector(SELECTORS.APP_ROOT).style.fontFamily = fontStack;

  // Font size
  const base = c.font_size;
  document.querySelectorAll('h1, h2, h3').forEach(el => {
    if (el.classList.contains('portfolio-title'))
      el.style.fontSize = `clamp(3rem, 12vw, ${base * 7}px)`;
    else if (el.classList.contains('button-title'))
      el.style.fontSize = `${base * 1.75}px`;
  });
}

/**
 * Map configuration to recolorable capabilities
 * @param {Object} config - Configuration object
 * @returns {Object} Capabilities object
 */
function mapToCapabilities(config) {
  const c = { ...defaultConfig, ...config };
  return {
    recolorables: [
      {
        get: () => c.background_color,
        set: v => {
          c.background_color = v;
          window.elementSdk.setConfig({ background_color: v });
        }
      },
      {
        get: () => c.surface_color,
        set: v => {
          c.surface_color = v;
          window.elementSdk.setConfig({ surface_color: v });
        }
      },
      {
        get: () => c.primary_action_color,
        set: v => {
          c.primary_action_color = v;
          window.elementSdk.setConfig({ primary_action_color: v });
        }
      },
      {
        get: () => c.secondary_action_color,
        set: v => {
          c.secondary_action_color = v;
          window.elementSdk.setConfig({ secondary_action_color: v });
        }
      }
    ],
    borderables: [],
    fontEditable: {
      get: () => c.font_family,
      set: v => {
        c.font_family = v;
        window.elementSdk.setConfig({ font_family: v });
      }
    },
    fontSizeable: {
      get: () => c.font_size,
      set: v => {
        c.font_size = v;
        window.elementSdk.setConfig({ font_size: v });
      }
    }
  };
}

/**
 * Map configuration to edit panel values
 * @param {Object} config - Configuration object
 * @returns {Map} Map of editable values
 */
function mapToEditPanelValues(config) {
  const c = { ...defaultConfig, ...config };
  return new Map([
    ['job_name', c.job_name],
    ['job_title', c.job_title],
    ['job_bio', c.job_bio],
    ['night_name', c.night_name],
    ['night_title', c.night_title],
    ['night_bio', c.night_bio]
  ]);
}

/**
 * Initialize SDK when DOM is ready
 */
function initializeApp() {
  // Always use the local asset image for the landing hero
  const centerImageEl = document.getElementById('centerImage');
  if (centerImageEl) {
    centerImageEl.src = defaultConfig.hero_image;
    centerImageEl.onerror = null;
  }

  // Initialize SDK if available
  if (window.elementSdk) {
    window.elementSdk.init({
      defaultConfig,
      onConfigChange,
      mapToCapabilities,
      mapToEditPanelValues
    });
  }

  // Initialize Lucide icons
  if (typeof lucide !== 'undefined') {
    lucide.createIcons();
  }
}

// Run initialization when DOM is loaded
document.addEventListener('DOMContentLoaded', initializeApp);
