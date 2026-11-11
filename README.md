# COSMOS — Explore the Infinite Universe

An interactive 3D universe explorer built with plain HTML, CSS and JavaScript.
No build step and no npm install required.

## Run it

From inside this folder:

    python3 -m http.server 8000

Then open http://localhost:8000 in a browser.

(Open it through a local server rather than double-clicking index.html, because
browsers block JavaScript module imports on file:// URLs.)

## What is inside

- index.html          — the whole application, with SEO metadata
- css/style.css       — the responsive dark-space design system
- js/app.js           — routing, object profiles, 3D viewers and scene wiring
- js/ui.js            — catalogue rendering, search overlay and navigation
- js/lab.js           — simulations, quiz, glossary, daily facts, life cycle
- js/scenes.js        — hero Earth, spiral galaxy and black-hole visualisation
- js/solar.js         — interactive 3D Solar System and planet viewer
- js/data-*.js        — the full scientific dataset
- js/data.js          — unified data index and search index

## Notes

- Interactive 3D requires WebGL and an internet connection (Three.js is loaded
  from a CDN). A fallback message is shown if it cannot start.
- Earth and Moon textures come from the Three.js public example assets.
  Nebula photographs are from Wikimedia Commons, credited in the UI.
- All figures are drawn from NASA/ESA/ISRO/JPL public fact sheets. Estimates,
  ranges and theoretical concepts are labelled in the interface.
- Planetary orbit distances, sizes and period differences are compressed for
  visibility; this is stated inside the Solar System section. The physical
  values in each profile are the real published values.
- Verified in a browser at phone width. Desktop/tablet layouts use the same
  responsive grid system.
