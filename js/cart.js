const CART_KEY = 'indokidz_cart';

function getCart() {
  return JSON.parse(localStorage.getItem(CART_KEY) || '[]');
}

function saveCart(cart) {
  localStorage.setItem(CART_KEY, JSON.stringify(cart));
  updateCartCount();
  window.dispatchEvent(new StorageEvent('storage', { key: CART_KEY }));
}

function addToCart(productId, qty, color) {
  const cart = getCart();
  const product = getProductById(productId);
  
  if (!product) return { success: false, error: 'Product not found' };
  
  const existingItem = cart.find(item => item.id === productId && item.color === color);
  
  if (existingItem) {
    existingItem.qty += qty;
  } else {
    cart.push({
      id: productId,
      name: product.name,
      price: product.price,
      image: product.image,
      color: color,
      qty: qty
    });
  }
  
  saveCart(cart);
  return { success: true, message: `${product.name} added to cart!` };
}

function removeFromCart(productId, color) {
  let cart = getCart();
  cart = cart.filter(item => !(item.id === productId && item.color === color));
  saveCart(cart);
}

function updateCartItem(productId, color, qty) {
  const cart = getCart();
  const item = cart.find(item => item.id === productId && item.color === color);
  if (item) {
    item.qty = Math.max(1, qty);
    saveCart(cart);
  }
}

function getCartTotal() {
  return getCart().reduce((total, item) => total + (item.price * item.qty), 0);
}

function renderCart() {
  const cart = getCart();
  const emptyEl = document.getElementById('cart-empty');
  const itemsEl = document.getElementById('cart-items');
  const listEl = document.getElementById('cart-list');
  
  if (!emptyEl || !itemsEl) return;
  
  if (cart.length === 0) {
    emptyEl.style.display = 'block';
    itemsEl.style.display = 'none';
  } else {
    emptyEl.style.display = 'none';
    itemsEl.style.display = 'block';
    
    listEl.innerHTML = cart.map((item, index) => `
      <div style="display:flex; gap:20px; padding:20px; background:#f8f9fa; border-radius:10px; margin-bottom:15px;">
        <img src="${item.image}" alt="${item.name}" style="width:100px; height:100px; object-fit:cover; border-radius:8px;" onerror="this.src='assets/logo.jpeg'" />
        <div style="flex:1;">
          <h3>${item.name}</h3>
          <p style="color:var(--ink-soft); margin:5px 0;">Color: <strong>${item.color}</strong></p>
          <p style="color:var(--primary); font-weight:700; font-size:1.1em;">${formatINR(item.price)}</p>
          <div style="margin-top:10px; display:flex; gap:10px;">
            <input type="number" min="1" max="10" value="${item.qty}" onchange="updateCartItem('${item.id}', '${item.color}', this.value); renderCart();" style="width:60px; padding:5px; border:1px solid var(--border); border-radius:5px;" />
            <button onclick="removeFromCart('${item.id}', '${item.color}'); renderCart();" class="btn btn-outline" style="padding:5px 15px; font-size:0.9em;">Remove</button>
          </div>
        </div>
        <div style="text-align:right;">
          <p style="font-weight:700; font-size:1.2em;">${formatINR(item.price * item.qty)}</p>
        </div>
      </div>
    `).join('');
    
    document.getElementById('cart-total').textContent = formatINR(getCartTotal());
  }
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderCart);
} else {
  renderCart();
}

window.addEventListener('storage', renderCart);
