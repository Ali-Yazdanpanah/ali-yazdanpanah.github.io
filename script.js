const displayYear = new Date().getFullYear();
['y', 'year'].forEach(id => {
  const el = document.getElementById(id);
  if (el) el.textContent = displayYear;
});

const menuToggle = document.querySelector('.menu-toggle');
const navPanel = document.getElementById('primary-navigation');

if (menuToggle && navPanel) {
  const largeScreen = window.matchMedia('(min-width: 900px)');

  const closeMenu = () => {
    menuToggle.setAttribute('aria-expanded', 'false');
    navPanel.classList.remove('is-open');
  };

  menuToggle.addEventListener('click', () => {
    const expanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!expanded));
    navPanel.classList.toggle('is-open', !expanded);
  });

  navPanel.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      if (menuToggle.getAttribute('aria-expanded') === 'true') {
        closeMenu();
      }
    });
  });

  if (typeof largeScreen.addEventListener === 'function') {
    largeScreen.addEventListener('change', event => {
      if (event.matches) closeMenu();
    });
  } else if (typeof largeScreen.addListener === 'function') {
    largeScreen.addListener(event => {
      if (event.matches) closeMenu();
    });
  }
}
