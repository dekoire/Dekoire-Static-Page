/**
 * script.js – Dekoire Website
 *
 * 1. Navbar: transparent → solid on scroll
 * 2. Mobile menu toggle
 * 3. Show success/error message after form submission
 *    (contact.php redirects back with ?sent=1 or ?sent=error)
 */

(function () {
  'use strict';

  /* ── Navbar scroll behavior ───────────────────────────────── */
  var nav = document.getElementById('nav');

  function updateNav() {
    if (window.scrollY > 20) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  }

  if (nav) {
    window.addEventListener('scroll', updateNav, { passive: true });
    updateNav();
  }

  /* ── Mobile menu toggle ───────────────────────────────────── */
  var navToggle = document.getElementById('navToggle');
  var navLinks  = document.getElementById('navLinks');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function () {
      var isOpen = navLinks.classList.toggle('is-open');
      navToggle.classList.toggle('is-open', isOpen);
      navToggle.setAttribute('aria-expanded', String(isOpen));
      navToggle.setAttribute('aria-label', isOpen ? 'Menü schließen' : 'Menü öffnen');
    });

    // Close menu when any nav link is clicked
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('is-open');
        navToggle.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.setAttribute('aria-label', 'Menü öffnen');
      });
    });
  }

  /* ── Contact form: show success/error on page load ───────── */
  var params = new URLSearchParams(window.location.search);
  var sent   = params.get('sent');

  function showMessage(id) {
    var el = document.getElementById(id);
    if (!el) return;
    el.classList.add('is-visible');
    // Scroll contact section into view
    var section = document.getElementById('kontakt');
    if (section) {
      setTimeout(function () {
        section.scrollIntoView({ behavior: 'smooth' });
      }, 80);
    }
  }

  if (sent === '1') {
    showMessage('formSuccess');
    // Clean the query string from the URL without reloading
    history.replaceState(null, '', window.location.pathname + '#kontakt');
  } else if (sent === 'error') {
    showMessage('formError');
    history.replaceState(null, '', window.location.pathname + '#kontakt');
  }

}());
