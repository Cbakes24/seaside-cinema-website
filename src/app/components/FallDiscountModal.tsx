"use client";

import React, { useState, useEffect } from 'react';

const PROMO_CUTOFF_TIMESTAMP = new Date("2026-06-16T00:00:00").getTime();

interface SummerSaleModalProps {
  onClose?: () => void;
}

const SummerSaleModal: React.FC<SummerSaleModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (Date.now() >= PROMO_CUTOFF_TIMESTAMP) {
      return;
    }

    // Show modal after 3 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);
// close the modal
  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

// navigate to booking page
  const handleBookNow = () => {
    setIsOpen(false);
    onClose?.();
    window.location.href = '/book';
  };

  return (
    <>
      {/* Modal backdrop */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-white rounded-2xl shadow-2xl max-w-md w-5/6 mx-4 relative border border-teal/10 overflow-hidden">
            <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-orange via-peach to-teal" />

            {/* Header */}
            <div className="text-center mb-6 pt-6">
              <div className="relative mx-auto mb-4 h-20 w-20">
                <div className="absolute inset-0 rounded-full bg-orange/20 blur-md animate-pulse" />
                <div className="relative flex h-20 w-20 items-center justify-center rounded-full bg-peach/40 border border-orange/30">
                <svg
                  viewBox="0 0 64 64"
                  className="h-10 w-10 text-teal"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-hidden="true"
                >
                  <rect x="10" y="24" width="32" height="18" rx="4" fill="currentColor" opacity="0.2" />
                  <rect x="8" y="22" width="34" height="20" rx="4" stroke="currentColor" strokeWidth="3" />
                  <circle cx="30" cy="32" r="6" stroke="currentColor" strokeWidth="3" />
                  <rect x="42" y="28" width="8" height="8" rx="2" stroke="currentColor" strokeWidth="3" />
                  <line x1="18" y1="44" x2="16" y2="52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <line x1="34" y1="44" x2="36" y2="52" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <line x1="50" y1="30" x2="58" y2="26" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <line x1="50" y1="34" x2="58" y2="34" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  <line x1="50" y1="38" x2="58" y2="42" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                </svg>
                </div>
              </div>
              <p className="inline-flex items-center rounded-full bg-orange/10 px-3 py-1 text-xs font-semibold tracking-wide text-orange mb-3">
                SUMMER EARLY BIRD
              </p>
              <h3 className="text-2xl font-bold text-teal mb-2 leading-tight">
                Early Bird Summer Movie Night
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-teal mx-auto rounded-full mb-4"></div>
            </div>

            {/* Content */}
            <div className="text-center mb-6">
              <p className="text-lg text-gray-700 mb-4">
                <span className="font-bold text-orange text-4xl">10% OFF</span>
              </p>
              <p className="text-gray-600 mb-4">
                Book your summer movie night by June 15, 2026.
              </p>
              <div className="bg-gradient-to-br from-peach/60 to-offwhite p-4 rounded-xl mb-4 border border-orange/20">
                <p className="text-xs uppercase tracking-wide text-gray-500 mb-1">Promo code</p>
                <p className="text-lg text-teal font-bold">
                  Use code: <span className="text-orange">SeasideSummer26</span>
                </p>
                <p className="text-sm text-gray-600 mt-2">
                  Offer valid for bookings made before 6/15/26.
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-action flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBookNow}
                className="btn bg-teal text-white hover:bg-orange transition-colors flex-1 py-2"
              >
                🎬 Book Now & Save 10%
              </button>
              <button
                onClick={handleClose}
                className="py-2 btn btn-outline border-teal text-teal hover:bg-teal hover:text-white transition-colors flex-1"
              >
                Check Later
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              aria-label="Close modal"
            >
              ✕
            </button>
          </div>
          
          {/* Modal backdrop for clicking outside to close */}
          <form method="dialog" className="modal-backdrop" onClick={handleClose}>
            <button>close</button>
          </form>
        </div>
      )}
    </>
  );
};

export default SummerSaleModal; 
