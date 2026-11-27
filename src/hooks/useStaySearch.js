import { useSearchParams } from "react-router-dom";
import { addDays, isValidKey, nightsBetween, todayKey } from "../lib/dates";

// The current search lives in the URL, so a search can be shared or bookmarked.
export function useStaySearch() {
  const [params, setParams] = useSearchParams();
  const today = todayKey();
  let checkIn = params.get("in");
  let checkOut = params.get("out");
  if (!isValidKey(checkIn) || checkIn < today) checkIn = addDays(today, 1);
  if (!isValidKey(checkOut) || checkOut <= checkIn) checkOut = addDays(checkIn, 7);
  const guests = Math.min(4, Math.max(1, Number(params.get("guests")) || 2));
  const reason = params.get("reason") || "dialysis";

  const search = { checkIn, checkOut, guests, reason, nights: nightsBetween(checkIn, checkOut) };
  const update = (patch) => {
    const next = { ...search, ...patch };
    setParams({ in: next.checkIn, out: next.checkOut, guests: String(next.guests), reason: next.reason }, { replace: true });
  };
  return [search, update];
}

export const searchQuery = ({ checkIn, checkOut, guests, reason }) =>
  new URLSearchParams({ in: checkIn, out: checkOut, guests: String(guests), reason }).toString();
