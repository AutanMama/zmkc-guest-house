// Long stays get cheaper, because most guests are here for treatment, not a weekend.
export const LONG_STAY = [
  { nights: 28, off: 0.2, label: "Monthly rate" },
  { nights: 7, off: 0.1, label: "Weekly rate" },
];

export const ADD_ONS = {
  carerBed: { id: "carerBed", label: "Extra carer bed", price: 5000, per: "night", note: "A folding bed for a second companion." },
  meals: { id: "meals", label: "Renal-friendly meals", price: 9000, per: "night", note: "Breakfast and dinner, low in salt, prepared to your dietitian's guidance." },
  airport: { id: "airport", label: "Airport pickup", price: 25000, per: "trip", note: "A driver meets you at Nnamdi Azikiwe International Airport." },
};

export function longStayFor(nights) {
  return LONG_STAY.find((t) => nights >= t.nights) ?? null;
}

export function quote({ rate, nights, addOns = {} }) {
  const base = rate * nights;
  const tier = longStayFor(nights);
  const discount = tier ? Math.round(base * tier.off) : 0;
  const extras = Object.entries(addOns)
    .filter(([, on]) => on)
    .map(([id]) => {
      const a = ADD_ONS[id];
      return { ...a, amount: a.per === "night" ? a.price * nights : a.price };
    });
  const extrasTotal = extras.reduce((n, e) => n + e.amount, 0);
  return { rate, nights, base, tier, discount, extras, total: base - discount + extrasTotal };
}
