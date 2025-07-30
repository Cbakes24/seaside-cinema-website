'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';

interface BirthdayImage {
  src: string;
  alt: string;
  label: string;
}

interface BirthdayCarouselProps {
  images: BirthdayImage[];
  autoRotateInterval?: number; // in milliseconds
  className?: string;
  showNavigation?: boolean;
  showIndicators?: boolean;
}

const BirthdayCarousel: React.FC<BirthdayCarouselProps> = ({
  images,
  autoRotateInterval = 5000,
  className = '',
  showNavigation = true,
  showIndicators = true
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Auto-rotate images
  useEffect(() => {
    if (images.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => 
        prevIndex === images.length - 1 ? 0 : prevIndex + 1
      );
    }, autoRotateInterval);

    return () => clearInterval(interval);
  }, [images.length, autoRotateInterval]);

  const goToPrevious = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  const goToNext = () => {
    setCurrentImageIndex((prevIndex) => 
      prevIndex === images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const goToImage = (index: number) => {
    setCurrentImageIndex(index);
  };

  if (images.length === 0) {
    return (
      <div className={`relative h-96 rounded-xl overflow-hidden shadow-2xl bg-gray-200 flex items-center justify-center ${className}`}>
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  return (
    <div className={`relative h-96 rounded-xl overflow-hidden shadow-2xl ${className}`}>
      <div className="relative h-96 bg-gray-200">
        <Image
          src={images[currentImageIndex].src}
          alt={images[currentImageIndex].alt}
          fill
          className="object-cover"
          priority
          onError={(e) => {
            console.error('Failed to load image:', e);
            e.currentTarget.style.backgroundColor = 'red';
          }}
          onLoad={() => console.log('Image loaded successfully')}
        />
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute bottom-4 left-4 text-white">
          <span className="bg-peach/90 text-white px-3 py-1 rounded-full text-sm font-medium">
            {images[currentImageIndex].label}
          </span>
        </div>
      </div>
      
      {/* Manual Navigation */}
      {showNavigation && images.length > 1 && (
        <>
          <button 
            className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
            onClick={goToPrevious}
            aria-label="Previous image"
          >
            ←
          </button>
          <button 
            className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors z-10"
            onClick={goToNext}
            aria-label="Next image"
          >
            →
          </button>
        </>
      )}
      
      {/* Carousel Indicators */}
      {showIndicators && images.length > 1 && (
        <div className="absolute bottom-4 right-4 flex space-x-2 z-10">
          {images.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentImageIndex ? 'bg-white' : 'bg-white/50 hover:bg-white'
              }`}
              onClick={() => goToImage(index)}
              aria-label={`Go to image ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BirthdayCarousel; 
