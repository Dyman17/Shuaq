const https = require("https");

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;
const MANAGER_USERNAME = process.env.TELEGRAM_MANAGER_USERNAME || "dyman_kz";

/**
 * Format order into a clean HTML message for Telegram
 */
function formatTelegramMessage(order) {
  const tgHandle = order.telegram ? (order.telegram.startsWith("@") ? order.telegram : `@${order.telegram}`) : "—";
  const phoneLine = order.phone ? `\n📞 <b>Телефон/WA:</b> <code>${escapeHtml(order.phone)}</code>` : "";
  const companyLine = order.company ? `\n🏢 <b>Компания:</b> ${escapeHtml(order.company)}` : "";

  const modulesLine = order.selectedModules && order.selectedModules.length
    ? `\n🧩 <b>Выбранные модули:</b> ${escapeHtml(order.selectedModules.join(", "))}`
    : "";

  const estimateLine = order.estimatedPrice
    ? `\n📊 <b>Расчёт калькулятора:</b> ${escapeHtml(order.estimatedPrice)}`
    : "";

  return `
✨ <b>НОВАЯ ЗАЯВКА НА ПРОЕКТ · SHUAQ</b>
━━━━━━━━━━━━━━━━━━━━
🆔 <b>Код заказа:</b> <code>${order.id}</code>
📅 <b>Время:</b> ${new Date(order.createdAt).toLocaleString("ru-RU", { timeZone: "Asia/Almaty" })}

👤 <b>Клиент:</b> ${escapeHtml(order.name)}${companyLine}
💬 <b>Telegram:</b> ${escapeHtml(tgHandle)}${phoneLine}
🎯 <b>Тип проекта:</b> ${escapeHtml(order.serviceType)}
💰 <b>Бюджет:</b> ${escapeHtml(order.budget)}${estimateLine}${modulesLine}
⏱ <b>Сроки:</b> ${escapeHtml(order.deadline)}

📝 <b>Описание задачи:</b>
<i>${escapeHtml(order.description || "Без подробного описания")}</i>
━━━━━━━━━━━━━━━━━━━━
⚡ <i>Согласование: используйте API /api/orders/${order.id}</i>
  `.trim();
}

/**
 * Generate a client deep link to open Telegram with prefilled text
 */
function generateClientDeepLink(order) {
  const text = `Привет! Оставил заявку на сайте Shuaq:
Код: ${order.id}
Тип: ${order.serviceType}
Бюджет: ${order.budget}
Задача: ${order.description}`;

  return `https://t.me/${MANAGER_USERNAME}?text=${encodeURIComponent(text)}`;
}

/**
 * Send notification to Telegram via Bot API
 */
async function sendTelegramAlert(order) {
  if (!BOT_TOKEN || !CHAT_ID) {
    console.log(
      `[Telegram] BOT_TOKEN или CHAT_ID не настроены в .env. Симуляция отправки для заказа ${order.id}:`
    );
    console.log(`[Telegram] Ссылка для клиента: ${generateClientDeepLink(order)}`);
    return {
      sent: false,
      reason: "TOKEN_OR_CHAT_ID_MISSING",
      deepLink: generateClientDeepLink(order)
    };
  }

  const messageText = formatTelegramMessage(order);

  const payload = JSON.stringify({
    chat_id: CHAT_ID,
    text: messageText,
    parse_mode: "HTML",
    disable_web_page_preview: true
  });

  return new Promise((resolve) => {
    const req = https.request(
      `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Content-Length": Buffer.byteLength(payload)
        }
      },
      (res) => {
        let data = "";
        res.on("data", (chunk) => (data += chunk));
        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            if (parsed.ok) {
              console.log(`[Telegram] Сообщение успешно отправлено для заказа ${order.id}`);
              resolve({ sent: true, deepLink: generateClientDeepLink(order) });
            } else {
              console.error("[Telegram] Ошибка Telegram API:", parsed);
              resolve({ sent: false, error: parsed.description, deepLink: generateClientDeepLink(order) });
            }
          } catch (e) {
            resolve({ sent: false, error: e.message, deepLink: generateClientDeepLink(order) });
          }
        });
      }
    );

    req.on("error", (err) => {
      console.error("[Telegram] Ошибка сети при отправке:", err.message);
      resolve({ sent: false, error: err.message, deepLink: generateClientDeepLink(order) });
    });

    req.write(payload);
    req.end();
  });
}

function escapeHtml(str) {
  if (!str) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");
}

module.exports = {
  sendTelegramAlert,
  generateClientDeepLink,
  formatTelegramMessage
};
