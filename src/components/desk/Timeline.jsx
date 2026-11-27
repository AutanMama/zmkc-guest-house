import { houses, units } from "../../data/houses";
import { naira } from "../../lib/money";
import { addDays, formatWeekday, nightsBetween } from "../../lib/dates";
import { REASON_TONE } from "../../lib/reasons";
import { roomLabel } from "../../lib/roomLabel";

const COL = 56;

// Every room as a row, the next 14 nights as columns, each stay as a bar.
export default function Timeline({ bookings, start, days = 14, house = "all", onOpen }) {
  const cols = Array.from({ length: days }, (_, i) => addDays(start, i));
  const end = addDays(start, days);
  const shown = houses.filter((h) => house === "all" || h.id === house);

  return (
    <div className="overflow-x-auto rounded-xl border border-line bg-paper">
      <div style={{ minWidth: 200 + COL * days }}>
        <div className="sticky top-0 z-10 flex border-b border-line bg-paper">
          <div className="w-[200px] shrink-0 px-4 py-3 text-sm font-semibold text-muted">Room</div>
          {cols.map((d, i) => (
            <div key={d} style={{ width: COL }} className={`shrink-0 py-2 text-center text-xs ${i === 0 ? "font-bold text-brand" : "text-muted"}`}>
              {formatWeekday(d)}
              <span className="block text-sm font-semibold text-ink">{Number(d.slice(8))}</span>
            </div>
          ))}
        </div>
        {shown.map((h) => (
          <div key={h.id}>
            <div className="border-b border-line bg-page px-4 py-2 text-sm font-semibold text-ink">
              {h.name}
            </div>
            {units
              .filter((u) => u.house === h.id)
              .map((u) => {
                const stays = bookings.filter((b) => b.unit === u.id && b.status !== "cancelled" && b.checkIn < end && b.checkOut > start);
                return (
                  <div key={u.id} className="relative flex h-11 border-b border-line last:border-b-0">
                    <div className="flex w-[200px] shrink-0 items-center gap-2 px-4 text-sm">
                      <span className="truncate font-semibold text-ink">{roomLabel(u)}</span>
                      <span className="ml-auto shrink-0 text-xs text-muted">{naira(u.rate)}</span>
                    </div>
                    <div className="relative flex-1">
                      {cols.map((d, i) => (
                        <span key={d} style={{ left: i * COL, width: COL }} className={`absolute inset-y-0 border-l border-line/60 ${i === 0 ? "bg-brand-soft/60" : ""}`} aria-hidden />
                      ))}
                      {stays.map((b) => {
                        const from = Math.max(0, nightsBetween(start, b.checkIn));
                        const to = Math.min(days, nightsBetween(start, b.checkOut));
                        const tone = REASON_TONE[b.reason];
                        return (
                          <button
                            key={b.ref}
                            type="button"
                            onClick={() => onOpen(b)}
                            style={{ left: from * COL + 3, width: (to - from) * COL - 6 }}
                            className={`absolute top-1.5 bottom-1.5 truncate rounded-md px-2 text-left text-xs font-semibold ${tone.bar} hover:brightness-110`}
                            title={`${b.guest.name}, ${b.ref}`}
                          >
                            {b.guest.name}
                          </button>
                        );
                      })}
                    </div>
                  </div>
                );
              })}
          </div>
        ))}
      </div>
    </div>
  );
}
