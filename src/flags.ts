import { flag } from "@vercel/flags/next";


export const julyweek1 = flag<boolean>({
  key: "julyweek1",
  description: "first week of July",
  options: [
    { label: "Off", value: false },
    { label: "On", value: true },
  ],
  defaultValue: false,
  decide: () => process.env.NEXT_PUBLIC_JULYWEEK1 === "true",
});
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

export const analyticsFlags = [summerSaleFlag, julyweek1] as const;
