import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, Check, MapPin } from "lucide-react";
import Gallery from "../components/house/Gallery";
import RoomGrid from "../components/house/RoomGrid";
import QuoteLines from "../components/booking/QuoteLines";
import TravelBadge from "../components/ui/TravelBadge";
import SearchBar from "../components/search/SearchBar";
import { AMENITIES, AREAS, houseById } from "../data/houses";
import { CATEGORIES } from "../data/rooms";
import { roomStatus } from "../lib/availability";
import { formatLong } from "../lib/dates";
import { quote } from "../lib/pricing";
import { useBookings } from "../hooks/useBookings";
import { searchQuery, useStaySearch } from "../hooks/useStaySearch";
import NotFound from "./NotFound";

export default function House() {
  const { id } = useParams();
  const house = houseById[id];
  const navigate = useNavigate();
  const [search, setSearch] = useStaySearch();
  const bookings = useBookings();
  const rooms = useMemo(() => (house ? roomStatus(id, search.checkIn, search.checkOut, bookings) : []), [house, id, search.checkIn, search.checkOut, bookings]);
  const [picked, setPicked] = useState(null);

  if (!house) return <NotFound />;
  const room = rooms.find((r) => r.id === picked && r.free) ?? null;
  const q = room && quote({ rate: room.rate, nights: search.nights });
  const query = searchQuery(search);

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
      <Link to={`/stays?${query}`} className="inline-flex items-center gap-2 text-[15px] font-medium text-muted hover:text-ink">
        <ArrowLeft size={17} aria-hidden /> All guest houses
      </Link>
      <div className="mt-5">
        <p className="eyebrow text-brass">{AREAS[house.area].name}</p>
        <h1 className="mt-2 font-serif text-5xl leading-none font-medium tracking-tight text-ink md:text-6xl">{house.name}</h1>
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-1">
          <TravelBadge travel={house.travel} />
          <span className="inline-flex items-center gap-1.5 text-sm text-muted"><MapPin size={15} aria-hidden />{house.address}</span>
        </div>
      </div>
      <div className="mt-8">
        <Gallery images={house.gallery} alt={house.name} />
      </div>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_360px]">
        <div>
          <p className="max-w-2xl text-xl leading-relaxed text-ink">{house.tagline}</p>
          <ul className="mt-6 grid gap-x-6 gap-y-2.5 sm:grid-cols-2">
            {house.amenities.map((a) => (
              <li key={a} className="flex items-center gap-2.5 text-ink"><Check size={17} className="text-garden" aria-hidden /> {AMENITIES[a]}</li>
            ))}
          </ul>

          <h2 className="mt-14 font-serif text-3xl text-ink">Choose your room</h2>
          <p className="mt-1 text-muted">{formatLong(search.checkIn)} to {formatLong(search.checkOut)}</p>
          <div className="mt-5">
            <SearchBar key={query} initial={search} onSearch={setSearch} compact narrow />
          </div>
          <div className="mt-8">
            <RoomGrid rooms={rooms} selected={room?.id} onSelect={setPicked} />
          </div>
          {house.sampleRates && <p className="mt-4 text-sm text-muted">Rates for this house are sample figures.</p>}
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="rounded-xl border border-line bg-paper p-6 shadow-card">
            <p className="eyebrow text-brass">Your stay</p>
            {room ? (
              <>
                <p className="mt-2 font-serif text-2xl text-ink">{room.name}</p>
                <p className="text-[15px] text-ink">Room {room.no} · {CATEGORIES[room.category].name}</p>
                <p className="mt-1 text-[15px] text-muted">{room.block}, {house.name}</p>
                <p className="mt-1 text-[15px] text-muted">{formatLong(search.checkIn)} → {formatLong(search.checkOut)}</p>
                <div className="mt-5"><QuoteLines quote={q} /></div>
                <button
                  type="button"
                  onClick={() => navigate(`/book?${query}&house=${house.id}&room=${room.no}`)}
                  className="mt-6 h-12 w-full rounded-lg bg-garden text-[15px] font-semibold text-white transition-colors hover:bg-garden-hover"
                >
                  Continue to booking
                </button>
                <p className="mt-3 text-center text-sm text-muted">No charge until you confirm.</p>
              </>
            ) : (
              <p className="mt-3 text-[15px] leading-relaxed text-muted">
                {rooms.some((r) => r.free) ? "Pick a free room to see the price for your stay." : "Every room here is taken for these dates. Try other dates or another house."}
              </p>
            )}
          </div>
        </aside>
      </div>
    </main>
  );
}
