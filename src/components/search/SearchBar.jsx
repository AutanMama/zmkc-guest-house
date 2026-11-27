import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { STAY_REASONS } from "../../data/content";
import { addDays, nightsBetween, todayKey } from "../../lib/dates";
import { longStayFor } from "../../lib/pricing";
import { searchQuery } from "../../hooks/useStaySearch";
import { Input, Select } from "../ui/Field";

function Cell({ label, children, className = "" }) {
  return (
    <label className={`block min-w-0 ${className}`}>
      <span className="mb-1.5 block text-xs font-semibold tracking-[0.08em] text-muted uppercase">{label}</span>
      {children}
    </label>
  );
}

// Reason, dates and guests. On the home page it navigates to results;
// on the results page it updates the search in place.
export default function SearchBar({ initial, onSearch, compact = false, narrow = false }) {
  const navigate = useNavigate();
  const today = todayKey();
  const [form, setForm] = useState(
    initial ?? { reason: "dialysis", checkIn: addDays(today, 1), checkOut: addDays(today, 15), guests: 2 }
  );
  const nights = Math.max(0, nightsBetween(form.checkIn, form.checkOut));
  const tier = longStayFor(nights);
  const set = (key) => (e) => setForm((f) => ({ ...f, [key]: key === "guests" ? Number(e.target.value) : e.target.value }));

  function setCheckIn(e) {
    const checkIn = e.target.value;
    setForm((f) => ({ ...f, checkIn, checkOut: f.checkOut <= checkIn ? addDays(checkIn, 1) : f.checkOut }));
  }

  function submit(e) {
    e.preventDefault();
    if (onSearch) onSearch(form);
    else navigate(`/stays?${searchQuery(form)}`);
  }

  return (
    <form onSubmit={submit} className={`rounded-xl border border-line bg-paper p-4 shadow-card ${compact ? "" : "md:p-5"}`} role="search" aria-label="Find a room">
      <div className={`grid gap-3 sm:grid-cols-2 ${narrow ? "md:grid-cols-4 md:items-end" : "lg:grid-cols-[1.3fr_1fr_1fr_0.8fr_auto] lg:items-end"}`}>
        <Cell label="Reason for your stay">
          <Select value={form.reason} onChange={set("reason")}>
            {STAY_REASONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.label}
              </option>
            ))}
          </Select>
        </Cell>
        <Cell label="Check-in">
          <Input type="date" value={form.checkIn} min={today} onChange={setCheckIn} required />
        </Cell>
        <Cell label="Check-out">
          <Input type="date" value={form.checkOut} min={addDays(form.checkIn, 1)} onChange={set("checkOut")} required />
        </Cell>
        <Cell label="Guests">
          <Select value={form.guests} onChange={set("guests")}>
            {[1, 2, 3, 4].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? "guest" : "guests"}
              </option>
            ))}
          </Select>
        </Cell>
        <button type="submit" className={`inline-flex h-12 items-center justify-center gap-2 rounded-lg bg-garden px-6 text-[15px] font-semibold text-white transition-colors hover:bg-garden-hover sm:col-span-2 ${narrow ? "md:col-span-4" : "lg:col-span-1"}`}>
          <Search size={18} aria-hidden /> {compact ? "Update" : "Find a room"}
        </button>
      </div>
      <p className="mt-3 text-sm text-muted" aria-live="polite">
        {nights} {nights === 1 ? "night" : "nights"}
        {tier ? (
          <span className="ml-2 font-semibold text-garden">· {tier.label} applies: {Math.round(tier.off * 100)}% off</span>
        ) : (
          <span className="ml-2">· Stay 7 nights or more for 10% off</span>
        )}
      </p>
    </form>
  );
}
