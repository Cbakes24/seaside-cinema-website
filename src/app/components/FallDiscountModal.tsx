"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface FallDiscountModalProps {
  onClose?: () => void;
}

const FallDiscountModal: React.FC<FallDiscountModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Show modal after 5 seconds
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    onClose?.();
  };

  const handleBookNow = () => {
    setIsOpen(false);
    onClose?.();
    // Navigate to booking page with fall discount parameter
    window.location.href = '/book?discount=fall10';
  };

  return (
    <>
      {/* Modal backdrop */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">🍂</div>
              <h3 className="text-2xl font-bold text-teal mb-2">
                Fall Special Offer!
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-orange to-teal mx-auto rounded-full mb-4"></div>
            </div>

            {/* Content */}
            <div className="text-center mb-6">
              <p className="text-lg text-gray-700 mb-4">
                <span className="font-bold text-orange text-2xl">10% OFF</span>
              </p>
              <p className="text-gray-600 mb-4">
                Any fall event booked this week
              </p>
              <div className="bg-peach/50 p-4 rounded-lg mb-4">
                <p className="text-sm text-teal font-medium">
                  Valid for September, October & November events
                </p>
                <p className="text-xs text-gray-500 mt-1">
                  Book by end of week to secure your discount
                </p>
              </div>
            </div>

            {/* Actions */}
            <div className="modal-action flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBookNow}
                className="btn bg-teal text-white hover:bg-orange transition-colors flex-1"
              >
                🎬 Book Now & Save!
              </button>
              <button
                onClick={handleClose}
                className="btn btn-outline border-teal text-teal hover:bg-teal hover:text-white transition-colors flex-1"
              >
                Maybe Later
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

export default FallDiscountModal; 
