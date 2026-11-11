// COSMOS — catalogue rendering, search, navigation and page chrome.
import {
  planets, dwarfPlanets, galaxies, nebulae, blackHoles, blackHolePhysics, starTypes,
  moons, smallBodies, agencies, missions, universeConcepts, cosmicScale, searchIndex
} from './data.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const TYPE_ICON = {
  body: 'i-planet', galaxy: 'i-galaxy', moon: 'i-moon', nebula: 'i-nebula',
  blackhole: 'i-blackhole', star: 'i-star', smallbody: 'i-comet', mission: 'i-rocket', concept: 'i-orbit'
};
const icon = (id, cls = '') => `<svg class="${cls}" aria-hidden="true"><use href="#${id}"/></svg>`;
const hueOf = text => [...text].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 360, 7);

const categories = [
  { name: 'Universe', icon: 'i-orbit', href: '#universe', count: `${universeConcepts.length} concepts` },
  { name: 'Galaxies', icon: 'i-galaxy', href: '#galaxies', count: `${galaxies.length} galaxies` },
  { name: 'Solar System', icon: 'i-sun', href: '#explorer', count: 'Live 3D model' },
  { name: 'Planets', icon: 'i-planet', href: '#solar-system', count: `${planets.length} worlds` },
  { name: 'Stars', icon: 'i-star', href: '#stars', count: `${starTypes.length} stellar types` },
  { name: 'Moons', icon: 'i-moon', href: '#moons', count: `${moons.length} moons` },
  { name: 'Nebulae', icon: 'i-nebula', href: '#nebulae', count: `${nebulae.length} nebulae` },
  { name: 'Black Holes', icon: 'i-blackhole', href: '#blackholes', count: 'Extreme gravity' },
  { name: 'Asteroids & Comets', icon: 'i-comet', href: '#smallbodies', count: `${smallBodies.length} small bodies` },
  { name: 'Space Exploration', icon: 'i-rocket', href: '#missions', count: `${missions.length} missions` }
];

/* ---------------- card templates ---------------- */
function planetCard(p) {
  const c1 = p.palette?.base || '#8b5cf6';
  const c2 = p.palette?.dark || '#1b1440';
  return `<button class="card" data-object="${p.id}" aria-label="Open ${p.name} profile">
    <div class="card-visual planet-visual">
      <div class="planet-orb" style="--c1:${c1};--c2:${c2}"></div>
      ${p.ring ? '<div class="planet-ring"></div>' : ''}
    </div>
    <div class="card-body">
      <div class="card-topline"><span>${p.type}</span><span>${p.kind === 'dwarf' ? 'Dwarf' : 'Planet'}</span></div>
      <h3>${p.name}</h3>
      <p>${p.tagline}</p>
      <div class="card-meta">
        <div><dt>Diameter</dt><dd>${p.diameter}</dd></div>
        <div><dt>Gravity</dt><dd>${p.gravity}</dd></div>
      </div>
      <span class="card-link">Open profile ${icon('i-arrow')}</span>
    </div>
  </button>`;
}

function galaxyCard(g) {
  const h = hueOf(g.name);
  return `<button class="card" data-object="${g.id}" aria-label="Open ${g.name}">
    <div class="card-visual galaxy-visual">
      <div class="galaxy-orb" style="--g1:hsl(${h} 85% 72%);--g2:hsl(${(h + 55) % 360} 85% 62%)"></div>
      <div class="galaxy-core"></div>
    </div>
    <div class="card-body">
      <div class="card-topline"><span>${g.alt}</span><span>Galaxy</span></div>
      <h3>${g.name}</h3>
      <p>${g.description.split('. ')[0]}.</p>
      <div class="card-meta">
        <div><dt>Distance</dt><dd>${g.distance.replace('We are inside it — ', '').slice(0, 44)}</dd></div>
        <div><dt>Type</dt><dd>${g.type.split('(')[0]}</dd></div>
      </div>
      <span class="card-link">Explore galaxy ${icon('i-arrow')}</span>
    </div>
  </button>`;
}

function moonCard(m) {
  const cls = m.palette?.cracks ? 'cracks' : m.palette?.craters ? 'craters' : '';
  return `<button class="card moon-card" data-object="${m.id}" aria-label="Open ${m.name}">
    <div class="card-visual">
      <div class="moon-orb ${cls}" style="--c1:${m.palette?.base || '#b9b6b0'};--c2:${m.palette?.dark || '#5d5a56'}"></div>
    </div>
    <div class="card-body">
      <div class="card-topline"><span>Moon of ${m.parent}</span><span>Satellite</span></div>
      <h3>${m.name}</h3>
      <p>${m.importance.split('. ')[0]}.</p>
      <div class="card-meta">
        <div><dt>Diameter</dt><dd>${m.diameter}</dd></div>
        <div><dt>Orbit</dt><dd>${m.period}</dd></div>
      </div>
      <span class="card-link">Open profile ${icon('i-arrow')}</span>
    </div>
  </button>`;
}

function nebulaCard(n) {
  const h = hueOf(n.name);
  const fallback = `background:
    radial-gradient(ellipse at 30% 40%, hsla(${h},90%,65%,.6), transparent 55%),
    radial-gradient(ellipse at 70% 62%, hsla(${(h + 70) % 360},90%,60%,.45), transparent 55%),
    radial-gradient(ellipse at 55% 25%, hsla(${(h + 140) % 360},85%,60%,.35), transparent 45%),
    #07040f;`;
  return `<button class="card" data-object="${n.id}" aria-label="Open ${n.name}">
    <div class="card-visual">
      <div class="nebula-visual">
        <div class="fallback" style="${fallback}"></div>
        ${n.image ? `<img src="${n.image}" alt="${n.name} — NASA/ESA astronomical image" loading="lazy" onerror="this.style.display='none'" />` : ''}
      </div>
    </div>
    <div class="card-body">
      <div class="card-topline"><span>${n.alt}</span><span>Nebula</span></div>
      <h3>${n.name}</h3>
      <p>${n.description.split('. ')[0]}.</p>
      <div class="card-meta">
        <div><dt>Distance</dt><dd>${n.distance}</dd></div>
        <div><dt>Type</dt><dd>${n.type}</dd></div>
      </div>
      <span class="card-link">Enter the nebula ${icon('i-arrow')}</span>
    </div>
  </button>`;
}

function smallBodyCard(s) {
  return `<button class="card" data-object="${s.id}" aria-label="Open ${s.name}">
    <div class="card-visual"><div class="comet-visual"></div></div>
    <div class="card-body">
      <div class="card-topline"><span>${s.type.split('(')[0]}</span><span>Small body</span></div>
      <h3>${s.name}</h3>
      <p>${s.description.split('. ')[0]}.</p>
      <div class="card-meta">
        <div><dt>Size</dt><dd>${s.size}</dd></div>
        <div><dt>Distance</dt><dd>${s.distance}</dd></div>
      </div>
      <span class="card-link">Open profile ${icon('i-arrow')}</span>
    </div>
  </button>`;
}

function starCard(s) {
  const colors = {
    sun: '#ffd479', 'red-dwarf': '#ff8b6b', 'yellow-dwarf': '#ffe38a', 'blue-giant': '#9fc7ff',
    'red-giant': '#ff7a4d', supergiant: '#ffb59c', 'white-dwarf': '#e8f3ff', 'neutron-star': '#cfe3ff',
    pulsar: '#9fe8ff', 'binary-star': '#ffd9a8', 'variable-star': '#ffc2f0', protostar: '#ffb27a'
  };
  const sc = colors[s.id] || '#ffd479';
  return `<button class="card star-card" data-object="${s.id}" aria-label="Open ${s.name}">
    <div class="star-orb" style="--sc:${sc}"></div>
    <h3>${s.name}</h3>
    <div class="type">${s.type}</div>
    <p>${s.description}</p>
    <dl>
      <div><dt>Surface</dt><dd>${s.temp}</dd></div>
      <div><dt>Mass</dt><dd>${s.mass}</dd></div>
    </dl>
  </button>`;
}

function blackHoleCard(b) {
  return `<button class="card" data-object="${b.id}" aria-label="Open ${b.name}">
    <div class="card-visual" style="background:radial-gradient(circle at 50% 50%, #000 0 18%, rgba(255,170,90,.35) 22%, transparent 30%), radial-gradient(circle at 50% 50%, #150b23, #04060f 70%)">
      <div style="position:absolute;inset:0;background:radial-gradient(ellipse at 50% 50%, transparent 24%, rgba(255,176,96,.25) 26%, transparent 42%);filter:blur(6px)"></div>
    </div>
    <div class="card-body">
      <div class="card-topline"><span>${b.type}</span><span>${b.status}</span></div>
      <h3>${b.name}</h3>
      <p>${b.description.split('. ')[0]}.</p>
      <div class="card-meta">
        <div><dt>Mass</dt><dd>${b.mass}</dd></div>
        <div><dt>Distance</dt><dd>${b.distance.length > 46 ? b.distance.slice(0, 44) + '…' : b.distance}</dd></div>
      </div>
      <span class="card-link">Open profile ${icon('i-arrow')}</span>
    </div>
  </button>`;
}

/* ---------------- renderers ---------------- */
export function renderCatalogues() {
  const cat = $('#category-grid');
  if (cat) cat.innerHTML = categories.map((c, i) => `
    <a class="category-card" href="${c.href}">
      <span class="idx">${String(i + 1).padStart(2, '0')} / ${c.name.toUpperCase()}</span>
      ${icon(c.icon, 'icon')}
      <div><h3>${c.name}</h3><span class="count">${c.count}</span></div>
    </a>`).join('');

  const conceptGrid = $('#concept-grid');
  if (conceptGrid) conceptGrid.innerHTML = universeConcepts.map(c => `
    <article class="concept-card">
      <span class="tag">${c.status}</span>
      <h3>${c.name}</h3>
      <span class="stat">${c.stat}</span>
      <p>${c.description}</p>
    </article>`).join('');

  $('#planet-grid') && ($('#planet-grid').innerHTML = planets.map(planetCard).join(''));
  $('#dwarf-grid') && ($('#dwarf-grid').innerHTML = dwarfPlanets.map(planetCard).join(''));
  $('#galaxy-grid') && ($('#galaxy-grid').innerHTML = galaxies.map(galaxyCard).join(''));
  $('#moon-grid') && ($('#moon-grid').innerHTML = moons.map(moonCard).join(''));
  $('#nebula-grid') && ($('#nebula-grid').innerHTML = nebulae.map(nebulaCard).join(''));
  $('#star-grid') && ($('#star-grid').innerHTML = starTypes.map(starCard).join(''));
  $('#smallbody-grid') && ($('#smallbody-grid').innerHTML = smallBodies.map(smallBodyCard).join(''));
  $('#blackhole-grid') && ($('#blackhole-grid').innerHTML = blackHoles.map(blackHoleCard).join(''));

  const bhObjects = $('#bh-objects');
  if (bhObjects) bhObjects.innerHTML = blackHoles.map(b => `
    <button class="bh-object" data-object="${b.id}">
      <strong>${b.name}</strong>
      <span>${b.status} · ${b.type}</span>
    </button>`).join('');

  const physics = $('#physics-list');
  if (physics) physics.innerHTML = blackHolePhysics.map(p => `
    <article class="physics-item">
      <h4>${p.name}<span class="status ${/observed|confirmed/i.test(p.status) ? 'observed' : 'theory'}">${p.status}</span></h4>
      <p>${p.description}</p>
      <p class="small" style="margin-top:6px">${p.note}</p>
    </article>`).join('');

  const agenciesEl = $('#agency-grid');
  if (agenciesEl) agenciesEl.innerHTML = agencies.map(a => `
    <article class="agency-card">
      <strong>${a.name}</strong>
      <div class="full">${a.full}</div>
      <div class="meta">${a.country} · ${a.founded}</div>
      <p>${a.focus}</p>
    </article>`).join('');

  const timeline = $('#timeline');
  if (timeline) timeline.innerHTML = missions.map(m => `
    <button class="timeline-item" data-object="${m.id}" aria-label="Open ${m.name}">
      <div class="row"><span class="year">${m.year}</span><h4>${m.name}</h4><span class="agency">${m.agency}</span></div>
      <p>${m.description}</p>
      <div class="fact">${m.facts[0]}</div>
    </button>`).join('');

  const scale = $('#scale-slider');
  if (scale) {
    scale.max = String(cosmicScale.length - 1);
    scale.value = '2';
    updateScale(2);
  }
  const year = $('#year');
  if (year) year.textContent = String(new Date().getFullYear());
}

function updateScale(i) {
  const item = cosmicScale[i];
  if (!item) return;
  $('#scale-name') && ($('#scale-name').textContent = item.name);
  $('#scale-value') && ($('#scale-value').textContent = item.label);
}

/* ---------------- search ---------------- */
export function initSearch(onOpen) {
  const overlay = $('#search-overlay'), input = $('#search-input'), resultsEl = $('#search-results'), filtersEl = $('#search-filters');
  if (!overlay || !input || !resultsEl) return;
  const cats = ['All', ...new Set(searchIndex.map(i => i.category))];
  let filter = 'All', focused = -1, shown = [];

  filtersEl.innerHTML = cats.map((c, i) => `<button class="chip${i === 0 ? ' active' : ''}" data-filter="${c}">${c}</button>`).join('');

  function render() {
    const q = input.value.trim().toLowerCase();
    shown = searchIndex
      .filter(i => filter === 'All' || i.category === filter)
      .filter(i => !q || i.name.toLowerCase().includes(q) || i.category.toLowerCase().includes(q) || i.detail.toLowerCase().includes(q))
      .sort((a, b) => a.name.localeCompare(b.name))
      .slice(0, 40);
    focused = -1;
    resultsEl.innerHTML = shown.length
      ? shown.map((r, i) => `
        <button class="search-item" data-id="${r.id}" data-index="${i}">
          <span class="si-icon">${icon(TYPE_ICON[r.type] || 'i-orbit')}</span>
          <span><strong>${r.name}</strong><small>${r.detail}</small></span>
          <span class="cat">${r.category}</span>
        </button>`).join('')
      : `<div class="search-empty">No objects match “${input.value.trim()}”. Try “Mars”, “nebula” or “JWST”.</div>`;
  }
  function open() {
    overlay.classList.add('open');
    document.body.classList.add('no-scroll');
    render();
    setTimeout(() => input.focus(), 60);
  }
  function close() {
    overlay.classList.remove('open');
    document.body.classList.remove('no-scroll');
    input.value = '';
  }
  function choose(id) {
    close();
    onOpen(id);
  }

  $('#search-open')?.addEventListener('click', open);
  $('#search-close')?.addEventListener('click', close);
  overlay.addEventListener('click', e => { if (e.target === overlay) close(); });
  input.addEventListener('input', render);
  filtersEl.addEventListener('click', e => {
    const chip = e.target.closest('.chip');
    if (!chip) return;
    filter = chip.dataset.filter;
    $$('.chip', filtersEl).forEach(c => c.classList.toggle('active', c === chip));
    render();
  });
  resultsEl.addEventListener('click', e => {
    const item = e.target.closest('.search-item');
    if (item) choose(item.dataset.id);
  });
  document.addEventListener('keydown', e => {
    const mod = e.metaKey || e.ctrlKey;
    if (mod && e.key.toLowerCase() === 'k') { e.preventDefault(); overlay.classList.contains('open') ? close() : open(); }
    if (!overlay.classList.contains('open')) return;
    if (e.key === 'Escape') close();
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
      e.preventDefault();
      if (!shown.length) return;
      focused = (focused + (e.key === 'ArrowDown' ? 1 : -1) + shown.length) % shown.length;
      $$('.search-item', resultsEl).forEach((el, i) => el.classList.toggle('focused', i === focused));
      $$('.search-item', resultsEl)[focused]?.scrollIntoView({ block: 'nearest' });
    }
    if (e.key === 'Enter' && focused >= 0) { e.preventDefault(); choose(shown[focused].id); }
  });

  return { open, close };
}

/* ---------------- header, nav, reveals ---------------- */
export function initChrome() {
  const header = $('#site-header');
  const onScroll = () => header?.classList.toggle('scrolled', window.scrollY > 24);
  onScroll(); window.addEventListener('scroll', onScroll, { passive: true });

  const menu = $('#mobile-menu'), openBtn = $('#menu-open'), closeBtn = $('#menu-close');
  const setMenu = v => {
    menu?.classList.toggle('open', v);
    menu?.setAttribute('aria-hidden', String(!v));
    openBtn?.setAttribute('aria-expanded', String(v));
    document.body.classList.toggle('no-scroll', v);
  };
  openBtn?.addEventListener('click', () => setMenu(true));
  closeBtn?.addEventListener('click', () => setMenu(false));
  $$('a', menu || document.createElement('div')).forEach(a => a.addEventListener('click', () => setMenu(false)));

  const sections = $$('main section[id]');
  const navLinks = $$('.nav-links a');
  if ('IntersectionObserver' in window) {
    const io = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(a => a.classList.toggle('active', a.getAttribute('href') === `#${entry.target.id}`));
      });
    }, { rootMargin: '-45% 0px -48% 0px' });
    sections.forEach(s => io.observe(s));
  }

  const revealIO = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('in'); revealIO.unobserve(e.target); } });
  }, { threshold: 0.08 });
  $$('.reveal').forEach(el => revealIO.observe(el));

  const scaleSlider = $('#scale-slider');
  scaleSlider?.addEventListener('input', e => updateScale(Number(e.target.value)));
  $('#scale-jump')?.addEventListener('click', () => {
    document.querySelector('.scale-panel')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });

}
