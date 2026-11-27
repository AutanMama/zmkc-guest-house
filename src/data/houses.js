// The seven guest houses. Structure, room counts and price points follow the
// owner's description; exact street addresses and some rates are still to be
// confirmed and are marked as sample.
export const AREAS = {
  gudu: { id: "gudu", name: "Gudu", note: "Walking distance to the centre" },
  apo: { id: "apo", name: "Apo road", note: "A short drive, just past Cedar Crest Hospital" },
  guzape: { id: "guzape", name: "Guzape", note: "Quiet hillside houses with our largest rooms" },
};

export const AMENITIES = {
  power: "24-hour power",
  wifi: "Fast Wi-Fi",
  water: "Treated water",
  cleaning: "Daily cleaning",
  security: "Gated, 24-hour security",
  reception: "Own reception desk",
  shuttle: "Shuttle to the centre",
  parking: "Parking",
  kitchen: "Shared kitchen",
  garden: "Garden and seating",
};

import { CATEGORIES, roomPhotos } from "./rooms";

// Build numbered rooms for a set of blocks, counting up across the whole house.
// Rooms are named the way reception calls them: Single 1, Single 2, Deluxe 1…
// unless the house gives each room its own name.
function rooms(blocks, names) {
  let no = 0;
  const seen = {};
  const all = blocks.flatMap((b) => b.rates.map((rate, i) => ({ block: b.name, category: b.categories[i], rate })));
  const counts = all.reduce((c, r) => ({ ...c, [r.category]: (c[r.category] ?? 0) + 1 }), {});
  return all.map((r) => {
    no += 1;
    seen[r.category] = (seen[r.category] ?? 0) + 1;
    const short = CATEGORIES[r.category].short;
    const name = names?.[no - 1] ?? (counts[r.category] > 1 ? `${short} ${seen[r.category]}` : short);
    return { no, name, ...r };
  });
}

let photoTurn = 0;
const withPhotos = (list) => list.map((r) => ({ ...r, photos: roomPhotos(r.category, photoTurn++) }));
const row = (n, category, rate) => ({ categories: Array(n).fill(category), rates: Array(n).fill(rate) });
const mix = (...parts) => ({ categories: parts.flatMap((p) => p.categories), rates: parts.flatMap((p) => p.rates) });
const block = (name, ...parts) => ({ name, ...mix(...parts) });

export const houses = [
  {
    id: "gh1",
    number: 1,
    name: "Guest House 1",
    area: "gudu",
    address: "Gudu, Abuja",
    travel: { mode: "walk", minutes: 4 },
    tagline: "Our first guest house: ten simple, well-kept rooms in two apartments, a short walk from the centre.",
    cover: "/photos/house-courtyard.webp",
    gallery: ["/photos/house-courtyard.webp", "/photos/room-window.webp", "/photos/bath-shower.webp", "/photos/kitchen-table.webp"],
    amenities: ["power", "wifi", "water", "cleaning", "security", "reception"],
    rooms: rooms([
      block("Apartment 3", row(2, "standard", 12000), row(2, "deluxe", 15000), row(1, "executive", 18000)),
      block("Apartment 4", row(2, "standard", 12000), row(2, "deluxe", 15000), row(1, "executive", 18000)),
    ]),
  },
  {
    id: "gh2",
    number: 2,
    name: "Guest House 2",
    area: "gudu",
    address: "Gudu, Abuja",
    travel: { mode: "walk", minutes: 5 },
    tagline: "Our biggest house: four buildings with seven rooms each, from simple rooms to executive.",
    cover: "/photos/house-balcony.webp",
    gallery: ["/photos/house-balcony.webp", "/photos/room-white.webp", "/photos/room-large.webp", "/photos/lounge.webp"],
    amenities: ["power", "wifi", "water", "cleaning", "security", "reception", "parking"],
    rooms: rooms(
      ["Building A", "Building B", "Building C", "Building D"].map((b) =>
        block(b, row(3, "standard", 15000), row(3, "deluxe", 24000), row(1, "executive", 35000))
      )
    ),
  },
  {
    id: "gh3",
    number: 3,
    name: "Guest House 3",
    area: "gudu",
    address: "On the main road towards the centre, Gudu",
    travel: { mode: "walk", minutes: 6 },
    tagline: "Six rooms on the main road, easy to find for first-time visitors and taxis.",
    cover: "/photos/house-arch.webp",
    gallery: ["/photos/house-arch.webp", "/photos/room-pillows.webp", "/photos/bath-tub.webp", "/photos/lounge-sun.webp"],
    amenities: ["power", "wifi", "water", "cleaning", "security", "reception"],
    sampleRates: true,
    rooms: rooms([block("Main building", row(4, "deluxe", 20000), row(2, "executive", 25000))]),
  },
  {
    id: "gh4",
    number: 4,
    name: "Guest House 4",
    area: "apo",
    address: "Apo road, after Cedar Crest Hospital",
    travel: { mode: "drive", minutes: 8 },
    tagline: "Five larger rooms on the Apo road, a short drive from the centre.",
    cover: "/photos/hero-garden.webp",
    gallery: ["/photos/hero-garden.webp", "/photos/room-large.webp", "/photos/bath-shower.webp", "/photos/lounge.webp"],
    amenities: ["power", "wifi", "water", "cleaning", "security", "reception", "shuttle", "parking"],
    rooms: rooms([block("Main building", row(3, "executive", 30000), row(2, "luxury", 40000))]),
  },
  {
    id: "gh5",
    number: 5,
    name: "Guest House 5",
    area: "guzape",
    address: "Guzape, Abuja",
    travel: { mode: "drive", minutes: 15 },
    tagline: "Four quiet rooms on the Guzape hillside, for guests who want rest above all.",
    cover: "/photos/lounge-sun.webp",
    gallery: ["/photos/lounge-sun.webp", "/photos/room-twin-warm.webp", "/photos/bath-tub.webp", "/photos/kitchen.webp"],
    amenities: ["power", "wifi", "water", "cleaning", "security", "reception", "shuttle", "parking", "garden"],
    sampleRates: true,
    rooms: rooms([block("Main building", row(2, "executive", 35000), row(2, "luxury", 45000))]),
  },
  {
    id: "gh6",
    number: 6,
    name: "Guest House 6",
    area: "guzape",
    address: "Guzape, Abuja",
    travel: { mode: "drive", minutes: 15 },
    tagline: "Six spacious rooms in Guzape, with a lounge and garden for families.",
    cover: "/photos/room-twin.webp",
    gallery: ["/photos/room-twin.webp", "/photos/lounge.webp", "/photos/kitchen-table.webp", "/photos/bath-shower.webp"],
    amenities: ["power", "wifi", "water", "cleaning", "security", "reception", "shuttle", "parking", "kitchen"],
    rooms: rooms([block("Main building", row(3, "executive", 30000), row(3, "luxury", 40000))]),
  },
  {
    id: "gh7",
    number: 7,
    name: "Guest House 7",
    area: "guzape",
    address: "Guzape, Abuja",
    travel: { mode: "drive", minutes: 15 },
    tagline: "Our most luxurious house: seven suites in Guzape, finished to a high standard.",
    cover: "/photos/lounge.webp",
    gallery: ["/photos/lounge.webp", "/photos/room-twin-warm.webp", "/photos/room-large.webp", "/photos/bath-tub.webp"],
    amenities: ["power", "wifi", "water", "cleaning", "security", "reception", "shuttle", "parking", "garden"],
    // Guest House 7 names every room. These names are placeholders until confirmed.
    rooms: rooms([block("Main building", row(4, "executive", 40000), row(3, "luxury", 50000))], ["Emerald", "Sapphire", "Gold", "Diamond", "Platinum", "Royalty", "Crown"]),
  },
];

export const houseById = Object.fromEntries(houses.map((h) => [h.id, h]));

// Every bookable room as a unit, e.g. Guest House 1, Room 6.
export const units = houses.flatMap((h) =>
  withPhotos(h.rooms).map((r) => ({ id: `${h.id}-${r.no}`, house: h.id, area: h.area, no: r.no, name: r.name, block: r.block, category: r.category, rate: r.rate, photos: r.photos }))
);
export const unitById = Object.fromEntries(units.map((u) => [u.id, u]));

export const priceRange = (house) => {
  const rates = house.rooms.map((r) => r.rate);
  return [Math.min(...rates), Math.max(...rates)];
};

export const travelText = ({ mode, minutes }) => (mode === "walk" ? `${minutes} min walk to the centre` : `${minutes} min drive to the centre`);
