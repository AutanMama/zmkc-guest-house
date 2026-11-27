import { units } from "../data/houses";
import { addDays, todayKey } from "./dates";
import { quote } from "./pricing";

const KEY = "zenith.bookings.v4";
const listeners = new Set();

const FIRST = ["Aisha", "Emeka", "Funke", "Musa", "Ngozi", "Tunde", "Halima", "Chidi", "Bola", "Ibrahim", "Kemi", "Yusuf"];
const LAST = ["Bello", "Okafor", "Adeyemi", "Danjuma", "Eze", "Lawal", "Okon", "Sani", "Abubakar", "Nwosu"];
const REASONS = ["dialysis", "transplant", "checkup", "visiting"];

// A believable month of bookings so availability and the front desk aren't empty.
function seed() {
  let s = 7;
  const rand = () => ((s = (s * 16807) % 2147483647) - 1) / 2147483646;
  const today = todayKey();
  const out = [];
  units.forEach((u, i) => {
    let day = -Math.floor(rand() * 10);
    while (day < 40) {
      const reason = REASONS[Math.floor(rand() * REASONS.length)];
      const nights = reason === "transplant" ? 21 + Math.floor(rand() * 20) : reason === "dialysis" ? 7 + Math.floor(rand() * 14) : 1 + Math.floor(rand() * 4);
      if (rand() < 0.72) {
        const checkIn = addDays(today, day);
        const checkOut = addDays(checkIn, nights);
        const name = `${FIRST[(i + out.length) % FIRST.length]} ${LAST[Math.floor(rand() * LAST.length)]}`;
        out.push({
          ref: `ZG-${String(4200 + out.length)}`,
          unit: u.id,
          house: u.house,
          category: u.category,
          checkIn,
          checkOut,
          guest: { name, phone: "080 0000 0000", email: "" },
          reason,
          guests: reason === "visiting" ? 1 : 2,
          payment: rand() < 0.6 ? "card" : "arrival",
          status: "confirmed",
          quote: quote({ rate: u.rate, nights }),
          room: u.no,
          createdAt: addDays(checkIn, -5),
        });
      }
      day += nights + 1 + Math.floor(rand() * 4);
    }
  });
  return out;
}

let cache;
function read() {
  if (cache) return cache;
  try {
    cache = JSON.parse(localStorage.getItem(KEY)) ?? null;
  } catch {
    cache = null;
  }
  if (!cache) {
    cache = seed();
    write(cache);
  }
  return cache;
}

function write(list) {
  cache = list;
  try {
    localStorage.setItem(KEY, JSON.stringify(list));
  } catch {
    // Storage blocked: bookings last for this visit only.
  }
  listeners.forEach((l) => l());
}

export const bookingStore = {
  subscribe(listener) {
    listeners.add(listener);
    return () => listeners.delete(listener);
  },
  getSnapshot: read,
  add(booking) {
    write([booking, ...read()]);
  },
  update(ref, patch) {
    write(read().map((b) => (b.ref === ref ? { ...b, ...patch } : b)));
  },
  nextRef() {
    const max = read().reduce((n, b) => Math.max(n, Number(b.ref.slice(3)) || 0), 4200);
    return `ZG-${max + 1}`;
  },
};
