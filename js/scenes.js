// COSMOS — WebGL scenes: hero Earth, spiral galaxy, black hole visualisation.
// Three.js is loaded lazily so the page still works if the CDN is unreachable.

let THREE = null;
async function getThree() {
  if (THREE) return THREE;
  THREE = await import('https://cdn.jsdelivr.net/npm/three@0.160.0/build/three.module.js');
  return THREE;
}
export function hasWebGL() {
  try {
    const c = document.createElement('canvas');
    return !!(window.WebGLRenderingContext && (c.getContext('webgl2') || c.getContext('webgl')));
  } catch (e) { return false; }
}
const motionOK = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ---------------- procedural textures ---------------- */
function hash(x, y, seed) {
  let h = Math.imul(x, 374761393) ^ Math.imul(y, 668265263) ^ Math.imul(seed, 1442695041);
  h = Math.imul(h ^ (h >>> 13), 1274126177);
  return ((h ^ (h >>> 16)) >>> 0) / 4294967295;
}
function smooth(t) { return t * t * (3 - 2 * t); }
function noise2(x, y, seed) {
  const xi = Math.floor(x), yi = Math.floor(y), xf = x - xi, yf = y - yi;
  const a = hash(xi, yi, seed), b = hash(xi + 1, yi, seed);
  const c = hash(xi, yi + 1, seed), d = hash(xi + 1, yi + 1, seed);
  const u = smooth(xf), v = smooth(yf);
  return (a * (1 - u) + b * u) * (1 - v) + (c * (1 - u) + d * u) * v;
}
function fbm(x, y, seed, oct = 5) {
  let v = 0, amp = 0.5, f = 1;
  for (let i = 0; i < oct; i++) { v += amp * noise2(x * f, y * f, seed + i * 31); f *= 2.03; amp *= 0.5; }
  return v;
}
function hexRgb(hex) {
  const h = hex.replace('#', '');
  return [parseInt(h.slice(0, 2), 16), parseInt(h.slice(2, 4), 16), parseInt(h.slice(4, 6), 16)];
}
function mix(a, b, t) {
  t = Math.max(0, Math.min(1, t));
  return [a[0] + (b[0] - a[0]) * t, a[1] + (b[1] - a[1]) * t, a[2] + (b[2] - a[2]) * t];
}
const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));

/** Paints an equirectangular planet texture from a palette. */
export function makeBodyCanvas(palette = {}, seedKey = 'x', size = 768) {
  const w = size, h = Math.round(size / 2);
  const cv = document.createElement('canvas');
  cv.width = w; cv.height = h;
  const ctx = cv.getContext('2d');
  const base = hexRgb(palette.base || '#8b5cf6');
  const accent = hexRgb(palette.accent || '#2b2360');
  const dark = hexRgb(palette.dark || '#0a0a1a');
  const bands = palette.bands ? [base, accent, dark, mix(base, [255, 250, 235], 0.35)] : null;
  let seed = 1;
  for (let i = 0; i < seedKey.length; i++) seed = (seed * 31 + seedKey.charCodeAt(i)) >>> 0;
  const img = ctx.createImageData(w, h);
  const d = img.data;

  for (let y = 0; y < h; y++) {
    const v = y / h;
    for (let x = 0; x < w; x++) {
      const u = x / w;
      let n = fbm(u * 7, v * 13, seed, 5);
      let n2 = fbm(u * 21 + 2.4, v * 9, seed + 17, 4);
      let col;
      if (palette.earth) {
        const land = fbm(u * 4.2 + 1.2, v * 7.2, seed, 5);
        const polar = Math.abs(v - 0.5) * 2;
        col = land > 0.54 ? mix([62, 118, 74], [176, 160, 110], clamp((land - 0.54) * 3)) : mix([12, 40, 82], [24, 82, 140], n2);
        if (polar > 0.86) col = mix(col, [238, 245, 255], (polar - 0.86) / 0.14);
      } else if (bands) {
        const t = clamp(Math.sin(v * Math.PI * (8 + (seed % 4)) + n * 4.2) * 0.5 + 0.5);
        const seg = t * (bands.length - 1);
        const i0 = Math.floor(seg), i1 = Math.min(bands.length - 1, i0 + 1);
        col = mix(bands[i0], bands[i1], seg - i0);
        col = mix(col, dark, clamp((n2 - 0.62) * 0.9));
      } else {
        col = mix(base, accent, clamp((n - 0.32) * 1.9));
        col = mix(col, dark, clamp((n2 - 0.6) * 1.1));
        if (palette.smooth) col = mix(col, accent, 0.22);
      }
      if (palette.caps) {
        const polar = Math.abs(v - 0.5) * 2;
        if (polar > 0.9) col = mix(col, [232, 238, 246], (polar - 0.9) / 0.1);
      }
      const i = (y * w + x) * 4;
      d[i] = col[0]; d[i + 1] = col[1]; d[i + 2] = col[2]; d[i + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);

  // Great Red Spot / storm ovals
  if (palette.spot) {
    const g = ctx.createRadialGradient(w * 0.66, h * 0.63, 2, w * 0.66, h * 0.63, w * 0.075);
    g.addColorStop(0, 'rgba(180,82,52,0.95)');
    g.addColorStop(0.6, 'rgba(150,70,48,0.55)');
    g.addColorStop(1, 'rgba(150,70,48,0)');
    ctx.save(); ctx.translate(w * 0.66, h * 0.63); ctx.scale(1.9, 0.8); ctx.translate(-w * 0.66, -h * 0.63);
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(w * 0.66, h * 0.63, w * 0.075, 0, Math.PI * 2); ctx.fill(); ctx.restore();
  }
  // Craters
  if (palette.craters) {
    let r = seed;
    const rand = () => { r = (Math.imul(r, 1664525) + 1013904223) >>> 0; return r / 4294967296; };
    for (let i = 0; i < 62; i++) {
      const cx = rand() * w, cy = rand() * h, rad = 1.5 + rand() * 10;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      g.addColorStop(0, `rgba(0,0,0,${0.13 + rand() * 0.1})`);
      g.addColorStop(0.7, 'rgba(0,0,0,0.05)');
      g.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(cx - rad * 0.12, cy - rad * 0.12, rad * 0.82, 0, Math.PI * 2);
      ctx.strokeStyle = 'rgba(255,255,255,0.07)'; ctx.lineWidth = 0.8; ctx.stroke();
    }
  }
  // Cracks (icy moons)
  if (palette.cracks) {
    let r = seed + 9;
    const rand = () => { r = (Math.imul(r, 1103515245) + 12345) >>> 0; return r / 4294967296; };
    for (let i = 0; i < 26; i++) {
      ctx.beginPath();
      let x = rand() * w, y = rand() * h;
      ctx.moveTo(x, y);
      for (let s = 0; s < 5; s++) { x += (rand() - 0.5) * 90; y += (rand() - 0.5) * 32; ctx.lineTo(x, y); }
      ctx.strokeStyle = `rgba(120,86,60,${0.12 + rand() * 0.2})`; ctx.lineWidth = 1 + rand(); ctx.stroke();
    }
  }
  // Sulfur spots (Io)
  if (palette.spots) {
    for (let i = 0; i < 42; i++) {
      const cx = Math.random() * w, cy = Math.random() * h, rad = 4 + Math.random() * 26;
      const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rad);
      g.addColorStop(0, 'rgba(90,50,120,0.5)'); g.addColorStop(1, 'rgba(90,50,120,0)');
      ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, rad, 0, Math.PI * 2); ctx.fill();
    }
  }
  // Haze (Venus / Titan)
  if (palette.clouds) {
    const g = ctx.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, 'rgba(255,240,205,0.28)');
    g.addColorStop(0.5, 'rgba(255,232,190,0.06)');
    g.addColorStop(1, 'rgba(255,240,205,0.3)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }
  return cv;
}

function canvasTexture(T, canvas) {
  const tex = new T.CanvasTexture(canvas);
  tex.colorSpace = T.SRGBColorSpace;
  tex.wrapS = T.RepeatWrapping;
  tex.anisotropy = 4;
  return tex;
}
export function bodyTexture(T, body) {
  return canvasTexture(T, makeBodyCanvas(body.palette || {}, body.id || body.name || 'body'));
}

/* ---------------- shared helpers ---------------- */
function makeStars(T, count = 2200, spread = 45) {
  const g = new T.BufferGeometry();
  const pos = new Float32Array(count * 3);
  for (let i = 0; i < count; i++) {
    const r = spread + Math.random() * spread;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
    pos[i * 3 + 1] = r * Math.cos(phi);
    pos[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
  }
  g.setAttribute('position', new T.BufferAttribute(pos, 3));
  return new T.Points(g, new T.PointsMaterial({ color: 0xffffff, size: 0.12, transparent: true, opacity: 0.85, depthWrite: false }));
}
function nebulaSprite(T, colorA, colorB) {
  const cv = document.createElement('canvas'); cv.width = cv.height = 256;
  const ctx = cv.getContext('2d');
  for (let i = 0; i < 26; i++) {
    const x = 50 + Math.random() * 156, y = 50 + Math.random() * 156, r = 20 + Math.random() * 40;
    const g = ctx.createRadialGradient(x, y, 0, x, y, r);
    g.addColorStop(0, i % 2 ? colorA : colorB);
    g.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, 256, 256);
  }
  const tex = new T.CanvasTexture(cv);
  const mat = new T.SpriteMaterial({ map: tex, blending: T.AdditiveBlending, transparent: true, opacity: 0.5, depthWrite: false });
  return new T.Sprite(mat);
}

/* ---------------- HERO EARTH ---------------- */
export async function initHero(canvas) {
  let T;
  try { T = await getThree(); } catch (e) { console.warn('Three.js unavailable', e); return null; }
  const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
  renderer.setClearColor(0x000000, 0);
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(40, 1, 0.1, 300);
  camera.position.set(0, 0, 6.4);

  scene.add(makeStars(T, 2600, 55));
  const nebA = nebulaSprite(T, 'rgba(139,92,246,0.55)', 'rgba(79,209,232,0.25)');
  nebA.scale.set(26, 26, 1); nebA.position.set(-7, 4, -14); scene.add(nebA);
  const nebB = nebulaSprite(T, 'rgba(192,132,252,0.4)', 'rgba(30,80,180,0.35)');
  nebB.scale.set(20, 20, 1); nebB.position.set(10, -6, -18); scene.add(nebB);

  const group = new T.Group();
  group.position.set(1.75, 0.1, 0);
  group.rotation.z = -0.41;
  scene.add(group);

  const earthMat = new T.MeshStandardMaterial({
    map: bodyTexture(T, { id: 'earth', palette: { earth: true } }), roughness: 0.95, metalness: 0,
    emissive: new T.Color(0x0a1f3d), emissiveIntensity: 0.4
  });
  const earth = new T.Mesh(new T.SphereGeometry(1.55, 64, 64), earthMat);
  group.add(earth);

  const cloudMat = new T.MeshStandardMaterial({ transparent: true, opacity: 0.55, depthWrite: false, roughness: 1 });
  const clouds = new T.Mesh(new T.SphereGeometry(1.575, 48, 48), cloudMat);
  group.add(clouds);

  const atmoMat = new T.ShaderMaterial({
    uniforms: { glow: { value: new T.Color(0x74d4ff) }, power: { value: 2.3 }, strength: { value: 1.9 } },
    vertexShader: `varying vec3 vN; varying vec3 vV;
      void main(){ vN = normalize(normalMatrix * normal); vec4 mv = modelViewMatrix * vec4(position,1.0); vV = normalize(-mv.xyz); gl_Position = projectionMatrix * mv; }`,
    fragmentShader: `uniform vec3 glow; uniform float power; uniform float strength; varying vec3 vN; varying vec3 vV;
      void main(){ float f = pow(1.0 - abs(dot(vN, vV)), power); gl_FragColor = vec4(glow, clamp(f * strength, 0.0, 1.0)); }`,
    blending: T.AdditiveBlending, side: T.BackSide, transparent: true, depthWrite: false
  });
  group.add(new T.Mesh(new T.SphereGeometry(1.78, 48, 48), atmoMat));

  const sun = new T.DirectionalLight(0xfff4e4, 3.1);
  sun.position.set(4.5, 2.2, 5);
  scene.add(sun);
  const fill = new T.DirectionalLight(0x9fc4ff, 0.85);
  fill.position.set(-1, 1.5, 6);
  scene.add(fill);
  scene.add(new T.AmbientLight(0x7d92ff, 0.95));
  const rim = new T.PointLight(0x8b5cf6, 2.2, 30);
  rim.position.set(-6, -2, 3);
  scene.add(rim);

  const loader = new T.TextureLoader();
  loader.setCrossOrigin('anonymous');
  loader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/planets/earth_atmos_2048.jpg', tex => {
    tex.colorSpace = T.SRGBColorSpace;
    earthMat.map = tex; earthMat.needsUpdate = true;
  }, undefined, () => {});
  loader.load('https://cdn.jsdelivr.net/gh/mrdoob/three.js@r160/examples/textures/planets/earth_clouds_1024.png', tex => {
    tex.colorSpace = T.SRGBColorSpace;
    cloudMat.map = tex; cloudMat.needsUpdate = true;
  }, undefined, () => {});

  const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
  function onPointer(e) {
    pointer.tx = (e.clientX / window.innerWidth - 0.5) * 2;
    pointer.ty = (e.clientY / window.innerHeight - 0.5) * 2;
  }
  window.addEventListener('pointermove', onPointer, { passive: true });

  let w = 0, h = 0;
  function resize() {
    w = canvas.clientWidth || canvas.parentElement.clientWidth;
    h = canvas.clientHeight || canvas.parentElement.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const portrait = w / h < 0.85;
    const narrow = w < 620 || portrait;
    const tablet = w >= 620 && w < 1100 && !portrait;
    camera.position.z = narrow ? 8.8 : tablet ? 7.8 : 6.8;
    group.position.x = narrow ? 0.35 : tablet ? 2.0 : 2.25;
    group.position.y = narrow ? 0.35 : tablet ? 0.2 : 0.1;
    group.scale.setScalar(narrow ? 0.78 : tablet ? 0.85 : 0.92);
    camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize); ro.observe(canvas.parentElement); resize();

  let visible = true;
  const io = new IntersectionObserver(entries => { visible = entries[0].isIntersecting; }, { threshold: 0.02 });
  io.observe(canvas.parentElement);

  let raf = 0, last = performance.now();
  function animate(now) {
    raf = requestAnimationFrame(animate);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!visible || document.hidden) return;
    pointer.x += (pointer.tx - pointer.x) * 0.045;
    pointer.y += (pointer.ty - pointer.y) * 0.045;
    if (motionOK()) {
      earth.rotation.y += dt * 0.052;
      clouds.rotation.y += dt * 0.068;
    }
    group.rotation.x = pointer.y * 0.09;
    group.rotation.y = pointer.x * 0.07;
    camera.position.x = pointer.x * 0.18;
    camera.position.y = -pointer.y * 0.12;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(animate);

  return {
    dispose() { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); window.removeEventListener('pointermove', onPointer); renderer.dispose(); }
  };
}

/* ---------------- SPIRAL GALAXY ---------------- */
export async function initGalaxy(canvas) {
  let T;
  try { T = await getThree(); } catch (e) { return null; }
  const renderer = new T.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.8));
  renderer.setClearColor(0x000000, 0);
  const scene = new T.Scene();
  const camera = new T.PerspectiveCamera(45, 1, 0.1, 200);
  camera.position.set(0, 0, 7.6);
  const galaxy = new T.Group();
  galaxy.rotation.x = -1.04;
  galaxy.rotation.z = 0.4;
  scene.add(galaxy);
  scene.add(makeStars(T, 1200, 60));

  const N = 17000, arms = 3;
  const pos = new Float32Array(N * 3), col = new Float32Array(N * 3);
  const core = new T.Color(0xfff1cf), mid = new T.Color(0xb79cff), outer = new T.Color(0x5fc6ff);
  for (let i = 0; i < N; i++) {
    const t = Math.pow(Math.random(), 0.72);
    const r = 0.25 + t * 5.2;
    const arm = i % arms;
    const angle = arm * (Math.PI * 2 / arms) + r * 0.86 + (Math.random() - 0.5) * (0.55 - t * 0.25);
    const spread = (1 - t) * 0.22 + 0.06;
    pos[i * 3] = Math.cos(angle) * r + (Math.random() - 0.5) * spread;
    pos[i * 3 + 1] = (Math.random() - 0.5) * (0.18 + (1 - t) * 0.35);
    pos[i * 3 + 2] = Math.sin(angle) * r + (Math.random() - 0.5) * spread;
    const c = t < 0.35 ? core.clone().lerp(mid, t / 0.35) : mid.clone().lerp(outer, (t - 0.35) / 0.65);
    const bright = 0.55 + Math.random() * 0.45;
    col[i * 3] = c.r * bright; col[i * 3 + 1] = c.g * bright; col[i * 3 + 2] = c.b * bright;
  }
  const geo = new T.BufferGeometry();
  geo.setAttribute('position', new T.BufferAttribute(pos, 3));
  geo.setAttribute('color', new T.BufferAttribute(col, 3));
  const mat = new T.PointsMaterial({ size: 0.035, vertexColors: true, transparent: true, opacity: 0.92, blending: T.AdditiveBlending, depthWrite: false });
  galaxy.add(new T.Points(geo, mat));

  const bulgeGeo = new T.BufferGeometry();
  const bn = 1200, bp = new Float32Array(bn * 3);
  for (let i = 0; i < bn; i++) {
    const r = Math.pow(Math.random(), 2) * 0.75;
    const th = Math.random() * Math.PI * 2, ph = Math.acos(2 * Math.random() - 1);
    bp[i * 3] = r * Math.sin(ph) * Math.cos(th);
    bp[i * 3 + 1] = r * Math.cos(ph) * 0.45;
    bp[i * 3 + 2] = r * Math.sin(ph) * Math.sin(th);
  }
  bulgeGeo.setAttribute('position', new T.BufferAttribute(bp, 3));
  galaxy.add(new T.Points(bulgeGeo, new T.PointsMaterial({ color: 0xffe9c4, size: 0.05, transparent: true, opacity: 0.85, blending: T.AdditiveBlending, depthWrite: false })));

  const glow = nebulaSprite(T, 'rgba(255,214,170,0.4)', 'rgba(150,120,255,0.3)');
  glow.scale.set(4.4, 4.4, 1); glow.position.z = -0.4; galaxy.add(glow);

  let drag = false, lx = 0, ly = 0, vy = 0, vx = 0;
  const state = { rx: -1.04, rz: 0.4, zoom: 7.6, tz: 7.6 };
  canvas.addEventListener('pointerdown', e => { drag = true; lx = e.clientX; ly = e.clientY; canvas.setPointerCapture(e.pointerId); });
  canvas.addEventListener('pointermove', e => {
    if (!drag) return;
    const dx = e.clientX - lx, dy = e.clientY - ly; lx = e.clientX; ly = e.clientY;
    state.rz += dx * 0.006; vx = dx * 0.006;
    state.rx = Math.max(-1.5, Math.min(1.2, state.rx + dy * 0.004)); vy = dy * 0.004;
  });
  const up = () => { drag = false; };
  canvas.addEventListener('pointerup', up); canvas.addEventListener('pointercancel', up);
  canvas.addEventListener('wheel', e => { e.preventDefault(); state.tz = Math.max(3.4, Math.min(13, state.tz + e.deltaY * 0.006)); }, { passive: false });

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h; camera.updateProjectionMatrix();
  }
  const ro = new ResizeObserver(resize); ro.observe(canvas); resize();
  let visible = true;
  const io = new IntersectionObserver(e => { visible = e[0].isIntersecting; }, { threshold: 0.02 });
  io.observe(canvas);

  let raf = 0, last = performance.now();
  function animate(now) {
    raf = requestAnimationFrame(animate);
    const dt = Math.min(0.05, (now - last) / 1000); last = now;
    if (!visible || document.hidden) return;
    if (!drag && motionOK()) { state.rz += dt * 0.055; vx *= 0.94; vy *= 0.94; state.rx += vy * 0.4; }
    galaxy.rotation.z += (state.rz - galaxy.rotation.z) * 0.08;
    galaxy.rotation.x += (state.rx - galaxy.rotation.x) * 0.08;
    state.zoom += (state.tz - state.zoom) * 0.08;
    camera.position.z = state.zoom;
    renderer.render(scene, camera);
  }
  raf = requestAnimationFrame(animate);
  return { dispose() { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); renderer.dispose(); } };
}

/* ---------------- BLACK HOLE (2D scientific visualisation) ---------------- */
export function initBlackHole(canvas) {
  const ctx = canvas.getContext('2d');
  if (!ctx) return null;
  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2), visible = true, t = 0, raf = 0;
  const stars = Array.from({ length: 150 }, () => ({ x: Math.random(), y: Math.random(), r: Math.random() * 1.2 + 0.3, a: Math.random() * 0.6 + 0.2 }));

  function resize() {
    const r = canvas.getBoundingClientRect();
    w = r.width; h = r.height;
    if (!w || !h) return;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  const ro = new ResizeObserver(resize); ro.observe(canvas); resize();
  const io = new IntersectionObserver(e => { visible = e[0].isIntersecting; }, { threshold: 0.02 });
  io.observe(canvas);

  function draw() {
    raf = requestAnimationFrame(draw);
    if (!visible || document.hidden || !w) return;
    t += motionOK() ? 0.006 : 0;
    const cx = w / 2, cy = h / 2;
    const R = Math.min(w, h) * 0.145;
    ctx.clearRect(0, 0, w, h);

    // star field
    for (const s of stars) {
      const dx = s.x * w - cx, dy = s.y * h - cy, dist = Math.hypot(dx, dy);
      let x = s.x * w, y = s.y * h;
      const lens = R * 2.6;
      if (dist < lens && dist > R * 0.6) {
        const bend = (1 - dist / lens) * R * 0.55;
        x += (dx / dist) * bend; y += (dy / dist) * bend;
      }
      ctx.globalAlpha = s.a; ctx.fillStyle = '#dfe9ff';
      ctx.beginPath(); ctx.arc(x, y, s.r, 0, Math.PI * 2); ctx.fill();
    }
    ctx.globalAlpha = 1;

    // photon ring glow
    const ringG = ctx.createRadialGradient(cx, cy, R * 0.9, cx, cy, R * 3.4);
    ringG.addColorStop(0, 'rgba(255,196,120,0.5)');
    ringG.addColorStop(0.35, 'rgba(255,140,80,0.12)');
    ringG.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = ringG;
    ctx.beginPath(); ctx.arc(cx, cy, R * 3.4, 0, Math.PI * 2); ctx.fill();

    // accretion disk (behind)
    ctx.save();
    ctx.translate(cx, cy);
    ctx.rotate(-0.16);
    ctx.scale(1, 0.30);
    for (let i = 0; i < 3; i++) {
      const radius = R * (2.3 + i * 0.42);
      ctx.beginPath();
      ctx.arc(0, 0, radius, 0.15 + t * (0.4 + i * 0.15), 2.45 + t * (0.4 + i * 0.15));
      ctx.strokeStyle = i === 0 ? 'rgba(255,238,200,0.9)' : `rgba(255,${150 + i * 20},${80 - i * 10},${0.55 - i * 0.13})`;
      ctx.lineWidth = R * (0.26 - i * 0.05);
      ctx.shadowColor = 'rgba(255,170,90,0.7)'; ctx.shadowBlur = 26;
      ctx.stroke();
    }
    // Doppler-brightened side
    ctx.beginPath();
    ctx.arc(0, 0, R * 2.55, Math.PI * 0.95, Math.PI * 1.6);
    ctx.strokeStyle = 'rgba(220,240,255,0.75)';
    ctx.lineWidth = R * 0.2; ctx.shadowColor = 'rgba(180,220,255,0.9)'; ctx.shadowBlur = 30; ctx.stroke();
    ctx.restore();

    // shadow
    const shadowG = ctx.createRadialGradient(cx, cy, R * 0.2, cx, cy, R);
    shadowG.addColorStop(0, '#000');
    shadowG.addColorStop(0.82, '#000');
    shadowG.addColorStop(1, 'rgba(0,0,0,0.55)');
    ctx.fillStyle = shadowG;
    ctx.beginPath(); ctx.arc(cx, cy, R, 0, Math.PI * 2); ctx.fill();

    // photon ring
    ctx.beginPath(); ctx.arc(cx, cy, R * 1.06, 0, Math.PI * 2);
    ctx.strokeStyle = 'rgba(255,214,150,0.9)'; ctx.lineWidth = 2.4;
    ctx.shadowColor = 'rgba(255,190,110,1)'; ctx.shadowBlur = 24; ctx.stroke();
    ctx.shadowBlur = 0;

    // foreground disk arc
    ctx.save(); ctx.translate(cx, cy); ctx.rotate(-0.16); ctx.scale(1, 0.3);
    ctx.beginPath(); ctx.arc(0, 0, R * 2.15, -0.2, Math.PI - 0.55);
    ctx.strokeStyle = 'rgba(255,236,200,0.75)'; ctx.lineWidth = R * 0.22; ctx.shadowColor = 'rgba(255,170,90,0.8)'; ctx.shadowBlur = 22; ctx.stroke();
    ctx.restore();

    // lensed arcs
    ctx.strokeStyle = 'rgba(190,210,255,0.18)'; ctx.lineWidth = 1;
    for (let i = 1; i <= 2; i++) {
      ctx.beginPath(); ctx.arc(cx, cy, R * (1.5 + i * 0.5), 0.3 + t * 0.2, 2.5 + t * 0.2); ctx.stroke();
    }
  }
  raf = requestAnimationFrame(draw);
  return { dispose() { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); } };
}
