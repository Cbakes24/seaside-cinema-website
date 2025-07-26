"use client"

import Image from "next/image";
import React, { useEffect, useState } from "react";
import Gallery from "../components/Gallery";

export default function Home() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="w-full">
      {/* Hero Section with Parallax */}
      <section className="relative h-[90vh] w-full overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-100"
          style={{ transform: 'translateY(-10px)' }}
        >
          <source src="/LoveBoat3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div 
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white"
          style={{ transform: `translateY(${scrollY * 0.3}px)`, transition: 'transform 1s ease-out' }}
        >
          <h1 
            className="text-3xl text-peach sm:text-5xl font-semibold leading-tight drop-shadow-md"
            style={{ transform: `translateY(${scrollY * 0.1}px)`, transition: 'transform 0.01s ease-in' }}
          >
            Luxury Beach Movie Nights
          </h1>
          <p 
            className="mt-4 text-base sm:text-lg max-w-xl drop-shadow-sm text-offwhite"
            style={{ transform: `translateY(${scrollY * 0.1}px)`, transition: 'transform .01s ease-in' }}
          >
            Curated sunset experiences on the San Diego bay. Movie magic, cozy
            vibes, unforgettable memories.
          </p>
          <a
            href="/book"
            className="mt-6 bg-offwhite inline-block text-teal px-6 py-3 rounded-lg font-medium hover:bg-sand transition"
            style={{ transform: `translateY(${scrollY * 0.1}px)`, transition: 'transform 0.001s ease-in' }}
          >
            Book Your Experience
          </a>
        </div>
      </section>

      {/* Value Proposition */}
      <section className="py-16 px-6 bg-sand text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-orange mb-4">
          Effortless Luxury, Unforgettable Memories
        </h2>
        <p className="max-w-xl mx-auto text-teal">
          Seaside Cinema brings luxury pop-up picnics and outdoor movie nights to the beaches and bays of San Diego. We set it all up — you show up and enjoy.
        </p>
      </section>

      {/* Features / What We Offer */}
      <section className="py-16 px-6 bg-offwhite grid gap-12 md:grid-cols-2 lg:grid-cols-4 text-center">
        <div>
          <Image src="/icon-movie.png" alt="Movie Nights" width={60} height={60} className="mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-teal mb-2">Outdoor Movie Nights</h3>
          <p className="text-teal">Watch your favorite films by the water, wrapped in cozy blankets under the stars.</p>
        </div>
        <div>
          <Image src="/icon-picnic.png" alt="Picnic Setups" width={60} height={60} className="mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-teal mb-2">Curated Picnics</h3>
          <p className="text-teal">Stylish and comfy setups for dates, birthdays, or relaxing days by the bay.</p>
        </div>
        <div>
          <Image src="/icon-decor.png" alt="Custom Add-Ons" width={60} height={60} className="mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-teal mb-2">Custom Add-Ons</h3>
          <p className="text-teal">Tiki torches, charcuterie boards, blankets, and more to elevate your event.</p>
        </div>
        <div>
          <Image src="/icon-calendar.png" alt="Seasonal Themes" width={60} height={60} className="mx-auto mb-4" />
          <h3 className="text-xl font-semibold text-teal mb-2">Seasonal Themes</h3>
          <p className="text-teal">Fall vibes, Valentines romance, or holiday magic — we theme it to the season.</p>
        </div>
      </section>

      {/* Gallery & Existing Content */}
      <section className="py-20 px-6 bg-offwhite text-center">
        <h2 className="text-2xl sm:text-4xl text-teal font-bold text-orange">
          An Unforgettable Experience
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-teal">
          Whether its a romantic date, girls night, or special celebration, we
          create cozy, curated memories that last.
        </p>
      </section>

      <section className="py-16 px-6 bg-sand grid gap-12 md:grid-cols-3 text-center">
        <div>
          <Image
            src="/fall_night_back.jpeg"
            alt="Outdoor Movie Night"
            width={400}
            height={250}
            className="rounded-xl mx-auto mb-4 object-cover"
          />
          <h3 className="text-xl font-semibold text-teal mb-2">Movie Nights</h3>
          <p className="text-teal">
            Enjoy classic films under the stars with cozy blankets, popcorn, and the sound of waves nearby.
          </p>
        </div>
        <div>
          <Image
            src="/poolsBday5.JPG"
            alt="Beach Party"
            width={400}
            height={250}
            className="rounded-xl mx-auto mb-4 object-cover"
          />
          <h3 className="text-xl font-semibold text-teal mb-2">Parties &amp; Celebrations</h3>
          <p className="text-teal">
            Celebrate birthdays, engagements, or any special occasion with a unique beachside cinema experience.
          </p>
        </div>
        <div>
          <Image
            src="/fall_decor3.jpeg"
            alt="San Diego Local"
            width={400}
            height={250}
            className="rounded-xl mx-auto mb-4 object-cover"
          />
          <h3 className="text-xl font-semibold text-teal mb-2">San Diego Local</h3>
          <p className="text-teal">
            Proudly serving the San Diego community with curated events that highlight our beautiful coastline.
          </p>
        </div>
      </section>

      {/* Second Parallax Section */}
      <section
        className="relative h-[60vh] w-full bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/verticalPicnic.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex items-center justify-center text-center text-offwhite px-6">
          <h2 className="text-3xl text-peach sm:text-5xl font-semibold drop-shadow-md">
            Custom Packages For Any Occasion
          </h2>
        </div>
      </section>

      {/* Content Section 2 */}
      <section className="py-20 px-6 bg-sand text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-orange">
          Relax. We’ll Handle the Details.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-teal">
          We bring the picnic, the movie setup, and the magic. You just show up
          and enjoy.
        </p>
      </section>

      <Gallery className="w-full h-full object-cover p-5" />
      {/* <GalleryExample />
      <ImageTest /> */}
      {/* <SimpleGallery /> */}
    </main>
  );
}
