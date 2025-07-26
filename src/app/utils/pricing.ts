// Experience styles
export const experiences = [
  {
    id: "classic",
    name: "Classic",
    price: 300,
    description: "Cozy blankets, rugs, and our signature sunset setup.",
    image: "/verticalSunset.jpeg",
    includes: [
      "Seating area",
      "Projector setup",
      "Sunset timing",
      "Beach-friendly decor"
    ]
  },
  {
    id: "bali",
    name: "The Bali",
    price: 350,
    description: "Boho-chic macrame pillows, tropical tones, and dreamy lighting.",
    image: "/bayview_behind.jpg",
    includes: [
      "Macrame decor",
      "Boho pillows",
      "Hanging lights",
      "Sunset-ready scene"
    ]
  },
  {
    id: "picnic",
    name: "Picnic",
    price: 275,
    description: "An intimate picnic setup without the movie screen.",
    image: "/verticalPicnic.jpeg",
    includes: [
      "Picnic table",
      "Plush floor seating",
      "Decorative elements"
    ]
  },
  {
    id: "seasonal",
    name: "Seasonal",
    price: 325,
    description: "Fall, Holiday, or Spring themes for a magical movie night.",
    image: "/IMG_1255.jpeg",
    includes: [
      "Seasonal decor",
      "Themed props",
      "Matching tableware"
    ]
  },
];

// Packages
export const packages = [
  {
    id: "birthday",
    name: "Birthday",
    price: 150,
    description: "Decor and flair to celebrate any age.",
    image: "/poolsBday5.JPG",
    includes: [
      "Balloons",
      "Birthday signage",
      "Treat table",
      "Party-themed props"
    ]
  },
  {
    id: "romance",
    name: "Romance",
    price: 200,
    description: "Candles, rose petals, cozy blankets, and love vibes.",
    image: "/vday3.jpg",
    includes: [
      "Rose petals",
      "Candles",
      "Mood lighting",
      "Blankets"
    ]
  },
  {
    id: "proposal",
    name: "Proposal",
    price: 300,
    description: "Custom setup for the perfect 'yes!' moment.",
    image: "/vday3.jpg",
    includes: [
      "Custom signs",
      "Proposal decor",
      "Candle aisle",
      "Petals"
    ]
  },
  {
    id: "drive-thru",
    name: "Drive-Thru",
    price: 125,
    description: "Popcorn, candy trays, retro film signs for a nostalgic feel.",
    image: "/verticalSunset.jpeg",
    includes: [
      "Popcorn station",
      "Candy trays",
      "Movie signs",
      "Clapboard decor"
    ]
  },
];

// Add-ons
export const addons = [
  {
    id: "charcuterie",
    name: "Charcuterie Board",
    description: "A gourmet meat and cheese board for 2–4 guests.",
    price: 60
  },
  {
    id: "firepit",
    name: "Fire Pit Rental",
    description: "Cozy up with a smokeless fire pit for warmth and s'mores.",
    price: 40
  },
  {
    id: "polaroid",
    name: "Polaroid Camera",
    description: "Instant camera rental with 10 photos included.",
    price: 25
  }
];


// Utility Functions
export function calculateTotal(
  selectedExperience: string,
  selectedPackage: string,
  selectedAddons: string[],
  guestCount: number = 2
): number {
  const experiencePrice = experiences.find((e) => e.id === selectedExperience)?.price || 0;
  const packagePrice = packages.find((p) => p.id === selectedPackage)?.price || 0;
  const addonsPrice = selectedAddons
    .map((id) => addons.find((a) => a.id === id)?.price || 0)
    .reduce((sum, val) => sum + val, 0);

  // Calculate guest pricing: base price includes 2 guests, each additional guest is $25
  const additionalGuests = Math.max(0, guestCount - 2);
  const guestPricing = additionalGuests * 25;

  return experiencePrice + packagePrice + addonsPrice + guestPricing;
}

export function formatPrice(price: number): string {
  return `$${price.toFixed(0)}`;
}

export function getPackageById(id: string) {
  return packages.find((pkg) => pkg.id === id);
}

export function getExperienceById(id: string) {
  return experiences.find((exp) => exp.id === id);
}

export function getAddonById(id: string) {
  return addons.find((addon) => addon.id === id);
}
