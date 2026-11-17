# Portfolio projects for Shuaq

Документ для отбора проектов на лендинг-портфолио агентства Shuaq. Основан на публичных репозиториях GitHub `Dyman17`, структуре файлов и README там, где они доступны локально.

## Как подавать портфолио

Главная идея: не показывать все 42 репозитория подряд. На сайте лучше выделить 5-8 сильных кейсов, а остальные оставить как "дополнительные прототипы".

Оптимальная структура:

1. `Qunar` - главный full-stack web app.
2. `ArchaeoScan` - главный IoT + AI + Web кейс.
3. `Smart-garbage` - сильный hardware / computer vision кейс.
4. `Damumed_ExtentionFD` - Chrome Extension + AI agent + RPA.
5. `WEST` - logistics SaaS / dashboard / role-based web app.
6. `Tumar` - AI safety monitoring / real-time architecture.
7. `Neila Medical Chat` - AI chat + manager dashboard.
8. `Hydrogenix` или `janym_flowers_janaozen` - коммерческий лендинг / e-commerce витрина.

## Основные проекты

### 1. Qunar

- Repo: https://github.com/Dyman17/Qunar
- Категория: Full-stack web application, SaaS/dashboard, agriculture/IoT management.
- Стек: React, TypeScript, Vite, Tailwind, shadcn/ui, FastAPI, SQLAlchemy, PostgreSQL, Alembic, JWT auth, Render, Vercel.
- Что есть в проекте: frontend, backend, admin panel, регистрация/логин, refresh tokens, user profile, farms, plants, sensors, sensor data, admin DB console, API map, production deployment guide.
- Почему показывать: это самый понятный для бизнеса кейс. Он доказывает, что ты умеешь делать не только лендинг, а полноценный сервис с пользователями, базой данных, ролями, API и деплоем.
- Формулировка для лендинга: "Full-stack платформа для управления фермами, растениями и датчиками: личный кабинет, авторизация, API, PostgreSQL, админ-панель и деплой на Render/Vercel."
- Теги: `Full-stack`, `React`, `FastAPI`, `PostgreSQL`, `Auth`, `Admin Panel`, `IoT-ready`.
- Приоритет: обязательно на главную страницу.

### 2. ArchaeoScan

- Repo: https://github.com/Dyman17/archaeoscan
- Связанные repo: https://github.com/Dyman17/archaeoscan_frontend, https://github.com/Dyman17/archaeoscan-websocket-server, https://github.com/Dyman17/archaeoscan-1
- Категория: IoT + AI + Web.
- Стек по структуре repo: Python, FastAPI/Gradio, React/TypeScript frontend, WebSocket server, ESP32 documentation, deployment configs.
- Что есть в проекте: backend, frontend, media handling, camera stream test, ESP32 documentation, deploy instructions for Render/Fly/Hugging Face, websocket/server components.
- Почему показывать: это главное УТП против обычных локальных фрилансеров. Проект связывает железо, AI и веб-интерфейс.
- Формулировка для лендинга: "Система для работы с данными с устройств и AI-аналитикой: ESP32/камера, backend, frontend dashboard, realtime-компоненты и документация по деплою."
- Теги: `IoT`, `ESP32`, `AI`, `Python`, `React`, `WebSocket`, `Dashboard`.
- Приоритет: обязательно на главную страницу.

### 3. Smart-garbage

- Repo: https://github.com/Dyman17/Smart-garbage
- Категория: Computer Vision + ESP32-CAM + automation.
- Стек: Python, YOLOv8, ESP32-CAM, serial communication, local HTML control panel.
- Что есть в проекте: `recycling_server.py`, `laptop_camera_client.py`, `serial_esp32cam_bridge.py`, `manual_control.html`, `esp32cam_router_example.ino`, готовые модели `.pt`, launch scripts.
- Что делает: классифицирует мусор по категориям `organic`, `paper`, `plastic`, читает изображение с ESP32-CAM или камеры ноутбука и отправляет команды обратно через serial.
- Почему показывать: это очень наглядный hardware/AI проект, который легко объяснить клиенту через бытовую задачу.
- Формулировка для лендинга: "Умная мусорка с компьютерным зрением: камера определяет тип отхода, Python/YOLO обрабатывает изображение, а ESP32 получает команду для маршрутизации."
- Теги: `Computer Vision`, `YOLOv8`, `ESP32-CAM`, `Python`, `Serial`, `Automation`.
- Приоритет: высокий, особенно для отдельного hardware-раздела.

### 4. Damumed_ExtentionFD

- Repo: https://github.com/Dyman17/Damumed_ExtentionFD
- Связанный backend: https://github.com/Dyman17/WEB_SERVICE_CASE
- Категория: Chrome Extension + AI Agent + RPA.
- Стек: JavaScript, Chrome Extension Manifest V3, content scripts, service worker, OpenAI proxy, Render backend, mock medical UI.
- Что есть в проекте: extension manifest, background worker, DOM automation, popup UI, overlay, mock pages, scheduler, safety gate, prompt modules, smoke test.
- Что делает: демонстрирует AI-слой поверх медицинской системы: читает DOM, помогает врачу структурировать диктовку, заполняет формы, строит расписание и сохраняет только после подтверждения человека.
- Почему показывать: закрывает направление "браузерные расширения + AI автоматизация", это ценно для бизнеса с внутренними веб-системами.
- Формулировка для лендинга: "Chrome Extension AI-агент для автоматизации рутины в веб-системе: диктовка, структурирование данных, заполнение форм, расписание и human-in-the-loop подтверждение."
- Теги: `Chrome Extension`, `AI Agent`, `RPA`, `OpenAI`, `JavaScript`, `Render`.
- Приоритет: высокий.

### 5. WEST

- Repo: https://github.com/Dyman17/WEST
- Категория: Logistics SaaS / digital twin / role-based dashboard.
- Стек: React, Vite, Node.js, Express, PostgreSQL, OpenAI integration, Leaflet map, Render, Vercel.
- Что есть в проекте: frontend, backend, role-based routing, auth-first flow, shipper/carrier/admin roles, logistics map, freight feed, tracking, port booking, analytics, database schema.
- Что делает: цифровой логистический сервис для Мангистау с ролями грузоотправителя, перевозчика и администратора.
- Почему показывать: хороший кейс для клиентов, которым нужны личные кабинеты, роли, карты, аналитика и бизнес-логика.
- Формулировка для лендинга: "Логистическая web-платформа с ролями, картой, заказами, отслеживанием, бронированием портов и административной аналитикой."
- Теги: `React`, `Node.js`, `Express`, `PostgreSQL`, `Maps`, `Roles`, `Logistics`.
- Приоритет: высокий.

### 6. Tumar

- Repo: https://github.com/Dyman17/Tumar
- Категория: AI monitoring / real-time safety system.
- Стек: Python, YOLOv8, FastAPI/cloud API, WebSocket, React frontend, risk analytics.
- Что есть в проекте: laptop AI client, cloud layer, edge layer, thermal/risk/tracker modules, web dashboard, Render deployment docs, documentation/video/presentation links in README.
- Что делает: распределенная система мониторинга безопасности: камера -> ноутбук с AI -> cloud API -> React frontend.
- Почему показывать: сильный пример сложной архитектуры с real-time данными, AI и разделением edge/cloud/frontend.
- Формулировка для лендинга: "AI-система мониторинга безопасности в реальном времени: обработка на ноутбуке, облачный API, WebSocket и фронтенд для аналитики рисков."
- Теги: `AI`, `YOLOv8`, `WebSocket`, `FastAPI`, `React`, `Real-time`, `Edge/Cloud`.
- Приоритет: высокий, но лучше показывать после Qunar/ArchaeoScan/Smart-garbage.

### 7. Neila Medical Chat

- Repo: https://github.com/Dyman17/neila-medical-chat
- Связанные repo: https://github.com/Dyman17/Neila, https://github.com/Dyman17/Neila_final
- Категория: AI chat + CRM/manager workflow.
- Стек: Python, Flask, OpenAI API, SQLite, Tailwind/vanilla frontend, Render.
- Что есть в проекте: patient chat, manager dashboard, structured data extraction, request approval/rejection flow, adaptive polling, database schema, deployment config.
- Что делает: пациент общается с AI, система собирает медицинские данные, менеджер обрабатывает заявки.
- Почему показывать: понятный бизнес-кейс: чат-бот + CRM-панель + автоматизация обработки заявок.
- Формулировка для лендинга: "AI-чат для первичной регистрации пациентов с извлечением структурированных данных и панелью менеджера для обработки заявок."
- Теги: `AI Chat`, `OpenAI`, `Flask`, `SQLite`, `Manager Dashboard`, `Automation`.
- Приоритет: средне-высокий.

### 8. Hydrogenix

- Repo: https://github.com/Dyman17/Hydrogenix
- Категория: Product website / e-commerce.
- Стек: React, TypeScript, Vite, Tailwind, shadcn/ui, Flask backend, SQL schema.
- Что есть в проекте: product landing, shop, calculator, cart, checkout, profile, language/theme contexts, product assets.
- Что делает: сайт продукта "экологичный гидрогель" с каталогом, калькулятором и e-commerce flow.
- Почему показывать: хороший пример коммерческого сайта с красивой витриной, страницами продукта и корзиной.
- Формулировка для лендинга: "Коммерческий сайт продукта с витриной, магазином, калькулятором, корзиной и оформлением заказа."
- Теги: `React`, `TypeScript`, `E-commerce`, `Product Landing`, `Cart`, `Calculator`.
- Приоритет: средний.

### 9. janym_flowers_janaozen

- Repo: https://github.com/Dyman17/janym_flowers_janaozen
- Категория: Local business landing / flower shop.
- Стек: HTML, CSS, JavaScript.
- Что есть в проекте: landing page, product images, bouquet/rose assets, logo, JS behavior.
- Почему показывать: очень релевантно вашей стратегии поиска клиентов через Google Maps / 2GIS / Яндекс.Карты. Это простой пример сайта для локального бизнеса.
- Формулировка для лендинга: "Лендинг для цветочного магазина с визуальной витриной букетов и адаптированной под локальный бизнес подачей."
- Теги: `Landing`, `Local Business`, `HTML`, `CSS`, `JavaScript`.
- Приоритет: средний, лучше как пример "быстро делаем сайт для малого бизнеса".

## Дополнительные проекты и прототипы

Эти репозитории можно держать в разделе "Еще проекты" или "Прототипы", но не ставить выше основных кейсов без дополнительной документации.

### QUNAR_SENSORS

- Repo: https://github.com/Dyman17/QUNAR_SENSORS
- Категория: sensor/backend prototype.
- Стек по структуре: Python, Flask/FastAPI-style app, templates/static, Render config.
- Роль в портфолио: можно связать с Qunar как отдельный sensor/backend модуль, но лучше сначала добавить README и скриншоты.

### BioPlastic_ARAILYM_AKTILEK

- Repo: https://github.com/Dyman17/BioPlastic_ARAILYM_AKTILEK
- Категория: AI inference / product prototype.
- Стек по структуре: Python, Docker, inference script, model weights.
- Роль в портфолио: можно показать как AI/inference прототип, если есть объяснение задачи и результат.

### Asteroid / asteroidd / Asteroidd_server / Asteroid_Back

- Repos: https://github.com/Dyman17/Asteroid, https://github.com/Dyman17/asteroidd, https://github.com/Dyman17/Asteroidd_server, https://github.com/Dyman17/Asteroid_Back
- Категория: AI / cloud / ESP32-CAM prototype.
- По структуре `asteroidd` содержит `ai_local`, `cloud_backend`, `esp32_cam_app`, `esp32_servo_app`.
- Роль в портфолио: потенциально сильный hardware/AI кейс, но нужно вручную дописать, что именно он делает.

### AQTOBE-AQTOBE-RODNOI

- Repo: https://github.com/Dyman17/AQTOBE-AQTOBE-RODNOI
- Категория: full-stack / civic or local project prototype.
- Стек по структуре: TypeScript, frontend, backend, demo runbook, package scripts.
- Роль в портфолио: можно добавить после проверки README/демо и понятного описания продукта.

### Aero / aeroSpace / dronectrl

- Repos: https://github.com/Dyman17/Aero, https://github.com/Dyman17/aeroSpace, https://github.com/Dyman17/dronectrl
- Категория: drone / aerospace / embedded prototypes.
- По структуре есть `.ino`, backend/server files, ESP32 setup docs.
- Роль в портфолио: хороший материал для отдельного hardware-раздела, но лучше не смешивать с коммерческими web-кейсами на первой странице.

### INF_SCRIPT

- Repo: https://github.com/Dyman17/INF_SCRIPT
- Категория: automation scripts / data pipeline.
- Стек: Python scripts, Supabase-related naming, normalization scripts.
- Роль в портфолио: можно показать как "скрипты автоматизации и обработки данных", но не как отдельный большой кейс.

### WEB_SERVICE_CASE

- Repo: https://github.com/Dyman17/WEB_SERVICE_CASE
- Категория: small proxy/backend service.
- Стек по структуре: Node.js, Render config.
- Роль в портфолио: лучше упоминать как backend/proxy часть для Damumed Extension, а не отдельным проектом.

## Что не стоит ставить в основное портфолио

Эти репозитории лучше не показывать клиенту первыми, пока не будет описания, скриншотов и понятного результата:

- `xo`
- `s7`
- `decentraton`
- `rknp`
- `rknp_final`
- `rknp_sayat`
- `codeflow-test`
- `dombyra`
- `guitar`
- `anti-fraud-system`
- `BatyrBol`

Причина: по публичным метаданным и структуре они выглядят как маленькие прототипы, учебные задачи или черновики. Их можно оставить в GitHub, но на продающем лендинге они будут слабее, чем Qunar, ArchaeoScan, Smart-garbage, Damumed, WEST, Tumar и Neila.

## Готовый порядок секции "Проекты" для лендинга

1. `Qunar` - полноценное web-приложение с backend, auth, DB, admin.
2. `ArchaeoScan` - IoT + AI + Web, главное техническое УТП.
3. `Smart-garbage` - computer vision + ESP32-CAM.
4. `Damumed AI Doc Agent` - Chrome Extension + AI automation.
5. `WEST` - logistics platform with roles, map, tracking.
6. `Tumar AI` - real-time AI safety monitoring.
7. `Neila Medical Chat` - AI chat + manager dashboard.
8. `Hydrogenix` - product/e-commerce website.
9. `Janym Flowers` - local business landing.

## Блок компетенций для сайта

### Full-stack web

- Лендинги и сайты для локального бизнеса.
- Личные кабинеты, CRM-панели, dashboards.
- Авторизация, роли, профили пользователей.
- Backend API, базы данных, админ-панели.
- Деплой на Vercel / Render.

### AI and automation

- AI-чаты и ассистенты.
- Извлечение структурированных данных из текста.
- Computer vision и YOLO.
- AI agents для веб-интерфейсов.
- Скрипты автоматизации и обработки данных.

### IoT and hardware

- ESP32 / Arduino / ESP32-CAM.
- Датчики, камеры, serial-связь.
- Связка устройства с backend и dashboard.
- Локальная обработка на ноутбуке + облачный API.
- Документация подключения и запуска.

### Browser extensions

- Chrome Extension Manifest V3.
- Content scripts и DOM automation.
- Popup/overlay interfaces.
- Интеграция с AI proxy/backend.
- Автоматизация внутренних веб-систем.

## Что нужно собрать дополнительно

- 3-5 скриншотов для каждого основного проекта.
- Live demo ссылки, если проект развернут.
- Короткое видео для hardware/AI проектов: `Smart-garbage`, `ArchaeoScan`, `Tumar`, `dronectrl`.
- Для каждого проекта: задача, что сделал, стек, результат.
- Контакты менеджера: Telegram, email, город/регион.


## Добавлено в портфолио сайта (ноябрь 2026)

Проекты с рабочего стола, которые теперь показываются на лендинге. Данные карточек живут в `frontend/projects.js` — чтобы добавить или изменить кейс, правьте этот файл.

- **Күй анасы** — цифровая энциклопедия кюев: React/Vite + Express/PostgreSQL, редактируемая админ-панель. Live: https://kui-anasy.vercel.app
- **Aident** — двуязычный (RU/KZ) сайт стоматологии в Актау на Astro: посадочные страницы услуг, оптимизация фото, ~7 КБ JS.
- **Qamqor** — умный ошейник для скота: прошивка ESP, API на Render, приложение Expo / React Native.
- **Qorgan Jol** — обнаружение скота на дороге: ESP32-CAM → FastAPI + YOLOv8 → WebSocket-панель.
- **Danyshpan** — платформа подготовки к НИШ: тесты по 6 предметам, автопроверка, статистика.
- **HerbiBioS** — сайт агро-продукта с калькулятором и мультиязычностью. Live: https://herbibios.vercel.app
- **AgentHub** — Electron-приложение, объединяющее AI-агентов для разработки в одном чате.
- **Lead Bot** — Telegram-бот заявок самого сайта Shuaq (`backend/`).

Для каждой карточки сейчас используется нарисованная CSS-обложка. Когда появятся реальные скриншоты — добавьте поле `image` и замените обложку.
