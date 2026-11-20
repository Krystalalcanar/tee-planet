const navbar = document.querySelector('.site-nav');

function updateScrollOffset() {
  const height = Math.ceil(navbar.getBoundingClientRect().height);
  document.documentElement.style.setProperty('--site-nav-height', height + 'px');
}

updateScrollOffset();
new ResizeObserver(updateScrollOffset).observe(navbar);

const menu = navbar.querySelector('#mainNav');
const closeButton = menu.querySelector('[data-bs-dismiss="drawer"]');

for (const link of menu.querySelectorAll('a[href^="#"]')) {
  link.addEventListener('click', () => {
    if (menu.open) {
      closeButton.click();
    }
  });
}
