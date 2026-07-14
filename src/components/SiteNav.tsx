const links = [
  { href: "#protect", label: "Protect" },
  { href: "#browse", label: "Browse" },
  { href: "#fitting", label: "Fitting" },
  { href: "#request", label: "Contact" },
];

export function SiteNav() {
  return (
    <header className="absolute inset-x-0 top-0 z-20">
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-10">
        <a
          href="#top"
          className="font-display text-[13px] font-semibold tracking-[0.28em] text-ink"
        >
          RX8 STUDIO
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-[13px] tracking-[0.04em] text-ink-muted transition-colors hover:text-ink"
            >
              {link.label}
            </a>
          ))}
        </nav>
        <a
          href="#request"
          className="text-[13px] tracking-[0.04em] text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
        >
          Book a fitting
        </a>
      </div>
    </header>
  );
}
