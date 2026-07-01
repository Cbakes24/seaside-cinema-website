import { flag } from "flags/next";
import { vercelAdapter } from "@flags-sdk/vercel";


export const julyweek1 = flag<boolean>({
  key: "julyweek1",
  description: "first week of July",
  options: [
    { label: "Off", value: false },
    { label: "On", value: true },
  ],
  adapter: vercelAdapter,
});
export const summerSaleFlag = flag<boolean>({
  key: "summer-sale",
  description: "Enable summer sale campaign experiences.",
  options: [
    { label: "Off", value: false },
    { label: "On", value: true },
  ],
  adapter: vercelAdapter,
});

export const analyticsFlags = [summerSaleFlag, julyweek1] as const;
