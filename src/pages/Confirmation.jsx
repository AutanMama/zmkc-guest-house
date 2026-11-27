import { useParams } from "react-router-dom";
import { CheckCircle2, MessageCircle, Printer } from "lucide-react";
import BookingDetails from "../components/booking/BookingDetails";
import Button from "../components/ui/Button";
import { houseById, travelText } from "../data/houses";
import { formatLong } from "../lib/dates";
import { naira } from "../lib/money";
import { useBookings } from "../hooks/useBookings";
import NotFound from "./NotFound";

export default function Confirmation() {
  const { ref } = useParams();
  const booking = useBookings().find((b) => b.ref === ref);
  if (!booking) return <NotFound />;
  const house = houseById[booking.house];
  const share = encodeURIComponent(
    `My Zenith booking ${booking.ref}: ${house.name}, ${booking.roomName ?? `Room ${booking.room}`}, ${formatLong(booking.checkIn)} to ${formatLong(booking.checkOut)}.`
  );

  return (
    <main className="mx-auto max-w-3xl px-5 py-10 md:px-8 md:py-16">
      <div className="animate-rise rounded-2xl border border-line bg-paper p-6 shadow-card md:p-10">
        <CheckCircle2 size={40} className="text-ok" aria-hidden />
        <p className="eyebrow mt-5 text-brand">Booking {booking.ref}</p>
        <h1 className="mt-2 font-display text-4xl leading-tight font-medium text-ink md:text-5xl">Your room is ready for you.</h1>
        <p className="mt-3 text-lg text-muted">
          We've sent the details to {booking.guest.phone}. Show your booking number at the reception of {house.name}.
        </p>

        {booking.payment === "transfer" && (
          <div className="mt-6 rounded-lg border border-lime bg-warn-soft p-4 text-[15px] text-ink">
            <p className="font-semibold">Pay {naira(booking.quote.total)} by bank transfer</p>
            <p className="mt-1 text-muted">Account details are sent with your SMS. Use {booking.ref} as the payment reference.</p>
          </div>
        )}

        <div className="mt-8">
          <BookingDetails booking={booking} />
        </div>

        <div className="mt-8 rounded-lg bg-brand-soft p-5 text-[15px] leading-relaxed text-ink">
          <p className="font-semibold">On the day</p>
          <p className="mt-1">
            The reception at {house.name} is open 24 hours. It's a {travelText(house.travel)}
            {house.amenities.includes("shuttle") ? ", and the shuttle takes you to your appointments." : "."}
          </p>
        </div>

        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={`https://wa.me/?text=${share}`} target="_blank" rel="noopener noreferrer">
            <MessageCircle size={18} aria-hidden /> Share on WhatsApp
          </Button>
          <Button variant="secondary" onClick={() => window.print()}>
            <Printer size={18} aria-hidden /> Print
          </Button>
          <Button variant="ghost" to="/">Back to home</Button>
        </div>
      </div>
    </main>
  );
}
