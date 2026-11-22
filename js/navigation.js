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

// to show the current section/page the user is on
for (const link of menu.querySelectorAll('a[href^="#"]')) {
  link.addEventListener('click', (event) => {
    if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) {
      return;
    }

    const section = document.getElementById(link.hash.slice(1));

    if (!section) {
      return;
    }

    function focusSection() {
      section.setAttribute('tabindex', '-1');
      section.focus({ preventScroll: true });
    }

    if (menu.open) {
      menu.addEventListener('close', focusSection, { once: true });
      closeButton.click();
    } else {
      requestAnimationFrame(focusSection);
    }
  });
}

const homeLink = menu.querySelector('.nav-link[href="index.html"][aria-current="page"]');

// this code highlights the current page  
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

  // this makes the navbar keyboard accessible
  const shopLink = menu.querySelector('a[href="#shop"]');
  const aboutLink = menu.querySelector('a[href="#about"]');
  const contactLink = menu.querySelector('a[href="html/contact.html"]');
  const brandLink = navbar.querySelector('.navbar-brand');
  const nextDestination = new Map([
    [document.body, shopLink],
    [brandLink, shopLink],
    [homeLink, shopLink],
    [shopLink, aboutLink],
    [document.getElementById('shop'), aboutLink],
    [aboutLink, contactLink],
    [document.getElementById('about'), contactLink],
  ]);

  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Tab' || !event.shiftKey || event.ctrlKey || event.altKey || event.metaKey) {
      return;
    }

    const link = nextDestination.get(event.target);
    if (link) {
      event.preventDefault();
      link.click();
    }
  });
}
