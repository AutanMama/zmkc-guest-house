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
    <section className="px-3 pt-3 md:px-5 md:pt-5">
      <div className="relative isolate mx-auto max-w-[1440px] overflow-hidden rounded-[28px] bg-deep">
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
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(100deg,rgb(11_59_38/0.92)_0%,rgb(11_59_38/0.6)_45%,rgb(15_42_28/0.1)_100%)]" aria-hidden />

        <div className="mx-auto flex min-h-[min(74svh,720px)] max-w-6xl flex-col justify-center px-5 pt-16 pb-28 md:px-8 md:pb-32">
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
          <h1 className="mt-5 max-w-3xl font-display text-5xl leading-[0.98] font-semibold tracking-tight text-white sm:text-6xl lg:text-[80px]">
            {LINES.map((line, i) => (
              <span key={line} className="block overflow-hidden pb-1">
                <motion.span className="block" initial={{ y: "105%" }} animate={{ y: 0 }} transition={{ duration: 0.9, delay: 0.15 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}>
                  {line}
                </motion.span>
              </span>
            ))}
          </h1>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }} className="mt-5 max-w-lg text-lg text-white/90">
            Seven guest houses in Gudu, Guzape and on the Apo road, made for patients of the Zenith Medical & Kidney Centre and the families and caregivers who come with them.
          </motion.p>
        </div>

        <div className="absolute right-6 bottom-24 flex gap-1.5 md:right-10 md:bottom-28" aria-hidden>
          {SLIDES.map((s, i) => (
            <span key={s} className="h-1 w-8 overflow-hidden rounded-full bg-white/30">
              {i === slide && <motion.span key={slide} className="block h-full bg-lime" initial={{ width: 0 }} animate={{ width: "100%" }} transition={{ duration: 6, ease: "linear" }} />}
            </span>
          ))}
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="relative z-10 mx-auto -mt-16 max-w-6xl px-2 md:-mt-20 md:px-8"
      >
        <SearchBar />
      </motion.div>
    </section>
  );
}
