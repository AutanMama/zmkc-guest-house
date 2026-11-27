import { naira } from "../../lib/money";

// The price breakdown, used in the house page summary, checkout and the receipt.
export default function QuoteLines({ quote }) {
  const { rate, nights, base, tier, discount, extras, total } = quote;
  return (
    <dl className="space-y-2 text-[15px]">
      <div className="flex justify-between gap-4">
        <dt className="text-muted">
          {naira(rate)} × {nights} {nights === 1 ? "night" : "nights"}
        </dt>
        <dd className="figure text-ink">{naira(base)}</dd>
      </div>
      {tier && (
        <div className="flex justify-between gap-4 text-garden">
          <dt>
            {tier.label} ({Math.round(tier.off * 100)}% off)
          </dt>
          <dd className="figure">−{naira(discount)}</dd>
        </div>
      )}
      {extras.map((e) => (
        <div key={e.id} className="flex justify-between gap-4">
          <dt className="text-muted">{e.label}</dt>
          <dd className="figure text-ink">{naira(e.amount)}</dd>
        </div>
      ))}
      <div className="flex items-baseline justify-between gap-4 border-t border-line pt-3">
        <dt className="font-semibold text-ink">Total</dt>
        <dd className="figure font-serif text-3xl text-ink">{naira(total)}</dd>
      </div>
    </dl>
  );
}
