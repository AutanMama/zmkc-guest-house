import { useEffect, useRef, useState } from "react";
import { animate, useInView } from "framer-motion";
import { houses, units } from "../../data/houses";

function Counter({ to }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  useEffect(() => {
    if (!inView) return;
    const controls = animate(0, to, { duration: 1.4, ease: "easeOut", onUpdate: (v) => setN(Math.round(v)) });
    return () => controls.stop();
  }, [inView, to]);
  return <span ref={ref}>{n}</span>;
}

export default function Stats() {
  const stats = [
    { value: houses.length, label: "guest houses, each with its own reception" },
    { value: units.length, label: "rooms, from singles to VIP suites" },
    { value: 4, label: "minutes' walk from Guest House 1 to the centre" },
  ];
  return (
    <section className="mx-auto max-w-6xl px-5 py-16 md:px-8">
      <ul className="grid gap-6 sm:grid-cols-3">
        {stats.map((s) => (
          <li key={s.label} className="border-l-4 border-lime pl-5">
            <p className="font-display text-6xl leading-none font-semibold text-brand md:text-7xl">
              <Counter to={s.value} />
            </p>
            <p className="mt-2 max-w-[15rem] text-[15px] font-semibold text-muted">{s.label}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
