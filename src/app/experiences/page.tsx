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
      <Image
        src="/verticalSunset.jpeg"
        alt="Classic Setup"
        width={400}
        height={250}
        className="rounded-xl mx-auto mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold text-teal mb-2">Classic Setup</h3>
      <p className="text-teal">
        Experience the timeless elegance of our classic setup, perfect for any occasion.
      </p>
    </div>
    {/* The Bali */}
    <div>
      <Image
        src="/bayview_behind.jpg"
        alt="The Bali"
        width={400}
        height={250}
        className="rounded-xl mx-auto mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold text-teal mb-2">The Bali</h3>
      <p className="text-teal">
        Immerse yourself in a tropical paradise with our Bali-inspired setup.
      </p>
    </div>
    {/* Large Group Corporate Events */}
    <div>
      <Image
        src="/big_bali.JPG"
        alt="Corporate Events"
        width={400}
        height={250}
        className="rounded-xl mx-auto mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold text-teal mb-2">Corporate Events</h3>
      <p className="text-teal">
        Tailored experiences for large groups and corporate gatherings.
      </p>
    </div>
    {/* Picnic */}
    <div>
      <Image
        src="/verticalPicnic.jpeg"
        alt="Picnic"
        width={400}
        height={250}
        className="rounded-xl mx-auto mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold text-teal mb-2">Picnic</h3>
      <p className="text-teal">
        Enjoy a delightful picnic with our curated setups in beautiful locations.
      </p>
    </div>
    {/* Birthday Package */}
    <div className="w-4/5 mx-auto">
      <Image
        src="/poolsBday5.JPG"
        alt="Birthday Package"
        width={400}
        height={250}
        className="rounded-xl mx-auto mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold text-teal mb-2">Birthday Package</h3>
      <p className="text-teal">
        Celebrate your special day with our birthday package, complete with custom add-ons.
      </p>
    </div>
    {/* Proposal Package */}
    <div>
      <Image
        src="/vday3.jpg"
        alt="Proposal Package"
        width={400}
        height={250}
        className="rounded-xl mx-auto mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold text-teal mb-2">Proposal Package</h3>
      <p className="text-teal">
        Make your proposal unforgettable with our romantic setup and add-ons.
      </p>
    </div>
    {/* Seasonal Package */}
    <div>
      <Image
        src="/IMG_1255.jpeg"
        alt="Seasonal Package"
        width={400}
        height={250}
        className="rounded-xl mx-auto mb-4 object-cover"
      />
      <h3 className="text-xl font-semibold text-teal mb-2">Seasonal Package</h3>
      <p className="text-teal">
        Enjoy the best of each season with our specially curated seasonal packages.
      </p>
    </div>
  </div>
  </section>
  )
}
