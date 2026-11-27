import { PROMISES } from "../../data/content";

export default function Promises() {
  return (
    <section className="mx-auto max-w-6xl px-5 py-20 md:px-8">
      <ol className="grid gap-10 border-t border-line pt-10 md:grid-cols-3">
        {PROMISES.map((p, i) => (
          <li key={p.title}>
            <span className="font-serif text-2xl text-brass">0{i + 1}</span>
            <h3 className="mt-3 font-serif text-2xl font-medium text-ink">{p.title}</h3>
            <p className="mt-2 leading-relaxed text-muted">{p.body}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}
