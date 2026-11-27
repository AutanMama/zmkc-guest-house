import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { CalendarDays, HeartPulse, Search, Users } from "lucide-react";
import { STAY_REASONS } from "../../data/content";
import { addDays, nightsBetween, todayKey } from "../../lib/dates";
import { longStayFor } from "../../lib/pricing";
import { searchQuery } from "../../hooks/useStaySearch";

const CONTROL = "w-full bg-transparent text-[15px] font-semibold text-ink outline-none";

function Cell({ icon: Icon, label, children }) {
  return (
    <label className="flex min-w-0 flex-1 cursor-pointer items-center gap-3 rounded-xl bg-page px-4 py-2.5 transition-colors focus-within:bg-blush-soft hover:bg-blush-soft">
      <Icon size={20} className="shrink-0 text-hibiscus" aria-hidden />
      <span className="min-w-0 flex-1">
        <span className="block text-xs font-bold tracking-[0.08em] text-muted uppercase">{label}</span>
        {children}
      </span>
    </label>
  );
}

// Reason, dates and guests. On the home page it navigates to results;
// elsewhere it updates the search in place.
export default function SearchBar({ initial, onSearch, onDark = false, narrow = false }) {
  const navigate = useNavigate();
  const today = todayKey();
  const [form, setForm] = useState(initial ?? { reason: "dialysis", checkIn: addDays(today, 1), checkOut: addDays(today, 15), guests: 2 });
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
    <form onSubmit={submit} role="search" aria-label="Find a room">
      <div className={`grid gap-2 rounded-2xl bg-paper p-2 shadow-card sm:grid-cols-2 ${narrow ? "" : "lg:flex"}`}>
        <Cell icon={HeartPulse} label="Reason">
          <select value={form.reason} onChange={set("reason")} className={`${CONTROL} appearance-none`}>
            {STAY_REASONS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
          </select>
        </Cell>
        <Cell icon={CalendarDays} label="Check-in">
          <input type="date" value={form.checkIn} min={today} onChange={setCheckIn} required className={CONTROL} />
        </Cell>
        <Cell icon={CalendarDays} label="Check-out">
          <input type="date" value={form.checkOut} min={addDays(form.checkIn, 1)} onChange={set("checkOut")} required className={CONTROL} />
        </Cell>
        <Cell icon={Users} label="Guests">
          <select value={form.guests} onChange={set("guests")} className={`${CONTROL} appearance-none`}>
            {[1, 2, 3, 4].map((n) => <option key={n} value={n}>{n} {n === 1 ? "guest" : "guests"}</option>)}
          </select>
        </Cell>
        <button type="submit" className={`flex items-center justify-center gap-2 rounded-xl bg-hibiscus px-7 py-4 text-base font-bold text-white transition-colors hover:bg-hibiscus-hover sm:col-span-2 ${narrow ? "" : "lg:col-span-1"}`}>
          <Search size={19} aria-hidden /> {onSearch ? "Update" : "Find a room"}
        </button>
      </div>
      <p className={`mt-3 text-[15px] ${onDark ? "text-white/85" : "text-muted"}`} aria-live="polite">
        {nights} {nights === 1 ? "night" : "nights"}
        {tier ? (
          <span className={`ml-2 font-bold ${onDark ? "text-mango" : "text-hibiscus"}`}>· {tier.label}: {Math.round(tier.off * 100)}% off</span>
        ) : (
          <span className="ml-2">· Stay 7 nights or more for 10% off</span>
        )}
      </p>
    </form>
  );
}
