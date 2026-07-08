import { vercelAdapter } from "@flags-sdk/vercel";
import { flag } from "flags/next";

const booleanOptions = [
  { label: "Off", value: false },
  { label: "On", value: true },
];

export const julyweek1 = flag<boolean>({
  key: "julyweek1",
  description: "First week of July modal gate.",
  options: booleanOptions,
  defaultValue: false,
  adapter: vercelAdapter,
});

export const summerSaleFlag = flag<boolean>({
  key: "summer-sale",
  description: "Enable summer sale campaign experiences.",
  options: booleanOptions,
  defaultValue: false,
  adapter: vercelAdapter,
});
