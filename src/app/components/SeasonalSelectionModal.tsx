"use client";

import React, { useEffect } from 'react';
import Image from 'next/image';
import { seasonalOptions, formatPrice, getExperienceById } from '../utils/pricing';

interface SeasonalSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelect: (holidayId: string) => void;
  selectedHolidayId?: string;
}

const SeasonalSelectionModal: React.FC<SeasonalSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelect,
  selectedHolidayId,
}) => {
  const seasonalExperience = getExperienceById("seasonal");

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSelect = (holidayId: string) => {
    onSelect(holidayId);
    onClose();
  };

  return (
    <>
      {/* Modal backdrop */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={onClose}
        />
        
        {/* Modal content */}
        <div className="relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto border-2 border-teal/20">
          {/* Header */}
          <div className="sticky top-0 bg-white border-b-2 border-teal/20 p-6 z-10">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-playfair font-bold text-teal mb-2">
                  Select Your Holiday Theme
                </h3>
                <p className="text-sm text-gray-600">
                  Choose from our seasonal experiences
                </p>
              </div>
              <button
                onClick={onClose}
                className="btn btn-sm btn-circle btn-ghost text-gray-400 hover:text-teal transition-colors"
                aria-label="Close modal"
              >
                ✕
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid gap-6 md:grid-cols-3">
              {seasonalOptions.map((holiday) => {
                const isSelected = selectedHolidayId === holiday.id;
                return (
                  <button
                    key={holiday.id}
                    type="button"
                    onClick={() => handleSelect(holiday.id)}
                    className={`group relative bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border-2 ${
                      isSelected
                        ? 'border-teal ring-2 ring-teal/20'
                        : 'border-gray-200 hover:border-teal/50'
                    }`}
                  >
                    <div className="relative h-48">
                      <Image
                        src={holiday.image}
                        alt={holiday.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors"></div>
                      {isSelected && (
                        <div className="absolute top-2 right-2 bg-teal text-white px-3 py-1 rounded-full text-sm font-medium">
                          ✓ Selected
                        </div>
                      )}
                    </div>
                    <div className="p-4">
                      <h4 className="text-lg font-semibold text-teal mb-2">
                        {holiday.name}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3 line-clamp-2">
                        {holiday.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-lg font-bold text-teal">
                          {holiday.id === "valentines" && holiday.originalPrice ? (
                            <div className="flex flex-col items-start">
                              <span className="line-through text-gray-400 text-sm">
                                {formatPrice(holiday.originalPrice)}
                              </span>
                              <span className="text-orange font-bold">
                                {formatPrice(holiday.price)}
                              </span>
                            </div>
                          ) : (
                            formatPrice(holiday.price)
                          )}
                        </span>
                        <span className="text-teal text-sm font-medium group-hover:text-orange transition-colors">
                          Select →
                        </span>
                      </div>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-gray-50 border-t-2 border-teal/20 p-4">
            <div className="flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Base seasonal experience: {formatPrice(seasonalExperience?.price || 499)}
              </p>
              <button
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SeasonalSelectionModal;
