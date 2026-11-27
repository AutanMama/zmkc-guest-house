import { CATEGORIES } from "../../data/rooms";
import { naira } from "../../lib/money";

// Every room in the house, grouped by apartment or building, numbered the
// way the reception numbers them. Occupied rooms show but can't be picked.
export default function RoomGrid({ rooms, selected, onSelect }) {
  const blocks = [...new Set(rooms.map((r) => r.block))];
  const freeCount = rooms.filter((r) => r.free).length;
  return (
    <div>
      <div className="flex flex-wrap items-center justify-between gap-3">
        <p className="text-[15px] text-ink">
          <span className="font-semibold">{freeCount} of {rooms.length}</span> rooms free for your dates
        </p>
        <ul className="flex gap-4 text-sm text-muted">
          <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm border border-hibiscus bg-paper" aria-hidden />Free</li>
          <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-mist" aria-hidden />Occupied</li>
          <li className="flex items-center gap-2"><span className="h-3 w-3 rounded-sm bg-hibiscus" aria-hidden />Your choice</li>
        </ul>
      </div>
      <div className="mt-5 space-y-6">
        {blocks.map((b) => (
          <div key={b}>
            <h3 className="eyebrow text-hibiscus">{b}</h3>
            <ul className="mt-3 grid grid-cols-2 gap-2.5 sm:grid-cols-3 lg:grid-cols-4">
              {rooms
                .filter((r) => r.block === b)
                .map((r) => {
                  const isSel = selected === r.id;
                  return (
                    <li key={r.id}>
                      <button
                        type="button"
                        disabled={!r.free}
                        onClick={() => onSelect(r.id)}
                        aria-pressed={isSel}
                        aria-label={`${r.name}, room ${r.no}, ${naira(r.rate)} a night, ${r.free ? "free" : "occupied"}`}
                        className={`w-full rounded-lg border p-3 text-left transition-colors ${
                          isSel
                            ? "border-hibiscus bg-hibiscus text-white"
                            : r.free
                              ? "border-hibiscus/40 bg-paper hover:border-hibiscus"
                              : "cursor-not-allowed border-transparent bg-mist text-muted"
                        }`}
                      >
                        <span className="block font-display text-xl">{r.name}</span>
                        <span className={`mt-0.5 block text-sm ${isSel ? "text-blush" : "text-muted"}`}>Room {r.no} · {CATEGORIES[r.category].name}</span>
                        <span className="mt-1 flex items-baseline justify-between gap-2">
                          <span className={`figure font-semibold ${isSel ? "text-white" : r.free ? "text-ink" : "text-muted"}`}>{naira(r.rate)}</span>
                          {!r.free && <span className="text-xs font-semibold tracking-wide uppercase">Occupied</span>}
                        </span>
                      </button>
                    </li>
                  );
                })}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
