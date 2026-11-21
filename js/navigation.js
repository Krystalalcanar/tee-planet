const navbar = document.querySelector('.site-nav');

function updateScrollOffset() {
  const height = Math.ceil(navbar.getBoundingClientRect().height);
  document.documentElement.style.setProperty('--site-nav-height', height + 'px');
}

updateScrollOffset();
window.addEventListener('load', updateScrollOffset);
window.addEventListener('resize', updateScrollOffset);

const menu = navbar.querySelector('#mainNav');
const closeButton = menu.querySelector('[data-bs-dismiss="drawer"]');

for (const link of menu.querySelectorAll('a[href^="#"]')) {
  link.addEventListener('click', () => {
    if (menu.open) {
      closeButton.click();
    }
  });
}

const homeLink = menu.querySelector('.nav-link[href="index.html"][aria-current="page"]');

if (homeLink) {
  const sectionLinks = [...menu.querySelectorAll('a[href="#shop"], a[href="#about"]')];

  function updateCurrentSection() {
    const currentSection = sectionLinks.find((link) => link.hash === window.location.hash);
    homeLink.classList.toggle('active', !currentSection);
    if (currentSection) {
      homeLink.removeAttribute('aria-current');
    } else {
      homeLink.setAttribute('aria-current', 'page');
    }

    for (const link of sectionLinks) {
      const isCurrent = link === currentSection;
      link.classList.toggle('active', isCurrent);
      if (isCurrent) {
        link.setAttribute('aria-current', 'location');
      } else {
        link.removeAttribute('aria-current');
      }
    }
  }

  updateCurrentSection();
  window.addEventListener('hashchange', updateCurrentSection);
}
