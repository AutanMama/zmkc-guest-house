export default function SectionTitle({ eyebrow, title, intro, light = false }) {
  return (
    <div className="max-w-2xl">
      <p className={`eyebrow ${light ? "text-brass-light" : "text-brass"}`}>{eyebrow}</p>
      <h2 className={`mt-3 font-serif text-4xl leading-[1.1] font-medium tracking-tight md:text-5xl ${light ? "text-white" : "text-ink"}`}>{title}</h2>
      {intro && <p className={`mt-4 text-lg leading-relaxed ${light ? "text-sage" : "text-muted"}`}>{intro}</p>}
    </div>
  );
}
