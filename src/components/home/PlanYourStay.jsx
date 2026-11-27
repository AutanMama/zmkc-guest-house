import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { STAY_REASONS } from "../../data/content";
import { addDays, todayKey } from "../../lib/dates";
import { searchQuery } from "../../hooks/useStaySearch";
import Button from "../ui/Button";
import SectionTitle from "../ui/SectionTitle";

const NIGHTS = { dialysis: 21, transplant: 42, checkup: 2, visiting: 5 };

export default function PlanYourStay() {
  const [active, setActive] = useState(STAY_REASONS[0].id);
  const reason = STAY_REASONS.find((r) => r.id === active);
  const checkIn = addDays(todayKey(), 1);
  const query = searchQuery({ reason: active, checkIn, checkOut: addDays(checkIn, NIGHTS[active]), guests: active === "visiting" ? 1 : 2 });

  return (
    <section id="plan" className="scroll-mt-20 bg-garden-deep py-20 text-white md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <SectionTitle light eyebrow="Plan your stay" title="Every visit to the centre is different." intro="Tell us why you're coming and we'll suggest how long to stay and which rooms suit you best." />
          <img src="/photos/lounge-sun.webp" alt="Sunlight on chairs and a plant by a window" className="mt-10 hidden aspect-[4/3] w-full rounded-xl object-cover lg:block" />
        </div>
        <div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Reason for your stay">
            {STAY_REASONS.map((r) => (
              <button
                key={r.id}
                type="button"
                role="tab"
                aria-selected={active === r.id}
                onClick={() => setActive(r.id)}
                className={`rounded-lg border px-4 py-2.5 text-[15px] font-semibold transition-colors ${
                  active === r.id ? "border-brass-light bg-brass-light text-ink" : "border-white/20 text-sage hover:border-white/50 hover:text-white"
                }`}
              >
                {r.label}
              </button>
            ))}
          </div>
          <div key={reason.id} className="animate-rise mt-8 rounded-xl border border-white/15 p-7 md:p-9" role="tabpanel">
            <p className="eyebrow text-brass-light">We suggest</p>
            <p className="mt-3 font-serif text-5xl leading-none md:text-6xl">{reason.suggest}</p>
            <p className="mt-6 text-lg leading-relaxed text-sage">{reason.note}</p>
            <Button to={`/stays?${query}`} variant="brass" className="mt-8">
              See rooms for this stay <ArrowRight size={18} aria-hidden />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
