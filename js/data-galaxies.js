// COSMOS — galaxy and nebula dataset.
// Distances: NASA/ESA published values. "Estimated" values are labelled.

export const galaxies = [
  {
    id: 'milky-way', name: 'Milky Way', alt: 'Our home galaxy',
    type: 'Barred spiral galaxy (SBbc)', size: '≈100,000 light-years across the disk',
    distance: 'We are inside it — the Sun lies ≈26,000 ly from the centre',
    stars: '100–400 billion (estimated)', constellation: 'Sagittarius (centre)',
    structure: 'A central bar, four major spiral arms (Perseus, Scutum–Centaurus, Sagittarius–Carina, Norma), a thick stellar halo and a supermassive black hole, Sagittarius A*.',
    description: 'The Milky Way is a barred spiral galaxy containing our Solar System. Its disk is about 1,000 light-years thick, and it is surrounded by a dark-matter halo far larger than the visible galaxy.',
    facts: [
      'Sagittarius A* has a mass of about 4.3 million Suns.',
      'The Milky Way is on a collision course with Andromeda in roughly 4.5 billion years.',
      'Its oldest stars are more than 13 billion years old.'
    ],
    sources: [
      { label: 'NASA Science — Galaxies', url: 'https://science.nasa.gov/universe/galaxies/' },
      { label: 'ESA — Milky Way', url: 'https://www.esa.int/Science_Exploration/Space_Science' }
    ]
  },
  {
    id: 'andromeda', name: 'Andromeda', alt: 'M31',
    type: 'Spiral galaxy (SA(s)b)', size: '≈220,000 light-years across',
    distance: '≈2.54 million light-years', stars: '≈1 trillion (estimated)',
    constellation: 'Andromeda',
    structure: 'A grand-design spiral with a compact bright nucleus, prominent dust lanes and a warped outer disk. It hosts a supermassive black hole of ≈100 million solar masses.',
    description: 'Andromeda is the nearest large spiral galaxy and the most massive member of the Local Group. It is visible to the naked eye from dark skies and is approaching the Milky Way at about 110 km/s.',
    facts: [
      'Andromeda is roughly twice as wide as the Milky Way.',
      'It has at least 14 known satellite galaxies.',
      'Its two nuclei suggest it absorbed a smaller galaxy in the past.'
    ],
    sources: [
      { label: 'NASA Science — Andromeda', url: 'https://science.nasa.gov/universe/galaxies/' },
      { label: 'NASA Hubble — M31', url: 'https://science.nasa.gov/mission/hubble/' }
    ]
  },
  {
    id: 'triangulum', name: 'Triangulum', alt: 'M33',
    type: 'Spiral galaxy (SA(s)cd)', size: '≈60,000 light-years across',
    distance: '≈2.73 million light-years', stars: '≈40 billion (estimated)',
    constellation: 'Triangulum',
    structure: 'Loose, open spiral arms with many star-forming regions and little central bulge — a "flocculent" spiral.',
    description: 'Triangulum is the third-largest galaxy in the Local Group. It is probably a distant satellite of Andromeda and is rich in glowing hydrogen clouds.',
    facts: [
      'It contains NGC 604, one of the largest known star-forming regions.',
      'Triangulum may be interacting with Andromeda gravitationally.',
      'It is the most distant object visible to the unaided eye from dark sites.'
    ],
    sources: [
      { label: 'NASA Science — Galaxies', url: 'https://science.nasa.gov/universe/galaxies/' },
      { label: 'ESA — Local Group', url: 'https://www.esa.int/Science_Exploration/Space_Science' }
    ]
  },
  {
    id: 'whirlpool', name: 'Whirlpool Galaxy', alt: 'M51 / NGC 5194',
    type: 'Interacting grand-design spiral (SA(s)bc)', size: '≈76,000 light-years across',
    distance: '≈31 million light-years', stars: '≈100 billion (estimated)',
    constellation: 'Canes Venatici',
    structure: 'A textbook spiral with two sweeping arms and a smaller companion, NGC 5195, connected by a bridge of gas and dust.',
    description: 'The Whirlpool is one of the most photographed galaxies. Its arms are bright with young stars because the gravitational interaction with its companion compresses gas into star formation.',
    facts: [
      'It was the first galaxy identified as a spiral, by Lord Rosse in 1845.',
      'Three supernovae have been observed in it since 1994.',
      'It is a favourite target for amateur astronomers.'
    ],
    sources: [
      { label: 'NASA Science — Galaxies', url: 'https://science.nasa.gov/universe/galaxies/' },
      { label: 'NASA Hubble', url: 'https://science.nasa.gov/mission/hubble/' }
    ]
  },
  {
    id: 'sombrero', name: 'Sombrero Galaxy', alt: 'M104 / NGC 4594',
    type: 'Spiral galaxy with a prominent bulge', size: '≈50,000 light-years across',
    distance: '≈31 million light-years', stars: 'Hundreds of billions (estimated)',
    constellation: 'Virgo',
    structure: 'A huge, bright central bulge and a sharp dust lane seen almost edge-on, giving the galaxy its hat-like silhouette.',
    description: 'Sombrero is one of the most massive galaxies in the nearby Virgo cluster region, with a nucleus that is bright across the electromagnetic spectrum — a sign of an active black hole.',
    facts: [
      'Its central black hole is roughly a billion solar masses.',
      'It hosts a rich system of about 2,000 globular clusters.',
      'Webb’s mid-infrared view revealed smooth, regular dust distribution in its halo.'
    ],
    sources: [
      { label: 'NASA Science — Galaxies', url: 'https://science.nasa.gov/universe/galaxies/' },
      { label: 'NASA Webb — Sombrero', url: 'https://science.nasa.gov/mission/webb/' }
    ]
  },
  {
    id: 'lmc', name: 'Large Magellanic Cloud', alt: 'LMC',
    type: 'Magellanic barred spiral (SB(s)m)', size: '≈14,000 light-years across',
    distance: '≈163,000 light-years', stars: '≈30 billion (estimated)',
    constellation: 'Dorado / Mensa',
    structure: 'An irregular, gas-rich galaxy with a central bar and one arm, plus the giant Tarantula Nebula star-forming region.',
    description: 'The LMC is a satellite galaxy of the Milky Way and a laboratory for nearby star formation. Supernova 1987A, the closest supernova in nearly 400 years, exploded there.',
    facts: [
      'It is visible to the naked eye from the southern hemisphere.',
      'The Tarantula Nebula is the most active star-forming region in the Local Group.',
      'It is being pulled apart by the Milky Way’s gravity.'
    ],
    sources: [
      { label: 'NASA Science — LMC', url: 'https://science.nasa.gov/universe/galaxies/' },
      { label: 'ESA — Magellanic Clouds', url: 'https://www.esa.int/Science_Exploration/Space_Science' }
    ]
  },
  {
    id: 'smc', name: 'Small Magellanic Cloud', alt: 'SMC',
    type: 'Dwarf irregular galaxy', size: '≈7,000 light-years across',
    distance: '≈200,000 light-years', stars: '≈3 billion (estimated)',
    constellation: 'Tucana',
    structure: 'An irregular, elongated dwarf with a bridge of gas connecting it to the LMC.',
    description: 'The SMC is a small satellite galaxy orbiting the Milky Way alongside the LMC. It is low in metals, making its stars useful analogues of the early universe.',
    facts: [
      'It was used by Henrietta Leavitt to discover the Cepheid period–luminosity relation.',
      'Its shape is being distorted by the LMC and the Milky Way.',
      'It contains few heavy elements compared with our galaxy.'
    ],
    sources: [
      { label: 'NASA Science — Galaxies', url: 'https://science.nasa.gov/universe/galaxies/' },
      { label: 'NASA Hubble', url: 'https://science.nasa.gov/mission/hubble/' }
    ]
  },
  {
    id: 'centaurus-a', name: 'Centaurus A', alt: 'NGC 5128',
    type: 'Peculiar elliptical / lenticular galaxy', size: '≈60,000 light-years across',
    distance: '≈13 million light-years', stars: 'Hundreds of billions (estimated)',
    constellation: 'Centaurus',
    structure: 'A giant elliptical galaxy crossed by a dramatic dust lane — the remnant of a merger — with relativistic jets from its central black hole.',
    description: 'Centaurus A is the closest active galaxy to Earth. Its jets of plasma are millions of light-years long and glow in radio waves.',
    facts: [
      'It is the fifth-brightest galaxy in the sky.',
      'Its radio lobes span more than a million light-years.',
      'A collision with a spiral galaxy produced its dust lane.'
    ],
    sources: [
      { label: 'NASA Science — Active Galaxies', url: 'https://science.nasa.gov/universe/galaxies/' },
      { label: 'NASA Chandra', url: 'https://science.nasa.gov/mission/chandra/' }
    ]
  },
  {
    id: 'pinwheel', name: 'Pinwheel Galaxy', alt: 'M101',
    type: 'Face-on spiral galaxy (SAB(rs)cd)', size: '≈170,000 light-years across',
    distance: '≈21 million light-years', stars: '≈1 trillion (estimated)',
    constellation: 'Ursa Major',
    structure: 'A nearly perfect face-on spiral with asymmetric arms and hundreds of star-forming regions.',
    description: 'The Pinwheel is a giant spiral galaxy seen from above, giving an uninterrupted view of its structure. It hosted the bright supernova SN 2023ixf.',
    facts: [
      'It is roughly twice the diameter of the Milky Way.',
      'Its asymmetry is likely caused by encounters with companion galaxies.',
      'SN 2023ixf was the closest supernova observed in a decade.'
    ],
    sources: [
      { label: 'NASA Science — Galaxies', url: 'https://science.nasa.gov/universe/galaxies/' },
      { label: 'NASA Hubble', url: 'https://science.nasa.gov/mission/hubble/' }
    ]
  }
];

export const nebulae = [
  {
    id: 'orion-nebula', name: 'Orion Nebula', alt: 'M42',
    type: 'Emission and reflection nebula', distance: '≈1,344 light-years',
    size: '≈24 light-years across', constellation: 'Orion',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Orion_Nebula_-_Hubble_2006_mosaic_18000.jpg?width=900',
    visual: 'orion',
    description: 'The Orion Nebula is the nearest large stellar nursery to Earth, a glowing cloud of hydrogen where thousands of stars are being born. Its centre, the Trapezium Cluster, contains young, hot stars whose ultraviolet light ionises the surrounding gas.',
    science: 'Radio and infrared observations show protoplanetary disks (proplyds) around newborn stars — planetary systems in formation.',
    facts: [
      'It contains more than 700 stars at various stages of formation.',
      'The Trapezium’s four brightest stars are only about 300,000 years old.',
      'It is visible to the naked eye as a fuzzy patch in Orion’s Sword.'
    ],
    sources: [
      { label: 'NASA Science — Orion Nebula', url: 'https://science.nasa.gov/universe/star-clusters-nebulae/' },
      { label: 'ESA Hubble', url: 'https://esahubble.org/' }
    ]
  },
  {
    id: 'eagle-nebula', name: 'Eagle Nebula', alt: 'M16',
    type: 'Emission nebula and star cluster', distance: '≈5,700–7,000 light-years',
    size: '≈70 light-years across', constellation: 'Serpens',
    visual: 'eagle',
    description: 'The Eagle Nebula is a star-forming region famous for the Pillars of Creation — towering columns of cold gas and dust being sculpted by radiation from young massive stars.',
    science: 'Hubble’s 1995 and 2014 images and Webb’s 2022 infrared view revealed evaporating gaseous globules inside the pillars, where new stars may be forming.',
    facts: [
      'The tallest pillar is about 4 light-years high — the distance from the Sun to Proxima Centauri.',
      'The nebula is about 5.5 million years old.',
      'It contains the open cluster NGC 6611.'
    ],
    sources: [
      { label: 'NASA Science — Eagle Nebula', url: 'https://science.nasa.gov/universe/star-clusters-nebulae/' },
      { label: 'NASA Webb — Pillars of Creation', url: 'https://science.nasa.gov/mission/webb/' }
    ]
  },
  {
    id: 'crab-nebula', name: 'Crab Nebula', alt: 'M1',
    type: 'Supernova remnant', distance: '≈6,500 light-years',
    size: '≈11 light-years across', constellation: 'Taurus',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Crab_Nebula.jpg?width=900',
    visual: 'crab',
    description: 'The Crab Nebula is the expanding wreckage of a star that exploded in 1054 AD, witnessed and recorded by astronomers in China, Japan and the Islamic world. At its heart is a pulsar spinning about 30 times a second.',
    science: 'The pulsar’s magnetic field accelerates electrons to near light speed, producing synchrotron radiation across the nebula. It is a laboratory for studying extreme plasma physics.',
    facts: [
      'The supernova was visible in daylight for 23 days in 1054.',
      'The nebula is expanding at about 1,500 km/s.',
      'The central pulsar is about 20 km across but more massive than the Sun.'
    ],
    sources: [
      { label: 'NASA Science — Crab Nebula', url: 'https://science.nasa.gov/universe/star-clusters-nebulae/' },
      { label: 'NASA Chandra — Crab', url: 'https://science.nasa.gov/mission/chandra/' }
    ]
  },
  {
    id: 'carina-nebula', name: 'Carina Nebula', alt: 'NGC 3372',
    type: 'Emission nebula and star-forming region', distance: '≈7,500 light-years',
    size: '≈300 light-years across', constellation: 'Carina',
    visual: 'carina',
    description: 'Carina is one of the largest and brightest nebulae in the sky, containing some of the most massive stars known, including the unstable supergiant Eta Carinae. Webb’s "Cosmic Cliffs" image revealed young stars and jets emerging from its dust.',
    science: 'Its intense ultraviolet radiation carves dramatic ridges, while infrared observations peer through dust to reveal embedded protostars.',
    facts: [
      'It is brighter than the Orion Nebula but much farther away.',
      'Eta Carinae has erupted dramatically and is expected to end in a supernova.',
      'The nebula is home to the open cluster Trumpler 14.'
    ],
    sources: [
      { label: 'NASA Science — Carina Nebula', url: 'https://science.nasa.gov/universe/star-clusters-nebulae/' },
      { label: 'NASA Webb', url: 'https://science.nasa.gov/mission/webb/' }
    ]
  },
  {
    id: 'ring-nebula', name: 'Ring Nebula', alt: 'M57',
    type: 'Planetary nebula', distance: '≈2,570 light-years',
    size: '≈1.3 light-years across', constellation: 'Lyra',
    visual: 'ring',
    description: 'The Ring Nebula is the glowing shell of gas shed by a dying Sun-like star, lit by the exposed white dwarf at its centre. Its name is misleading: planetary nebulae have nothing to do with planets.',
    science: 'Webb’s infrared observations show a complex structure of filaments and a football-shaped inner region, not a simple ring.',
    facts: [
      'It lies about 2,570 light-years away in the constellation Lyra.',
      'Its central white dwarf is roughly the size of Earth.',
      'It is around 7,000 years old and still expanding.'
    ],
    sources: [
      { label: 'NASA Science — Planetary Nebulae', url: 'https://science.nasa.gov/universe/star-clusters-nebulae/' },
      { label: 'NASA Hubble', url: 'https://science.nasa.gov/mission/hubble/' }
    ]
  },
  {
    id: 'pillars-creation', name: 'Pillars of Creation', alt: 'M16 pillar complex',
    type: 'Star-forming pillar structure', distance: '≈6,500–7,000 light-years',
    size: 'Tallest pillar ≈4 light-years', constellation: 'Serpens',
    image: 'https://commons.wikimedia.org/wiki/Special:FilePath/Pillars_of_creation_2014_HST_WFC3-UVIS_full-res_denoised.jpg?width=900',
    visual: 'pillars',
    description: 'Three towers of cold molecular hydrogen and dust rise from the Eagle Nebula, eroded by ultraviolet radiation from massive nearby stars. They are among the most iconic astronomical images ever taken.',
    science: 'Infrared views from Hubble and Webb show stars forming inside the dense pillar tips and reveal how radiation sculpts the cloud over time.',
    facts: [
      'Hubble first photographed them in 1995 and again in 2014.',
      'Webb’s 2022 image showed dozens of newly formed stars hidden inside the dust.',
      'The pillars are slowly being eroded by radiation and will last a few million years.'
    ],
    sources: [
      { label: 'NASA — Pillars of Creation', url: 'https://science.nasa.gov/mission/hubble/' },
      { label: 'NASA Webb', url: 'https://science.nasa.gov/mission/webb/' }
    ]
  },
  {
    id: 'helix-nebula', name: 'Helix Nebula', alt: 'NGC 7293',
    type: 'Planetary nebula', distance: '≈650 light-years',
    size: '≈2.5 light-years across', constellation: 'Aquarius',
    visual: 'helix',
    description: 'The Helix is one of the closest planetary nebulae to Earth, an expanding shell of gas from a dying star. Its cometary knots — dense clumps with tails — are some of the most detailed structures known in a nebula.',
    science: 'Its age and simple geometry make it a benchmark for studies of how Sun-like stars shed their outer layers.',
    facts: [
      'It is about 650 light-years away, making it relatively close.',
      'It contains thousands of cometary knots, each the size of the Solar System.',
      'Its central white dwarf is extremely hot — nearly 120,000 °C.'
    ],
    sources: [
      { label: 'NASA Science — Nebulae', url: 'https://science.nasa.gov/universe/star-clusters-nebulae/' },
      { label: 'ESA Hubble', url: 'https://esahubble.org/' }
    ]
  },
  {
    id: 'horsehead-nebula', name: 'Horsehead Nebula', alt: 'Barnard 33',
    type: 'Dark nebula', distance: '≈1,375 light-years',
    size: '≈8 light-years across', constellation: 'Orion',
    visual: 'horsehead',
    description: 'The Horsehead is a dark cloud of dust silhouetted against a glowing hydrogen region. It is part of the Orion Molecular Cloud Complex, a vast breeding ground of stars.',
    science: 'The dark cloud is cold and dense — ideal conditions for hydrogen molecules and dust to produce future stars. Webb’s infrared images revealed far more of its internal structure.',
    facts: [
      'Its distinctive shape is sculpted by radiation from a nearby massive star.',
      'It is about 1,375 light-years away and roughly 8 light-years wide.',
      'The red background is hydrogen gas glowing after being ionised.'
    ],
    sources: [
      { label: 'NASA Science — Dark Nebulae', url: 'https://science.nasa.gov/universe/star-clusters-nebulae/' },
      { label: 'ESA Hubble', url: 'https://esahubble.org/' }
    ]
  }
];
