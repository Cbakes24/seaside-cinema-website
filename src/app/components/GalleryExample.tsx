'use client';

import Gallery from './Gallery';

const GalleryExample: React.FC = () => {
  return (
    <div className="space-y-8 p-6">
      <div>
        <h2 className="text-2xl font-bold mb-4">Default Gallery</h2>
        <Gallery />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Limited Images (6 max)</h2>
        <Gallery maxImages={6} />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Custom Grid Layout</h2>
        <Gallery 
          gridCols={{
            sm: 1,
            md: 2,
            lg: 3,
            xl: 4,
            '2xl': 5
          }}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">16:9 Aspect Ratio</h2>
        <Gallery 
          aspectRatio="16/9"
          maxImages={8}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">Custom Images</h2>
        <Gallery 
          autoLoad={false}
          images={[
            { src: '/poolsBday7.jpg', alt: 'Pool Birthday 7', filename: 'poolsBday7.jpg' },
            { src: '/vday1.jpg', alt: 'Valentine Day 1', filename: 'vday1.jpg' },
            { src: '/vday2.jpg', alt: 'Valentine Day 2', filename: 'vday2.jpg' },
            { src: '/vday3.jpg', alt: 'Valentine Day 3', filename: 'vday3.jpg' },
          ]}
          gridCols={{
            sm: 2,
            md: 2,
            lg: 4,
            xl: 4,
            '2xl': 4
          }}
        />
      </div>

      <div>
        <h2 className="text-2xl font-bold mb-4">JPEG Only</h2>
        <Gallery 
          imageExtensions={['.jpg', '.jpeg', '.JPG', '.JPEG']}
          maxImages={10}
        />
      </div>
    </div>
  );
};

export default GalleryExample; 
