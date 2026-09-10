// Helper function to generate star rating
function starString(rating) {
  const stars = Math.round(rating);
  return '���'.repeat(stars) + '☆'.repeat(5 - stars);
}

// Helper function to generate product card HTML
function productCardHTML(product) {
  return `
    <a href="product.html?id=${product.id}" class="product-card">
      <img src="${product.image}" alt="${product.name}" class="product-card-image" onerror="this.src='assets/logo.jpeg'" />
      <div class="product-card-info">
        <div class="product-card-name">${product.name}</div>
        <div class="product-card-price">${formatINR(product.price)}</div>
        <div class="product-card-rating">${starString(product.rating || 5)} (${product.reviews || 0})</div>
      </div>
    </a>
  `;
}

// Update cart count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('indokidz_cart') || '[]');
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  document.querySelectorAll('.cart-count').forEach(el => {
    el.textContent = count > 0 ? count : '0';
  });
}

// Update year in footer
document.querySelectorAll('.year').forEach(el => {
  el.textContent = new Date().getFullYear();
});

// Update cart on page load
window.addEventListener('load', updateCartCount);
window.addEventListener('storage', updateCartCount);
