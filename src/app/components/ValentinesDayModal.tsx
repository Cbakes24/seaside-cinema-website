"use client";

import React, { useState, useEffect } from 'react';

interface ValentinesDayModalProps {
  onClose?: () => void;
}

const ValentinesDayModal: React.FC<ValentinesDayModalProps> = ({ onClose }) => {
  const [isOpen, setIsOpen] = useState(false);
  const title = "Valentine's Day Special";

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

  // navigate to booking page with valentines seasonal option pre-selected
  const handleBookNow = () => {
    setIsOpen(false);
    onClose?.();
    window.location.href = '/book?experience=valentines';
  };

  return (
    <>
      {/* Modal backdrop */}
      {isOpen && (
        <div className="modal modal-open">
          <div className="modal-box bg-white rounded-lg shadow-2xl max-w-lg w-5/6 mx-4 relative border-2 border-pink-200">
            {/* Header */}
            <div className="text-center mb-6">
              <div className="text-6xl mb-4">💕</div>
              <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-pink-600 via-purple-600 to-red-500 bg-clip-text text-transparent">
                {title}
              </h3>
              <div className="w-16 h-1 bg-gradient-to-r from-pink-400 via-purple-400 to-red-400 mx-auto rounded-full mb-4"></div>
            </div>

            {/* Content */}
            <div className="text-center mb-6">
              <p className="text-lg text-gray-700 mb-4">
                <span className="font-bold bg-gradient-to-r from-pink-600 to-red-500 bg-clip-text text-transparent text-5xl">
                  10% OFF Vday Packages!
                </span>
              </p>
            
            </div>

            {/* Actions */}
            <div className="modal-action flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleBookNow}
                className="btn text-white h-15 w-50 rounded-md hover:opacity-90 transition-all flex-1 py-2 shadow-lg bg-gradient-to-r from-pink-500 via-purple-500 to-red-500 hover:from-pink-600 hover:via-purple-600 hover:to-red-600"
              >
                💝 Book Now & Save 10% 
              </button>
              <button
                onClick={handleClose}
                className="py-2 btn h-15 w-15 rounded-md btn-outline border-2 border-pink-300 text-pink-600 hover:bg-pink-50 hover:border-pink-400 transition-colors flex-1"
              >
                Check Later
              </button>
            </div>

            {/* Close button */}
            <button
              onClick={handleClose}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-gray-400 hover:text-pink-500"
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

export default ValentinesDayModal;
