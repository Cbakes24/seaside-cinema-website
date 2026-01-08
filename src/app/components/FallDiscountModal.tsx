"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SummerSaleModalProps {
  onClose?: () => void;
}

const SummerSaleModal: React.FC<SummerSaleModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
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
          <div className="modal-box bg-white rounded-lg shadow-xl max-w-md w-5/6 mx-4 relative">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">☀️</div>
              <h3 className="text-2xl font-bold text-teal mb-2">
                Valentines Day Sale!
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-teal mx-auto rounded-full mb-4"></div>
            </div>

            {/* Content */}
            <div className="text-center mb-6">
              <p className="text-lg text-gray-700 mb-4">
                <span className="font-bold text-orange text-5xl">$50 OFF!!!</span>
              </p>
              <p className="text-gray-600 mb-4">
                Any Classic or Bali setup!
              </p>
              <div className="bg-peach/50 p-4 rounded-lg mb-4">
                <p className="text-sm text-teal font-medium">
                  Classic: <span className="line-through">$299</span> → <span className="font-bold text-orange">$249</span>
                </p>
                <p className="text-sm text-teal font-medium mt-1">
                  Bali: <span className="line-through">$399</span> → <span className="font-bold text-orange">$349</span>
                </p>
                <p className="text-xs text-gray-500 mt-2">
                  Limited time offer - book now to secure your discount!
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-action flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBookNow}
                className="btn bg-teal text-white hover:bg-orange transition-colors flex-1 py-2"
              >
                🎬 Book Now & Save $50!
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
