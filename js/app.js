// COSMOS — application controller: detail pages, 3D viewers, scene wiring, routing.
import {
  planets, dwarfPlanets, moons, galaxies, nebulae, blackHoles, starTypes,
  smallBodies, missions, universeConcepts, findObject
} from './data.js';
import { initHero, initGalaxy, initBlackHole } from './scenes.js';
import { initSolar, initPlanetViewer } from './solar.js';
import { initSimulator, initQuiz, initGlossary, initFacts, initLifecycle } from './lab.js';
import { renderCatalogues, initSearch, initChrome } from './ui.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const motionOK = () => !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

const LISTS = {
  planet: planets, dwarf: dwarfPlanets, moon: moons, galaxy: galaxies, nebula: nebulae,
  blackhole: blackHoles, star: starTypes, smallbody: smallBodies, mission: missions, concept: universeConcepts
};
const KIND_LABEL = {
  planet: 'Planet', dwarf: 'Dwarf planet', moon: 'Natural satellite', galaxy: 'Galaxy', nebula: 'Nebula',
  blackhole: 'Extreme object', star: 'Stellar object', smallbody: 'Small body', mission: 'Space mission', concept: 'Cosmology'
};
const BACK = {
  planet: ['Solar System', '#solar-system'], dwarf: ['Solar System', '#solar-system'], moon: ['Moons', '#moons'],
  galaxy: ['Galaxies', '#galaxies'], nebula: ['Nebulae', '#nebulae'], blackhole: ['Black holes', '#blackholes'],
  star: ['Stars', '#stars'], smallbody: ['Small bodies', '#smallbodies'], mission: ['Missions', '#missions'],
  concept: ['Universe', '#universe']
};
const OV_ICON = {
  galaxy: 'i-galaxy', nebula: 'i-nebula', blackhole: 'i-blackhole', star: 'i-star',
  smallbody: 'i-comet', mission: 'i-rocket', concept: 'i-orbit', planet: 'i-planet', dwarf: 'i-planet', moon: 'i-moon'
};

const objectView = $('#object-view');
const ovContent = $('#ov-content');
const modal = $('#viewer-modal');
let current = null;
let lastFocus = null;
let solarCtrl = null;
let bhCtrl = null;
let ovViewer = null;
let modalViewer = null;
const ovCanvas = document.createElement('canvas');
ovCanvas.id = 'ov-canvas';

/* ---------------- helpers ---------------- */
function syncScroll() {
  const locked = $('.search-overlay.open') || $('.mobile-menu.open') || $('.object-view.open') || $('.viewer-modal.open');
  document.body.classList.toggle('no-scroll', !!locked);
}
function fallbackScene(canvas, message) {
  if (!canvas) return;
  canvas.style.display = 'none';
  const host = canvas.parentElement;
  if (!host || host.querySelector('.scene-fallback')) return;
  const note = document.createElement('div');
  note.className = 'scene-fallback';
  note.textContent = message;
  host.appendChild(note);
}
const hue = t => [...t].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 360, 11);

function stats(kind, item) {
  const rows = [];
  const add = (k, v) => { if (v) rows.push([k, v]); };
  if (kind === 'planet' || kind === 'dwarf') {
    add('Diameter', item.diameter); add('Mass', item.mass); add('Surface gravity', item.gravity);
    add('Mean temperature', item.temp); add('Distance from Sun', item.distSun);
    add('Orbital period', item.orbitPeriod); add('Rotation period', item.rotation);
    add('Axial tilt', item.tilt); add('Known moons', item.moons);
  } else if (kind === 'moon') {
    add('Diameter', item.diameter); add('Distance from ' + item.parent, item.distance);
    add('Orbital period', item.period); add('Surface gravity', item.gravity);
    add('Temperature', item.temp); add('Parent planet', item.parent);
  } else if (kind === 'galaxy') {
    add('Classification', item.type); add('Diameter', item.size); add('Distance', item.distance);
    add('Stars', item.stars); add('Constellation', item.constellation);
  } else if (kind === 'nebula') {
    add('Type', item.type); add('Distance', item.distance); add('Size', item.size); add('Constellation', item.constellation);
  } else if (kind === 'blackhole') {
    add('Class', item.type); add('Mass', item.mass); add('Distance', item.distance); add('Evidence status', item.status);
  } else if (kind === 'star') {
    add('Class', item.type); add('Surface temperature', item.temp); add('Mass', item.mass);
    add('Luminosity', item.luminosity); add('Lifetime', item.lifetime);
  } else if (kind === 'smallbody') {
    add('Type', item.type); add('Size', item.size); add('Distance', item.distance);
  } else if (kind === 'mission') {
    add('Agency', item.agency); add('Year', item.year); add('Category', item.type);
  } else if (kind === 'concept') {
    add('Scale', item.stat); add('Status', item.status);
  }
  return rows;
}

function sourceLinks(item) {
  if (!item.sources || !item.sources.length) return '';
  return `<div class="ov-section"><h2>References &amp; further reading</h2>
    <div class="ov-sources">${item.sources.map(s => `<a href="${s.url}" target="_blank" rel="noopener">${s.label} ↗</a>`).join('')}</div>
    <p class="small" style="margin-top:10px">Values from published mission fact sheets. Estimates and ranges are labelled; theoretical concepts are marked as such.</p>
  </div>`;
}

function visualMarkup(kind, item) {
  if (kind === 'planet' || kind === 'dwarf' || kind === 'moon') {
    return `<div class="ov-visual" id="ov-visual-slot"><span class="label">Drag to rotate · scroll to zoom</span></div>`;
  }
  const h = hue(item.name);
  if (kind === 'nebula' && item.image) {
    return `<div class="ov-visual"><div class="nebula-visual">
      <div class="fallback" style="background:radial-gradient(ellipse at 35% 40%, hsla(${h},90%,65%,.55), transparent 55%), radial-gradient(ellipse at 68% 65%, hsla(${(h + 80) % 360},90%,60%,.45), transparent 55%), #07040f"></div>
      <img src="${item.image}" alt="${item.name}, observed by Hubble" loading="eager" onerror="this.style.display='none'" />
    </div></div>`;
  }
  if (kind === 'galaxy') {
    return `<div class="ov-visual"><div class="nebula-visual" style="background:radial-gradient(circle at 50% 50%, #101733, #04060f 72%)">
      <div class="galaxy-orb" style="--g1:hsl(${h} 85% 72%);--g2:hsl(${(h + 55) % 360} 85% 62%);position:absolute;left:14%;top:14%;width:72%"></div>
      <div class="galaxy-core" style="position:absolute;left:50%;top:50%;transform:translate(-50%,-50%)"></div>
    </div></div>`;
  }
  const gradients = {
    blackhole: 'radial-gradient(circle at 50% 50%, #000 0 14%, rgba(255,170,90,.55) 18%, rgba(120,80,200,.25) 30%, #04060f 68%)',
    star: `radial-gradient(circle at 50% 50%, #fff 0 6%, hsl(${h} 90% 70%) 22%, rgba(139,92,246,.18) 52%, #04060f 74%)`,
    smallbody: 'radial-gradient(circle at 72% 38%, #e8f6ff 0 3%, rgba(120,200,255,.4) 12%, transparent 46%), #05070f',
    mission: 'radial-gradient(circle at 30% 30%, rgba(139,92,246,.4), transparent 60%), radial-gradient(circle at 70% 70%, rgba(79,209,232,.3), transparent 55%), #05070f',
    concept: 'radial-gradient(circle at 40% 40%, rgba(139,92,246,.4), transparent 55%), radial-gradient(circle at 65% 60%, rgba(79,209,232,.3), transparent 50%), #05070f'
  };
  return `<div class="ov-visual"><div style="position:absolute;inset:0;background:${gradients[kind] || gradients.concept};display:grid;place-items:center">
    <svg style="width:34%;height:34%;color:#d9d2ff;opacity:.9" aria-hidden="true"><use href="#${OV_ICON[kind] || 'i-orbit'}"/></svg>
  </div><span class="label">Scientific visualisation</span></div>`;
}

function detailSections(kind, item) {
  const parts = [];
  const push = (title, body) => { if (body) parts.push(`<div class="ov-section"><h2>${title}</h2><p>${body}</p></div>`); };
  if (kind === 'planet' || kind === 'dwarf') {
    push('Surface characteristics', item.surface);
    push('Atmosphere', item.atmosphere);
    push('Discovery & exploration', item.history);
  } else if (kind === 'moon') {
    push('Surface', item.surface);
    push('Atmosphere', item.atmosphere);
    push('Why it matters', item.importance);
  } else if (kind === 'galaxy') {
    push('Structure', item.structure);
  } else if (kind === 'nebula') {
    push('How it formed & what we learn', item.science);
  } else if (kind === 'star') {
    push('How it forms & evolves', item.description);
  } else if (kind === 'smallbody') {
    push('Why it matters', item.description);
  } else if (kind === 'mission') {
    push('Mission overview', item.description);
  } else if (kind === 'blackhole') {
    push('What we know', item.description);
  } else if (kind === 'concept') {
    push('Summary', item.description);
  }
  return parts.join('');
}

function relatedMarkup(kind, item) {
  const list = LISTS[kind] || [];
  const i = list.findIndex(x => x.id === item.id);
  if (i < 0 || list.length < 2) return '';
  const prev = list[(i - 1 + list.length) % list.length], next = list[(i + 1) % list.length];
  return `<div class="ov-section"><h2>Continue exploring</h2>
    <div class="ov-related">
      <button data-object="${prev.id}">← ${prev.name}</button>
      <button data-object="${next.id}">${next.name} →</button>
    </div></div>`;
}

/* ---------------- object detail view ---------------- */
async function openObject(id, opts = {}) {
  const found = findObject(id);
  if (!found) return;
  current = found;
  const { kind, item } = found;
  if (!objectView || !ovContent) return;
  if (!opts.silent) lastFocus = document.activeElement;
  const can3d = ['planet', 'dwarf', 'moon'].includes(kind);
  const back = BACK[kind];
  const rows = stats(kind, item);
  const description = item.description || item.tagline || item.importance || '';
  const facts = (item.facts || []).map(f => `<li>${f}</li>`).join('');
  const nextKind = LISTS[kind] ? kind : 'concept';

  objectView.classList.add('open');
  objectView.scrollTop = 0;
  syncScroll();
  ovContent.innerHTML = `
    <div class="ov-hero">
      ${visualMarkup(kind, item)}
      <div class="ov-copy">
        <span class="kind">${KIND_LABEL[kind]} · ${item.type || item.agency || 'COSMOS archive'}</span>
        <h1 id="ov-title">${item.name}</h1>
        <p class="tagline">${item.tagline || (description ? description.split('. ')[0] + '.' : '')}</p>
        <div class="actions">
          ${can3d ? `<button class="btn btn-primary" id="ov-3d">Explore in 3D <svg aria-hidden="true"><use href="#i-expand"/></svg></button>` : ''}
          <button class="btn btn-ghost" id="ov-back">Back to ${back[0]}</button>
        </div>
        ${rows.length ? `<dl class="ov-stats">${rows.map(([k, v]) => `<div class="ov-stat"><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl>` : ''}
      </div>
    </div>
    <div class="ov-section"><h2>Overview</h2><p>${description}</p></div>
    ${detailSections(kind, item)}
    ${facts ? `<div class="ov-section"><h2>Key facts</h2><ul class="ov-facts">${facts}</ul></div>` : ''}
    ${sourceLinks(item)}
    ${relatedMarkup(kind, item)}
  `;

  if (can3d) {
    const slot = $('#ov-visual-slot');
    if (slot) slot.appendChild(ovCanvas);
    try {
      if (!ovViewer) ovViewer = await initPlanetViewer(ovCanvas);
      if (ovViewer) { ovViewer.show(item); ovViewer.resize(); }
      else fallbackScene(ovCanvas, 'Interactive 3D is unavailable — WebGL could not start in this browser.');
    } catch (e) { fallbackScene(ovCanvas, 'Interactive 3D is unavailable in this browser.'); }
  }
  $('#ov-3d')?.addEventListener('click', () => openViewer(item));
  $('#ov-back')?.addEventListener('click', () => {
    closeObject();
    const target = $(back[1]);
    target?.scrollIntoView({ behavior: motionOK() ? 'smooth' : 'auto' });
  });
  $('#ov-close')?.focus({ preventScroll: true });
  if (!opts.noHash && location.hash !== `#/object/${item.id}`) {
    history.pushState({ object: item.id }, '', `#/object/${item.id}`);
  }
  // keep nextKind referenced for clarity of routing category
  void nextKind;
}

function closeObject(fromHistory = false) {
  if (!objectView || !objectView.classList.contains('open')) return;
  objectView.classList.remove('open');
  ovViewer?.clear();
  toggleViewer(false);
  if (!fromHistory && location.hash.startsWith('#/object/')) {
    history.replaceState(null, '', location.pathname + location.search);
  }
  syncScroll();
  lastFocus?.focus?.({ preventScroll: true });
}

/* ---------------- fullscreen 3D viewer ---------------- */
async function openViewer(body) {
  if (!modal) return;
  $('#viewer-title') && ($('#viewer-title').textContent = String(body.name || 'object').toUpperCase());
  const loading = $('#viewer-loading');
  if (loading) loading.style.display = 'grid';
  modal.classList.add('open');
  syncScroll();
  const canvas = $('#viewer-canvas');
  try {
    if (!modalViewer) {
      modalViewer = await initPlanetViewer(canvas, () => { if (loading) loading.style.display = 'none'; });
    }
    if (modalViewer) { modalViewer.show(body); modalViewer.resize(); }
    else {
      if (loading) loading.textContent = '3D unavailable in this browser';
      fallbackScene(canvas, 'WebGL is unavailable, so the interactive model cannot start.');
    }
  } catch (e) {
    if (loading) loading.textContent = '3D unavailable in this browser';
  }
  $('#viewer-close')?.focus({ preventScroll: true });
}
function toggleViewer(open) {
  modal?.classList.toggle('open', open);
  if (!open) modalViewer?.clear();
  syncScroll();
}

/* ---------------- solar scene wiring ---------------- */
function wireSolarControls() {
  const speed = $('#solar-speed'), out = $('#solar-speed-out');
  const value = () => 0.2 + (Number(speed?.value || 28) / 100) * 5.8;
  const applySpeed = () => {
    const v = value();
    if (out) out.textContent = `${v.toFixed(1)}×`;
    solarCtrl?.setSpeed(v);
  };
  speed?.addEventListener('input', applySpeed);
  applySpeed();

  const toggle = $('#solar-toggle');
  toggle?.addEventListener('click', () => {
    const pressed = toggle.getAttribute('aria-pressed') === 'true';
    const next = !pressed;
    toggle.setAttribute('aria-pressed', String(next));
    toggle.innerHTML = `<svg aria-hidden="true"><use href="#${next ? 'i-play' : 'i-pause'}"/></svg><span>${next ? 'Play' : 'Pause'}</span>`;
    solarCtrl?.setPaused(next);
  });
  const orbits = $('#solar-orbits');
  orbits?.classList.add('active');
  orbits?.addEventListener('click', () => {
    const pressed = orbits.getAttribute('aria-pressed') === 'true';
    const next = !pressed;
    orbits.setAttribute('aria-pressed', String(next));
    orbits.classList.toggle('active', next);
    solarCtrl?.setOrbits(next);
  });
  const scaleBtn = $('#solar-scale');
  scaleBtn?.addEventListener('click', () => {
    const distance = scaleBtn.getAttribute('aria-pressed') !== 'true';
    scaleBtn.setAttribute('aria-pressed', String(distance));
    scaleBtn.textContent = distance ? 'Orbit view' : 'Distance view';
    scaleBtn.classList.toggle('active', distance);
    solarCtrl?.setScaleMode(distance ? 'distance' : 'compressed');
  });
  $('#solar-reset')?.addEventListener('click', () => {
    solarCtrl?.reset();
    if (speed) speed.value = '28';
    if (out) out.textContent = '1.8×';
    solarCtrl?.setSpeed(0.2 + 0.28 * 5.8);
    solarCtrl?.setPaused(false);
    if (toggle) {
      toggle.setAttribute('aria-pressed', 'false');
      toggle.innerHTML = '<svg aria-hidden="true"><use href="#i-pause"/></svg><span>Pause</span>';
    }
  });
}

/* ---------------- lazy scene boot ---------------- */
function whenVisible(el, cb, margin = '240px') {
  if (!el) return;
  if (!('IntersectionObserver' in window)) { cb(); return; }
  const io = new IntersectionObserver(entries => {
    if (entries[0].isIntersecting) { io.disconnect(); cb(); }
  }, { rootMargin: margin });
  io.observe(el);
}

function boot() {
  renderCatalogues();
  wireSolarControls();
  initSearch(openObject);
  initChrome();
  initSimulator();
  initQuiz();
  initGlossary();
  initFacts();
  initLifecycle();

  // hero
  const heroCanvas = $('#hero-canvas');
  initHero(heroCanvas).then(ctrl => {
    if (!ctrl) fallbackScene(heroCanvas, 'WebGL is unavailable — showing the CSS starfield instead.');
  }).catch(() => fallbackScene(heroCanvas, 'WebGL is unavailable in this browser.'));

  // galaxy
  whenVisible($('#galaxy-canvas'), () => {
    initGalaxy($('#galaxy-canvas')).then(ctrl => {
      if (!ctrl) fallbackScene($('#galaxy-canvas'), '3D galaxy unavailable in this browser.');
    }).catch(() => fallbackScene($('#galaxy-canvas'), '3D galaxy unavailable in this browser.'));
  });

  // solar system
  whenVisible($('#solar-canvas'), () => {
    initSolar($('#solar-canvas'), planets, body => openObject(body.id)).then(ctrl => {
      if (!ctrl) { fallbackScene($('#solar-canvas'), 'The interactive Solar System needs WebGL. Planet data remains available below.'); return; }
      solarCtrl = ctrl;
      solarCtrl.setSpeed(0.2 + (Number($('#solar-speed')?.value || 28) / 100) * 5.8);
      const toggle = $('#solar-toggle');
      if (toggle) toggle.innerHTML = '<svg aria-hidden="true"><use href="#i-pause"/></svg><span>Pause</span>';
    }).catch(() => fallbackScene($('#solar-canvas'), 'The interactive Solar System could not start.'));
  }, '320px');

  // black hole
  whenVisible($('#bh-canvas'), () => {
    bhCtrl = initBlackHole($('#bh-canvas'));
    if (!bhCtrl) fallbackScene($('#bh-canvas'), 'Animated visualisation unavailable in this browser.');
  });

  // global object links
  document.addEventListener('click', e => {
    const el = e.target.closest('[data-object]');
    if (el) { e.preventDefault(); openObject(el.dataset.object); }
    const open = e.target.closest('[data-open]');
    if (open) openObject(open.dataset.open);
  });

  // overlays
  $('#ov-close')?.addEventListener('click', () => closeObject());
  $('#ov-prev')?.addEventListener('click', () => step(-1));
  $('#ov-next')?.addEventListener('click', () => step(1));
  $('#viewer-close')?.addEventListener('click', () => { toggleViewer(false); lastFocus?.focus?.({ preventScroll: true }); });
  document.addEventListener('keydown', e => {
    if (e.key !== 'Escape') return;
    if (modal?.classList.contains('open')) { toggleViewer(false); return; }
    if (objectView?.classList.contains('open')) closeObject();
  });
  window.addEventListener('popstate', () => {
    if (location.hash.startsWith('#/object/')) {
      openObject(location.hash.replace('#/object/', ''), { silent: true, noHash: true });
    } else {
      closeObject(true);
    }
  });
  if (location.hash.startsWith('#/object/')) {
    setTimeout(() => openObject(location.hash.replace('#/object/', ''), { silent: true, noHash: true }), 120);
  }

  // entrance
  window.addEventListener('load', () => setTimeout(() => {
    $('#preloader')?.classList.add('done');
    setTimeout(() => $('#preloader')?.remove(), 900);
  }, 500));
  if (document.readyState === 'complete') {
    setTimeout(() => { $('#preloader')?.classList.add('done'); setTimeout(() => $('#preloader')?.remove(), 900); }, 500);
  }
}

function step(dir) {
  if (!current) return;
  const list = LISTS[current.kind];
  if (!list || !list.length) return;
  const i = list.findIndex(x => x.id === current.item.id);
  const next = list[(i + dir + list.length) % list.length];
  openObject(next.id);
}

boot();
