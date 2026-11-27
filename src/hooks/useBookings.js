import { useSyncExternalStore } from "react";
import { bookingStore } from "../lib/bookings";

export function useBookings() {
  return useSyncExternalStore(bookingStore.subscribe, bookingStore.getSnapshot, bookingStore.getSnapshot);
}
