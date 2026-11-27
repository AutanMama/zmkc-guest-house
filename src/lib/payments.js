import { Building2, CreditCard, Landmark } from "lucide-react";

export const PAYMENT_OPTIONS = [
  { id: "card", label: "Pay now by card", note: "Visa, Mastercard or Verve through Paystack.", icon: CreditCard },
  { id: "transfer", label: "Bank transfer", note: "We'll show account details after you confirm.", icon: Landmark },
  { id: "arrival", label: "Pay on arrival", note: "We hold the room for 24 hours; pay at the front desk.", icon: Building2 },
];
