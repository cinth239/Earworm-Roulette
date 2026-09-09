# Genre Safari 🧭 🎵

> A zero-dependency, client-side web engine for exploring 1,500+ musical microgenres through instant randomized previews.

Inspired by Glenn McDonald’s *Every Noise at Once*, **Genre Safari** reorganizes thousands of algorithmic subgenres into structured parent families. Users can explore niche sounds, preview randomly sampled tracks, and transition directly to major streaming platforms.

---

## ⚡ Features

- **1,500+ Microgenres:** Organized into clean primary families (Rock, Punk, Metal, Electronic, Hip Hop, Latin, World, Jazz, Blues, Roots, and Ambient).
- **Deep Randomization:** Pulls up to 200 tracks per search via the iTunes Search API to avoid looping the same mainstream hits, paired with a rolling history cache to prevent repeat plays.
- **Pure Client-Side Playback:** Runs entirely in the browser with no build steps, node modules, or server costs.
- **Fair Use & Stream-First Design:** Implements `controlsList="nodownload"` on preview clips and provides immediate handoff links to **Spotify**, **Apple Music**, **YouTube Music**, and **Official YouTube Music Videos**.
- **Local Persistence:** Bookmarks and favorites are preserved across sessions via `localStorage`—no database or account required.

---

## 🚀 Live Demo

Check out the live web app: **[Launch Genre Safari](https://<your-username>.github.io/<repository-name>/)**

---

## 🛠️ Tech Stack & Architecture

- **Frontend:** Vanilla HTML5, CSS3, ES6 JavaScript (Single-file build)
- **Data Transport:** JSONP queries via dynamic script injection to bypass local `file:///` and browser CORS restrictions
- **Audio CDN:** Official 30-second preview streams hosted via Apple Content Delivery Networks
- **Taxonomy:** Curated algorithmic microgenre sets derived from open web-music classifications

---

## 💻 Running Locally

No installation, terminal commands, or local web servers needed:

1. Clone or download this repository.
2. Double-click `index.html` to run the app directly in any modern browser.

---

## 📄 License

MIT License. Free to use, adapt, and share.
