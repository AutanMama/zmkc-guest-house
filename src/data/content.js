// Why people stay, and what we suggest for each kind of visit. The houses are
// for patients, their relatives and caregivers first; other guests are welcome
// when rooms are free, for a limited stay.
export const OTHER_GUEST_MAX_NIGHTS = 14;

export const STAY_REASONS = [
  {
    id: "dialysis",
    label: "Dialysis",
    note: "Sessions two or three times a week. Stay past a month and every night after is 10% off.",
    suggest: "2 to 4 weeks",
  },
  {
    id: "transplant",
    label: "Transplant work-up",
    note: "Tests, surgery and recovery can take six weeks or more. A VIP room or the VVIP apartment gives you space.",
    suggest: "4 to 8 weeks",
  },
  {
    id: "checkup",
    label: "Check-up or clinic visit",
    note: "Arrive the night before your appointment and rest before travelling home.",
    suggest: "1 to 3 nights",
  },
  {
    id: "visiting",
    label: "Family member or caregiver",
    note: "Stay near a relative who is being treated or admitted, with the centre close by.",
    suggest: "As long as they need you",
  },
  {
    id: "other",
    label: "Not here for the centre",
    note: "We welcome other guests when rooms are free. Our houses are kept for patients and their families first, so these stays are limited to two weeks.",
    suggest: "Up to 2 weeks",
  },
];

export const FAQS = [
  {
    q: "Can I stay if I'm not a patient?",
    a: "Our guest houses are for patients of the Zenith Medical & Kidney Centre and their families and caregivers first. When rooms are free we welcome other guests too, for up to two weeks, so there's always a room for a patient who needs one.",
  },
  {
    q: "How far are the guest houses from the centre?",
    a: "Guest Houses 1, 2 and 3 in Gudu are a four to six minute walk. Guest House 4 on the Apo road is about eight minutes by car, and Guest Houses 5, 6 and 7 in Guzape about fifteen, with a shuttle to your appointments.",
  },
  {
    q: "Can I choose a specific room?",
    a: "Yes. Each house shows every room with its number, price and whether it's available for your dates, so you can pick the exact room you want.",
  },
  {
    q: "Do you offer discounts for long stays?",
    a: "Yes, for stays longer than a month: after your first month, every further night is 10% off. It's applied automatically when you book a long stay, and reception applies it when you renew.",
  },
  {
    q: "Can a family member stay with the patient?",
    a: "Yes. Every room takes two guests and you can add an extra carer bed. For a whole family, Guest House 2 has a large VVIP apartment with two beds and its own kitchen.",
  },
  {
    q: "What time is check-out?",
    a: "12 noon. Your night runs until 12 noon the next day, whatever time you checked in, even late at night. We allow an extra hour until 1pm; after that a late check-out charge applies unless you renew.",
  },
  {
    q: "Is there light all the time?",
    a: "During the day we run on grid power. If it goes off at night, the generator runs until morning, so you'll never sleep without light.",
  },
  {
    q: "Can I cook, or order food?",
    a: "Every guest house has a kitchen where you can cook your own meals; reception will show you around. In our Guzape houses there's also a cook: tell them what you'd like and they'll make it for you.",
  },
  {
    q: "How do I pay?",
    a: "By card or bank transfer when you book, or at reception by POS or transfer when you arrive. Cash isn't accepted at any of our houses. If you pay at reception, we hold your room for 24 hours.",
  },
];

export const STAY_RULES = [
  { title: "Check in any time", body: "Day or night, reception is open. Your night runs until 12 noon the next day, whatever time you arrive." },
  { title: "Check out by 12 noon", body: "We allow one extra hour, until 1pm. After that, a late check-out charge applies, or you can renew for another night." },
  { title: "Look after the house", body: "Anything broken or damaged in your room, bathroom or the kitchen is charged at cost." },
  { title: "No cash, please", body: "Pay by transfer or POS. Cash isn't accepted at any of our houses." },
];

export const CONTACT = {
  phone: "0800 000 0000",
  whatsapp: "2348000000000",
  email: "stays@zenith-guesthouses.example",
  area: "Gudu District, Abuja",
};
