const SUPPORTED_STOCKS = ["GOOG", "TSLA", "AMZN", "META", "NVDA"];
let currentUser = null;
let prices = {};

SUPPORTED_STOCKS.forEach(stock => {
  prices[stock] = randomPrice();
});

function randomPrice() {
  return (Math.random() * 1000 + 100).toFixed(2);
}

// LOGIN
function login() {
  const email = document.getElementById("emailInput").value;
  if (!email) return alert("Email required");

  currentUser = email;
  localStorage.setItem("currentUser", email);

  if (!localStorage.getItem(email)) {
    localStorage.setItem(email, JSON.stringify([]));
  }

  showDashboard();
}

// LOGOUT
function logout() {
  localStorage.removeItem("currentUser");
  location.reload();
}

// SHOW DASHBOARD
function showDashboard() {
  document.getElementById("login-section").style.display = "none";
  document.getElementById("dashboard").style.display = "block";
  document.getElementById("userEmail").innerText = currentUser;

  renderStockOptions();
  renderPrices();
}

// STOCK SUBSCRIPTION UI
function renderStockOptions() {
  const container = document.getElementById("stock-list");
  container.innerHTML = "";

  const subscribed = JSON.parse(localStorage.getItem(currentUser));

  SUPPORTED_STOCKS.forEach(stock => {
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = subscribed.includes(stock);
    checkbox.onchange = () => toggleStock(stock);

    container.appendChild(checkbox);
    container.appendChild(document.createTextNode(stock));
    container.appendChild(document.createElement("br"));
  });
}

// TOGGLE SUBSCRIPTION
function toggleStock(stock) {
  let subscribed = JSON.parse(localStorage.getItem(currentUser));

  if (subscribed.includes(stock)) {
    subscribed = subscribed.filter(s => s !== stock);
  } else {
    subscribed.push(stock);
  }

  localStorage.setItem(currentUser, JSON.stringify(subscribed));
}

// RENDER PRICES
function renderPrices() {
  const list = document.getElementById("price-board");
  list.innerHTML = "";

  const subscribed = JSON.parse(localStorage.getItem(currentUser));

  subscribed.forEach(stock => {
    const li = document.createElement("li");
    li.innerText = `${stock}: $${prices[stock]}`;
    list.appendChild(li);
  });
}

// PRICE UPDATES (REAL-TIME)
setInterval(() => {
  SUPPORTED_STOCKS.forEach(stock => {
    prices[stock] = randomPrice();
  });

  if (currentUser) {
    renderPrices();
  }
}, 1000);

// AUTO LOGIN IF ALREADY LOGGED IN
const savedUser = localStorage.getItem("currentUser");
if (savedUser) {
  currentUser = savedUser;
  showDashboard();
}
