// Utility functions

/**
 * Get initials from a full name
 * @param {string} name - Full name
 * @returns {string} Initials (up to 2 characters)
 */
function getInitials(name) {
  return name
    .split(' ')
    .map(word => word[0])
    .join('')
    .substring(0, 2)
    .toUpperCase();
}

/**
 * Trigger reflow to enable animation restart
 * @param {Element} element - The element to reflow
 */
function triggerReflow(element) {
  void element.offsetWidth;
}

/**
 * Remove active class from all elements in a group
 * @param {string} selector - CSS selector for the group
 */
function clearActive(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.classList.remove('active');
  });
}

/**
 * Hide all elements matching a selector
 * @param {string} selector - CSS selector for elements to hide
 */
function hideAll(selector) {
  document.querySelectorAll(selector).forEach(el => {
    el.style.display = 'none';
  });
}

/**
 * Show an element and apply fade-in animation
 * @param {Element} element - Element to show
 */
function showWithAnimation(element) {
  element.style.display = 'block';
  element.classList.remove('fade-in');
  triggerReflow(element);
  element.classList.add('fade-in');
}
