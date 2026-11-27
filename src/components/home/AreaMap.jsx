import { Link } from "react-router-dom";
import { AREAS, houses } from "../../data/houses";
import SectionTitle from "../ui/SectionTitle";

// A schematic of where the houses sit relative to the centre, not a street map.
const SPOTS = {
  gh1: [176, 146], gh2: [240, 140], gh3: [126, 206],
  gh4: [372, 286],
  gh5: [70, 352], gh6: [112, 392], gh7: [44, 412],
};
const AREA_LABEL = { gudu: [210, 96], apo: [372, 336], guzape: [84, 470] };

export default function AreaMap() {
  return (
    <section className="mx-auto grid max-w-6xl items-center gap-12 px-5 py-20 md:px-8 md:py-24 lg:grid-cols-[1fr_1fr]">
      <div>
        <SectionTitle eyebrow="Where we are" title="Close to the centre, wherever you stay." intro="Three houses in Gudu are a short walk away. The Apo road and Guzape houses are a short drive, with a shuttle to your appointments." />
        <ul className="mt-8 space-y-4">
          {Object.values(AREAS).map((a) => (
            <li key={a.id}>
              <p className="font-display text-xl text-ink">{a.name}</p>
              <p className="text-muted">
                {houses.filter((h) => h.area === a.id).map((h) => (
                  <Link key={h.id} to={`/stays/${h.id}`} className="mr-3 inline-block font-semibold text-hibiscus hover:underline">GH{h.number}</Link>
                ))}
                · {a.note}
              </p>
            </li>
          ))}
        </ul>
      </div>
      <svg viewBox="0 0 460 500" className="w-full max-w-[480px] justify-self-center" role="img" aria-label="Schematic map: Guest Houses 1 to 3 in Gudu next to the centre, Guest House 4 on the Apo road, Guest Houses 5 to 7 in Guzape">
        <path d="M206 200 C 260 240, 320 260, 372 286" fill="none" className="stroke-line" strokeWidth="10" strokeLinecap="round" />
        <path d="M206 200 C 160 260, 110 320, 70 380" fill="none" className="stroke-line" strokeWidth="10" strokeLinecap="round" />
        <circle cx="206" cy="200" r="90" className="fill-blush-soft" />
        <circle cx="206" cy="200" r="28" className="fill-hibiscus" />
        <path d="M198 200h16M206 192v16" stroke="#fff" strokeWidth="4" strokeLinecap="round" />
        <text x="206" y="246" textAnchor="middle" className="fill-ink text-[13px] font-semibold">Zenith Medical &amp; Kidney Centre</text>
        {Object.entries(AREA_LABEL).map(([id, [x, y]]) => (
          <text key={id} x={x} y={y} textAnchor="middle" className="fill-hibiscus font-display text-[18px]">{AREAS[id].name}</text>
        ))}
        {houses.map((h) => {
          const [x, y] = SPOTS[h.id];
          return (
            <g key={h.id}>
              <circle cx={x} cy={y} r="18" className="fill-paper stroke-hibiscus" strokeWidth="2" />
              <text x={x} y={y + 5} textAnchor="middle" className="fill-ink text-[13px] font-bold">{h.number}</text>
            </g>
          );
        })}
      </svg>
    </section>
  );
}
