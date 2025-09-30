const PRODUCTS = [
  { id: 1, name: "Guitar", price: 500, file: "guitar.png" },
  { id: 2, name: "Piano", price: 1500, file: "piano.png" },
  { id: 3, name: "Violin", price: 700, file: "violin.png" },
  { id: 4, name: "Flute", price: 150, file: "flute.png" },
  { id: 5, name: "Drum", price: 1000, file: "drum.png" },
  { id: 6, name: "Saxophone", price: 1200, file: "saxophone.png" }
];

let cart = [];

function renderProducts() {
  const list = document.getElementById("product-list");
  list.innerHTML = "";
  PRODUCTS.forEach(p => {
    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <img src="${p.file}" alt="${p.name}">
      <h3>${p.name}</h3>
      <p>$${p.price}</p>
      <button onclick="addToCart(${p.id})">Add to Cart</button>
    `;
    list.appendChild(div);
  });
}

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

function updateCartCount() {
  const count = cart.reduce((sum, i) => sum + i.qty, 0);
  document.getElementById("cart-count").textContent = count;
}

function showCart() {
  document.getElementById("cart-panel").classList.remove("hidden");
  const items = document.getElementById("cart-items");
  items.innerHTML = "";
  let total = 0;
  cart.forEach(i => {
    total += i.price * i.qty;
    items.innerHTML += `<li>${i.name} x${i.qty} - $${i.price * i.qty}</li>`;
  });
  document.getElementById("cart-total").textContent = "Total: $" + total;
}

function hideCart() {
  document.getElementById("cart-panel").classList.add("hidden");
}

function checkout() {
  alert("Demo checkout! (No real payment)");
  cart = [];
  updateCartCount();
  hideCart();
}

renderProducts();
