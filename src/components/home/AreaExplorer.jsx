import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AREAS, houses, units } from "../../data/houses";
import { naira } from "../../lib/money";
import HouseCard from "../house/HouseCard";
import SectionTitle from "../ui/SectionTitle";
import PhotoSlider from "../room/PhotoSlider";

const ORDER = ["gudu", "apo", "guzape"];

// Tabs for each area: its houses, a peek at its rooms, and a way into all of them.
export default function AreaExplorer() {
  const [active, setActive] = useState("gudu");
  const area = AREAS[active];
  const areaHouses = houses.filter((h) => h.area === active);
  const rooms = useMemo(() => units.filter((u) => u.area === active), [active]);
  const peek = useMemo(() => {
    const seen = new Set();
    return rooms.filter((r) => (seen.has(r.category + r.house) ? false : seen.add(r.category + r.house))).slice(0, 4);
  }, [rooms]);

  return (
    <section id="houses" className="scroll-mt-20 bg-paper py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle eyebrow="Where would you like to stay?" title="Three neighbourhoods, one standard of care." />
          <div className="flex rounded-full bg-page p-1.5" role="tablist" aria-label="Areas">
            {ORDER.map((id) => (
              <button
                key={id}
                type="button"
                role="tab"
                aria-selected={active === id}
                onClick={() => setActive(id)}
                className={`rounded-full px-5 py-2.5 text-[15px] font-bold transition-colors ${active === id ? "bg-brand text-white shadow" : "text-ink hover:text-brand"}`}
              >
                {AREAS[id].name}
              </button>
            ))}
          </div>
        </div>

        <div key={active} className="animate-rise" role="tabpanel">
          <p className="mt-6 text-lg text-muted">
            <span className="font-bold text-ink">{area.name}:</span> {area.note}. {areaHouses.length} {areaHouses.length === 1 ? "house" : "houses"} and {rooms.length} rooms, from{" "}
            {naira(Math.min(...rooms.map((r) => r.rate)))} a night.
          </p>
          <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {areaHouses.map((h) => <HouseCard key={h.id} house={h} />)}
          </div>

          <h3 className="mt-14 font-display text-2xl font-semibold text-ink">A look inside the rooms</h3>
          <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {peek.map((r) => (
              <Link key={r.id} to={`/areas/${active}`} className="group overflow-hidden rounded-2xl bg-page">
                <PhotoSlider photos={r.photos} alt={r.name} className="aspect-[4/3]" />
                <div className="p-4">
                  <p className="font-display text-lg font-semibold text-ink">{r.name}</p>
                  <p className="text-sm text-muted">{houses.find((h) => h.id === r.house).name} · {naira(r.rate)}</p>
                </div>
              </Link>
            ))}
          </div>
          <Link to={`/areas/${active}`} className="mt-8 inline-flex h-13 items-center gap-2 rounded-xl bg-brand px-6 py-3.5 text-base font-bold text-white transition-colors hover:bg-brand-hover">
            See all {rooms.length} rooms in {area.name} <ArrowRight size={18} aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
