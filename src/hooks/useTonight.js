import { useMemo } from "react";
import { units } from "../data/houses";
import { isUnitAvailable } from "../lib/availability";
import { addDays, todayKey } from "../lib/dates";
import { useBookings } from "./useBookings";

// How many rooms are free tonight, from the real booking list.
export function useTonight() {
  const bookings = useBookings();
  return useMemo(() => {
    const today = todayKey();
    return units.filter((u) => isUnitAvailable(u.id, today, addDays(today, 1), bookings)).length;
  }, [bookings]);
}
