import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import Logo from "./Logo";

const LINKS = [
  { to: "/areas/gudu", label: "Gudu" },
  { to: "/areas/apo", label: "Apo road" },
  { to: "/areas/guzape", label: "Guzape" },
  { to: "/manage", label: "My booking" },
];

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-page/92 backdrop-blur">
      <div className="mx-auto flex h-[72px] max-w-6xl items-center justify-between gap-6 px-5 md:px-8">
        <Logo />
        <nav className="hidden items-center gap-1 md:flex" aria-label="Main">
          {LINKS.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `rounded-full px-4 py-2 text-[15px] font-bold transition-colors ${isActive ? "bg-brand-soft text-brand" : "text-ink hover:text-brand"}`
              }
            >
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="flex items-center gap-2">
          <Link to="/stays" className="hidden h-11 items-center rounded-lg bg-brand px-5 text-[15px] font-semibold text-white transition-colors hover:bg-brand-hover sm:inline-flex">
            Book a stay
          </Link>
          <button type="button" onClick={() => setOpen((o) => !o)} className="grid h-11 w-11 place-items-center rounded-lg text-ink hover:bg-mist md:hidden" aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </div>
      {open && (
        <nav className="border-t border-line bg-page px-5 pb-5 md:hidden" aria-label="Main">
          {LINKS.map((l) => (
            <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="block border-b border-line py-4 font-display text-xl text-ink">
              {l.label}
            </Link>
          ))}
          <Link to="/stays" onClick={() => setOpen(false)} className="mt-5 flex h-12 items-center justify-center rounded-lg bg-brand font-semibold text-white">
            Book a stay
          </Link>
        </nav>
      )}
    </header>
  );
}
