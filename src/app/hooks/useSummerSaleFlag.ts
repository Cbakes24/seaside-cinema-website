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

export function useJulyWeek1Flag(): boolean {
  const [isJulyWeek1Enabled, setIsJulyWeek1Enabled] = useState(false);

  useEffect(() => {
    const value = document.body?.dataset?.julyweek1;
    setIsJulyWeek1Enabled(value === "true");
  }, []);

  return isJulyWeek1Enabled;
}
