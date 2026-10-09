const products = [
  { id: 1, name: "Luxury Leather Handbag", price: 4500, category: "handbags",
    img: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=500" },
  { id: 2, name: "Elegant Tote Bag", price: 3200, category: "handbags",
    img: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=500" },
  { id: 3, name: "Designer Clutch", price: 2800, category: "handbags",
    img: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=500" },
  { id: 4, name: "Embroidered Unstitched Suit", price: 5500, category: "suits",
    img: "https://images.unsplash.com/photo-1610030469983-98e550d6193c?w=500" },
  { id: 5, name: "Lawn 3-Piece Suit", price: 4200, category: "suits",
    img: "https://images.unsplash.com/photo-1583391733956-6c78276477e2?w=500" },
  { id: 6, name: "Chiffon Formal Suit", price: 6800, category: "suits",
    img: "https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=500" }
];

let cart = [];

function loadProducts(filter = 'all') {
  const grid = document.getElementById('product-grid');
  grid.innerHTML = '';
  const filtered = filter === 'all' ? products : products.filter(p => p.category === filter);
  filtered.forEach(p => {
    grid.innerHTML += `
      <div class="product-card">
        <img src="${p.img}" alt="${p.name}">
        <h3>${p.name}</h3>
        <div class="price">Rs. ${p.price}</div>
        <button class="add-btn" onclick="addToCart(${p.id})">Add to Cart</button>
      </div>`;
  });
}

function addToCart(id) {
  const product = products.find(p => p.id === id);
  cart.push(product);
  document.getElementById('cart-count').innerText = cart.length;
  alert(product.name + " cart mein add ho gaya!");
}

document.querySelector('.cart-icon').addEventListener('click', () => {
  const modal = document.getElementById('cart-modal');
  modal.classList.add('active');
  renderCart();
});

function renderCart() {
  const items = document.getElementById('cart-items');
  items.innerHTML = '';
  let total = 0;
  cart.forEach((item) => {
    total += item.price;
    items.innerHTML += `<div class="cart-item">
      <span>${item.name}</span>
      <span>Rs. ${item.price}</span>
    </div>`;
  });
  document.getElementById('cart-total').innerText = total;
}

function closeCart() {
  document.getElementById('cart-modal').classList.remove('active');
}

function checkout() {
  if (cart.length === 0) { alert("Cart khali hai!"); return; }
  closeCart();
  document.getElementById('checkout-modal').classList.add('active');
}

function closeCheckout() {
  document.getElementById('checkout-modal').classList.remove('active');
}

function placeOrder() {
  const name = document.getElementById('cust-name').value.trim();
  const phone = document.getElementById('cust-phone').value.trim();
  const address1 = document.getElementById('cust-address1').value.trim();
  const address2 = document.getElementById('cust-address2').value.trim();
  const city = document.getElementById('cust-city').value;
  const province = document.getElementById('cust-province').value;
  const postal = document.getElementById('cust-postal').value.trim();
  const payment = document.getElementById('payment').value;

  if (!name || !phone || !address1 || !city || !province) {
    alert("Zaroori fields bharein: Name, Phone, Address, City, Province");
    return;
  }

  if (cart.length === 0) {
    alert("Cart khali hai!");
    return;
  }

  const orderNum = "VEL-" + Math.floor(Math.random() * 10000);
  const fullAddress = `${address1}${address2 ? ', ' + address2 : ''}, ${city}, ${province}${postal ? ' - ' + postal : ''}`;

  alert(
    `Shukriya ${name}!\n\n` +
    `Order #${orderNum} confirm ho gaya\n` +
    `Phone: ${phone}\n` +
    `Address: ${fullAddress}\n` +
    `Payment: ${payment}\n\n` +
    `Hum aapko ${phone} par call karke confirm karenge.`
  );

  cart = [];
  document.getElementById('cart-count').innerText = 0;
  closeCheckout();
}

function filterProducts(cat) {
  loadProducts(cat);
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

function scrollToProducts() {
  document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
}

loadProducts();
