export interface DiscountCode {
  code: string[];
  name: string;
  description: string;
  percentage: number;
  isActive: boolean;
  validFrom?: Date;
  validUntil?: Date;
  maxUses?: number;
  currentUses?: number;
}

export const discountCodes: DiscountCode[] = [
  {
    code: ["SpringMovies26"],
    name: "Spring Time Special",
    description: "10% off your total booking",
    percentage: 10,
    isActive: true,
  },
  // {
  //   code: ["Autumn25", "pumpkinSpice", "pumpkin spice"],
  //   name: "Autumn Special",
  //   description: "10% off your total booking",
  //   percentage: 10,
  //   isActive: true,
  // },
  // {
  //   code: ["SUMMERMAMA"],
  //   name: "Summer Mama",
  //   description: "10% off your total booking",
  //   percentage: 10,
  //   isActive: true,
  // },
  // Add more discount codes here as needed
  // {
  //   code: "WINTER20",
  //   name: "Winter Wonderland",
  //   description: "20% off your total booking",
  //   percentage: 20,
  //   isActive: false,
  //   validFrom: new Date("2024-12-01"),
  //   validUntil: new Date("2024-12-31"),
  // },
];

// Helper function to validate a discount code
export function validateDiscountCode(code: string): DiscountCode | null {
  const normalizedCode = code.trim().toUpperCase();
  const discount = discountCodes.find(d => d.code.some(c => c.toUpperCase() === normalizedCode));
  
  if (!discount || !discount.isActive) {
    return null;
  }
  
  // Check date validity if dates are provided
  const now = new Date();
  if (discount.validFrom && now < discount.validFrom) {
    return null;
  }
  if (discount.validUntil && now > discount.validUntil) {
    return null;
  }
  
  // Check usage limits if provided
  if (discount.maxUses && discount.currentUses && discount.currentUses >= discount.maxUses) {
    return null;
  }
  
  return discount;
}

// Helper function to calculate discount amount
export function calculateDiscountAmount(basePrice: number, discount: DiscountCode): number {
  return basePrice * (discount.percentage / 100);
}

// Helper function to get all active discount codes
export function getActiveDiscountCodes(): DiscountCode[] {
  return discountCodes.filter(d => d.isActive);
}

// Helper function to get discount by code
export function getDiscountByCode(code: string): DiscountCode | null {
  const normalizedCode = code.trim().toUpperCase();
  return discountCodes.find(d => d.code.some(c => c.toUpperCase() === normalizedCode)) || null;
}
