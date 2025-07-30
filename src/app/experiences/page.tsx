"use client"

import Image from "next/image";
import React, { useState } from "react";
import Link from "next/link";
import {
  experiences,
  formatPrice,
  getExperienceById,
} from "../utils/pricing";

export default function ExperiencePage() {
  const rotations = [-30, -15, 0, 15, 30];
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [eventImages, setEventImages] = useState([
    "/vday3.jpeg",
    "/largeBali1.jpg",
    "/fall_night_back.jpeg",
    "/poolsBday5Large.jpeg",
    "/verticalSunset.jpeg",

  ]);

  return (
    <section className="py-20 px-6 bg-sand text-center">

      <h2 className="text-2xl sm:text-4xl font-bold text-teal mb-8">
        Our Experience Offerings
      </h2>

      <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-3">
        {/* Bali by the Bay */}
        <div className="group">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="relative w-full md:max-w-[600px] h-[250px] mx-auto overflow-hidden">
              <Image
                src="/bayview_behindLow.jpeg"
                alt="Bali by the Bay"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-teal mb-2 group-hover:text-orange transition-colors">Bali by the Bay</h3>
              <p className="text-sm text-teal mb-4">
                Transport to Bali with this romantic, insta-worthy setup. Includes macrame pillows, cozy blankets and high-end boho-chic decor. No filter needed!
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-teal">
                  {formatPrice(getExperienceById("bali")?.price || 399)}
                </span>
                <Link
                  href="/book?experience=bali"
                  className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-orange transition text-sm font-medium"
                >
                  Select Experience
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Classic */}
        <div className="group">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="relative w-full md:max-w-[600px] h-[250px] mx-auto overflow-hidden">
              <Image
                src="/verticalSunset.jpeg"
                alt="Classic"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-teal mb-2 group-hover:text-orange transition-colors">Classic</h3>
              <p className="text-sm text-teal mb-4">
                Imagine mashing up your favorite childhood fort with a movie theater. Comfortable seating, big screen, toes in the sand... you get the picture.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-teal">
                  {formatPrice(getExperienceById("classic")?.price || 299)}
                </span>
                <Link
                  href="/book?experience=classic"
                  className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-orange transition text-sm font-medium"
                >
                  Select Experience
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Proper Picnic */}
        <div className="group">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="relative w-full md:max-w-[600px] h-[250px] mx-auto overflow-hidden">
              <Image
                src="/verticalPicnic.jpeg"
                alt="Proper Picnic"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-teal mb-2 group-hover:text-orange transition-colors">Proper Picnic</h3>
              <p className="text-sm text-teal mb-4">
                Sick of Netflix but still want to chill? Then our picnics are perfect for you! Get cozy with our IG-worthy picnics and the perfect SD backdrop to make all your followers jelly.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-teal">
                  {formatPrice(getExperienceById("picnic")?.price || 399)}
                </span>
                <Link
                  href="/book?experience=picnic"
                  className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-orange transition text-sm font-medium"
                >
                  Select Experience
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Pumpkin Spice */}
        <div className="group">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="relative w-full md:max-w-[600px] h-[250px] mx-auto overflow-hidden">
              <Image
                src="/fall_night_back.jpeg"
                alt="Pumpkin Spice"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-teal mb-2 group-hover:text-orange transition-colors">Pumpkin Spice</h3>
              <p className="text-sm text-teal mb-4">
                Embrace the cozy vibes of autumn with our Fall Movie Night at the bay. Picture yourself under the stars, surrounded by pumpkins, rustic lanterns, and warm, earthy tones of autumn decor. Perfect for families, friends, or a romantic night.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-teal">
                  {formatPrice(getExperienceById("halloween")?.price || 449)}
                </span>
                <Link
                  href="/book?experience=halloween"
                  className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-orange transition text-sm font-medium"
                >
                  Select Experience
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Valentines */}
        <div className="group">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="relative w-full md:max-w-[600px] h-[250px] mx-auto overflow-hidden">
              <Image
                src="/vday3.jpeg"
                alt="Valentines"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-teal mb-2 group-hover:text-orange transition-colors">Valentine&apos;s Day</h3>
              <p className="text-sm text-teal mb-4">
                Our Valentine&apos;s Day Movie Night offers the perfect ambiance — surrounded by the glow of candles, roses, and chocolates. Whether you&apos;re watching a romance classic or a film that means something to you, it&apos;s a truly unforgettable experience.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-teal">
                  {formatPrice(getExperienceById("valentines")?.price || 599)}
                </span>
                <Link
                  href="/book?experience=valentines"
                  className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-orange transition text-sm font-medium"
                >
                  Select Experience
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Holidays */}
        <div className="group">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:scale-105">
            <div className="relative w-full md:max-w-[600px] h-[250px] mx-auto overflow-hidden">
              <Image
                src="/holiday1.JPG"
                alt="Holiday Movie Night"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-300"
              />
            </div>
            <div className="p-6">
              <h3 className="text-xl font-semibold text-teal mb-2 group-hover:text-orange transition-colors">Holidays</h3>
              <p className="text-sm text-teal mb-4">
                Celebrate the magic of the season with our Christmas Movie Night experience — twinkling lights, trees, cozy blankets, and the bay as your backdrop. Perfect for creating memories with loved ones in a whimsical holiday setting.
              </p>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-teal">
                  {formatPrice(getExperienceById("christmas")?.price || 449)}
                </span>
                <Link
                  href="/book?experience=christmas"
                  className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-orange transition text-sm font-medium"
                >
                  Select Experience
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
