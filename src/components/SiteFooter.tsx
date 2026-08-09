import {
  EMAIL,
  EMAIL_HREF,
  WHATSAPP_DISPLAY,
  WHATSAPP_HREF,
} from "@/data/contact";

export function SiteFooter() {
  return (
    <footer className="bg-bg-soft">
      <div className="mx-auto flex max-w-[1400px] flex-col gap-10 px-6 py-14 md:px-10">
        <div className="flex flex-col gap-8 md:flex-row md:items-end md:justify-between">
          <div>
            <p className="font-display text-[13px] font-semibold tracking-[0.28em]">
              RX8 STUDIO
            </p>
            <p className="mt-3 text-[13px] text-ink-muted">
              Watch protection film
            </p>
          </div>
          <div className="flex flex-wrap gap-x-8 gap-y-3 text-[13px] text-ink-muted">
            <a href="/#protect" className="hover:text-ink">
              Protect
            </a>
            <a href="/#zones" className="hover:text-ink">
              Coverage
            </a>
            <a href="/#browse" className="hover:text-ink">
              Browse
            </a>
            <a href="/qa" className="hover:text-ink">
              Q&A
            </a>
            <a href="/#request" className="hover:text-ink">
              Fitting
            </a>
            <a
              href={WHATSAPP_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-ink"
            >
              WhatsApp {WHATSAPP_DISPLAY}
            </a>
            <a href={EMAIL_HREF} className="hover:text-ink">
              {EMAIL}
            </a>
          </div>
        </div>
        <p className="text-[12px] text-ink-muted">
          © {new Date().getFullYear()} RX8 Studio
        </p>
      </div>
    </footer>
  );
}
