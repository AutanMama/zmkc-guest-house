import { useEffect, useRef } from "react";
import { X } from "lucide-react";
import BookingDetails from "../booking/BookingDetails";

export default function BookingDrawer({ booking, onClose }) {
  const ref = useRef(null);
  useEffect(() => {
    ref.current?.focus();
    const onKey = (e) => e.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex justify-end">
      <div className="absolute inset-0 bg-ink/40" onClick={onClose} aria-hidden />
      <aside role="dialog" aria-modal="true" aria-label={`Booking ${booking.ref}`} className="animate-rise relative h-full w-full max-w-md overflow-y-auto bg-paper p-6">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <h2 className="font-serif text-2xl text-ink">{booking.ref}</h2>
          <button ref={ref} type="button" onClick={onClose} className="grid h-10 w-10 place-items-center rounded-lg text-muted hover:bg-mist" aria-label="Close">
            <X size={20} />
          </button>
        </div>
        <div className="mt-5">
          <BookingDetails booking={booking} />
        </div>
      </aside>
    </div>
  );
}
