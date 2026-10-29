// Generated portraits shown when no photo in photos.js can be loaded.
const PALETTES = [
  ["#2f6fd1", "#bfe0ff", "#1a1a1a"], ["#e9a23b", "#8a3b12", "#14100c"],
  ["#e86a5a", "#ffd9c9", "#20120f"], ["#3c8f7a", "#c9efe0", "#0e1a16"],
  ["#7a5cc2", "#e6dcff", "#17112a"], ["#d9d2c3", "#6b6a66", "#111111"],
  ["#1f3b73", "#f2b880", "#0b1020"], ["#c24d7a", "#ffd0e0", "#1d0d15"],
  ["#8fb36a", "#f1f5d0", "#141a0c"], ["#f0c14b", "#7d4a1a", "#1b1307"],
  ["#4aa3c9", "#f3efe4", "#0d1a22"], ["#b8553a", "#f0cdb5", "#1a0f0a"],
  ["#5a5f73", "#e4e6ef", "#0f1018"], ["#2b9d8f", "#f4d58d", "#0b1b19"],
];
const SKINS = ["#e8c1a0", "#c98f6b", "#f0d2b6", "#a96f4a"];

export function makePlaceholders() {
  return PALETTES.map((p, i) => {
    const skin = SKINS[i % 4];
    const svg =
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 250 350">` +
      `<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${p[0]}"/><stop offset="1" stop-color="${p[1]}"/></linearGradient>` +
      `<filter id="n"><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2"/><feColorMatrix values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 .16 0"/></filter></defs>` +
      `<rect width="250" height="350" fill="url(#g)"/>` +
      `<circle cx="${60 + (i % 5) * 32}" cy="${60 + (i % 3) * 18}" r="70" fill="${p[1]}" opacity=".35"/>` +
      `<path d="M-10 350 C 10 250 70 230 125 230 C 180 230 240 250 260 350 Z" fill="${p[2]}"/>` +
      `<rect x="108" y="190" width="34" height="48" rx="12" fill="${skin}"/>` +
      `<ellipse cx="125" cy="150" rx="40" ry="50" fill="${skin}"/>` +
      `<path d="M82 150 C 78 90 120 82 150 92 C 175 100 172 130 168 150 C 160 120 130 112 100 122 C 90 128 86 140 82 150 Z" fill="${p[2]}"/>` +
      `<rect width="250" height="350" filter="url(#n)"/></svg>`;
    return {
      css: `url("data:image/svg+xml;utf8,${encodeURIComponent(svg)}")`,
      caption: `Placeholder ${i + 1}`,
    };
  });
}
