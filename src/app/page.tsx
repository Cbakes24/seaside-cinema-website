import Image from "next/image";
import React from "react";
import GalleryExample from "./components/GalleryExample";
import Gallery from "./components/Gallery";

export default function Home() {
  return (
    <main className="w-full">
      {/* Hero Section with Parallax */}

      <section className="relative h-[90vh] w-full">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white">
          <h1 className="text-3xl text-peach sm:text-5xl font-semibold leading-tight drop-shadow-md">
            Luxury Beach Movie Nights
          </h1>
          <p className="mt-4 text-base sm:text-lg max-w-xl drop-shadow-sm text-offwhite">
            Curated sunset experiences on the San Diego bay. Movie magic, cozy
            vibes, unforgettable memories.
          </p>
          <a
            href="/book"
            className="mt-6 bg-offwhite inline-block text-teal px-6 py-3 rounded-lg font-medium hover:bg-sand transition"
          >
            Book Your Experience
          </a>
        </div>
      </section>
      {/* Content Section 1 */}
      <section className="py-20 px-6 bg-offwhite h-100 text-center">
        <h2 className="text-2xl sm:text-4xl text-teal font-bold text-orange">
          An Unforgettable Experience
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-teal">
          Whether its a romantic date, girls night, or special celebration, we
          create cozy, curated memories that last.
        </p>
      </section>
  <section className="py-16 px-6 bg-sand grid gap-12 md:grid-cols-3 text-center">
        {/* Movie Nights */}
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
        {/* Parties */}
        <div>
          <Image
            src="/poolsBday5.JPG"
            alt="Beach Party"
            width={400}
            height={250}
            className="rounded-xl mx-auto mb-4 object-cover"
          />
          <h3 className="text-xl font-semibold text-teal mb-2">Parties & Celebrations</h3>
          <p className="text-teal">
            Celebrate birthdays, engagements, or any special occasion with a unique beachside cinema experience.
          </p>
        </div>
        {/* San Diego Local */}
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
          Relax. Well Handle the Details.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-teal">
          We bring the picnic, the movie setup, and the magic. You just show up
          and enjoy.
        </p>
      </section>
        <Gallery aspectRatio="16/9" gridCols={{
        sm: 1,
        md: 2,
        lg: 3,
        xl: 4,
        '2xl': 5
      }}  showLoading={false}  
       maxImages={5}/>
    </main>
  );
}
