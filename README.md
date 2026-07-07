# The Midnight Gallery

A dark "museum at night" website for your art. Every piece sits in its own
darkened room until you reach it — a lamp above the frame lights up and the
artwork glows to life.

You wander the gallery in **2D**: use the **arrow keys** to move
up / down / left / right between pieces (they snap into place), or swipe /
trackpad-scroll in any direction. The little dot map in the lower-right shows
where you are. Hovering a piece with the mouse also lights it.

## View it

The easiest way: just double-click **`index.html`** — it opens in your browser.

(Or, inside Claude Code, use the preview panel / the `gallery` launch config.)

## Add your own art

1. Put your image files in the **`images/`** folder
   (`.jpg`, `.png`, `.webp`, or `.svg` all work).
2. Open **`gallery.js`** and edit the `artworks` list near the top. Each piece
   looks like this:

   ```js
   { src: "images/my-painting.jpg", title: "Morning Tide", medium: "Oil on canvas", year: "2025" },
   ```

   - **src** — path to your image file
   - **title** — the name of the piece
   - **medium** — material / technique
   - **year** — year (or anything you like)

3. Add as many lines as you have pieces. Save and refresh the page. New pieces
   fill the gallery left-to-right, then drop to the next row. To make the space
   wider or narrower, change `COLS` at the top of `gallery.js`.

The images currently in `images/` are sample paintings from the National
Gallery of Art, Washington (nga.gov) **Open Access** collection — public-domain
works, free to use, here purely as placeholders so you can see the gallery in
action. Replace them with your own work and update the `artworks` list.

## Make it yours (optional)

- The gallery name, intro text, and footer live in **`index.html`**.
- Colors, lighting warmth, and spacing live at the top of **`styles.css`**
  (see the `:root` variables — e.g. `--light` controls the lamp's warmth).
