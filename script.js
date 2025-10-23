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

const sidebar = document.querySelector('.sidebar');
const sidebarToggle = document.querySelector('.sidebar-toggle');
const sidebarClose = document.querySelector('.sidebar-close');
const categoryButtons = document.querySelectorAll('.sidebar-categories button[data-category]');
const clearButton = document.querySelector('.sidebar-clear');
const categorizedCards = document.querySelectorAll('.card[data-category]');
const mobileBreakpoint = window.matchMedia('(max-width: 1023px)');

let activeCategory = null;

const openSidebar = () => {
  sidebar?.classList.add('is-open');
  sidebarToggle?.setAttribute('aria-expanded', 'true');
};

const closeSidebar = () => {
  sidebar?.classList.remove('is-open');
  sidebarToggle?.setAttribute('aria-expanded', 'false');
};

sidebarToggle?.addEventListener('click', () => {
  const expanded = sidebarToggle.getAttribute('aria-expanded') === 'true';
  if (expanded) {
    closeSidebar();
  } else {
    openSidebar();
  }
});

sidebarClose?.addEventListener('click', closeSidebar);

const clearHighlights = () => {
  activeCategory = null;
  categoryButtons.forEach(button => button.classList.remove('is-active'));
  categorizedCards.forEach(card => {
    card.classList.remove('is-highlighted');
    card.classList.remove('is-dimmed');
  });
};

const applyCategory = category => {
  if (activeCategory === category) {
    clearHighlights();
    return;
  }

  activeCategory = category;
  categoryButtons.forEach(button => {
    button.classList.toggle('is-active', button.dataset.category === category);
  });

  categorizedCards.forEach(card => {
    const categories = (card.dataset.category || '').split(/\s+/).filter(Boolean);
    const match = categories.includes(category);
    card.classList.toggle('is-highlighted', match);
    card.classList.toggle('is-dimmed', !match);
  });

  if (mobileBreakpoint.matches) closeSidebar();
};

categoryButtons.forEach(button => {
  button.addEventListener('click', () => applyCategory(button.dataset.category));
});

clearButton?.addEventListener('click', () => {
  clearHighlights();
  if (mobileBreakpoint.matches) closeSidebar();
});

const resetInteractions = event => {
  if (!event.matches) {
    closeSidebar();
  }
};

if (typeof mobileBreakpoint.addEventListener === 'function') {
  mobileBreakpoint.addEventListener('change', resetInteractions);
} else if (typeof mobileBreakpoint.addListener === 'function') {
  mobileBreakpoint.addListener(resetInteractions);
}
