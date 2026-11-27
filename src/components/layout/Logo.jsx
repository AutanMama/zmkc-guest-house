import { Link } from "react-router-dom";

// The ZMKC mark, with the guest houses named beside it.
export default function Logo({ light = false }) {
  return (
    <Link to="/" className="flex items-center gap-3" aria-label="Zenith Guest Houses home">
      <span className={`grid h-12 w-12 shrink-0 place-items-center rounded-xl ${light ? "bg-paper" : ""}`}>
        <img src="/brand/zmkc-logo.webp" alt="" width="44" height="50" className="h-11 w-auto" />
      </span>
      <span className="leading-tight">
        <span className={`block font-display text-xl font-semibold tracking-tight ${light ? "text-white" : "text-ink"}`}>Zenith Guest Houses</span>
        <span className={`block text-xs font-bold tracking-[0.14em] uppercase ${light ? "text-lime" : "text-brand"}`}>by ZMKC · Abuja</span>
      </span>
    </Link>
  );
}
