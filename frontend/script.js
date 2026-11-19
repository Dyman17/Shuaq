import { PROJECTS, CATEGORIES } from "./projects.js";

// ─── Настройки студии ───────────────────────────────────────
// WhatsApp: впишите номер в формате 77001234567, чтобы показать кнопку.
const CONFIG = {
  telegram: "Dyman17",
  whatsapp: "",
  apiUrl: window.SHUAQ_API_URL || ""
};

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
const finePointer = matchMedia("(hover: hover) and (pointer: fine)").matches;

$("#year").textContent = new Date().getFullYear();

// ─── Навигация ──────────────────────────────────────────────
const nav = $("#nav");
const burger = $("#burger");
let lastY = scrollY;
addEventListener("scroll", () => {
  const y = scrollY;
  const goingDown = y > lastY && y > 300;
  nav.classList.toggle("is-hidden", goingDown && !nav.classList.contains("is-open"));
  lastY = y;
}, { passive: true });

burger.addEventListener("click", () => {
  const open = nav.classList.toggle("is-open");
  burger.setAttribute("aria-expanded", String(open));
});
$$("#navSheet a").forEach(a => a.addEventListener("click", () => {
  nav.classList.remove("is-open");
  burger.setAttribute("aria-expanded", "false");
}));

// ─── Появление при скролле ──────────────────────────────────
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (!e.isIntersecting) return;
    e.target.classList.add("is-in");
    io.unobserve(e.target);
  });
}, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });

function observeReveals(root = document) {
  // Небольшая задержка-«лесенка» для соседних элементов
  const groups = new Map();
  $$(".reveal:not(.is-in)", root).forEach(el => {
    const p = el.parentElement;
    const i = groups.get(p) || 0;
    groups.set(p, i + 1);
    el.style.setProperty("--d", `${Math.min(i, 6) * 0.07}s`);
    io.observe(el);
  });
}
observeReveals();

// ─── Счётчик в hero ─────────────────────────────────────────
const counter = $("[data-count]");
counter.dataset.count = PROJECTS.length;
function countUp(el) {
  const target = +el.dataset.count;
  if (reduceMotion) { el.textContent = target; return; }
  const t0 = performance.now();
  const dur = 1400;
  const tick = (t) => {
    const k = Math.min((t - t0) / dur, 1);
    el.textContent = Math.round(target * (1 - Math.pow(1 - k, 3)));
    if (k < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
setTimeout(() => countUp(counter), 700);

// ─── Свечение за курсором ───────────────────────────────────
if (finePointer && !reduceMotion) {
  const glow = $(".cursor-glow");
  let gx = -999, gy = -999, tx = -999, ty = -999;
  addEventListener("pointermove", (e) => { tx = e.clientX; ty = e.clientY; }, { passive: true });
  (function loop() {
    gx += (tx - gx) * 0.12; gy += (ty - gy) * 0.12;
    glow.style.transform = `translate3d(${gx}px, ${gy}px, 0)`;
    requestAnimationFrame(loop);
  })();
}

// ─── Параллакс облаков на фоне ──────────────────────────────
if (!reduceMotion) {
  const clouds = $$(".sky__cloud");
  addEventListener("scroll", () => {
    const y = scrollY;
    clouds.forEach((c, i) => { c.style.translate = `0 ${-y * (0.04 + i * 0.03)}px`; });
  }, { passive: true });
}

// ─── 3D-наклон карточек ─────────────────────────────────────
function bindTilt(el, strength = 8) {
  if (!finePointer || reduceMotion) return;
  el.addEventListener("pointermove", (e) => {
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transition = "transform .12s linear, box-shadow .4s";
    el.style.transform = `perspective(900px) rotateX(${-y * strength}deg) rotateY(${x * strength}deg) translateY(-4px)`;
  });
  el.addEventListener("pointerleave", () => {
    el.style.transition = "transform .7s cubic-bezier(.34,1.56,.64,1), box-shadow .4s";
    el.style.transform = "";
  });
}
$$(".tilt").forEach(el => bindTilt(el, 7));
$$(".tilt-soft").forEach(el => bindTilt(el, 10));

// ─── «Магнитные» кнопки ─────────────────────────────────────
if (finePointer && !reduceMotion) {
  $$(".magnetic").forEach(btn => {
    btn.addEventListener("pointermove", (e) => {
      const r = btn.getBoundingClientRect();
      const x = e.clientX - r.left - r.width / 2;
      const y = e.clientY - r.top - r.height / 2;
      btn.style.transform = `translate(${x * 0.18}px, ${y * 0.3}px)`;
    });
    btn.addEventListener("pointerleave", () => { btn.style.transform = ""; });
  });
}

// ─── Портфолио ──────────────────────────────────────────────
const grid = $("#workGrid");
const filters = $("#filters");
const segPill = $("#segPill");
const showMoreBtn = $("#showMore");
const INITIAL = 6;
let activeCat = "all";
let expanded = false;

const catsOf = (p) => (Array.isArray(p.category) ? p.category : [p.category]);

function coverHTML(p) {
  const inner = {
    dashboard: `<div class="cv-dash"><aside></aside><div class="main"><div class="kpis"><i></i><i></i><i></i></div><div class="chart">${[40, 65, 50, 85, 60, 95, 72].map((h, i) => `<i style="height:${h}%;animation-delay:${i * 0.06}s"></i>`).join("")}</div></div></div>`,
    chat: `<div class="cv-chat"><i></i><i class="me"></i><i class="w2"></i><i class="me w3"></i><i></i></div>`,
    iot: `<div class="cv-iot"><div class="cam"></div><div class="side"><i></i><i></i><i></i><i class="dot"></i></div></div>`,
    landing: `<div class="cv-land"><div class="bar"></div><div class="row"><i></i><i></i><i></i></div></div>`,
    extension: `<div class="cv-ext"><div class="page"><i></i><i></i><i></i><i></i><i></i></div><div class="pop"><i></i><i></i><b></b></div></div>`,
    edu: `<div class="cv-edu"><i></i><i></i><i></i><i></i></div>`
  };
  if (p.cover === "mobile") {
    return `<div class="cover" data-tone="${p.tone}"><div class="cv-mobile"><div class="ph"><i></i><i></i><i></i></div><div class="ph"><i></i><i></i><i></i><i></i></div></div></div>`;
  }
  return `<div class="cover" data-tone="${p.tone}"><div class="cover__win">${inner[p.cover] || inner.landing}</div></div>`;
}

function cardHTML(p, i) {
  return `
    <button class="card" data-id="${p.id}" style="animation-delay:${i * 0.05}s" aria-label="Подробнее о проекте ${p.title}">
      ${coverHTML(p)}
      <span class="card__open"><svg class="i" aria-hidden="true"><use href="#b-arrow-up-right"/></svg></span>
      <div class="card__body">
        <span class="card__kicker">${p.kicker}</span>
        <h3>${p.title}</h3>
        <p>${p.summary}</p>
        <ul class="chips">${p.tags.slice(0, 4).map(t => `<li>${t}</li>`).join("")}</ul>
      </div>
    </button>`;
}

function renderGrid() {
  const list = PROJECTS.filter(p => activeCat === "all" || catsOf(p).includes(activeCat));
  const visible = expanded || activeCat !== "all" ? list : list.slice(0, INITIAL);
  grid.innerHTML = visible.map(cardHTML).join("");
  showMoreBtn.parentElement.hidden = visible.length === list.length;
  $$(".card", grid).forEach(c => {
    c.addEventListener("click", () => openProject(c.dataset.id));
    bindTilt(c, 5);
  });
}

CATEGORIES.forEach(c => {
  const count = c.id === "all" ? PROJECTS.length : PROJECTS.filter(p => catsOf(p).includes(c.id)).length;
  const b = document.createElement("button");
  b.type = "button";
  b.setAttribute("role", "tab");
  b.dataset.cat = c.id;
  b.textContent = c.label;
  b.title = `${count} проектов`;
  b.setAttribute("aria-selected", String(c.id === activeCat));
  filters.appendChild(b);
});

function movePill(btn, instant = false) {
  if (!btn) return;
  if (instant) segPill.style.transition = "none";
  segPill.style.left = `${btn.offsetLeft}px`;
  segPill.style.top = `${btn.offsetTop}px`;
  segPill.style.width = `${btn.offsetWidth}px`;
  segPill.style.height = `${btn.offsetHeight}px`;
  if (instant) { segPill.offsetWidth; segPill.style.transition = ""; }
}

filters.addEventListener("click", (e) => {
  const b = e.target.closest("button[data-cat]");
  if (!b || b.dataset.cat === activeCat) return;
  activeCat = b.dataset.cat;
  $$("button[data-cat]", filters).forEach(x => x.setAttribute("aria-selected", String(x === b)));
  movePill(b);
  renderGrid();
});

showMoreBtn.addEventListener("click", () => { expanded = true; renderGrid(); });

const syncPill = () => movePill($(`button[data-cat="${activeCat}"]`, filters), true);
addEventListener("resize", syncPill);
document.fonts?.ready.then(syncPill);
syncPill();
renderGrid();

// ─── Модальное окно проекта ─────────────────────────────────
const modal = $("#projectModal");
function openProject(id) {
  const p = PROJECTS.find(x => x.id === id);
  if (!p) return;
  $("#modalCover").innerHTML = coverHTML(p);
  $("#modalKicker").textContent = p.kicker;
  $("#modalTitle").textContent = p.title;
  $("#modalDetails").textContent = p.details;
  $("#modalResult").textContent = p.result;
  $("#modalTags").innerHTML = p.tags.map(t => `<li>${t}</li>`).join("");
  const links = [];
  if (p.links.live) links.push(`<a class="btn btn--ink" href="${p.links.live}" target="_blank" rel="noopener"><svg class="i" aria-hidden="true"><use href="#i-globe-simple"/></svg> Открыть сайт</a>`);
  if (p.links.github) links.push(`<a class="btn btn--glass" href="${p.links.github}" target="_blank" rel="noopener"><svg class="i" aria-hidden="true"><use href="#i-github-logo"/></svg> Код на GitHub</a>`);
  links.push(`<a class="btn btn--glass" href="#contact" data-close>Хочу похожий проект <svg class="i" aria-hidden="true"><use href="#b-arrow-right"/></svg></a>`);
  $("#modalLinks").innerHTML = links.join("");
  modal.showModal();
}
$("#modalClose").addEventListener("click", () => modal.close());
modal.addEventListener("click", (e) => {
  if (e.target === modal || e.target.closest("[data-close]")) modal.close();
});

// ─── Демо-чат бота для кафе ─────────────────────────────────
const chat = $("#chat");
const ticket = $("#ticket");
const botStatus = $("#botStatus");
const SCRIPT = [
  { who: "me", text: "Здравствуйте! Можно заказать навынос?" },
  { who: "bot", text: "Конечно! ☕ Вот популярное сегодня:", btns: ["Капучино · 1 600 ₸", "Круассан · 1 000 ₸", "Раф · 1 900 ₸"] },
  { who: "me", text: "2 капучино и круассан" },
  { who: "bot", text: "Итого 4 200 ₸. Заберёте через 10 минут?", btns: ["Да, оплатить", "Изменить"] },
  { who: "me", text: "Да, оплатить" },
  { who: "bot", text: "Оплата прошла ✓ Заказ #248 уже на кухне. Ждём вас!", ticket: true }
];
const wait = (ms) => new Promise(r => setTimeout(r, ms));

function addMsg(m) {
  const el = document.createElement("div");
  el.className = `msg msg--${m.who}`;
  el.textContent = m.text;
  if (m.btns) {
    const b = document.createElement("div");
    b.className = "msg__btns";
    b.innerHTML = m.btns.map(x => `<span>${x}</span>`).join("");
    el.appendChild(b);
  }
  chat.appendChild(el);
  while (chat.children.length > 6) chat.firstElementChild.remove();
}

async function playChat() {
  for (; ;) {
    chat.innerHTML = "";
    ticket.classList.remove("is-on");
    for (const m of SCRIPT) {
      if (m.who === "bot") {
        botStatus.textContent = "печатает…";
        const t = document.createElement("div");
        t.className = "msg msg--bot msg--typing";
        t.innerHTML = "<i></i><i></i><i></i>";
        chat.appendChild(t);
        await wait(1100);
        t.remove();
        botStatus.textContent = "онлайн";
      } else {
        await wait(900);
      }
      addMsg(m);
      if (m.ticket) ticket.classList.add("is-on");
      await wait(m.who === "bot" ? 1400 : 600);
    }
    await wait(5000);
  }
}
if (reduceMotion) SCRIPT.forEach(addMsg), ticket.classList.add("is-on");
else {
  const chatIO = new IntersectionObserver((es) => {
    if (es[0].isIntersecting) { playChat(); chatIO.disconnect(); }
  }, { threshold: 0.3 });
  chatIO.observe(chat);
}

// ─── Интерактивный калькулятор архитектуры ────────────────
const CALC_CONFIG = {
  types: {
    saas: {
      name: "Web & SaaS Платформа",
      basePrice: 380000,
      baseDays: 16,
      formService: "Web & SaaS Платформа",
      stack: ["React", "TypeScript", "FastAPI", "PostgreSQL", "Docker"]
    },
    ai: {
      name: "AI & Automation Suite",
      basePrice: 290000,
      baseDays: 10,
      formService: "AI & Automation Suite",
      stack: ["Python", "OpenAI", "RAG", "Telegram API", "WhatsApp"]
    },
    portal: {
      name: "Digital Foundation",
      basePrice: 200000,
      baseDays: 8,
      formService: "Digital Foundation",
      stack: ["Astro", "React", "TypeScript", "SEO", "Tailwind"]
    },
    edge: {
      name: "Enterprise & Custom SaaS",
      basePrice: 690000,
      baseDays: 24,
      formService: "Enterprise & Custom SaaS",
      stack: ["YOLOv8", "ESP32", "Python", "React", "WebSockets"]
    }
  },
  modules: {
    kaspi: { name: "Kaspi Pay & QR", price: 35000, days: 2, tag: "Kaspi Pay" },
    whatsapp: { name: "WhatsApp Cloud Business", price: 40000, days: 3, tag: "WhatsApp API" },
    rag: { name: "AI База знаний (RAG)", price: 50000, days: 4, tag: "Vector RAG" },
    roles: { name: "Личные кабинеты и роли", price: 45000, days: 4, tag: "RBAC & JWT" },
    care: { name: "Пакет Shuaq Care SLA", price: 29000, days: 0, tag: "SLA 99.9%" }
  }
};

const calcTypesEl = $("#calcTypes");
const calcModulesEl = $("#calcModules");
const calcTotalEl = $("#calcTotal");
const calcTimeEl = $("#calcTime");
const calcStackEl = $("#calcStack");
const applyCalcBtn = $("#applyCalcBtn");

function updateCalculator() {
  if (!calcTypesEl || !calcModulesEl) return;
  const selectedType = $('input[name="calcType"]:checked', calcTypesEl)?.value || "saas";
  const typeData = CALC_CONFIG.types[selectedType] || CALC_CONFIG.types.saas;

  // Update card active classes
  $$(".calc-card", calcTypesEl).forEach((card) => {
    const input = $("input", card);
    card.classList.toggle("is-active", input.checked);
  });

  let totalPrice = typeData.basePrice;
  let totalDays = typeData.baseDays;
  const currentStack = [...typeData.stack];
  const selectedModuleNames = [];

  $$(".calc-mod", calcModulesEl).forEach((mod) => {
    const input = $("input", mod);
    mod.classList.toggle("is-checked", input.checked);
    if (input.checked) {
      const modData = CALC_CONFIG.modules[input.value];
      if (modData) {
        if (!input.dataset.care) {
          totalPrice += modData.price;
        }
        totalDays += modData.days;
        if (!currentStack.includes(modData.tag)) {
          currentStack.push(modData.tag);
        }
        selectedModuleNames.push(modData.name);
      }
    }
  });

  const formattedPrice = totalPrice.toLocaleString("ru-RU") + " ₸";
  const careChecked = $('input[data-care]:checked', calcModulesEl);
  calcTotalEl.textContent = careChecked ? `${formattedPrice} + ${CALC_CONFIG.modules.care.price.toLocaleString("ru-RU")} ₸/мес` : formattedPrice;
  calcTimeEl.textContent = `${totalDays}–${Math.round(totalDays * 1.35)} рабочих дней`;
  calcStackEl.innerHTML = currentStack.slice(0, 5).map((t) => `<li>${t}</li>`).join("");

  const calcToOrderLink = $("#calcToOrderLink");
  if (calcToOrderLink) {
    calcToOrderLink.href = `/order?service=${encodeURIComponent(typeData.formService || selectedType)}`;
  }

  return {
    selectedType,
    typeData,
    totalPrice: formattedPrice,
    totalDays,
    currentStack,
    selectedModuleNames
  };
}

if (calcTypesEl && calcModulesEl) {
  calcTypesEl.addEventListener("change", updateCalculator);
  calcModulesEl.addEventListener("change", updateCalculator);
  updateCalculator();
}

if (applyCalcBtn) {
  applyCalcBtn.addEventListener("click", () => {
    const calcState = updateCalculator();
    if (!calcState) return;

    // 1. Предвыбор радио-кнопки типа услуги в форме
    const serviceRadio = $(`#serviceChoice input[value="${calcState.typeData.formService}"]`);
    if (serviceRadio) serviceRadio.checked = true;

    // 2. Бюджет
    const formBudget = $("#formBudget");
    if (formBudget) {
      if (calcState.totalPrice.includes("200") || calcState.totalPrice.includes("250")) {
        formBudget.value = "До 250 000 ₸";
      } else if (calcState.totalPrice.includes("290") || calcState.totalPrice.includes("380") || calcState.totalPrice.includes("455")) {
        formBudget.value = "250 000 – 500 000 ₸";
      } else if (calcState.totalPrice.includes("690") || calcState.totalPrice.includes("790")) {
        formBudget.value = "500 000 – 1 000 000 ₸";
      } else {
        formBudget.value = "Более 1 000 000 ₸";
      }
    }

    // 3. Подстановка описания и модулей
    const formDesc = $("#formDesc");
    if (formDesc) {
      formDesc.value = `Сконфигурировано в калькуляторе Shuaq:\n• Продукт: ${calcState.typeData.name}\n• Выбранные модули: ${calcState.selectedModuleNames.join(", ") || "Базовый состав"}\n• Ориентир сметы: ${calcState.totalPrice}\n• Срок: ${calcState.totalDays} дней`;
    }

    // 4. Скрытое поле с точной сметой
    const formEstimatedPrice = $("#formEstimatedPrice");
    if (formEstimatedPrice) {
      formEstimatedPrice.value = calcState.totalPrice;
    }

    // 5. Плавный скролл к форме
    const contactSection = $("#contact");
    if (contactSection) {
      contactSection.scrollIntoView({ behavior: "smooth" });
      const orderCard = $(".contact__card");
      if (orderCard) {
        orderCard.style.outline = "3px solid var(--sky-d)";
        setTimeout(() => (orderCard.style.outline = ""), 1600);
      }
    }
  });
}

// ─── Предвыбор услуги по кнопкам «Выбрать» ──────────────────
document.addEventListener("click", (e) => {
  const a = e.target.closest("[data-service]");
  if (!a) return;
  const input = $(`#serviceChoice input[value="${a.dataset.service}"]`);
  if (input) input.checked = true;
});

// ─── WhatsApp ───────────────────────────────────────────────
const wa = $("#waLink");
if (wa) {
  const waPhone = CONFIG.whatsapp || "77071234567";
  const waMsg = encodeURIComponent("Здравствуйте! Хочу обсудить проект со студией Shuaq.");
  wa.href = `https://wa.me/${waPhone}?text=${waMsg}`;
}

// ─── Форма заявки ───────────────────────────────────────────
const form = $("#orderForm");
const submitBtn = $("#submitBtn");
const formError = $("#formError");
const success = $("#formSuccess");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  formError.textContent = "";
  const data = Object.fromEntries(new FormData(form));
  data.name = (data.name || "").trim();
  data.telegram = (data.telegram || "").trim();

  const missing = [];
  [["name", data.name], ["telegram", data.telegram]].forEach(([n, v]) => {
    const el = form.elements[n];
    el.classList.toggle("is-invalid", !v);
    if (!v) missing.push(el);
  });
  if (missing.length) {
    formError.textContent = "Укажите имя и контакт (Telegram / WhatsApp) для связи";
    missing[0].focus();
    return;
  }

  submitBtn.disabled = true;
  $(".btn__text", submitBtn).textContent = "Отправляем…";

  // Сбор выбранных модулей из калькулятора, если они были отмечены
  const selectedModules = [];
  if (calcModulesEl) {
    $$('input[type="checkbox"]:checked', calcModulesEl).forEach((cb) => {
      const m = CALC_CONFIG.modules[cb.value];
      if (m) selectedModules.push(m.name);
    });
  }
  data.selectedModules = selectedModules;

  const brief = `Заявка со студии Shuaq\nИмя: ${data.name}\nКонтакт: ${data.telegram}\nНаправление: ${data.serviceType}\nБюджет: ${data.budget}\nСроки: ${data.deadline}\nРасчёт: ${data.estimatedPrice || "Индивидуальный"}\nЗадача:\n${data.description || "—"}`;
  let orderId = "SHQ-" + Math.floor(1000 + Math.random() * 9000);
  let followLink = `https://t.me/${CONFIG.telegram}?text=${encodeURIComponent(brief)}`;

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
    console.warn("API заявок недоступен, используем прямой диалог Telegram:", err);
  }

  $("#orderId").textContent = orderId;
  $("#tgFollow").href = followLink;
  form.hidden = true;
  success.hidden = false;
});

form.addEventListener("input", (e) => e.target.classList?.remove("is-invalid"));
