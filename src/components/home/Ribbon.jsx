import { Sparkle } from "lucide-react";

const ITEMS = [
  "Reception open day and night",
  "Never sleep without light",
  "4 minutes' walk from the centre",
  "A cook in every Guzape house",
  "Housekeepers in every house",
  "10% off every night after your first month",
  "Pay by transfer or POS",
];

// A slow ribbon of what guests can count on. Pauses on hover.
export default function Ribbon() {
  const row = [...ITEMS, ...ITEMS];
  return (
    <div className="group mt-10 overflow-hidden border-y border-white/10 bg-deep py-4" aria-label="What every guest can count on">
      <ul className="animate-ribbon flex w-max gap-8 group-hover:[animation-play-state:paused]">
        {row.map((item, i) => (
          <li key={i} className="flex items-center gap-8 font-display text-lg font-medium whitespace-nowrap text-on-deep md:text-xl" aria-hidden={i >= ITEMS.length}>
            {item}
            <Sparkle size={16} className="text-lime" aria-hidden />
          </li>
        ))}
      </ul>
    </div>
  );
}
