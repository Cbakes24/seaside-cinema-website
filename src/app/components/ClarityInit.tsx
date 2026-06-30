"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

const CLARITY_PROJECT_ID = "xfbf3ip3qk";

declare global {
  interface Window {
    __clarityInitialized?: boolean;
  }
}

export default function ClarityInit() {
  useEffect(() => {
    if (typeof window === "undefined" || window.__clarityInitialized) {
      return;
    }

    Clarity.init(CLARITY_PROJECT_ID);
    window.__clarityInitialized = true;
  }, []);

  return null;
}
