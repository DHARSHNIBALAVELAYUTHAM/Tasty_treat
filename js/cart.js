// ========================
// CART FUNCTIONALITY
// ========================
let cart = JSON.parse(localStorage.getItem("cart")) || [];

/* ADD TO CART */
function addToCart(name, price) {
  const item = cart.find(i => i.name === name);

  if (item) {
    item.qty++;
  } else {
    cart.push({ name, price, qty: 1 });
  }

  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
  showToast(name + " added to cart");
}

/* SHOW TOAST */


function showToast(message) {
  const toast = document.createElement("div");
  toast.innerHTML = `<strong>${message}</strong> ✅`;
  toast.style.position = "fixed";
  toast.style.top = "20px";
  toast.style.left = "50%";
  toast.style.transform = "translateX(-50%)";
  toast.style.background = "#ff4d4d";
  toast.style.color = "#fff";
  toast.style.fontSize = "18px";
  toast.style.fontWeight = "bold";
  toast.style.padding = "12px 25px";
  toast.style.borderRadius = "10px";
  toast.style.boxShadow = "0 6px 20px rgba(0,0,0,0.3)";
  toast.style.zIndex = 10000;
  toast.style.opacity = 1;
  toast.style.transition = "opacity 0.5s ease, transform 0.5s ease";

  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = 0;
    toast.style.transform = "translateX(-50%) translateY(-20px)";
    setTimeout(() => toast.remove(), 500);
  }, 1500);
}

/* RENDER CART */
function renderCart() {
  const cartDiv = document.getElementById("cart-items");
  const totalSpan = document.getElementById("total");

  if (!cartDiv) return;

  cartDiv.innerHTML = "";
  let total = 0;

  if (cart.length === 0) {
    cartDiv.innerHTML = "<p>Your cart is empty 🛒</p>";
    if(totalSpan) totalSpan.innerText = 0;
    return;
  }

  cart.forEach((item, index) => {
    const itemTotal = item.price * item.qty;
    total += itemTotal;

    cartDiv.innerHTML += `
      <div class="cart-item">
        <div>
          <h3>${item.name}</h3>
          <p>₹${item.price} × ${item.qty} = <strong>₹${itemTotal}</strong></p>
        </div>

        <div class="cart-actions">
          <button onclick="changeQty(${index}, -1)">-</button>
          <span>${item.qty}</span>
          <button onclick="changeQty(${index}, 1)">+</button>
          <button onclick="removeItem(${index})">✖</button>
        </div>
      </div>
    `;
  });

  if(totalSpan) totalSpan.innerText = total;
  localStorage.setItem("cart", JSON.stringify(cart));
}

/* CHANGE QUANTITY */
function changeQty(index, change) {
  cart[index].qty += change;
  if (cart[index].qty <= 0) cart.splice(index, 1);
  renderCart();
  updateCartCount();
}

/* REMOVE ITEM */
function removeItem(index) {
  cart.splice(index, 1);
  renderCart();
  updateCartCount();
}

/* CART COUNT */
function updateCartCount() {
  const count = cart.reduce((sum, item) => sum + item.qty, 0);
  const badge = document.getElementById("cart-count");
  if (badge) badge.innerText = count;
}

// ========================
// CATEGORY + SEARCH
// ========================
document.addEventListener("DOMContentLoaded", () => {
  renderCart();
  updateCartCount();

  const menuSections = document.querySelectorAll(".menu-section");
  const searchInput = document.getElementById("searchInput");

  // SEARCH BAR
  if (searchInput) {
    searchInput.addEventListener("input", function() {
      const query = this.value.toLowerCase();
      menuSections.forEach(section => {
        const cards = section.querySelectorAll(".menu-card");
        let anyVisible = false;

        cards.forEach(card => {
          const name = card.querySelector(".food-name").textContent.toLowerCase();
          if (name.includes(query)) {
            card.style.display = "block";
            anyVisible = true;
          } else {
            card.style.display = "none";
          }
        });

        section.style.display = anyVisible ? "block" : "none";
      });
    });
  }
});

/* CATEGORY FILTER */
function showCategory(category) {
  const sections = document.querySelectorAll(".menu-section");

  if (category === "all") {
    sections.forEach(sec => sec.style.display = "block");
    return;
  }

  sections.forEach(sec => {
    if (sec.id === category) sec.style.display = "block";
    else sec.style.display = "none";
  });

  // Clear search input when switching category
  const searchInput = document.getElementById("searchInput");
  if (searchInput) searchInput.value = "";
}





function showNotification(msg) {
  const notify = document.getElementById("notification");
  notify.innerHTML = msg + " ✅";

  setTimeout(() => {
    notify.innerHTML = "";
  }, 2500);
}



















