import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { AREAS, priceRange } from "../../data/houses";
import { naira } from "../../lib/money";
import TravelBadge from "../ui/TravelBadge";

export default function HouseCard({ house, query = "" }) {
  const [low, high] = priceRange(house);
  return (
    <Link to={`/stays/${house.id}${query ? `?${query}` : ""}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-xl bg-mist">
        <img src={house.cover} alt={house.name} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.04]" />
        <span className="absolute top-3 left-3 rounded-md bg-paper/95 px-2.5 py-1 text-xs font-bold tracking-[0.08em] text-garden uppercase">{AREAS[house.area].name}</span>
      </div>
      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="font-serif text-2xl leading-tight font-medium text-ink">{house.name}</h3>
          <div className="mt-1.5"><TravelBadge travel={house.travel} /></div>
        </div>
        <p className="shrink-0 text-right">
          <span className="block text-sm text-muted">{house.rooms.length} rooms</span>
          <span className="figure block font-semibold text-ink">{low === high ? naira(low) : `${naira(low)}–${naira(high).replace("₦", "")}`}</span>
        </p>
      </div>
      <p className="mt-2 line-clamp-2 leading-relaxed text-muted">{house.tagline}</p>
      <span className="mt-3 inline-flex items-center gap-1.5 text-[15px] font-semibold text-garden">
        See rooms <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden />
      </span>
    </Link>
  );
}
