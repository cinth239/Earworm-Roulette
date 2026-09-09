// scripts/update_genres.js
const fs = require('fs');

const TARGET_GENRES = [
  "organic bass",
  "space bass",
  "modular bass",
  "ambient 140",
  "neuro glitch hop",
  "downtempo bass",
  "liquid dnb",
  "synthwave",
  "midwest emo",
  "witch house",
  "vaporwave",
  "breakcore"
];

// Fallback seed list to guarantee data integrity if an API is unavailable
const STATIC_SEEDS = {
  "organic bass": ["Of The Trees", "CharlesTheFirst", "Supertask", "CloZee", "Goopsteppa", "Chmura", "Esseks", "Player Dave"],
  "space bass": ["Liquid Stranger", "LSDREAM", "Peekaboo", "Inzo", "Ravenscoon", "Mersiv", "G-Rex", "Zingara"],
  "modular bass": ["G Jones", "Eprom", "Bleep Bloop", "Chee", "Shades", "Alix Perez", "IMANU", "Ivy Lab"],
  "ambient 140": ["Kahn", "Alix Perez", "Ternion Sound", "Truth", "Commodo", "Biome", "J:Kenzo", "Distinct Motive"],
  "neuro glitch hop": ["Tipper", "Detox Unit", "Kursa", "Seppa", "Resonant Language", "Jade Cicada", "Spoonbill", "Culprate"],
  "downtempo bass": ["Emancipator", "Tor", "Bluetech", "Tycho", "Bonobo", "Frameworks", "Random Rab", "Desert Dwellers"]
};

const LASTFM_KEY = process.env.LASTFM_API_KEY || "b25b959554ed76058ac220b7b2e0a026";

async function fetchCandidates(tag) {
  const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=${encodeURIComponent(tag)}&api_key=${LASTFM_KEY}&format=json&limit=16`;
  try {
    const res = await fetch(url).then(r => r.json());
    if (!res.topartists || !res.topartists.artist) return [];
    return res.topartists.artist.map(a => a.name);
  } catch {
    return [];
  }
}

async function verifyWithApple(artist) {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&entity=song&attribute=artistTerm&limit=5`;
  try {
    const res = await fetch(url).then(r => r.json());
    if (!res.results || res.results.length === 0) return false;
    
    // Ensure the artist name actually matches and has an audio preview
    return res.results.some(track => 
      track.artistName.toLowerCase().includes(artist.toLowerCase()) && Boolean(track.previewUrl)
    );
  } catch {
    return false;
  }
}

async function run() {
  console.log("Starting daily microgenre pool verification...");
  const updatedMap = {};

  for (const genre of TARGET_GENRES) {
    console.log(`Auditing: [${genre}]`);
    const dynamicCandidates = await fetchCandidates(genre);
    const candidateList = Array.from(new Set([...(STATIC_SEEDS[genre] || []), ...dynamicCandidates]));
    const verified = [];

    for (const artist of candidateList) {
      const ok = await verifyWithApple(artist);
      if (ok) {
        verified.push(artist);
      }
      await new Promise(r => setTimeout(r, 200)); // Rate limit buffer
      if (verified.length >= 10) break; // Cap at 10 verified artists
    }

    updatedMap[genre] = verified.length > 0 ? verified : (STATIC_SEEDS[genre] || []);
    console.log(`  -> Finalized ${updatedMap[genre].length} verified seeds for ${genre}`);
  }

  fs.writeFileSync('./genre_map.json', JSON.stringify(updatedMap, null, 2));
  console.log("Daily auto-tune complete: genre_map.json updated.");
}

run();
