import { roomPhotos } from "./rooms";

// The seven guest houses. Structure, room counts and price points follow the
// owner's description; exact street addresses and some rates are still to be
// confirmed and are marked as sample.
export const AREAS = {
  gudu: { id: "gudu", name: "Gudu", note: "Comfortable, affordable rooms within walking distance of the centre" },
  apo: { id: "apo", name: "Apo road", note: "A luxury house close to Cedar Crest Hospital, a short drive away" },
  guzape: { id: "guzape", name: "Guzape", note: "Our luxury houses on the quiet Guzape hillside, with a cook who makes food to order" },
};

export const AMENITIES = {
  power: "24-hour power",
  wifi: "Fast Wi-Fi",
  water: "Treated water",
  cleaning: "Housekeeping, daily cleaning",
  manager: "Manager on site",
  restaurant: "A cook who makes food to order",
  security: "Gated, 24-hour security",
  reception: "Reception, open 24 hours",
  shuttle: "Shuttle to the centre",
  parking: "Parking",
  kitchen: "Guest kitchen to cook your own meals",
  garden: "Garden and seating",
};

// Rooms are listed the way each house's reception lays them out: by flat or
// building, then floor. Houses that call rooms by number get "Room 1", "Room 2"…
// (counted across the whole house); others name rooms within each flat.
let photoTurn = 0;
function build(list, { numbered }) {
  return list.map((r, i) => {
    const no = i + 1;
    return { ...r, no, name: r.name ?? `Room ${no}`, numbered, photos: roomPhotos(r.category, photoTurn++) };
  });
}
const room = (block, floor, category, rate, name) => ({ block, floor, category, rate, name });

// Guest House 1: two flats of five rooms. The single room is on the ground floor.
const gh1Flat = (block, first) => [
  room(block, "Ground floor", "standard", 15000),
  room(block, "Upstairs", "executive", 18000),
  room(block, "Upstairs", "luxury", 20000),
  room(block, "Upstairs", "executive", 18000),
  room(block, "Upstairs", "luxury", 20000),
].map((r, i) => ({ ...r, name: `Room ${first + i}` }));

// Guest House 2: four flats. Flats 1 and 4 have two singles on the ground floor;
// Flat 2's ground floor is the VVIP apartment alone; Flat 3's holds the reception
// and one single. Above: Deluxe 1, Deluxe 2 and Executive 1, then Deluxe 3 and
// VIP 1 on top. Names repeat in each flat.
const gh2Flat = (block, ground) => [
  ...ground,
  room(block, "First floor", "deluxe", 18000, "Deluxe 1"),
  room(block, "First floor", "deluxe", 18000, "Deluxe 2"),
  room(block, "First floor", "executive", 22000, "Executive 1"),
  room(block, "Second floor", "deluxe", 18000, "Deluxe 3"),
  room(block, "Second floor", "luxury", 25000, "VIP 1"),
];
const gh2Singles = (block) => [room(block, "Ground floor", "standard", 16000, "Single 1"), room(block, "Ground floor", "standard", 16000, "Single 2")];

const numbered = (block, cats) => cats.map(([category, rate]) => room(block, null, category, rate));

export const houses = [
  {
    id: "gh1",
    number: 1,
    name: "Guest House 1",
    area: "gudu",
    address: "Gudu, Abuja. Reception is in Apartment 3",
    travel: { mode: "walk", minutes: 4 },
    tagline: "Our first guest house: ten rooms in two flats, a single on each ground floor and executive and VIP rooms upstairs.",
    cover: "/photos/house-courtyard.webp",
    gallery: ["/photos/house-courtyard.webp", "/photos/room-window.webp", "/photos/bath-shower.webp", "/photos/kitchen-table.webp"],
    kitchenNote: "One shared kitchen, beside the reception in Apartment 3",
    amenities: ["power", "wifi", "water", "cleaning", "security", "reception", "manager", "kitchen"],
    rooms: build([...gh1Flat("Apartment 3", 1), ...gh1Flat("Apartment 4", 6)], { numbered: true }),
  },
  {
    id: "gh2",
    number: 2,
    name: "Guest House 2",
    area: "gudu",
    address: "Gudu, Abuja",
    travel: { mode: "walk", minutes: 5 },
    tagline: "Our biggest house: four flats with singles, deluxe, executive and VIP rooms, plus a large VVIP apartment with two beds and its own kitchen.",
    cover: "/photos/house-balcony.webp",
    gallery: ["/photos/house-balcony.webp", "/photos/room-white.webp", "/photos/room-large.webp", "/photos/lounge.webp"],
    kitchenNote: "A kitchen in every flat",
    amenities: ["power", "wifi", "water", "cleaning", "security", "reception", "parking", "manager", "kitchen"],
    rooms: build(
      [
        ...gh2Flat("Flat 1", gh2Singles("Flat 1")),
        ...gh2Flat("Flat 2", [room("Flat 2", "Ground floor", "vvip", 35000, "VVIP")]),
        ...gh2Flat("Flat 3", gh2Singles("Flat 3").slice(0, 1)),
        ...gh2Flat("Flat 4", gh2Singles("Flat 4")),
      ],
      { numbered: false }
    ),
  },
  {
    id: "gh3",
    number: 3,
    name: "Guest House 3",
    area: "gudu",
    address: "On the main road towards the centre, Gudu",
    travel: { mode: "walk", minutes: 6 },
    tagline: "Six rooms on the main road towards the centre: two singles downstairs, executive and VIP rooms upstairs.",
    cover: "/photos/house-arch.webp",
    gallery: ["/photos/house-arch.webp", "/photos/room-pillows.webp", "/photos/bath-tub.webp", "/photos/lounge-sun.webp"],
    sampleRates: true,
    kitchenNote: "One shared kitchen downstairs",
    amenities: ["power", "wifi", "water", "cleaning", "security", "reception", "manager", "kitchen"],
    rooms: build(
      [
        room("Main building", "Ground floor", "standard", 16000, "Single 1"),
        room("Main building", "Ground floor", "standard", 16000, "Single 2"),
        room("Main building", "Upstairs", "executive", 20000, "Executive 1"),
        room("Main building", "Upstairs", "executive", 20000, "Executive 2"),
        room("Main building", "Upstairs", "luxury", 25000, "VIP 1"),
        room("Main building", "Upstairs", "luxury", 25000, "VIP 2"),
      ],
      { numbered: false }
    ),
  },
  {
    id: "gh4",
    number: 4,
    name: "Guest House 4",
    area: "apo",
    address: "Towards Apo, close to Cedar Crest Hospital",
    travel: { mode: "drive", minutes: 8 },
    tagline: "A luxury house towards Apo, close to Cedar Crest Hospital: five large executive rooms and VIP suites.",
    cover: "/photos/hero-garden.webp",
    gallery: ["/photos/hero-garden.webp", "/photos/room-large.webp", "/photos/bath-shower.webp", "/photos/lounge.webp"],
    sampleRates: true,
    kitchenNote: "A guest kitchen in the house",
    amenities: ["power", "wifi", "water", "cleaning", "security", "reception", "shuttle", "parking", "manager", "kitchen"],
    rooms: build(numbered("Main building", [["executive", 35000], ["executive", 35000], ["executive", 35000], ["luxury", 45000], ["luxury", 45000]]), { numbered: true }),
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
    sampleRates: true,
    kitchenNote: "A kitchen in every flat",
    amenities: ["power", "wifi", "water", "cleaning", "security", "reception", "shuttle", "parking", "garden", "manager", "restaurant", "kitchen"],
    rooms: build(numbered("Main building", [["executive", 30000], ["executive", 30000], ["luxury", 40000], ["luxury", 40000]]), { numbered: true }),
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
    sampleRates: true,
    kitchenNote: "A kitchen in every flat",
    amenities: ["power", "wifi", "water", "cleaning", "security", "reception", "shuttle", "parking", "kitchen", "manager", "restaurant"],
    rooms: build(numbered("Main building", [["executive", 35000], ["executive", 35000], ["executive", 35000], ["luxury", 45000], ["luxury", 45000], ["luxury", 45000]]), { numbered: true }),
  },
  {
    id: "gh7",
    number: 7,
    name: "Guest House 7",
    area: "guzape",
    address: "Guzape, Abuja",
    travel: { mode: "drive", minutes: 15 },
    tagline: "Our most luxurious house: seven named rooms and suites in Guzape, finished to the highest standard.",
    cover: "/photos/lounge.webp",
    gallery: ["/photos/lounge.webp", "/photos/room-twin-warm.webp", "/photos/room-large.webp", "/photos/bath-tub.webp"],
    kitchenNote: "A kitchen in every flat",
    amenities: ["power", "wifi", "water", "cleaning", "security", "reception", "shuttle", "parking", "garden", "manager", "restaurant", "kitchen"],
    rooms: build([["executive", 45000, "Emerald"], ["executive", 45000, "Sapphire"], ["executive", 45000, "Gold"], ["executive", 45000, "Diamond"], ["luxury", 55000, "Platinum"], ["luxury", 55000, "Royalty"], ["luxury", 55000, "Crown"]].map(([c, r, n]) => room("Main building", null, c, r, n)), { numbered: false }),
  },
];

export const houseById = Object.fromEntries(houses.map((h) => [h.id, h]));

// Every bookable room as a unit, e.g. Guest House 1, Room 6.
export const units = houses.flatMap((h) =>
  h.rooms.map((r) => ({ id: `${h.id}-${r.no}`, house: h.id, area: h.area, ...r }))
);
export const unitById = Object.fromEntries(units.map((u) => [u.id, u]));

export const priceRange = (house) => {
  const rates = house.rooms.map((r) => r.rate);
  return [Math.min(...rates), Math.max(...rates)];
};

export const travelText = ({ mode, minutes }) => (mode === "walk" ? `${minutes} min walk to the centre` : `${minutes} min drive to the centre`);
