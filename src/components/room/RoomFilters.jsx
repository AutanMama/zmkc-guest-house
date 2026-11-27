// Filter chip shared by the house and area pages.

export function Chip({ active, onClick, children }) {
  return (
    <button
      type="button"
      aria-pressed={active}
      onClick={onClick}
      className={`rounded-full border px-4 py-2 text-sm font-bold transition-colors ${active ? "border-brand bg-brand text-white" : "border-line bg-paper text-ink hover:border-brand"}`}
    >
      {children}
    </button>
  );
}
