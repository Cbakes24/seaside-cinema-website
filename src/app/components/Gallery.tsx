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
  sortBy?: 'name' | 'date' | 'none' | 'random';
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

  // Shuffle function for random ordering
  const shuffleArray = (array: GalleryImage[]): GalleryImage[] => {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };

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
            { src: '/verticalPicnic.jpeg', alt: 'Vertical Picnic', filename: 'verticalPicnic.jpeg' },
            { src: '/sunsetOrange.jpg', alt: 'Sunset Orange', filename: 'sunsetOrange.jpg' },
            { src: '/Kids_birthday_photoshopped.jpg', alt: 'Kids Birthday Photoshopped', filename: 'Kids_birthday_photoshopped.jpg' },
            { src: '/Kids_birthday_2photoshopped.jpg', alt: 'Kids Birthday 2 Photoshopped', filename: 'Kids_birthday_2photoshopped.jpg' },
            { src: '/igSnap2.jpg', alt: 'Instagram Snap 2', filename: 'igSnap2.jpg' },
            { src: '/verticalSunset.jpeg', alt: 'Vertical Sunset', filename: 'verticalSunset.jpeg' },
            { src: '/vday3.jpeg', alt: 'Valentine Day 3', filename: 'vday3.jpeg' },
            { src: '/vday1.jpeg', alt: 'Valentine Day 1', filename: 'vday1.jpeg' },
            { src: '/romance8.jpeg', alt: 'Romance 8', filename: 'romance8.jpeg' },
            { src: '/romance7.jpeg', alt: 'Romance 7', filename: 'romance7.jpeg' },
            { src: '/romance6.jpeg', alt: 'Romance 6', filename: 'romance6.jpeg' },
            { src: '/romance5.jpeg', alt: 'Romance 5', filename: 'romance5.jpeg' },
            { src: '/romance4.jpeg', alt: 'Romance 4', filename: 'romance4.jpeg' },
            { src: '/romance2.jpeg', alt: 'Romance 2', filename: 'romance2.jpeg' },
            { src: '/romance.jpeg', alt: 'Romance', filename: 'romance.jpeg' },
            { src: '/projectorClose.jpeg', alt: 'Projector Close', filename: 'projectorClose.jpeg' },
            { src: '/poolsBday5.jpeg', alt: 'Pools Birthday 5', filename: 'poolsBday5.jpeg' },
            { src: '/Low_poolsBday.jpg', alt: 'Low Pools Birthday', filename: 'Low_poolsBday.jpg' },
            { src: '/Lowpicnic_6person.jpeg', alt: 'Low Picnic 6 Person', filename: 'Lowpicnic_6person.jpeg' },
            { src: '/Low_largeBali3.jpeg', alt: 'Low Large Bali 3', filename: 'Low_largeBali3.jpeg' },
            { src: '/Lowlarge_classic.jpeg', alt: 'Low Large Classic', filename: 'Lowlarge_classic.jpeg' },
            { src: '/Low_L_bday_classic.jpeg', alt: 'Low L Birthday Classic', filename: 'Low_L_bday_classic.jpeg' },
            { src: '/Low_bday_bali.jpeg', alt: 'Low Birthday Bali', filename: 'Low_bday_bali.jpeg' },
            { src: '/Low_fallDecor.jpeg', alt: 'Low Fall Decor', filename: 'Low_fallDecor.jpeg' },
            { src: '/igSnap1.jpeg', alt: 'Instagram Snap 1', filename: 'igSnap1.jpeg' },
            { src: '/fall_night_back.jpeg', alt: 'Fall Night Background', filename: 'fall_night_back.jpeg' },
            { src: '/fall_decor3.jpeg', alt: 'Fall Decor 3', filename: 'fall_decor3.jpeg' },
            { src: '/fall_decor.jpeg', alt: 'Fall Decor', filename: 'fall_decor.jpeg' },
            { src: '/fall_day_back3.jpeg', alt: 'Fall Day Background 3', filename: 'fall_day_back3.jpeg' },
            { src: '/fall_day_back.jpeg', alt: 'Fall Day Background', filename: 'fall_day_back.jpeg' },
            { src: '/Low_classic_large_birthday.jpeg', alt: 'Low Classic Large Birthday', filename: 'Low_classic_large_birthday.jpeg' },
            { src: '/bayview_behindLow.jpeg', alt: 'Bayview Behind Low', filename: 'bayview_behindLow.jpeg' },
            { src: '/baliromanceLow.jpeg', alt: 'Bali Romance Low', filename: 'baliromanceLow.jpeg' },
            { src: '/bali_bday_nightLow.jpeg', alt: 'Bali Birthday Night Low', filename: 'bali_bday_nightLow.jpeg' },
            { src: '/picnicCharLow.jpg', alt: 'Picnic Charcuterie Low', filename: 'picnicCharLow.jpg' },
            { src: '/fallsmall.jpeg', alt: 'Fall Small', filename: 'fallsmall.jpeg' },
            { src: '/baliBdayBig.jpeg', alt: 'Bali Birthday Big', filename: 'baliBdayBig.jpeg' },
            { src: '/poolsBday5Large.jpeg', alt: 'Pools Birthday 5 Large', filename: 'poolsBday5Large.jpeg' },
            { src: '/bayview_behind Large.jpeg', alt: 'Bayview Behind Large', filename: 'bayview_behind Large.jpeg' },
            { src: '/bali_side.jpeg', alt: 'Bali Side', filename: 'bali_side.jpeg' },
            { src: '/Bali_sunset_tiki.jpeg', alt: 'Bali Sunset Tiki', filename: 'Bali_sunset_tiki.jpeg' },
            { src: '/DALL·Kids_birthdayAI-02-17 00.40.17 - Imagine a child\'s birthday party at a bay beach at sunset. Seating is provided by rows of black legless floor chairs, which are simple cushions withou.webp', alt: 'DALL-E Kids Birthday AI', filename: 'DALL·Kids_birthdayAI-02-17 00.40.17 - Imagine a child\'s birthday party at a bay beach at sunset. Seating is provided by rows of black legless floor chairs, which are simple cushions withou.webp' },
            { src: '/DALL·E 2024-08-19 13.30.50 - A simpler fall-themed outdoor movie night setup on a beach during twilight, with a city skyline in the background. The seating area includes two comfo.webp', alt: 'DALL-E Fall Movie Night 1', filename: 'DALL·E 2024-08-19 13.30.50 - A simpler fall-themed outdoor movie night setup on a beach during twilight, with a city skyline in the background. The seating area includes two comfo.webp' },
            { src: '/DALL·E 2024-08-19 13.34.40 - A simpler fall-themed outdoor movie night setup on a beach during twilight, with a city skyline in the background. The seating area includes two beach.webp', alt: 'DALL-E Fall Movie Night 2', filename: 'DALL·E 2024-08-19 13.34.40 - A simpler fall-themed outdoor movie night setup on a beach during twilight, with a city skyline in the background. The seating area includes two beach.webp' },
            { src: '/proposal2.jpg', alt: 'Proposal 2', filename: 'proposal2.jpg' },
            { src: '/proposal1.jpeg', alt: 'Proposal 1', filename: 'proposal1.jpeg' },
            { src: '/propoasal3.jpeg', alt: 'Proposal 3', filename: 'propoasal3.jpeg' },
            { src: '/largePicnic Medium.jpeg', alt: 'Large Picnic Medium', filename: 'largePicnic Medium.jpeg' },
            { src: '/romance3.jpeg', alt: 'Romance 3', filename: 'romance3.jpeg' },
            { src: '/_DSC1244.jpg', alt: 'DSC 1244', filename: '_DSC1244.jpg' },
            { src: '/IMG_9406.HEIC', alt: 'Image 9406', filename: 'IMG_9406.HEIC' },
            { src: '/HeatherLogogpt.PNG', alt: 'Heather Logo GPT', filename: 'HeatherLogogpt.PNG' },
            { src: '/holiday1.JPG', alt: 'Holiday 1', filename: 'holiday1.JPG' },
            { src: '/poolsbday3.JPG', alt: 'Pools Birthday 3', filename: 'poolsbday3.JPG' },
            { src: '/poolsBday2.JPG', alt: 'Pools Birthday 2', filename: 'poolsBday2.JPG' },
            { src: '/vday3.jpg', alt: 'Valentine Day 3', filename: 'vday3.jpg' },
            { src: '/vday2.jpg', alt: 'Valentine Day 2', filename: 'vday2.jpg' },
            { src: '/picnic6.heic', alt: 'Picnic 6', filename: 'picnic6.heic' },
            { src: '/largeBali1.jpg', alt: 'Large Bali 1', filename: 'largeBali1.jpg' },
            { src: '/Bali_bday_backdiag.jpeg', alt: 'Bali Birthday Background Diagonal', filename: 'Bali_bday_backdiag.jpeg' },
            { src: '/DALL·E 2024-05-07 20.58.18 - An 8-bit style digital artwork of a luxury picnic scene at sunset by a bay, featuring a projector visibly projecting an image of an anchorman with a r.webp', alt: 'DALL-E Picnic Scene', filename: 'DALL·E 2024-05-07 20.58.18 - An 8-bit style digital artwork of a luxury picnic scene at sunset by a bay, featuring a projector visibly projecting an image of an anchorman with a r.webp' },
            { src: '/projectorLogoTEAL.png', alt: 'Projector Logo Teal', filename: 'projectorLogoTEAL.png' },
            { src: '/projectorLogoSand.png', alt: 'Projector Logo Sand', filename: 'projectorLogoSand.png' },
            { src: '/projectorLogoPeach.png', alt: 'Projector Logo Peach', filename: 'projectorLogoPeach.png' },
            { src: '/projectorLogoOffWhite.png', alt: 'Projector Logo Off White', filename: 'projectorLogoOffWhite.png' },
            { src: '/projectorNoBackground.png', alt: 'Projector No Background', filename: 'projectorNoBackground.png' },
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
        } else if (sortBy === 'random') {
          sortedImages = shuffleArray(filteredImages);
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
          <Image
            src={image.src}
            alt={image.alt}
            width={400}
            height={400}
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
