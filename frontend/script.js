/* ═══════════════════════════════════════════════════════════════
   SHUAQ · FRONTEND SCRIPT (APPLE & ARC STYLE + ORDER STUDIO)
   ═══════════════════════════════════════════════════════════════ */

// ──── 9 REAL PORTFOLIO PROJECTS ────
const projects = [
  {
    id: "qunar",
    title: "Qunar",
    category: "Full-stack Web & SaaS",
    filters: ["web", "iot"],
    isFlagship: true,
    repo: "https://github.com/Dyman17/Qunar",
    uiClass: "ui-qunar",
    statusPill: { text: "LIVE SAAS", type: "online" },
    text: "Комплексная SaaS-платформа для управления умными фермами, культурами и датчиками: личный кабинет, JWT-авторизация с refresh-токенами, REST API на FastAPI, PostgreSQL, админ-панель и деплой на Render + Vercel.",
    highlight: "Доказывает способность строить масштабируемые web-системы энтерпрайз-уровня с реальной базой данных, пользователями и IoT-интеграцией.",
    tags: ["React", "FastAPI", "PostgreSQL", "JWT Auth", "Admin DB", "Tailwind"],
    viz: {
      metrics: [
        { val: "68%", lbl: "Влажность почвы" },
        { val: "24.5°C", lbl: "Температура" },
        { val: "14 узлов", lbl: "ESP32 датчики" }
      ],
      bar1: { fill: "78%", color: "#27c93f" },
      bar2: { fill: "62%", color: "#27b9fd" }
    }
  },
  {
    id: "archaeoscan",
    title: "ArchaeoScan",
    category: "IoT + AI + Web Platform",
    filters: ["iot", "ai", "web"],
    isFlagship: false,
    repo: "https://github.com/Dyman17/archaeoscan",
    uiClass: "ui-archaeoscan",
    statusPill: { text: "ESP32 STREAM", type: "stream" },
    text: "Инженерная система сбора данных с аппаратных датчиков и AI-аналитики артефактов: связка ESP32 и камеры, real-time WebSocket сервер, React дашборд и документация запуска.",
    highlight: "Уникальное сочетание аппаратного уровня (hardware), нейросетевого анализа и веб-интерфейса реального времени.",
    tags: ["ESP32", "AI Model", "Python", "React", "WebSocket", "Telemetry"],
    viz: {
      metrics: [
        { val: "120 FPS", lbl: "Camera Stream" },
        { val: "4.2 ms", lbl: "WebSocket Ping" },
        { val: "99.1%", lbl: "LiDAR Sync" }
      ],
      bar1: { fill: "88%", color: "#3f71fb" },
      bar2: { fill: "70%", color: "#a075f9" }
    }
  },
  {
    id: "smart-garbage",
    title: "Smart-garbage",
    category: "Computer Vision + ESP32-CAM",
    filters: ["iot", "ai"],
    isFlagship: false,
    repo: "https://github.com/Dyman17/Smart-garbage",
    uiClass: "ui-garbage",
    statusPill: { text: "YOLOv8 ACTIVE", type: "ai" },
    text: "Умная система сортировки отходов с компьютерным зрением: классификация типов мусора (organic, paper, plastic) нейросетью YOLOv8 с передачей управляющих команд на ESP32 через Serial-протокол.",
    highlight: "Решение реальной физической задачи автоматизации через связку камеры, Python ML-сервера и сервоприводов.",
    tags: ["YOLOv8", "ESP32-CAM", "Computer Vision", "Python", "Serial Bridge"],
    viz: {
      metrics: [
        { val: "97.4%", lbl: "Plastic Detect" },
        { val: "15 ms", lbl: "Inference Time" },
        { val: "Active", lbl: "Servo State" }
      ],
      bar1: { fill: "94%", color: "#fdaf65" },
      bar2: { fill: "82%", color: "#fab5c5" }
    }
  },
  {
    id: "damumed",
    title: "Damumed AI Agent",
    category: "Chrome Extension + RPA",
    filters: ["extension", "ai", "web"],
    isFlagship: false,
    repo: "https://github.com/Dyman17/Damumed_ExtentionFD",
    uiClass: "ui-damumed",
    statusPill: { text: "MANIFEST V3", type: "ai" },
    text: "Интеллектуальный Chrome Extension агент для медицинской системы: голосовая диктовка врача, структурирование анамнеза через OpenAI, автоматическое заполнение DOM-форм с контролем подтверждения человека.",
    highlight: "Экономит до 60% времени специалистов на рутинном заполнении электронных карт и веб-форм.",
    tags: ["Manifest V3", "OpenAI Proxy", "RPA", "DOM Automation", "JavaScript"],
    viz: {
      metrics: [
        { val: "4.8x", lbl: "Скорость ввода" },
        { val: "99.2%", lbl: "Точность МКБ" },
        { val: "Safe Gate", lbl: "Human Review" }
      ],
      bar1: { fill: "96%", color: "#d59ae8" },
      bar2: { fill: "75%", color: "#a075f9" }
    }
  },
  {
    id: "west",
    title: "WEST",
    category: "Logistics SaaS Platform",
    filters: ["web"],
    isFlagship: false,
    repo: "https://github.com/Dyman17/WEST",
    uiClass: "ui-west",
    statusPill: { text: "FLEET SaaS", type: "online" },
    text: "Цифровая логистическая платформа с ролевой моделью (грузоотправитель, перевозчик, админ), интерактивной картой портов Мангистау, букингом судов и трекингом доставок в реальном времени.",
    highlight: "Полноценный отраслевой B2B SaaS продукт с гео-интерфейсом Leaflet, балансировкой грузов и транзакционной базой данных.",
    tags: ["React", "Node.js", "Express", "PostgreSQL", "Leaflet Maps", "B2B SaaS"],
    viz: {
      metrics: [
        { val: "142 рейс", lbl: "Морские пути" },
        { val: "3 роли", lbl: "Auth Matrix" },
        { val: "100%", lbl: "Маршрутизация" }
      ],
      bar1: { fill: "85%", color: "#27b9fd" },
      bar2: { fill: "64%", color: "#3f71fb" }
    }
  },
  {
    id: "tumar",
    title: "Tumar AI",
    category: "Real-time Safety Monitoring",
    filters: ["ai", "web"],
    isFlagship: false,
    repo: "https://github.com/Dyman17/Tumar",
    uiClass: "ui-tumar",
    statusPill: { text: "EDGE + CLOUD", type: "ai" },
    text: "Распределенная система промышленной безопасности: локальная обработка видеопотока с камер на Edge-ноутбуке через YOLOv8, облачный FastAPI бэкенд, WebSocket стриминг инцидентов и React дашборд оператора.",
    highlight: "Сложная гибридная архитектура с моментальным оповещением о нарушениях техники безопасности и тепловыми картами рисков.",
    tags: ["YOLOv8", "FastAPI", "WebSocket", "React", "Risk Heatmap", "Edge AI"],
    viz: {
      metrics: [
        { val: "4 камеры", lbl: "Видеопотоки" },
        { val: "0 задержка", lbl: "WebSocket Alert" },
        { val: "98.5%", lbl: "Точность СИЗ" }
      ],
      bar1: { fill: "92%", color: "#ff5f56" },
      bar2: { fill: "76%", color: "#fdaf65" }
    }
  },
  {
    id: "neila",
    title: "Neila Medical Chat",
    category: "AI Chat + CRM Dashboard",
    filters: ["ai", "web"],
    isFlagship: false,
    repo: "https://github.com/Dyman17/neila-medical-chat",
    uiClass: "ui-neila",
    statusPill: { text: "SMART TRIAGE", type: "online" },
    text: "Интеллектуальный медицинский сервис первичного сбора жалоб: адаптивный диалог пациента с AI-ассистентом, извлечение структурированных клинических данных и рабочий стол менеджера/врача.",
    highlight: "Автоматизирует первичную воронку обращений пациентов без потери точности анамнеза.",
    tags: ["OpenAI API", "Flask", "SQLite", "CRM Dashboard", "Data Triage"],
    viz: {
      metrics: [
        { val: "3.2 мин", lbl: "Средний опрос" },
        { val: "24/7", lbl: "Доступность" },
        { val: "100%", lbl: "Структура в БД" }
      ],
      bar1: { fill: "89%", color: "#52cdfd" },
      bar2: { fill: "68%", color: "#a075f9" }
    }
  },
  {
    id: "hydrogenix",
    title: "Hydrogenix",
    category: "E-Commerce Product Website",
    filters: ["web"],
    isFlagship: false,
    repo: "https://github.com/Dyman17/Hydrogenix",
    uiClass: "ui-hydrogenix",
    statusPill: { text: "STOREFRONT", type: "online" },
    text: "Современный коммерческий веб-сайт продукта «экологичный гидрогель»: витрина с 3D-моделями, интерактивный калькулятор расчета расхода для фермеров, корзина и чекаут.",
    highlight: "Отличный пример продающего e-commerce интерфейса с интерактивными калькуляторами и безупречным UI.",
    tags: ["React", "TypeScript", "Vite", "Tailwind", "Cart Checkout", "Calculator"],
    viz: {
      metrics: [
        { val: "150 кг", lbl: "Калькулятор" },
        { val: "0.2s", lbl: "Отклик витрины" },
        { val: "Full Cart", lbl: "Оформление" }
      ],
      bar1: { fill: "95%", color: "#27c93f" },
      bar2: { fill: "72%", color: "#52cdfd" }
    }
  },
  {
    id: "janym-flowers",
    title: "Janym Flowers",
    category: "Local Business Showcase",
    filters: ["web"],
    isFlagship: false,
    repo: "https://github.com/Dyman17/janym_flowers_janaozen",
    uiClass: "ui-janym",
    statusPill: { text: "LOCAL BUSINESS", type: "online" },
    text: "Эстетичный сайт-каталог для цветочного бутика в Жанаозене: элегантная подача авторских букетов, быстрая связь в WhatsApp и оптимизация для мобильного трафика из 2GIS и карт.",
    highlight: "Идеальный инструмент быстрого старта продаж для малого и локального бизнеса.",
    tags: ["Landing Page", "HTML5", "CSS3", "JavaScript", "Mobile First", "WhatsApp Order"],
    viz: {
      metrics: [
        { val: "1.2s", lbl: "Быстрый старт" },
        { val: "100%", lbl: "Mobile Score" },
        { val: "1 клик", lbl: "WhatsApp лид" }
      ],
      bar1: { fill: "91%", color: "#fab5c5" },
      bar2: { fill: "84%", color: "#d59ae8" }
    }
  }
];

// ──── DOM REFERENCES ────
const projectsGrid = document.querySelector("#projectsGrid");
const filterButtons = document.querySelectorAll(".seg-btn");

// Lightbox
const lightboxModal = document.querySelector("#lightboxModal");
const lightboxBackdrop = document.querySelector("#lightboxBackdrop");
const lightboxCloseBtn = document.querySelector("#lightboxCloseBtn");
const lightboxTitle = document.querySelector("#lightboxTitle");
const lightboxCategory = document.querySelector("#lightboxCategory");
const lightboxPreviewArea = document.querySelector("#lightboxPreviewArea");
const lightboxHeading = document.querySelector("#lightboxHeading");
const lightboxDescription = document.querySelector("#lightboxDescription");
const lightboxTags = document.querySelector("#lightboxTags");
const lightboxHighlight = document.querySelector("#lightboxHighlight");
const lightboxGithubLink = document.querySelector("#lightboxGithubLink");
const orderFromLightboxBtn = document.querySelector("#orderFromLightboxBtn");

// Order Modal
const orderModal = document.querySelector("#orderModal");
const orderBackdrop = document.querySelector("#orderBackdrop");
const orderCloseBtn = document.querySelector("#orderCloseBtn");
const openOrderModalBtn = document.querySelector("#openOrderModalBtn");
const heroOrderBtn = document.querySelector("#heroOrderBtn");
const orderForm = document.querySelector("#orderForm");
const submitOrderBtn = document.querySelector("#submitOrderBtn");
const directTgBtn = document.querySelector("#directTgBtn");
const orderSuccessView = document.querySelector("#orderSuccessView");
const successOrderId = document.querySelector("#successOrderId");
const successTgLink = document.querySelector("#successTgLink");
const successDoneBtn = document.querySelector("#successDoneBtn");

const servicePillLabels = document.querySelectorAll("#servicePills .pill-label");

// ──── RENDER PROJECT CARDS ────
function renderProjectCards(activeFilter = "all") {
  projectsGrid.innerHTML = projects
    .map((project) => {
      const isHidden =
        activeFilter !== "all" && !project.filters.includes(activeFilter);

      const tagsHtml = project.tags
        .map((tag) => `<span class="tech-tag">${tag}</span>`)
        .join("");

      return `
        <article class="project-card glass-panel ${isHidden ? "hidden" : ""}" data-id="${project.id}">
          
          <!-- Window Header Bar (macOS Style) -->
          <div class="card-window-bar">
            <div class="traffic-dots">
              <span class="traffic-dot r"></span>
              <span class="traffic-dot y"></span>
              <span class="traffic-dot g"></span>
            </div>
            <span class="card-category-tag">${project.category}</span>
            ${project.isFlagship ? `<span class="card-star-badge">⭐ Флагман</span>` : `<span></span>`}
          </div>

          <!-- Realistic Mockup Screen -->
          <div class="card-screen-wrap" data-id="${project.id}" role="button" tabindex="0" aria-label="Открыть ${project.title} в полном размере">
            <div class="ui-mockup-inner ${project.uiClass}">
              
              <!-- Mock Top Bar -->
              <div class="mock-topbar">
                <span>// ${project.title.toLowerCase()}.sys</span>
                <span class="mock-status-pill ${project.statusPill.type}">● ${project.statusPill.text}</span>
              </div>

              <!-- Mock Central Viz -->
              <div class="mock-center-viz">
                <div class="viz-row">
                  <span style="font-size:0.75rem; font-weight:700; color:#cbd5e1;">Live Telemetry</span>
                  <div class="viz-chart-bar">
                    <div class="viz-fill" style="width:${project.viz.bar1.fill}; background:${project.viz.bar1.color};"></div>
                  </div>
                </div>
                <div class="viz-row">
                  <span style="font-size:0.75rem; font-weight:700; color:#cbd5e1;">Data Flow</span>
                  <div class="viz-chart-bar">
                    <div class="viz-fill" style="width:${project.viz.bar2.fill}; background:${project.viz.bar2.color};"></div>
                  </div>
                </div>
              </div>

              <!-- Mock Metrics Row -->
              <div class="viz-metrics-grid">
                ${project.viz.metrics
                  .map(
                    (m) => `
                  <div class="viz-metric-card">
                    <span class="viz-metric-val">${m.val}</span>
                    <span class="viz-metric-lbl">${m.lbl}</span>
                  </div>
                `
                  )
                  .join("")}
              </div>

            </div>
          </div>

          <!-- Card Content Details -->
          <div class="card-content-body">
            <h3 class="card-title">${project.title}</h3>
            <p class="card-desc">${project.text}</p>
            
            <div class="tags-row">${tagsHtml}</div>

            <!-- Footer Action Links -->
            <div class="card-action-row">
              <button class="btn-card-preview" data-id="${project.id}">
                <span>Скриншот 🔍</span>
              </button>
              <a class="btn-card-github" href="${project.repo}" target="_blank" rel="noreferrer">
                <span>GitHub →</span>
              </a>
            </div>
          </div>

        </article>
      `;
    })
    .join("");

  attachCardEvents();
}

// ──── ATTACH CARD EVENTS & LIGHTBOX ────
function attachCardEvents() {
  document.querySelectorAll(".card-screen-wrap, .btn-card-preview").forEach((el) => {
    el.addEventListener("click", () => {
      const projectId = el.dataset.id;
      openLightbox(projectId);
    });
  });
}

// ──── OPEN LIGHTBOX ────
let currentSelectedProject = null;

function openLightbox(projectId) {
  const project = projects.find((p) => p.id === projectId);
  if (!project) return;
  currentSelectedProject = project;

  lightboxTitle.textContent = `${project.title} — System Preview`;
  lightboxCategory.textContent = project.category;
  lightboxHeading.textContent = project.title;
  lightboxDescription.textContent = project.text;
  lightboxHighlight.textContent = project.highlight;
  lightboxGithubLink.href = project.repo;

  lightboxTags.innerHTML = project.tags
    .map((tag) => `<span class="tech-tag">${tag}</span>`)
    .join("");

  lightboxPreviewArea.innerHTML = `
    <div class="ui-mockup-inner ${project.uiClass}" style="min-height: 280px; border-radius: 16px; padding: 24px;">
      <div class="mock-topbar" style="margin-bottom: 20px;">
        <span style="font-size: 0.9rem; font-weight:700;">// SHUAQ_PROJECT_NODE :: ${project.title.toUpperCase()}</span>
        <span class="mock-status-pill ${project.statusPill.type}" style="padding: 4px 12px; font-size: 0.78rem;">
          ● ${project.statusPill.text}
        </span>
      </div>

      <div style="margin: 20px 0; background: rgba(0,0,0,0.3); border-radius: 12px; padding: 18px; border: 1px solid rgba(255,255,255,0.1);">
        <div style="display:flex; justify-content:space-between; margin-bottom: 12px; font-size: 0.85rem; font-family: var(--font-mono); color: #cbd5e1;">
          <span>Channel 01: Core Architecture</span>
          <span style="color:#27b9fd;">Optimal</span>
        </div>
        <div class="viz-chart-bar" style="height: 10px; margin-bottom: 16px;">
          <div class="viz-fill" style="width:${project.viz.bar1.fill}; background:${project.viz.bar1.color};"></div>
        </div>

        <div style="display:flex; justify-content:space-between; margin-bottom: 12px; font-size: 0.85rem; font-family: var(--font-mono); color: #cbd5e1;">
          <span>Channel 02: Realtime Pipeline</span>
          <span style="color:#fdaf65;">99.8% Sync</span>
        </div>
        <div class="viz-chart-bar" style="height: 10px;">
          <div class="viz-fill" style="width:${project.viz.bar2.fill}; background:${project.viz.bar2.color};"></div>
        </div>
      </div>

      <div class="viz-metrics-grid" style="gap: 12px;">
        ${project.viz.metrics
          .map(
            (m) => `
          <div class="viz-metric-card" style="padding: 12px;">
            <span class="viz-metric-val" style="font-size: 1.15rem; color:#ffffff;">${m.val}</span>
            <span class="viz-metric-lbl" style="font-size: 0.75rem;">${m.lbl}</span>
          </div>
        `
          )
          .join("")}
      </div>
    </div>
  `;

  lightboxModal.classList.add("active");
  lightboxModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeLightbox() {
  lightboxModal.classList.remove("active");
  lightboxModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

lightboxCloseBtn.addEventListener("click", closeLightbox);
lightboxBackdrop.addEventListener("click", closeLightbox);

// Open order modal directly from lightbox
if (orderFromLightboxBtn) {
  orderFromLightboxBtn.addEventListener("click", () => {
    const prefillCategory = currentSelectedProject ? currentSelectedProject.category : "Web & SaaS";
    closeLightbox();
    openOrderModal(prefillCategory);
  });
}

// ──── ORDER MODAL LOGIC ────
function openOrderModal(preferredCategory) {
  // Reset form views
  orderForm.style.display = "block";
  orderSuccessView.style.display = "none";
  submitOrderBtn.disabled = false;
  submitOrderBtn.querySelector(".btn-text").textContent = "Отправить заказ на сайт";

  if (preferredCategory) {
    servicePillLabels.forEach((lbl) => {
      const radio = lbl.querySelector("input");
      if (preferredCategory.includes("Web") && radio.value === "Web & SaaS") {
        radio.checked = true;
        updateActivePill(lbl);
      } else if (preferredCategory.includes("AI") && radio.value === "AI & Automation") {
        radio.checked = true;
        updateActivePill(lbl);
      } else if (preferredCategory.includes("IoT") && radio.value === "IoT & Hardware") {
        radio.checked = true;
        updateActivePill(lbl);
      } else if (preferredCategory.includes("Extension") && radio.value === "Chrome Extension") {
        radio.checked = true;
        updateActivePill(lbl);
      }
    });
  }

  orderModal.classList.add("active");
  orderModal.setAttribute("aria-hidden", "false");
  document.body.style.overflow = "hidden";
}

function closeOrderModal() {
  orderModal.classList.remove("active");
  orderModal.setAttribute("aria-hidden", "true");
  document.body.style.overflow = "";
}

if (openOrderModalBtn) openOrderModalBtn.addEventListener("click", () => openOrderModal());
if (heroOrderBtn) heroOrderBtn.addEventListener("click", () => openOrderModal());
if (orderCloseBtn) orderCloseBtn.addEventListener("click", closeOrderModal);
if (orderBackdrop) orderBackdrop.addEventListener("click", closeOrderModal);
if (successDoneBtn) successDoneBtn.addEventListener("click", closeOrderModal);

// Service pills selection logic
function updateActivePill(selectedLabel) {
  servicePillLabels.forEach((l) => l.classList.remove("active"));
  selectedLabel.classList.add("active");
}

servicePillLabels.forEach((label) => {
  label.addEventListener("click", () => {
    updateActivePill(label);
  });
});

// Direct Telegram Brief Generator
if (directTgBtn) {
  directTgBtn.addEventListener("click", () => {
    const formData = new FormData(orderForm);
    const serviceType = formData.get("serviceType") || "Проект под ключ";
    const description = formData.get("description") || "Хочу обсудить проект";
    const budget = formData.get("budget") || "Договорной";
    const deadline = formData.get("deadline") || "По согласованию";
    const name = formData.get("name") || "Клиент";

    const briefText = `Здравствуйте! Хочу заказать проект в Shuaq:
👤 Имя: ${name}
🎯 Тип: ${serviceType}
💰 Бюджет: ${budget}
⏱ Сроки: ${deadline}
📝 Задача: ${description}`;

    const tgUrl = `https://t.me/dyman_kz?text=${encodeURIComponent(briefText)}`;
    window.open(tgUrl, "_blank");
  });
}

// Order Form Submission to Backend API
if (orderForm) {
  orderForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const btnText = submitOrderBtn.querySelector(".btn-text");
    btnText.textContent = "Регистрация заказа...";
    submitOrderBtn.disabled = true;

    const formData = new FormData(orderForm);
    const orderPayload = {
      name: formData.get("name"),
      telegram: formData.get("telegram"),
      serviceType: formData.get("serviceType"),
      description: formData.get("description"),
      budget: formData.get("budget"),
      deadline: formData.get("deadline")
    };

    try {
      const response = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(orderPayload)
      });

      const result = await response.json();

      if (response.ok && result.success) {
        // Show success state
        successOrderId.textContent = result.order.id;
        if (result.telegramDeepLink) {
          successTgLink.href = result.telegramDeepLink;
        }

        orderForm.style.display = "none";
        orderSuccessView.style.display = "block";
      } else {
        alert(result.error || "Не удалось оформить заказ. Попробуйте снова или напишите в Telegram.");
        btnText.textContent = "Отправить заказ на сайт";
        submitOrderBtn.disabled = false;
      }
    } catch (err) {
      console.warn("Backend API не доступен напрямую, переход на клиентскую отправку:", err);
      // Fallback: If backend is offline, still let client connect via Telegram
      const fallbackId = "SHQ-" + Math.floor(1000 + Math.random() * 9000);
      successOrderId.textContent = fallbackId;
      
      const briefText = `Заявка с сайта Shuaq (${fallbackId}):
Клиент: ${orderPayload.name} (${orderPayload.telegram})
Тип: ${orderPayload.serviceType}
Бюджет: ${orderPayload.budget}
Задача: ${orderPayload.description}`;
      
      successTgLink.href = `https://t.me/dyman_kz?text=${encodeURIComponent(briefText)}`;
      orderForm.style.display = "none";
      orderSuccessView.style.display = "block";
    }
  });
}

// ──── GLOBAL ESCAPE KEY ────
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    if (orderModal.classList.contains("active")) closeOrderModal();
    if (lightboxModal.classList.contains("active")) closeLightbox();
  }
});

// ──── SEGMENTED CONTROL / FLUID SLIDING PILL & BIDIRECTIONAL STRETCH ────
const filterButtonsArr = Array.from(filterButtons);
const segmentedControl = document.querySelector(".segmented-control");
const slidingIndicator = document.querySelector("#segSlidingIndicator");

function updateSlidingIndicator(targetBtn, immediate = false) {
  if (!slidingIndicator || !targetBtn || !segmentedControl) return;

  const controlRect = segmentedControl.getBoundingClientRect();
  const btnRect = targetBtn.getBoundingClientRect();

  const left = btnRect.left - controlRect.left;
  const top = btnRect.top - controlRect.top;
  const width = btnRect.width;
  const height = btnRect.height;

  if (immediate) {
    const prevTransition = slidingIndicator.style.transition;
    slidingIndicator.style.transition = "none";
    slidingIndicator.style.left = `${left}px`;
    slidingIndicator.style.top = `${top}px`;
    slidingIndicator.style.width = `${width}px`;
    slidingIndicator.style.height = `${height}px`;
    slidingIndicator.offsetHeight; // force reflow
    slidingIndicator.style.transition = prevTransition;
  } else {
    slidingIndicator.style.left = `${left}px`;
    slidingIndicator.style.top = `${top}px`;
    slidingIndicator.style.width = `${width}px`;
    slidingIndicator.style.height = `${height}px`;
  }
}

// Initial positioning on the active button
const initialActiveBtn = document.querySelector(".seg-btn.active") || filterButtonsArr[0];
if (initialActiveBtn) {
  updateSlidingIndicator(initialActiveBtn, true);
  window.addEventListener("load", () => updateSlidingIndicator(initialActiveBtn, true));
}

filterButtonsArr.forEach((button, index) => {
  // Click: smooth roll & slide transition
  button.addEventListener("click", () => {
    filterButtonsArr.forEach((btn) => {
      btn.classList.remove("active");
      btn.setAttribute("aria-selected", "false");
    });

    button.classList.add("active");
    button.setAttribute("aria-selected", "true");

    if (slidingIndicator) {
      slidingIndicator.classList.remove("stretch-right", "stretch-left");
      slidingIndicator.classList.add("is-rolling");
      updateSlidingIndicator(button);
      setTimeout(() => {
        slidingIndicator.classList.remove("is-rolling");
      }, 420);
    }

    const filterValue = button.dataset.filter;
    renderProjectCards(filterValue);
  });

  // Hover: stretch right if choice is on the right, stretch left if choice is on the left
  button.addEventListener("mouseenter", () => {
    const activeBtn = document.querySelector(".seg-btn.active");
    if (!activeBtn || !slidingIndicator) return;
    const activeIndex = filterButtonsArr.indexOf(activeBtn);

    slidingIndicator.classList.remove("stretch-right", "stretch-left");

    if (index > activeIndex) {
      slidingIndicator.classList.add("stretch-right");
    } else if (index < activeIndex) {
      slidingIndicator.classList.add("stretch-left");
    }
  });
});

if (segmentedControl) {
  segmentedControl.addEventListener("mouseleave", () => {
    if (slidingIndicator) {
      slidingIndicator.classList.remove("stretch-right", "stretch-left");
    }
  });
}

window.addEventListener("resize", () => {
  const currentActive = document.querySelector(".seg-btn.active");
  if (currentActive) {
    updateSlidingIndicator(currentActive, true);
  }
});

// ──── INITIALIZE ────
renderProjectCards();

// Floating Header Scroll Shadow
window.addEventListener("scroll", () => {
  const header = document.querySelector("#floatingHeader .header-inner");
  if (window.scrollY > 40) {
    header.style.boxShadow = "0 24px 60px -10px rgba(63, 113, 251, 0.28)";
    header.style.background = "rgba(255, 255, 255, 0.88)";
  } else {
    header.style.boxShadow = "";
    header.style.background = "";
  }
});




