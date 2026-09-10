Earworm Roulette 🧭 🎵

A zero-dependency, client-side web engine for exploring 1,500+ musical microgenres through instant randomized previews, backed by a 5-database cross-referencing verification pipeline.
Inspired by Glenn McDonald’s Every Noise at Once, Earworm Roulette reorganizes thousands of algorithmic subgenres into structured parent families. Users can explore niche sounds, preview randomly sampled tracks, and transition directly to major streaming platforms.

⚡ Features

- **1,500+ Microgenres:** Organized into clean primary families (Rock, Punk, Metal, Electronic, Hip Hop, Latin, World, Jazz, Blues, Roots, and Ambient).
- **Multi-Database Verification:** Cross-references artists and data using Last.fm, MusicBrainz, Discogs, Spotify, and Apple Music to ensure rigorous curation.
- **Deep Randomization:** Pulls up to 200 tracks per search via the iTunes Search API to avoid looping the same mainstream hits, paired with a rolling history cache to prevent repeat plays.
- **Pure Client-Side Playback:** Runs entirely in the browser with automated GitHub Actions handling taxonomy and genre map builds (`build_map.js`).
- **Fair Use & Stream-First Design:** Implements controlsList="nodownload" on preview clips and provides immediate handoff links to Spotify, Apple Music, YouTube Music, and Official YouTube Music Videos.
- **Local Persistence:** Bookmarks and favorites are preserved across sessions via localStorage—no database or account required.

🚀 Live Demo

Check out the live web app: [Launch Earworm Roulette](https://cinth239.github.io/Earworm-Roulette/)

🛠️ Tech Stack & Architecture

- **Frontend & Processing:** Vanilla HTML5, CSS3, ES6 JavaScript, and Node.js data processing scripts (`build_map.js`).
- **Automation & Deployment:** GitHub Actions workflow (`update-genres.yml`) for automated mapping audits and GitHub Pages for hosting.
- **Data Transport:** JSONP queries via dynamic script injection to bypass local and browser CORS restrictions.
- **Audio CDN:** Official 30-second preview streams hosted via Apple Content Delivery Networks.
- **Taxonomy:** Curated algorithmic microgenre sets derived from multi-database web-music classifications.

💻 Running Locally

1. Clone or download this repository.
2. Run your verification script locally via Node.js using:
   ```bash
   node build_map.js
