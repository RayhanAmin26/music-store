const EXCHANGE_RATE = 110; // 1 USD = 110 BDT (example)

const PRODUCTS = [
  { id: 1, name: "Guitar", price: 500, file: "guitar.png" },
  { id: 2, name: "Piano", price: 1500, file: "piano.png" },
  { id: 3, name: "Violin", price: 700, file: "violin.png" },
  { id: 4, name: "Flute", price: 150, file: "flute.png" },
  { id: 5, name: "Drum", price: 1000, file: "drum.png" },
  { id: 6, name: "Saxophone", price: 1200, file: "saxophone.png" }
];

let cart = [];

// Render products dynamically
function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  PRODUCTS.forEach(p => {
    const div = document.createElement("div");
    div.className = "col-sm-6 col-md-4 col-lg-3";
    div.innerHTML = `
      <div class="card h-100 shadow-sm">
        <img src="${p.file}" class="card-img-top" alt="${p.name}">
        <div class="card-body text-center">
          <h5 class="card-title">${p.name}</h5>
          <p class="card-text fw-bold text-primary">৳${p.price * EXCHANGE_RATE}</p>
          <button class="btn btn-primary w-100" onclick="addToCart(${p.id})">Add to Cart</button>
        </div>
      </div>
    `;
    list.appendChild(div);
  });
}

// Add item to cart
function addToCart(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.qty++;
  } else {
    const product = PRODUCTS.find(p => p.id === id);
    cart.push({ ...product, qty: 1 });
  }
  updateCartCount();
}

// Update cart count in navbar
function updateCartCount() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById("cart-count").textContent = count;
}

// Show cart panel
function showCart() {
  document.getElementById("cart-panel").classList.remove("hidden");
  const items = document.getElementById("cart-items");
  items.innerHTML = "";
  let total = 0;
  cart.forEach(i => {
    total += i.price * i.qty;
    items.innerHTML += `<li class="list-group-item d-flex justify-content-between align-items-center">
                          ${i.name} x${i.qty}
                          <span>৳${i.price * EXCHANGE_RATE * i.qty}</span>
                        </li>`;
  });
  document.getElementById("cart-total").textContent = "Total: ৳" + total * EXCHANGE_RATE;
}

// Hide cart panel
function hideCart() {
  document.getElementById("cart-panel").classList.add("hidden");
}

// Checkout function
function checkout() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }
  alert("Demo checkout complete! (No real payment)");
  cart = [];
  updateCartCount();
  hideCart();
}

// Initialize
renderProducts();
