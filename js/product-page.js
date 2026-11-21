const slides = [...document.querySelectorAll('.tee-slides img')];
const dots = [...document.querySelectorAll('.tee-dots button')];
let activePhoto = 0;

function showPhoto(index) {
  activePhoto = (index + slides.length) % slides.length;
  slides.forEach((slide, position) => {
    const isActive = position === activePhoto;
    slide.hidden = !isActive;
    dots[position].setAttribute('aria-pressed', String(isActive));
  });
}

document.querySelector('.tee-prev').addEventListener('click', () => showPhoto(activePhoto - 1));
document.querySelector('.tee-next').addEventListener('click', () => showPhoto(activePhoto + 1));
dots.forEach((dot, index) => dot.addEventListener('click', () => showPhoto(index)));

const product = document.querySelector('.tee-product');
const productName = product.querySelector('h1').textContent;
const purchase = product.querySelector('.tee-purchase');
const quantity = purchase.elements.quantity;
const cartDialog = document.querySelector('.tee-cart-dialog');

for (const button of purchase.querySelectorAll('[data-step]')) {
  button.addEventListener('click', () => {
    const current = quantity.valueAsNumber || 1;
    quantity.value = Math.min(99, Math.max(1, current + Number(button.dataset.step)));
  });
}
// this code gets the size and number of products ordered because we need it for the email later
purchase.addEventListener('submit', (event) => {
  event.preventDefault();

  if (event.submitter?.value === 'cart') {
    cartDialog.showModal();
    return;
  }

  const size = purchase.elements.size.value;
  const count = quantity.valueAsNumber;

  const subject = encodeURIComponent(`Order inquiry: ${productName}`);
  const body = encodeURIComponent(`Hi Tee Planet,\n\nI would like to order the ${productName}.\nSize: ${size}\nQuantity: ${count}\n\nThank you!`);
  window.location.href = `mailto:orders@examplewebsite142.com?subject=${subject}&body=${body}`;
});
