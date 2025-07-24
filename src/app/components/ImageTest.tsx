'use client';

import { useState } from 'react';

const ImageTest: React.FC = () => {
  const [testResults, setTestResults] = useState<{ [key: string]: boolean }>({});

  const testImages = [
    '/poolsBday7.jpg',
    '/vday1.jpg',
    '/projectorLogoTEAL.png',
    '/fall_decor.jpeg',
  ];

  const testImage = (src: string) => {
    const img = new Image();
    img.onload = () => {
      setTestResults(prev => ({ ...prev, [src]: true }));
      console.log(`✅ Image loaded successfully: ${src}`);
    };
    img.onerror = () => {
      setTestResults(prev => ({ ...prev, [src]: false }));
      console.error(`❌ Failed to load image: ${src}`);
    };
    img.src = src;
  };

  const runTests = () => {
    testImages.forEach(testImage);
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Image Loading Test</h3>
      
      <button 
        onClick={runTests}
        className="mb-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Test Image Loading
      </button>

      <div className="space-y-2">
        {testImages.map((src) => (
          <div key={src} className="flex items-center space-x-2">
            {/* <span className="w-4 h-4 rounded-full bg-gray-200"></span> */}
            <span className="text-sm">{src}</span>
            {testResults[src] !== undefined && (
              <span className={`text-sm ${testResults[src] ? 'text-green-600' : 'text-red-600'}`}>
                {testResults[src] ? '✅ Loaded' : '❌ Failed'}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {testImages.map((src) => (
          <div key={src} className="aspect-square bg-gray-100 rounded overflow-hidden">
            <img
              src={src}
              alt="Test"
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.style.backgroundColor = 'red';
                e.currentTarget.style.border = '2px solid red';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageTest; 
