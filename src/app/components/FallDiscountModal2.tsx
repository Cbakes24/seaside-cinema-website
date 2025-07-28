// components/FallPromoModal.tsx
"use client"
import { useEffect, useState } from "react";

export default function FallPromoModal2() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsOpen(true), 5000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {/* Modal toggle */}
      <input type="checkbox" id="fall-promo-modal" className="modal-toggle" checked={isOpen} readOnly />

      <div className="modal">
        <div className="modal-box relative">
          <label
            htmlFor="fall-promo-modal"
            className="btn btn-sm btn-circle absolute right-2 top-2"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </label>
          <h3 className="text-lg font-bold">🍂 Fall Special!</h3>
          <p className="py-4">
            Book your September, October, or November event this week and get <strong>10% off</strong>!
          </p>
          <button className="btn btn-primary w-full mt-4" onClick={() => setIsOpen(false)}>
            Sweet, Thanks!
          </button>
        </div>
      </div>
    </>
  );
}
