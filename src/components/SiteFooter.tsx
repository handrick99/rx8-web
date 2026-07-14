export function SiteFooter() {
  return (
    <footer className="border-t border-line bg-bg-soft">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="font-display text-[13px] font-semibold tracking-[0.28em]">
            RX8 STUDIO
          </p>
          <p className="mt-3 text-[13px] text-ink-muted">
            Watch protection film
          </p>
        </div>
        <div className="flex flex-wrap gap-8 text-[13px] text-ink-muted">
          <a href="#protect" className="hover:text-ink">
            Protect
          </a>
          <a href="#browse" className="hover:text-ink">
            Browse
          </a>
          <a href="#request" className="hover:text-ink">
            Fitting
          </a>
        </div>
        <p className="text-[12px] text-ink-muted">
          © {new Date().getFullYear()} RX8 Studio
        </p>
      </div>
    </footer>
  );
}
