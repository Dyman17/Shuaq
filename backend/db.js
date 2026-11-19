const fs = require("fs");
const path = require("path");

const DB_FILE = path.join(__dirname, "data", "orders.json");

// Ensure DB file exists
function initDB() {
  const dir = path.dirname(DB_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(DB_FILE)) {
    const initialOrders = [
      {
        id: "SHQ-1001",
        createdAt: new Date().toISOString(),
        name: "Демо Заказчик",
        telegram: "@Dyman17",
        serviceType: "Web & SaaS Платформа",
        description: "Разработка B2B платформы с личным кабинетом и Kaspi Pay",
        budget: "380 000 ₸",
        deadline: "В течение месяца",
        status: "approved",
        adminNotes: "Демонстрационный заказ",
        selectedModules: ["Kaspi QR & Kaspi Pay", "AI База знаний (RAG)"],
        estimatedPrice: "от 380 000 ₸"
      }
    ];
    fs.writeFileSync(DB_FILE, JSON.stringify(initialOrders, null, 2), "utf8");
  }
}

// Read all orders safely
function getOrders() {
  initDB();
  try {
    const raw = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(raw || "[]");
  } catch (err) {
    console.error("DB Read Error:", err);
    return [];
  }
}

// Atomic Safe Save (writes to temp file, then renames to avoid partial write corruption)
function saveOrders(orders) {
  initDB();
  const tempFile = `${DB_FILE}.tmp.${Date.now()}`;
  try {
    fs.writeFileSync(tempFile, JSON.stringify(orders, null, 2), "utf8");
    fs.renameSync(tempFile, DB_FILE);
  } catch (err) {
    console.error("DB Write Error:", err);
    if (fs.existsSync(tempFile)) {
      try {
        fs.unlinkSync(tempFile);
      } catch (e) {}
    }
  }
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
    name: orderData.name || "Аноним",
    company: orderData.company || "",
    phone: orderData.phone || "",
    telegram: orderData.telegram || "",
    serviceType: orderData.serviceType || "Web & SaaS",
    description: orderData.description || "",
    budget: orderData.budget || "Договорной",
    deadline: orderData.deadline || "В течение месяца",
    estimatedPrice: orderData.estimatedPrice || "",
    selectedModules: orderData.selectedModules || [],
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

  const allowedFields = ["status", "adminNotes", "budget", "deadline", "estimatedPrice"];
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
