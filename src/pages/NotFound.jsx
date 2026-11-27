import Button from "../components/ui/Button";

export default function NotFound() {
  return (
    <main className="mx-auto max-w-3xl px-5 py-24 text-center md:px-8">
      <p className="eyebrow text-hibiscus">Page not found</p>
      <h1 className="mt-4 font-display text-5xl text-ink">We couldn't find that room.</h1>
      <p className="mt-4 text-lg text-muted">The link may be old. Our seven guest houses are all still here.</p>
      <Button to="/stays" className="mt-8">See the guest houses</Button>
    </main>
  );
}
