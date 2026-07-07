/* ============================================================
   The Midnight Gallery
   ------------------------------------------------------------
   TO ADD YOUR OWN ART:
   1. Drop your image files into the  images/  folder.
   2. Add (or edit) an entry in the list below.
      - src:    path to your image, e.g. "images/my-painting.jpg"
      - title:  the name of the piece
      - medium: material / technique (e.g. "Oil on canvas")
      - year:   the year, or anything you like
   3. Save and refresh. New pieces fill the gallery left-to-right,
      then onto the next row. Navigate with the arrow keys.

   The gallery is COLS rooms wide (change COLS below to make the
   space wider or narrower).
   ============================================================ */

const COLS = 3;

// Sample works below are open-access (public domain) reproductions from the
// National Gallery of Art, Washington (nga.gov) — placeholders so you can see
// the gallery in action. Replace them with your own pieces.
const artworks = [
  { src: "images/vermeer-girl-with-the-red-hat.jpg", title: "Girl with the Red Hat",       medium: "Johannes Vermeer", year: "c. 1669" },
  { src: "images/rembrandt-self-portrait.jpg",       title: "Self-Portrait",               medium: "Rembrandt van Rijn", year: "1659" },
  { src: "images/renoir-the-dancer.jpg",             title: "The Dancer",                  medium: "Auguste Renoir", year: "1874" },
  { src: "images/monet-morning-haze.jpg",            title: "Morning Haze",                medium: "Claude Monet", year: "1888" },
  { src: "images/vangogh-girl-in-white.jpg",         title: "Girl in White",               medium: "Vincent van Gogh", year: "1890" },
  { src: "images/cassatt-portrait-of-a-lady.jpg",    title: "Portrait of a Lady",          medium: "Mary Cassatt", year: "c. 1887" },
  { src: "images/pissarro-the-bather.jpg",           title: "The Bather",                  medium: "Camille Pissarro", year: "1895" },
  { src: "images/seurat-study-grande-jatte.jpg",     title: "Study for “La Grande Jatte”", medium: "Georges Seurat", year: "1884/85" },
];

const gallery = document.getElementById("gallery");
const minimap = document.getElementById("minimap");

// ---- Build the artwork rooms ----------------------------------
artworks.forEach((art) => {
  const cell = document.createElement("section");
  cell.className = "cell";
  cell.tabIndex = 0;
  cell.setAttribute("aria-label", `${art.title}, ${art.medium}, ${art.year}`);
  cell.innerHTML = `
    <figure class="piece">
      <div class="wall-glow" aria-hidden="true"></div>
      <div class="display">
        <div class="lamp-glow" aria-hidden="true"></div>
        <div class="picture-light" aria-hidden="true">
          <svg viewBox="0 0 200 96" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="brass" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0" stop-color="#7a5e29"/>
                <stop offset="0.18" stop-color="#d8b257"/>
                <stop offset="0.42" stop-color="#f6e3a6"/>
                <stop offset="0.6" stop-color="#c69a40"/>
                <stop offset="1" stop-color="#5d4720"/>
              </linearGradient>
              <linearGradient id="brassArm" x1="0" y1="0" x2="1" y2="0">
                <stop offset="0" stop-color="#5d4720"/>
                <stop offset="0.5" stop-color="#caa24a"/>
                <stop offset="1" stop-color="#5d4720"/>
              </linearGradient>
            </defs>
            <!-- mounting arms -->
            <path d="M82 92 L58 50" stroke="url(#brassArm)" stroke-width="5" stroke-linecap="round"/>
            <path d="M118 92 L142 50" stroke="url(#brassArm)" stroke-width="5" stroke-linecap="round"/>
            <rect x="88" y="86" width="24" height="8" rx="3" fill="#6e5526"/>
            <!-- the cylindrical brass shade -->
            <rect x="40" y="30" width="120" height="26" rx="13" fill="url(#brass)"/>
            <rect x="46" y="34" width="108" height="5" rx="2.5" fill="#fff3cf" opacity="0.55"/>
            <ellipse class="emitter" cx="100" cy="56" rx="58" ry="6" fill="#ffe6a8"/>
          </svg>
        </div>
        <div class="frame">
          <div class="rabbet">
            <div class="mat">
              <div class="art">
                <img src="${art.src}" alt="${art.title}" loading="lazy" />
                <span class="wash" aria-hidden="true"></span>
                <span class="glass" aria-hidden="true"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <figcaption class="caption">
        <h2>${art.title}</h2>
        <p class="meta">${art.medium} &middot; ${art.year}</p>
      </figcaption>
    </figure>
  `;
  gallery.appendChild(cell);
});

// All rooms, in order (index 0 is the intro room).
const cells = Array.from(gallery.querySelectorAll(".cell"));
const ROWS = Math.ceil(cells.length / COLS);

const rowOf = (i) => Math.floor(i / COLS);
const colOf = (i) => i % COLS;

let current = 0;

// ---- Move to a room -------------------------------------------
function goTo(index) {
  if (index < 0 || index >= cells.length) return;
  current = index;
  const cell = cells[index];
  cell.scrollIntoView({ behavior: "smooth", block: "center", inline: "center" });
  cell.focus({ preventScroll: true });   // focus lights the artwork
  updateMinimap();
}

// ---- Arrow-key navigation in 2D -------------------------------
const ARROWS = ["ArrowRight", "ArrowLeft", "ArrowDown", "ArrowUp"];
document.addEventListener("keydown", (e) => {
  if (!ARROWS.includes(e.key)) return;
  e.preventDefault(); // always stop native scroll; we handle movement ourselves

  const col = colOf(current);
  let target = null;
  switch (e.key) {
    case "ArrowRight": if (col < COLS - 1) target = current + 1; break;
    case "ArrowLeft":  if (col > 0)        target = current - 1; break;
    case "ArrowDown":  target = current + COLS; break;
    case "ArrowUp":    target = current - COLS; break;
  }

  // only move if that room actually exists
  if (target !== null && target >= 0 && target < cells.length) {
    hideHintsAfterFirstMove();
    goTo(target);
  }
});

// Click a room to bring it to center.
cells.forEach((cell, i) => {
  cell.addEventListener("click", () => {
    // on touch devices (no hover) also toggle the light
    const piece = cell.querySelector(".piece");
    if (piece && window.matchMedia("(hover: none)").matches) piece.classList.toggle("lit");
    if (i !== current) goTo(i);
  });
});

// ---- Keep `current` in sync when the user scrolls/swipes ------
let scrollTimer;
gallery && window.addEventListener("scroll", () => {
  clearTimeout(scrollTimer);
  scrollTimer = setTimeout(() => {
    const cx = window.scrollX + window.innerWidth / 2;
    const cy = window.scrollY + window.innerHeight / 2;
    let best = current, bestDist = Infinity;
    cells.forEach((cell, i) => {
      const r = cell.getBoundingClientRect();
      const x = window.scrollX + r.left + r.width / 2;
      const y = window.scrollY + r.top + r.height / 2;
      const d = (x - cx) ** 2 + (y - cy) ** 2;
      if (d < bestDist) { bestDist = d; best = i; }
    });
    if (best !== current) {
      current = best;
      cells[best].focus({ preventScroll: true }); // keep focus + lighting on the centered room
      updateMinimap();
    }
  }, 120);
}, { passive: true });

// ---- Minimap --------------------------------------------------
minimap.style.gridTemplateColumns = `repeat(${COLS}, 9px)`;
const dots = [];
for (let r = 0; r < ROWS; r++) {
  for (let c = 0; c < COLS; c++) {
    const i = r * COLS + c;
    const dot = document.createElement("button");
    dot.type = "button";
    if (i < cells.length) {
      dot.className = "dot filled";
      dot.setAttribute("aria-label", i === 0 ? "Entrance" : `Artwork ${i}`);
      dot.addEventListener("click", () => goTo(i));
    } else {
      dot.className = "dot empty";
      dot.tabIndex = -1;
      dot.setAttribute("aria-hidden", "true");
    }
    minimap.appendChild(dot);
    dots[i] = dot;
  }
}
function updateMinimap() {
  dots.forEach((d, i) => d.classList.toggle("current", i === current));
}
updateMinimap();

// ---- Fade rooms in as they're entered -------------------------
const reveal = new IntersectionObserver(
  (entries) => entries.forEach((en) => { if (en.isIntersecting) en.target.classList.add("in-view"); }),
  { threshold: 0.5 }
);
cells.forEach((c) => reveal.observe(c));

// ---- First-move hint ------------------------------------------
function hideHintsAfterFirstMove() {
  const hint = document.querySelector(".nav-hint");
  if (hint) { hint.style.transition = "opacity .8s ease"; hint.style.opacity = "0"; }
}

// ---- Always begin at the entrance -----------------------------
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
current = 0;
window.scrollTo(0, 0);
cells[0].focus({ preventScroll: true });
updateMinimap();
