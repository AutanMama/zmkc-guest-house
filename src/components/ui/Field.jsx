const INPUT =
  "h-12 w-full rounded-lg border border-line bg-paper px-3.5 text-[15px] text-ink transition-colors placeholder:text-muted/70 focus:border-hibiscus focus:ring-3 focus:ring-hibiscus/15 focus:outline-none";

export function Field({ label, hint, children }) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-semibold text-ink">{label}</span>
      {children}
      {hint && <span className="mt-1.5 block text-sm text-muted">{hint}</span>}
    </label>
  );
}

export function Input({ className = "", ...props }) {
  return <input className={`${INPUT} ${className}`} {...props} />;
}

export function Select({ className = "", children, ...props }) {
  return (
    <select className={`${INPUT} appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2216%22 height=%2216%22 viewBox=%220 0 24 24%22 fill=%22none%22 stroke=%22%235b655f%22 stroke-width=%222%22><path d=%22m6 9 6 6 6-6%22/></svg>')] bg-[position:right_12px_center] bg-no-repeat pr-10 ${className}`} {...props}>
      {children}
    </select>
  );
}

export function Textarea({ className = "", ...props }) {
  return <textarea className={`${INPUT} h-auto py-3 ${className}`} {...props} />;
}
