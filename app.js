const STOCKS = [
  "GOOG", "TSLA", "AMZN", "META", "NVDA",
  "AAPL", "MSFT", "NFLX", "INTC", "AMD"
];

const USERS = {
  user1: { email: null, subs: [] },
  user2: { email: null, subs: [] }
};

// Price engine
let prices = {};
STOCKS.forEach(stock => {
  prices[stock] = { value: basePrice(), prev: null };
});

function basePrice() {
  return +(Math.random() * 400 + 100).toFixed(2);
}

function updatePrice(stock) {
  const delta = (Math.random() * 2 - 1) * 0.4;
  prices[stock].prev = prices[stock].value;
  prices[stock].value = +(prices[stock].value * (1 + delta / 100)).toFixed(2);
}

// User login
function login(userKey) {
  const emailInput = document.getElementById(userKey === "user1" ? "email1" : "email2");
  const email = emailInput.value.trim();
  if (!email) return alert("Email required");

  USERS[userKey].email = email;

  document.getElementById(`login-${userKey}`).style.display = "none";
  document.getElementById(`dashboard-${userKey}`).style.display = "block";
  document.getElementById(`label-${userKey}`).innerText = email;

  renderStockCards(userKey);
  renderPrices(userKey);
}

// User logout
function logout(userKey) {
  USERS[userKey] = { email: null, subs: [] };

  document.getElementById(`dashboard-${userKey}`).style.display = "none";
  document.getElementById(`login-${userKey}`).style.display = "block";
}

// Stock display(UI)
function renderStockCards(userKey) {
  const container = document.getElementById(`stocks-${userKey}`);
  container.innerHTML = "";

  STOCKS.forEach(stock => {
    const card = document.createElement("div");
    card.className = "stock-card";
    if (USERS[userKey].subs.includes(stock)) card.classList.add("selected");

    card.innerText = stock;
    card.onclick = () => toggleStock(userKey, stock);

    container.appendChild(card);
  });
}

function toggleStock(userKey, stock) {
  const subs = USERS[userKey].subs;
  USERS[userKey].subs = subs.includes(stock)
    ? subs.filter(s => s !== stock)
    : [...subs, stock];

  renderStockCards(userKey);
  renderPrices(userKey);
}

// Price board
function renderPrices(userKey) {
  const list = document.getElementById(`prices-${userKey}`);
  list.innerHTML = "";

  USERS[userKey].subs.forEach(stock => {
    const p = prices[stock];
    const cls = p.prev && p.value < p.prev ? "down" : "up";

    const li = document.createElement("li");
    li.innerHTML = `<strong>${stock}</strong><span class="${cls}">$${p.value}</span>`;
    list.appendChild(li);
  });
}

// Async update
setInterval(() => {
  if (USERS.user1.email) {
    USERS.user1.subs.forEach(updatePrice);
    renderPrices("user1");
  }
}, 1000);

setInterval(() => {
  if (USERS.user2.email) {
    USERS.user2.subs.forEach(updatePrice);
    renderPrices("user2");
  }
}, 1300);
