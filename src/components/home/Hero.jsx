import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SearchBar from "../search/SearchBar";
import { useTonight } from "../../hooks/useTonight";

const SLIDES = ["/photos/house-balcony.webp", "/photos/r-goldart.webp", "/photos/hero-garden.webp", "/photos/r-balcony.webp"];
const LINES = ["Rest easy.", "Care is next door."];

export default function Hero() {
  const [slide, setSlide] = useState(0);
  const tonight = useTonight();

  useEffect(() => {
    const id = setInterval(() => setSlide((s) => (s + 1) % SLIDES.length), 6000);
    return () => clearInterval(id);
  }, []);

  return (
    <section className="relative isolate overflow-hidden bg-deep">
      <AnimatePresence initial={false}>
        <motion.img
          key={SLIDES[slide]}
          src={SLIDES[slide]}
          alt=""
          className="absolute inset-0 -z-10 h-full w-full object-cover"
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ opacity: { duration: 1.4 }, scale: { duration: 7, ease: "linear" } }}
        />
      </AnimatePresence>
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgb(15_42_28/0.15)_0%,rgb(15_42_28/0.3)_40%,rgb(11_59_38/0.94)_100%)]" aria-hidden />

      <div className="mx-auto flex min-h-[calc(100svh-72px)] max-w-6xl flex-col justify-end px-5 pt-24 pb-10 md:px-8 md:pb-14">
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="inline-flex w-fit items-center gap-2.5 rounded-full bg-paper/95 px-3.5 py-1.5 text-sm font-bold text-ink"
        >
          <span className="relative flex h-2.5 w-2.5" aria-hidden>
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand opacity-60" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-brand" />
          </span>
          Reception is open now · {tonight} rooms available tonight
        </motion.p>
        <h1 className="mt-5 max-w-4xl font-display text-[56px] leading-[0.95] font-semibold tracking-tight text-white sm:text-7xl lg:text-[112px]">
          {LINES.map((line, i) => (
            <span key={line} className="block overflow-hidden pb-1">
              <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}>
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="mt-6 max-w-xl text-lg text-white/90 md:text-xl">
          Seven guest houses in Gudu, Guzape and on the Apo road, made for patients of the Zenith Medical & Kidney Centre and the families and caregivers who come with them.
        </motion.p>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }} className="mt-10">
          <SearchBar onDark />
        </motion.div>
        <div className="mt-8 flex items-center">
          <div className="flex gap-1.5" aria-hidden>
            {SLIDES.map((s, i) => (
              <span key={s} className="h-1 w-10 overflow-hidden rounded-full bg-white/25">
                {i === slide && <motion.span key={slide} className="block h-full bg-lime" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 6, ease: "linear" }} />}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
