import { Building2, CreditCard, Landmark } from "lucide-react";

export const PAYMENT_OPTIONS = [
  { id: "card", label: "Pay now by card", note: "Visa, Mastercard or Verve, paid online now.", icon: CreditCard },
  { id: "transfer", label: "Bank transfer", note: "We'll show account details after you confirm.", icon: Landmark },
  { id: "arrival", label: "Pay at reception", note: "By POS or transfer when you arrive. We hold the room for 24 hours.", icon: Building2 },
];
