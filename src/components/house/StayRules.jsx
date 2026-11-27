import { ChefHat, Clock, CookingPot, CreditCard, Lightbulb, ShieldAlert, Users } from "lucide-react";
import { STAY_RULES } from "../../data/content";

const ICONS = [Clock, Clock, ShieldAlert, CreditCard];

// What every guest should know before they book: times, the team, the kitchen.
export default function StayRules({ house }) {
  const items = [
    ...STAY_RULES.map((r, i) => ({ ...r, icon: ICONS[i] })),
    { title: "Never sleep without light", body: "Grid power by day. If it goes off at night, the generator runs until morning.", icon: Lightbulb },
    { title: "A team in every house", body: "Reception, housekeepers and a manager look after the house, day and night.", icon: Users },
    { title: "Cook your own meals", body: `${house.kitchenNote}. Ask reception to show you around.`, icon: CookingPot },
    ...(house.amenities.includes("restaurant") ? [{ title: "Or let the cook do it", body: "Tell the cook what you'd like and it's made for you, so you can rest.", icon: ChefHat }] : []),
  ];
  return (
    <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {items.map(({ title, body, icon: Icon }) => (
        <li key={title} className="rounded-2xl bg-paper p-5 shadow-card">
          <Icon size={22} className="text-brand" aria-hidden />
          <p className="mt-3 font-display text-lg font-semibold text-ink">{title}</p>
          <p className="mt-1 text-[15px] leading-relaxed text-muted">{body}</p>
        </li>
      ))}
    </ul>
  );
}
