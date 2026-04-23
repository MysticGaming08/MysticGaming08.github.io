// Sorting
const sortSelect = document.getElementById('sort');
const gallery = document.getElementById('product-gallery');


sortSelect.addEventListener('change', () => {
  let products = Array.from(gallery.children);

  products.sort((a, b) => {
    let valA, valB;
    switch (sortSelect.value) {
      case 'name':
        valA = a.dataset.name.toLowerCase();
        valB = b.dataset.name.toLowerCase();
        return valA.localeCompare(valB);
      case 'price':
        return parseFloat(a.dataset.price) - parseFloat(b.dataset.price);
      case 'category':
        valA = a.dataset.category.toLowerCase();
        valB = b.dataset.category.toLowerCase();
        return valA.localeCompare(valB);
    }
  });

  products.forEach(p => gallery.appendChild(p));
});

const cartOverlay = document.getElementById('cart-overlay');
const closeCartBtn = cartOverlay.querySelector('.close-cart');
const checkoutBtn = cartOverlay.querySelector('.checkout');
const cartItemsContainer = document.getElementById('cart-items');
const cartTotalEl = document.querySelector('.cart-total');
let cart = [];

// Toggle Cart
function showCart() {
  cartOverlay.style.display = 'flex';
}
function hideCart() {
  cartOverlay.style.display = 'none';
}

closeCartBtn.addEventListener('click', hideCart);
checkoutBtn.addEventListener('click', () => alert('Checkout not yet implemented'));

// Add To Cart
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.card');
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);
    
    cart.push({ name, price });
    updateCart();
    showCart();
  });
});

function updateCart() {
  cartItemsContainer.innerHTML = '';
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = '<p class="empty">No items in the cart.</p>';
    cartTotalEl.textContent = 'Total: $0.00';
    return;
  }

  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const p = document.createElement('p');
    p.textContent = `${item.name} - $${item.price.toFixed(2)}`;
    cartItemsContainer.appendChild(p);
  });

  cartTotalEl.textContent = `Total: $${total.toFixed(2)}`;
}



