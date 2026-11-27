import { Link } from "react-router-dom";

const VARIANTS = {
  primary: "bg-garden text-white hover:bg-garden-hover disabled:bg-mist disabled:text-muted",
  secondary: "border border-line bg-paper text-ink hover:border-ink/40",
  brass: "bg-brass-light text-ink hover:bg-brass-light/85",
  ghost: "text-garden hover:bg-sage-soft",
  danger: "border border-stop/30 text-stop hover:bg-stop-soft",
};

export default function Button({ to, href, variant = "primary", className = "", children, ...rest }) {
  const cls = `inline-flex h-12 items-center justify-center gap-2 rounded-lg px-5 text-[15px] font-semibold whitespace-nowrap transition-colors disabled:cursor-not-allowed ${VARIANTS[variant]} ${className}`;
  if (to) return <Link to={to} className={cls} {...rest}>{children}</Link>;
  if (href) return <a href={href} className={cls} {...rest}>{children}</a>;
  return <button type="button" className={cls} {...rest}>{children}</button>;
}
