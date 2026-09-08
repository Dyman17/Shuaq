const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const { createOrder, getOrders, updateOrder, findOrderById } = require("./db");
const { sendTelegramAlert, generateClientDeepLink } = require("./telegram");

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Serve frontend static files
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));

// ──── HEALTH CHECK ────
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Shuaq Backend",
    timestamp: new Date().toISOString()
  });
});

// ──── CREATE ORDER (POST /api/orders) ────
app.post("/api/orders", async (req, res) => {
  try {
    const { name, telegram, serviceType, description, budget, deadline } = req.body;

    if (!telegram && !name) {
      return res.status(400).json({
        error: "Пожалуйста, укажите имя и контакт в Telegram для связи"
      });
    }

    // Save order in DB
    const order = createOrder({
      name,
      telegram,
      serviceType,
      description,
      budget,
      deadline
    });

    // Send Telegram alert in background / async
    const tgResult = await sendTelegramAlert(order);

    res.status(201).json({
      success: true,
      message: "Заявка успешно принята!",
      order,
      telegramAlertSent: tgResult.sent,
      telegramDeepLink: tgResult.deepLink
    });
  } catch (err) {
    console.error("Ошибка при создании заказа:", err);
    res.status(500).json({
      error: "Внутренняя ошибка сервера при оформлении заказа"
    });
  }
});

// ──── GET ALL ORDERS (GET /api/orders) ────
app.get("/api/orders", (req, res) => {
  try {
    const { status } = req.query;
    let orders = getOrders();

    if (status) {
      orders = orders.filter((o) => o.status === status);
    }

    res.json({
      success: true,
      count: orders.length,
      orders
    });
  } catch (err) {
    res.status(500).json({ error: "Ошибка чтения заказов" });
  }
});

// ──── GET SINGLE ORDER (GET /api/orders/:id) ────
app.get("/api/orders/:id", (req, res) => {
  const order = findOrderById(req.params.id);
  if (!order) {
    return res.status(404).json({ error: "Заказ не найден" });
  }
  res.json({
    success: true,
    order,
    telegramDeepLink: generateClientDeepLink(order)
  });
});

// ──── UPDATE ORDER STATUS / APPROVAL (PATCH /api/orders/:id) ────
app.patch("/api/orders/:id", (req, res) => {
  try {
    const updated = updateOrder(req.params.id, req.body);
    if (!updated) {
      return res.status(404).json({ error: "Заказ не найден" });
    }
    res.json({
      success: true,
      message: "Статус заказа обновлен",
      order: updated
    });
  } catch (err) {
    res.status(500).json({ error: "Ошибка обновления заказа" });
  }
});

// Fallback to frontend index.html
app.get("*", (req, res) => {
  res.sendFile(path.join(frontendPath, "index.html"));
});

// Start Server
app.listen(PORT, () => {
  console.log(`✨ [Shuaq Backend] Сервер запущен на http://localhost:${PORT}`);
  console.log(`🌐 Раздача фронтенда из: ${frontendPath}`);
});
