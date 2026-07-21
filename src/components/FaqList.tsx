"use client";

import { useState } from "react";
import { faqItems } from "@/data/faq";

export function FaqList() {
  const [open, setOpen] = useState<number | null>(null);

  return (
    <div className="border-t border-line">
      {faqItems.map((item, i) => {
        const isOpen = open === i;
        return (
          <div key={item.question} className="border-b border-line">
            <button
              type="button"
              aria-expanded={isOpen}
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-start justify-between gap-6 py-6 text-left transition-colors hover:text-ink"
            >
              <span className="max-w-[40ch] text-[17px] font-medium tracking-[-0.015em] text-ink md:text-[18px]">
                {item.question}
              </span>
              <span
                className="mt-1 shrink-0 text-[12px] tracking-[0.12em] text-ink-muted"
                aria-hidden
              >
                {isOpen ? "—" : "+"}
              </span>
            </button>
            <div
              className="grid transition-[grid-template-rows] duration-300 ease-out"
              style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
            >
              <div className="overflow-hidden">
                <p className="max-w-[52ch] pb-7 text-[15px] leading-relaxed text-ink-muted">
                  {item.answer}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
