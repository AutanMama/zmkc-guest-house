import { useState } from "react";

export default function Gallery({ images, alt }) {
  const [main, setMain] = useState(0);
  return (
    <div className="grid gap-3 md:grid-cols-[3fr_1fr]">
      <img src={images[main]} alt={alt} className="aspect-[4/3] w-full rounded-xl object-cover md:aspect-auto md:h-[460px]" />
      <div className="grid grid-cols-4 gap-3 md:grid-cols-1">
        {images.map((src, i) => (
          <button
            key={src}
            type="button"
            onClick={() => setMain(i)}
            aria-label={`Show photo ${i + 1}`}
            aria-pressed={main === i}
            className={`overflow-hidden rounded-lg ring-offset-2 ring-offset-page transition ${main === i ? "ring-2 ring-brand" : "opacity-80 hover:opacity-100"}`}
          >
            <img src={src} alt="" className="aspect-[4/3] w-full object-cover md:h-[106px]" />
          </button>
        ))}
      </div>
    </div>
  );
}
