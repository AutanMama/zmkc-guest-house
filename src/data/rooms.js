// Room categories. Each guest house prices its rooms differently; the
// category describes the room, the rate lives on each room.
export const CATEGORIES = {
  standard: {
    id: "standard",
    name: "Single room",
    short: "Single",
    image: "/photos/room-window.webp",
    summary: "A clean, bright room with a double bed and its own shower.",
    bed: "Double bed",
    size: "16 m²",
    features: ["Air conditioning", "Ensuite shower", "Wardrobe", "Smart TV", "Fast Wi-Fi"],
  },
  deluxe: {
    id: "deluxe",
    name: "Deluxe room",
    short: "Deluxe",
    image: "/photos/room-white.webp",
    summary: "More space, a work desk and a chair so a companion can sit with you.",
    bed: "Queen bed",
    size: "22 m²",
    features: ["Air conditioning", "Ensuite shower", "Work desk", "Armchair", "Smart TV", "Mini fridge"],
  },
  executive: {
    id: "executive",
    name: "Executive room",
    short: "Executive",
    image: "/photos/room-large.webp",
    summary: "A larger room with a sitting area for family visits.",
    bed: "King bed",
    size: "28 m²",
    features: ["Air conditioning", "Ensuite bathroom", "Sitting area", "Smart TV", "Mini fridge", "Kettle and tea"],
  },
  luxury: {
    id: "luxury",
    name: "VIP suite",
    short: "VIP",
    image: "/photos/r-redwall.webp",
    summary: "A suite with a separate lounge, for long stays in real comfort.",
    bed: "King bed",
    size: "38 m²",
    features: ["Air conditioning", "Bathroom with tub", "Separate lounge", "Two smart TVs", "Fridge", "Kettle and tea", "Bathrobes"],
  },
  vvip: {
    id: "vvip",
    name: "VVIP apartment",
    short: "VVIP",
    image: "/photos/room-twin.webp",
    summary: "A very large apartment with two beds, its own kitchen and bathroom: room for the whole family on a long stay.",
    bed: "2 beds",
    size: "50 m²",
    features: ["Very spacious", "Two beds", "Own kitchen", "Own bathroom", "Air conditioning", "Smart TV", "Fridge"],
  },
};

// Photos by category; rooms take turns so neighbours don't look the same.
const PHOTOS = {
  standard: ["room-window", "r-grey", "r-sheer", "r-warmplant", "room-pillows", "r-headboard"],
  deluxe: ["room-white", "r-painting", "r-fan", "r-garden", "r-chair", "r-modfurn", "r-mirror"],
  executive: ["room-large", "r-pendant", "r-kingseat", "r-woodking", "r-balcony", "r-luxwin"],
  luxury: ["r-redwall", "r-goldart", "r-woodhead", "r-seatdesk", "r-wood", "room-twin-warm"],
  vvip: ["room-twin", "room-twin-warm"],
};
const BATHS = ["bath-shower", "bath-tub"];
const EXTRAS = { standard: ["kitchen-table", "lounge-sun"], deluxe: ["lounge", "kitchen"], executive: ["lounge", "r-seatdesk"], luxury: ["r-wood", "lounge-sun"], vvip: ["kitchen", "kitchen-table"] };

export function roomPhotos(category, i) {
  const list = PHOTOS[category];
  const main = list[i % list.length];
  const second = list[(i + 3) % list.length];
  const bath = category === "luxury" || category === "vvip" ? "bath-tub" : BATHS[i % 2];
  const extra = EXTRAS[category][i % 2];
  return [main, second, bath, extra].map((p) => `/photos/${p}.webp`);
}
