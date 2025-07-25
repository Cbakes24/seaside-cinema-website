export interface PricingItem {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'package' | 'addon';
}

export interface Package extends PricingItem {
  category: 'package';
  basePrice: number;
  includes: string[];
  image: string;
}

export interface Addon extends PricingItem {
  category: 'addon';
}

export const packages: Package[] = [
  {
    id: 'classic',
    name: 'Classic Setup',
    price: 299,
    basePrice: 299,
    description: 'Timeless elegance for any occasion',
    category: 'package',
    image: '/verticalSunset.jpeg',
    includes: [
      'Movie setup with projector and screen',
      'Cozy blankets and pillows',
      'Basic refreshments',
      'Setup and cleanup',
      '2-hour experience'
    ]
  },
  {
    id: 'bali',
    name: 'The Bali',
    price: 399,
    basePrice: 399,
    description: 'Tropical paradise experience',
    category: 'package',
    image: '/bayview_behind.jpg',
    includes: [
      'Movie setup with projector and screen',
      'Premium blankets and pillows',
      'Tropical decor and lighting',
      'Enhanced refreshments',
      'Setup and cleanup',
      '3-hour experience'
    ]
  },
  {
    id: 'picnic',
    name: 'Picnic',
    price: 249,
    basePrice: 249,
    description: 'Delightful outdoor experiences',
    category: 'package',
    image: '/verticalPicnic.jpeg',
    includes: [
      'Curated picnic setup',
      'Premium blankets and pillows',
      'Picnic basket with refreshments',
      'Setup and cleanup',
      '2-hour experience'
    ]
  },
  {
    id: 'birthday',
    name: 'Birthday Package',
    price: 449,
    basePrice: 449,
    description: 'Celebrate your special day',
    category: 'package',
    image: '/poolsBday5.JPG',
    includes: [
      'Movie setup with projector and screen',
      'Birthday decorations',
      'Premium blankets and pillows',
      'Enhanced refreshments',
      'Setup and cleanup',
      '3-hour experience'
    ]
  },
  {
    id: 'proposal',
    name: 'Proposal Package',
    price: 599,
    basePrice: 599,
    description: 'Make it unforgettable',
    category: 'package',
    image: '/vday3.jpg',
    includes: [
      'Movie setup with projector and screen',
      'Romantic decor and lighting',
      'Premium blankets and pillows',
      'Champagne and refreshments',
      'Setup and cleanup',
      '3-hour experience'
    ]
  },
  {
    id: 'seasonal',
    name: 'Seasonal Package',
    price: 349,
    basePrice: 349,
    description: 'Best of each season',
    category: 'package',
    image: '/IMG_1255.jpeg',
    includes: [
      'Movie setup with projector and screen',
      'Seasonal decorations',
      'Premium blankets and pillows',
      'Seasonal refreshments',
      'Setup and cleanup',
      '2.5-hour experience'
    ]
  }
];

export const addons: Addon[] = [
  {
    id: 'extra-blankets',
    name: 'Extra Blankets',
    price: 25,
    description: 'Additional cozy blankets for extra comfort',
    category: 'addon'
  },
  {
    id: 'charcuterie-board',
    name: 'Charcuterie Board',
    price: 45,
    description: 'Artisanal cheese and meat selection',
    category: 'addon'
  },
  {
    id: 'tiki-torches',
    name: 'Tiki Torches',
    price: 35,
    description: 'Atmospheric lighting for your setup',
    category: 'addon'
  },
  {
    id: 'extra-hour',
    name: 'Extra Hour',
    price: 75,
    description: 'Extend your experience by one hour',
    category: 'addon'
  },
  {
    id: 'projector-movie',
    name: 'Projector + Movie Setup',
    price: 50,
    description: 'Additional projector and movie selection',
    category: 'addon'
  },
  {
    id: 'champagne',
    name: 'Champagne Service',
    price: 65,
    description: 'Premium champagne with glasses',
    category: 'addon'
  },
  {
    id: 'floral-arrangement',
    name: 'Floral Arrangement',
    price: 55,
    description: 'Beautiful seasonal flower arrangement',
    category: 'addon'
  },
  {
    id: 'photography',
    name: 'Photography Package',
    price: 150,
    description: 'Professional photos of your experience',
    category: 'addon'
  }
];

export const getAllPricingItems = (): PricingItem[] => {
  return [...packages, ...addons];
};

export const getPackageById = (id: string): Package | undefined => {
  return packages.find(pkg => pkg.id === id);
};

export const getAddonById = (id: string): Addon | undefined => {
  return addons.find(addon => addon.id === id);
};

export const calculateTotal = (selectedPackage: string, selectedAddons: string[]): number => {
  const packageItem = getPackageById(selectedPackage);
  if (!packageItem) return 0;

  const addonItems = selectedAddons
    .map(id => getAddonById(id))
    .filter(Boolean) as Addon[];

  const addonTotal = addonItems.reduce((sum, addon) => sum + addon.price, 0);
  
  return packageItem.price + addonTotal;
};

export const formatPrice = (price: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format(price);
}; 
