import { ADD_ONS } from "../../lib/pricing";
import { naira } from "../../lib/money";

export default function AddOns({ value, onChange }) {
  return (
    <ul className="space-y-3">
      {Object.values(ADD_ONS).map((a) => (
          <li key={a.id}>
            <label className={`flex cursor-pointer items-start gap-4 rounded-lg border p-4 transition-colors ${value[a.id] ? "border-brand bg-brand-soft" : "border-line bg-paper hover:border-ink/30"}`}>
              <input type="checkbox" checked={!!value[a.id]} onChange={(e) => onChange({ ...value, [a.id]: e.target.checked })} className="mt-1 h-4 w-4 accent-brand" />
              <span className="flex-1">
                <span className="flex flex-wrap items-baseline justify-between gap-2">
                  <span className="font-semibold text-ink">{a.label}</span>
                  <span className="figure text-ink">
                    {naira(a.price)} <span className="text-sm text-muted">/ {a.per}</span>
                  </span>
                </span>
                <span className="mt-0.5 block text-sm text-muted">{a.note}</span>
              </span>
            </label>
          </li>
        ))}
    </ul>
  );
}
