"use client";

import { useEffect, useState } from "react";

export function useSummerSaleFlag(): boolean {
  const [isSummerSaleEnabled, setIsSummerSaleEnabled] = useState(false);

  useEffect(() => {
    const value = document.body?.dataset?.summerSale;
    setIsSummerSaleEnabled(value === "true");
  }, []);

  return isSummerSaleEnabled;
}
