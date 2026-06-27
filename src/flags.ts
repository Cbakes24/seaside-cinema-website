import { flag } from "@vercel/flags/next";

export const summerSaleFlag = flag<boolean>({
  key: "summer-sale",
  description: "Enable summer sale campaign experiences.",
  options: [
    { label: "Off", value: false },
    { label: "On", value: true },
  ],
  defaultValue: false,
  decide: () => process.env.NEXT_PUBLIC_FEATURE_FLAG === "true",
});

export const analyticsFlags = [summerSaleFlag] as const;
