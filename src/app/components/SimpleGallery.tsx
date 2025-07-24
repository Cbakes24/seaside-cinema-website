'use client';

import { useState, useEffect } from 'react';

interface SimpleGalleryProps {
  maxImages?: number;
  className?: string;
}

const SimpleGallery: React.FC<SimpleGalleryProps> = ({
  maxImages = 12,
  className = ''
}) => {
  const [images, setImages] = useState<string[]>([]);

  useEffect(() => {
    // Simple list of actual images from your public directory
    const imageList = [
      '/poolsBday7.jpg',
      '/poolsBday6.JPG',
      '/poolsBday5.JPG',
      '/poolsBday4.JPG',
      '/poolsbday3.JPG',
      '/poolsBday2.JPG',
      '/poolsBday.JPG',
      '/IMG_1255.jpeg',
      '/fall_night_back.jpeg',
      '/fall_decor3.jpeg',
      '/fall_decor.jpeg',
      '/fall_day_back.jpeg',
      '/fall_day_back3.jpeg',
      '/vday1.jpg',
      '/vday3.jpg',
      '/vday2.jpg',
      '/IMG_1179_Original.jpg',
      '/picnic_6person.jpeg',
      '/charbuteri1.jpeg',
      '/big_bali.JPG',
      '/Bali_bday_backdiag.jpeg',
      '/bayview_behind.jpg',
      '/projectorLogoTEAL.png',
      '/projectorLogoSand.png',
      '/projectorLogoPeach.png',
      '/projectorLogoOffWhite.png',
      '/projectorNoBackground.png',
      '/verticalPicnic.jpeg',
      '/verticalSunset.jpeg',
    ];

    setImages(imageList.slice(0, maxImages));
  }, [maxImages]);

  return (
    <div className={`grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 ${className}`}>
      {images.map((src, index) => (
        <div key={index} className="aspect-square overflow-hidden rounded-lg bg-gray-100">
          <img
            src={src}
            alt={`Image ${index + 1}`}
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error(`Failed to load image: ${src}`);
              e.currentTarget.style.backgroundColor = 'red';
              e.currentTarget.style.border = '2px solid red';
            }}
            onLoad={() => {
              console.log(`Successfully loaded image: ${src}`);
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default SimpleGallery; 
