# Zenith Guest Houses

A booking site concept for the guest houses that serve patients and families of the Zenith Medical & Kidney Centre in Abuja. Guests coming for dialysis, transplant work-ups or check-ups can see every room across the seven houses, pick the exact room they want and book it directly, without going through a third-party listing site.

> This is an independent design concept prepared as a proposal. It isn't affiliated with or endorsed by Zenith Medical & Kidney Centre. Room names, rates and addresses marked as sample are placeholders until confirmed.

## What it does

- **Search** by reason for the visit, dates and guests. Stays longer than a month get 10% off every night after the first month, automatically.
- **Three areas, seven houses:** Gudu (walking distance), the Apo road and Guzape, each house with its own reception. Each area has its own page with every room across its houses, filters and sorting.
- **See every room:** each room has its own swipeable photos, name, number, price and whether it's free or occupied for the dates. Open a room for a large gallery, its features and the price for your stay.
- **Book** with guest and patient details, extras (carer bed, renal-friendly meals, airport pickup) and payment by card or transfer, or by POS or transfer at reception (cash isn't accepted).
- **Confirmation** with a booking number, WhatsApp sharing and printing; **manage or cancel** a booking with its number and phone.
- **Front desk:** a view for each house's receptionist and an all-houses view for management, with tonight's occupancy, arrivals and departures, and a two-week room timeline.

## Run it

```bash
npm install
npm run dev
```

Bookings are stored in the browser for the demo, seeded with a month of sample stays.

## Stack

React 19, Vite, Tailwind CSS 4, React Router, Framer Motion, lucide-react. Clash Display and Satoshi type (Fontshare). Photos from Unsplash.

Design decisions are in [BRAND.md](BRAND.md).
