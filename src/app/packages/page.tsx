"use client"

import React from "react";
import Image from "next/image";
import Link from "next/link";
import { packages } from "../utils/pricing";

export default function PackagesPage() {
  return (
    <main className="min-h-screen bg-peach">
      {/* Hero Section */}
      <section className="py-20 px-6 text-center bg-offwhite">
        <h1 className="text-3xl sm:text-4xl font-bold text-teal mb-4">
          Add the Whipped Cream &amp; Sprinkles
        </h1>
        <p className="text-teal max-w-2xl mx-auto text-lg">
          Once you&apos;ve selected your perfect experience, our curated packages are like the whipped cream and sprinkles on top — specially designed add-ons to make your movie night unforgettable. Whether you&apos;re planning a birthday bash, a romantic date, or a nostalgic drive-in vibe, we&apos;ve got just the thing.
        </p>
      </section>

      {/* Packages Grid */}
      <section className="py-16 px-6 bg-sand">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center">
            {/* Birthday */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src="/poolsBday5.JPG"
                  alt="Birthday Package"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    🎉 Birthday
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-teal mb-3">Birthday Package</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Celebrate with balloons, birthday signage, treat tables &amp; festive decor. Perfect for all ages.
                </p>
                <div className="text-left text-xs text-gray-500 space-y-1 mb-4">
                  {packages.find(p => p.id === 'birthday')?.includes.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-teal mr-2">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-teal">$150</span>
                  <Link
                    href="/book?package=birthday"
                    className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-orange transition text-sm"
                  >
                    Add Package
                  </Link>
                </div>
              </div>
            </div>

            {/* Romance */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src="/vday3.jpg"
                  alt="Romance Package"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    💕 Romance
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-teal mb-3">Romance Package</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Rose petals, candles, cozy blankets, and mood lighting for your dream date night.
                </p>
                <div className="text-left text-xs text-gray-500 space-y-1 mb-4">
                  {packages.find(p => p.id === 'romance')?.includes.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-teal mr-2">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-teal">$200</span>
                  <Link
                    href="/book?package=romance"
                    className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-orange transition text-sm"
                  >
                    Add Package
                  </Link>
                </div>
              </div>
            </div>

            {/* Proposal */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src="/vday3.jpg"
                  alt="Proposal Package"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    💍 Proposal
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-teal mb-3">Proposal Package</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Personalized touches for your big moment — custom signs, candles, and a little help if needed 😉
                </p>
                <div className="text-left text-xs text-gray-500 space-y-1 mb-4">
                  {packages.find(p => p.id === 'proposal')?.includes.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-teal mr-2">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-teal">$300</span>
                  <Link
                    href="/book?package=proposal"
                    className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-orange transition text-sm"
                  >
                    Add Package
                  </Link>
                </div>
              </div>
            </div>

            {/* Drive-Thru */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-48">
                <Image
                  src="/verticalSunset.jpeg"
                  alt="Drive-Thru Package"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    🍿 Drive-Thru
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-teal mb-3">Drive-Thru Package</h3>
                <p className="text-gray-600 text-sm mb-4">
                  Nostalgic movie vibes with clapboard decor, candy trays, popcorn, and retro styling.
                </p>
                <div className="text-left text-xs text-gray-500 space-y-1 mb-4">
                  {packages.find(p => p.id === 'drive-thru')?.includes.map((item, index) => (
                    <div key={index} className="flex items-center">
                      <span className="text-teal mr-2">✓</span>
                      {item}
                    </div>
                  ))}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-lg font-bold text-teal">$125</span>
                  <Link
                    href="/book?package=drive-thru"
                    className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-orange transition text-sm"
                  >
                    Add Package
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center mt-12">
            <h2 className="text-2xl font-bold text-teal mb-4">Ready to Create Your Perfect Experience?</h2>
            <p className="text-teal mb-8 max-w-2xl mx-auto">
              Choose your experience style first, then add the perfect package to make it unforgettable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/experiences"
                className="bg-teal text-white px-8 py-3 rounded-lg font-medium hover:bg-orange transition"
              >
                View Experiences
              </Link>
              <Link
                href="/book"
                className="bg-white text-teal px-8 py-3 rounded-lg font-medium hover:bg-gray-50 transition border-2 border-teal"
              >
                Start Booking
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
} 
