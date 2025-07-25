"use client"

import Image from "next/image";
import React, { useState } from "react";

export default function ExperiencePage() {
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
    <section className="py-20 px-6 bg-sand text-center">
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

      <h2 className="text-2xl sm:text-4xl font-bold text-teal mb-8">
        Our Experience Offerings
      </h2>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {/* Bali by the Bay */}
        <div>
          <div className="relative w-full max-w-[400px] h-[250px] mx-auto mb-4 overflow-hidden rounded-xl group">
            <Image
              src="/bayview_behind.jpg"
              alt="Bali by the Bay"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-teal mb-2">Bali by the Bay</h3>
          <p className="text-sm text-teal">
            Transport to Bali with this romantic, insta-worthy setup. Includes macrame pillows, cozy blankets and high-end boho-chic decor. No filter needed! Click above for more info and pricing.
          </p>
        </div>

        {/* Classic */}
        <div>
          <div className="relative w-full max-w-[400px] h-[250px] mx-auto mb-4 overflow-hidden rounded-xl group">
            <Image
              src="/verticalSunset.jpeg"
              alt="Classic"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-teal mb-2">Classic</h3>
          <p className="text-sm text-teal">
            Imagine mashing up your favorite childhood fort with a movie theater. Comfortable seating, big screen, toes in the sand... you get the picture. Click above for more info & pricing.
          </p>
        </div>

        {/* Proper Picnic */}
        <div>
          <div className="relative w-full max-w-[400px] h-[250px] mx-auto mb-4 overflow-hidden rounded-xl group">
            <Image
              src="/verticalPicnic.jpeg"
              alt="Proper Picnic"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-teal mb-2">Proper Picnic</h3>
          <p className="text-sm text-teal">
            Sick of Netflix but still want to chill? Then our picnics are perfect for you! Get cozy with our IG-worthy picnics and the perfect SD backdrop to make all your followers jelly. Click above for more info & pricing.
          </p>
        </div>

        {/* Pumpkin Spice */}
        <div>
          <div className="relative w-full max-w-[400px] h-[250px] mx-auto mb-4 overflow-hidden rounded-xl group">
            <Image
              src="/IMG_1255.jpeg"
              alt="Pumpkin Spice"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-teal mb-2">Pumpkin Spice</h3>
          <p className="text-sm text-teal">
            Embrace the cozy vibes of autumn with our Fall Movie Night at the bay. Picture yourself under the stars, surrounded by pumpkins, rustic lanterns, and warm, earthy tones of autumn decor. Perfect for families, friends, or a romantic night.
          </p>
        </div>

        {/* Valentines */}
        <div>
          <div className="relative w-full max-w-[400px] h-[250px] mx-auto mb-4 overflow-hidden rounded-xl group">
            <Image
              src="/vday3.jpg"
              alt="Valentines"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-teal mb-2">Valentines Day</h3>
          <p className="text-sm text-teal">
            Our Valentine’s Day Movie Night offers the perfect ambiance — surrounded by the glow of candles, roses, and chocolates. Whether you’re watching a romance classic or a film that means something to you, it’s a truly unforgettable experience.
          </p>
        </div>

        {/* Holidays */}
        <div>
          <div className="relative w-full max-w-[400px] h-[250px] mx-auto mb-4 overflow-hidden rounded-xl group">
            <Image
              src="/holiday1.JPG"
              alt="Holiday Movie Night"
              fill
              className="object-cover"
            />
          </div>
          <h3 className="text-xl font-semibold text-teal mb-2">Holidays</h3>
          <p className="text-sm text-teal">
            Celebrate the magic of the season with our Christmas Movie Night experience — twinkling lights, trees, cozy blankets, and the bay as your backdrop. Perfect for creating memories with loved ones in a whimsical holiday setting.
          </p>
        </div>
      </div>
    </section>
  );
}
