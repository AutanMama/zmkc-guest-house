import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Check, X } from "lucide-react";
import { CATEGORIES } from "../../data/rooms";
import { houseById, travelText } from "../../data/houses";
import { formatLong } from "../../lib/dates";
import { quote } from "../../lib/pricing";
import { searchQuery } from "../../hooks/useStaySearch";
import QuoteLines from "../booking/QuoteLines";
import PhotoSlider from "./PhotoSlider";
import { roomDetail } from "../../lib/roomLabel";

// The full room view: big gallery, what's in the room, price for the dates.
export default function RoomModal({ room, search, onClose }) {
  const navigate = useNavigate();
  const closeRef = useRef(null);
  const c = CATEGORIES[room.category];
  const house = houseById[room.house];
  const q = quote({ rate: room.rate, nights: search.nights });

  useEffect(() => {
    closeRef.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center sm:p-6">
      <div className="absolute inset-0 bg-ink/60 backdrop-blur-sm" onClick={onClose} aria-hidden />
      <div role="dialog" aria-modal="true" aria-label={`${room.name}, ${house.name}`} className="animate-rise relative flex max-h-[94dvh] w-full max-w-5xl flex-col overflow-hidden rounded-t-3xl bg-paper sm:rounded-3xl lg:flex-row">
        <button ref={closeRef} type="button" onClick={onClose} aria-label="Close" className="absolute top-4 right-4 z-10 grid h-11 w-11 place-items-center rounded-full bg-paper/95 text-ink shadow hover:bg-paper">
          <X size={20} />
        </button>
        <PhotoSlider photos={room.photos} alt={`${room.name}, ${house.name}`} large className="h-64 shrink-0 sm:h-80 lg:h-auto lg:min-h-[560px] lg:w-[58%]" />
        <div className="flex-1 overflow-y-auto p-6 md:p-8">
          <p className="text-xs font-bold tracking-[0.12em] text-brand uppercase">
            {house.name} · {c.name}
          </p>
          <h2 className="mt-2 font-display text-4xl leading-none font-semibold text-ink">{room.name}</h2>
          <p className="mt-2 text-muted">
            {[roomDetail(room), c.bed, c.size].filter(Boolean).join(" · ")}
          </p>
          <p className="mt-4 leading-relaxed text-ink">{c.summary}</p>
          <ul className="mt-5 grid grid-cols-2 gap-x-4 gap-y-2">
            {c.features.map((f) => (
              <li key={f} className="flex items-center gap-2 text-[15px] text-ink">
                <Check size={16} className="shrink-0 text-brand" aria-hidden /> {f}
              </li>
            ))}
          </ul>
          <p className="mt-5 text-sm font-semibold text-brand">{travelText(house.travel)}</p>

          <div className="mt-6 rounded-2xl bg-page p-5">
            <p className="text-sm text-muted">
              {formatLong(search.checkIn)} → {formatLong(search.checkOut)}
            </p>
            {room.free ? (
              <>
                <div className="mt-3">
                  <QuoteLines quote={q} />
                </div>
                <button
                  type="button"
                  onClick={() => navigate(`/book?${searchQuery(search)}&house=${room.house}&room=${room.no}`)}
                  className="mt-5 h-13 w-full rounded-xl bg-brand py-3.5 text-base font-bold text-white transition-colors hover:bg-brand-hover"
                >
                  Book {room.name}
                </button>
              </>
            ) : (
              <p className="mt-3 font-semibold text-alert">Occupied for these dates. Change your dates or choose another room.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
