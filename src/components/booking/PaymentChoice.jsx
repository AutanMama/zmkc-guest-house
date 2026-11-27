import { PAYMENT_OPTIONS } from "../../lib/payments";

export default function PaymentChoice({ value, onChange }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3" role="radiogroup" aria-label="Payment">
      {PAYMENT_OPTIONS.map(({ id, label, note, icon: Icon }) => (
        <label key={id} className={`flex cursor-pointer flex-col rounded-lg border p-4 transition-colors ${value === id ? "border-brand bg-brand-soft ring-1 ring-brand" : "border-line bg-paper hover:border-ink/30"}`}>
          <input type="radio" name="payment" value={id} checked={value === id} onChange={() => onChange(id)} className="sr-only" />
          <Icon size={22} className="text-brand" aria-hidden />
          <span className="mt-3 font-semibold text-ink">{label}</span>
          <span className="mt-1 text-sm text-muted">{note}</span>
        </label>
      ))}
    </div>
  );
}
