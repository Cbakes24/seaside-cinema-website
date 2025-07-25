import Image from "next/image";
import React from "react";

export default function ExperiencePage() {

  return (
    <section className="py-20 px-6 bg-offwhite text-center">
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
