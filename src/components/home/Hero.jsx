import { motion } from "framer-motion";
import SearchBar from "../search/SearchBar";

export default function Hero() {
  return (
    <section className="relative">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 pt-10 md:px-8 md:pt-16 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-14">
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}>
          <p className="eyebrow text-brass">Beside the Zenith Medical & Kidney Centre, Gudu</p>
          <h1 className="mt-5 font-serif text-[52px] leading-[1.02] font-medium tracking-tight text-ink md:text-7xl">
            Stay close to <em className="text-garden">your care.</em>
          </h1>
          <p className="mt-6 max-w-lg text-lg leading-relaxed text-muted md:text-xl">
            Seven guest houses in Gudu, Guzape and on the Apo road, each with its own reception. For dialysis, transplant work-ups, check-ups and the families who come along.
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="relative"
        >
          <img src="/photos/house-balcony.webp" alt="A guest house courtyard with a wooden balcony and a tree in the middle" className="aspect-[5/4] w-full rounded-2xl object-cover" />
          <div className="absolute -bottom-5 left-5 rounded-xl bg-garden-deep px-5 py-4 text-white shadow-card">
            <p className="font-serif text-3xl leading-none">4 min</p>
            <p className="mt-1 text-sm text-sage">walk from Guest House 1 to the centre</p>
          </div>
        </motion.div>
      </div>
      <div className="mx-auto mt-14 max-w-6xl px-5 md:px-8">
        <SearchBar />
      </div>
    </section>
  );
}
