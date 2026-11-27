import { CATEGORIES } from "../data/rooms";

const hasBlock = (room) => room.block && room.block !== "Main building";

// The line under a room's name: where it is and how big, never repeating the name.
// Guest House 1 "Room 3" → "Apartment 3 · Upstairs"; Guest House 2 "Deluxe 1" → "Flat 3 · First floor".
export function roomDetail(room, { withSize = false } = {}) {
  return [hasBlock(room) && room.block, room.floor, withSize && CATEGORIES[room.category].size].filter(Boolean).join(" · ");
}

// A room on its own, for lists and receipts: "Deluxe 1, Flat 3", "Room 3", "Royalty".
export function roomLabel(room) {
  return !room.numbered && hasBlock(room) ? `${room.name}, ${room.block}` : room.name;
}
