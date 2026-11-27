import { Plus } from "lucide-react";
import { FAQS } from "../../data/content";
import SectionTitle from "../ui/SectionTitle";

export default function Faq() {
  return (
    <section className="bg-paper py-20 md:py-24">
      <div className="mx-auto grid max-w-6xl gap-12 px-5 md:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <SectionTitle eyebrow="Before you come" title="Questions families ask us." />
        <div className="divide-y divide-line border-y border-line">
          {FAQS.map((f, i) => (
            <details key={f.q} open={i === 0} className="group py-5">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-serif text-xl text-ink">
                {f.q}
                <Plus size={20} className="shrink-0 text-garden transition-transform group-open:rotate-45" aria-hidden />
              </summary>
              <p className="mt-3 max-w-2xl leading-relaxed text-muted">{f.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
