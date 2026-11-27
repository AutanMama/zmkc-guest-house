import { useState } from "react";
import BookingDetails from "../components/booking/BookingDetails";
import Button from "../components/ui/Button";
import { Field, Input } from "../components/ui/Field";
import { bookingStore } from "../lib/bookings";
import { useBookings } from "../hooks/useBookings";

const digits = (s) => s.replace(/\D/g, "");

export default function ManageBooking() {
  const bookings = useBookings();
  const [form, setForm] = useState({ ref: "", phone: "" });
  const [found, setFound] = useState(null);
  const [error, setError] = useState("");
  const booking = found && bookings.find((b) => b.ref === found);

  function look(e) {
    e.preventDefault();
    const b = bookings.find((x) => x.ref.toLowerCase() === form.ref.trim().toLowerCase() && digits(x.guest.phone).endsWith(digits(form.phone).slice(-8)));
    setError(b ? "" : "We couldn't find a booking with that number and phone. Check both and try again.");
    setFound(b?.ref ?? null);
  }

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 md:px-8 md:py-16">
      <h1 className="font-serif text-4xl font-medium tracking-tight text-ink md:text-5xl">Manage your booking</h1>
      <p className="mt-3 text-lg text-muted">Find your booking with its number and the phone number you booked with.</p>
      <form onSubmit={look} className="mt-8 grid gap-4 rounded-xl border border-line bg-paper p-5 sm:grid-cols-[1fr_1fr_auto] sm:items-end">
        <Field label="Booking number"><Input value={form.ref} onChange={(e) => setForm({ ...form, ref: e.target.value })} placeholder="ZG-4300" required /></Field>
        <Field label="Phone number"><Input type="tel" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} required /></Field>
        <Button type="submit">Find booking</Button>
      </form>
      {error && <p role="alert" className="mt-4 text-stop">{error}</p>}
      {booking && (
        <div className="animate-rise mt-8 rounded-xl border border-line bg-paper p-6">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-serif text-2xl text-ink">{booking.ref}</p>
            <span className={`rounded-md px-2.5 py-1 text-sm font-semibold ${booking.status === "cancelled" ? "bg-stop-soft text-stop" : "bg-sage-soft text-garden"}`}>
              {booking.status === "cancelled" ? "Cancelled" : "Confirmed"}
            </span>
          </div>
          <div className="mt-5"><BookingDetails booking={booking} /></div>
          {booking.status !== "cancelled" && (
            <Button variant="danger" className="mt-6" onClick={() => window.confirm("Cancel this booking?") && bookingStore.update(booking.ref, { status: "cancelled" })}>
              Cancel booking
            </Button>
          )}
        </div>
      )}
    </main>
  );
}
