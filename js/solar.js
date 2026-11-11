// COSMOS — interactive 3D Solar System and planet viewer.
import { bodyTexture } from './scenes.js';

let THREE = null;
async function getThree() {
  if (THREE) return THREE;
  THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
  return THREE;
}
const motionOK = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const COMPRESSED = { mercury: 2.15, venus: 2.8, earth: 3.45, mars: 4.15, jupiter: 5.95, saturn: 7.85, uranus: 9.65, neptune: 11.3 };
// Visual period compression: ordering and relative speeds preserved, not linear.
const OMEGA_EXP = 0.6;
const BASE_EARTH_ORBIT_SECONDS = 12;

function orbitRadius(planet, mode) {
  if (mode === 'distance') return 2.7 + Math.pow(planet.orbitAU, 0.45) * 2.35;
  return COMPRESSED[planet.id] || 3.5;
}
function glowTexture(T) {
  const cv = document.createElement('canvas'); cv.width = cv.height = 256;
  const ctx = cv.getContext('2d');
  const g = ctx.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, 'rgba(255,244,214,1)');
  g.addColorStop(0.22, 'rgba(255,206,122,0.75)');
  g.addColorStop(0.5, 'rgba(255,150,60,0.25)');
  g.addColorStop(1, 'rgba(255,120,40,0)');
  ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256);
  return new T.CanvasTexture(cv);
}
function labelSprite(T, text) {
  const cv = document.createElement('canvas'); cv.width = 256; cv.height = 64;
  const ctx = cv.getContext('2d');
  ctx.font = '600 22px "Space Grotesk", sans-serif';
  ctx.textAlign = 'center'; ctx.textBaseline = 'middle';
  ctx.fillStyle = 'rgba(205,220,255,0.85)';
  ctx.fillText(text.toUpperCase(), 128, 32);
  const tex = new T.CanvasTexture(cv);
  tex.colorSpace = T.SRGBColorSpace;
  const sp = new T.Sprite(new T.SpriteMaterial({ map: tex, transparent: true, opacity: 0.75, depthWrite: false, depthTest: false }));
  sp.scale.set(1.15, 0.29, 1);
  sp.renderOrder = 3;
  return sp;
}

export async function initSolar(canvas, planets, onSelect) {
  let T;
  try { T = await getThree(); } catch (e) { console.warn('Solar scene unavailable', e); return null; }
  const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.9));
  renderer.setClearColor(0x000000, 0);
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(45, 1, 0.1, 400);
  function fitDistance(mode = 'compressed') {
    const rect = canvas.getBoundingClientRect();
    const aspect = rect.height ? rect.width / rect.height : 1.6;
    const radius = mode === 'distance' ? 15.2 : 11.9;
    const vFov = 45 * Math.PI / 180;
    const hFov = 2 * Math.atan(Math.tan(vFov / 2) * aspect);
    const half = Math.min(vFov, hFov) / 2;
    return Math.max(16, Math.min(64, radius / Math.sin(half) * 1.06));
  }
  const cam = { az: 0.85, el: 0.45, dist: fitDistance(), taz: 0.85, tel: 0.45, tdist: fitDistance() };
  let framed = false;
  const SIZE_SCALE = 1.7;
  let scaleMode = 'compressed';
  let paused = false, speed = 1.4, elapsed = 0, orbitsVisible = true;
  let visible = true, raf = 0, last = performance.now();
  const clickable = [];

  // stars
  const sg = new T.BufferGeometry();
  const SN = 1800, sp = new Float32Array(SN * 3);
  for (let i = 0; i < SN; i++) {
    const r = 60 + Math.random() * 90;
    const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    sp[i * 3] = r * Math.sin(ph) * Math.cos(th);
    sp[i * 3 + 1] = r * Math.cos(ph);
    sp[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
  }
  sg.setAttribute('position', new T.BufferAttribute(sp, 3));
  scene.add(new T.Points(sg, new T.PointsMaterial({ color: 0xcfe0ff, size: 0.45, transparent: true, opacity: 0.75, depthWrite: false })));

  // sun
  const sun = new T.Mesh(new T.SphereGeometry(0.9, 40, 40), new T.MeshBasicMaterial({ color: 0xffd27a }));
  sun.userData.body = { id: 'sun', name: 'Sun' };
  scene.add(sun); clickable.push(sun);
  const glow = new T.Sprite(new T.SpriteMaterial({ map: glowTexture(T), blending: T.AdditiveBlending, transparent: true, opacity: 0.95, depthWrite: false }));
  glow.scale.set(6.4, 6.4, 1); scene.add(glow);
  const sunlight = new T.PointLight(0xfff0d8, 2.6, 0, 0);
  scene.add(sunlight);
  scene.add(new T.AmbientLight(0x8296ff, 0.42));

  // planets
  const bodies = [];
  planets.forEach((p, i) => {
    const pivot = new T.Group();
    pivot.rotation.y = (i / planets.length) * Math.PI * 2 + 0.5;
    scene.add(pivot);
    const holder = new T.Group();
    const r = orbitRadius(p, scaleMode);
    holder.position.x = r;
    pivot.add(holder);

    const tex = bodyTexture(T, p);
    const mat = new T.MeshStandardMaterial({ map: tex, roughness: 0.96, metalness: 0 });
    const mesh = new T.Mesh(new T.SphereGeometry(p.displaySize * SIZE_SCALE, 40, 40), mat);
    mesh.rotation.z = (parseFloat(p.tilt) || 0) * Math.PI / 180;
    mesh.userData.body = p;
    holder.add(mesh);
    clickable.push(mesh);

    let ring = null;
    if (p.ring) {
      const inner = p.displaySize * SIZE_SCALE * (p.ring === 'saturn' ? 1.45 : 1.7);
      const outer = p.displaySize * SIZE_SCALE * (p.ring === 'saturn' ? 2.35 : 1.95);
      const rg = new T.RingGeometry(inner, outer, 72);
      const rc = p.ring === 'saturn' ? 0xd8c9a4 : 0x9fc7d4;
      ring = new T.Mesh(rg, new T.MeshBasicMaterial({ color: rc, transparent: true, opacity: p.ring === 'saturn' ? 0.6 : 0.32, side: T.DoubleSide, depthWrite: false }));
      ring.rotation.x = -Math.PI / 2 + 0.18;
      holder.add(ring);
    }

    const label = labelSprite(T, p.name);
    label.position.set(0, p.displaySize * SIZE_SCALE + 0.32, 0);
    holder.add(label);

    const orbitPts = [];
    for (let s = 0; s <= 128; s++) {
      const a = (s / 128) * Math.PI * 2;
      orbitPts.push(new T.Vector3(Math.cos(a), 0, Math.sin(a)));
    }
    const og = new T.BufferGeometry().setFromPoints(orbitPts);
    const orbit = new T.LineLoop(og, new T.LineBasicMaterial({ color: 0x6d86ff, transparent: true, opacity: 0.22, depthWrite: false }));
    orbit.scale.setScalar(r);
    scene.add(orbit);

    bodies.push({ data: p, pivot, holder, mesh, ring, label, orbit, angle0: pivot.rotation.y });
  });

  // asteroid belt
  const belt = new T.Group();
  const BN = 1500, bp = new Float32Array(BN * 3);
  for (let i = 0; i < BN; i++) {
    const r = 4.75 + Math.random() * 0.75;
    const a = Math.random() * Math.PI * 2;
    bp[i * 3] = Math.cos(a) * r;
    bp[i * 3 + 1] = (Math.random() - 0.5) * 0.18;
    bp[i * 3 + 2] = Math.sin(a) * r;
  }
  const bg = new T.BufferGeometry();
  bg.setAttribute('position', new T.BufferAttribute(bp, 3));
  belt.add(new T.Points(bg, new T.PointsMaterial({ color: 0xb9a894, size: 0.045, transparent: true, opacity: 0.65, depthWrite: false })));
  scene.add(belt);

  function applyScale(mode) {
    scaleMode = mode;
    bodies.forEach(b => {
      const r = orbitRadius(b.data, mode);
      b.holder.position.x = r;
      b.orbit.scale.setScalar(r);
    });
    cam.tdist = fitDistance(mode);
    belt.scale.setScalar(mode === 'distance' ? 1.28 : 1);
  }

  // pointer controls
  const pointers = new Map();
  let dragging = false, moved = 0, lx = 0, ly = 0, pinchStart = 0, pinchDist = 0;
  function onDown(e) {
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 1) { dragging = true; moved = 0; lx = e.clientX; ly = e.clientY; }
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      pinchStart = Math.hypot(a.x - b.x, a.y - b.y);
      pinchDist = cam.tdist;
    }
    canvas.setPointerCapture(e.pointerId);
  }
  function onMove(e) {
    if (!pointers.has(e.pointerId)) return;
    pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pointers.size === 2) {
      const [a, b] = [...pointers.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchStart > 0) cam.tdist = Math.max(8, Math.min(46, pinchDist * (pinchStart / d)));
      return;
    }
    if (!dragging) return;
    const dx = e.clientX - lx, dy = e.clientY - ly;
    lx = e.clientX; ly = e.clientY;
    moved += Math.abs(dx) + Math.abs(dy);
    cam.taz -= dx * 0.006;
    cam.tel = Math.max(0.08, Math.min(1.3, cam.tel + dy * 0.004));
  }
  function onUp(e) {
    pointers.delete(e.pointerId);
    if (pointers.size < 2) pinchStart = 0;
    if (pointers.size === 0) {
      if (moved < 7) pick(e);
      dragging = false;
    }
  }
  canvas.addEventListener('pointerdown', onDown);
  canvas.addEventListener('pointermove', onMove);
  canvas.addEventListener('pointerup', onUp);
  canvas.addEventListener('pointercancel', onUp);
  canvas.addEventListener('wheel', e => { e.preventDefault(); cam.tdist = Math.max(8, Math.min(46, cam.tdist + e.deltaY * 0.018)); }, { passive: false });

  const raycaster = new T.Raycaster();
  const ndc = new T.Vector2();
  function pick(e) {
    const rect = canvas.getBoundingClientRect();
    ndc.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
    ndc.y = -((e.clientY - rect.top) / rect.height) * 2 + 1;
    raycaster.setFromCamera(ndc, camera);
    const hits = raycaster.intersectObjects(clickable, false);
    if (hits.length && onSelect) onSelect(hits[0].object.userData.body);
  }

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    const phone = w / h < 1.1;
    bodies.forEach(b => b.label.scale.set(phone ? 2.3 : 1.2, phone ? 0.58 : 0.3, 1));
  }
  const ro = new ResizeObserver(resize); ro.observe(canvas); resize();
  const io = new IntersectionObserver(en => { visible = en[0].isIntersecting; }, { threshold: 0.02 });
  io.observe(canvas);

  function updateCamera(dt) {
    cam.az += (cam.taz - cam.az) * Math.min(1, dt * 6);
    cam.el += (cam.tel - cam.el) * Math.min(1, dt * 6);
    cam.dist += (cam.tdist - cam.dist) * Math.min(1, dt * 4);
    const x = cam.dist * Math.cos(cam.el) * Math.sin(cam.az);
    const y = cam.dist * Math.sin(cam.el);
    const z = cam.dist * Math.cos(cam.el) * Math.cos(cam.az);
    camera.position.set(x, y, z);
    camera.lookAt(0, 0, 0);
  }

  function animate(now) {
    raf = requestAnimationFrame(animate);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!visible || document.hidden) return;
    if (!framed && canvas.clientWidth > 0) {
      const portrait = canvas.clientWidth / canvas.clientHeight < 1.1;
      cam.dist = cam.tdist = fitDistance(scaleMode);
      cam.tel = portrait ? 0.63 : 0.45;
      framed = true;
    }
    if (!paused) elapsed += dt * speed;
    bodies.forEach(b => {
      const periodSec = BASE_EARTH_ORBIT_SECONDS * Math.pow(b.data.periodYears, OMEGA_EXP);
      b.pivot.rotation.y = b.angle0 + (elapsed / periodSec) * Math.PI * 2;
      if (motionOK()) b.mesh.rotation.y += dt * 0.35;
    });
    if (motionOK()) { sun.rotation.y += dt * 0.04; belt.rotation.y += dt * 0.012; }
    updateCamera(dt);
    renderer.render(scene, camera);
  }
  updateCamera(1);
  raf = requestAnimationFrame(animate);

  return {
    setPaused(v) { paused = v; },
    setSpeed(v) { speed = v; },
    setOrbits(v) { orbitsVisible = v; bodies.forEach(b => { b.orbit.visible = v; }); },
    setScaleMode(mode) { applyScale(mode); },
    reset() {
      cam.taz = 0.85; cam.tel = 0.45; cam.tdist = fitDistance(scaleMode);
      elapsed = 0; paused = false; speed = 1.4;
    },
    dispose() {
      cancelAnimationFrame(raf); ro.disconnect(); io.disconnect();
      canvas.removeEventListener('pointerdown', onDown); canvas.removeEventListener('pointermove', onMove);
      canvas.removeEventListener('pointerup', onUp); canvas.removeEventListener('pointercancel', onUp);
      renderer.dispose();
    }
  };
}

/* ---------------- reusable planet / moon viewer ---------------- */
export async function initPlanetViewer(canvas, onReady) {
  let T;
  try { T = await getThree(); } catch (e) { return null; }
  const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(38, 1, 0.1, 100);
  let zoom = 4.5, targetZoom = 4.5;
  camera.position.set(0, 0, zoom);

  const starGeo = new T.BufferGeometry();
  const N = 700, pos = new Float32Array(N * 3);
  for (let i = 0; i < N; i++) {
    const r = 12 + Math.random() * 22, th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(ph) * Math.cos(th); pos[i * 3 + 1] = r * Math.cos(ph); pos[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
  }
  starGeo.setAttribute('position', new T.BufferAttribute(pos, 3));
  scene.add(new T.Points(starGeo, new T.PointsMaterial({ color: 0xdfe9ff, size: 0.09, transparent: true, opacity: 0.8, depthWrite: false })));

  scene.add(new T.AmbientLight(0x9fb0ff, 0.5));
  const key = new T.DirectionalLight(0xfff4e2, 2.4); key.position.set(4, 2.5, 5); scene.add(key);
  const rim = new T.PointLight(0x7c5cff, 2.2, 40); rim.position.set(-5, -2, -3); scene.add(rim);

  const holder = new T.Group(); scene.add(holder);
  let mesh = null, current = null, spin = 0, dragging = false, prev = { x: 0, y: 0 }, rot = { x: 0, y: 0 }, pinch = null;
  const loader = new T.TextureLoader(); loader.setCrossOrigin('anonymous');

  function clearBody() {
    if (!mesh) return;
    holder.remove(mesh);
    if (mesh.geometry) mesh.geometry.dispose();
    if (mesh.material) { if (mesh.material.map && mesh.material.map !== currentTex) mesh.material.map.dispose(); mesh.material.dispose(); }
    if (mesh.userData.ring) { mesh.userData.ring.geometry.dispose(); mesh.userData.ring.material.dispose(); }
    mesh = null;
  }
  let currentTex = null;

  function setBody(body) {
    current = body;
    clearBody();
    const radius = 1.45;
    const mat = new T.MeshStandardMaterial({ roughness: 0.92, metalness: 0 });
    const geo = new T.SphereGeometry(radius, 64, 64);
    mesh = new T.Mesh(geo, mat);
    const palette = body.palette || { base: '#9aa3c0', accent: '#4b5573', dark: '#111527' };
    currentTex = bodyTexture(T, { ...body, palette });
    mat.map = currentTex;

    if (body.id === 'earth') {
      loader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/planets/earth_atmos_2048.jpg', tex => {
        tex.colorSpace = T.SRGBColorSpace; mat.map = tex; currentTex = tex; mat.needsUpdate = true;
      }, undefined, () => {});
    } else if (body.texture === 'moon' || body.id === 'moon') {
      loader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/planets/moon_1024.jpg', tex => {
        tex.colorSpace = T.SRGBColorSpace; mat.map = tex; currentTex = tex; mat.needsUpdate = true;
      }, undefined, () => {});
    }

    if (body.ring) {
      const rg = new T.RingGeometry(radius * 1.45, radius * 2.3, 96);
      const ring = new T.Mesh(rg, new T.MeshBasicMaterial({ color: 0xd8c9a4, transparent: true, opacity: 0.6, side: T.DoubleSide, depthWrite: false }));
      ring.rotation.x = -Math.PI / 2 + 0.2;
      mesh.userData.ring = ring;
      mesh.add(ring);
    }
    mesh.rotation.z = (parseFloat(body.tilt) || 0) * Math.PI / 180 * 0.6;
    holder.add(mesh);
    rot.x = 0.12; rot.y = -0.5; holder.rotation.set(rot.x, rot.y, 0);
    zoom = targetZoom = 4.5;
    if (onReady) onReady();
  }
  function clearAll() { clearBody(); current = null; }

  const pts = new Map();
  let pinchStart = 0, pinchBase = 0;
  canvas.addEventListener('pointerdown', e => {
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 1) { dragging = true; prev = { x: e.clientX, y: e.clientY }; }
    if (pts.size === 2) {
      const [a, b] = [...pts.values()];
      pinchStart = Math.hypot(a.x - b.x, a.y - b.y);
      pinchBase = targetZoom;
      dragging = false;
    }
    canvas.setPointerCapture(e.pointerId);
  });
  canvas.addEventListener('pointermove', e => {
    if (!pts.has(e.pointerId)) return;
    pts.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (pts.size === 2) {
      const [a, b] = [...pts.values()];
      const d = Math.hypot(a.x - b.x, a.y - b.y);
      if (pinchStart > 0) targetZoom = Math.max(2.7, Math.min(8, pinchBase * (pinchStart / d)));
      return;
    }
    if (!dragging) return;
    const dx = e.clientX - prev.x, dy = e.clientY - prev.y;
    prev = { x: e.clientX, y: e.clientY };
    rot.y += dx * 0.008;
    rot.x = Math.max(-1.2, Math.min(1.2, rot.x + dy * 0.007));
  });
  const stopDrag = e => {
    pts.delete(e.pointerId);
    if (pts.size < 2) pinchStart = 0;
    if (pts.size === 0) dragging = false;
  };
  canvas.addEventListener('pointerup', stopDrag); canvas.addEventListener('pointercancel', stopDrag);
  canvas.addEventListener('wheel', e => { e.preventDefault(); targetZoom = Math.max(2.7, Math.min(8, targetZoom + e.deltaY * 0.004)); }, { passive: false });
  canvas.addEventListener('dblclick', () => { rot.x = 0.12; rot.y = -0.5; targetZoom = 4.5; });

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize); ro.observe(canvas); resize();

  let raf = 0, last = performance.now();
  function animate(now) {
    raf = requestAnimationFrame(animate);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (document.hidden) return;
    if (!dragging && motionOK()) rot.y += dt * 0.18;
    if (mesh) {
      holder.rotation.x += (rot.x - holder.rotation.x) * 0.08;
      holder.rotation.y += (rot.y - holder.rotation.y) * 0.08;
    }
    zoom += (targetZoom - zoom) * 0.08;
    camera.position.z = zoom;
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(animate);

  return {
    show: setBody,
    clear: clearAll,
    resize,
    current: () => current,
    dispose() { cancelAnimationFrame(raf); ro.disconnect(); clearAll(); renderer.dispose(); }
  };
}
