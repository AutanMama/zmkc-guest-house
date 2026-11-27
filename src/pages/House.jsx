import { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Check, MapPin } from "lucide-react";
import Gallery from "../components/house/Gallery";
import RoomCard from "../components/room/RoomCard";
import StayRules from "../components/house/StayRules";
import RoomModal from "../components/room/RoomModal";
import { Chip } from "../components/room/RoomFilters";
import TravelBadge from "../components/ui/TravelBadge";
import SearchBar from "../components/search/SearchBar";
import { AMENITIES, AREAS, houseById } from "../data/houses";
import { CATEGORIES } from "../data/rooms";
import { roomStatus } from "../lib/availability";
import { useBookings } from "../hooks/useBookings";
import { searchQuery, useStaySearch } from "../hooks/useStaySearch";
import NotFound from "./NotFound";

export default function House() {
  const { id } = useParams();
  const house = houseById[id];
  const [search, setSearch] = useStaySearch();
  const bookings = useBookings();
  const rooms = useMemo(() => (house ? roomStatus(id, search.checkIn, search.checkOut, bookings) : []), [house, id, search.checkIn, search.checkOut, bookings]);
  const [open, setOpen] = useState(null);
  const [onlyAvailable, setOnlyAvailable] = useState(false);
  const [category, setCategory] = useState("all");

  if (!house) return <NotFound />;
  const query = searchQuery(search);
  const categories = [...new Set(house.rooms.map((r) => r.category))];
  const shown = rooms.filter((r) => (!onlyAvailable || r.available) && (category === "all" || r.category === category));
  const blocks = [...new Set(shown.map((r) => r.block))];
  const free = rooms.filter((r) => r.available).length;

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
      <Link to={`/areas/${house.area}?${query}`} className="inline-flex items-center gap-2 text-[15px] font-semibold text-muted hover:text-ink">
        <ArrowLeft size={17} aria-hidden /> All of {AREAS[house.area].name}
      </Link>
      <div className="mt-5 flex flex-wrap items-end justify-between gap-6">
        <div>
          <p className="text-sm font-bold tracking-[0.12em] text-brand uppercase">{AREAS[house.area].name}</p>
          <h1 className="mt-2 font-display text-5xl leading-none font-semibold tracking-tight text-ink md:text-7xl">{house.name}</h1>
          <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
            <TravelBadge travel={house.travel} />
            <span className="inline-flex items-center gap-1.5 text-sm text-muted"><MapPin size={15} aria-hidden />{house.address}</span>
          </div>
        </div>
        <p className="rounded-2xl bg-paper px-5 py-3 text-right shadow-card">
          <span className="block font-display text-3xl font-semibold text-brand">{free}/{rooms.length}</span>
          <span className="text-sm text-muted">rooms available for your dates</span>
        </p>
      </div>
      <div className="mt-8">
        <Gallery images={house.gallery} alt={house.name} />
      </div>
      <div className="mt-10 grid gap-8 lg:grid-cols-[1.2fr_1fr]">
        <p className="text-xl leading-relaxed text-ink">{house.tagline}</p>
        <ul className="grid grid-cols-2 gap-x-6 gap-y-2.5">
          {house.amenities.map((a) => (
            <li key={a} className="flex items-center gap-2.5 text-ink"><Check size={17} className="text-brand" aria-hidden /> {AMENITIES[a]}</li>
          ))}
        </ul>
      </div>

      <div className="mt-10">
        <StayRules house={house} />
      </div>

      <section className="mt-16" aria-labelledby="rooms">
        <h2 id="rooms" className="font-display text-4xl font-semibold text-ink">Choose your room</h2>
        <div className="mt-5"><SearchBar key={query} initial={search} onSearch={setSearch} /></div>
        <div className="mt-6 flex flex-wrap gap-2">
          <Chip active={category === "all"} onClick={() => setCategory("all")}>All rooms</Chip>
          {categories.map((c) => <Chip key={c} active={category === c} onClick={() => setCategory(c)}>{CATEGORIES[c].name}</Chip>)}
          <Chip active={onlyAvailable} onClick={() => setOnlyAvailable((v) => !v)}>Available only</Chip>
        </div>
        {blocks.map((b) => (
          <div key={b} className="mt-10">
            <h3 className="border-b border-line pb-3 font-display text-2xl font-semibold text-ink">{b}</h3>
            {[...new Set(shown.filter((r) => r.block === b).map((r) => r.floor))].map((floor) => (
              <div key={floor ?? "all"} className="mt-6">
                {floor && <p className="mb-3 text-sm font-bold tracking-[0.1em] text-brand uppercase">{floor}</p>}
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {shown.filter((r) => r.block === b && r.floor === floor).map((r) => <RoomCard key={r.id} room={r} nights={search.nights} onOpen={setOpen} />)}
                </div>
              </div>
            ))}
          </div>
        ))}
        {shown.length === 0 && <p className="mt-10 rounded-2xl border border-dashed border-line p-10 text-center text-muted">No rooms match. Try other filters or dates.</p>}
        {house.sampleRates && <p className="mt-6 text-sm text-muted">Rates for this house are sample figures.</p>}
      </section>

      {open && <RoomModal room={open} search={search} onClose={() => setOpen(null)} />}
    </main>
  );
}
