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

// Cart
const cart = [];
const cartList = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');

function renderCart() {
  cartList.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    let li = document.createElement('li');
    li.textContent = `${item.name} - $${item.price.toFixed(2)} (x${item.qty})`;
    cartList.appendChild(li);
    total += item.price * item.qty;
  });
  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
}

document.querySelectorAll('.add-to-cart').forEach(btn => {
  btn.addEventListener('click', e => {
    const card = e.target.closest('.card');
    const name = card.dataset.name;
    const price = parseFloat(card.dataset.price);

    let existing = cart.find(p => p.name === name);
    if (existing) {
      existing.qty++;
    } else {
      cart.push({ name, price, qty: 1 });
    }
    renderCart();
  });
});

// Checkout button mock
document.getElementById('checkout').addEventListener('click', () => {
  alert('Thank you! Your plants will be ready for pickup in-store.');
});
