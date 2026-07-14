export type Maison = {
  brand: string;
  models: string[];
};

/**
 * Brand catalog aligned with RX8 Game / studio coverage.
 * Models are starter sets — expand per reference as you confirm stock.
 */
export const maisons: Maison[] = [
  {
    brand: "Rolex",
    models: [
      "Submariner",
      "Daytona",
      "GMT-Master II",
      "Datejust",
      "Day-Date",
      "Sky-Dweller",
      "Yacht-Master",
      "Explorer",
      "Sea-Dweller",
      "Milgauss",
      "Air-King",
      "Oyster Perpetual",
      "Cellini",
      "Cosmograph",
    ],
  },
  {
    brand: "Patek Philippe",
    models: [
      "Nautilus",
      "Aquanaut",
      "Calatrava",
      "Twenty~4",
      "Cubitus",
      "Grand Complications",
      "Gondolo",
    ],
  },
  {
    brand: "Audemars Piguet",
    models: [
      "Royal Oak",
      "Royal Oak Offshore",
      "Royal Oak Concept",
      "Code 11.59",
      "Jules Audemars",
    ],
  },
  {
    brand: "Richard Mille",
    models: ["RM 011", "RM 027", "RM 035", "RM 055", "RM 067", "RM 072"],
  },
  {
    brand: "Vacheron Constantin",
    models: [
      "Overseas",
      "Patrimony",
      "Traditionnelle",
      "Historiques",
      "Égérie",
    ],
  },
  {
    brand: "A. Lange & Söhne",
    models: ["Lange 1", "Saxonia", "Odysseus", "Zeitwerk", "Datograph", "1815"],
  },
  {
    brand: "Cartier",
    models: [
      "Santos",
      "Tank",
      "Ballon Bleu",
      "Pasha",
      "Drive",
      "Crash",
      "Panthère",
    ],
  },
  {
    brand: "Omega",
    models: [
      "Speedmaster",
      "Seamaster",
      "Constellation",
      "De Ville",
      "Aqua Terra",
      "Planet Ocean",
    ],
  },
  {
    brand: "IWC",
    models: [
      "Pilot's Watch",
      "Portugieser",
      "Ingenieur",
      "Aquatimer",
      "Portofino",
      "Big Pilot",
    ],
  },
  {
    brand: "Tudor",
    models: ["Black Bay", "Pelagos", "Royal", "1926", "Ranger", "Chrono"],
  },
  {
    brand: "Panerai",
    models: ["Luminor", "Submersible", "Radiomir", "Luminor Due"],
  },
  {
    brand: "Hublot",
    models: ["Big Bang", "Classic Fusion", "Spirit of Big Bang", "Square Bang"],
  },
  {
    brand: "Piaget",
    models: ["Polo", "Altiplano", "Limelight", "Possession"],
  },
  {
    brand: "Franck Muller",
    models: ["Vanguard", "Cintrée Curvex", "Vanguard Yachting"],
  },
  {
    brand: "Hermès",
    models: ["Apple Watch Hermès", "H08", "Arceau", "Cape Cod"],
  },
  {
    brand: "Grand Seiko",
    models: ["Heritage", "Sport", "Elegance", "Evolution 9", "Godzilla"],
  },
  {
    brand: "Zenith",
    models: ["Chronomaster", "Defy", "Pilot", "Elite"],
  },
  {
    brand: "Corum",
    models: ["Admiral", "Bubble", "Golden Bridge"],
  },
  {
    brand: "Jaeger-LeCoultre",
    models: ["Reverso", "Master Ultra Thin", "Polaris", "Duomètre"],
  },
  {
    brand: "Breguet",
    models: ["Classique", "Marine", "Type XX", "Tradition"],
  },
  {
    brand: "Breitling",
    models: ["Navitimer", "Chronomat", "Superocean", "Premier"],
  },
  {
    brand: "TAG Heuer",
    models: ["Carrera", "Monaco", "Aquaracer", "Formula 1"],
  },
  {
    brand: "Blancpain",
    models: ["Fifty Fathoms", "Villeret", "Léman"],
  },
  {
    brand: "Chopard",
    models: ["Mille Miglia", "Alpine Eagle", "Happy Sport"],
  },
  {
    brand: "Girard-Perregaux",
    models: ["Laureato", "Bridges", "1966"],
  },
  {
    brand: "Bell & Ross",
    models: ["BR 03", "BR 05", "Instruments"],
  },
  {
    brand: "Longines",
    models: ["Master Collection", "HydroConquest", "Conquest", "Spirit"],
  },
  {
    brand: "Seiko",
    models: ["Prospex", "Presage", "Astron"],
  },
];

/** Flat brand names for indexes / future CMS */
export const brandNames = maisons.map((m) => m.brand);
