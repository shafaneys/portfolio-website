# Portfolio Website - File Structure Documentation

## Project Overview
This is a modern portfolio website featuring dual themes (Job & Collaboration, Night Life) with dynamic content management and responsive design. The codebase has been refactored from a monolithic HTML file into organized, modular components.

---

## Directory Structure

```
portfolio-website/
├── index.html              # Main HTML entry point
├── css/                    # Stylesheets (organized by function)
│   ├── main.css           # Core layout, typography, responsive design
│   ├── components.css     # Reusable UI components (buttons, gallery, cards)
│   ├── themes.css         # Theme-specific styles (job & night themes)
│   └── animations.css     # Animation definitions and transitions
└── js/                    # JavaScript modules (organized by function)
    ├── config.js          # Configuration constants and defaults
    ├── utils.js           # Utility helper functions
    ├── navigation.js      # Navigation and tab switching logic
    └── init.js            # SDK initialization and configuration helpers
```

---

## File Descriptions

### HTML
**`index.html`** - Main HTML file
- Contains semantic HTML structure for all sections
- References external CSS files in `<head>`
- Loads JavaScript modules at the end of `<body>`
- Imports external libraries: Tailwind CSS, Lucide icons, Google Fonts

### CSS Files

**`css/main.css`** - Core Styling (170 lines)
- Base layout and typography styles
- HTML/body resets and box-sizing
- Hero section styling (landing wrapper, title, subtitle)
- Section container layouts
- Avatar styling
- Rate card table layout
- Navigation pills
- Responsive breakpoints for mobile devices

**`css/components.css`** - Component Styling (240 lines)
- Button cards (grid layout, hover effects)
- Button styling for job and night themes
- Gallery grid system with responsive sizing
- Gallery item sizing classes (wide, tall, big)
- Gallery overlay effects
- Compensation card grid layout
- All component-level hover states and transitions

**`css/themes.css`** - Theme System (90 lines)
- Job theme styles:
  - Background: `#0a0f1a` (deep blue)
  - Accent: `#f5c542` (golden yellow)
  - Card styling and hover states
- Night theme styles:
  - Background: `#12061a` (deep purple)
  - Accent: `#f472b6` (pink)
  - Card styling and hover states
- Tab active states for both themes

**`css/animations.css`** - Animation Definitions (80 lines)
- Fade-in animation (0.6s)
- Slide-up animation (0.5s)
- Stagger delay classes (0.1s - 0.5s increments)
- Transition utility classes

### JavaScript Files

**`js/config.js`** - Constants & Configuration (50 lines)
- `defaultConfig` object with all configurable values:
  - Text content (names, titles, bios)
  - Colors (background, surface, text, accent colors)
  - Typography settings (font family, size)
- Section ID constants
- Tab type constants
- CSS selector constants

**`js/utils.js`** - Utility Functions (60 lines)
- `getInitials(name)` - Extract initials from full names
- `triggerReflow(element)` - Force browser reflow for animation reset
- `clearActive(selector)` - Remove active class from elements
- `hideAll(selector)` - Hide multiple elements
- `showWithAnimation(element)` - Show element with fade-in animation

**`js/navigation.js`** - Navigation Logic (90 lines)
- `navigateTo(section)` - Switch between landing, job, and night sections
- `switchJobTab(tab)` - Handle job section tab switching
- `switchNightTab(tab)` - Handle night section tab switching
- `openGalleryModal(element)` - Handle gallery item interactions
- Icon re-rendering on navigation

**`js/init.js`** - Initialization & Configuration (140 lines)
- `onConfigChange(config)` - Update DOM when configuration changes
- `mapToCapabilities(config)` - Map config to SDK capabilities (colors, fonts)
- `mapToEditPanelValues(config)` - Prepare editable values for SDK
- `initializeApp()` - Initialize SDK and Lucide icons
- DOMContentLoaded event listener

---

## Module Dependencies

```
index.html
├── css/main.css (loads first)
├── css/components.css (loads after main.css)
├── css/themes.css (loads after components.css)
├── css/animations.css (loads last)
└── js/ (loaded at end of body)
    ├── js/config.js (constants used by all modules)
    ├── js/utils.js (utilities used by navigation.js and init.js)
    ├── js/navigation.js (uses config.js and utils.js)
    └── js/init.js (uses config.js and utils.js)
```

---

## Component Organization

### Themes
- **Job & Collaboration**: Blue + Yellow color scheme
- **Night Life**: Purple + Pink color scheme

### Sections
1. **Landing**: Hero introduction with category buttons
2. **Job Section**: Contains 5 tabs
   - Profile (professional information)
   - T&C (terms and conditions)
   - Rate Card (pricing)
   - Comp Card (skills/services)
   - Featured Works (portfolio gallery)
3. **Night Section**: Mirror structure with night theme

### CSS Organization by Purpose
| File | Purpose | Reusability |
|------|---------|-------------|
| main.css | Layout foundation | High (core layout used everywhere) |
| components.css | UI building blocks | High (standalone components) |
| themes.css | Visual themes | Medium (theme-specific) |
| animations.css | Motion effects | High (reusable animations) |

---

## Functional Relationships

### Configuration Flow
1. `config.js` → defines default values
2. `init.js` → receives SDK config changes
3. `onConfigChange()` → updates DOM using utilities
4. `js/utils.js` → helper functions for DOM manipulation

### Navigation Flow
1. User clicks navigation button
2. `navigateTo()` in `navigation.js` is called
3. Section visibility is toggled
4. Lucide icons are re-rendered

### Tab Switching Flow
1. User clicks tab button
2. `switchJobTab()` or `switchNightTab()` is called
3. Active states are updated using `clearActive()`
4. Target content is shown with `showWithAnimation()`
5. Icons are re-rendered

---

## Key Features Preserved

✅ **UI/UX**: All visual styling and interactions remain identical
✅ **Animations**: All fade-in, slide-up, and stagger animations preserved
✅ **Themes**: Dual theme system (Job and Night) fully functional
✅ **Responsiveness**: Mobile breakpoints and adaptive layouts intact
✅ **SDK Integration**: Element SDK configuration and capabilities maintained
✅ **Icons**: Lucide icon integration working on all views

---

## Maintenance & Scalability

### Adding New Styles
- For layout changes: edit `css/main.css`
- For component updates: edit `css/components.css`
- For animation tweaks: edit `css/animations.css`
- For new themes: extend `css/themes.css`

### Adding New Features
- For new pages/sections: add HTML to `index.html`, import new CSS file
- For new logic: create new JS module in `js/`, import in HTML
- For new constants: add to `config.js`
- For helper functions: add to `utils.js`

### CSS Cascade
1. main.css (base)
2. components.css (components)
3. themes.css (overrides)
4. animations.css (effects)

This ensures proper specificity and override behavior.

---

## File Size Summary
- **Total): ~2,500 lines of code
- **HTML**: ~500 lines
- **CSS**: ~580 lines (4 files)
- **JS**: ~350 lines (4 files)
