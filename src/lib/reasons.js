// Colour per reason for staying, used on the front desk timeline.
export const REASON_TONE = {
  dialysis: { bar: "bg-brand text-white", dot: "bg-brand", label: "Dialysis" },
  transplant: { bar: "bg-lime text-ink", dot: "bg-lime", label: "Transplant work-up" },
  checkup: { bar: "bg-on-deep text-ink ring-1 ring-inset ring-brand/30", dot: "bg-on-deep ring-1 ring-brand/40", label: "Check-up" },
  visiting: { bar: "bg-ink text-white", dot: "bg-ink", label: "Family or caregiver" },
  other: { bar: "bg-muted text-white", dot: "bg-muted", label: "Other guest" },
};
