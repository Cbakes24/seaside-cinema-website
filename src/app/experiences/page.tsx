"use client"

import Image from "next/image";
import React from "react";
import { useState } from "react";

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
            const fanWidth = (rotations.length -2) * offset + imageWidth;
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
                  top: `${Math.abs(idx - 2) * 32}px`, //fan shape***
                  transform: `rotate(${isActive ? 0 : deg}deg)  translateY(${isActive ? "-55px" : "0"})`,
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
        {/* Classic Setup */}
        <div>
          <div className="group relative w-full max-w-[400px] h-[250px] mx-auto mb-4 overflow-hidden rounded-xl">
            <Image
              src="/verticalSunset.jpeg"
              alt="Classic Setup"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-center p-4">
              <p className="text-sm">
                Experience the timeless elegance of our classic setup, perfect for any occasion.
              </p>
            </div>
            <button className="absolute inset-0 opacity-0 focus:outline-none" aria-label="View description" />
          </div>
          <h3 className="text-xl font-semibold text-teal mb-2">Classic Setup</h3>
        </div>

        {/* The Bali */}
        <div>
          <div className="group relative w-full max-w-[400px] h-[250px] mx-auto mb-4 overflow-hidden rounded-xl">
            <Image
              src="/bayview_behind.jpg"
              alt="The Bali"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-center p-4">
              <p className="text-sm">
                Immerse yourself in a tropical paradise with our Bali-inspired setup.
              </p>
            </div>
            <button className="absolute inset-0 opacity-0 focus:outline-none" aria-label="View description" />
          </div>
          <h3 className="text-xl font-semibold text-teal mb-2">The Bali</h3>
        </div>

        {/* Corporate Events */}
        <div>
          <div className="group relative w-full max-w-[400px] h-[250px] mx-auto mb-4 overflow-hidden rounded-xl">
            <Image
              src="/big_bali.JPG"
              alt="Corporate Events"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-center p-4">
              <p className="text-sm">
                Tailored experiences for large groups and corporate gatherings.
              </p>
            </div>
            <button className="absolute inset-0 opacity-0 focus:outline-none" aria-label="View description" />
          </div>
          <h3 className="text-xl font-semibold text-teal mb-2">Corporate Events</h3>
        </div>

        {/* Picnic */}
        <div>
          <div className="group relative w-full max-w-[400px] h-[250px] mx-auto mb-4 overflow-hidden rounded-xl">
            <Image
              src="/verticalPicnic.jpeg"
              alt="Picnic"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-center p-4">
              <p className="text-sm">
                Enjoy a delightful picnic with our curated setups in beautiful locations.
              </p>
            </div>
            <button className="absolute inset-0 opacity-0 focus:outline-none" aria-label="View description" />
          </div>
          <h3 className="text-xl font-semibold text-teal mb-2">Picnic</h3>
        </div>

        {/* Birthday Package */}
        <div>
          <div className="group relative w-full max-w-[400px] h-[250px] mx-auto mb-4 overflow-hidden rounded-xl">
            <Image
              src="/poolsBday5.JPG"
              alt="Birthday Package"
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 group-focus-within:opacity-100 transition-opacity duration-300 flex items-center justify-center text-white text-center p-4">
              <p className="text-sm">
                Celebrate your special day with our birthday package, complete with custom add-ons.
              </p>
            </div>
            <button className="absolute inset-0 opacity-0 focus:outline-none" aria-label="View description" />
          </div>
          <h3 className="text-xl font-semibold text-teal mb-2">Birthday Package</h3>
        </div>
      </div>

      
    </section>
  );
}
