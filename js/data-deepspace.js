// COSMOS — black holes, extreme objects and stellar data.

export const blackHoles = [
  {
    id: 'stellar-black-hole', name: 'Stellar-Mass Black Hole', type: 'Stellar black hole',
    mass: '≈3–100 solar masses', distance: 'Scattered through the Milky Way, e.g. Cygnus X-1 at ≈7,200 ly',
    status: 'Observed', visual: 'bh',
    description: 'Formed when a massive star (usually more than 20 solar masses) exhausts its fuel, its core collapses, and no force can stop the collapse. Stellar black holes are detected when they pull gas from a companion star, producing X-rays.',
    facts: [
      'Cygnus X-1 was the first widely accepted black hole candidate, identified in 1964.',
      'The Milky Way is estimated to contain around 100 million stellar black holes.',
      'A 2024 Gaia discovery found a dormant stellar black hole only ~1,560 ly away.'
    ],
    sources: [
      { label: 'NASA Science — Black Holes', url: 'https://science.nasa.gov/universe/black-holes/' },
      { label: 'NASA Chandra', url: 'https://science.nasa.gov/mission/chandra/' }
    ]
  },
  {
    id: 'supermassive-black-hole', name: 'Supermassive Black Hole', type: 'Supermassive black hole',
    mass: 'Millions to tens of billions of solar masses', distance: 'Centres of most large galaxies',
    status: 'Observed', visual: 'bh',
    description: 'Every large galaxy appears to host a supermassive black hole at its centre. Their origin is still debated: they may grow from early "seed" black holes through mergers and gas accretion.',
    facts: [
      'Their mass correlates with the bulge mass of their host galaxy.',
      'Some formed within the first billion years of the universe — surprisingly early.',
      'They power quasars when actively accreting matter.'
    ],
    sources: [
      { label: 'NASA Science — Black Holes', url: 'https://science.nasa.gov/universe/black-holes/' },
      { label: 'ESA — Black Holes', url: 'https://www.esa.int/Science_Exploration/Space_Science' }
    ]
  },
  {
    id: 'intermediate-black-hole', name: 'Intermediate-Mass Black Hole', type: 'Intermediate-mass black hole',
    mass: '≈100–100,000 solar masses', distance: 'Candidates in dense star clusters and dwarf galaxies',
    status: 'Candidates', visual: 'bh',
    description: 'A rare class between stellar and supermassive black holes. Candidates include the centre of the globular cluster 47 Tucanae and the galaxy LEDA 1313424, though none is confirmed beyond doubt.',
    facts: [
      'Their existence would help explain how supermassive black holes grow.',
      'They may form from the runaway collision of stars in dense clusters.',
      'Future gravitational-wave observatories could confirm them.'
    ],
    sources: [
      { label: 'NASA Science — Black Holes', url: 'https://science.nasa.gov/universe/black-holes/' },
      { label: 'NASA Hubble', url: 'https://science.nasa.gov/mission/hubble/' }
    ]
  },
  {
    id: 'sagittarius-a', name: 'Sagittarius A*', type: 'Supermassive black hole',
    mass: '≈4.3 million solar masses', distance: '≈26,000 light-years (Galactic Centre)',
    status: 'Observed', visual: 'bh',
    description: 'The supermassive black hole at the heart of the Milky Way, identified by the orbits of stars whipping around it. The Event Horizon Telescope released its first image in 2022.',
    facts: [
      'The star S2 orbits it every 16 years at up to 3% of light speed.',
      'Its shadow is about 52 micro-arcseconds across in the sky.',
      'It is currently quiet, accreting only a trickle of matter.'
    ],
    sources: [
      { label: 'NASA Science — Sgr A*', url: 'https://science.nasa.gov/universe/black-holes/' },
      { label: 'Event Horizon Telescope', url: 'https://eventhorizontelescope.org/' }
    ]
  },
  {
    id: 'm87', name: 'M87*', type: 'Supermassive black hole',
    mass: '≈6.5 billion solar masses', distance: '≈53 million light-years',
    status: 'Observed', visual: 'bh',
    description: 'The black hole at the centre of the galaxy Messier 87. In 2019 the Event Horizon Telescope published the first-ever image of a black hole shadow, showing a bright ring of hot gas around a dark interior.',
    facts: [
      'M87* launches a jet of plasma about 5,000 light-years long.',
      'Its shadow is about 42 micro-arcseconds wide — like seeing an apple on the Moon.',
      'The image took a planet-sized array of radio telescopes to make.'
    ],
    sources: [
      { label: 'Event Horizon Telescope', url: 'https://eventhorizontelescope.org/' },
      { label: 'NASA Science — Black Holes', url: 'https://science.nasa.gov/universe/black-holes/' }
    ]
  },
  {
    id: 'quasar', name: 'Quasar', type: 'Active galactic nucleus',
    mass: 'Host black hole: millions to billions of solar masses', distance: 'Billions of light-years',
    status: 'Observed', visual: 'quasar',
    description: 'A quasar is the brilliant core of a galaxy where a supermassive black hole is consuming gas. Radiation from the accretion disk can outshine the entire host galaxy by a factor of thousands.',
    facts: [
      'The record-holder J0529-4351 accretes about one solar mass per day.',
      'Quasars were first identified as distant radio sources in the 1950s.',
      'Their light can be used to probe the intergalactic medium.'
    ],
    sources: [
      { label: 'NASA Science — Quasars', url: 'https://science.nasa.gov/universe/black-holes/' },
      { label: 'ESA — Quasars', url: 'https://www.esa.int/Science_Exploration/Space_Science' }
    ]
  },
  {
    id: 'magnetar', name: 'Magnetar', type: 'Neutron star with extreme magnetism',
    mass: '≈1.4 solar masses', distance: 'e.g. SGR 1806−20 at ≈50,000 ly',
    status: 'Observed', visual: 'neutron',
    description: 'A neutron star with a magnetic field up to a quadrillion times Earth’s. Magnetars produce giant gamma-ray flares from the reorganisation of their crust and field.',
    facts: [
      'A magnetar’s field could strip information from a credit card at 100,000 km.',
      'The 2004 flare from SGR 1806−20 briefly ionised Earth’s upper atmosphere.',
      'Only about 30 magnetars are known.'
    ],
    sources: [
      { label: 'NASA Science — Magnetars', url: 'https://science.nasa.gov/universe/neutron-stars/' },
      { label: 'NASA Chandra', url: 'https://science.nasa.gov/mission/chandra/' }
    ]
  },
  {
    id: 'gamma-ray-burst', name: 'Gamma-Ray Burst', type: 'Extreme transient event',
    mass: 'Progenitor: massive star or neutron-star merger', distance: 'Up to billions of light-years',
    status: 'Observed', visual: 'grb',
    description: 'Gamma-ray bursts are the most energetic explosions known, releasing in seconds as much energy as the Sun will emit in its lifetime. Long bursts accompany massive-star collapse; short bursts come from neutron-star mergers.',
    facts: [
      'GRB 080319B was briefly visible to the naked eye despite being 7.5 billion light-years away.',
      'The 2017 neutron-star merger GW170817 was observed in gravitational waves and light.',
      'Their afterglows help map star formation in the early universe.'
    ],
    sources: [
      { label: 'NASA Science — Gamma-Ray Bursts', url: 'https://science.nasa.gov/universe/gamma-ray-bursts/' },
      { label: 'NASA Swift', url: 'https://science.nasa.gov/mission/swift/' }
    ]
  }
];

export const blackHolePhysics = [
  {
    id: 'event-horizon', name: 'Event Horizon', status: 'Confirmed framework',
    description: 'The boundary inside which escape velocity exceeds the speed of light. Nothing — not even light — can return from inside. Its size is set by the black hole’s mass: the Schwarzschild radius.',
    note: 'The horizon itself has never been imaged directly; the EHT images show the shadow and surrounding emission.'
  },
  {
    id: 'accretion-disk', name: 'Accretion Disk', status: 'Observed',
    description: 'Infalling gas spirals inward, forming a hot disk. Friction and magnetic fields heat it to millions of degrees, producing X-rays and visible light — the glow that makes black holes visible.',
    note: 'Observed around stellar black holes, quasars and Sgr A*.'
  },
  {
    id: 'gravitational-lensing', name: 'Gravitational Lensing', status: 'Observed',
    description: 'Mass bends spacetime, so light from behind a massive object is deflected and magnified. Around black holes, lensing produces multiple images and warped rings of background light.',
    note: 'Routinely observed; used to map dark matter.'
  },
  {
    id: 'time-dilation', name: 'Time Dilation', status: 'Confirmed prediction',
    description: 'Clocks deeper in a gravitational field tick more slowly relative to distant clocks. Near an event horizon, time appears to freeze from an outside observer’s view.',
    note: 'Measured with atomic clocks on Earth and in orbit.'
  },
  {
    id: 'hawking-radiation', name: 'Hawking Radiation', status: 'Theoretical',
    description: 'Quantum effects near the horizon imply black holes should slowly emit thermal radiation and evaporate. The effect is far too faint to detect for known black holes.',
    note: 'Widely accepted theoretically, but not yet observed.'
  }
];

export const starTypes = [
  { id: 'sun', name: 'The Sun', type: 'G2V yellow dwarf', temp: '5,772 K surface; 15 million K core', mass: '1 solar mass', luminosity: '1 L☉', lifetime: '≈10 billion years (4.6 Gyr so far)', description: 'Our star, a middle-aged yellow dwarf fusing hydrogen into helium. It holds 99.86% of the Solar System’s mass.' },
  { id: 'red-dwarf', name: 'Red Dwarf', type: 'M-type main sequence', temp: '2,500–3,900 K', mass: '0.08–0.5 solar masses', luminosity: '0.0001–0.05 L☉', lifetime: 'Tens of billions to trillions of years', description: 'The most common stars in the galaxy. Cool, dim and long-lived, they are prime targets in the search for habitable planets.' },
  { id: 'yellow-dwarf', name: 'Yellow Dwarf', type: 'G-type main sequence', temp: '5,200–6,000 K', mass: '0.8–1.2 solar masses', luminosity: '0.6–1.5 L☉', lifetime: '≈10 billion years', description: 'Stars like the Sun. They fuse hydrogen steadily and end as red giants, then white dwarfs.' },
  { id: 'blue-giant', name: 'Blue Giant', type: 'O or B main sequence', temp: '10,000–40,000 K', mass: '8–50+ solar masses', luminosity: '10,000–100,000 L☉', lifetime: 'A few million years', description: 'Extremely hot, luminous and short-lived. They live fast, burning through fuel and often ending as supernovae.' },
  { id: 'red-giant', name: 'Red Giant', type: 'Late-stage evolved star', temp: '≈3,000–4,500 K', mass: '0.3–8 solar masses', luminosity: '100–1,000 L☉', lifetime: 'Hundreds of millions of years (phase)', description: 'A Sun-like star that has exhausted core hydrogen and expanded enormously. Betelgeuse is a red supergiant, a more massive relative.' },
  { id: 'supergiant', name: 'Supergiant', type: 'Massive evolved star', temp: '3,500–20,000 K', mass: '8–40 solar masses', luminosity: '10,000–1,000,000 L☉', lifetime: 'Millions of years', description: 'Enormous stars near the end of their lives. Many become supernovae, leaving neutron stars or black holes.' },
  { id: 'white-dwarf', name: 'White Dwarf', type: 'Stellar remnant', temp: '4,000–100,000+ K', mass: '≈0.6 solar masses', luminosity: '0.001–0.01 L☉', lifetime: 'Cooling over billions of years', description: 'The exposed core of a dead Sun-like star, about Earth-sized and incredibly dense. Sirius B is the nearest example.' },
  { id: 'neutron-star', name: 'Neutron Star', type: 'Stellar remnant', temp: '≈600,000 K surface', mass: '1.1–2.1 solar masses', luminosity: 'Variable', lifetime: 'Stable for billions of years', description: 'A city-sized remnant of a supernova, so dense that a teaspoon would weigh billions of tonnes.' },
  { id: 'pulsar', name: 'Pulsar', type: 'Rotating neutron star', temp: 'Extremely hot surface', mass: '≈1.4 solar masses', luminosity: 'Beamed radio/X-ray emission', lifetime: 'Millions of years as a pulsar', description: 'A magnetised neutron star spinning rapidly and sweeping beams of radiation across space, seen as regular pulses.' },
  { id: 'binary-star', name: 'Binary Star System', type: 'Two or more bound stars', temp: 'Depends on components', mass: 'Depends on components', luminosity: 'Depends on components', lifetime: 'Depends on masses', description: 'Most stars are in multiple systems. Binaries let astronomers measure stellar masses precisely from their orbits.' },
  { id: 'variable-star', name: 'Variable Star', type: 'Star with changing brightness', temp: 'Varies', mass: 'Varies', luminosity: 'Varies', lifetime: 'Varies', description: 'Stars whose brightness changes due to pulsation, eruptions or eclipses. Cepheids are crucial cosmic distance markers.' },
  { id: 'protostar', name: 'Protostar', type: 'Star in formation', temp: 'Cool surface, hot accreting core', mass: 'Growing toward a stable star', luminosity: 'Mainly infrared', lifetime: '≈100,000 to a few million years', description: 'A collapsing cloud core gathering mass from its disk. At about 15 million K, hydrogen fusion ignites and a star is born.' }
];

export const starLifeCycle = [
  { step: 'Molecular cloud', detail: 'A cold, dense cloud of hydrogen and dust begins to collapse under gravity. The Orion Nebula is one such nursery.' },
  { step: 'Protostar', detail: 'The core contracts and heats while a disk of gas and dust forms. Jets carve cavities through the surrounding cloud.' },
  { step: 'Main sequence', detail: 'Hydrogen fusion ignites. Radiation pressure balances gravity and the star stabilises for millions to trillions of years.' },
  { step: 'Red giant or supergiant', detail: 'Core hydrogen runs out. The star expands and fuses heavier elements in shells or successive core stages.' },
  { step: 'Mass loss / supernova', detail: 'Sun-like stars shed their outer layers (planetary nebula). Massive stars collapse and explode as supernovae.' },
  { step: 'Remnant', detail: 'A white dwarf for lower-mass stars; a neutron star or black hole for the most massive.' },
  { step: 'Recycling', detail: 'Ejecta enrich the interstellar medium with heavy elements, seeding the next generation of stars and planets.' }
];
