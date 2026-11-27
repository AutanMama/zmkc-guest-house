import { Link } from "react-router-dom";
import { CONTACT } from "../../data/content";
import Logo from "./Logo";

const YEAR = new Date().getFullYear();

export default function SiteFooter() {
  return (
    <footer className="bg-deep text-on-deep">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-[1.4fr_1fr_1fr] md:px-8">
        <div>
          <Logo light />
          <p className="mt-5 max-w-sm leading-relaxed">Seven guest houses beside the Zenith Medical & Kidney Centre, for patients and the families who come with them.</p>
        </div>
        <div>
          <p className="eyebrow text-lime">Stay</p>
          <ul className="mt-4 space-y-2.5">
            <li><Link to="/stays" className="hover:text-white">All guest houses</Link></li>
            <li><Link to="/manage" className="hover:text-white">Manage a booking</Link></li>
            <li><Link to="/front-desk" className="hover:text-white">Front desk (staff)</Link></li>
          </ul>
        </div>
        <div>
          <p className="eyebrow text-lime">Front desk, 24 hours</p>
          <ul className="mt-4 space-y-2.5">
            <li><a href={`tel:${CONTACT.phone.replace(/\s/g, "")}`} className="hover:text-white">{CONTACT.phone}</a></li>
            <li><a href={`https://wa.me/${CONTACT.whatsapp}`} className="hover:text-white">WhatsApp us</a></li>
            <li>{CONTACT.area}</li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-5 py-5 text-center text-sm text-on-deep/80 md:px-8">© {YEAR} Zenith Guest Houses</div>
    </footer>
  );
}
