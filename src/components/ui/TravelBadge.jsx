import { Car, Footprints } from "lucide-react";
import { travelText } from "../../data/houses";

export default function TravelBadge({ travel, light = false }) {
  const Icon = travel.mode === "walk" ? Footprints : Car;
  return (
    <span className={`inline-flex items-center gap-1.5 text-sm font-semibold ${light ? "text-white" : "text-garden"}`}>
      <Icon size={15} aria-hidden /> {travelText(travel)}
    </span>
  );
}
