"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function LargeEventsPage() {
  return (
    <main className="min-h-screen bg-sand">
      {/* Hero Section */}
      <section className="relative py-20 px-6 bg-gradient-to-br from-teal to-orange text-white">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-4xl md:text-6xl font-playfair font-bold mb-6">
            Large Events &amp; Corporate Gatherings
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto">
            From intimate family celebrations to corporate team building, we create unforgettable large-scale beach movie experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-white text-teal px-8 py-4 rounded-lg font-semibold hover:bg-sand transition"
            >
              Get a Quote
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-teal transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>

      {/* Event Types */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-teal text-center mb-16">
            Perfect for Any Large Celebration
          </h2>
          
          <div className="grid gap-12 md:grid-cols-3">
            {/* Birthday Parties */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/largeBali1.jpg"
                  alt="Large Bali Event Setup"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-teal text-white px-3 py-1 rounded-full text-sm font-medium">
                    🎂 Birthday Parties
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-teal mb-4">Birthday Celebrations</h3>
                <p className="text-gray-600 mb-4">
                  Make birthdays unforgettable with our large-scale beach movie setups. Perfect for kids, teens, and adults of all ages.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• Accommodates 10-50+ guests</li>
                  <li>• Custom birthday decorations</li>
                  <li>• Movie selection for all ages</li>
                  <li>• Catering options available</li>
                </ul>
                <div className="text-center">
                  <span className="text-2xl font-bold text-teal">Get a quote</span>
                </div>
              </div>
            </div>

            {/* Corporate Events */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/Kids_birthday_photoshopped.jpg"
                  alt="Corporate Beach Event"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                    🏢 Corporate Events
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-teal mb-4">Team Building & Corporate</h3>
                <p className="text-gray-600 mb-4">
                  Unique team building experiences that combine entertainment with networking in a beautiful beach setting.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• Professional setup and service</li>
                  <li>• Corporate branding options</li>
                  <li>• Catering and beverage packages</li>
                  <li>• Flexible scheduling</li>
                </ul>
                <div className="text-center">
                  <span className="text-2xl font-bold text-teal">Reach out for a quote</span>
                </div>
              </div>
            </div>

            {/* Bachelor/Bachelorette */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden">
              <div className="relative h-64">
                <Image
                  src="/baliBdayBig.jpeg"
                  alt="Bachelor/Bachelorette Party"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    🥂 Bachelor/Bachelorette
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-teal mb-4">Bachelor & Bachelorette Parties</h3>
                <p className="text-gray-600 mb-4">
                  Celebrate the last night of freedom with a unique beach movie experience that&apos;s both fun and memorable.
                </p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  <li>• Custom themes and decorations</li>
                  <li>• Premium beverage packages</li>
                  <li>• Photo opportunities</li>
                  <li>• Flexible group sizes</li>
                </ul>
                <div className="text-center">
                  <span className="text-2xl font-bold text-teal">Get a quote</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* What's Included */}
      {/* <section className="py-20 px-6 bg-peach">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-teal text-center mb-16">
            What&apos;s Included in Large Events
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎬</span>
              </div>
              <h3 className="text-lg font-semibold text-teal mb-2">Large Screen Setup</h3>
              <p className="text-teal/80 text-sm">
                Professional projector and screen setup for groups of any size
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🪑</span>
              </div>
              <h3 className="text-lg font-semibold text-teal mb-2">Comfortable Seating</h3>
              <p className="text-teal/80 text-sm">
                Premium blankets, cushions, and seating for all guests
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">✨</span>
              </div>
              <h3 className="text-lg font-semibold text-teal mb-2">Ambient Lighting</h3>
              <p className="text-teal/80 text-sm">
                Tiki torches, string lights, and mood lighting
              </p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-3xl">🎵</span>
              </div>
              <h3 className="text-lg font-semibold text-teal mb-2">Sound System</h3>
              <p className="text-teal/80 text-sm">
                Professional audio setup for clear movie sound
              </p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Pricing Tiers */}
      {/* <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-teal text-center mb-16">
            Pricing Tiers
          </h2>
          
          <div className="grid gap-8 md:grid-cols-3"> */}
            {/* Small Group */}
            {/* <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-teal mb-2">Small Group</h3>
                <p className="text-gray-600">10-20 people</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-teal">$25</span>
                <span className="text-gray-600">/person</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-teal mr-2">✓</span>
                  <span className="text-gray-700">Basic setup and decor</span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal mr-2">✓</span>
                  <span className="text-gray-700">Movie selection</span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal mr-2">✓</span>
                  <span className="text-gray-700">2-hour event time</span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal mr-2">✓</span>
                  <span className="text-gray-700">Setup and cleanup</span>
                </li>
              </ul>
              <Link
                href="/book"
                className="w-full bg-teal text-white py-3 rounded-lg font-semibold hover:bg-orange transition text-center block"
              >
                Book Small Group
              </Link>
            </div> */}

            {/* Medium Group */}
            {/* <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-teal relative">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <span className="bg-teal text-white px-4 py-1 rounded-full text-sm font-medium">
                  Most Popular
                </span>
              </div>
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-teal mb-2">Medium Group</h3>
                <p className="text-gray-600">21-35 people</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-teal">$30</span>
                <span className="text-gray-600">/person</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-teal mr-2">✓</span>
                  <span className="text-gray-700">Enhanced setup and decor</span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal mr-2">✓</span>
                  <span className="text-gray-700">Premium movie selection</span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal mr-2">✓</span>
                  <span className="text-gray-700">3-hour event time</span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal mr-2">✓</span>
                  <span className="text-gray-700">Basic catering options</span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal mr-2">✓</span>
                  <span className="text-gray-700">Event coordinator</span>
                </li>
              </ul>
              <Link
                href="/book"
                className="w-full bg-teal text-white py-3 rounded-lg font-semibold hover:bg-orange transition text-center block"
              >
                Book Medium Group
              </Link>
            </div> */}

            {/* Large Group */}
            {/* <div className="bg-white rounded-xl shadow-lg p-8 border-2 border-gray-100">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold text-teal mb-2">Large Group</h3>
                <p className="text-gray-600">36-50+ people</p>
              </div>
              <div className="text-center mb-6">
                <span className="text-4xl font-bold text-teal">$35</span>
                <span className="text-gray-600">/person</span>
              </div>
              <ul className="space-y-3 mb-8">
                <li className="flex items-center">
                  <span className="text-teal mr-2">✓</span>
                  <span className="text-gray-700">Premium setup and decor</span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal mr-2">✓</span>
                  <span className="text-gray-700">Full catering options</span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal mr-2">✓</span>
                  <span className="text-gray-700">4-hour event time</span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal mr-2">✓</span>
                  <span className="text-gray-700">Dedicated event manager</span>
                </li>
                <li className="flex items-center">
                  <span className="text-teal mr-2">✓</span>
                  <span className="text-gray-700">Custom branding options</span>
                </li>
              </ul>
              <Link
                href="/book"
                className="w-full bg-teal text-white py-3 rounded-lg font-semibold hover:bg-orange transition text-center block"
              >
                Book Large Group
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      {/* Gallery Section */}
      <section className="py-20 px-6 bg-peach">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-teal text-center mb-16">
            Large Event Gallery
          </h2>
          
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/largeBali1.jpg"
                alt="Large Bali Event Setup"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/Lowlarge_classic.jpeg"
                alt="Corporate Beach Event"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/Low_largeBali3.jpeg"
                alt="Large Group Celebration"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/Kids_birthday_photoshopped.jpg"
                alt="Kids Birthday Party"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg">
              <Image
                src="/Kids_birthday_2photoshopped.jpg"
                alt="Large Birthday Celebration"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="relative h-64 rounded-xl overflow-hidden shadow-lg bg-teal/10 flex items-center justify-center">
              <div className="text-center text-teal">
                <p className="text-lg font-semibold">More Photos</p>
                <p className="text-sm">Coming Soon</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Add-ons Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold text-teal text-center mb-16">
            Custom Add-Ons for Large Events
          </h2>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center mb-4">
                <span className="text-4xl">🍽️</span>
              </div>
              <h3 className="text-xl font-semibold text-teal mb-3 text-center">Catering Packages</h3>
              <p className="text-gray-600 text-center mb-4">
                From light snacks to full catering, we can accommodate and recommend any dietary needs.
              </p>
              <div className="text-center">
                {/* <span className="text-lg font-bold text-teal">Get a quote</span> */}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center mb-4">
                <span className="text-4xl">🎨</span>
              </div>
              <h3 className="text-xl font-semibold text-teal mb-3 text-center">Custom Decorations</h3>
              <p className="text-gray-600 text-center mb-4">
                Themed decorations, banners, and personalized touches for your event.
              </p>
              <div className="text-center">
                {/* <span className="text-lg font-bold text-teal">Starting at $50</span> */}
              </div>
            </div>
            
            <div className="bg-white p-6 rounded-xl shadow-lg">
              <div className="text-center mb-4">
                <span className="text-4xl">📸</span>
              </div>
              <h3 className="text-xl font-semibold text-teal mb-3 text-center">Photography</h3>
              <p className="text-gray-600 text-center mb-4">
                Professional photography to capture and edit your special moments.
              </p>
              <div className="text-center">
                {/* <span className="text-lg font-bold text-teal">Starting at $200</span> */}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-teal text-white text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-playfair font-bold mb-6">
            Ready to Plan Your Large Event?
          </h2>
          <p className="text-xl mb-8">
            Let us create an unforgettable experience for your group. Contact us for a custom quote and consultation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-white text-teal px-8 py-4 rounded-lg font-semibold hover:bg-sand transition"
            >
              Get Started
            </Link>
            <Link
              href="/contact"
              className="border-2 border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-teal transition"
            >
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
