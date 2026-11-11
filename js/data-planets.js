// COSMOS — planetary dataset. Values: NASA Planetary Fact Sheet / NASA Science.
// Distances and periods are mean values; temperatures are mean surface values.

export const planets = [
  {
    id: 'mercury', name: 'Mercury', kind: 'planet', type: 'Terrestrial planet',
    tagline: 'The swift, cratered messenger closest to the Sun.',
    palette: { base: '#9d938a', accent: '#6e665e', dark: '#443f3a', craters: true },
    diameter: '4,879 km', mass: '3.30 × 10²³ kg (0.055 Earths)', gravity: '3.7 m/s² (0.38 g)',
    temp: '167 °C mean (−180 °C to 430 °C)', distSun: '57.9 million km (0.39 AU)',
    orbitPeriod: '88 Earth days', rotation: '58.6 Earth days', tilt: '0.03°',
    atmosphere: 'Almost none — a thin exosphere of oxygen, sodium, hydrogen, helium and potassium.',
    moons: '0', surface: 'Heavily cratered rock with cliffs (scarps), smooth lava plains and polar ice in permanently shadowed craters.',
    history: 'Mapped by Mariner 10 (1974–75), MESSENGER (2011–2015) and BepiColombo, which is arriving in orbit in 2026. Only two spacecraft have visited.',
    facts: [
      'A solar day on Mercury lasts 176 Earth days — longer than its 88-day year.',
      'Despite the extreme heat, water ice survives in sunlight-never-reaches polar craters.',
      'Mercury is shrinking: cooling has wrinkled its crust into cliffs up to 1 km high.'
    ],
    orbitAU: 0.387, periodYears: 0.2408, radiusRel: 0.383, displaySize: 0.085,
    sources: [
      { label: 'NASA Science — Mercury', url: 'https://science.nasa.gov/mercury/' },
      { label: 'NASA Planetary Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/' }
    ]
  },
  {
    id: 'venus', name: 'Venus', kind: 'planet', type: 'Terrestrial planet',
    tagline: 'Earth’s twin gone wrong, wrapped in crushing acid clouds.',
    palette: { base: '#e7cf9b', accent: '#c9a268', dark: '#9a7444', clouds: true },
    diameter: '12,104 km', mass: '4.87 × 10²⁴ kg (0.815 Earths)', gravity: '8.87 m/s² (0.90 g)',
    temp: '464 °C mean', distSun: '108.2 million km (0.72 AU)',
    orbitPeriod: '224.7 Earth days', rotation: '243 Earth days (retrograde)', tilt: '177.4°',
    atmosphere: '96.5% carbon dioxide, 3.5% nitrogen, clouds of sulfuric acid; surface pressure 92× Earth’s.',
    moons: '0', surface: 'Volcanic plains, pancake domes, rift valleys and two highland regions (Ishtar Terra, Aphrodite Terra).',
    history: 'Visited by Venera landers (1961–1984), Magellan radar mapping (1990–94), Venus Express, Akatsuki and NASA’s VERITAS/DaVinci and ESA’s EnVision missions in development.',
    facts: [
      'Venus rotates backwards: the Sun rises in the west and sets in the east.',
      'A runaway greenhouse effect makes its surface hotter than Mercury’s.',
      'Its day is longer than its year, and the upper clouds super-rotate in just four days.'
    ],
    orbitAU: 0.723, periodYears: 0.6152, radiusRel: 0.949, displaySize: 0.135,
    sources: [
      { label: 'NASA Science — Venus', url: 'https://science.nasa.gov/venus/' },
      { label: 'NASA Planetary Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/' }
    ]
  },
  {
    id: 'earth', name: 'Earth', kind: 'planet', type: 'Terrestrial planet',
    tagline: 'The only world known to host life — our pale blue dot.',
    palette: { base: '#1f5f9e', accent: '#3f8f63', dark: '#0a1a33', earth: true },
    diameter: '12,742 km', mass: '5.97 × 10²⁴ kg', gravity: '9.81 m/s² (1 g)',
    temp: '15 °C mean', distSun: '149.6 million km (1 AU)',
    orbitPeriod: '365.25 days', rotation: '23 h 56 min 4 s', tilt: '23.44°',
    atmosphere: '78% nitrogen, 21% oxygen, 0.93% argon, 0.04% carbon dioxide.',
    moons: '1 (the Moon)', surface: '71% liquid water oceans, seven continents, ice caps, deserts and an active biosphere.',
    history: 'Explored from orbit by Landsat since 1972 and observed by hundreds of satellites; the Apollo missions brought 382 kg of lunar samples home and changed how we see Earth.',
    facts: [
      'Earth’s magnetic field deflects the solar wind and produces the auroras.',
      'It is the densest planet in the Solar System at 5.51 g/cm³.',
      'Axial tilt, not distance from the Sun, gives us the seasons.'
    ],
    orbitAU: 1, periodYears: 1, radiusRel: 1, displaySize: 0.14, ring: false,
    sources: [
      { label: 'NASA Science — Earth', url: 'https://science.nasa.gov/earth/' },
      { label: 'NASA Earth Observatory', url: 'https://earthobservatory.nasa.gov/' }
    ]
  },
  {
    id: 'mars', name: 'Mars', kind: 'planet', type: 'Terrestrial planet',
    tagline: 'The red desert world that once ran with rivers.',
    palette: { base: '#b6512f', accent: '#dd8a58', dark: '#632415', caps: true, craters: true },
    diameter: '6,779 km', mass: '6.42 × 10²³ kg (0.107 Earths)', gravity: '3.72 m/s² (0.38 g)',
    temp: '−63 °C mean', distSun: '227.9 million km (1.52 AU)',
    orbitPeriod: '687 Earth days', rotation: '24 h 37 min', tilt: '25.19°',
    atmosphere: '95% carbon dioxide, 2.8% nitrogen, 2% argon; pressure under 1% of Earth’s.',
    moons: '2 (Phobos, Deimos)', surface: 'Iron-oxide dust, Olympus Mons (the tallest volcano in the Solar System), Valles Marineris canyon system and polar caps of water and CO₂ ice.',
    history: 'First visited by Mariner 4 (1965). Viking landers (1976), Spirit and Opportunity (2004), Curiosity (2012) and Perseverance with Ingenuity (2021) have explored the surface.',
    facts: [
      'Olympus Mons rises about 22 km — roughly 2.5 times the height of Everest.',
      'Evidence of ancient river deltas and lake beds suggests Mars was once warmer and wetter.',
      'Its two moons are probably captured asteroids; Phobos orbits faster than Mars rotates.'
    ],
    orbitAU: 1.524, periodYears: 1.8808, radiusRel: 0.532, displaySize: 0.11,
    sources: [
      { label: 'NASA Science — Mars', url: 'https://science.nasa.gov/mars/' },
      { label: 'NASA Mars Exploration Program', url: 'https://science.nasa.gov/mars-exploration/' }
    ]
  },
  {
    id: 'jupiter', name: 'Jupiter', kind: 'planet', type: 'Gas giant',
    tagline: 'The Solar System’s giant, with a storm bigger than Earth.',
    palette: { base: '#d8c3a5', accent: '#b07b50', dark: '#6f4a2c', bands: true, spot: true },
    diameter: '139,820 km', mass: '1.90 × 10²⁷ kg (317.8 Earths)', gravity: '24.79 m/s² (2.53 g)',
    temp: '−110 °C mean (at 1 bar)', distSun: '778.5 million km (5.20 AU)',
    orbitPeriod: '11.86 Earth years', rotation: '9 h 56 min', tilt: '3.13°',
    atmosphere: 'About 90% hydrogen and 10% helium, with ammonia, methane, water vapour and cloud deck chemistry.',
    moons: '95 confirmed (2024)', surface: 'No solid surface — a deep fluid envelope of molecular and metallic hydrogen around a dense core. Cloud bands and the Great Red Spot dominate the view.',
    history: 'Observed by Galileo from 1610. Flybys by Pioneer, Voyager and New Horizons; Galileo orbited 1995–2003; Juno has studied its interior and auroras since 2016; ESA’s JUICE is en route (arrives 2031).',
    facts: [
      'The Great Red Spot is a storm that has raged for at least 190 years and is wider than Earth.',
      'Jupiter’s magnetic field is about 20,000 times stronger than Earth’s.',
      'It acts as a gravitational shield, deflecting or capturing many comets and asteroids.'
    ],
    orbitAU: 5.204, periodYears: 11.862, radiusRel: 11.21, displaySize: 0.32,
    sources: [
      { label: 'NASA Science — Jupiter', url: 'https://science.nasa.gov/jupiter/' },
      { label: 'NASA Juno Mission', url: 'https://science.nasa.gov/mission/juno/' }
    ]
  },
  {
    id: 'saturn', name: 'Saturn', kind: 'planet', type: 'Gas giant',
    tagline: 'The jewel of the Solar System, crowned by icy rings.',
    palette: { base: '#e3d3a8', accent: '#c3ae7d', dark: '#8a7448', bands: true },
    diameter: '116,460 km', mass: '5.68 × 10²⁶ kg (95.2 Earths)', gravity: '10.44 m/s² (1.06 g)',
    temp: '−140 °C mean (at 1 bar)', distSun: '1.43 billion km (9.58 AU)',
    orbitPeriod: '29.45 Earth years', rotation: '10 h 42 min', tilt: '26.73°',
    atmosphere: '96% hydrogen, 3% helium, with ammonia, methane and water ice clouds.',
    moons: '274 confirmed (2025)', surface: 'No solid surface — a hydrogen–helium envelope. Rings span about 280,000 km but average only ~10 m thick.',
    history: 'Galileo first saw the rings in 1610. Pioneer 11, Voyagers 1 and 2 flew by; Cassini–Huygens orbited 2004–2017 and landed Huygens on Titan.',
    facts: [
      'Saturn is less dense than water — it would float in a big enough ocean.',
      'Its rings are made of billions of chunks of water ice and rock, from grains to house-sized boulders.',
      'A hexagonal jet stream circles its north pole, a pattern stable for decades.'
    ],
    orbitAU: 9.583, periodYears: 29.457, radiusRel: 9.45, displaySize: 0.29, ring: 'saturn',
    sources: [
      { label: 'NASA Science — Saturn', url: 'https://science.nasa.gov/saturn/' },
      { label: 'NASA Cassini Mission', url: 'https://science.nasa.gov/mission/cassini/' }
    ]
  },
  {
    id: 'uranus', name: 'Uranus', kind: 'planet', type: 'Ice giant',
    tagline: 'The tipped-over world that rolls around the Sun.',
    palette: { base: '#a9e0e6', accent: '#7cc6d2', dark: '#4c8f9c', smooth: true },
    diameter: '50,724 km', mass: '8.68 × 10²⁵ kg (14.5 Earths)', gravity: '8.87 m/s² (0.90 g)',
    temp: '−195 °C mean', distSun: '2.87 billion km (19.19 AU)',
    orbitPeriod: '84 Earth years', rotation: '17 h 14 min (retrograde)', tilt: '97.77°',
    atmosphere: '83% hydrogen, 15% helium, 2.3% methane — the methane gives it its blue-green colour.',
    moons: '28 confirmed', surface: 'A deep mantle of water, ammonia and methane ices beneath a hydrogen–helium atmosphere. Its axial tilt makes each pole face the Sun for 42 years at a time.',
    history: 'Discovered by William Herschel in 1781 — the first planet found with a telescope. Only Voyager 2 has visited (1986). A Uranus orbiter is a top priority for NASA’s next flagship mission.',
    facts: [
      'Uranus is tilted on its side, likely after a giant ancient impact.',
      'It is the coldest planetary atmosphere in the Solar System at about −224 °C.',
      'Its 13 known rings are dark, narrow and were discovered in 1977.'
    ],
    orbitAU: 19.191, periodYears: 84.011, radiusRel: 4.007, displaySize: 0.2, ring: 'uranus',
    sources: [
      { label: 'NASA Science — Uranus', url: 'https://science.nasa.gov/uranus/' },
      { label: 'NASA Planetary Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/' }
    ]
  },
  {
    id: 'neptune', name: 'Neptune', kind: 'planet', type: 'Ice giant',
    tagline: 'The windiest world, found by mathematics before sight.',
    palette: { base: '#3f6fd8', accent: '#2c4fa8', dark: '#16265e', smooth: true, spot: true },
    diameter: '49,244 km', mass: '1.02 × 10²⁶ kg (17.1 Earths)', gravity: '11.15 m/s² (1.14 g)',
    temp: '−200 °C mean', distSun: '4.50 billion km (30.07 AU)',
    orbitPeriod: '164.8 Earth years', rotation: '16 h 6 min', tilt: '28.32°',
    atmosphere: '80% hydrogen, 19% helium, 1.5% methane, with high-altitude methane ice clouds.',
    moons: '16 confirmed', surface: 'No solid surface. Supersonic winds reach about 2,100 km/h, and a dark storm system called the Great Dark Spot was seen by Voyager 2.',
    history: 'Predicted mathematically by Le Verrier and Adams and found by Galle and d’Arrest in 1846. Voyager 2 flew past in 1989 — the only close-up visit so far.',
    facts: [
      'Neptune’s winds are the fastest measured in the Solar System.',
      'Its moon Triton orbits backwards, suggesting it was captured from the Kuiper Belt.',
      'One Neptunian year is 164.8 Earth years — it has completed just one orbit since discovery.'
    ],
    orbitAU: 30.07, periodYears: 164.79, radiusRel: 3.883, displaySize: 0.195,
    sources: [
      { label: 'NASA Science — Neptune', url: 'https://science.nasa.gov/neptune/' },
      { label: 'NASA Voyager Mission', url: 'https://science.nasa.gov/mission/voyager/' }
    ]
  }
];

export const dwarfPlanets = [
  {
    id: 'pluto', name: 'Pluto', kind: 'dwarf', type: 'Dwarf planet (Kuiper Belt)',
    tagline: 'The heart-shaped ice world at the edge of the classical Solar System.',
    palette: { base: '#c9b6a1', accent: '#8c7864', dark: '#5a4b3e', craters: true },
    diameter: '2,377 km', mass: '1.30 × 10²² kg (0.0022 Earths)', gravity: '0.62 m/s² (0.063 g)',
    temp: '−229 °C mean', distSun: '5.91 billion km (39.5 AU mean)',
    orbitPeriod: '248 Earth years', rotation: '6.39 Earth days', tilt: '122.5°',
    atmosphere: 'Thin nitrogen, methane and carbon monoxide, which freezes out near aphelion.',
    moons: '5 (Charon, Nix, Hydra, Kerberos, Styx)',
    surface: 'Nitrogen and methane ices, water-ice mountains, and Sputnik Planitia — the left half of the famous heart-shaped plain.',
    history: 'Discovered by Clyde Tombaugh in 1930. New Horizons flew past in July 2015, revealing a geologically active world. Reclassified as a dwarf planet in 2006.',
    facts: [
      'Pluto and Charon are tidally locked and orbit a point between them — a binary system.',
      'Its orbit is more elliptical and tilted than the planets’, sometimes bringing it inside Neptune’s orbit.',
      'New Horizons found water-ice mountains 3,500 m high and possible cryovolcanoes.'
    ],
    orbitAU: 39.48, periodYears: 248, radiusRel: 0.186, displaySize: 0.075,
    sources: [
      { label: 'NASA Science — Pluto', url: 'https://science.nasa.gov/dwarf-planets/pluto/' },
      { label: 'NASA New Horizons', url: 'https://science.nasa.gov/mission/new-horizons/' }
    ]
  },
  {
    id: 'ceres', name: 'Ceres', kind: 'dwarf', type: 'Dwarf planet (Asteroid Belt)',
    tagline: 'The largest object in the asteroid belt, bright with salt deposits.',
    palette: { base: '#8f8c86', accent: '#6c6964', dark: '#46433f', craters: true },
    diameter: '939 km', mass: '9.38 × 10²⁰ kg', gravity: '0.28 m/s²',
    temp: '−105 °C mean', distSun: '413 million km (2.77 AU)',
    orbitPeriod: '4.6 Earth years', rotation: '9 h 4 min', tilt: '4°',
    atmosphere: 'Transient water vapour, no substantial atmosphere.',
    moons: '0', surface: 'Cratered rock and ice with bright carbonate salts (Cerealia Facula) and possible water ice in shadowed craters.',
    history: 'Discovered by Giuseppe Piazzi in 1801 and called a planet for decades. NASA’s Dawn orbited it 2015–2018.',
    facts: [
      'Ceres holds about a quarter of the asteroid belt’s total mass.',
      'It may have a subsurface layer of briny water.',
      'Dawn found organic material and ammonium-rich clays, ingredients relevant to habitability.'
    ],
    orbitAU: 2.77, periodYears: 4.6, radiusRel: 0.073, displaySize: 0.07,
    sources: [
      { label: 'NASA Science — Ceres', url: 'https://science.nasa.gov/dwarf-planets/ceres/' },
      { label: 'NASA Dawn Mission', url: 'https://science.nasa.gov/mission/dawn/' }
    ]
  },
  {
    id: 'eris', name: 'Eris', kind: 'dwarf', type: 'Dwarf planet (Scattered disc)',
    tagline: 'The distant world whose discovery redefined the planets.',
    palette: { base: '#d9d6d0', accent: '#a7a49e', dark: '#6b6863', craters: true },
    diameter: '2,326 km', mass: '1.65 × 10²² kg', gravity: '0.82 m/s²',
    temp: '−231 °C mean', distSun: '10.1 billion km (67.8 AU mean)',
    orbitPeriod: '559 Earth years', rotation: '15.8 hours', tilt: 'Unknown',
    atmosphere: 'Thin methane frost that may sublimate near perihelion.',
    moons: '1 (Dysnomia)', surface: 'Extremely reflective methane-ice frost over rock — one of the brightest surfaces in the outer Solar System.',
    history: 'Discovered in 2005 by Brown, Trujillo and Rabinowitz. Its mass, slightly greater than Pluto’s, prompted the IAU’s 2006 dwarf-planet definition.',
    facts: [
      'Eris is more massive than Pluto, though slightly smaller in diameter.',
      'Its orbit is so eccentric that it ranges from 38 to 97 AU from the Sun.',
      'Its name comes from the Greek goddess of strife and discord — fittingly.'
    ],
    orbitAU: 67.8, periodYears: 559, radiusRel: 0.182, displaySize: 0.07,
    sources: [
      { label: 'NASA Science — Eris', url: 'https://science.nasa.gov/dwarf-planets/' },
      { label: 'NASA Planetary Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/' }
    ]
  },
  {
    id: 'haumea', name: 'Haumea', kind: 'dwarf', type: 'Dwarf planet (Kuiper Belt)',
    tagline: 'An egg-shaped world spinning once every four hours.',
    palette: { base: '#d3d0ca', accent: '#9d9a94', dark: '#615f5b', smooth: true },
    diameter: 'About 1,560 km mean (1,960 × 1,518 × 1,052 km)', mass: '4.01 × 10²¹ kg', gravity: '0.44 m/s²',
    temp: '−241 °C mean', distSun: '6.45 billion km (43.1 AU mean)',
    orbitPeriod: '284 Earth years', rotation: '3.9 hours', tilt: 'Unknown',
    atmosphere: 'None detected.', moons: '2 (Hiʻiaka, Namaka)',
    surface: 'Water-ice crystal surface, unusually bright and spectrally uniform.',
    history: 'Discovered in 2004 (announced 2005). Recognised as a dwarf planet in 2008; its elongated shape is caused by its very rapid rotation.',
    facts: [
      'Haumea is the fastest-spinning large object known in the Solar System.',
      'Its two moons are named after daughters of the Hawaiian goddess Haumea.',
      'A ring was reported around it in 2017 — the first known around a dwarf planet.'
    ],
    orbitAU: 43.1, periodYears: 284, radiusRel: 0.122, displaySize: 0.06,
    sources: [
      { label: 'NASA Science — Dwarf Planets', url: 'https://science.nasa.gov/dwarf-planets/' },
      { label: 'NASA Planetary Fact Sheet', url: 'https://nssdc.gsfc.nasa.gov/planetary/factsheet/' }
    ]
  },
  {
    id: 'makemake', name: 'Makemake', kind: 'dwarf', type: 'Dwarf planet (Kuiper Belt)',
    tagline: 'A reddish, methane-frosted world beyond Pluto.',
    palette: { base: '#b98d72', accent: '#8e6449', dark: '#5c3f2c', smooth: true },
    diameter: '1,430 km', mass: 'About 3.1 × 10²¹ kg', gravity: '0.5 m/s²',
    temp: '−239 °C mean', distSun: '6.85 billion km (45.8 AU mean)',
    orbitPeriod: '306 Earth years', rotation: '22.5 hours', tilt: 'Unknown',
    atmosphere: 'Possible thin methane atmosphere, not confirmed.',
    moons: '1 (MK 2)', surface: 'Methane and ethane ices over rock, with a reddish tint from irradiated organics.',
    history: 'Discovered in 2005 and named after the Rapa Nui creator deity. No spacecraft has visited.',
    facts: [
      'Makemake is the second-brightest known Kuiper Belt object after Pluto.',
      'Its discovery helped trigger the reclassification of Pluto.',
      'The Webb telescope is helping characterise its surface chemistry from afar.'
    ],
    orbitAU: 45.8, periodYears: 306, radiusRel: 0.112, displaySize: 0.06,
    sources: [
      { label: 'NASA Science — Dwarf Planets', url: 'https://science.nasa.gov/dwarf-planets/' },
      { label: 'NASA Webb Telescope', url: 'https://science.nasa.gov/mission/webb/' }
    ]
  }
];
