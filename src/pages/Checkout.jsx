import { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { ArrowLeft, Lock } from "lucide-react";
import AddOns from "../components/booking/AddOns";
import PaymentChoice from "../components/booking/PaymentChoice";
import QuoteLines from "../components/booking/QuoteLines";
import { Field, Input, Select, Textarea } from "../components/ui/Field";
import TravelBadge from "../components/ui/TravelBadge";
import { OTHER_GUEST_MAX_NIGHTS, STAY_REASONS } from "../data/content";
import { houseById, unitById } from "../data/houses";
import { CATEGORIES } from "../data/rooms";
import { isUnitAvailable } from "../lib/availability";
import { bookingStore } from "../lib/bookings";
import { formatLong, todayKey } from "../lib/dates";
import { quote } from "../lib/pricing";
import { roomDetail } from "../lib/roomLabel";
import { useBookings } from "../hooks/useBookings";
import { searchQuery, useStaySearch } from "../hooks/useStaySearch";
import NotFound from "./NotFound";

function Step({ n, title, children }) {
  return (
    <section className="border-t border-line pt-8">
      <h2 className="flex items-baseline gap-3 font-display text-2xl text-ink">
        <span className="text-brand">{n}</span> {title}
      </h2>
      <div className="mt-5">{children}</div>
    </section>
  );
}

export default function Checkout() {
  const [params] = useSearchParams();
  const [search] = useStaySearch();
  const navigate = useNavigate();
  const bookings = useBookings();
  const house = houseById[params.get("house")];
  const room = house ? unitById[`${house.id}-${params.get("room")}`] : null;

  const [guest, setGuest] = useState({ name: "", phone: "", email: "", patient: "", hospitalNo: "", notes: "" });
  const [reason, setReason] = useState(search.reason);
  const [addOns, setAddOns] = useState({});
  const [payment, setPayment] = useState("card");
  const [error, setError] = useState("");

  if (!house || !room) return <NotFound />;
  const category = CATEGORIES[room.category];
  const q = quote({ rate: room.rate, nights: search.nights, addOns });
  const set = (k) => (e) => setGuest((g) => ({ ...g, [k]: e.target.value }));

  const overLimit = reason === "other" && search.nights > OTHER_GUEST_MAX_NIGHTS;

  function confirm(e) {
    e.preventDefault();
    if (overLimit) {
      setError(`Guests who aren't here for the centre can stay up to ${OTHER_GUEST_MAX_NIGHTS} nights, so rooms stay free for patients. Please shorten your stay.`);
      return;
    }
    if (!isUnitAvailable(room.id, search.checkIn, search.checkOut, bookings)) {
      setError(`${room.name} has just been booked for these dates. Please go back and choose another room.`);
      return;
    }
    const ref = bookingStore.nextRef();
    bookingStore.add({
      ref,
      unit: room.id,
      house: house.id,
      room: room.no,
      category: room.category,
      checkIn: search.checkIn,
      checkOut: search.checkOut,
      guests: search.guests,
      reason,
      guest,
      addOns,
      payment,
      status: "confirmed",
      quote: q,
      createdAt: todayKey(),
    });
    navigate(`/booking/${ref}`);
  }

  return (
    <main className="mx-auto max-w-6xl px-5 py-8 md:px-8 md:py-12">
      <Link to={`/stays/${house.id}?${searchQuery(search)}`} className="inline-flex items-center gap-2 text-[15px] font-medium text-muted hover:text-ink">
        <ArrowLeft size={17} aria-hidden /> Back to {house.name}
      </Link>
      <h1 className="mt-5 font-display text-4xl font-medium tracking-tight text-ink md:text-5xl">Book your stay</h1>

      <form onSubmit={confirm} className="mt-10 grid gap-12 lg:grid-cols-[1fr_380px]">
        <div className="space-y-10">
          <Step n="1" title="Your details">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Full name"><Input value={guest.name} onChange={set("name")} autoComplete="name" required /></Field>
              <Field label="Phone number" hint="We'll send your booking by SMS and WhatsApp."><Input type="tel" value={guest.phone} onChange={set("phone")} autoComplete="tel" placeholder="0803 000 0000" required /></Field>
              <Field label="Email (optional)"><Input type="email" value={guest.email} onChange={set("email")} autoComplete="email" /></Field>
            </div>
          </Step>

          <Step n="2" title="About the visit">
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Reason for your stay">
                <Select value={reason} onChange={(e) => setReason(e.target.value)}>
                  {STAY_REASONS.map((r) => <option key={r.id} value={r.id}>{r.label}</option>)}
                </Select>
                {reason === "other" && (
                  <span className={`mt-1.5 block text-sm ${overLimit ? "font-semibold text-alert" : "text-muted"}`}>
                    Our houses are for patients and their families first; other guests can stay up to {OTHER_GUEST_MAX_NIGHTS} nights.
                  </span>
                )}
              </Field>
              <Field label="Patient's name" hint="Leave blank if it's you."><Input value={guest.patient} onChange={set("patient")} /></Field>
              <Field label="Hospital number (optional)" hint="Helps us line up shuttle times with appointments."><Input value={guest.hospitalNo} onChange={set("hospitalNo")} /></Field>
              <Field label="Anything we should know?"><Textarea rows={2} value={guest.notes} onChange={set("notes")} placeholder="Wheelchair, diet, late arrival…" /></Field>
            </div>
          </Step>

          <Step n="3" title="Extras">
            <AddOns value={addOns} onChange={setAddOns} />
          </Step>

          <Step n="4" title="Payment">
            <PaymentChoice value={payment} onChange={setPayment} />
          </Step>
        </div>

        <aside className="lg:sticky lg:top-24 lg:self-start">
          <div className="overflow-hidden rounded-xl border border-line bg-paper shadow-card">
            <img src={category.image} alt={category.name} className="aspect-[16/9] w-full object-cover" />
            <div className="p-6">
              <p className="eyebrow text-brand">{house.name} · {category.name}</p>
              <p className="mt-2 font-display text-2xl text-ink">{room.name}</p>
              <p className="text-[15px] text-ink">{roomDetail(room, { withSize: true })}</p>
              <div className="mt-1"><TravelBadge travel={house.travel} /></div>
              <p className="mt-4 text-[15px] text-ink">
                {formatLong(search.checkIn)} → {formatLong(search.checkOut)}
                <span className="block text-muted">{search.guests} {search.guests === 1 ? "guest" : "guests"} · check-in any time · check-out by 12 noon</span>
              </p>
              <div className="mt-5"><QuoteLines quote={q} /></div>
              {error && <p role="alert" className="mt-4 rounded-lg bg-stop-soft p-3 text-sm text-stop">{error}</p>}
              <button type="submit" className="mt-6 h-12 w-full rounded-lg bg-brand text-[15px] font-semibold text-white transition-colors hover:bg-brand-hover">
                {payment === "card" ? "Confirm and pay" : "Confirm booking"}
              </button>
              <p className="mt-3 flex items-center justify-center gap-1.5 text-sm text-muted"><Lock size={14} aria-hidden /> Cancel at no charge up to 48 hours before</p>
            </div>
          </div>
        </aside>
      </form>
    </main>
  );
}
