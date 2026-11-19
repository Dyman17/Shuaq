const path = require("path");
require("dotenv").config({ path: path.join(__dirname, ".env") });

const express = require("express");
const cors = require("cors");
const { createOrder, getOrders, updateOrder, findOrderById } = require("./db");
const { sendTelegramAlert, generateClientDeepLink } = require("./telegram");

const app = express();
const PORT = process.env.PORT || 3000;
const ADMIN_API_KEY = process.env.ADMIN_API_KEY || "shuaq_admin_secret_key_2026";

// Middleware
app.use(cors());
app.use(express.json({ limit: "50kb" }));

// Rate limiter helper for order creation (in-memory)
const rateLimits = new Map();
function rateLimitOrders(req, res, next) {
  const ip = req.headers["x-forwarded-for"] || req.socket.remoteAddress || "unknown";
  const now = Date.now();
  const windowMs = 10 * 60 * 1000; // 10 minutes
  const maxAttempts = 15;

  const userRecord = rateLimits.get(ip) || [];
  const recentAttempts = userRecord.filter((t) => now - t < windowMs);

  if (recentAttempts.length >= maxAttempts) {
    return res.status(429).json({
      error: "Слишком много запросов. Пожалуйста, подождите несколько минут или напишите напрямую в Telegram."
    });
  }

  recentAttempts.push(now);
  rateLimits.set(ip, recentAttempts);
  next();
}

// Admin Auth Middleware
function requireAdmin(req, res, next) {
  const authHeader = req.headers["x-admin-key"] || req.headers["authorization"];
  const key = authHeader ? authHeader.replace(/^Bearer\s+/i, "").trim() : null;

  if (key && key === ADMIN_API_KEY) {
    return next();
  }

  return res.status(401).json({
    error: "Доступ запрещен: требуется валидный административный ключ (x-admin-key)"
  });
}

// Sanitization helper
function sanitize(val, maxLen = 500) {
  if (typeof val !== "string") return "";
  return val.replace(/[<>]/g, "").trim().slice(0, maxLen);
}

// Serve frontend static files
const frontendPath = path.join(__dirname, "..", "frontend");
app.use(express.static(frontendPath));

// ──── HEALTH CHECK ────
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "Shuaq Engineering Studio Backend",
    timestamp: new Date().toISOString()
  });
});

// ──── CREATE ORDER (POST /api/orders) ────
app.post("/api/orders", rateLimitOrders, async (req, res) => {
  try {
    const rawName = sanitize(req.body.name, 100);
    const rawTelegram = sanitize(req.body.telegram, 120);
    const rawService = sanitize(req.body.serviceType, 120);
    const rawDesc = sanitize(req.body.description, 2000);
    const rawBudget = sanitize(req.body.budget, 100);
    const rawDeadline = sanitize(req.body.deadline, 100);
    const rawEstimate = sanitize(req.body.estimatedPrice, 100);
    const rawModules = Array.isArray(req.body.selectedModules)
      ? req.body.selectedModules.map((m) => sanitize(m, 80)).filter(Boolean)
      : [];

    if (!rawTelegram && !rawName) {
      return res.status(400).json({
        error: "Пожалуйста, укажите имя и контакт (Telegram / телефон) для связи"
      });
    }

    // Save order in DB
    const order = createOrder({
      name: rawName,
      telegram: rawTelegram,
      serviceType: rawService,
      description: rawDesc,
      budget: rawBudget,
      deadline: rawDeadline,
      estimatedPrice: rawEstimate,
      selectedModules: rawModules
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

// ──── GET ALL ORDERS (GET /api/orders) [PROTECTED] ────
app.get("/api/orders", requireAdmin, (req, res) => {
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

// ──── GET SINGLE ORDER (GET /api/orders/:id) [PROTECTED] ────
app.get("/api/orders/:id", requireAdmin, (req, res) => {
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

// ──── UPDATE ORDER STATUS / APPROVAL (PATCH /api/orders/:id) [PROTECTED] ────
app.patch("/api/orders/:id", requireAdmin, (req, res) => {
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
