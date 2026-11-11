// COSMOS — unified data index.
import { planets, dwarfPlanets } from './data-planets.js';
import { galaxies, nebulae } from './data-galaxies.js';
import { blackHoles, blackHolePhysics, starTypes, starLifeCycle } from './data-deepspace.js';
import { moons, smallBodies, agencies, missions } from './data-missions.js';
import { universeConcepts, cosmicScale, dailyFacts, glossary, quiz } from './data-learn.js';

export {
  planets, dwarfPlanets, galaxies, nebulae, blackHoles, blackHolePhysics,
  starTypes, starLifeCycle, moons, smallBodies, agencies, missions,
  universeConcepts, cosmicScale, dailyFacts, glossary, quiz
};

export const allBodies = [...planets, ...dwarfPlanets];

/** Builds the global search index: 60+ searchable objects across every category. */
export function buildSearchIndex() {
  const index = [];
  allBodies.forEach(p => index.push({
    id: p.id, name: p.name, category: p.kind === 'dwarf' ? 'Dwarf Planets' : 'Planets',
    detail: p.type, type: 'body'
  }));
  galaxies.forEach(g => index.push({ id: g.id, name: g.name, category: 'Galaxies', detail: g.type, type: 'galaxy' }));
  moons.forEach(m => index.push({ id: m.id, name: m.name, category: 'Moons', detail: `Moon of ${m.parent}`, type: 'moon' }));
  nebulae.forEach(n => index.push({ id: n.id, name: n.name, category: 'Nebulae', detail: n.type, type: 'nebula' }));
  blackHoles.forEach(b => index.push({ id: b.id, name: b.name, category: 'Black Holes', detail: b.type, type: 'blackhole' }));
  starTypes.forEach(s => index.push({ id: s.id, name: s.name, category: 'Stars', detail: s.type, type: 'star' }));
  smallBodies.forEach(s => index.push({ id: s.id, name: s.name, category: 'Asteroids & Comets', detail: s.type, type: 'smallbody' }));
  missions.forEach(m => index.push({ id: m.id, name: m.name, category: 'Missions', detail: `${m.agency} · ${m.year}`, type: 'mission' }));
  universeConcepts.forEach(c => index.push({ id: c.id, name: c.name, category: 'Universe', detail: c.stat, type: 'concept' }));
  return index;
}

export const searchIndex = buildSearchIndex();

export const categories = [
  { name: 'Planets', count: planets.length },
  { name: 'Galaxies', count: galaxies.length },
  { name: 'Moons', count: moons.length },
  { name: 'Nebulae', count: nebulae.length },
  { name: 'Black Holes', count: blackHoles.length },
  { name: 'Stars', count: starTypes.length },
  { name: 'Asteroids & Comets', count: smallBodies.length },
  { name: 'Missions', count: missions.length },
  { name: 'Dwarf Planets', count: dwarfPlanets.length },
  { name: 'Universe', count: universeConcepts.length }
];

/** Resolve any searchable object by id, across every collection. */
export function findObject(id) {
  const buckets = [
    ['planet', planets], ['dwarf', dwarfPlanets], ['galaxy', galaxies], ['moon', moons],
    ['nebula', nebulae], ['blackhole', blackHoles], ['star', starTypes],
    ['smallbody', smallBodies], ['mission', missions], ['concept', universeConcepts]
  ];
  for (const [kind, list] of buckets) {
    const found = list.find(item => item.id === id);
    if (found) return { kind, item: found };
  }
  return null;
}
