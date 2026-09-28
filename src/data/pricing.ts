export type PricingItem = {
  label: string;
  size: string | null;
  price: number | string;
};

export type PricingFamily = {
  name: string;
  items: PricingItem[];
};

export type PricingBrand = {
  brand: string;
  families: PricingFamily[];
};

export type PricingExtra = {
  label: string;
  price: string;
};

export const pricingIntro =
  "Find your reference below. All prices include professional installation and a one-year warranty.";

export const pricingNote =
  "Don't see your watch? Our catalogue covers over 700 references across 26 brands. Get in touch and we'll confirm availability and pricing for your reference.";

export const pricingFilm =
  "All film is S Series dual-finish — gloss on polished surfaces, matte on brushed — so your watch looks exactly as it did. Fully reversible. Self-healing. One-year warranty.";

export const pricingBrands: PricingBrand[] = [
  {
    brand: 'Rolex',
    families: [
      {
        name: 'Submariner',
        items: [
          { label: '16610', size: '40mm', price: 395 },
          { label: '116610', size: '40mm', price: 395 },
          { label: '116613 two-tone', size: '40mm', price: 395 },
          { label: '116618', size: '40mm', price: 395 },
          { label: '126610', size: '41mm', price: 395 },
          { label: '126613 two-tone', size: '41mm', price: 395 },
          { label: '126618', size: '41mm', price: 395 },
        ],
      },
      {
        name: 'Sea-Dweller',
        items: [
          { label: '16600', size: '40mm', price: 395 },
          { label: '116600', size: '40mm', price: 395 },
          { label: '126600', size: '43mm', price: 395 },
          { label: '126603 two-tone', size: '43mm', price: 395 },
        ],
      },
      {
        name: 'Deepsea',
        items: [
          { label: '116660', size: '44mm', price: 395 },
          { label: '126660', size: '44mm', price: 395 },
          { label: '136660', size: '44mm', price: 395 },
          { label: 'Deepsea Challenge 126067', size: '50mm', price: 395 },
        ],
      },
      {
        name: 'Daytona',
        items: [
          { label: '16523', size: '40mm', price: 395 },
          { label: '16528', size: '40mm', price: 395 },
          { label: '116500LN', size: '40mm', price: 395 },
          { label: '116509', size: '40mm', price: 395 },
          { label: '116518LN — Oysterflex', size: '40mm', price: 330 },
          { label: '116520', size: '40mm', price: 395 },
          { label: '126500 / 126503 / 126505', size: '40mm', price: 395 },
          { label: '126506 / 126508', size: '40mm', price: 395 },
          { label: '126515LN — Oysterflex', size: '40mm', price: 330 },
        ],
      },
      {
        name: 'GMT-Master II',
        items: [
          { label: '16710', size: '40mm', price: 395 },
          { label: '16713 — Jubilee', size: '40mm', price: 465 },
          { label: '116710 — Oyster', size: '40mm', price: 395 },
          { label: '126710 — Oyster', size: '40mm', price: 395 },
          { label: '126710 — Jubilee', size: '40mm', price: 465 },
          { label: '126710 — case & bezel only', size: '40mm', price: 300 },
        ],
      },
      {
        name: 'Yacht-Master',
        items: [
          { label: '169622', size: '29mm', price: 395 },
          { label: '169623', size: '29mm', price: 395 },
          { label: '268621', size: '37mm', price: 395 },
          { label: '268655 — Oysterflex', size: '37mm', price: 330 },
          { label: '116655 — Oysterflex', size: '40mm', price: 330 },
          { label: '126621', size: '40mm', price: 395 },
          { label: '126655 — Oysterflex', size: '40mm', price: 330 },
          { label: '226627', size: '42mm', price: 395 },
          { label: '226658 — Oysterflex', size: '42mm', price: 330 },
          { label: '116680', size: '44mm', price: 395 },
          { label: '116681 two-tone', size: '44mm', price: 395 },
          { label: '126680', size: '44mm', price: 395 },
        ],
      },
      {
        name: 'Explorer',
        items: [
          { label: '124270', size: '36mm', price: 395 },
          { label: '124273 two-tone', size: '36mm', price: 395 },
          { label: '214270', size: '39mm', price: 395 },
          { label: '224270', size: '40mm', price: 395 },
        ],
      },
      {
        name: 'Explorer II',
        items: [
          { label: '16570', size: '40mm', price: 395 },
          { label: '216570', size: '42mm', price: 395 },
          { label: '226570', size: '42mm', price: 395 },
        ],
      },
      {
        name: 'Air-King',
        items: [
          { label: '14000M', size: '34mm', price: 395 },
          { label: '116900', size: '40mm', price: 395 },
          { label: '126900', size: '40mm', price: 395 },
        ],
      },
      {
        name: 'Milgauss',
        items: [
          { label: '116400GV', size: '40mm', price: 395 },
        ],
      },
      {
        name: 'Datejust',
        items: [
          { label: '1601 — Jubilee', size: '36mm', price: 465 },
          { label: '16203 — Oyster', size: '36mm', price: 395 },
          { label: '16233 — Jubilee', size: '36mm', price: 465 },
          { label: '68273 — Jubilee', size: '31mm', price: 465 },
          { label: '68278 — Jubilee', size: '31mm', price: 465 },
          { label: '69178 — Jubilee', size: '26–27mm', price: 465 },
          { label: '116234 — Jubilee', size: '36mm', price: 465 },
          { label: '116264 — Oyster', size: '36mm', price: 395 },
          { label: '116334 — Oyster', size: '41mm', price: 395 },
          { label: '126234 — Oyster', size: '36mm', price: 395 },
          { label: '126234 — Jubilee', size: '36mm', price: 465 },
          { label: '126234 — case & bezel only', size: '36mm', price: 300 },
          { label: '126334 — Oyster', size: '41mm', price: 395 },
          { label: '126334 — Jubilee', size: '41mm', price: 465 },
          { label: '126334 — case & bezel only', size: '41mm', price: 300 },
          { label: '179161', size: '26mm', price: 395 },
          { label: '278240 — Jubilee', size: '31mm', price: 465 },
          { label: '278241', size: '31mm', price: 395 },
          { label: '278271', size: '31mm', price: 395 },
          { label: '278274 — Jubilee', size: '31mm', price: 465 },
          { label: '278275 — Jubilee', size: '31mm', price: 465 },
          { label: '278285RBR — Jubilee', size: '31mm', price: 465 },
          { label: '279171', size: '28mm', price: 395 },
          { label: '279174 — Jubilee', size: '28mm', price: 465 },
          { label: '279178 — Jubilee', size: '28mm', price: 465 },
          { label: '279381RBR — Jubilee', size: '28mm', price: 465 },
        ],
      },
      {
        name: 'Sky-Dweller',
        items: [
          { label: '326235 — Oysterflex', size: '42mm', price: 330 },
          { label: '336238 — Oysterflex', size: '42mm', price: 330 },
          { label: '326934 — Oyster', size: '42mm', price: 395 },
          { label: '326935 — Oyster', size: '42mm', price: 395 },
          { label: '336934 — Oyster', size: '42mm', price: 395 },
          { label: '326933 — Jubilee', size: '42mm', price: 465 },
          { label: '326934 — Jubilee', size: '42mm', price: 465 },
          { label: '336933 — Jubilee', size: '42mm', price: 465 },
          { label: '336934 — Jubilee', size: '42mm', price: 465 },
          { label: '326933 / 326934 — case & bezel only', size: '42mm', price: 300 },
        ],
      },
      {
        name: 'Land-Dweller',
        items: [
          { label: '127234', size: '36mm', price: 465 },
          { label: '127334', size: '40mm', price: 465 },
        ],
      },
      {
        name: 'Oyster Perpetual',
        items: [
          { label: '15000', size: '34mm', price: 395 },
          { label: '276200', size: '28mm', price: 395 },
          { label: '277200', size: '31mm', price: 395 },
          { label: '124200', size: '34mm', price: 395 },
          { label: '126000', size: '36mm', price: 395 },
          { label: '124300', size: '41mm', price: 395 },
          { label: '134300', size: '41mm', price: 395 },
        ],
      },
      {
        name: 'Day-Date',
        items: [
          { label: '1803', size: '36mm', price: 475 },
          { label: '18038', size: '36mm', price: 475 },
          { label: '18238', size: '36mm', price: 475 },
          { label: '19018 Oysterquartz', size: '36mm', price: 475 },
          { label: '118206', size: '36mm', price: 475 },
          { label: '118208 — Oyster', size: '36mm', price: 395 },
          { label: '118239', size: '36mm', price: 475 },
          { label: '128235', size: '36mm', price: 475 },
          { label: '218235', size: '41mm', price: 475 },
          { label: '228235', size: '40mm', price: 475 },
        ],
      },
    ],
  },
  {
    brand: 'Patek Philippe',
    families: [
      {
        name: 'Nautilus',
        items: [
          { label: '3700/1AR', size: '42mm', price: 595 },
          { label: '3800/1', size: '37mm', price: 595 },
          { label: '3900/1', size: '32mm', price: 595 },
          { label: '5711/1A', size: '40mm', price: 595 },
          { label: '5711/1R', size: '40.5mm', price: 595 },
          { label: '5711R-001 — strap', size: '40mm', price: 475 },
          { label: '5712/1A', size: '40mm', price: 595 },
          { label: '5712/1A-001 Tiffany & Co', size: '40mm', price: 595 },
          { label: '5712/1R', size: '40mm', price: 595 },
          { label: '5712R / 5712G — strap', size: '40mm', price: 475 },
          { label: '5726/1A', size: '40.5mm', price: 595 },
          { label: '5726A — strap', size: '40.5mm', price: 475 },
          { label: '5740/1G', size: '40mm', price: 595 },
          { label: '5811/1G', size: '41mm', price: 595 },
          { label: '5976/1G', size: '44mm', price: 595 },
          { label: '5980/1AR', size: '40.5mm', price: 595 },
          { label: '5980R — strap', size: '40.5mm', price: 475 },
          { label: '5990/1A', size: '40.5mm', price: 595 },
          { label: '5990/1R', size: '40.5mm', price: 595 },
        ],
      },
      {
        name: 'Ladies Nautilus',
        items: [
          { label: '7010/1R', size: '32mm', price: 595 },
          { label: '7118/1A', size: '35.2mm', price: 595 },
          { label: '7118/1R', size: '35.2mm', price: 595 },
          { label: '7118/1200R', size: '35.2mm', price: 595 },
        ],
      },
      {
        name: 'Aquanaut',
        items: [
          { label: '5065A', size: '38mm', price: 475 },
          { label: '5067A', size: '35.6mm', price: 475 },
          { label: '5164A', size: '40.8mm', price: 475 },
          { label: '5164R', size: '40.8mm', price: 475 },
          { label: '5165A', size: '38mm', price: 475 },
          { label: '5167A', size: '40mm', price: 475 },
          { label: '5167R', size: '40mm', price: 475 },
          { label: '5167/1A — bracelet', size: '40.8mm', price: 595 },
          { label: '5168G', size: '42.2mm', price: 475 },
          { label: '5267/200A', size: '38.8mm', price: 475 },
          { label: '5269/200R', size: '38.8mm', price: 475 },
          { label: '5968A', size: '42.2mm', price: 475 },
        ],
      },
      {
        name: 'Cubitus',
        items: [
          { label: '5821/1A — bracelet', size: '45mm', price: 595 },
          { label: '5822P — strap', size: '45mm', price: 475 },
        ],
      },
      {
        name: 'Other',
        items: [
          { label: '5235/50R', size: '40.5mm', price: 475 },
          { label: '5261R', size: '39.9mm', price: 475 },
          { label: '5905/1A', size: '42mm', price: 595 },
          { label: '7122/200G', size: '33mm', price: 475 },
          { label: '7128/1G', size: '40mm', price: 595 },
        ],
      },
    ],
  },
  {
    brand: 'Audemars Piguet',
    families: [
      {
        name: 'Royal Oak — Bracelet',
        items: [
          { label: '4100BA', size: '36mm', price: 595 },
          { label: '14470ST', size: '33mm', price: 595 },
          { label: '15202ST', size: '39mm', price: 595 },
          { label: '15202OR', size: '39mm', price: 595 },
          { label: '15300ST', size: '39mm', price: 595 },
          { label: '15400ST', size: '41mm', price: 595 },
          { label: '15450ST', size: '37mm', price: 595 },
          { label: '15500ST', size: '41mm', price: 595 },
          { label: '15510ST', size: '41mm', price: 595 },
          { label: '15550ST', size: '37mm', price: 595 },
          { label: '16202ST', size: '39mm', price: 595 },
          { label: '16202XT', size: '39mm', price: 595 },
          { label: '25852ST', size: '38mm', price: 595 },
          { label: '25860ST', size: '39mm', price: 595 },
          { label: '26120ST', size: '39mm', price: 595 },
          { label: '26168SR', size: '39mm', price: 595 },
          { label: '26240ST', size: '41mm', price: 595 },
          { label: '26240BA', size: '41mm', price: 595 },
          { label: '26315OR', size: '38mm', price: 595 },
          { label: '26320BA', size: '41mm', price: 595 },
          { label: '26331ST', size: '41mm', price: 595 },
          { label: '26331OR', size: '41mm', price: 595 },
          { label: '26522OR', size: '41mm', price: 595 },
          { label: '26579CS', size: '41mm', price: 595 },
          { label: '26586IP', size: '41mm', price: 595 },
          { label: '26660BC', size: '37mm', price: 595 },
          { label: '26674SG', size: '41mm', price: 595 },
          { label: '26715ST.ZZ', size: '38mm', price: 595 },
          { label: '67650ST', size: '33mm', price: 595 },
          { label: '77350ST', size: '34mm', price: 595 },
          { label: '77450ST', size: '34mm', price: 595 },
        ],
      },
      {
        name: 'Royal Oak — Strap',
        items: [
          { label: '15210OR', size: '41mm', price: 475 },
          { label: '15212NR', size: '41mm', price: 475 },
          { label: '15400OR', size: '41mm', price: 475 },
          { label: '15450OR', size: '37mm', price: 475 },
          { label: '15500OR', size: '41mm', price: 475 },
          { label: '15510OR', size: '41mm', price: 475 },
          { label: '26120OR', size: '39mm', price: 475 },
          { label: '26239OR', size: '41mm', price: 475 },
          { label: '26240OR', size: '41mm', price: 475 },
          { label: '26331OR', size: '41mm', price: 475 },
        ],
      },
      {
        name: 'Royal Oak Offshore — Bracelet',
        items: [
          { label: '26237ST', size: '42mm', price: 595 },
          { label: '26238ST', size: '42mm', price: 595 },
          { label: '26238BA', size: '42mm', price: 595 },
          { label: '26239OR', size: '41mm', price: 595 },
          { label: '26470OR', size: '42mm', price: 595 },
        ],
      },
      {
        name: 'Royal Oak Offshore — Strap & Rubber',
        items: [
          { label: '15605SK', size: '43mm', price: 475 },
          { label: '15710ST', size: '42mm', price: 475 },
          { label: '15720ST', size: '42mm', price: 475 },
          { label: '25940OK', size: '42mm', price: 475 },
          { label: '26048SK', size: '37mm', price: 475 },
          { label: '26231OR / 26231ST', size: '37mm', price: 475 },
          { label: '26238ST', size: '42mm', price: 475 },
          { label: '26238TI', size: '42mm', price: 475 },
          { label: '26378IO', size: '48mm', price: 475 },
          { label: '26388PO', size: '44mm', price: 475 },
          { label: '26400IO', size: '44mm', price: 475 },
          { label: '26401', size: '44mm', price: 475 },
          { label: '26420OI', size: '43mm', price: 475 },
          { label: '26420SO', size: '43mm', price: 475 },
          { label: '26470OR', size: '42mm', price: 475 },
          { label: '26480TI', size: '42mm', price: 475 },
          { label: '26589', size: '44mm', price: 475 },
          { label: '26620IO', size: '42mm', price: 475 },
          { label: '67540SK', size: '37mm', price: 475 },
          { label: '77605OK', size: '37mm', price: 475 },
        ],
      },
      {
        name: 'Code 11.59',
        items: [
          { label: '26393OR', size: '41mm', price: 475 },
          { label: '26393ST', size: '41mm', price: 475 },
          { label: '26394BC', size: '41mm', price: 475 },
        ],
      },
    ],
  },
  {
    brand: 'Vacheron Constantin',
    families: [
      {
        name: 'Overseas',
        items: [
          { label: '4000V/210A-B911', size: '41mm', price: 595 },
          { label: '4300V/120R-B509', size: '41.5mm', price: 595 },
          { label: '4500V/110R-B705', size: '41mm', price: 595 },
          { label: '4520V/210A-B128', size: '41mm', price: 595 },
          { label: '5520V/210A-B148', size: '42.5mm', price: 595 },
          { label: '6000V/110R-B934 Tourbillon Skeleton', size: '42.5mm', price: 595 },
        ],
      },
      {
        name: 'Historiques 222',
        items: [
          { label: '4200H/222J-B935', size: '37mm', price: 595 },
        ],
      },
    ],
  },
  {
    brand: 'Richard Mille',
    families: [
      {
        name: 'References',
        items: [
          { label: 'RM007-01', size: '45.66 x 31.4mm', price: 725 },
          { label: 'RM010', size: '48 x 39.3mm', price: 725 },
          { label: 'RM011', size: '50 x 40mm', price: 725 },
          { label: 'RM011 Le Mans', size: '50 x 40mm', price: 725 },
          { label: 'RM011-FM', size: '50 x 40mm', price: 725 },
          { label: 'RM011-01', size: '50 x 42.7mm', price: 725 },
          { label: 'RM011-03', size: '50 x 44.5mm', price: 725 },
          { label: 'RM022', size: '48 x 39.7mm', price: 725 },
          { label: 'RM023', size: '45 x 37.8mm', price: 725 },
          { label: 'RM029', size: '48 x 39.7mm', price: 725 },
          { label: 'RM030', size: '50 x 42.7mm', price: 725 },
          { label: 'RM055 Bubba Watson', size: '50 x 42.7mm', price: 725 },
          { label: 'RM061', size: '50.23 x 42.7mm', price: 725 },
          { label: 'RM065-01', size: '50 x 44.5mm', price: 725 },
          { label: 'RM067-01', size: '38.7 x 47.5mm', price: 725 },
          { label: 'RM072-01', size: '48.4 x 47.34mm', price: 725 },
        ],
      },
    ],
  },
  {
    brand: 'Omega · Cartier · Hublot · IWC',
    families: [
      {
        name: 'References',
        items: [
          { label: 'Cartier Ballon Bleu WSSA0018', size: '47.5 x 39.8mm', price: 450 },
          { label: 'Cartier Ballon Bleu WSSA0029', size: '41.9 x 35.1mm', price: 450 },
          { label: 'Omega Speedmaster Moonwatch 311.30.42.30.01.006', size: '42mm', price: 450 },
          { label: 'Omega Speedmaster Dark Side of the Moon 311.92.44.51.01.007', size: '44.25mm', price: 395 },
          { label: 'Hublot Big Bang 647.NX.1137.RX', size: '42mm', price: 395 },
          { label: 'IWC Portugieser Perpetual Calendar 503703', size: '44.4mm', price: 395 },
        ],
      },
    ],
  },
];

export const pricingExtras: PricingExtra[] = [
  { label: 'On-site service, Greater Los Angeles', price: '+$100' },
  { label: 'Same-day service, subject to availability', price: '+$75' },
  { label: 'Crystal & bezel only', price: 'Enquire' },
  { label: 'Clasp & bracelet refills', price: 'Enquire' },
  { label: 'Hermès & Chanel handbags', price: 'Enquire' },
];

export function formatPrice(price: number | string): string {
  if (typeof price === 'number') {
    return `$${price.toLocaleString('en-US')}`;
  }
  return price;
}

export function brandItemCount(brand: PricingBrand): number {
  return brand.families.reduce((sum, family) => sum + family.items.length, 0);
}

