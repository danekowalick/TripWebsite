# New England 2026 — Family Trip Itinerary

A single-page trip guide for the **October 3–11, 2026** New England trip:
Deerfield and the Berkshires, Concord, Lexington, Quincy, Boston and Plymouth.

Everything is in **`index.html`** — no build step, no dependencies to install.
Double-click it, or open the GitHub Pages URL on a phone.

## What's on the page

- **Logistics** — both Airbnbs with addresses and check-in/out times, who lands
  when, rental cars, and the standing notes (packed lunches, the Walmart+ order,
  who has the receipts).
- **Tickets & reservations** — one table of everything that costs money or needs
  booking, with prices and direct booking links.
- **Route map** — a Leaflet map, one colour per day in visiting order, with the
  two houses pinned. Hidden by default; the hero button reveals it, and the
  choice is remembered.
- **Nine day sections** — each with a timed schedule and a card per stop. Cards
  open a panel with the real history of the place and links to primary sources
  (the sworn 1775 Lexington depositions, Bradford's journal, the Adams papers,
  full texts on Project Gutenberg) rather than to more ticket pages.
- **Heads-up notices** where the planning notes needed a second look — the day
  that was labelled Saturday Oct 9, the Jenney booking link pre-filled for the
  wrong date, and the Braintree/Quincy naming.

The page highlights the current day automatically while the trip is running, and
shows a countdown before it starts.

## Editing it

The itinerary content is plain HTML in `index.html`, one `<section class="day-section">`
per day. Two things to know:

- **Card details panels** come from the `SITE_DATA` object in the script at the
  bottom. A card opens the entry matching its `data-modal="key"`. Add a key there
  and reference it from a card — nothing else needs changing.
- **Map pins** come from the `LOCATIONS` array in the same script. Each entry is
  `{ name, day, lat, lng }`, plus `lodging: true` to draw it as a house marker
  instead of a coloured dot. Pins are joined into that day's line in array order,
  so the order is the route.

Day colours live in `:root` as `--day-1` … `--day-9` and are shared by the day
badges, the map lines and the legend — change one and all three follow.

Photos are hotlinked from Wikimedia Commons. If one ever disappears, the card
falls back to a lettered placeholder rather than a broken image.

## Also here

- **`gallery.html`** — "The Midnight Gallery", the dark museum-at-night art
  gallery this repo started life as. Arrow keys to move between pieces; images in
  `images/`, config at the top of `gallery.js`, colours in `styles.css`.
- **`trip.html`** — redirects to `index.html`, so older shared links still work.
- **`2026 New England Trip Itinerary.txt`** — the source planning notes the page
  was built from.

## Running a local server

Only needed if you want a proper `http://` origin rather than `file://`:

```bash
npx -y serve -l 4321 .
```

Then open <http://localhost:4321>.
