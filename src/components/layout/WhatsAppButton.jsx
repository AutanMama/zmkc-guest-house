import { MessageCircle } from "lucide-react";
import { CONTACT } from "../../data/content";

// Someone is always there to talk to.
export default function WhatsAppButton() {
  return (
    <a
      href={`https://wa.me/${CONTACT.whatsapp}`}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed right-5 bottom-5 z-40 flex items-center gap-2 rounded-full bg-brand py-3 pr-5 pl-4 font-bold text-white shadow-card transition-colors hover:bg-brand-hover"
    >
      <span className="relative flex h-6 w-6 items-center justify-center" aria-hidden>
        <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-lime opacity-40" />
        <MessageCircle size={22} className="relative" />
      </span>
      <span className="hidden sm:inline">Chat with reception</span>
      <span className="sm:hidden">Chat</span>
    </a>
  );
}
