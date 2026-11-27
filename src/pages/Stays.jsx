import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import SearchBar from "../components/search/SearchBar";
import TravelBadge from "../components/ui/TravelBadge";
import { AREAS } from "../data/houses";
import { searchHouses } from "../lib/availability";
import { formatShort } from "../lib/dates";
import { naira } from "../lib/money";
import { quote } from "../lib/pricing";
import { useBookings } from "../hooks/useBookings";
import { searchQuery, useStaySearch } from "../hooks/useStaySearch";

const BUDGETS = [
  { id: 0, label: "Any price" },
  { id: 20000, label: "Up to ₦20,000" },
  { id: 35000, label: "Up to ₦35,000" },
];

function Chip({ active, onClick, children }) {
  return (
    <button type="button" aria-pressed={active} onClick={onClick} className={`rounded-lg border px-3.5 py-2 text-sm font-semibold transition-colors ${active ? "border-brand bg-brand text-white" : "border-line bg-paper text-ink hover:border-ink/40"}`}>
      {children}
    </button>
  );
}

export default function Stays() {
  const [search, setSearch] = useStaySearch();
  const bookings = useBookings();
  const [area, setArea] = useState("");
  const [maxRate, setMaxRate] = useState(0);
  const results = useMemo(() => searchHouses({ ...search, filters: { area, maxRate } }, bookings), [search, area, maxRate, bookings]);
  const query = searchQuery(search);
  const availableTotal = results.reduce((n, r) => n + r.available.length, 0);

  return (
    <main className="mx-auto max-w-6xl px-5 py-10 md:px-8 md:py-14">
      <h1 className="font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">Find a room near the centre</h1>
      <div className="mt-6"><SearchBar key={query} initial={search} onSearch={setSearch} /></div>

      <div className="mt-8 flex flex-wrap items-center gap-2" role="group" aria-label="Filters">
        <Chip active={!area} onClick={() => setArea("")}>All areas</Chip>
        {Object.values(AREAS).map((a) => <Chip key={a.id} active={area === a.id} onClick={() => setArea(a.id)}>{a.name}</Chip>)}
        <span className="mx-1 hidden h-6 w-px bg-line sm:block" aria-hidden />
        {BUDGETS.map((b) => <Chip key={b.id} active={maxRate === b.id} onClick={() => setMaxRate(b.id)}>{b.label}</Chip>)}
      </div>
      <p className="mt-4 text-[15px] text-muted">
        <span className="font-semibold text-ink">{availableTotal} rooms available</span> from {formatShort(search.checkIn)} to {formatShort(search.checkOut)}
      </p>

      {Object.values(AREAS)
        .filter((a) => results.some((r) => r.house.area === a.id))
        .map((a) => (
          <section key={a.id} className="mt-10">
            <div className="flex flex-wrap items-baseline gap-x-4 border-b border-line pb-3">
              <h2 className="font-display text-3xl text-ink">{a.name}</h2>
              <p className="text-muted">{a.note}</p>
            </div>
            <ul className="mt-5 space-y-5">
              {results.filter((r) => r.house.area === a.id).map(({ house, total, available: free, from }) => {
                const full = free.length === 0;
                const q = !full && quote({ rate: from, nights: search.nights });
                return (
                  <li key={house.id} className={`grid gap-5 rounded-xl border border-line bg-paper p-4 md:grid-cols-[280px_1fr_220px] md:p-5 ${full ? "opacity-75" : ""}`}>
                    <img src={house.cover} alt={house.name} loading="lazy" className="aspect-[4/3] w-full rounded-lg object-cover" />
                    <div>
                      <h3 className="font-display text-3xl leading-tight text-ink">{house.name}</h3>
                      <div className="mt-2"><TravelBadge travel={house.travel} /></div>
                      <p className="mt-3 leading-relaxed text-muted">{house.tagline}</p>
                      <div className="mt-4">
                        <div className="flex justify-between text-sm"><span className="font-semibold text-ink">{free.length} of {total} rooms available</span><span className="text-muted">{total - free.length} occupied</span></div>
                        <div className="mt-1.5 flex h-2 overflow-hidden rounded-full bg-mist" aria-hidden>
                          <span className="bg-brand" style={{ width: `${(free.length / total) * 100}%` }} />
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col justify-between gap-4 border-t border-line pt-4 md:border-t-0 md:border-l md:pt-0 md:pl-5">
                      {full ? (
                        <p className="font-semibold text-stop">No rooms available for these dates{maxRate ? " in your budget" : ""}</p>
                      ) : (
                        <div>
                          <p className="text-sm text-muted">From {naira(from)} a night</p>
                          <p className="figure font-display text-3xl text-ink">{naira(q.total)}</p>
                          <p className="text-sm text-muted">for {search.nights} nights{q.tier && <span className="font-semibold text-brand"> · 10% off after month one</span>}</p>
                        </div>
                      )}
                      <Link to={`/stays/${house.id}?${query}`} className={`inline-flex h-11 items-center justify-center gap-2 rounded-lg text-[15px] font-semibold transition-colors ${full ? "border border-line text-ink hover:border-ink/40" : "bg-brand text-white hover:bg-brand-hover"}`}>
                        {full ? "See the house" : "Choose a room"} <ArrowRight size={16} aria-hidden />
                      </Link>
                    </div>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
    </main>
  );
}
