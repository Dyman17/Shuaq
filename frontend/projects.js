// ─────────────────────────────────────────────────────────────
//  Shuaq · портфолио
//  Единый источник данных по проектам студии. Чтобы добавить кейс,
//  допишите объект в массив — карточка и модальное окно соберутся сами.
//
//  category: web | bots | ai | iot
//  cover:    dashboard | chat | iot | landing | mobile | extension | edu
//  tone:     sky | lav | peach | mint | sun | rose
// ─────────────────────────────────────────────────────────────

export const PROJECTS = [
  {
    id: "qunar",
    title: "Qunar",
    category: "web",
    cover: "dashboard",
    tone: "mint",
    kicker: "SaaS-платформа · Агро",
    summary:
      "Платформа для управления фермами, растениями и датчиками: личный кабинет, авторизация, API и админ-панель.",
    details:
      "Полноценный web-сервис: регистрация и вход по JWT с refresh-токенами, профиль пользователя, фермы, культуры, датчики и история показаний. Отдельная админ-панель с консолью БД и картой API. Frontend на Vercel, backend на Render.",
    result: "Сервис с ролями, базой данных и продакшн-деплоем — полный цикл от UI до сервера.",
    tags: ["React", "TypeScript", "FastAPI", "PostgreSQL", "JWT", "Admin"],
    links: { github: "https://github.com/Dyman17/Qunar" },
    featured: true
  },
  {
    id: "kui-anasy",
    title: "Күй анасы",
    category: "web",
    cover: "edu",
    tone: "sun",
    kicker: "Цифровая энциклопедия · CMS",
    summary:
      "Цифровая энциклопедия казахских кюев с редактируемыми разделами и собственной админ-панелью.",
    details:
      "React/Vite сайт на Vercel и Express + PostgreSQL API на Render. Все разделы и контент-блоки редактируются из админ-панели и хранятся в базе — заказчик обновляет сайт сам, без программиста.",
    result: "Живой сайт с CMS, который заказчик наполняет самостоятельно.",
    tags: ["React", "Vite", "Express", "PostgreSQL", "CMS"],
    links: { live: "https://kui-anasy.vercel.app" },
    featured: true
  },
  {
    id: "aident",
    title: "Aident",
    category: "web",
    cover: "landing",
    tone: "sky",
    kicker: "Сайт клиники · Актау",
    summary:
      "Двуязычный сайт цифровой стоматологии: главная, посадочные страницы услуг, KZ / RU версии.",
    details:
      "Статический сайт на Astro: 5 посадочных страниц услуг на русском и казахском, оптимизация фото (avif/webp, srcset), sitemap, всего ~7 КБ JS на странице. Быстрый, SEO-дружественный и удобный с телефона.",
    result: "Молниеносный сайт для локального бизнеса, готовый к рекламе и SEO.",
    tags: ["Astro", "TypeScript", "SEO", "i18n", "Performance"],
    links: {},
    featured: true
  },
  {
    id: "archaeoscan",
    title: "ArchaeoScan",
    category: "iot",
    cover: "iot",
    tone: "peach",
    kicker: "IoT + AI + Web",
    summary:
      "Система сбора данных с ESP32-камеры с AI-аналитикой, realtime-дашбордом и WebSocket-сервером.",
    details:
      "Связка железа, искусственного интеллекта и веб-интерфейса: ESP32 и камера передают данные на Python-бэкенд, AI обрабатывает медиа, а React-дашборд показывает всё в реальном времени через отдельный WebSocket-сервер.",
    result: "Устройство, сервер и интерфейс в одной системе — то, чего не делают обычные веб-студии.",
    tags: ["ESP32", "Python", "AI", "React", "WebSocket"],
    links: { github: "https://github.com/Dyman17/archaeoscan" },
    featured: true
  },
  {
    id: "damumed",
    title: "Damumed AI Agent",
    category: "ai",
    cover: "extension",
    tone: "lav",
    kicker: "Chrome Extension · RPA",
    summary:
      "AI-агент в браузере, который снимает рутину с врачей: диктовка, заполнение форм, расписание.",
    details:
      "Расширение Chrome (Manifest V3) читает интерфейс медицинской системы, структурирует надиктованный текст через AI, заполняет формы и строит расписание. Сохраняет данные только после подтверждения человеком — безопасный human-in-the-loop.",
    result: "Автоматизация внутренней веб-системы без доступа к её коду.",
    tags: ["Chrome Extension", "AI Agent", "OpenAI", "RPA", "Node.js"],
    links: { github: "https://github.com/Dyman17/Damumed_ExtentionFD" }
  },
  {
    id: "neila",
    title: "Neila Medical Chat",
    category: ["bots", "ai"],
    cover: "chat",
    tone: "rose",
    kicker: "AI-чат + CRM",
    summary:
      "AI-ассистент для первичной записи пациентов с панелью менеджера для обработки заявок.",
    details:
      "Пациент общается с AI, бот вытаскивает из диалога структурированные данные и создаёт заявку. Менеджер видит заявки в панели, одобряет или отклоняет их. Тот же принцип мы используем в ботах для кафе, салонов и клиник.",
    result: "Бот принимает обращения 24/7, менеджер работает только с готовыми заявками.",
    tags: ["AI Chat", "OpenAI", "Flask", "SQLite", "CRM"],
    links: { github: "https://github.com/Dyman17/neila-medical-chat" }
  },
  {
    id: "shuaq-leads",
    title: "Lead Bot",
    category: "bots",
    cover: "chat",
    tone: "sky",
    kicker: "Telegram-бот для заявок",
    summary:
      "Заявки с сайта мгновенно приходят менеджеру в Telegram: код заказа, бюджет, сроки и ссылка на диалог.",
    details:
      "Node.js + Express API принимает заявку, сохраняет её в базу и отправляет в Telegram через Bot API отформатированное сообщение. Клиент получает ссылку, чтобы продолжить диалог с менеджером. Этот бот работает прямо на этом сайте.",
    result: "Ни одна заявка не теряется — менеджер отвечает за минуты.",
    tags: ["Telegram Bot API", "Node.js", "Express", "Webhooks"],
    links: {}
  },
  {
    id: "west",
    title: "WEST Logistics",
    category: "web",
    cover: "dashboard",
    tone: "sky",
    kicker: "Логистическая платформа",
    summary:
      "Web-платформа для грузоперевозок Мангистау: роли, карта, заказы, трекинг и бронирование портов.",
    details:
      "Три роли — грузоотправитель, перевозчик и администратор. Лента заказов, карта на Leaflet, отслеживание, бронирование слотов в порту, аналитика и AI-помощник. Node.js + Express + PostgreSQL.",
    result: "Сложная бизнес-логика с ролями и картами в понятном интерфейсе.",
    tags: ["React", "Node.js", "PostgreSQL", "Maps", "Roles"],
    links: { github: "https://github.com/Dyman17/WEST" }
  },
  {
    id: "qamqor",
    title: "Qamqor",
    category: "iot",
    cover: "mobile",
    tone: "mint",
    kicker: "Мобильное приложение + IoT",
    summary:
      "Умный ошейник для скота, сервер и мобильное приложение фермера для виртуального выпаса.",
    details:
      "Комплексный продукт: прошивка ESP для ошейника, API-сервер на Render и приложение на Expo / React Native для телефонов и планшетов — вход, выбор фермы, данные по животным в реальном времени.",
    result: "Железо, сервер и мобильное приложение от одной команды.",
    tags: ["React Native", "Expo", "ESP32", "API", "TypeScript"],
    links: {}
  },
  {
    id: "smart-garbage",
    title: "Smart Waste Station",
    category: "iot",
    cover: "iot",
    tone: "mint",
    kicker: "Computer Vision · ESP32-CAM",
    summary:
      "Умная урна: камера определяет тип отхода, YOLOv8 классифицирует, ESP32 сортирует сервоприводами.",
    details:
      "ESP32-CAM снимает объект и отправляет кадр в облачный FastAPI на Hugging Face. YOLOv8 определяет органику, бумагу или пластик, а контроллер поворачивает заслонку. Веб-панель управления — на Vercel.",
    result: "Наглядный AI + hardware продукт, работающий автономно по Wi-Fi.",
    tags: ["YOLOv8", "ESP32-CAM", "FastAPI", "Python", "Vercel"],
    links: { github: "https://github.com/Dyman17/Smart-garbage" }
  },
  {
    id: "qorgan-jol",
    title: "Qorgan Jol",
    category: "ai",
    cover: "iot",
    tone: "sun",
    kicker: "AI-безопасность на дорогах",
    summary:
      "Обнаружение скота на дороге: камера, YOLOv8, предупреждение водителю и живая веб-панель.",
    details:
      "ESP32-CAM отправляет кадры 2 раза в секунду, YOLOv8 ищет животных и определяет уровень опасности по заданной области дороги. Браузер получает видео, рамки детекции и журнал событий через WebSocket.",
    result: "Realtime-система компьютерного зрения от камеры до дашборда.",
    tags: ["YOLOv8", "FastAPI", "WebSocket", "ESP32-CAM"],
    links: {}
  },
  {
    id: "tumar",
    title: "Tumar AI",
    category: "ai",
    cover: "dashboard",
    tone: "peach",
    kicker: "Мониторинг безопасности",
    summary:
      "Распределённая AI-система мониторинга: edge-обработка видео, облачный API и React-дашборд рисков.",
    details:
      "Камера → ноутбук с YOLOv8 → облачный API → WebSocket → дашборд оператора с тепловой картой рисков. Архитектура edge / cloud / frontend выдерживает поток видео в реальном времени.",
    result: "Сложная архитектура реального времени, разложенная на понятные модули.",
    tags: ["YOLOv8", "FastAPI", "WebSocket", "React", "Edge AI"],
    links: { github: "https://github.com/Dyman17/Tumar" }
  },
  {
    id: "danyshpan",
    title: "Danyshpan",
    category: "web",
    cover: "edu",
    tone: "lav",
    kicker: "EdTech-платформа",
    summary:
      "Платформа подготовки к НИШ: тесты по 6 предметам, автопроверка, разбор ошибок и статистика.",
    details:
      "Бесплатные тренировочные тесты, таймер, мгновенная проверка и объяснение каждой ошибки, статистика прогресса по предметам. Отдельный backend и база вопросов.",
    result: "Образовательный продукт с личной статистикой ученика.",
    tags: ["Full-stack", "EdTech", "Tests", "Analytics"],
    links: {}
  },
  {
    id: "herbibios",
    title: "HerbiBioS",
    category: "web",
    cover: "landing",
    tone: "mint",
    kicker: "Сайт продукта · Агро",
    summary:
      "Сайт эко-продукта для фермеров: калькулятор расхода, мультиязычность, админка и юр. страницы.",
    details:
      "Продуктовый сайт на трёх языках с калькулятором дозировки, админ-панелью и документацией. Отдельный AI-сервис на Hugging Face.",
    result: "Продающий сайт научного продукта, понятный фермеру.",
    tags: ["HTML", "JavaScript", "i18n", "Calculator"],
    links: { live: "https://herbibios.vercel.app" }
  },
  {
    id: "hydrogenix",
    title: "Hydrogenix",
    category: "web",
    cover: "landing",
    tone: "sky",
    kicker: "E-commerce",
    summary:
      "Коммерческий сайт продукта: витрина, магазин, калькулятор, корзина и оформление заказа.",
    details:
      "React + TypeScript + Tailwind: продуктовый лендинг, каталог, калькулятор, корзина, checkout, профиль, переключение языка и темы. Backend на Flask.",
    result: "Интернет-магазин с полным путём покупателя.",
    tags: ["React", "TypeScript", "E-commerce", "Flask"],
    links: { github: "https://github.com/Dyman17/Hydrogenix" }
  },
  {
    id: "janym",
    title: "Janym Flowers",
    category: "web",
    cover: "landing",
    tone: "rose",
    kicker: "Лендинг для магазина",
    summary:
      "Лендинг цветочного магазина в Жанаозене с витриной букетов и быстрой связью.",
    details:
      "Лёгкий лендинг для локального бизнеса: каталог букетов, фото, контакты и кнопки связи. Пример того, как быстро мы запускаем сайт для малого бизнеса.",
    result: "Сайт для локального бизнеса за несколько дней.",
    tags: ["Landing", "HTML", "CSS", "JavaScript"],
    links: { github: "https://github.com/Dyman17/janym_flowers_janaozen" }
  },
  {
    id: "agenthub",
    title: "AgentHub",
    category: "ai",
    cover: "chat",
    tone: "lav",
    kicker: "Десктоп-приложение",
    summary:
      "Windows-приложение, объединяющее несколько AI-агентов для разработки в одном чате.",
    details:
      "Electron-приложение с провайдерами для разных AI-агентов: стриминг ответов, продолжение сессий, выбор модели и режима на каждый чат. Модульная архитектура — новый агент подключается одним файлом.",
    result: "Внутренний инструмент, который ускоряет нашу собственную разработку.",
    tags: ["Electron", "Node.js", "AI", "Streaming"],
    links: {}
  }
];

export const CATEGORIES = [
  { id: "all", label: "Все системы" },
  { id: "web", label: "Web & SaaS" },
  { id: "ai", label: "AI & Автоматизация" },
  { id: "iot", label: "IoT & Hardware" },
  { id: "bots", label: "Экосистемы TG/WA" }
];
