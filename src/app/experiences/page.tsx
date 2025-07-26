"use client"

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";

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

      <h2 className="text-2xl sm:text-4xl font-bold text-teal mb-8">
        Our Experience Offerings
      </h2>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {/* Bali by the Bay */}
        <Link href="/book?package=bali" className="group">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="relative w-full max-w-[400px] h-[250px] mx-auto overflow-hidden">
              <Image
                src="/bayview_behind.jpg"
                alt="Bali by the Bay"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-teal mb-2 group-hover:text-orange transition-colors">Bali by the Bay</h3>
              <p className="text-sm text-teal">
                Transport to Bali with this romantic, insta-worthy setup. Includes macrame pillows, cozy blankets and high-end boho-chic decor. No filter needed! Click to book this experience.
              </p>
            </div>
          </div>
        </Link>

        {/* Classic */}
        <Link href="/book?package=classic" className="group">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="relative w-full max-w-[400px] h-[250px] mx-auto overflow-hidden">
              <Image
                src="/verticalSunset.jpeg"
                alt="Classic"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-teal mb-2 group-hover:text-orange transition-colors">Classic</h3>
              <p className="text-sm text-teal">
                Imagine mashing up your favorite childhood fort with a movie theater. Comfortable seating, big screen, toes in the sand... you get the picture. Click to book this experience.
              </p>
            </div>
          </div>
        </Link>

        {/* Proper Picnic */}
        <Link href="/book?package=picnic" className="group">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="relative w-full max-w-[400px] h-[250px] mx-auto overflow-hidden">
              <Image
                src="/verticalPicnic.jpeg"
                alt="Proper Picnic"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-teal mb-2 group-hover:text-orange transition-colors">Proper Picnic</h3>
              <p className="text-sm text-teal">
                Sick of Netflix but still want to chill? Then our picnics are perfect for you! Get cozy with our IG-worthy picnics and the perfect SD backdrop to make all your followers jelly. Click to book this experience.
              </p>
            </div>
          </div>
        </Link>

        {/* Pumpkin Spice */}
        <Link href="/book?package=seasonal" className="group">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="relative w-full max-w-[400px] h-[250px] mx-auto overflow-hidden">
              <Image
                src="/IMG_1255.jpeg"
                alt="Pumpkin Spice"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-teal mb-2 group-hover:text-orange transition-colors">Pumpkin Spice</h3>
              <p className="text-sm text-teal">
                Embrace the cozy vibes of autumn with our Fall Movie Night at the bay. Picture yourself under the stars, surrounded by pumpkins, rustic lanterns, and warm, earthy tones of autumn decor. Perfect for families, friends, or a romantic night.
              </p>
            </div>
          </div>
        </Link>

        {/* Valentines */}
        <Link href="/book?package=proposal" className="group">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="relative w-full max-w-[400px] h-[250px] mx-auto overflow-hidden">
              <Image
                src="/vday3.jpg"
                alt="Valentines"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-teal mb-2 group-hover:text-orange transition-colors">Valentine&apos;s Day</h3>
              <p className="text-sm text-teal">
                Our Valentine&apos;s Day Movie Night offers the perfect ambiance — surrounded by the glow of candles, roses, and chocolates. Whether you&apos;re watching a romance classic or a film that means something to you, it&apos;s a truly unforgettable experience.
              </p>
            </div>
          </div>
        </Link>

        {/* Holidays */}
        <Link href="/book?package=birthday" className="group">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="relative w-full max-w-[400px] h-[250px] mx-auto overflow-hidden">
              <Image
                src="/holiday1.JPG"
                alt="Holiday Movie Night"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-teal mb-2 group-hover:text-orange transition-colors">Holidays</h3>
              <p className="text-sm text-teal">
                Celebrate the magic of the season with our Christmas Movie Night experience — twinkling lights, trees, cozy blankets, and the bay as your backdrop. Perfect for creating memories with loved ones in a whimsical holiday setting.
              </p>
            </div>
          </div>
        </Link>
      </div>
    </section>
  );
}
