// ─────────────────────────────────────────────────────────────
//  Shuaq · Интерактивная логика страницы онлайн-брифа (order.js)
// ─────────────────────────────────────────────────────────────

const CONFIG = {
  telegram: "dyman_kz",
  whatsapp: "77071234567",
  apiUrl: window.SHUAQ_API_URL || ""
};

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];

const PRICING_DATA = {
  types: {
    "Web & SaaS Платформа": { basePrice: 850000, days: 16, short: "Web & SaaS" },
    "AI & Automation Suite": { basePrice: 650000, days: 10, short: "AI-агенты" },
    "Digital Foundation": { basePrice: 450000, days: 8, short: "Портал / E-com" },
    "Enterprise & Custom SaaS": { basePrice: 1800000, days: 26, short: "Enterprise / IoT" }
  },
  modules: {
    "Kaspi Pay & Kaspi QR": { price: 80000, days: 2, short: "Kaspi Pay" },
    "WhatsApp Cloud Business API": { price: 90000, days: 3, short: "WhatsApp API" },
    "AI База знаний (RAG)": { price: 120000, days: 4, short: "Vector RAG" },
    "Личные кабинеты & RBAC": { price: 110000, days: 4, short: "RBAC & JWT" },
    "Сопровождение Shuaq Care": { price: 65000, days: 0, isCare: true, short: "Shuaq Care" }
  }
};

// Элементы
const form = $("#detailedBriefForm");
const briefTypes = $("#briefTypes");
const briefModules = $("#briefModules");
const sideType = $("#sideType");
const sidePrice = $("#sidePrice");
const sideDays = $("#sideDays");
const sideModules = $("#sideModules");
const briefBudget = $("#briefBudget");
const briefEstimatedPrice = $("#briefEstimatedPrice");
const submitBtn = $("#briefSubmitBtn");
const formError = $("#briefFormError");
const successCard = $("#briefSuccess");
const orderIdEl = $("#briefOrderId");
const briefTgLink = $("#briefTgLink");

// Живой пересчет сметы
function updateBriefSummary() {
  const selectedTypeEl = $('input[name="serviceType"]:checked', briefTypes);
  const typeVal = selectedTypeEl ? selectedTypeEl.value : "Web & SaaS Платформа";
  const typeInfo = PRICING_DATA.types[typeVal] || PRICING_DATA.types["Web & SaaS Платформа"];

  // Обновление карточек типа
  $$(".brief-type-card", briefTypes).forEach((card) => {
    const radio = $("input", card);
    card.classList.toggle("is-active", radio.checked);
  });

  let totalPrice = typeInfo.basePrice;
  let totalDays = typeInfo.days;
  const activeModuleTags = [];
  const selectedModuleNames = [];
  let hasCare = false;

  $$(".brief-module-item", briefModules).forEach((item) => {
    const cb = $("input", item);
    item.classList.toggle("is-checked", cb.checked);
    if (cb.checked) {
      const mod = PRICING_DATA.modules[cb.value];
      if (mod) {
        if (!mod.isCare) {
          totalPrice += mod.price;
        } else {
          hasCare = true;
        }
        totalDays += mod.days;
        activeModuleTags.push(mod.short);
        selectedModuleNames.push(cb.value);
      }
    }
  });

  // Отображение в сайдбаре
  sideType.textContent = typeInfo.short;
  const formattedBase = totalPrice.toLocaleString("ru-RU") + " ₸";
  const formattedFull = hasCare ? `${formattedBase} + 65 000 ₸/мес` : formattedBase;
  sidePrice.textContent = formattedFull;
  sideDays.textContent = `${totalDays}–${Math.round(totalDays * 1.35)} рабочих дней`;

  if (activeModuleTags.length) {
    sideModules.innerHTML = activeModuleTags.map((t) => `<li>${t}</li>`).join("");
  } else {
    sideModules.innerHTML = `<li>Базовый состав</li>`;
  }

  // Обновление скрытого инпута
  briefEstimatedPrice.value = formattedFull;

  // Синхронизация селектора бюджета
  if (briefBudget) {
    if (totalPrice < 600000) {
      briefBudget.value = "До 500 000 ₸";
    } else if (totalPrice <= 1100000) {
      briefBudget.value = "500 000 – 1 000 000 ₸";
    } else if (totalPrice <= 2000000) {
      briefBudget.value = "1 000 000 – 2 000 000 ₸";
    } else {
      briefBudget.value = "Более 2 000 000 ₸";
    }
  }

  return { typeVal, totalPrice: formattedFull, totalDays, selectedModuleNames };
}

// Слушатели изменений
if (briefTypes) briefTypes.addEventListener("change", updateBriefSummary);
if (briefModules) briefModules.addEventListener("change", updateBriefSummary);

// Поддержка query параметров при переходе (например: /order?service=AI)
const urlParams = new URLSearchParams(window.location.search);
const preService = urlParams.get("service") || urlParams.get("type");
if (preService) {
  const match = $$('input[name="serviceType"]', briefTypes).find(
    (r) => r.value.toLowerCase().includes(preService.toLowerCase())
  );
  if (match) match.checked = true;
}

updateBriefSummary();

// Отправка формы брифа
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  formError.textContent = "";

  const formData = new FormData(form);
  const data = Object.fromEntries(formData);
  data.name = (data.name || "").trim();
  data.telegram = (data.telegram || "").trim();
  data.phone = (data.phone || "").trim();
  data.company = (data.company || "").trim();
  data.description = (data.description || "").trim();

  // Проверка обязательных полей
  const missing = [];
  if (!data.name) {
    form.elements["name"].classList.add("is-invalid");
    missing.push(form.elements["name"]);
  }
  if (!data.telegram && !data.phone) {
    form.elements["telegram"].classList.add("is-invalid");
    missing.push(form.elements["telegram"]);
  }

  if (missing.length) {
    formError.textContent = "Пожалуйста, укажите имя и хотя бы один контакт (Telegram или телефон) для связи";
    missing[0].focus();
    return;
  }

  // Сбор выбранных модулей
  const modules = [];
  $$('input[name="module"]:checked', briefModules).forEach((cb) => modules.push(cb.value));
  data.selectedModules = modules;

  // Формирование итогового описания
  let fullDesc = data.description || "Без подробного описания";
  if (data.company) fullDesc = `[Компания: ${data.company}]\n${fullDesc}`;
  if (data.readiness) fullDesc = `${fullDesc}\n[Готовность: ${data.readiness}]`;
  if (data.projectLinks) fullDesc = `${fullDesc}\n[Ссылки: ${data.projectLinks}]`;
  data.description = fullDesc;

  submitBtn.disabled = true;
  $(".btn__text", submitBtn).textContent = "Отправляем бриф…";

  const briefText = `Онлайн-бриф со студии Shuaq\nИмя: ${data.name}\nКомпания: ${data.company || "—"}\nTelegram: ${data.telegram}\nТелефон/WA: ${data.phone || "—"}\nТип: ${data.serviceType}\nБюджет: ${data.budget}\nСроки: ${data.deadline}\nСмета: ${data.estimatedPrice}\nМодули: ${modules.join(", ") || "Базовые"}\nЗадача:\n${fullDesc}`;

  let orderId = "SHQ-" + Math.floor(2000 + Math.random() * 8000);
  let followLink = `https://t.me/${CONFIG.telegram}?text=${encodeURIComponent(briefText)}`;

  try {
    const endpoint = CONFIG.apiUrl ? `${CONFIG.apiUrl.replace(/\/+$/, "")}/api/orders` : "/api/orders";
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
    const json = await res.json();
    if (!res.ok || !json.success) throw new Error(json.error || "Ошибка сервера");
    orderId = json.order.id;
    if (json.telegramDeepLink) followLink = json.telegramDeepLink;
  } catch (err) {
    console.warn("API заявок недоступен, используем прямой переход в Telegram:", err);
  }

  // Показ экрана успешной отправки
  orderIdEl.textContent = orderId;
  briefTgLink.href = followLink;
  form.hidden = true;
  successCard.hidden = false;
  successCard.scrollIntoView({ behavior: "smooth", block: "center" });
});

form.addEventListener("input", (e) => e.target.classList?.remove("is-invalid"));
