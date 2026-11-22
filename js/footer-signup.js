// This code is for the sign up feature on the footer. After the user signs up their email, they will be redirected to the thank you page
// this form validates if it is a correct email adress 
const signupForm = document.querySelector('#footer-signup');
const signupError = document.querySelector('.signup-error');

signupForm.addEventListener('submit', (event) => {
  event.preventDefault();
  signupError.textContent = '';
  const email = new FormData(signupForm).get('email').trim();
  const storageKey = 'tee-planet-signups';

  try {
    const signups = JSON.parse(localStorage.getItem(storageKey) || '[]');
    if (!signups.some((address) => address.toLowerCase() === email.toLowerCase())) {
      localStorage.setItem(storageKey, JSON.stringify([...signups, email]));
    }
  } catch {
    signupError.textContent = 'Your browser could not save your signup. Please enable site storage and try again.';
    return;
  }

  window.location.assign(signupForm.action);
});


// PS: we just added this sign up feature because we added it to our assignment 1 before 
