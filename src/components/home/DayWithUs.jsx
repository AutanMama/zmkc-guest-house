import { motion } from "framer-motion";
import { MoonStar, Sun, Sunrise, Sunset } from "lucide-react";
import SectionTitle from "../ui/SectionTitle";

const MOMENTS = [
  { time: "Morning", icon: Sunrise, title: "A short walk to your session", body: "Leave after breakfast and you're at the centre in minutes. From Guzape, the shuttle takes you.", photo: "/photos/house-courtyard.webp" },
  { time: "Afternoon", icon: Sun, title: "Rest in a quiet room", body: "Cool air, clean sheets, a door that closes. Housekeeping has already been in.", photo: "/photos/r-warmplant.webp" },
  { time: "Evening", icon: Sunset, title: "Cook, or let the cook", body: "Make your own meal in the guest kitchen, or in Guzape, tell the cook what you'd like.", photo: "/photos/kitchen-table.webp" },
  { time: "Night", icon: MoonStar, title: "The light stays on", body: "Reception is awake, and if the grid goes off, the generator runs until morning.", photo: "/photos/r-woodhead.webp" },
];

// A day at the guest houses, told in four moments.
export default function DayWithUs() {
  return (
    <section id="life" className="scroll-mt-20 overflow-x-clip py-20 md:py-28">
      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <SectionTitle eyebrow="A day with us" title="Life between appointments." intro="What a day looks like when you stay close to your care." />
        <ol className="relative mt-14 space-y-16 md:space-y-24">
          <span className="absolute top-0 bottom-0 left-[19px] hidden w-px bg-line md:left-1/2 md:block" aria-hidden />
          {MOMENTS.map((m, i) => {
            const Icon = m.icon;
            const flip = i % 2 === 1;
            return (
              <li key={m.time} className="relative grid items-center gap-8 md:grid-cols-2 md:gap-16">
                <motion.img
                  src={m.photo}
                  alt=""
                  loading="lazy"
                  className={`aspect-[4/3] w-full rounded-3xl object-cover shadow-card ${flip ? "md:order-2" : ""}`}
                  initial={{ opacity: 0, scale: 0.94, rotate: flip ? 2 : -2 }}
                  whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                />
                <motion.div
                  initial={{ opacity: 0, x: flip ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-80px" }}
                  transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="inline-flex items-center gap-2 rounded-full bg-lime px-3.5 py-1.5 text-sm font-bold text-ink">
                    <Icon size={16} aria-hidden /> {m.time}
                  </span>
                  <h3 className="mt-4 font-display text-4xl leading-tight font-semibold text-ink">{m.title}</h3>
                  <p className="mt-3 max-w-md text-lg leading-relaxed text-muted">{m.body}</p>
                </motion.div>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
