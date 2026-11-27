export const SORTS = [
  { id: "price", label: "Lowest price" },
  { id: "priceDesc", label: "Highest price" },
  { id: "number", label: "Room number" },
];

export function sortRooms(rooms, sort) {
  const list = [...rooms];
  if (sort === "price") list.sort((a, b) => a.rate - b.rate || a.no - b.no);
  if (sort === "priceDesc") list.sort((a, b) => b.rate - a.rate || a.no - b.no);
  if (sort === "number") list.sort((a, b) => a.house.localeCompare(b.house) || a.no - b.no);
  return list;
}
