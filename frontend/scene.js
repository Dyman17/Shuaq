// ════════════════════════════════════════════════════════════
//  Shuaq · 3D hero scene
//  «Пластилиновые» пастельные объекты: облако, солнце, телефон-бот,
//  WhatsApp-пузырь, сервер, окно браузера и чашка кофе.
//  Наведение — объект подпрыгивает и показывает подпись,
//  клик — плавный переход к нужному разделу, drag — вращение.
// ════════════════════════════════════════════════════════════
import * as THREE from "three";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const canvas = document.getElementById("scene");
const wrap = document.getElementById("heroVisual");
const label = document.getElementById("sceneLabel");
const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;

let renderer;
try {
  renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "high-performance" });
} catch (e) {
  wrap.classList.add("no-webgl");
  throw e;
}
renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
renderer.outputColorSpace = THREE.SRGBColorSpace;
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1.08;

const scene = new THREE.Scene();
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(renderer), 0.04).texture;

const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 100);
camera.position.set(0, 0, 13.8);

// ─── Свет: тёплое солнце + прохладная лавандовая заливка ────
scene.add(new THREE.HemisphereLight(0xffffff, 0xdcd6ff, 1.1));
const key = new THREE.DirectionalLight(0xfff0dc, 2.0);
key.position.set(5, 8, 7);
scene.add(key);
const fill = new THREE.DirectionalLight(0xc9d8ff, 0.9);
fill.position.set(-7, -2, 4);
scene.add(fill);

// ─── Материалы ──────────────────────────────────────────────
const clay = (color, o = {}) => new THREE.MeshPhysicalMaterial({
  color, roughness: 0.42, metalness: 0, clearcoat: 0.7, clearcoatRoughness: 0.3,
  sheen: 0.6, sheenColor: new THREE.Color(0xffffff), sheenRoughness: 0.6, envMapIntensity: 0.7, ...o
});
const M = {
  cloud: clay(0xffffff, { roughness: 0.75, clearcoat: 0.2, sheen: 1, sheenColor: new THREE.Color(0xe6ecff) }),
  sun: clay(0xffc65a, { emissive: 0xff9a3d, emissiveIntensity: 0.32, roughness: 0.3 }),
  halo: clay(0xffe7a6, { transparent: true, opacity: 0.85 }),
  lav: clay(0xb7aaff),
  lavDeep: clay(0x8f7dff),
  white: clay(0xffffff, { roughness: 0.35 }),
  sky: clay(0x9cc0ff),
  skySoft: clay(0xd7e6ff),
  mint: clay(0x86e3bd),
  mintDeep: clay(0x3fc496),
  peach: clay(0xffb796),
  sunSoft: clay(0xffe08a),
  rose: clay(0xffb3cf),
  cream: clay(0xfff6ea, { roughness: 0.3 }),
  coffee: clay(0x9a6142, { roughness: 0.2, clearcoat: 1 }),
  steam: new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.55, roughness: 1 }),
  led: new THREE.MeshBasicMaterial({ color: 0x3fc496 })
};

const rbox = (w, h, d, r = 0.12, seg = 5) => new RoundedBoxGeometry(w, h, d, seg, r);
const mesh = (geo, mat, x = 0, y = 0, z = 0) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); return m; };
const sphereGeo = new THREE.SphereGeometry(1, 48, 32);

// ─── Корневая группа ────────────────────────────────────────
const root = new THREE.Group();
scene.add(root);
const items = [];

function addItem(group, { label: text, target, pos, rot = [0, 0, 0], amp = 0.18, speed = 1, delay = 0, scale = 1 }) {
  group.position.set(...pos);
  group.rotation.set(...rot);
  group.userData = {
    label: text, target, base: new THREE.Vector3(...pos), baseRot: new THREE.Euler(...rot),
    amp, speed, phase: Math.random() * Math.PI * 2, delay, baseScale: scale,
    hover: 0, appear: reduceMotion ? 1 : 0, bounce: 0
  };
  group.scale.setScalar(reduceMotion ? scale : 0.0001);
  root.add(group);
  items.push(group);
  return group;
}

// 1. Облако — сердце бренда
{
  const g = new THREE.Group();
  const puffs = [
    [0, 0.15, 0, 1.25], [1.15, -0.1, 0.1, 1.0], [-1.15, -0.15, 0.05, 0.98], [0.5, 0.85, -0.15, 0.95],
    [-0.55, 0.7, 0, 0.88], [2.0, -0.4, -0.05, 0.72], [-2.0, -0.45, -0.05, 0.7], [0, -0.45, 0.35, 0.95]
  ];
  puffs.forEach(([x, y, z, r]) => {
    const m = mesh(sphereGeo, M.cloud, x, y, z);
    m.scale.set(r, r * 0.92, r * 0.9);
    g.add(m);
  });
  const base = mesh(sphereGeo, M.cloud, 0, -0.55, 0);
  base.scale.set(2.6, 0.6, 1.05);
  g.add(base);
  addItem(g, { label: "Облачные решения под ключ", target: "#contact", pos: [0, -0.4, 0], amp: 0.12, speed: 0.7, delay: 0, scale: 1 });
}

// 2. Солнце (Шуақ — «солнечный свет»)
{
  const g = new THREE.Group();
  const s = mesh(sphereGeo, M.sun);
  g.add(s);
  const ring = mesh(new THREE.TorusGeometry(1.55, 0.07, 20, 96), M.halo);
  ring.rotation.set(1.2, 0.3, 0);
  ring.name = "ring";
  g.add(ring);
  const ring2 = mesh(new THREE.TorusGeometry(1.9, 0.035, 16, 96), M.halo);
  ring2.rotation.set(1.4, -0.4, 0.2);
  ring2.name = "ring2";
  g.add(ring2);
  addItem(g, { label: "Шуақ — «солнечный свет» по-казахски", target: "#top", pos: [1.9, 2.55, -2.4], amp: 0.1, speed: 0.5, delay: 0.1, scale: 1 });
}

// 3. Телефон с Telegram-ботом
{
  const g = new THREE.Group();
  g.add(mesh(rbox(1.35, 2.6, 0.22, 0.2), M.lav));
  g.add(mesh(rbox(1.14, 2.32, 0.06, 0.12), M.white, 0, 0, 0.1));
  g.add(mesh(rbox(0.36, 0.08, 0.04, 0.03), M.lavDeep, 0, 1.05, 0.14));
  const bubbles = [
    [-0.15, 0.62, 0.66, 0.26, M.skySoft], [0.18, 0.25, 0.6, 0.24, M.sky],
    [-0.12, -0.13, 0.7, 0.3, M.skySoft], [0.2, -0.52, 0.52, 0.24, M.sky]
  ];
  bubbles.forEach(([x, y, w, h, m]) => g.add(mesh(rbox(w, h, 0.06, 0.1, 3), m, x, y, 0.15)));
  const btn = mesh(rbox(0.86, 0.2, 0.07, 0.09, 3), M.lavDeep, 0, -0.88, 0.15);
  g.add(btn);
  addItem(g, { label: "Telegram-боты", target: "#services", pos: [-2.55, 1.55, 1.0], rot: [0.08, 0.42, -0.1], amp: 0.22, speed: 0.9, delay: 0.25 });
}

// 4. WhatsApp-пузырь
{
  const g = new THREE.Group();
  g.add(mesh(rbox(1.35, 0.9, 0.34, 0.3), M.mint));
  const tail = mesh(new THREE.ConeGeometry(0.2, 0.42, 24), M.mint, -0.42, -0.5, 0);
  tail.rotation.z = -0.5;
  g.add(tail);
  for (let i = 0; i < 3; i++) {
    const d = mesh(sphereGeo, M.white, -0.32 + i * 0.32, 0, 0.2);
    d.scale.setScalar(0.1);
    d.name = "dot" + i;
    g.add(d);
  }
  addItem(g, { label: "WhatsApp-боты", target: "#services", pos: [-0.85, 2.95, 1.6], rot: [0, 0.2, 0.08], amp: 0.2, speed: 1.2, delay: 0.4, scale: 0.9 });
}

// 5. Сервер
{
  const g = new THREE.Group();
  for (let i = 0; i < 3; i++) {
    const y = (i - 1) * 0.56;
    g.add(mesh(rbox(1.7, 0.46, 1.05, 0.14), i === 1 ? M.mint : M.white, 0, y, 0));
    for (let k = 0; k < 2; k++) {
      const led = mesh(sphereGeo, M.led.clone(), 0.48 + k * 0.22, y, 0.54);
      led.scale.setScalar(0.06);
      led.name = "led";
      led.userData.phase = i * 0.7 + k * 0.4;
      g.add(led);
    }
    g.add(mesh(rbox(0.6, 0.08, 0.04, 0.03, 2), M.skySoft, -0.38, y, 0.53));
  }
  addItem(g, { label: "Серверы и backend", target: "#services", pos: [2.35, -2.45, 0.7], rot: [0.25, -0.5, 0], amp: 0.15, speed: 0.8, delay: 0.55, scale: 0.95 });
}

// 6. Окно браузера (сайты)
{
  const g = new THREE.Group();
  g.add(mesh(rbox(2.5, 1.7, 0.16, 0.16), M.white));
  g.add(mesh(rbox(2.5, 0.3, 0.18, 0.14, 3), M.skySoft, 0, 0.7, 0.01));
  [M.peach, M.sunSoft, M.mint].forEach((m, i) => {
    const d = mesh(sphereGeo, m, -1.02 + i * 0.2, 0.7, 0.11);
    d.scale.setScalar(0.065);
    g.add(d);
  });
  g.add(mesh(rbox(2.2, 0.62, 0.06, 0.08, 3), M.sky, 0, 0.12, 0.09));
  g.add(mesh(rbox(0.9, 0.1, 0.03, 0.04, 2), M.white, -0.5, 0.22, 0.13));
  g.add(mesh(rbox(0.6, 0.14, 0.04, 0.06, 2), M.peach, -0.64, 0.0, 0.13));
  [M.lav, M.peach, M.mint].forEach((m, i) => g.add(mesh(rbox(0.66, 0.4, 0.06, 0.07, 3), m, -0.74 + i * 0.74, -0.5, 0.09)));
  addItem(g, { label: "Сайты и лендинги", target: "#work", pos: [-2.15, -2.35, 1.1], rot: [-0.08, 0.38, 0.06], amp: 0.16, speed: 0.75, delay: 0.7, scale: 0.92 });
}

// 7. Чашка кофе (автоматизация HoReCa)
{
  const g = new THREE.Group();
  const profile = [
    [0, -0.5], [0.42, -0.5], [0.5, -0.42], [0.58, 0.3], [0.6, 0.45], [0.54, 0.45], [0.5, 0.32], [0.44, -0.38], [0, -0.38]
  ].map(([x, y]) => new THREE.Vector2(x, y));
  g.add(mesh(new THREE.LatheGeometry(profile, 48), M.cream));
  const coffee = mesh(new THREE.CylinderGeometry(0.52, 0.52, 0.03, 40), M.coffee, 0, 0.3, 0);
  g.add(coffee);
  const handle = mesh(new THREE.TorusGeometry(0.22, 0.07, 16, 32, Math.PI * 1.25), M.cream, 0.6, 0.02, 0);
  handle.rotation.z = -Math.PI * 0.62;
  g.add(handle);
  const saucer = mesh(new THREE.CylinderGeometry(0.95, 0.7, 0.1, 48), M.peach, 0, -0.55, 0);
  g.add(saucer);
  for (let i = 0; i < 3; i++) {
    const s = mesh(sphereGeo, M.steam.clone(), (i - 1) * 0.2, 0.7, 0);
    s.scale.setScalar(0.12);
    s.name = "steam";
    s.userData.phase = i / 3;
    g.add(s);
  }
  addItem(g, { label: "Автоматизация для кафе", target: "#horeca", pos: [2.7, 0.35, 1.5], rot: [0.35, -0.3, 0.05], amp: 0.2, speed: 1, delay: 0.85, scale: 0.95 });
}

// 8. Пастельное «конфетти»
const confetti = new THREE.Group();
root.add(confetti);
{
  const mats = [M.peach, M.sunSoft, M.mint, M.lav, M.rose, M.sky];
  const geos = [sphereGeo, new THREE.TorusGeometry(1, 0.42, 16, 32), new RoundedBoxGeometry(1.4, 1.4, 1.4, 3, 0.4)];
  for (let i = 0; i < 16; i++) {
    const m = mesh(geos[i % 3], mats[i % mats.length]);
    const a = (i / 16) * Math.PI * 2;
    const r = 3.6 + Math.random() * 1.4;
    m.position.set(Math.cos(a) * r * 0.9, Math.sin(a) * r, -1.5 - Math.random() * 3);
    m.scale.setScalar(0.08 + Math.random() * 0.12);
    m.rotation.set(Math.random() * 3, Math.random() * 3, 0);
    m.userData = { phase: Math.random() * 6, base: m.position.clone(), s: m.scale.x };
    confetti.add(m);
  }
}

// Мягкая тень-подложка
{
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d");
  const grd = ctx.createRadialGradient(64, 64, 0, 64, 64, 64);
  grd.addColorStop(0, "rgba(110,120,200,0.32)");
  grd.addColorStop(1, "rgba(110,120,200,0)");
  ctx.fillStyle = grd;
  ctx.fillRect(0, 0, 128, 128);
  const shadow = mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshBasicMaterial({ map: new THREE.CanvasTexture(c), transparent: true, depthWrite: false }), 0, -3.9, -1);
  shadow.scale.set(9, 2.2, 1);
  shadow.rotation.x = -1.2;
  root.add(shadow);
}

// ─── Размер ─────────────────────────────────────────────────
let fitScale = 1;
function resize() {
  const w = wrap.clientWidth, h = wrap.clientHeight;
  renderer.setSize(w, h, false);
  camera.aspect = w / h;
  camera.updateProjectionMatrix();
  fitScale = Math.min(1, camera.aspect / 0.92) * (w < 640 ? 1.02 : 1);
  root.scale.setScalar(fitScale);
}
new ResizeObserver(resize).observe(wrap);
resize();

// ─── Взаимодействие ─────────────────────────────────────────
const pointer = new THREE.Vector2(-10, -10);
const ray = new THREE.Raycaster();
let hovered = null;
let mx = 0, my = 0;            // параллакс от мыши по всей странице
let dragYaw = 0, dragVel = 0, dragging = false, lastX = 0, downX = 0;

addEventListener("pointermove", (e) => {
  mx = (e.clientX / innerWidth) * 2 - 1;
  my = (e.clientY / innerHeight) * 2 - 1;
}, { passive: true });

canvas.addEventListener("pointermove", (e) => {
  const r = canvas.getBoundingClientRect();
  pointer.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
  if (dragging) {
    const dx = e.clientX - lastX;
    dragVel = dx * 0.006;
    dragYaw += dragVel;
    lastX = e.clientX;
  }
});
canvas.addEventListener("pointerleave", () => { pointer.set(-10, -10); dragging = false; });
canvas.addEventListener("pointerdown", (e) => { dragging = true; lastX = downX = e.clientX; });
addEventListener("pointerup", () => { dragging = false; });
canvas.addEventListener("click", (e) => {
  if (Math.abs(e.clientX - downX) > 6 || !hovered) return;
  hovered.userData.bounce = 1;
  const t = document.querySelector(hovered.userData.target);
  if (t) setTimeout(() => t.scrollIntoView({ behavior: "smooth" }), 220);
});

function pick() {
  ray.setFromCamera(pointer, camera);
  const hit = ray.intersectObjects(items, true)[0];
  if (!hit) return null;
  let o = hit.object;
  while (o && !items.includes(o)) o = o.parent;
  return o;
}

const v = new THREE.Vector3();
function placeLabel(obj) {
  if (!obj) { label.classList.remove("is-on"); return; }
  obj.getWorldPosition(v);
  v.y += 1.1 * fitScale;
  v.project(camera);
  label.style.left = `${(v.x * 0.5 + 0.5) * wrap.clientWidth}px`;
  label.style.top = `${(-v.y * 0.5 + 0.5) * wrap.clientHeight}px`;
  if (label.textContent !== obj.userData.label) label.textContent = obj.userData.label;
  label.classList.add("is-on");
}

// ─── Анимация ───────────────────────────────────────────────
const backOut = (t) => { const c = 1.9; return 1 + (c + 1) * Math.pow(t - 1, 3) + c * Math.pow(t - 1, 2); };
const clock = new THREE.Clock();
let rotX = 0, rotY = 0;
const start = performance.now();

function frame() {
  requestAnimationFrame(frame);
  // Не рендерим, когда hero ушёл за экран
  if (wrap.getBoundingClientRect().bottom < 0) { clock.getDelta(); return; }
  const dt = Math.min(clock.getDelta(), 0.05);
  const t = clock.elapsedTime;
  const since = (performance.now() - start) / 1000;

  // Вращение: мышь + drag с инерцией, мягко возвращается
  if (!dragging) { dragVel *= 0.94; dragYaw += dragVel; dragYaw *= 0.97; }
  const scrollK = Math.min(scrollY / innerHeight, 1);
  rotY += ((mx * 0.28 + dragYaw) - rotY) * 0.06;
  rotX += ((my * 0.14 + scrollK * 0.35) - rotX) * 0.06;
  root.rotation.set(rotX, rotY, 0);
  root.position.y = scrollK * 1.4;

  // Наведение
  const h = reduceMotion ? null : pick();
  if (h !== hovered) {
    hovered = h;
    canvas.style.cursor = h ? "pointer" : "";
  }
  placeLabel(hovered);

  for (const g of items) {
    const u = g.userData;
    if (!reduceMotion) {
      const k = Math.min(Math.max((since - 0.3 - u.delay) / 0.9, 0), 1);
      u.appear = k === 0 ? 0 : backOut(k);
    }
    u.hover += ((g === hovered ? 1 : 0) - u.hover) * 0.15;
    u.bounce *= 0.9;
    const s = u.baseScale * Math.max(u.appear, 0.0001) * (1 + u.hover * 0.12 + Math.sin(u.bounce * 12) * u.bounce * 0.15);
    g.scale.setScalar(s);
    const f = reduceMotion ? 0 : Math.sin(t * u.speed + u.phase);
    g.position.y = u.base.y + f * u.amp + u.hover * 0.15;
    g.rotation.x = u.baseRot.x + f * 0.04;
    g.rotation.y = u.baseRot.y + Math.cos(t * u.speed * 0.7 + u.phase) * 0.08 + u.hover * 0.25;
    g.rotation.z = u.baseRot.z + f * 0.03;

    g.children.forEach(c => {
      if (c.name === "ring") c.rotation.z = t * 0.4;
      else if (c.name === "ring2") c.rotation.z = -t * 0.25;
      else if (c.name.startsWith("dot")) c.position.y = Math.max(0, Math.sin(t * 6 - +c.name[3] * 0.7)) * 0.12;
      else if (c.name === "led") c.material.color.setHex(Math.sin(t * 4 + c.userData.phase * 3) > 0 ? 0x3fc496 : 0xbdf3dc);
      else if (c.name === "steam") {
        const p = (t * 0.35 + c.userData.phase) % 1;
        c.position.y = 0.6 + p * 0.9;
        c.position.x = (c.userData.phase - 0.33) * 0.6 + Math.sin(t * 2 + c.userData.phase * 6) * 0.06;
        c.scale.setScalar(0.08 + p * 0.12);
        c.material.opacity = 0.55 * (1 - p);
      }
    });
  }

  confetti.children.forEach(c => {
    const u = c.userData;
    c.position.y = u.base.y + Math.sin(t * 0.8 + u.phase) * 0.25;
    c.rotation.x += dt * 0.3;
    c.rotation.y += dt * 0.2;
    const k = reduceMotion ? 1 : Math.min(Math.max((since - 1) / 1, 0), 1);
    c.scale.setScalar(u.s * Math.max(k, 0.0001));
  });

  renderer.render(scene, camera);
}

renderer.compile(scene, camera);
canvas.classList.add("is-ready");
frame();
