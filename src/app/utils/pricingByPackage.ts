// Type definitions
export interface PackageOption {
  price: number;
  addons: string[];
  image: string;
}

export interface PackageOptions {
  [key: string]: PackageOption;
}

export interface AddonPricing {
  [key: string]: number | null;
}

// export const packageBasePricing = {
//     "Classic": 299,
//     "Bali": 399,
//     "Picnic": 249,
//     "Birthday": 449,
//     "Proposal": 599,
//     "Seasonal": 349,
//   };
  
//   export const packageDefaultAddons = {
//     "Classic": ["2 Seats", "2 Hours", "Setup and Cleanup", "projector and AV", "Enhanced Refreshments"],
//     "Bali": ["2 Seats", "2 Hours", "Setup and Cleanup", ,"projector and AV", "Premium Blankets and Pillows", "Enhanced Lighting"],
//     "Picnic": ["2 Seats", "2 Hours", "Setup and Cleanup", "Premium Blankets and Pillows", "Enhanced Lighting", "Additional Decor"],
//     "Birthday": ["Birthday Package"],
//     "Proposal": ["Proposal Package"],
//     "Seasonal": ["Holiday Package"],
//   };
  
//   export const packageHeroImages = {
//     "Classic": "/verticalSunset.jpeg",
//     "Bali": "/bayview_behind.jpg",
//     "Picnic": "/verticalPicnic.jpeg",
//     "Birthday": "/poolsBday5.JPG",
//     "Proposal": "/vday3.jpg",
//     "Seasonal": "/IMG_1255.jpeg",
//   };
export const packageOptions: PackageOptions = {
    Classic: {
      price: 299,
      addons: ["2 Seats", "2 Hours", "Setup and Cleanup", "projector and AV", "Enhanced Refreshments"],
      image: "/verticalSunset.jpeg",
    },
    Bali: {
      price: 399,
      addons: ["2 Seats", "2 Hours", "Setup and Cleanup", "projector and AV", "Premium Blankets and Pillows", "Enhanced Lighting"],
      image: "/bayview_behind.jpg",
    },
    Picnic: {
      price: 249,
      addons: ["2 Seats", "2 Hours", "Setup and Cleanup", "Premium Blankets and Pillows", "Enhanced Lighting", "Additional Decor"],
      image: "/verticalPicnic.jpeg",
    },
    Birthday: {
      price: 449,
      addons: ["Birthday Package"],
      image: "/poolsBday5.JPG",
    },
    Proposal: {
      price: 599,
      addons: ["Proposal Package"],
      image: "/vday3.jpg",
    },
    Seasonal: {
      price: 349,
      addons: ["Holiday Package"],
      image: "/IMG_1255.jpeg",
    },
  };

  export const addonPricing: AddonPricing = {
    
    "Additional Blankets": 10,
    "Additional Pillows": 10,
    "Additional Decor": 10,
    "Additional Lighting": 10,
    "Additional Refreshments": 10,
    "Additional Projector and AV": 10,
    "Additional Setup and Cleanup": 10,
    "Addl. 30 Minutes": 50,
    "Addl. 1 Hour": 90,
    "Tiki Torches (2)": 40,
    "Tiki Torches (4)": 75,
    "Tiki Torches (8)": 100,
    "Charcuterie Board Sm (2-4 people)": 50,
    "Charcuterie Board Med (5-10 people)": 100,
    "Charcuterie Board Lg (10-20 people)": 200,
    "Photographer": null,
    "Gift Card": 50
   };
  