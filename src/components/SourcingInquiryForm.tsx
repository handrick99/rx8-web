"use client";

import { FormEvent, useState } from "react";
import { submitSourcingInquiry } from "@/app/sourcing/actions";
import {
  brandOptions,
  modelOptions,
  OTHER,
  validateSourcing,
  type SourcingErrors,
  type SourcingInput,
} from "@/lib/sourcing";

const empty: SourcingInput = {
  name: "",
  email: "",
  phone: "",
  brand: "",
  brandDetail: "",
  model: "",
  modelDetail: "",
  reference: "",
  budget: "",
  notes: "",
  company: "",
};

const fieldClass =
  "field focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink";

function FieldError({ id, message }: { id: string; message?: string }) {
  if (!message) return null;
  return (
    <p id={id} role="alert" className="mt-2 text-[13px] text-ink">
      {message}
    </p>
  );
}

export function SourcingInquiryForm() {
  const [values, setValues] = useState<SourcingInput>(empty);
  const [errors, setErrors] = useState<SourcingErrors>({});
  const [formError, setFormError] = useState("");
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState("");

  function set<K extends keyof SourcingInput>(key: K, value: SourcingInput[K]) {
    setValues((current) => ({ ...current, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    const nextErrors = validateSourcing(values);
    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) return;

    setSending(true);
    try {
      const result = await submitSourcingInquiry(values);
      if (!result.ok) {
        setErrors(result.errors ?? {});
        setFormError(result.message ?? "Inquiry could not be sent. Please try again.");
        return;
      }
      setSent(true);
      setWhatsappUrl(result.whatsappUrl);
      if (result.whatsappUrl) {
        window.open(result.whatsappUrl, "_blank", "noopener,noreferrer");
      }
    } catch {
      setFormError("Inquiry could not be sent. Please try again.");
    } finally {
      setSending(false);
    }
  }

  if (sent) {
    return (
      <div className="border-t border-line pt-8">
        <p className="text-[17px] tracking-[-0.01em]">
          Inquiry received. We will reply with availability and a quote within
          two business days.
        </p>
        {whatsappUrl ? (
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex bg-cta px-7 py-3.5 text-[13px] tracking-[0.08em] text-cta-text transition-opacity hover:opacity-85 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
          >
            Send on WhatsApp
          </a>
        ) : null}
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
      <label className="block">
        <span className="text-[11px] tracking-[0.16em] text-ink-muted uppercase">
          Name
        </span>
        <input
          className={fieldClass}
          name="name"
          autoComplete="name"
          value={values.name}
          aria-invalid={Boolean(errors.name)}
          aria-describedby={errors.name ? "sourcing-name-error" : undefined}
          onChange={(event) => set("name", event.target.value)}
        />
        <FieldError id="sourcing-name-error" message={errors.name} />
      </label>

      <label className="block">
        <span className="text-[11px] tracking-[0.16em] text-ink-muted uppercase">
          Phone
        </span>
        <input
          className={fieldClass}
          name="phone"
          type="tel"
          autoComplete="tel"
          value={values.phone}
          aria-invalid={Boolean(errors.phone)}
          aria-describedby={errors.phone ? "sourcing-phone-error" : undefined}
          onChange={(event) => set("phone", event.target.value)}
        />
        <FieldError id="sourcing-phone-error" message={errors.phone} />
      </label>

      <label className="block">
        <span className="text-[11px] tracking-[0.16em] text-ink-muted uppercase">
          Email
        </span>
        <input
          className={fieldClass}
          name="email"
          type="email"
          autoComplete="email"
          value={values.email}
          aria-invalid={Boolean(errors.email)}
          aria-describedby={errors.email ? "sourcing-email-error" : undefined}
          onChange={(event) => set("email", event.target.value)}
        />
        <FieldError id="sourcing-email-error" message={errors.email} />
      </label>

      <SelectField
        label="Brand"
        name="brand"
        value={values.brand}
        options={brandOptions}
        error={errors.brand}
        onChange={(value) =>
          setValues((current) => ({
            ...current,
            brand: value,
            brandDetail: "",
            model: "",
            modelDetail: "",
          }))
        }
      />
      {values.brand === OTHER ? (
        <>
          <TextField
            label="Brand name"
            name="brandDetail"
            value={values.brandDetail}
            error={errors.brandDetail}
            onChange={(value) => set("brandDetail", value)}
          />
          <TextField
            label="Model name"
            name="modelDetail"
            value={values.modelDetail}
            error={errors.modelDetail}
            onChange={(value) => set("modelDetail", value)}
          />
        </>
      ) : (
        <SelectField
          label="Model"
          name="model"
          value={values.model}
          options={modelOptions(values.brand)}
          error={errors.model}
          disabled={!values.brand}
          onChange={(value) =>
            setValues((current) => ({
              ...current,
              model: value,
              modelDetail: "",
            }))
          }
        />
      )}
      {values.brand !== OTHER && values.model === OTHER ? (
        <TextField
          label="Model name"
          name="modelDetail"
          value={values.modelDetail}
          error={errors.modelDetail}
          onChange={(value) => set("modelDetail", value)}
        />
      ) : null}

      <TextField
        label="Reference"
        name="reference"
        value={values.reference}
        error={errors.reference}
        optional
        onChange={(value) => set("reference", value)}
      />

      <label className="block">
        <span className="text-[11px] tracking-[0.16em] text-ink-muted uppercase">
          Budget
        </span>
        <input
          className={fieldClass}
          name="budget"
          inputMode="decimal"
          value={values.budget}
          aria-invalid={Boolean(errors.budget)}
          aria-describedby={errors.budget ? "sourcing-budget-error" : undefined}
          onChange={(event) => set("budget", event.target.value)}
        />
        <FieldError id="sourcing-budget-error" message={errors.budget} />
      </label>

      <label className="block">
        <span className="text-[11px] tracking-[0.16em] text-ink-muted uppercase">
          Notes
        </span>
        <textarea
          className={`${fieldClass} min-h-[6rem] resize-y`}
          name="notes"
          value={values.notes}
          aria-invalid={Boolean(errors.notes)}
          aria-describedby={errors.notes ? "sourcing-notes-error" : undefined}
          onChange={(event) => set("notes", event.target.value)}
        />
        <FieldError id="sourcing-notes-error" message={errors.notes} />
      </label>

      <label className="absolute -left-[9999px] h-0 w-0 overflow-hidden" aria-hidden>
        Company
        <input
          tabIndex={-1}
          autoComplete="off"
          value={values.company}
          onChange={(event) => set("company", event.target.value)}
        />
      </label>

      {formError ? (
        <p role="alert" className="text-[14px] text-ink">
          {formError}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={sending}
        className="inline-flex bg-cta px-7 py-3.5 text-[13px] tracking-[0.08em] text-cta-text transition-opacity hover:opacity-85 disabled:opacity-50 focus-visible:outline focus-visible:outline-1 focus-visible:outline-offset-4 focus-visible:outline-ink"
      >
        {sending ? "Sending" : "Submit inquiry"}
      </button>
    </form>
  );
}

function TextField({
  label,
  name,
  value,
  error,
  optional = false,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  error?: string;
  optional?: boolean;
  onChange: (value: string) => void;
}) {
  const errorId = `sourcing-${name}-error`;
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.16em] text-ink-muted uppercase">
        {label}
      </span>
      {optional ? (
        <span className="ml-2 text-[11px] tracking-[0.04em] text-ink-muted">
          optional
        </span>
      ) : null}
      <input
        className={fieldClass}
        name={name}
        value={value}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      />
      <FieldError id={errorId} message={error} />
    </label>
  );
}

function SelectField({
  label,
  name,
  value,
  options,
  error,
  disabled = false,
  onChange,
}: {
  label: string;
  name: string;
  value: string;
  options: readonly string[];
  error?: string;
  disabled?: boolean;
  onChange: (value: string) => void;
}) {
  const errorId = `sourcing-${name}-error`;
  return (
    <label className="block">
      <span className="text-[11px] tracking-[0.16em] text-ink-muted uppercase">
        {label}
      </span>
      <select
        className={fieldClass}
        name={name}
        value={value}
        disabled={disabled}
        aria-invalid={Boolean(error)}
        aria-describedby={error ? errorId : undefined}
        onChange={(event) => onChange(event.target.value)}
      >
        <option value="">Select</option>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <FieldError id={errorId} message={error} />
    </label>
  );
}
