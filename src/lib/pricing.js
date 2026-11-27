// After a month, every further night is 10% off: the first 30 nights are full
// price, the rest of a long stay is discounted. There's no weekly discount.
export const MONTH = 30;
export const MONTHLY_OFF = 0.1;

export const ADD_ONS = {
  carerBed: { id: "carerBed", label: "Extra carer bed", price: 5000, per: "night", note: "A folding bed for a second companion." },
  meals: { id: "meals", label: "Renal-friendly meals", price: 9000, per: "night", note: "Breakfast and dinner, low in salt, prepared to your dietitian's guidance." },
  airport: { id: "airport", label: "Airport pickup", price: 25000, per: "trip", note: "A driver meets you at Nnamdi Azikiwe International Airport." },
};

export function longStayFor(nights) {
  if (nights <= MONTH) return null;
  const discounted = nights - MONTH;
  return { off: MONTHLY_OFF, nights: discounted, label: `10% off ${discounted} ${discounted === 1 ? "night" : "nights"} after the first month` };
}

export function quote({ rate, nights, addOns = {} }) {
  const base = rate * nights;
  const tier = longStayFor(nights);
  const discount = tier ? Math.round(rate * tier.nights * tier.off) : 0;
  const extras = Object.entries(addOns)
    .filter(([, on]) => on)
    .map(([id]) => {
      const a = ADD_ONS[id];
      return { ...a, amount: a.per === "night" ? a.price * nights : a.price };
    });
  const extrasTotal = extras.reduce((n, e) => n + e.amount, 0);
  return { rate, nights, base, tier, discount, extras, total: base - discount + extrasTotal };
}
