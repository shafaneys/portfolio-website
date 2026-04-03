# Quick Reference Guide

## File Structure at a Glance

```
PORTFOLIO WEBSITE/ (2 directories organized by function)
├── css/           (Styles organized by purpose)
├── js/            (Logic organized by functionality)
├── index.html     (Clean HTML structure - entry point)
├── README.md      (📖 Full documentation)
└── REFACTORING_SUMMARY.md (📊 Before/After comparison)
```

---

## CSS Files - What Goes Where

### `css/main.css` - Foundation
**Use for:** Layout, typography, page structure
```css
.app-root { }
.landing-wrapper { }
.hero-header { }
.portfolio-title { }
.hero-subtitle { }
```

### `css/components.css` - Components
**Use for:** UI components and their styling
```css
.button-grid { }
.button-card { }
.gallery-grid { }
.gallery-item { }
.comp-grid { }
```

### `css/themes.css` - Themes
**Use for:** Theme-specific colors and states
```css
.job-theme { }
.job-accent { }
.job-card { }
.night-theme { }
.night-accent { }
.night-card { }
```

### `css/animations.css` - Animation Effects
**Use for:** Animations and transitions
```css
.fade-in { }
@keyframes fadeIn { }
.slide-up { }
.stagger-1 { }
```

---

## JavaScript Files - What Goes Where

### `js/config.js` - Configuration
**Use for:** Constants, default values, selectors
```javascript
const defaultConfig = { }
const SECTIONS = { }
const SELECTORS = { }
```

### `js/utils.js` - Utilities
**Use for:** Reusable helper functions
```javascript
getInitials(name)
triggerReflow(element)
clearActive(selector)
hideAll(selector)
showWithAnimation(element)
```

### `js/navigation.js` - Navigation
**Use for:** Section navigation and tab switching
```javascript
navigateTo(section)
switchJobTab(tab)
switchNightTab(tab)
openGalleryModal(element)
```

### `js/init.js` - Initialization
**Use for:** SDK setup and configuration management
```javascript
onConfigChange(config)
mapToCapabilities(config)
mapToEditPanelValues(config)
initializeApp()
```

---

## Common Tasks

### Change a Color
1. Open `css/themes.css`
2. Find `.job-accent` or `.night-accent`
3. Update the `color` value
4. Save and refresh browser

### Add New Section
1. Add HTML in `index.html`
2. Add CSS in `css/components.css` (or new file)
3. Add navigation logic in `js/navigation.js`
4. Import new JS file in `index.html` if needed

### Modify Landing Page
1. HTML structure → `index.html` (landing section)
2. Landing styles → `css/main.css`
3. Button styles → `css/components.css`
4. Animation → `css/animations.css`

### Update Profile Information
1. Edit `js/config.js` → `defaultConfig`
2. Change: `job_name`, `job_title`, `job_bio`, `night_name`, etc
3. Save and refresh

### Fix Layout Issue
1. Check `css/main.css` first (layout foundation)
2. Then check `css/components.css` (component styling)
3. Check responsive breakpoint in `css/main.css` (@media query)

---

## Import Order (IMPORTANT)

**CSS** - Load in this order:
```html
<link rel="stylesheet" href="css/main.css">      <!-- 1st -->
<link rel="stylesheet" href="css/components.css"> <!-- 2nd -->
<link rel="stylesheet" href="css/themes.css">     <!-- 3rd -->
<link rel="stylesheet" href="css/animations.css"> <!-- 4th -->
```

**JavaScript** - Load in this order:
```html
<script src="js/config.js"></script>      <!-- 1st (constants) -->
<script src="js/utils.js"></script>       <!-- 2nd (helpers) -->
<script src="js/navigation.js"></script>  <!-- 3rd (navigation) -->
<script src="js/init.js"></script>        <!-- 4th (initialization) -->
```

---

## Global Functions Available

### Navigation
```javascript
navigateTo('landing')  // Go to landing page
navigateTo('job')      // Go to job section
navigateTo('night')    // Go to night section
```

### Tab Switching
```javascript
switchJobTab('profile')     // Switch job tabs
switchJobTab('tnc')
switchJobTab('ratecard')
switchJobTab('compcard')
switchJobTab('featured')

switchNightTab('profile')   // Switch night tabs
switchNightTab('tnc')
// ... same tabs as job
```

### Gallery
```javascript
openGalleryModal(element)   // Handle gallery click
```

### Utilities
```javascript
getInitials('John Doe')     // Returns 'JD'
triggerReflow(element)      // Force animation restart
clearActive('.tab')         // Remove active class
hideAll('.content')         // Hide all matching elements
showWithAnimation(element)   // Show with fade-in
```

---

## Configuration Values

Edit these in `js/config.js` → `defaultConfig`:

```javascript
job_name: 'Name here'
job_title: 'Job title here'
job_bio: 'Biography text'
night_name: 'Name here'
night_title: 'Night role here'
night_bio: 'Night biography'
background_color: '#050810'
surface_color: '#111827'
text_color: '#f0ead6'
primary_action_color: '#f5c542'  // Job accent (yellow)
secondary_action_color: '#f472b6' // Night accent (pink)
font_family: 'Syne'
font_size: 16
```

---

## CSS Class Usage in HTML

### Layout Classes
```html
<div class="app-root">        <!-- Main container -->
<div class="landing-wrapper"> <!-- Landing section -->
<div class="hero-header">     <!-- Hero container -->
```

### Button Classes
```html
<div class="button-card button-job">    <!-- Job button -->
<div class="button-card button-night">  <!-- Night button -->
```

### Theme Classes
```html
<div class="job-theme">       <!-- Job section container -->
<div class="night-theme">     <!-- Night section container -->
<div class="job-card">        <!-- Job card styling -->
<div class="night-card">      <!-- Night card styling -->
```

### Animation Classes
```html
<div class="fade-in stagger-1">  <!-- Fade in with delay -->
<div class="slide-up">           <!-- Slide up animation -->
```

---

## Debugging Tips

### Icons not showing?
- Check if `lucide.createIcons()` is called
- Usually happens in `js/init.js` → `initializeApp()`

### Styling not applied?
- Check CSS file loading order (main → components → themes → animations)
- Clear browser cache (Ctrl+Shift+Delete)
- Check if selector matches HTML

### JavaScript function not working?
- Check if function is defined before it's called
- Check browser console for errors (F12)
- Verify import order of JS files

### Colors not matching?
- For job theme: check `css/themes.css` `.job-accent`
- For night theme: check `css/themes.css` `.night-accent`
- Or modify `js/config.js` → `defaultConfig` colors

---

## File Statistics

| Metric | Value |
|--------|-------|
| Total Lines | ~2,500 |
| HTML Lines | ~500 |
| CSS Lines | ~580 (4 files) |
| JS Lines | ~350 (4 files) |
| Documentation | ~1,000+ |
| Number of Files | 9 |

---

## Performance Notes

✅ CSS is cached per file (better than inline)
✅ JS modules load in order (no race conditions)
✅ Animations use GPU-friendly properties
✅ Responsive breakpoint at 768px (mobile-first)
✅ Lucide icons load from CDN (lightweight)
✅ Tailwind CSS from CDN for utility classes

---

## Troubleshooting Quick Links

❓ **Navigation not working?** → Check `js/navigation.js`
❓ **Colors wrong?** → Check `css/themes.css`
❓ **Layout broken?** → Check `css/main.css`
❓ **Animation not showing?** → Check `css/animations.css`
❓ **Config not updating?** → Check `js/init.js`

---

**Last Updated:** 2024
**Status:** ✅ Production Ready
