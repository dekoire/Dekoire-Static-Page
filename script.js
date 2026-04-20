/**
 * script.js – Dekoire Website
 *
 * 1. Navbar: transparent → solid on scroll
 * 2. Mobile menu toggle
 * 3. Show success/error message after form submission
 *    (contact.php redirects back with ?sent=1 or ?sent=error)
 * 4. Scroll animations via IntersectionObserver
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

  /* ── Scroll animations ────────────────────────────────────── */
  // Add data-animate / data-animate-stagger to elements automatically
  // so the HTML stays clean and easy to read.
  var animateSingle = [
    '.section__header',
    '.about__visual',
    '.about__content',
    '.contact__intro',
    '.contact__form-wrap',
    '.contact__map',
  ];

  var animateStagger = [
    '.services__grid',
    '.expertise__grid',
    '.process__steps',
  ];

  animateSingle.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.setAttribute('data-animate', '');
    });
  });

  animateStagger.forEach(function (sel) {
    document.querySelectorAll(sel).forEach(function (el) {
      el.setAttribute('data-animate-stagger', '');
    });
  });

  // Only run observer if reduced-motion is not preferred
  if (window.matchMedia('(prefers-reduced-motion: no-preference)').matches) {
    var scrollObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          scrollObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });

    document.querySelectorAll('[data-animate], [data-animate-stagger]').forEach(function (el) {
      scrollObserver.observe(el);
    });
  } else {
    // Reduced motion: skip animation, show everything immediately
    document.querySelectorAll('[data-animate], [data-animate-stagger]').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }

}());
