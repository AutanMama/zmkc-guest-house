import { CATEGORIES } from "../../data/rooms";
import { houseById } from "../../data/houses";
import { naira } from "../../lib/money";
import PhotoSlider from "./PhotoSlider";

// A room with its own photos. Clicking anywhere opens the full room view.
export default function RoomCard({ room, nights, onOpen, showHouse = false, selected = false }) {
  const c = CATEGORIES[room.category];
  const house = houseById[room.house];
  return (
    <article
      className={`group overflow-hidden rounded-2xl bg-paper shadow-card transition-all duration-300 ${room.free ? "hover:-translate-y-1" : "opacity-80"} ${selected ? "ring-2 ring-brand" : ""}`}
    >
      <div className="relative">
        <PhotoSlider photos={room.photos} alt={`${room.name}, ${house.name}`} className="aspect-[4/3]" onOpen={() => onOpen(room)} />
        <span className={`absolute top-3 left-3 rounded-full px-3 py-1 text-xs font-bold ${room.free ? "bg-paper/95 text-brand" : "bg-ink/85 text-white"}`}>
          {room.free ? "Free for your dates" : "Occupied"}
        </span>
        <span className="absolute top-3 right-3 rounded-full bg-lime px-3 py-1 text-sm font-bold text-ink">{naira(room.rate)}</span>
      </div>
      <button type="button" onClick={() => onOpen(room)} className="block w-full p-5 text-left">
        <p className="text-xs font-bold tracking-[0.1em] text-brand uppercase">
          {showHouse ? `${house.name} · ` : ""}
          {room.block}
        </p>
        <h3 className="mt-1 font-display text-2xl leading-tight font-semibold text-ink">{room.name}</h3>
        <p className="mt-1 text-[15px] text-muted">
          Room {room.no} · {c.name} · {c.size}
        </p>
        <p className="mt-3 flex items-baseline justify-between gap-2">
          <span className="text-[15px] font-semibold text-ink">
            {naira(room.rate)} <span className="font-normal text-muted">a night</span>
          </span>
          <span className="text-sm font-bold text-brand group-hover:underline">{room.free ? "View and book" : "View room"}</span>
        </p>
        {room.free && nights >= 7 && <p className="mt-1 text-sm font-semibold text-brand">Long-stay rate applies for {nights} nights</p>}
      </button>
    </article>
  );
}
