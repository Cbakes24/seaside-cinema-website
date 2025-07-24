'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { GalleryImage, generateAltText, filterImagesByExtension, sortImages, IMAGE_EXTENSIONS } from '../utils/imageUtils';

interface GalleryProps {
  imageExtensions?: string[];
  className?: string;
  maxImages?: number;
  images?: GalleryImage[]; // Allow passing custom images
  autoLoad?: boolean; // Whether to auto-load from public directory
  sortBy?: 'name' | 'date' | 'none';
  showLoading?: boolean;
  aspectRatio?: 'square' | '16/9' | '4/3' | '3/2';
  gridCols?: {
    sm?: number;
    md?: number;
    lg?: number;
    xl?: number;
    '2xl'?: number;
  };
}

const Gallery: React.FC<GalleryProps> = ({
  imageExtensions = IMAGE_EXTENSIONS,
  className = '',
  maxImages,
  images: customImages,
  autoLoad = true,
  sortBy = 'name',
  showLoading = true,
  aspectRatio = 'square',
  gridCols = {
    sm: 2,
    md: 3,
    lg: 4,
    xl: 5,
    '2xl': 6
  }
}) => {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [clickedImages, setClickedImages] = useState<Set<number>>(new Set());

  const handleImageClick = (index: number) => {
    setClickedImages(prev => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  useEffect(() => {
    const fetchImages = async () => {
      try {
        let imageList: GalleryImage[] = [];

        if (customImages) {
          // Use custom images if provided
          imageList = customImages;
        } else if (autoLoad) {
          // Auto-load from public directory - using actual files from your public folder
          const publicImages: GalleryImage[] = [
            { src: '/poolsBday7.jpg', alt: 'Pool Birthday 7', filename: 'poolsBday7.jpg' },
            { src: '/poolsBday6.JPG', alt: 'Pool Birthday 6', filename: 'poolsBday6.JPG' },
            { src: '/poolsBday5.JPG', alt: 'Pool Birthday 5', filename: 'poolsBday5.JPG' },
            { src: '/poolsBday4.JPG', alt: 'Pool Birthday 4', filename: 'poolsBday4.JPG' },
            { src: '/poolsbday3.JPG', alt: 'Pool Birthday 3', filename: 'poolsbday3.JPG' },
            { src: '/poolsBday2.JPG', alt: 'Pool Birthday 2', filename: 'poolsBday2.JPG' },
            { src: '/poolsBday.JPG', alt: 'Pool Birthday', filename: 'poolsBday.JPG' },
            { src: '/IMG_1255.jpeg', alt: 'Image 1255', filename: 'IMG_1255.jpeg' },
            { src: '/fall_night_back.jpeg', alt: 'Fall Night Background', filename: 'fall_night_back.jpeg' },
            { src: '/fall_decor3.jpeg', alt: 'Fall Decor 3', filename: 'fall_decor3.jpeg' },
            { src: '/fall_decor.jpeg', alt: 'Fall Decor', filename: 'fall_decor.jpeg' },
            { src: '/fall_day_back.jpeg', alt: 'Fall Day Background', filename: 'fall_day_back.jpeg' },
            { src: '/fall_day_back3.jpeg', alt: 'Fall Day Background 3', filename: 'fall_day_back3.jpeg' },
            { src: '/vday1.jpg', alt: 'Valentine Day 1', filename: 'vday1.jpg' },
            { src: '/vday3.jpg', alt: 'Valentine Day 3', filename: 'vday3.jpg' },
            { src: '/vday2.jpg', alt: 'Valentine Day 2', filename: 'vday2.jpg' },
            { src: '/IMG_1179_Original.jpg', alt: 'Image 1179 Original', filename: 'IMG_1179_Original.jpg' },
            { src: '/picnic_6person.jpeg', alt: 'Picnic 6 Person', filename: 'picnic_6person.jpeg' },
            { src: '/charbuteri1.jpeg', alt: 'Charcuterie 1', filename: 'charbuteri1.jpeg' },
            { src: '/big_bali.JPG', alt: 'Big Bali', filename: 'big_bali.JPG' },
            { src: '/Bali_bday_backdiag.jpeg', alt: 'Bali Birthday Background Diagonal', filename: 'Bali_bday_backdiag.jpeg' },
            { src: '/bayview_behind.jpg', alt: 'Bayview Behind', filename: 'bayview_behind.jpg' },
            { src: '/bali_large2 2.PNG', alt: 'Bali Large 2', filename: 'bali_large2 2.PNG' },
            { src: '/DALL·E 2024-05-07 20.58.18 - An 8-bit style digital artwork of a luxury picnic scene at sunset by a bay, featuring a projector visibly projecting an image of an anchorman with a r.webp', alt: 'DALL-E Picnic Scene', filename: 'DALL·E 2024-05-07 20.58.18 - An 8-bit style digital artwork of a luxury picnic scene at sunset by a bay, featuring a projector visibly projecting an image of an anchorman with a r.webp' },
            { src: '/projectorLogoTEAL.png', alt: 'Projector Logo Teal', filename: 'projectorLogoTEAL.png' },
            { src: '/projectorLogoSand.png', alt: 'Projector Logo Sand', filename: 'projectorLogoSand.png' },
            { src: '/projectorLogoPeach.png', alt: 'Projector Logo Peach', filename: 'projectorLogoPeach.png' },
            { src: '/projectorLogoOffWhite.png', alt: 'Projector Logo Off White', filename: 'projectorLogoOffWhite.png' },
            { src: '/projectorNoBackground.png', alt: 'Projector No Background', filename: 'projectorNoBackground.png' },
            { src: '/verticalPicnic.jpeg', alt: 'Vertical Picnic', filename: 'verticalPicnic.jpeg' },
            { src: '/verticalSunset.jpeg', alt: 'Vertical Sunset', filename: 'verticalSunset.jpeg' },
          ];

          // Generate alt text for images that don't have it
          imageList = publicImages.map(img => ({
            ...img,
            alt: img.alt || generateAltText(img.filename)
          }));
        }

        // Filter by extensions
        const filteredImages = filterImagesByExtension(imageList, imageExtensions);

        // Sort images
        let sortedImages = filteredImages;
        if (sortBy === 'name') {
          sortedImages = sortImages(filteredImages);
        }

        // Limit images if maxImages is specified
        const limitedImages = maxImages ? sortedImages.slice(0, maxImages) : sortedImages;

        setImages(limitedImages);
      } catch (error) {
        console.error('Error loading images:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [customImages, autoLoad, imageExtensions, maxImages, sortBy]);

  // Generate grid classes based on props
  const getGridClasses = () => {
    const classes = ['grid', 'gap-4'];
    
    if (gridCols.sm) classes.push(`grid-cols-${gridCols.sm}`);
    if (gridCols.md) classes.push(`md:grid-cols-${gridCols.md}`);
    if (gridCols.lg) classes.push(`lg:grid-cols-${gridCols.lg}`);
    if (gridCols.xl) classes.push(`xl:grid-cols-${gridCols.xl}`);
    if (gridCols['2xl']) classes.push(`2xl:grid-cols-${gridCols['2xl']}`);
    
    return classes.join(' ');
  };

  // Get aspect ratio class
  const getAspectRatioClass = () => {
    switch (aspectRatio) {
      case '16/9':
        return 'aspect-video';
      case '4/3':
        return 'aspect-[4/3]';
      case '3/2':
        return 'aspect-[3/2]';
      default:
        return 'aspect-square';
    }
  };

  if (loading && showLoading) {
    return (
      <div className={`${getGridClasses()} ${className}`}>
        {[...Array(8)].map((_, index) => (
          <div key={index} className={`${getAspectRatioClass()} bg-gray-200 animate-pulse rounded-lg`}></div>
        ))}
      </div>
    );
  }

  if (images.length === 0) {
    return (
      <div className={`flex items-center justify-center h-64 ${className}`}>
        <p className="text-gray-500">No images found</p>
      </div>
    );
  }

  return (
    <div className={`${getGridClasses()} ${className}`}>
      {images.map((image, index) => (
        <div key={index} className={`group relative ${getAspectRatioClass()} overflow-hidden rounded-lg bg-peach cursor-pointer`}>
          <img
            src={image.src}
            alt={image.alt}
            className={`w-full h-full object-cover transition-all duration-300 group-hover:scale-105 ${
              clickedImages.has(index) ? 'scale-125' : ''
            }`}
            onClick={() => handleImageClick(index)}
            onError={(e) => {
              console.error(`Failed to load image: ${image.src}`);
              e.currentTarget.style.backgroundColor = 'red';
              e.currentTarget.style.border = '2px solid red';
            }}
            onLoad={() => {
              console.log(`Successfully loaded image: ${image.src}`);
            }}
          />
          <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-300" style={{ backgroundColor: '#171717a1' }} />
        </div>
      ))}
    </div>
  );
};

export default Gallery; 
