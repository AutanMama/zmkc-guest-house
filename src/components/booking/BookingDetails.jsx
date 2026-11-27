import { STAY_REASONS } from "../../data/content";
import { houseById, unitById } from "../../data/houses";
import { CATEGORIES } from "../../data/rooms";
import { formatLong } from "../../lib/dates";
import { PAYMENT_OPTIONS } from "../../lib/payments";
import QuoteLines from "./QuoteLines";
import { roomLabel } from "../../lib/roomLabel";

export default function BookingDetails({ booking }) {
  const house = houseById[booking.house];
  const rows = [
    ["Guest house", house.name],
    ["Room", `${roomLabel(unitById[booking.unit])} · ${CATEGORIES[booking.category]?.name}`],
    ["Check-in", `${formatLong(booking.checkIn)}, any time`],
    ["Check-out", `${formatLong(booking.checkOut)}, by 12 noon`],
    ["Guests", booking.guests],
    ["Visit", STAY_REASONS.find((r) => r.id === booking.reason)?.label],
    ["Booked by", `${booking.guest.name} · ${booking.guest.phone}`],
    ["Payment", PAYMENT_OPTIONS.find((p) => p.id === booking.payment)?.label],
  ];
  return (
    <div>
      <dl className="divide-y divide-line border-y border-line">
        {rows.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[130px_1fr] gap-4 py-3 text-[15px]">
            <dt className="text-muted">{k}</dt>
            <dd className="text-ink">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6">
        <QuoteLines quote={booking.quote} />
      </div>
    </div>
  );
}
