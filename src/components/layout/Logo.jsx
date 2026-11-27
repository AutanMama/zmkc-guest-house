import { Link } from "react-router-dom";

// A roof over a door, with a hibiscus arc for the sun rising over the hibiscus.
export function Mark({ className = "h-9 w-9" }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden>
      <rect width="40" height="40" rx="10" className="fill-hibiscus" />
      <path d="M11 29V19l9-7 9 7v10" fill="none" stroke="#fff" strokeWidth="2.6" strokeLinejoin="round" />
      <path d="M20 29v-6" className="stroke-mango" strokeWidth="2.6" strokeLinecap="round" />
      <path d="M15 12.5c2-4 8-4 10 0" fill="none" className="stroke-mango" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
}

export default function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Zenith Guest Houses home">
      <Mark />
      <span className="leading-tight">
        <span className={`block font-display text-xl font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>Zenith</span>
        <span className={`block text-xs font-semibold tracking-[0.16em] uppercase ${light ? "text-mango" : "text-hibiscus"}`}>Guest Houses</span>
      </span>
    </Link>
  );
}
