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
const cartKey = product.dataset.cartKey;
const purchase = product.querySelector('.tee-purchase');
const quantity = purchase.elements.quantity;
const cartDialog = document.querySelector('.tee-cart-dialog');
const cartMessage = document.querySelector('#tee-cart-message');
const cartCheck = document.querySelector('.tee-cart-check');

for (const button of purchase.querySelectorAll('[data-step]')) {
  button.addEventListener('click', () => {
    const current = quantity.valueAsNumber || 1;
    quantity.value = Math.min(99, Math.max(1, current + Number(button.dataset.step)));
  });
}

purchase.addEventListener('submit', (event) => {
  event.preventDefault();
  const size = purchase.elements.size.value;
  const count = quantity.valueAsNumber;

  if (event.submitter?.value === 'cart') {
    try {
      const cart = JSON.parse(localStorage.getItem(cartKey) || '{}');
      cart[size] = (cart[size] || 0) + count;
      localStorage.setItem(cartKey, JSON.stringify(cart));
      cartMessage.textContent = 'Item added to your cart';
      cartCheck.hidden = false;
    } catch {
      cartMessage.textContent = 'Cart storage is unavailable. Use Buy Now to order by email.';
      cartCheck.hidden = true;
    }
    cartDialog.showModal();
    return;
  }

  const subject = encodeURIComponent(`Order inquiry: ${productName}`);
  const body = encodeURIComponent(`Hi Tee Planet,\n\nI’d like to order the ${productName}.\nSize: ${size}\nQuantity: ${count}\n\nThank you!`);
  window.location.href = `mailto:orders@examplewebsite142.com?subject=${subject}&body=${body}`;
});
