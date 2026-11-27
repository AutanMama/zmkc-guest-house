import { units } from "../../data/houses";
import { overlaps } from "../../lib/dates";
import { naira } from "../../lib/money";

function Stat({ label, value, note }) {
  return (
    <div className="rounded-xl border border-line bg-paper p-5">
      <p className="eyebrow text-muted">{label}</p>
      <p className="figure mt-2 font-display text-4xl leading-none text-ink">{value}</p>
      {note && <p className="mt-2 text-sm text-muted">{note}</p>}
    </div>
  );
}

export default function DeskStats({ bookings, house, today, tomorrow }) {
  const rooms = house === "all" ? units.length : units.filter((u) => u.house === house).length;
  const active = bookings.filter((b) => b.status !== "cancelled");
  const inHouse = active.filter((b) => overlaps(today, tomorrow, b.checkIn, b.checkOut));
  const longStays = inHouse.filter((b) => b.quote.nights >= 7).length;
  const avg = inHouse.length ? Math.round(inHouse.reduce((n, b) => n + b.quote.nights, 0) / inHouse.length) : 0;
  const nightly = inHouse.reduce((n, b) => n + b.quote.total / b.quote.nights, 0);
  return (
    <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
      <Stat label="Occupancy tonight" value={`${Math.round((inHouse.length / rooms) * 100)}%`} note={`${inHouse.length} of ${rooms} rooms occupied`} />
      <Stat label="Long stays" value={longStays} note="Guests staying 7 nights or more" />
      <Stat label="Average stay" value={`${avg} nights`} note="Across guests in house" />
      <Stat label="Room revenue tonight" value={naira(nightly)} note="After long-stay discounts" />
    </div>
  );
}
