const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "data", "orders.json");

// Ensure DB file exists
function initDB() {
  if (!fs.existsSync(path.dirname(DB_FILE))) {
    fs.mkdirSync(path.dirname(DB_FILE), { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    fs.writeFileSync(DB_FILE, JSON.stringify([], null, 2), "utf-8");
  }
}

// Read all orders
function getOrders() {
  initDB();
  try {
    const raw = fs.readFileSync(DB_FILE, "utf-8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error("DB Read Error:", err);
    return [];
  }
}

// Save all orders
function saveOrders(orders) {
  initDB();
  fs.writeFileSync(DB_FILE, JSON.stringify(orders, null, 2), "utf-8");
}

// Generate new ID
function generateOrderId(orders) {
  const nextNum = 1000 + orders.length + 1;
  return `SHQ-${nextNum}`;
}

// Create order
function createOrder(orderData) {
  const orders = getOrders();
  const newOrder = {
    id: generateOrderId(orders),
    createdAt: new Date().toISOString(),
    name: orderData.name?.trim() || "Аноним",
    telegram: orderData.telegram?.trim() || "",
    serviceType: orderData.serviceType || "Web & SaaS",
    description: orderData.description?.trim() || "",
    budget: orderData.budget || "Договорной",
    deadline: orderData.deadline || "Не срочно",
    status: "new", // new | in_review | approved | in_progress | completed | rejected
    adminNotes: ""
  };

  orders.unshift(newOrder); // newest first
  saveOrders(orders);
  return newOrder;
}

// Update order status or notes
function updateOrder(id, updates) {
  const orders = getOrders();
  const index = orders.findIndex((o) => o.id === id);
  if (index === -1) return null;

  const allowedFields = ["status", "adminNotes", "budget", "deadline"];
  for (const field of allowedFields) {
    if (updates[field] !== undefined) {
      orders[index][field] = updates[field];
    }
  }

  orders[index].updatedAt = new Date().toISOString();
  saveOrders(orders);
  return orders[index];
}

// Find order by ID
function findOrderById(id) {
  const orders = getOrders();
  return orders.find((o) => o.id === id) || null;
}

module.exports = {
  createOrder,
  getOrders,
  updateOrder,
  findOrderById
};
