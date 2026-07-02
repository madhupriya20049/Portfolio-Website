# Ananya Rao — Anchor Portfolio (Colorful Edition)

A one-page portfolio built around a vibrant, festival/stage energy —
gradient hero text, a spinning color ring around her photo, floating
confetti, and event cards that are automatically color-coded by
category (so "Wedding," "Corporate," "Award Show" etc. each get their
own consistent color across the whole site). Plain HTML/CSS/JS, no
frameworks, no build step.

## Files
- `index.html` — page structure
- `style.css` — all styling
- `script.js` — renders `data.js` onto the page, powers filters, the
  photo wall, the lightbox, and the "Add Event" form
- `data.js` — **the file you'll actually edit day to day**

## How to run it in VS Code
1. Open this folder in VS Code (`File > Open Folder`).
2. Install the **Live Server** extension (Extensions sidebar → search
   "Live Server" by Ritwick Dey → Install).
3. Right-click `index.html` → **"Open with Live Server"**.
4. It opens at `http://127.0.0.1:5500` and refreshes automatically
   whenever you save a file.

(You can also just double-click `index.html` to open it directly in a
browser — fine for browsing, but Live Server is more reliable once
you start using the "+ Add Event" button.)

## Adding your real details (recommended, permanent)
Open `data.js`:
- Edit the `PROFILE` object — name, title, tagline, bio, email, phone,
  socials, stats.
- Set `photo: "assets/profile.jpg"` once you have a headshot — create
  a folder named `assets/` next to `index.html` and put images there.
- Add entries to the `EVENTS` array for each event. For each photo or
  video, set `src` to a path like `"assets/event1-photo1.jpg"`.
  Leave `src: ""` and it'll show as a placeholder until filled in.
- Reuse the same category names across events (e.g. always "Wedding")
  so the color-coding stays consistent site-wide.

This method is permanent and shows up for every visitor.

## Adding events on the fly (the "+ Add Event" button)
Lets Ananya add a new event — with photos/videos picked straight from
her device — without touching code.

**Limitation:** this is saved in the browser's local storage, so it
only shows up on the same browser/device it was added from, not for
other visitors. Use it as a quick buffer, then copy the details into
`data.js` later to make them permanent and visible to everyone
(open DevTools → Application → Local Storage → copy the
`anchor_portfolio_custom_events_v2` key).

## Making it live for everyone
For events to persist across all visitors automatically, this static
site would need a small backend or a service like a headless CMS or
a Google Sheet acting as a database. This version is a fully working,
deployable front end — you can host it for free on GitHub Pages,
Netlify, or Vercel by uploading these files. Happy to help wire up a
backend later if you want that.

## Customizing further
- All colors and fonts live in the `:root` variables at the top of
  `style.css`.
- Category filter chips and their colors are generated automatically
  from whatever categories appear in `data.js`.
