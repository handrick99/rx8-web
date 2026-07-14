import { WHATSAPP_DISPLAY, WHATSAPP_HREF } from "@/data/contact";

const links = [
  { href: "/#protect", label: "Protect" },
  { href: "/#zones", label: "Coverage" },
  { href: "/#browse", label: "Browse" },
  { href: "/#proof", label: "Studio" },
  { href: "/qa", label: "Q&A" },
];

export function SiteNav({
  variant = "overlay",
}: {
  variant?: "overlay" | "solid";
}) {
  const bar =
    variant === "solid"
      ? "relative border-b border-line bg-bg/90 backdrop-blur-sm"
      : "absolute inset-x-0 top-0 z-20";

  return (
    <header className={bar}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-10">
        <a
          href="/"
          className="font-display text-[13px] font-semibold tracking-[0.28em] text-ink"
        >
          RX8 STUDIO
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
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
        <div className="flex items-center gap-5">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden text-[13px] tracking-[0.04em] text-ink-muted transition-colors hover:text-ink sm:inline"
          >
            WhatsApp
          </a>
          <a
            href="/#request"
            className="text-[13px] tracking-[0.04em] text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink"
          >
            Book a fitting
          </a>
        </div>
      </div>
      <span className="sr-only">WhatsApp {WHATSAPP_DISPLAY}</span>
    </header>
  );
}
