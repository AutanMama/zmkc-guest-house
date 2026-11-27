import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Swipeable photos with arrows, dots and keyboard support.
export default function PhotoSlider({ photos, alt, className = "", large = false, onOpen }) {
  const [i, setI] = useState(0);
  const touch = useRef(null);
  const go = (d) => setI((n) => (n + d + photos.length) % photos.length);
  const stop = (fn) => (e) => {
    e.preventDefault();
    e.stopPropagation();
    fn();
  };

  return (
    <div
      className={`group/slider relative overflow-hidden ${className}`}
      onTouchStart={(e) => (touch.current = e.touches[0].clientX)}
      onTouchEnd={(e) => {
        const dx = e.changedTouches[0].clientX - (touch.current ?? 0);
        if (Math.abs(dx) > 40) go(dx < 0 ? 1 : -1);
      }}
      onKeyDown={(e) => {
        if (e.key === "ArrowRight") go(1);
        if (e.key === "ArrowLeft") go(-1);
      }}
    >
      <div className="flex h-full transition-transform duration-500 ease-out" style={{ transform: `translateX(-${i * 100}%)` }}>
        {photos.map((src, n) => (
          <img key={src + n} src={src} alt={n === 0 ? alt : `${alt}, photo ${n + 1}`} loading="lazy" onClick={onOpen} className={`h-full w-full shrink-0 object-cover ${onOpen ? "cursor-pointer" : ""}`} />
        ))}
      </div>
      {photos.length > 1 && (
        <>
          <button
            type="button"
            onClick={stop(() => go(-1))}
            aria-label="Previous photo"
            className={`absolute top-1/2 left-3 grid -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink shadow transition-opacity hover:bg-paper ${large ? "h-12 w-12" : "h-9 w-9 opacity-0 group-hover/slider:opacity-100 focus:opacity-100"}`}
          >
            <ChevronLeft size={large ? 24 : 18} />
          </button>
          <button
            type="button"
            onClick={stop(() => go(1))}
            aria-label="Next photo"
            className={`absolute top-1/2 right-3 grid -translate-y-1/2 place-items-center rounded-full bg-paper/90 text-ink shadow transition-opacity hover:bg-paper ${large ? "h-12 w-12" : "h-9 w-9 opacity-0 group-hover/slider:opacity-100 focus:opacity-100"}`}
          >
            <ChevronRight size={large ? 24 : 18} />
          </button>
          <div className="absolute inset-x-0 bottom-3 flex justify-center gap-1.5">
            {photos.map((_, n) => (
              <button
                key={n}
                type="button"
                onClick={stop(() => setI(n))}
                aria-label={`Photo ${n + 1} of ${photos.length}`}
                className={`h-2 rounded-full transition-all ${n === i ? "w-5 bg-paper" : "w-2 bg-paper/60"}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
