// Experience styles
export const experiences = [
  {
    id: "classic",
    name: "Classic",
    price: 299,
    description: "Cozy blankets, rugs, and our signature sunset setup.",
    image: "/verticalSunset.jpeg",
    includes: [
      "Theater Style Seating",
      "2 hour booking",
      "100 inch Projector setup with speaker",
      "Mexican Blankets",
      "Beach-friendly decor"
    ]
  },
  {
    id: "bali",
    name: "The Bali",
    price: 399,
    description: "Boho-chic macrame pillows, tropical tones, and dreamy lighting.",
    image: "/bayview_behind.jpg",
    includes: [
      "Upgraded Bali Decor",
      "Backdrop Seating",
      "100 inch Projector setup with speaker",
      "Large Low Table",
      "Boho pillows",
      "2 hour booking",
      "Hanging lights",
      "Sunset-ready scene"
    ]
  },
  {
    id: "picnic",
    name: "Picnic",
    price: 399,
    description: "An intimate picnic setup without the movie screen.",
    image: "/verticalPicnic.jpeg",
    includes: [
      "2 hour booking",
      "High quality and sustainably sourced decor",
      "Macrame pillows",
      "100 inch Projector setup with speaker",
      "Blankets, throws or rugs",
      "Low laying tables with place setting for each guest",
      "Portable Bluetooth speaker",
      "String Lights"
    ]
  },
  {
    id: "seasonal",
    name: "Seasonal",
    price: 499,
    description: "Fall, Holiday, or Spring themes for a magical movie night.",
    image: "/IMG_1255.jpeg",
    includes: [
      "Seasonal decor",
      "2 hour booking",
      "100 inch Projector setup with speaker",
      "Themed props",
      "Matching tableware",
      "Pillows and Blankets",
      "Themed Lighting",
      "Themed HolidaySnacks"
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
      "8 inch round birthday cake",
      "Birthday signage",
      "Table and Untensils",
      "Custom Birthday Signage"
    ]
  },
  {
    id: "romance",
    name: "Romance",
    price: 150,
    description: "Candles, rose petals, cozy blankets, and love vibes.",
    image: "/vday3.jpg",
    includes: [
      "Faux Roses",
      "Candles",
      "Mood lighting",
      "Blankets",
      "Bubbly on Ice",
      "Tiki Torches x2",
      "Upgraded lighting"
    ]
  },
  {
    id: "proposal",
    name: "Proposal",
    price: 300,
    description: "Custom setup for the perfect &apos;yes!&apos; moment.",
    image: "/vday3.jpg",
    includes: [
      "Custom sign",
      "Proposal decor",
      "Professional Photographer",
      "A dozen Roses to keep",
      "Upgraded lighting",
      "Bubbly on Ice",
      "Tiki Torches x2",
      "Upgraded lighting"
    ]
  },
  {
    id: "drive-thru",
    name: "Drive-Thru",
    price: 199,
    description: "Popcorn, candy trays, retro film signs for a nostalgic feel.",
    image: "/verticalSunset.jpeg",
    includes: [
      "Popcorn",
      "Candy and Snack Tray",
      "Movie signs",
      "Clapboard decor"
    ]
  },
];

// Add-ons
export const addons = [
  {
    id: "addl-30min",
    name: "Addl. 30 Minutes",
    description: "Extend your event by 30 minutes.",
    price: 50
  },
  {
    id: "addl-1hour",
    name: "Addl. 1 Hour",
    description: "Extend your event by 1 full hour.",
    price: 90
  },
  {
    id: "tiki-2",
    name: "Tiki Torches (2)",
    description: "Two tiki torches for added ambiance.",
    price: 40
  },
  {
    id: "tiki-4",
    name: "Tiki Torches (4)",
    description: "Four tiki torches to light up your space.",
    price: 75
  },
  {
    id: "tiki-8",
    name: "Tiki Torches (8)",
    description: "Eight tiki torches for a dramatic beach glow.",
    price: 100
  },
  {
    id: "charcuterie-sm",
    name: "Charcuterie Board Sm (2–4 people)",
    description: "Gluten-free and veggie options available.",
    price: 50
  },
  {
    id: "charcuterie-med",
    name: "Charcuterie Board Med (5–10 people)",
    description: "A larger gourmet board for medium-sized groups.",
    price: 100
  },
  {
    id: "charcuterie-lg",
    name: "Charcuterie Board Lg (10–20 people)",
    description: "Perfect for larger gatherings or celebrations.",
    price: 200
  },
  {
    id: "photographer",
    name: "Photographer",
    description: "Price varies based on photographer's current rates.",
    price: 0 // or null if you're handling pricing elsewhere
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
