// COSMOS — Space Lab simulations, quiz, glossary, facts and stellar lifecycle.
import { glossary, quiz, dailyFacts, starLifeCycle } from './data.js';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];

/* ============================ SPACE LAB ============================ */
const SIM_INFO = {
  orbits: {
    title: 'Planetary orbits',
    desc: 'Planets sweep along elliptical orbits, moving faster when closer to the Sun. Orbital radius is compressed for visibility; relative orbital speeds follow Kepler’s laws.',
    readout: () => [['Bodies', '8 planets'], ['Speed', 'Keplerian'], ['Distance', 'Log-compressed']]
  },
  phases: {
    title: 'Moon phases',
    desc: 'The Moon does not change shape — we see different fractions of its sunlit half as it orbits Earth. One complete cycle takes about 29.5 days.',
    readout: () => [['Cycle', '29.5 days'], ['Orbit', '27.3 days'], ['Light', 'Reflected sunlight']]
  },
  eclipse: {
    title: 'Solar & lunar eclipses',
    desc: 'A solar eclipse happens when the Moon passes between Earth and the Sun. A lunar eclipse happens when Earth’s shadow falls across the Moon. Both require near-perfect alignment.',
    readout: () => [['Solar eclipse', 'At new Moon'], ['Lunar eclipse', 'At full Moon'], ['Alignment', 'Sun–Earth–Moon']]
  },
  seasons: {
    title: 'Seasons',
    desc: 'Seasons come from Earth’s 23.44° axial tilt, not from distance to the Sun. As Earth orbits, each hemisphere receives sunlight at a different angle.',
    readout: () => [['Axial tilt', '23.44°'], ['Orbit', '365.25 days'], ['Cause', 'Sun angle / day length']]
  },
  gravity: {
    title: 'Surface gravity',
    desc: 'Surface gravity depends on mass and radius. Your weight on another world is your mass multiplied by its surface gravity. Mass itself never changes.',
    readout: () => [['Reference', 'Earth 9.81 m/s²'], ['Your mass', '70 kg'], ['Your weight', '686 N on Earth']]
  }
};

let sim = null;
export function initSimulator() {
  const canvas = $('#sim-canvas');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
  let mode = 'orbits', playing = true, speed = 1, t = 0, raf = 0, visible = true;

  const bodies = [
    { name: 'Mercury', r: 3.7, c: '#b9ada0' }, { name: 'Venus', r: 8.87, c: '#e6cf9b' },
    { name: 'Earth', r: 9.81, c: '#4f9cff' }, { name: 'Moon', r: 1.62, c: '#b9b6b0' },
    { name: 'Mars', r: 3.72, c: '#d97550' }, { name: 'Jupiter', r: 24.79, c: '#d8b98f' },
    { name: 'Saturn', r: 10.44, c: '#e3d3a8' }, { name: 'Uranus', r: 8.87, c: '#a9e0e6' },
    { name: 'Neptune', r: 11.15, c: '#4f79d8' }
  ];

  function resize() {
    const rect = canvas.getBoundingClientRect();
    w = rect.width; h = rect.height;
    if (!w || !h) return;
    canvas.width = Math.round(w * dpr); canvas.height = Math.round(h * dpr);
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
  }
  const ro = new ResizeObserver(resize); ro.observe(canvas); resize();
  const io = new IntersectionObserver(e => { visible = e[0].isIntersecting; }, { threshold: 0.02 });
  io.observe(canvas);

  function backdrop() {
    ctx.clearRect(0, 0, w, h);
    const g = ctx.createRadialGradient(w / 2, h / 2, 0, w / 2, h / 2, Math.max(w, h) * 0.7);
    g.addColorStop(0, 'rgba(24,34,72,0.55)');
    g.addColorStop(1, 'rgba(4,6,15,0)');
    ctx.fillStyle = g; ctx.fillRect(0, 0, w, h);
  }
  function label(text, x, y, color = 'rgba(200,215,255,0.8)', size = 10, align = 'center') {
    ctx.fillStyle = color;
    ctx.font = `500 ${size}px "JetBrains Mono", monospace`;
    ctx.textAlign = align; ctx.textBaseline = 'middle';
    ctx.fillText(text, x, y);
  }

  function drawOrbits() {
    const cx = w / 2, cy = h / 2;
    const maxR = Math.min(w, h) * 0.4;
    const sunR = Math.max(8, Math.min(w, h) * 0.028);
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, sunR * 3.4);
    g.addColorStop(0, '#fff6d8'); g.addColorStop(0.3, 'rgba(255,200,100,0.9)'); g.addColorStop(1, 'rgba(255,140,50,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, sunR * 3.4, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffe4a3'; ctx.beginPath(); ctx.arc(cx, cy, sunR, 0, Math.PI * 2); ctx.fill();

    const data = [
      { n: 'Mercury', a: 0.387, size: 2.4, c: '#b9ada0' }, { n: 'Venus', a: 0.723, size: 3.4, c: '#e6cf9b' },
      { n: 'Earth', a: 1, size: 3.6, c: '#5aa9ff' }, { n: 'Mars', a: 1.524, size: 2.9, c: '#d97550' },
      { n: 'Jupiter', a: 5.2, size: 7.2, c: '#d8b98f' }, { n: 'Saturn', a: 9.58, size: 6.2, c: '#e3d3a8' },
      { n: 'Uranus', a: 19.2, size: 5, c: '#a9e0e6' }, { n: 'Neptune', a: 30.1, size: 4.8, c: '#4f79d8' }
    ];
    data.forEach((p, i) => {
      const rr = maxR * (0.18 + Math.log10(1 + p.a) / Math.log10(31) * 0.82);
      ctx.strokeStyle = 'rgba(120,150,255,0.16)';
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.arc(cx, cy, rr, 0, Math.PI * 2); ctx.stroke();
      const ang = t * (0.6 / Math.pow(p.a, 0.6)) + i * 1.3;
      const x = cx + Math.cos(ang) * rr, y = cy + Math.sin(ang) * rr;
      ctx.fillStyle = p.c;
      ctx.beginPath(); ctx.arc(x, y, p.size, 0, Math.PI * 2); ctx.fill();
      if (w > 520) label(p.n, x, y - 12, 'rgba(190,205,240,0.55)', 8);
    });
  }

  function drawPhaseDisc(x, y, r, phase) {
    ctx.save();
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.clip();
    ctx.fillStyle = '#121a30'; ctx.fillRect(x - r, y - r, r * 2, r * 2);
    const k = Math.cos(phase * Math.PI * 2);
    ctx.fillStyle = '#e2ebff';
    ctx.beginPath();
    ctx.arc(x, y, r, -Math.PI / 2, Math.PI / 2, false);
    ctx.ellipse(x, y, Math.abs(k) * r, r, 0, Math.PI / 2, -Math.PI / 2, k > 0);
    ctx.fill();
    ctx.restore();
    ctx.strokeStyle = 'rgba(160,185,255,0.3)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.arc(x, y, r, 0, Math.PI * 2); ctx.stroke();
  }

  function drawPhases() {
    const cx = w * 0.4, cy = h / 2;
    const orbit = Math.min(w, h) * 0.27;
    const er = Math.min(w, h) * 0.09;
    const eg = ctx.createRadialGradient(cx - er * 0.3, cy - er * 0.3, 0, cx, cy, er);
    eg.addColorStop(0, '#4f9cff'); eg.addColorStop(1, '#0b2250');
    ctx.fillStyle = eg; ctx.beginPath(); ctx.arc(cx, cy, er, 0, Math.PI * 2); ctx.fill();
    label('EARTH', cx, cy + er + 16, 'rgba(150,175,230,0.8)', 9);
    ctx.strokeStyle = 'rgba(140,170,255,0.22)'; ctx.setLineDash([3, 5]);
    ctx.beginPath(); ctx.arc(cx, cy, orbit, 0, Math.PI * 2); ctx.stroke(); ctx.setLineDash([]);

    const ang = t * 0.5 - Math.PI / 2;
    const mx = cx + Math.cos(ang) * orbit, my = cy + Math.sin(ang) * orbit;
    ctx.fillStyle = '#d7d4ce'; ctx.beginPath(); ctx.arc(mx, my, Math.min(w, h) * 0.032, 0, Math.PI * 2); ctx.fill();
    label('MOON', mx, my - 22, 'rgba(150,175,230,0.75)', 8);

    const phase = ((ang / (Math.PI * 2)) % 1 + 1) % 1;
    const px = w * 0.8, py = h * 0.36, pr = Math.min(w, h) * 0.13;
    drawPhaseDisc(px, py, pr, phase);
    const illum = Math.round((0.5 * (1 - Math.cos(phase * Math.PI * 2))) * 100);
    label(`${illum}% LIT`, px, py + pr + 20, 'rgba(200,215,255,0.8)', 10);
    const names = ['New Moon', 'Waxing Crescent', 'First Quarter', 'Waxing Gibbous', 'Full Moon', 'Waning Gibbous', 'Last Quarter', 'Waning Crescent'];
    label(names[Math.round(phase * 8) % 8], px, py - pr - 18, '#67e8f9', 11);
    label('As seen from Earth', px, py + pr + 38, 'rgba(140,160,200,0.6)', 8);
  }

  function drawEclipse() {
    const cy = h / 2;
    const sx = w * 0.16, ex = w * 0.55, orbit = Math.min(w, h) * 0.16;
    const sr = Math.min(w, h) * 0.075, er = Math.min(w, h) * 0.06;
    const g = ctx.createRadialGradient(sx, cy, 0, sx, cy, sr * 2.6);
    g.addColorStop(0, '#fff2c8'); g.addColorStop(1, 'rgba(255,170,60,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(sx, cy, sr * 2.6, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffdf9e'; ctx.beginPath(); ctx.arc(sx, cy, sr, 0, Math.PI * 2); ctx.fill();
    label('SUN', sx, cy + sr + 18, 'rgba(200,215,255,0.7)', 9);

    ctx.fillStyle = '#2b62b8'; ctx.beginPath(); ctx.arc(ex, cy, er, 0, Math.PI * 2); ctx.fill();
    label('EARTH', ex, cy + er + 18, 'rgba(200,215,255,0.7)', 9);

    const ang = t * 0.7;
    const mx = ex + Math.cos(ang) * orbit, my = cy + Math.sin(ang) * orbit;
    ctx.fillStyle = '#d6d3cd'; ctx.beginPath(); ctx.arc(mx, my, Math.min(w, h) * 0.028, 0, Math.PI * 2); ctx.fill();

    // umbra
    ctx.fillStyle = 'rgba(10,12,26,0.65)';
    ctx.beginPath();
    ctx.moveTo(ex + er * 0.9, cy - er * 0.9);
    ctx.lineTo(w, cy - er * 2.4);
    ctx.lineTo(w, cy + er * 2.4);
    ctx.lineTo(ex + er * 0.9, cy + er * 0.9);
    ctx.closePath(); ctx.fill();

    // sun rays to moon
    ctx.strokeStyle = 'rgba(255,220,150,0.18)'; ctx.lineWidth = 1;
    ctx.beginPath(); ctx.moveTo(sx + sr, cy - sr * 0.4); ctx.lineTo(mx, my - 6); ctx.stroke();
    ctx.beginPath(); ctx.moveTo(sx + sr, cy + sr * 0.4); ctx.lineTo(mx, my + 6); ctx.stroke();

    const near = Math.abs(Math.sin(ang));
    let message = 'Move the Moon toward alignment.';
    if (near > 0.97 && Math.cos(ang) < 0) message = 'SOLAR ECLIPSE — Moon between Sun and Earth';
    else if (near > 0.97 && Math.cos(ang) > 0) message = 'LUNAR ECLIPSE — Moon inside Earth’s shadow';
    label(message, w / 2, h - 24, near > 0.97 ? '#67e8f9' : 'rgba(160,180,220,0.7)', 10);
  }

  function drawSeasons() {
    const cx = w / 2, cy = h / 2;
    const orbit = Math.min(w, h) * 0.3;
    const sr = Math.min(w, h) * 0.055;
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, sr * 3);
    g.addColorStop(0, '#fff4cc'); g.addColorStop(1, 'rgba(255,180,70,0)');
    ctx.fillStyle = g; ctx.beginPath(); ctx.arc(cx, cy, sr * 3, 0, Math.PI * 2); ctx.fill();
    ctx.fillStyle = '#ffdf9e'; ctx.beginPath(); ctx.arc(cx, cy, sr, 0, Math.PI * 2); ctx.fill();

    ctx.strokeStyle = 'rgba(130,160,255,0.2)';
    ctx.beginPath(); ctx.arc(cx, cy, orbit, 0, Math.PI * 2); ctx.stroke();

    const ang = t * 0.28;
    const ex = cx + Math.cos(ang) * orbit, ey = cy + Math.sin(ang) * orbit;
    const er = Math.min(w, h) * 0.045;
    ctx.fillStyle = '#3d7fd4'; ctx.beginPath(); ctx.arc(ex, ey, er, 0, Math.PI * 2); ctx.fill();
    // axial tilt
    ctx.save(); ctx.translate(ex, ey); ctx.rotate(-0.41);
    ctx.strokeStyle = '#c4b5fd'; ctx.lineWidth = 1.6;
    ctx.beginPath(); ctx.moveTo(0, -er * 1.9); ctx.lineTo(0, er * 1.9); ctx.stroke();
    ctx.restore();

    const marks = [
      { a: -Math.PI / 2, n: 'June solstice' }, { a: 0, n: 'September equinox' },
      { a: Math.PI / 2, n: 'December solstice' }, { a: Math.PI, n: 'March equinox' }
    ];
    marks.forEach(m => {
      const x = cx + Math.cos(m.a) * (orbit + 34), y = cy + Math.sin(m.a) * (orbit + 34);
      label(m.n, x, y, 'rgba(160,180,225,0.65)', 8);
    });
    const idx = Math.round((((ang % (Math.PI * 2)) + Math.PI * 2) % (Math.PI * 2)) / (Math.PI / 2)) % 4;
    const season = ['Northern summer', 'Northern autumn', 'Northern winter', 'Northern spring'][idx];
    label(season, w / 2, h - 26, '#67e8f9', 11);
    label('Earth’s axis stays pointed the same way in space', w / 2, 24, 'rgba(150,170,210,0.65)', 9);
  }

  function drawGravity() {
    const pad = Math.max(14, w * 0.04);
    const top = 30, rowH = Math.min(34, (h - 60) / bodies.length);
    const max = 24.79;
    const barMax = w - pad * 2 - 96;
    label('SURFACE GRAVITY (m/s²)', pad, top - 12, 'rgba(150,170,215,0.7)', 8, 'left');
    bodies.forEach((b, i) => {
      const y = top + i * rowH;
      const width = (b.r / max) * barMax * Math.min(1, 0.2 + t * 0.9);
      label(b.name, pad, y, 'rgba(200,215,250,0.85)', 9, 'left');
      const g = ctx.createLinearGradient(pad + 78, 0, pad + 78 + width, 0);
      g.addColorStop(0, b.c); g.addColorStop(1, 'rgba(120,100,255,0.55)');
      ctx.fillStyle = g;
      ctx.beginPath(); ctx.roundRect(pad + 74, y - 6, Math.max(2, width), 12, 6); ctx.fill();
      label(`${b.r.toFixed(2)}`, pad + 74 + Math.max(2, width) + 8, y, 'rgba(180,200,240,0.8)', 8, 'left');
    });
  }

  function draw() {
    backdrop();
    if (mode === 'orbits') drawOrbits();
    else if (mode === 'phases') drawPhases();
    else if (mode === 'eclipse') drawEclipse();
    else if (mode === 'seasons') drawSeasons();
    else drawGravity();
  }
  function loop() {
    raf = requestAnimationFrame(loop);
    if (!visible || document.hidden) return;
    if (playing) t += 0.012 * speed;
    draw();
    updateReadout();
  }
  function updateReadout() {
    const box = $('#sim-readout');
    if (!box) return;
    const info = SIM_INFO[mode];
    let rows = info.readout();
    if (mode === 'phases') {
      const phase = ((t * 0.5) / (Math.PI * 2)) % 1;
      const illum = Math.round(0.5 * (1 - Math.cos(phase * Math.PI * 2)) * 100);
      rows = [['Illumination', `${illum}%`], ['Lunar day', `${Math.round(phase * 29.5)} / 29.5`], ['Phase', phase < 0.5 ? 'Waxing' : 'Waning']];
    } else if (mode === 'orbits') {
      rows = [['Speed', `${speed.toFixed(1)}×`], ['Bodies', '8 planets'], ['Law', 'Kepler III']];
    } else if (mode === 'eclipse') {
      const ang = t * 0.7;
      rows = [['Moon angle', `${Math.round((((ang * 180 / Math.PI) % 360) + 360) % 360)}°`], ['Solar eclipse', 'New Moon only'], ['Lunar eclipse', 'Full Moon only']];
    } else if (mode === 'gravity') {
      rows = [['Your mass', '70 kg'], ['Earth weight', '686 N'], ['Jupiter weight', '1,730 N']];
    }
    box.innerHTML = rows.map(([k, v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('');
  }
  function setMode(next) {
    mode = next; t = 0;
    $$('.sim-tab').forEach(b => {
      const on = b.dataset.mode === next;
      b.classList.toggle('active', on);
      b.setAttribute('aria-selected', String(on));
    });
    const info = SIM_INFO[next];
    $('#sim-title').textContent = info.title;
    $('#sim-desc').textContent = info.desc;
    updateReadout();
  }

  $$('.sim-tab').forEach(btn => btn.addEventListener('click', () => setMode(btn.dataset.mode)));
  const playBtn = $('#sim-play');
  playBtn?.addEventListener('click', () => {
    playing = !playing;
    playBtn.innerHTML = `<svg aria-hidden="true"><use href="#${playing ? 'i-pause' : 'i-play'}"/></svg><span>${playing ? 'Pause' : 'Play'}</span>`;
  });
  $('#sim-reset')?.addEventListener('click', () => {
    t = 0; speed = 1; playing = true;
    const sp = $('#sim-speed'); if (sp) sp.value = 35;
    const out = $('#sim-speed-out'); if (out) out.textContent = '1.0×';
    if (playBtn) playBtn.innerHTML = '<svg aria-hidden="true"><use href="#i-pause"/></svg><span>Pause</span>';
    updateReadout();
  });
  $('#sim-speed')?.addEventListener('input', e => {
    speed = 0.2 + (Number(e.target.value) / 100) * 3.8;
    const out = $('#sim-speed-out'); if (out) out.textContent = `${speed.toFixed(1)}×`;
  });
  speed = 0.2 + (Number($('#sim-speed')?.value || 35) / 100) * 3.8;
  setMode('orbits');
  raf = requestAnimationFrame(loop);
  return { dispose() { cancelAnimationFrame(raf); ro.disconnect(); io.disconnect(); } };
}

/* ============================ QUIZ ============================ */
export function initQuiz() {
  const qEl = $('#quiz-question'), optsEl = $('#quiz-options'), nextBtn = $('#quiz-next');
  if (!qEl || !optsEl || !nextBtn) return;
  let difficulty = 'easy', pool = [], index = 0, score = 0, answered = false, started = false;
  const progressEl = $('#quiz-progress'), scoreEl = $('#quiz-score'), explainEl = $('#quiz-explain');
  const saved = (() => { try { return JSON.parse(localStorage.getItem('cosmos-quiz') || '{}'); } catch (e) { return {}; } })();
  let best = saved.best || 0;

  function shuffle(arr) {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(Math.random() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; }
    return a;
  }
  function buildPool() {
    pool = shuffle(quiz.filter(q => q.difficulty === difficulty));
    index = 0; score = 0; answered = false; started = true;
    render();
  }
  function render() {
    if (!started) return;
    if (index >= pool.length) {
      const pct = Math.round((score / pool.length) * 100);
      qEl.textContent = `Complete — ${score} of ${pool.length} correct (${pct}%).`;
      optsEl.innerHTML = '';
      explainEl.classList.add('hidden');
      progressEl.style.width = '100%';
      scoreEl.textContent = `Best ${Math.max(best, score)} / ${pool.length}`;
      nextBtn.textContent = 'Play again';
      if (score > best) { best = score; localStorage.setItem('cosmos-quiz', JSON.stringify({ best, difficulty })); }
      return;
    }
    const q = pool[index];
    qEl.textContent = q.q;
    answered = false;
    explainEl.classList.add('hidden');
    progressEl.style.width = `${(index / pool.length) * 100}%`;
    scoreEl.textContent = `Score ${score} / ${index} · Best ${best}`;
    nextBtn.textContent = 'Next question';
    nextBtn.disabled = true;
    optsEl.innerHTML = '';
    q.options.forEach((opt, i) => {
      const b = document.createElement('button');
      b.className = 'quiz-option';
      b.type = 'button';
      b.textContent = `${String.fromCharCode(65 + i)}. ${opt}`;
      b.addEventListener('click', () => {
        if (answered) return;
        answered = true;
        const correct = i === q.answer;
        if (correct) score++;
        [...optsEl.children].forEach((el, n) => {
          el.disabled = true;
          if (n === q.answer) el.classList.add('correct');
          else if (n === i) el.classList.add('wrong');
        });
        explainEl.textContent = `${correct ? 'Correct. ' : 'Not quite. '}${q.explain}`;
        explainEl.classList.remove('hidden');
        scoreEl.textContent = `Score ${score} / ${index + 1} · Best ${best}`;
        nextBtn.disabled = false;
        progressEl.style.width = `${((index + 1) / pool.length) * 100}%`;
      });
      optsEl.appendChild(b);
    });
  }
  $$('.difficulty button').forEach(b => b.addEventListener('click', () => {
    difficulty = b.dataset.diff;
    $$('.difficulty button').forEach(x => x.classList.toggle('active', x === b));
    started = false; index = 0; score = 0;
    qEl.textContent = `${difficulty[0].toUpperCase() + difficulty.slice(1)} quiz — press start.`;
    optsEl.innerHTML = ''; explainEl.classList.add('hidden');
    progressEl.style.width = '0%';
    scoreEl.textContent = `Best ${best}`;
    nextBtn.textContent = 'Start quiz'; nextBtn.disabled = false;
  }));
  nextBtn.addEventListener('click', () => {
    if (!started) { buildPool(); return; }
    if (index >= pool.length) { buildPool(); return; }
    if (!answered) return;
    index++;
    render();
  });
  qEl.textContent = 'Choose a difficulty and press start.';
  scoreEl.textContent = `Best ${best}`;
}

/* ============================ GLOSSARY ============================ */
export function initGlossary() {
  const list = $('#glossary-list'), input = $('#glossary-search');
  if (!list) return;
  function render(filter = '') {
    const f = filter.trim().toLowerCase();
    const items = glossary.filter(g => g.term.toLowerCase().includes(f) || g.def.toLowerCase().includes(f));
    list.innerHTML = items.length
      ? items.map(g => `<div class="glossary-item"><strong>${g.term}</strong><p>${g.def}</p></div>`).join('')
      : `<p class="search-empty" style="grid-column:1/-1">No terms match “${filter}”.</p>`;
  }
  render();
  input?.addEventListener('input', e => render(e.target.value));
}

/* ============================ DAILY FACTS ============================ */
export function initFacts() {
  const el = $('#daily-fact'), dateEl = $('#fact-date'), next = $('#new-fact');
  if (!el) return;
  const day = Math.floor((Date.now() - new Date(new Date().getFullYear(), 0, 0)) / 86400000);
  let index = day % dailyFacts.length;
  el.textContent = dailyFacts[index];
  if (dateEl) dateEl.textContent = new Date().toLocaleDateString(undefined, { day: 'numeric', month: 'short', year: 'numeric' });
  next?.addEventListener('click', () => {
    index = (index + 1) % dailyFacts.length;
    el.style.opacity = '0';
    setTimeout(() => { el.textContent = dailyFacts[index]; el.style.opacity = '1'; }, 160);
  });
}

/* ============================ STELLAR LIFECYCLE ============================ */
export function initLifecycle() {
  const track = $('#lifecycle-track'), detail = $('#life-detail');
  if (!track) return;
  track.innerHTML = starLifeCycle.map((s, i) => `<button class="life-step${i === 0 ? ' active' : ''}" data-step="${i}"><b>STEP ${String(i + 1).padStart(2, '0')}</b><span>${s.step}</span></button>`).join('');
  track.addEventListener('click', e => {
    const btn = e.target.closest('.life-step');
    if (!btn) return;
    const i = Number(btn.dataset.step);
    [...track.children].forEach((c, n) => c.classList.toggle('active', n === i));
    detail.textContent = starLifeCycle[i].detail;
  });
}
