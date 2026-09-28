"use client";

import { useState } from "react";
import { WHATSAPP_DISPLAY, WHATSAPP_HREF } from "@/data/contact";

const links = [
  { href: "/#protect", label: "Protect" },
  { href: "/#zones", label: "Coverage" },
  { href: "/#browse", label: "Browse" },
  { href: "/pricing", label: "Pricing" },
  { href: "/qa", label: "Q&A" },
];

export function SiteNav({
  variant = "overlay",
}: {
  variant?: "overlay" | "solid";
}) {
  const [open, setOpen] = useState(false);
  const isOverlay = variant === "overlay";

  const bar = isOverlay
    ? "absolute inset-x-0 top-0 z-20"
    : "relative border-b border-line bg-bg/90 backdrop-blur-sm";

  const brand = isOverlay ? "text-white" : "text-ink";
  const link = isOverlay
    ? "text-white/70 transition-colors hover:text-white"
    : "text-ink-muted transition-colors hover:text-ink";
  const cta = isOverlay
    ? "text-white underline decoration-white/35 underline-offset-4 transition-colors hover:decoration-white"
    : "text-ink underline decoration-line underline-offset-4 transition-colors hover:decoration-ink";

  return (
    <header className={bar}>
      <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-6 md:px-10">
        <a
          href="/"
          className={`font-display text-[13px] font-semibold tracking-[0.28em] ${brand}`}
        >
          RX8 STUDIO
        </a>
        <nav className="hidden items-center gap-7 lg:flex">
          {links.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className={`text-[13px] tracking-[0.04em] ${link}`}
            >
              {item.label}
            </a>
          ))}
        </nav>
        <div className="flex items-center gap-5">
          <a
            href={WHATSAPP_HREF}
            target="_blank"
            rel="noopener noreferrer"
            className={`hidden text-[13px] tracking-[0.04em] sm:inline ${link}`}
          >
            WhatsApp
          </a>
          <a
            href="/#request"
            className={`hidden text-[13px] tracking-[0.04em] lg:inline ${cta}`}
          >
            Book a fitting
          </a>
          <button
            type="button"
            className={`text-[13px] tracking-[0.04em] lg:hidden ${link}`}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((value) => !value)}
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>
      {open ? (
        <nav
          id="mobile-nav"
          className="border-t border-line bg-bg px-6 py-8 lg:hidden md:px-10"
        >
          <ul className="flex flex-col gap-5">
            {links.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={(event) => {
                    event.preventDefault();
                    setOpen(false);
                    window.location.assign(item.href);
                  }}
                  className="text-[15px] tracking-[0.04em] text-ink"
                >
                  {item.label}
                </a>
              </li>
            ))}
            <li>
              <a
                href={WHATSAPP_HREF}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setOpen(false)}
                className="text-[15px] tracking-[0.04em] text-ink-muted"
              >
                WhatsApp {WHATSAPP_DISPLAY}
              </a>
            </li>
          </ul>
        </nav>
      ) : null}
      <span className="sr-only">WhatsApp {WHATSAPP_DISPLAY}</span>
    </header>
  );
}
