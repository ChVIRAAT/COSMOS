// COSMOS — moons, small bodies, missions and universe concepts.

export const moons = [
  {
    id: 'moon', name: 'The Moon', parent: 'Earth', type: 'Natural satellite',
    diameter: '3,474 km', distance: '384,400 km from Earth', period: '27.3 days (synchronous)',
    gravity: '1.62 m/s² (0.165 g)', temp: '−173 °C to 127 °C',
    atmosphere: 'Essentially none — a thin exosphere of helium, neon and argon.',
    surface: 'Dark basaltic maria, bright highlands, impact craters and regolith dust. The far side is more heavily cratered.',
    importance: 'The Moon stabilises Earth’s axial tilt, drives ocean tides, and is the only other world humans have walked on. Its surface preserves 4.5 billion years of Solar System history.',
    facts: ['It is drifting away from Earth at about 3.8 cm per year.', 'Twelve Apollo astronauts walked on it between 1969 and 1972.', 'Its far side was first photographed by Luna 3 in 1959.'],
    palette: { base: '#b9b6b0', accent: '#8a8782', dark: '#54524f', craters: true }, texture: 'moon',
    sources: [{ label: 'NASA Science — Moon', url: 'https://science.nasa.gov/moon/' }]
  },
  {
    id: 'europa', name: 'Europa', parent: 'Jupiter', type: 'Icy moon',
    diameter: '3,122 km', distance: '671,000 km from Jupiter', period: '3.55 days',
    gravity: '1.31 m/s²', temp: '≈−160 °C at the surface',
    atmosphere: 'Extremely thin oxygen exosphere.',
    surface: 'Smooth water-ice crust crossed by reddish fractures; very few impact craters, implying an active, young surface.',
    importance: 'Beneath its ice shell lies a global saltwater ocean holding more water than all of Earth’s oceans — one of the best places to search for life beyond Earth. NASA’s Europa Clipper is en route (arrives 2030).',
    facts: ['Its ocean may be 60–150 km deep beneath 15–25 km of ice.', 'Plumes of water vapour have been detected near its south pole.', 'Europa is tidally heated by Jupiter’s gravity.'],
    palette: { base: '#e7e2d7', accent: '#b9a58f', dark: '#7c6a58', cracks: true },
    sources: [{ label: 'NASA Science — Europa', url: 'https://science.nasa.gov/jupiter/moons/europa/' }]
  },
  {
    id: 'ganymede', name: 'Ganymede', parent: 'Jupiter', type: 'Icy moon',
    diameter: '5,268 km (larger than Mercury)', distance: '1.07 million km from Jupiter', period: '7.15 days',
    gravity: '1.43 m/s²', temp: '≈−160 °C',
    atmosphere: 'Thin oxygen exosphere; auroras observed by Hubble.',
    surface: 'Ancient dark terrain and younger grooved bright terrain, with water ice and craters.',
    importance: 'The largest moon in the Solar System and the only one with its own magnetic field. It likely hides a subsurface ocean. ESA’s JUICE will orbit it in 2034.',
    facts: ['It is bigger than the planet Mercury.', 'Its auroras oscillate in a way that confirms a deep ocean.', 'It was discovered by Galileo in 1610.'],
    palette: { base: '#a9a094', accent: '#7d746a', dark: '#4f4841', craters: true, bands: true },
    sources: [{ label: 'NASA — Ganymede', url: 'https://science.nasa.gov/jupiter/moons/ganymede/' }]
  },
  {
    id: 'callisto', name: 'Callisto', parent: 'Jupiter', type: 'Icy moon',
    diameter: '4,821 km', distance: '1.88 million km from Jupiter', period: '16.7 days',
    gravity: '1.24 m/s²', temp: '≈−139 °C',
    atmosphere: 'Very thin carbon-dioxide and oxygen exosphere.',
    surface: 'One of the most heavily cratered surfaces known — an ancient, geologically inactive ice-and-rock crust.',
    importance: 'A natural time capsule of the early Solar System and a possible site for a future human base, lying outside Jupiter’s harshest radiation belts.',
    facts: ['Its Valhalla basin has rings spanning 3,800 km.', 'It may also have a subsurface ocean.', 'It is roughly the size of Mercury.'],
    palette: { base: '#8d857a', accent: '#6a6258', dark: '#403b35', craters: true },
    sources: [{ label: 'NASA — Callisto', url: 'https://science.nasa.gov/jupiter/moons/' }]
  },
  {
    id: 'io', name: 'Io', parent: 'Jupiter', type: 'Volcanic moon',
    diameter: '3,643 km', distance: '422,000 km from Jupiter', period: '1.77 days',
    gravity: '1.80 m/s²', temp: '≈−143 °C (surface); lava hotter than 1,000 °C',
    atmosphere: 'Thin sulfur-dioxide atmosphere, constantly replenished by volcanoes.',
    surface: 'Yellow-green sulfur plains, volcanic calderas, lava lakes and plumes reaching hundreds of kilometres high.',
    importance: 'The most volcanically active body in the Solar System, driven by tidal flexing from Jupiter and neighbouring moons. It is a key laboratory for planetary volcanism.',
    facts: ['It has more than 400 active volcanoes.', 'Its volcano Loki Patera is larger than some countries.', 'Tidal heating melts its interior while its surface stays bitterly cold.'],
    palette: { base: '#e6d36b', accent: '#c9a03f', dark: '#6f5a1e', spots: true },
    sources: [{ label: 'NASA — Io', url: 'https://science.nasa.gov/jupiter/moons/io/' }]
  },
  {
    id: 'titan', name: 'Titan', parent: 'Saturn', type: 'Moon with a dense atmosphere',
    diameter: '5,150 km', distance: '1.22 million km from Saturn', period: '15.9 days',
    gravity: '1.35 m/s²', temp: '≈−179 °C',
    atmosphere: 'About 95% nitrogen and 5% methane, with a thick orange organic haze; surface pressure 1.5× Earth’s.',
    surface: 'Rivers, lakes and seas of liquid methane and ethane, dunes of organic grains, and water-ice bedrock.',
    importance: 'The only moon with a substantial atmosphere and the only world besides Earth with stable surface liquids. NASA’s Dragonfly rotorcraft will fly there in the 2030s.',
    facts: ['It is larger than Mercury and second only to Ganymede in size.', 'Its atmosphere is thicker than Earth’s.', 'Huygens landed there in 2005 — the most distant landing ever.'],
    palette: { base: '#c99a52', accent: '#a87a38', dark: '#6b4d20', clouds: true },
    sources: [{ label: 'NASA — Titan', url: 'https://science.nasa.gov/saturn/moons/titan/' }]
  },
  {
    id: 'enceladus', name: 'Enceladus', parent: 'Saturn', type: 'Icy ocean moon',
    diameter: '504 km', distance: '238,000 km from Saturn', period: '1.37 days',
    gravity: '0.11 m/s²', temp: '≈−198 °C',
    atmosphere: 'A thin water-vapour exosphere, fed by south-polar geysers.',
    surface: 'Bright, pure water ice with "tiger stripe" fractures at the south pole and a heavily cratered north.',
    importance: 'Cassini flew through its plumes and detected water, salts, organic molecules and hydrogen — evidence of hydrothermal activity in a subsurface ocean.',
    facts: ['Its geysers spray hundreds of kilometres into space and feed Saturn’s E ring.', 'It reflects about 90% of the sunlight that hits it.', 'It is a top candidate in the search for extraterrestrial life.'],
    palette: { base: '#eef3f6', accent: '#c2d4de', dark: '#8ba0ac', cracks: true },
    sources: [{ label: 'NASA — Enceladus', url: 'https://science.nasa.gov/saturn/moons/enceladus/' }]
  },
  {
    id: 'triton', name: 'Triton', parent: 'Neptune', type: 'Captured Kuiper Belt moon',
    diameter: '2,707 km', distance: '355,000 km from Neptune', period: '5.88 days (retrograde)',
    gravity: '0.78 m/s²', temp: '≈−235 °C',
    atmosphere: 'Very thin nitrogen atmosphere with some methane.',
    surface: 'Pinkish nitrogen and water ice, "cantaloupe" terrain, and geysers erupting nitrogen gas.',
    importance: 'The only large moon with a retrograde orbit, strongly suggesting it was captured from the Kuiper Belt. Voyager 2 saw active cryovolcanism there in 1989.',
    facts: ['It is the seventh-largest moon in the Solar System.', 'It is slowly spiralling inward toward Neptune.', 'Its surface is one of the coldest measured anywhere.'],
    palette: { base: '#d8cfc8', accent: '#a89a92', dark: '#6e625c', craters: true, cracks: true },
    sources: [{ label: 'NASA — Triton', url: 'https://science.nasa.gov/neptune/moons/triton/' }]
  }
];

export const smallBodies = [
  { id: 'vesta', name: 'Vesta', type: 'Asteroid (Asteroid Belt)', size: '525 km diameter', distance: '2.36 AU from the Sun', description: 'The second-largest object in the asteroid belt, with a differentiated interior, a huge south-polar impact basin and a surface of basaltic rock. NASA’s Dawn spacecraft orbited it in 2011–2012.', facts: ['It accounts for about 9% of the mass of the asteroid belt.', 'Its Rheasilvia basin is nearly as wide as Vesta itself.', 'Meteorites from Vesta are found on Earth.'], sources: [{ label: 'NASA — Vesta', url: 'https://science.nasa.gov/asteroids-comets-meteors/' }] },
  { id: 'bennu', name: 'Bennu', type: 'Near-Earth asteroid (Apollo group)', size: '≈490 m diameter', distance: 'Orbits between 0.9 and 1.4 AU', description: 'A carbon-rich rubble-pile asteroid, likely a fragment of a larger parent body. OSIRIS-REx collected a sample in 2020 and returned it to Earth in 2023.', facts: ['The returned sample contained water-bearing clays and organic molecules.', 'Bennu has a very small chance of impacting Earth in the 2180s.', 'It rotates once every 4.3 hours.'], sources: [{ label: 'NASA — Bennu', url: 'https://science.nasa.gov/mission/osiris-rex/' }] },
  { id: 'apophis', name: 'Apophis', type: 'Near-Earth asteroid (Aten group)', size: '≈340 m diameter', distance: 'Orbit crosses Earth’s', description: 'A stony asteroid that will pass extremely close to Earth on 13 April 2029, visible to the naked eye. Radar observations have ruled out an impact for at least a century.', facts: ['It will pass about 32,000 km from Earth’s surface in 2029.', 'NASA’s OSIRIS-APEX mission will visit it in 2029.', 'Its close pass will alter its spin.'], sources: [{ label: 'NASA — Planetary Defense', url: 'https://science.nasa.gov/planetary-defense/' }] },
  { id: 'halley', name: 'Halley’s Comet', type: 'Periodic comet', size: '≈11 km nucleus', distance: 'Orbit 0.59–35 AU', description: 'The most famous comet, returning roughly every 76 years. Its 1986 apparition was studied by the Giotto and Vega probes, revealing a dark nucleus and jets of gas and dust.', facts: ['Its next perihelion is in 2061.', 'It causes the Orionid and Eta Aquariid meteor showers.', 'It appears in records going back more than 2,000 years.'], sources: [{ label: 'NASA — Comets', url: 'https://science.nasa.gov/comets/' }] },
  { id: '67p', name: '67P/Churyumov–Gerasimenko', type: 'Jupiter-family comet', size: '≈4 km across', distance: 'Orbit 1.24–5.7 AU', description: 'A bilobed comet orbited by ESA’s Rosetta from 2014 to 2016. The Philae lander touched down in November 2014, the first landing on a comet.', facts: ['Rosetta detected molecular oxygen and organic compounds.', 'Its duck-like shape comes from a low-speed collision of two bodies.', 'Its jets are driven by sublimating water ice.'], sources: [{ label: 'ESA — Rosetta', url: 'https://www.esa.int/Science_Exploration/Space_Science/Rosetta' }] },
  { id: 'hale-bopp', name: 'Hale–Bopp', type: 'Long-period comet', size: '≈60 km nucleus', distance: 'Orbit ~2,500 AU (aphelion)', description: 'A spectacularly bright comet visible to the naked eye for 18 months in 1996–97. Its large, active nucleus made it one of the most observed comets of the 20th century.', facts: ['It will not return for about 2,500 years.', 'Its nucleus was unusually large, about 60 km across.', 'Its dust tail stretched more than 100 million km.'], sources: [{ label: 'NASA — Comets', url: 'https://science.nasa.gov/comets/' }] },
  { id: 'arrokoth', name: 'Arrokoth', type: 'Trans-Neptunian object (Kuiper Belt)', size: '≈36 × 20 × 10 km', distance: '≈44 AU from the Sun', description: 'A contact-binary Kuiper Belt object visited by New Horizons on 1 January 2019. Its two lobes are gently joined, suggesting a low-speed accretion in the early Solar System.', facts: ['It is the most distant object ever explored up close.', 'Its surface is reddish, coated with irradiated organic molecules.', 'Its name means "sky" in the Powhatan language.'], sources: [{ label: 'NASA — New Horizons', url: 'https://science.nasa.gov/mission/new-horizons/' }] },
  { id: 'oumuamua', name: 'ʻOumuamua', type: 'Interstellar object', size: '≈100–400 m long (estimated)', distance: 'Passed at 0.25 AU in 2017', description: 'The first confirmed object from another star system, discovered in October 2017. Its elongated shape and slight non-gravitational acceleration remain debated but are consistent with a natural comet-like body.', facts: ['Its name is Hawaiian for "scout".', 'It was travelling at about 26 km/s relative to the Sun.', 'It left the Solar System faster than it arrived.'], sources: [{ label: 'NASA — Interstellar Objects', url: 'https://science.nasa.gov/asteroids-comets-meteors/' }] }
];

export const agencies = [
  { id: 'nasa', name: 'NASA', full: 'National Aeronautics and Space Administration', country: 'United States', founded: '1958', focus: 'Solar System exploration, astrophysics, Earth science, human spaceflight and planetary defence.', missions: 'Apollo, Hubble, James Webb, Voyager, Perseverance, Artemis, Europa Clipper' },
  { id: 'esa', name: 'ESA', full: 'European Space Agency', country: 'Europe (22 member states)', founded: '1975', focus: 'Space science, Earth observation, launchers and human spaceflight.', missions: 'Rosetta, Gaia, Euclid, JUICE, Ariane, Columbus' },
  { id: 'isro', name: 'ISRO', full: 'Indian Space Research Organisation', country: 'India', founded: '1969', focus: 'Low-cost launch capability, Earth observation, lunar and interplanetary exploration.', missions: 'Chandrayaan, Mangalyaan, Aditya-L1, Gaganyaan, PSLV/GSLV' },
  { id: 'spacex', name: 'SpaceX', full: 'Space Exploration Technologies Corp.', country: 'United States', founded: '2002', focus: 'Reusable launch vehicles, satellite broadband and commercial crew/cargo transport.', missions: 'Falcon 9, Falcon Heavy, Starship, Dragon, Starlink' }
];

export const missions = [
  { id: 'sputnik', name: 'Sputnik 1', agency: 'USSR', year: '1957', type: 'Satellite', description: 'The first artificial satellite, a 58 cm metal sphere that transmitted radio beeps for 21 days and opened the Space Age.', facts: ['It orbited Earth every 96 minutes.', 'Its launch triggered the space race.'] },
  { id: 'gagarin', name: 'Vostok 1', agency: 'USSR', year: '1961', type: 'Human spaceflight', description: 'Yuri Gagarin became the first human in space, completing one orbit of Earth in 108 minutes.', facts: ['The flight was fully automated.', 'Gagarin ejected and parachuted to the ground separately.'] },
  { id: 'apollo11', name: 'Apollo 11', agency: 'NASA', year: '1969', type: 'Crewed lunar landing', description: 'Neil Armstrong and Buzz Aldrin landed in the Sea of Tranquility on 20 July 1969 while Michael Collins orbited above.', facts: ['Armstrong’s first step was watched by an estimated 600 million people.', 'The crew returned 21.5 kg of lunar samples.'] },
  { id: 'voyager', name: 'Voyager 1 & 2', agency: 'NASA', year: '1977', type: 'Outer Solar System probes', description: 'Twin probes that toured the giant planets and then left the heliosphere. Voyager 1 is now the most distant human-made object, more than 24 billion km away.', facts: ['Each carries a Golden Record of Earth sounds and images.', 'Voyager 1 entered interstellar space in 2012.', 'Their power sources will fade by the 2030s.'] },
  { id: 'hubble', name: 'Hubble Space Telescope', agency: 'NASA / ESA', year: '1990', type: 'Space observatory', description: 'Hubble has made more than 1.6 million observations and helped measure the age and expansion of the universe.', facts: ['Its mirror was corrected by astronauts in 1993.', 'It orbits about 535 km above Earth.'] },
  { id: 'iss', name: 'International Space Station', agency: 'NASA / ESA / JAXA / CSA / Roscosmos', year: '1998', type: 'Crewed orbital laboratory', description: 'A continuously inhabited orbital laboratory since November 2000, the size of a football field, hosting thousands of experiments in microgravity.', facts: ['It orbits Earth every 90 minutes at 28,000 km/h.', 'More than 3,000 experiments have been conducted aboard.'] },
  { id: 'cassini', name: 'Cassini–Huygens', agency: 'NASA / ESA / ASI', year: '1997–2017', type: 'Saturn orbiter and Titan lander', description: 'Cassini spent 13 years at Saturn, discovering ocean moons and watching seasons change. Huygens landed on Titan in 2005.', facts: ['It found geysers on Enceladus.', 'It ended by diving into Saturn’s atmosphere in 2017.'] },
  { id: 'curiosity', name: 'Curiosity', agency: 'NASA', year: '2012', type: 'Mars rover', description: 'A car-sized rover exploring Gale Crater, where it found evidence that ancient Mars had liquid water and conditions suitable for microbial life.', facts: ['It has driven more than 30 km.', 'It carries a laser that vaporises rock to analyse it.'] },
  { id: 'rosetta', name: 'Rosetta & Philae', agency: 'ESA', year: '2014', type: 'Comet orbiter and lander', description: 'The first mission to orbit and land on a comet, revealing the structure and chemistry of 67P/Churyumov–Gerasimenko.', facts: ['Philae bounced twice before settling.', 'Rosetta detected molecular oxygen at the comet.'] },
  { id: 'newhorizons', name: 'New Horizons', agency: 'NASA', year: '2015', type: 'Pluto and Kuiper Belt flyby', description: 'Flew past Pluto in July 2015, revealing mountains, glaciers and a thin atmosphere, then visited Arrokoth in 2019.', facts: ['It travelled 5 billion km in nine years.', 'It carries some of Clyde Tombaugh’s ashes.'] },
  { id: 'perseverance', name: 'Perseverance & Ingenuity', agency: 'NASA', year: '2021', type: 'Mars rover and helicopter', description: 'Perseverance is caching samples in Jezero Crater for a future return mission. Ingenuity made the first powered flight on another planet.', facts: ['Ingenuity flew 72 times before retiring in 2024.', 'Perseverance has stored more than 20 rock cores.'] },
  { id: 'webb', name: 'James Webb Space Telescope', agency: 'NASA / ESA / CSA', year: '2021', type: 'Infrared space observatory', description: 'The largest telescope ever launched, observing the first galaxies, exoplanet atmospheres and star-forming regions in infrared light from a point 1.5 million km from Earth.', facts: ['Its mirror is 6.5 m across and made of 18 gold-coated segments.', 'It operates at about −233 °C behind a tennis-court-sized sunshield.'] },
  { id: 'dart', name: 'DART', agency: 'NASA', year: '2022', type: 'Planetary defence impactor', description: 'The Double Asteroid Redirection Test deliberately crashed into the moonlet Dimorphos, successfully changing its orbit around the asteroid Didymos.', facts: ['The impact shortened Dimorphos’s orbit by about 32 minutes.', 'It proved a viable technique for deflecting small asteroids.'] },
  { id: 'chandrayaan3', name: 'Chandrayaan-3', agency: 'ISRO', year: '2023', type: 'Lunar lander and rover', description: 'India became the first country to land near the Moon’s south pole and the fourth to soft-land on the Moon. The Vikram lander and Pragyan rover studied lunar soil and water-ice signatures.', facts: ['It was ISRO’s second successful lunar landing attempt.', 'Pragyan travelled about 100 m in two weeks.'] },
  { id: 'juice', name: 'JUICE', agency: 'ESA', year: '2023 (launch)', type: 'Jupiter icy-moons orbiter', description: 'The Jupiter Icy Moons Explorer is en route to Jupiter, where it will study Ganymede, Callisto and Europa and eventually orbit Ganymede.', facts: ['It will arrive at Jupiter in 2031.', 'It carries the largest solar arrays ever flown on an interplanetary mission.'] },
  { id: 'europaclipper', name: 'Europa Clipper', agency: 'NASA', year: '2024 (launch)', type: 'Europa orbiter', description: 'A mission to survey Europa’s ice shell and subsurface ocean and assess its habitability, arriving at Jupiter in 2030.', facts: ['It is the largest spacecraft NASA has built for a planetary mission.', 'It will make about 50 close flybys of Europa.'] }
];
