// Auto-filled data for EVERY photo (works for any number of photos).
// Each photo index gets a different person, about text, description and comments.
// To customise a specific photo, add it to `overrides` at the bottom.

const people = [
  { name: "Aria Collins", role: "Studio Model", age: 24, about: "Editorial model who loves moody, low-key portraits and quiet studio sessions." },
  { name: "Meera Kapoor", role: "Dancer", age: 26, about: "Contemporary dancer who treats every pose like a still frame from a performance." },
  { name: "Sofia Marino", role: "Fashion Model", age: 23, about: "Runway and print model, always chasing soft window light and vintage textures." },
  { name: "Naina Shah", role: "Actress", age: 28, about: "Theatre actress turned portrait muse. Calm on set, expressive on camera." },
  { name: "Elena Novak", role: "Photographer", age: 31, about: "Fine-art portrait photographer who shoots on film and edits very little." },
  { name: "Riya Deshmukh", role: "Art Student", age: 21, about: "Fine-arts student and part-time model who loves earthy tones and layered fabrics." },
  { name: "Lila Hart", role: "Stylist", age: 29, about: "Wardrobe stylist who builds every look around texture, flow and movement." },
  { name: "Zara Mehta", role: "Content Creator", age: 25, about: "Lifestyle creator sharing behind-the-scenes from portrait shoots and travel." },
  { name: "Isha Patil", role: "Yoga Instructor", age: 27, about: "Yoga teacher with a natural calm that shows in every seated and standing pose." },
  { name: "Camille Dupont", role: "Makeup Artist", age: 30, about: "Makeup artist who prefers a natural, skin-first look under soft directional light." },
  { name: "Tara Nair", role: "Poet & Model", age: 24, about: "Writes poetry between shoots and loves portraits that feel like a quiet thought." },
  { name: "Noor Ali", role: "Fashion Student", age: 22, about: "Design student modelling her own pieces: flowy skirts, linen and lace." },
];

const descriptions = [
  "Soft side light shapes the face while the dark textured backdrop keeps all attention on the subject.",
  "A relaxed, candid moment. The pose feels unplanned, with the hands doing most of the storytelling.",
  "Low-key lighting with deep shadows and warm skin tones. A classic moody studio look.",
  "Natural window light, a neutral backdrop and a gentle lean forward give this frame a calm, thoughtful feel.",
  "The flowing fabric adds movement to a still pose, creating a nice contrast with the plain floor.",
  "A clean composition with the subject slightly off-centre, leaving breathing room on one side.",
  "Warm tones and muted shadows give this portrait a painterly, almost vintage quality.",
  "Shot at eye level with a shallow depth of field so the face stays sharp and the background softens.",
  "A strong diagonal in the pose leads the eye from the hands to the gaze and out of the frame.",
  "Simple wardrobe, simple set. The expression carries the whole image.",
  "Rim light along the shoulder separates the subject from the dark background.",
  "A quiet, introspective frame. The gaze looks away from the camera and the mood does the rest.",
  "Textured fabric and a worn stool add character, and the pose looks relaxed and elegant at once.",
  "Balanced contrast between the bright clothing and the dark studio wall draws the eye straight to the subject.",
  "Shot with a single softbox for gentle shadows and a natural skin tone.",
  "A slow, patient portrait: the pose was held, the light was waited for.",
];

const commenters = [
  "Rohan", "Priya", "Aarav", "Sneha", "Kabir", "Ananya", "Vikram",
  "Pooja", "Arjun", "Diya", "Sameer", "Nisha", "Karan", "Tanvi",
];

const commentTexts = [
  "The lighting on this is unreal! 🔥",
  "Love the mood of this shot.",
  "That pose looks so natural.",
  "Honestly one of the best portraits here.",
  "The colours and shadows are perfect.",
  "This needs to be a poster 😍",
  "So calm and elegant.",
  "Great composition, love the negative space.",
  "The fabric movement is beautiful.",
  "What camera and lens did you use?",
  "Such a timeless look.",
  "Her expression says everything.",
  "The background texture works so well here.",
  "Saving this for my moodboard!",
  "Clean, simple and stunning.",
  "The depth in this frame is lovely.",
  "Instant favourite 👏",
  "That soft light on the face, wow.",
  "Absolutely gorgeous work.",
  "Reminds me of old classic paintings.",
];

// How many comments each photo starts with (1 to 6, varies by photo)
const commentCounts = [2, 5, 3, 6, 1, 4, 6, 2, 5, 3, 1, 4];


// ---- Extra "About the image" details (different for every photo) ----
const lightings = ["Soft window light", "Single softbox, camera left", "Natural daylight", "Rembrandt lighting", "Low-key studio light", "Golden-hour glow", "Rim light with soft fill", "Diffused overcast light"];
const moods = ["Calm", "Moody", "Introspective", "Elegant", "Warm", "Dreamy", "Timeless", "Quiet"];
const locations = ["Indoor studio, Mumbai", "Loft studio, Pune", "Rooftop studio, Delhi", "Heritage haveli, Jaipur", "Home studio, Bengaluru", "Garden studio, Goa", "Warehouse studio, Hyderabad", "Daylight studio, Kolkata"];
const cameras = ["Sony A7 III", "Canon EOS R6", "Nikon Z6 II", "Fujifilm X-T4", "Sony A7R IV", "Canon EOS 5D Mark IV"];
const lenses = ["85mm f/1.8", "50mm f/1.4", "70-200mm f/2.8", "35mm f/1.4", "105mm f/1.4", "85mm f/1.4"];
const settingsList = ["f/2.0 · 1/160s · ISO 200", "f/1.8 · 1/200s · ISO 100", "f/2.8 · 1/125s · ISO 320", "f/2.2 · 1/250s · ISO 160", "f/1.4 · 1/320s · ISO 100", "f/3.5 · 1/100s · ISO 400"];
const tagGroups = [
  ["Portrait", "Studio", "Low-key"],
  ["Editorial", "Fashion", "Soft light"],
  ["Fine art", "Moody", "Film look"],
  ["Candid", "Natural light", "Seated pose"],
  ["Vintage", "Textured", "Dark backdrop"],
  ["Elegant", "Minimal", "Portrait"],
];
const poseTips = [
  "Keep the shoulders relaxed and let one hand rest near the face for a natural look.",
  "Angle the body 45° away from the camera, then turn only the head back toward the lens.",
  "Sit on the edge of the seat so the posture stays tall without looking stiff.",
  "Let the legs cross loosely, and keep the toes pointed to elongate the line of the pose.",
  "Look slightly past the camera to create a thoughtful, cinematic mood.",
  "Rest the elbow on the knee and lean forward a little to add depth to the frame.",
  "Give the hands a small job, like touching the hair or fabric, so they never look stuck.",
  "Exhale just before the shot to drop the shoulders and soften the expression.",
];
const extraLines = [
  "The overall tone stays muted, which makes skin and fabric the main points of colour.",
  "Shadow falls off gently across the frame, adding depth without losing detail.",
  "The pose leaves clear negative space, which gives the portrait room to breathe.",
  "Fine texture in the background adds a hand-painted feel behind the subject.",
  "The slight tilt of the head gives the portrait a quiet, thoughtful energy.",
  "Edges of the frame fall into darkness, naturally guiding the eye to the face.",
];
const fmtDate = (d) =>
  d.toLocaleDateString("en-GB", { day: "numeric", month: "short", year: "numeric" });


// ---- Colour accent per photo (gradient pair) + story pools ----
const accents = [
  ["#ff9a8b", "#ff6a88"], ["#f6d365", "#fda085"], ["#84fab0", "#8fd3f4"], ["#a18cd1", "#fbc2eb"],
  ["#74ebd5", "#9face6"], ["#fccb90", "#d57eeb"], ["#5ee7df", "#b490ca"], ["#ffc3a0", "#ff9fb8"],
];
export const getAccent = (index) => accents[(index * 3 + 1) % accents.length];

const sessionTypes = ["studio", "golden-hour", "indoor", "editorial", "fine-art", "lookbook"];
const goals = [
  "{first} wanted a portrait that feels honest rather than posed, so the shoot stayed slow and relaxed.",
  "The idea was to keep things simple: one light, one backdrop and a lot of patience.",
  "{first} tried a few different poses before settling on this one, which felt the most natural.",
  "The team kept the set minimal so the focus stayed on expression and mood.",
  "Between takes the music stayed low, which helped {first} relax into the frame.",
  "The look was planned around soft textures and muted tones, with only small colour accents.",
];
const edits = [
  "Editing was light: gentle contrast and a subtle grade, keeping the natural skin texture.",
  "Post-processing kept the shadows rich and the highlights soft for a filmic finish.",
  "Only minor retouching was done so the final image still feels real and unforced.",
  "A warm tone curve and a touch of grain give the frame a timeless, printed look.",
];
const hash = (str) => [...str].reduce((a, c) => (a * 31 + c.charCodeAt(0)) % 100003, 7);
const withSocial = (p) => {
  const h = hash(p.name);
  return { ...p, followers: 900 + ((h * 13) % 9100), posts: 12 + (h % 88) };
};

// Hand-written details for specific photos (optional). Key = photo index (0-based).
// Example: 0: { person: {...}, description: "..." , comments: [{ name, text }] }
const overrides = {};

export function getPhotoMeta(index, caption = "") {
  const o = overrides[index] || {};
  const person = o.person || people[index % people.length];
  const base = descriptions[(index * 5 + 3) % descriptions.length];
  const description = o.description || base;
  const full = o.description
    ? description
    : `${description} ${extraLines[(index * 2 + 1) % extraLines.length]}`;
  const details = o.details || {
    title: caption ? toTitle(caption) : `Portrait ${index + 1}`,
    mood: moods[(index * 3 + 1) % moods.length],
    lighting: lightings[(index * 5 + 2) % lightings.length],
    location: locations[(index * 7 + 3) % locations.length],
    camera: cameras[(index * 2) % cameras.length],
    lens: lenses[(index * 5 + 1) % lenses.length],
    settings: settingsList[(index * 3 + 2) % settingsList.length],
    date: fmtDate(new Date(2026, 8 - (index % 9), 3 + ((index * 5) % 24))),
  };
  const tags = o.tags || tagGroups[(index * 5 + 1) % tagGroups.length];
  const poseTip = o.poseTip || poseTips[(index * 3 + 2) % poseTips.length];
  const stats = o.stats || {
    views: 1200 + ((index * 937) % 8800),
    likes: 140 + ((index * 61) % 960),
  };
  const first = person.name.split(" ")[0];
  const story =
    o.story ||
    `\u201C${details.title}\u201D was shot during a ${2 + (index % 3)}-hour ${sessionTypes[(index * 3 + 1) % sessionTypes.length]} session at ${details.location}. ` +
      `${goals[(index * 5 + 2) % goals.length].replace("{first}", first)} ` +
      `${edits[(index * 3) % edits.length]}`;
  return { person: withSocial(person), description: full, story, details, tags, poseTip, stats };
}

export function getSeedComments(index) {
  const o = overrides[index];
  const now = Date.now();
  const list =
    o?.comments ||
    Array.from(
      { length: commentCounts[index % commentCounts.length] },
      (_, i) => ({
        name: commenters[(index * 3 + i * 5) % commenters.length],
        text: commentTexts[(index * 7 + i * 3) % commentTexts.length],
      })
    );
  return list.map((c, i) => ({
    id: `seed-${index}-${i}`,
    name: c.name,
    text: c.text,
    likes: (index * 3 + i * 7) % 12,
    liked: false,
    at: now - (list.length - i) * (7 + ((index + i) % 5) * 11) * 60 * 1000,
  }));
}

function toTitle(s) {
  return s.toLowerCase().replace(/\b\w/g, (c) => c.toUpperCase());
}
