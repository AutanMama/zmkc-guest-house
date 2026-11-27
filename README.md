# Zenith Guest Houses

A booking site concept for the guest houses that serve patients and families of the Zenith Medical & Kidney Centre in Abuja. Guests coming for dialysis, transplant work-ups or check-ups can see every room across the seven houses, pick the exact room they want and book it directly, without going through a third-party listing site.

> This is an independent design concept prepared as a proposal. It isn't affiliated with or endorsed by Zenith Medical & Kidney Centre. Room names, rates and addresses marked as sample are placeholders until confirmed.

## What it does

- **Search** by reason for the visit, dates and guests. Long stays are discounted automatically: 10% from 7 nights, 20% from 28.
- **Three areas, seven houses:** Gudu (walking distance), the Apo road and Guzape, each house with its own reception.
- **Pick the exact room:** every room is shown by apartment or building with its name, number, price and whether it's free or occupied for the dates.
- **Book** with guest and patient details, extras (carer bed, renal-friendly meals, airport pickup) and payment by card, transfer or on arrival.
- **Confirmation** with a booking number, WhatsApp sharing and printing; **manage or cancel** a booking with its number and phone.
- **Front desk:** a view for each house's receptionist and an all-houses view for management, with tonight's occupancy, arrivals and departures, and a two-week room timeline.

## Run it

```bash
npm install
npm run dev
```

Bookings are stored in the browser for the demo, seeded with a month of sample stays.

## Stack

React 19, Vite, Tailwind CSS 4, React Router, Framer Motion, lucide-react. Newsreader and Hanken Grotesk type. Photos from Unsplash.

Design decisions are in [BRAND.md](BRAND.md).
