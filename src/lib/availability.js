import { houses, units } from "../data/houses";
import { overlaps } from "./dates";

const ACTIVE = (b) => b.status !== "cancelled";

export function bookingFor(unitId, checkIn, checkOut, bookings) {
  return bookings.find((b) => ACTIVE(b) && b.unit === unitId && overlaps(checkIn, checkOut, b.checkIn, b.checkOut)) ?? null;
}

export const isUnitAvailable = (unitId, checkIn, checkOut, bookings) => !bookingFor(unitId, checkIn, checkOut, bookings);

// Every room in a house with its status for the dates.
export function roomStatus(houseId, checkIn, checkOut, bookings) {
  return units.filter((u) => u.house === houseId).map((u) => ({ ...u, available: isUnitAvailable(u.id, checkIn, checkOut, bookings) }));
}

// Per house: how many rooms are available for the dates, and the cheapest one.
export function searchHouses({ checkIn, checkOut, filters = {} }, bookings) {
  return houses
    .filter((h) => !filters.area || h.area === filters.area)
    .map((h) => {
      const rooms = roomStatus(h.id, checkIn, checkOut, bookings);
      const available = rooms.filter((r) => r.available && (!filters.maxRate || r.rate <= filters.maxRate));
      return { house: h, total: rooms.length, available, from: available.length ? Math.min(...available.map((r) => r.rate)) : null };
    });
}
