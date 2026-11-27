import { motion } from "framer-motion";
import SearchBar from "../search/SearchBar";

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden">
      <img src="/photos/house-balcony.webp" alt="" className="absolute inset-0 -z-10 h-full w-full object-cover" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(15_42_28/0.15)_0%,rgb(15_42_28/0.3)_40%,rgb(11_59_38/0.94)_100%)]" aria-hidden />
      <div className="mx-auto flex min-h-[calc(100svh-72px)] max-w-6xl flex-col justify-end px-5 pt-24 pb-10 md:px-8 md:pb-14">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}>
          <p className="inline-flex rounded-full bg-lime px-3.5 py-1.5 text-sm font-bold text-ink">4 minutes' walk from the Zenith Kidney Centre</p>
          <h1 className="mt-5 max-w-4xl font-display text-[56px] leading-[0.95] font-semibold tracking-tight text-white sm:text-7xl lg:text-[112px]">
            Rest easy.
            <br />
            Care is next door.
          </h1>
          <p className="mt-6 max-w-xl text-lg text-white/90 md:text-xl">
            Seven guest houses in Gudu, Guzape and on the Apo road, each with its own reception. For patients and the families who come with them.
          </p>
        </motion.div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.15, ease: [0.22, 1, 0.36, 1] }} className="mt-10">
          <SearchBar onDark />
        </motion.div>
      </div>
    </section>
  );
}
