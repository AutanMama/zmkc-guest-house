import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import RoomCard from "../components/room/RoomCard";
import RoomModal from "../components/room/RoomModal";
import { Chip } from "../components/room/RoomFilters";
import { SORTS, sortRooms } from "../lib/sortRooms";
import SearchBar from "../components/search/SearchBar";
import TravelBadge from "../components/ui/TravelBadge";
import { AREAS, houses } from "../data/houses";
import { roomStatus } from "../lib/availability";
import { naira } from "../lib/money";
import { useBookings } from "../hooks/useBookings";
import { searchQuery, useStaySearch } from "../hooks/useStaySearch";
import NotFound from "./NotFound";

const COVER = { gudu: "/photos/house-balcony.webp", apo: "/photos/hero-garden.webp", guzape: "/photos/r-goldart.webp" };

// Every room in one area, across its guest houses, with photos and filters.
export default function Area() {
  const { area: areaId } = useParams();
  const area = AREAS[areaId];
  const [search, setSearch] = useStaySearch();
  const bookings = useBookings();
  const [house, setHouse] = useState("all");
  const [sort, setSort] = useState("price");
  const [onlyAvailable, setOnlyAvailable] = useState(true);
  const [open, setOpen] = useState(null);
  const areaHouses = houses.filter((h) => h.area === areaId);
  const rooms = useMemo(
    () => houses.filter((h) => h.area === areaId).flatMap((h) => roomStatus(h.id, search.checkIn, search.checkOut, bookings)),
    [areaId, search.checkIn, search.checkOut, bookings]
  );
  if (!area) return <NotFound />;

  const shown = sortRooms(rooms.filter((r) => (house === "all" || r.house === house) && (!onlyAvailable || r.available)), sort);
  const free = rooms.filter((r) => r.available);
  const query = searchQuery(search);

  return (
    <main>
      <section className="relative isolate overflow-hidden">
        <img src={COVER[areaId]} alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(15_42_28/0.25),rgb(11_59_38/0.92))]" aria-hidden />
        <div className="mx-auto max-w-6xl px-5 pt-24 pb-10 md:px-8 md:pt-32">
          <nav className="flex flex-wrap gap-2" aria-label="Areas">
            {Object.values(AREAS).map((a) => (
              <Link key={a.id} to={`/areas/${a.id}?${query}`} aria-current={a.id === areaId ? "page" : undefined} className={`rounded-full px-4 py-2 text-sm font-bold transition-colors ${a.id === areaId ? "bg-lime text-ink" : "bg-white/15 text-white hover:bg-white/25"}`}>
                {a.name}
              </Link>
            ))}
          </nav>
          <h1 className="mt-6 font-display text-6xl leading-none font-semibold tracking-tight text-white md:text-8xl">{area.name}</h1>
          <p className="mt-4 max-w-xl text-lg text-white/90">
            {area.note}. {areaHouses.length} {areaHouses.length === 1 ? "house" : "houses"}, {rooms.length} rooms,{" "}
            <span className="font-bold text-lime">{free.length} available</span> for your dates.
          </p>
          <div className="mt-8"><SearchBar key={query} initial={search} onSearch={setSearch} onDark /></div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-5 py-12 md:px-8">
        <div className="grid gap-4 md:grid-cols-3">
          {areaHouses.map((h) => {
            const hr = rooms.filter((r) => r.house === h.id);
            const hf = hr.filter((r) => r.available);
            return (
              <button key={h.id} type="button" onClick={() => setHouse(house === h.id ? "all" : h.id)} aria-pressed={house === h.id} className={`flex items-center gap-4 rounded-2xl p-3 text-left transition-colors ${house === h.id ? "bg-brand text-white" : "bg-paper shadow-card hover:bg-brand-soft"}`}>
                <img src={h.cover} alt="" className="h-20 w-24 shrink-0 rounded-xl object-cover" />
                <span className="min-w-0">
                  <span className="block font-display text-xl font-semibold">{h.name}</span>
                  <span className={`block text-sm ${house === h.id ? "text-on-deep" : "text-muted"}`}>
                    {hf.length} of {hr.length} available · from {naira(Math.min(...hr.map((r) => r.rate)))}
                  </span>
                  <span className={`text-sm font-semibold ${house === h.id ? "text-lime" : ""}`}>{house === h.id ? "Showing only this house" : <TravelBadge travel={h.travel} />}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className="mt-8 flex flex-wrap items-center gap-2">
          <Chip active={onlyAvailable} onClick={() => setOnlyAvailable((v) => !v)}>Available only</Chip>
          <span className="mx-1 h-6 w-px bg-line" aria-hidden />
          {SORTS.map((s) => <Chip key={s.id} active={sort === s.id} onClick={() => setSort(s.id)}>{s.label}</Chip>)}
          <p className="ml-auto text-[15px] text-muted">{shown.length} rooms</p>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r) => <RoomCard key={r.id} room={r} nights={search.nights} onOpen={setOpen} showHouse />)}
        </div>
        {shown.length === 0 && <p className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-muted">Every room here is taken for these dates. Try other dates, or turn off "Available only" to see them.</p>}
      </section>

      {open && <RoomModal room={open} search={search} onClose={() => setOpen(null)} />}
    </main>
  );
}
