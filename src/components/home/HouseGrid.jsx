import { AREAS, houses } from "../../data/houses";
import HouseCard from "../house/HouseCard";
import SectionTitle from "../ui/SectionTitle";

export default function HouseGrid() {
  return (
    <section id="houses" className="scroll-mt-20 bg-paper py-20 md:py-24">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle eyebrow="The seven houses" title="Three neighbourhoods, one standard of care." intro="Every house has its own reception, 24-hour power, Wi-Fi and daily cleaning. Choose by how close you want to be and the room you need." />
        {Object.values(AREAS).map((area) => (
          <div key={area.id} className="mt-14">
            <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1 border-b border-line pb-3">
              <h3 className="font-serif text-3xl text-ink">{area.name}</h3>
              <p className="text-muted">{area.note}</p>
            </div>
            <div className="mt-8 grid gap-x-8 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
              {houses.filter((h) => h.area === area.id).map((h) => <HouseCard key={h.id} house={h} />)}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
