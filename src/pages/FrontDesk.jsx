import { useState } from "react";
import BookingDrawer from "../components/desk/BookingDrawer";
import DeskStats from "../components/desk/DeskStats";
import Timeline from "../components/desk/Timeline";
import TodayList from "../components/desk/TodayList";
import { Select } from "../components/ui/Field";
import { houseById, houses } from "../data/houses";
import { addDays, formatLong, todayKey } from "../lib/dates";
import { REASON_TONE } from "../lib/reasons";
import { useBookings } from "../hooks/useBookings";

// What the front desk sees: tonight's numbers, who's arriving and leaving,
// and every room across all seven houses for the next two weeks.
export default function FrontDesk() {
  const bookings = useBookings();
  const [house, setHouse] = useState("all");
  const [open, setOpen] = useState(null);
  const today = todayKey();
  const tomorrow = addDays(today, 1);
  const scoped = house === "all" ? bookings : bookings.filter((b) => b.house === house);
  const active = scoped.filter((b) => b.status !== "cancelled");

  return (
    <main className="mx-auto max-w-[1400px] px-5 py-8 md:px-8 md:py-10">
      <div className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="eyebrow text-brass">{house === "all" ? "Management view · all seven houses" : `Reception · ${houseById[house].name}`}</p>
          <h1 className="mt-2 font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">{formatLong(today)}</h1>
        </div>
        <label className="w-full sm:w-64">
          <span className="sr-only">Show house</span>
          <Select value={house} onChange={(e) => setHouse(e.target.value)}>
            <option value="all">All houses (management)</option>
            {houses.map((h) => <option key={h.id} value={h.id}>{h.name} reception</option>)}
          </Select>
        </label>
      </div>

      <div className="mt-8">
        <DeskStats bookings={scoped} house={house} today={today} tomorrow={tomorrow} />
      </div>

      <div className="mt-6 grid gap-4 lg:grid-cols-2">
        <TodayList title="Arriving today" list={active.filter((b) => b.checkIn === today)} empty="No arrivals today." onOpen={setOpen} />
        <TodayList title="Leaving today" list={active.filter((b) => b.checkOut === today)} empty="No departures today." onOpen={setOpen} />
      </div>

      <div className="mt-10 flex flex-wrap items-end justify-between gap-4">
        <h2 className="font-serif text-3xl text-ink">Next two weeks</h2>
        <ul className="flex flex-wrap gap-4 text-sm text-ink">
          {Object.values(REASON_TONE).map((t) => (
            <li key={t.label} className="flex items-center gap-2"><span className={`h-2.5 w-2.5 rounded-full ${t.dot}`} aria-hidden />{t.label}</li>
          ))}
        </ul>
      </div>
      <div className="mt-4">
        <Timeline bookings={bookings} start={today} house={house} onOpen={setOpen} />
      </div>

      {open && <BookingDrawer booking={open} onClose={() => setOpen(null)} />}
    </main>
  );
}
