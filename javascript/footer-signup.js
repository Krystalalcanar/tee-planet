const signupForm = document.querySelector('#footer-signup');
const signupError = document.querySelector('.signup-error');

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const email = new FormData(signupForm).get('email').trim();
  if (email) {
    const storageKey = 'tee-planet-signups';

    try {
      const signups = JSON.parse(localStorage.getItem(storageKey) || '[]');
      if (!signups.some((address) => address.toLowerCase() === email.toLowerCase())) {
        localStorage.setItem(storageKey, JSON.stringify([...signups, email]));
      }
    } catch {
      signupError.textContent = 'Your browser couldn’t save your signup. Please enable site storage and try again.';
      signupError.hidden = false;
      return;
    }
  }

  window.location.assign('signup-confirmation.html');
});
