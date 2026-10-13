import { WHATSAPP_E164 } from "@/data/contact";
import { maisons } from "@/data/maisons";

export const OTHER = "Other";

export const brandOptions = [...maisons.map((maison) => maison.brand), OTHER];

export function modelOptions(brand: string): string[] {
  const maison = maisons.find((item) => item.brand === brand);
  if (!maison) return [];
  return [...maison.models, OTHER];
}

export type SourcingInput = {
  name: string;
  email: string;
  phone: string;
  brand: string;
  brandDetail: string;
  model: string;
  modelDetail: string;
  reference: string;
  budget: string;
  notes: string;
  company: string;
};

export type SourcingErrors = Partial<Record<keyof SourcingInput, string>>;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function validateSourcing(input: SourcingInput): SourcingErrors {
  const errors: SourcingErrors = {};
  const name = input.name.trim();
  const email = input.email.trim();
  const phone = input.phone.trim();
  const brand = input.brand.trim();
  const brandDetail = input.brandDetail.trim();
  const model = input.model.trim();
  const modelDetail = input.modelDetail.trim();
  const reference = input.reference.trim();
  const budget = input.budget.trim();
  const notes = input.notes.trim();
  const maison = maisons.find((item) => item.brand === brand);
  const otherBrand = brand === OTHER;

  if (!name) errors.name = "Enter your name.";
  else if (name.length > 120) errors.name = "Name must be 120 characters or fewer.";

  if (!phone) errors.phone = "Enter your phone number.";
  else if (phone.length > 40) errors.phone = "Phone must be 40 characters or fewer.";

  if (email && (!emailPattern.test(email) || email.length > 160))
    errors.email = "Enter a valid email address.";

  if (!brand) errors.brand = "Choose a brand.";
  else if (!otherBrand && !maison) errors.brand = "Choose a brand.";

  if (otherBrand) {
    if (!brandDetail) errors.brandDetail = "Enter the brand.";
    else if (brandDetail.length > 80)
      errors.brandDetail = "Brand must be 80 characters or fewer.";
    if (!modelDetail) errors.modelDetail = "Enter the model.";
    else if (modelDetail.length > 80)
      errors.modelDetail = "Model must be 80 characters or fewer.";
  } else if (maison) {
    if (!model) errors.model = "Choose a model.";
    else if (!maison.models.includes(model) && model !== OTHER)
      errors.model = "Choose a model for that brand.";
    else if (model === OTHER) {
      if (!modelDetail) errors.modelDetail = "Enter the model.";
      else if (modelDetail.length > 80)
        errors.modelDetail = "Model must be 80 characters or fewer.";
    }
  }

  if (reference.length > 40)
    errors.reference = "Reference must be 40 characters or fewer.";

  if (!budget) errors.budget = "Enter your budget.";
  else if (budget.length > 40)
    errors.budget = "Budget must be 40 characters or fewer.";

  if (notes.length > 1500)
    errors.notes = "Notes must be 1500 characters or fewer.";

  return errors;
}

export function sourcingWatch(input: SourcingInput): {
  brand: string;
  model: string;
} {
  const otherBrand = input.brand.trim() === OTHER;
  return {
    brand: otherBrand ? input.brandDetail.trim() : input.brand.trim(),
    model:
      otherBrand || input.model.trim() === OTHER
        ? input.modelDetail.trim()
        : input.model.trim(),
  };
}

export function sourcingMessage(input: SourcingInput): string {
  const watch = sourcingWatch(input);
  return [
    "RX8 sourcing inquiry",
    `Name: ${input.name.trim()}`,
    `Phone: ${input.phone.trim()}`,
    `Email: ${input.email.trim() || "Not provided"}`,
    `Brand: ${watch.brand}`,
    `Model: ${watch.model}`,
    `Reference: ${input.reference.trim() || "Not provided"}`,
    `Budget: ${input.budget.trim()}`,
    `Notes: ${input.notes.trim() || "None"}`,
  ].join("\n");
}

export function sourcingWhatsappUrl(input: SourcingInput): string {
  return `https://wa.me/${WHATSAPP_E164}?text=${encodeURIComponent(sourcingMessage(input))}`;
}
