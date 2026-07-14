/* TERMINAL portfolio: interactions */
(function () {
  'use strict';

  /* enable JS-gated styles (scroll reveal) only when this script runs */
  document.documentElement.classList.add('js');

  /* ---- footer year ---- */
  var yearEl = document.getElementById('y');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  /* ---- typed hero role ---- */
  var roleEl = document.getElementById('typed-role');
  if (roleEl) {
    var fullText = roleEl.getAttribute('data-text') || '';
    var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduced) {
      roleEl.textContent = fullText;
    } else {
      roleEl.textContent = '';
      var i = 0;
      var type = function () {
        if (i <= fullText.length) {
          roleEl.textContent = fullText.slice(0, i);
          i += 1;
          setTimeout(type, 34);
        }
      };
      setTimeout(type, 350);
    }
  }

  /* ---- mobile menu ---- */
  var menuBtn = document.getElementById('menu-btn');
  var mobilePanel = document.getElementById('mobile-panel');
  if (menuBtn && mobilePanel) {
    var closeMenu = function () {
      mobilePanel.classList.remove('is-open');
      menuBtn.setAttribute('aria-expanded', 'false');
      menuBtn.textContent = 'menu';
    };
    menuBtn.addEventListener('click', function () {
      var open = mobilePanel.classList.toggle('is-open');
      menuBtn.setAttribute('aria-expanded', String(open));
      menuBtn.textContent = open ? 'close' : 'menu';
    });
    mobilePanel.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', closeMenu);
    });
  }

  /* ---- collapsibles ---- */
  document.querySelectorAll('.fold-btn').forEach(function (btn) {
    var target = document.getElementById(btn.getAttribute('aria-controls'));
    if (!target) return;
    btn.addEventListener('click', function () {
      var expanded = btn.getAttribute('aria-expanded') === 'true';
      target.classList.toggle('is-collapsed', expanded);
      btn.setAttribute('aria-expanded', String(!expanded));
    });
  });

  /* ---- reveal on scroll ---- */
  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.reveal').forEach(function (el) {
      observer.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) {
      el.classList.add('is-visible');
    });
  }
})();
