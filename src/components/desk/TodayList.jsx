import { houseById, unitById } from "../../data/houses";
import { REASON_TONE } from "../../lib/reasons";

export default function TodayList({ title, list, empty, onOpen }) {
  return (
    <section className="rounded-xl border border-line bg-paper">
      <h2 className="flex items-baseline justify-between border-b border-line px-5 py-4 font-serif text-xl text-ink">
        {title} <span className="font-sans text-sm text-muted">{list.length}</span>
      </h2>
      {list.length === 0 ? (
        <p className="px-5 py-8 text-center text-muted">{empty}</p>
      ) : (
        <ul className="divide-y divide-line">
          {list.slice(0, 6).map((b) => (
            <li key={b.ref}>
              <button type="button" onClick={() => onOpen(b)} className="flex w-full items-center gap-3 px-5 py-3 text-left hover:bg-page">
                <span className={`h-2.5 w-2.5 shrink-0 rounded-full ${REASON_TONE[b.reason].dot}`} aria-hidden />
                <span className="min-w-0 flex-1">
                  <span className="block truncate font-semibold text-ink">{b.guest.name}</span>
                  <span className="block text-sm text-muted">
                    {houseById[b.house].name} · {unitById[b.unit]?.name} · {b.quote.nights} nights
                  </span>
                </span>
                <span className="text-sm text-muted">{b.ref}</span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
