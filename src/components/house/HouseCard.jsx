import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { AREAS, priceRange } from "../../data/houses";
import { naira } from "../../lib/money";
import TravelBadge from "../ui/TravelBadge";

export default function HouseCard({ house, query = "" }) {
  const [low] = priceRange(house);
  return (
    <Link to={`/stays/${house.id}${query ? `?${query}` : ""}`} className="group block overflow-hidden rounded-2xl bg-paper shadow-card transition-transform duration-300 hover:-translate-y-1">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img src={house.cover} alt={house.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.05]" />
        <span className="absolute top-3 left-3 rounded-full bg-paper/95 px-3 py-1 text-xs font-bold tracking-[0.06em] text-hibiscus uppercase">{AREAS[house.area].name}</span>
        <span className="absolute right-3 bottom-3 rounded-full bg-mango px-3.5 py-1.5 text-sm font-bold text-ink">from {naira(low)}</span>
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-display text-2xl leading-tight font-semibold text-ink">{house.name}</h3>
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-blush-soft text-hibiscus transition-colors group-hover:bg-hibiscus group-hover:text-white">
            <ArrowUpRight size={18} aria-hidden />
          </span>
        </div>
        <div className="mt-1.5"><TravelBadge travel={house.travel} /></div>
        <p className="mt-2 line-clamp-2 leading-relaxed text-muted">{house.tagline}</p>
        <p className="mt-3 text-sm font-semibold text-ink">{house.rooms.length} rooms</p>
      </div>
    </Link>
  );
}
