"use client"

import React, { useState } from 'react'
import Image from "next/image";

function ImageFan() {
    const rotations = [-30, -15, 0, 15, 30];
    const [activeIdx, setActiveIdx] = useState<number | null>(null);
    const [eventImages, setEventImages] = useState([
      "/vday3.jpg",
      "/big_bali.JPG",
      "/IMG_1255.jpeg",
      "/poolsBday5.JPG",
      "/verticalSunset.jpeg",
  
    ]);

  return (
      <div className="relative w-40 max-w-[320px] aspect-square mx-auto flex justify-center items-center mb-25 sm:mb-14 sm:w-80 lg:mb-20">
        {rotations.map((deg: number, idx: number) => {
          const isActive = activeIdx === idx;
          let offset = 50, imageWidth = 60;
          if (typeof window !== 'undefined') {
            if (window.innerWidth >= 1024) { offset = 100; imageWidth = 240; }
            else if (window.innerWidth >= 640) { offset = 40; imageWidth = 60; }
          }
          const fanWidth = (rotations.length - 2) * offset + imageWidth;
          const leftPx = idx * offset - (fanWidth - imageWidth) / 1.5;
          return (
            <Image
              key={idx}
              src={eventImages[idx]}
              alt="Sunset"
              fill
              className="object-cover rounded-lg shadow-md p-5 bg-offwhite absolute top-0 left-0 transition-transform duration-300 cursor-pointer"
              style={{
                zIndex: isActive ? 300 : idx,
                left: `${leftPx}px`,
                top: `${Math.abs(idx - 2) * 32}px`,
                transform: `rotate(${isActive ? 0 : deg}deg) translateY(${isActive ? "-55px" : "0"})`,
                pointerEvents: isActive ? 'none' : 'auto',
              }}
              onMouseEnter={() => setActiveIdx(idx)}
              onMouseLeave={() => setActiveIdx(null)}
              onClick={() => setActiveIdx(idx)}
            />
          );
        })}
      </div>
  )
}

export default ImageFan
