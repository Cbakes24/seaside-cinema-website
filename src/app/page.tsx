"use client";
export const dynamic = "force-dynamic";

import Image from "next/image";
import React from "react";
import { useEffect, useState, useRef } from "react";
import Link from "next/link";
import Gallery from "./components/Gallery";
import InstagramSection from "./components/InstagramSection";
import FallDiscountModal from "./components/FallDiscountModal";
import BirthdayCarousel from "./components/BirthdayCarousel";
import SummerSaleModal from "./components/FallDiscountModal";
import ValentinesDayModal from "./components/ValentinesDayModal";

import {
  packages,
  addons,
  calculateTotal,
  formatPrice,
  getPackageById,
  getAddonById,
  experiences,
  getExperienceById,
  seasonalOptions,
  getSeasonalById,
} from "./utils/pricing";
import { flag } from "@vercel/flags/next";
//vercel flag test
// const vercelFlag: any = flag<boolean>({
//   key: "vercel-flag-test",
//   defaultValue: false,
//   decide(): boolean {
//     return true;
//   },
// });


export default function Home() {
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);
// const flag:boolean = await vercelFlag.get()
  // Birthday images array
  const birthdayImages = [
    {
      src: "/Kids_birthday_photoshopped.jpg",
      alt: "Birthday Celebration",
      label: "Birthday Celebration",
    },
    {
      src: "/Kids_birthday_2photoshopped.jpg",
      alt: "Kids Birthday Party",
      label: "Kids Birthday Party",
    },
    {
      src: "/poolsBday5Large.jpeg",
      alt: "Poolside Birthday",
      label: "Poolside Birthday",
    },
    {
      src: "/bali_bday_nightLow.jpeg",
      alt: "Bali Night Birthday",
      label: "Bali Night Birthday",
    },
    {
      src: "/Low_classic_large_birthday.jpeg",
      alt: "Classic Large Birthday",
      label: "Classic Large Birthday",
    },
    {
      src: "/Low_L_bday_classic.jpeg",
      alt: "L Birthday Classic",
      label: "L Birthday Classic",
    },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // useEffect(() => {
  //   const playVideo = async () => {
  //     if (videoRef.current) {
  //       try {
  //         await videoRef.current.play();
  //       } catch (err) {
  //         console.warn("Autoplay failed:", err);
  //       }
  //     }
  //   };

  //   playVideo();
  // }, []);

  // useEffect(() => {
  //   const playVideo = async () => {
  //     if (videoRef.current) {
  //       try {
  //         // small delay gives browser time to "settle" after hydration
  //         setTimeout(() => {
  //           videoRef.current?.play().catch(err => {
  //             console.warn("Autoplay blocked:", err);
  //           });
  //         }, 300);
  //       } catch (err) {
  //         console.warn("Autoplay failed:", err);
  //       }
  //     }
  //   };

  //   playVideo();
  // }, []);

  return (
    <main className="w-full">


 {/* MODALS */}
      {/* Summer Sale Modal */}
      {/* <ValentinesDayModal /> */}
      {/* <SummerSaleModal /> */}
      

      
      {/* Insterting CSS with this line of code, can apply to sections by the id of the element as #(whatever id). */}
{/* <style jsx>{`
  #HeroSection,
  #HeroSection video,
   #HeroSection h1,
  #InstagramSection section{
  margin-top: 30px;
  padding-top: 30px;
  border: 10px solid red;
  background-color: blue;
  }
`}</style> */}
      {/* Fall Discount Modal */}
      {/* <FallDiscountModal /> */}

      {/* Hero Section with Parallax */}
      <section className="relative h-[90vh] w-full overflow-hidden" id="HeroSection">
        {/* <Image src="/verticalSunset.jpeg" alt="Sunset" fill className="object-cover" /> */}
        <video
          // poster="/verticalSunset.jpeg"
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover scale-100"
          style={{ transform: "translateY(-1px)" }}
        >
          <source src="/LoveBoat3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div
          className="relative z-10 h-full flex flex-col items-center justify-start mt-30 text-center px-6 text-white"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: "transform .01s ease-out",
          }}
        >
          <div className="mb-6">
            <Image
              src="/HeatherLogogpt.PNG"
              alt="Seaside Cinema Logo"
              priority={true}
              width={160}
              height={160}
              className="object-contain mx-auto rounded-2xl"
            />
          </div>
          <h1
            className="text-3xl text-peach sm:text-5xl font-playfair font-semibold leading-tight drop-shadow-md"
            style={{
              transform: `translateY(${scrollY * 0.01}px)`,
              transition: "transform 0.01s ease-in",
            }}
          >
            Luxury Beach Movie Nights
          </h1>
          <p
            className="mt-4 text-base sm:text-lg max-w-xl drop-shadow-sm text-offwhite"
            style={{
              transform: `translateY(${scrollY * -0.01}px)`,
              transition: "transform .01s ease-in",
            }}
          >
            Birthdays | | Anniversaries | | Date Nights | | Picnics | |
            Corporate Events
          </p>
          <Link
            href="/book"
            className="mt-6 bg-offwhite inline-block text-teal px-6 py-3 rounded-lg font-medium hover:bg-sand transition text-semibold"
            style={{
              transform: `translateY(${scrollY * -0.01}px)`,
              transition: "transform 0.01s ease-in",
            }}
          >
            Book Now!
          </Link>
        </div>
      </section>
      {process.env.NEXT_PUBLIC_FEATURE_FLAG === "true" && (
        <section className="py-20 px-6 bg-lightblue">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-teal mb-12">
              Exclusive Feature
            </h2>
            <p className="text-lg text-teal mb-8">
              This is an exclusive feature available only when the feature flag
              is enabled.
            </p>
            <Link
              href="/exclusive"
              className="bg-teal text-white px-8 py-3 rounded-lg font-medium hover:bg-orange transition inline-block"
            >
              Explore Now
            </Link>
          </div>
        </section>
      )}

      {/* How It Works / Booking Steps */}
      <section className="pb-20 pt-20 px-6 bg-offwhite">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-teal mb-12">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="text-xl font-semibold text-teal mb-2">
                Choose Your Package
              </h3>
              <p className="text-teal">
                Select your date, package, and add custom options
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="text-xl font-semibold text-teal mb-2">
                We Set Everything Up
              </h3>
              <p className="text-teal">
                Our team handles all the details and setup
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="text-xl font-semibold text-teal mb-2">
                You Show Up &amp; Enjoy
              </h3>
              <p className="text-teal">
                Just arrive and create unforgettable memories
              </p>
            </div>
          </div>
          <Link
            href="/book"
            className="mt-8 bg-teal text-white px-8 py-3 rounded-lg font-medium hover:bg-orange transition inline-block"
          >
            📅 Book Now
          </Link>
        </div>
      </section>
      {/* Main Experiences Section with Dynamic Pricing */}
      <section className="py-20 px-6 bg-sand">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-teal text-center mb-12">
            Our Signature Experiences
          </h2>
          <p className="text-lg text-teal text-center mb-12 max-w-3xl mx-auto">
            Choose from our curated selection of beach movie night experiences,
            each designed to create unforgettable memories.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {experiences.slice(0, 4).map(
              (experience, i) => (
              
                (
                  <div
                    key={experience.id}
                    className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                  >
                    <div className="relative h-48">
                      <Image
                      
                        src={experience.image}
                        alt={experience.name}
                        priority={i === 0}   // Note: Ensure the image is responsive and prioritized for the first item
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-black/20"></div>
                    </div>
                    <div className="p-6">
                      <h3 className="text-lg font-semibold text-teal mb-2">
                        {experience.name}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {experience.description}
                      </p>
                      <div className="flex items-center justify-between">
                        <span className="text-xl font-bold text-teal">
                          {experience.id === "classic" || experience.id === "bali" ? (
                            <div className="flex flex-col items-end">
                              <span className="line-through text-gray-400 text-sm">
                                {formatPrice(experience.originalPrice || experience.price)}
                              </span>
                              <span className="text-orange font-bold">
                                {formatPrice(experience.price)}
                              </span>
                            </div>
                          ) : (
                            formatPrice(experience.price)
                          )}
                        </span>
                        <Link
                          href={`/book?experience=${experience.id}`}
                          className="bg-teal text-white px-3 py-1 rounded text-sm hover:bg-orange transition"
                        >
                          Book Now
                        </Link>
                      </div>
                    </div>
                  </div>
                )
              )
            )}
          </div>

          <div className="text-center mt-12">
            <Link
              href="/experiences"
              className="bg-teal text-white px-8 py-3 rounded-lg font-medium hover:bg-orange transition inline-block"
            >
              View All Experiences
            </Link>
          </div>
        </div>
      </section>

      <section className="py-24 px-6 bg-peach from-sand to-offwhite">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-teal mb-6">What We Offer</h2>
            <p className="text-lg text-teal/80 max-w-2xl mx-auto leading-relaxed">
              From intimate picnics to grand celebrations, we create
              unforgettable moments with every detail thoughtfully curated.
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  🎬
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-teal to-orange mx-auto rounded-full"></div>
              </div>
              <h3 className="text-xl font-playfair font-bold text-teal mb-4 text-center">
                Outdoor Movie Nights
              </h3>
              <p className="text-teal/80 text-center leading-relaxed">
                Classic films under the stars with cozy blankets, popcorn, and
                the gentle sound of waves nearby.
              </p>
            </div>

            <Link
              href="/book?package=birthday"
              className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20 block"
            >
              <div className="text-center mb-6">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  🎂
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-teal to-orange mx-auto rounded-full"></div>
              </div>
              <h3 className="text-xl font-playfair font-bold text-teal mb-4 text-center">
                Birthday Party Magic
              </h3>
              <p className="text-teal/80 text-center leading-relaxed">
                Unique birthday parties for all ages! Movies, snacks, and
                sunsets - it doesn&apos;t get better than this. The perfect
                celebration under the stars.
              </p>
            </Link>

            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  ✨
                </div>
                <div className="w-16 h-1 bg-gradient-to-r from-teal to-orange mx-auto rounded-full"></div>
              </div>
              <h3 className="text-xl font-playfair font-bold text-teal mb-4 text-center">
                Custom Add-Ons
              </h3>
              <p className="text-teal/80 text-center leading-relaxed">
                Create and build your dream movie night with Charcuterie boards,
                extra blankets, tiki torches, and more to elevate your
                experience.
              </p>
            </div>

            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  🎄
                </div>
                <div className="w-10 h-1 bg-gradient-to-r from-teal to-orange mx-auto rounded-full"></div>
              </div>
              <h3 className="text-xl font-playfair font-bold text-teal mb-4 text-center">
                Seasonal Themes
              </h3>
              <p className="text-teal/80 text-center leading-relaxed">
                Special packages for holidays and seasonal celebrations with
                themed decor and ambiance.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Birthday Setups Section */}
      <section className="py-20 px-6 bg-offwhite text-center">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="relative">
              <BirthdayCarousel
                images={birthdayImages}
                autoRotateInterval={5000}
                className=""
              />
            </div>
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-teal mb-6">
                Birthday Party Magic
              </h2>
              <p className="text-lg text-teal/80 mb-6 leading-relaxed">
                Make every birthday unforgettable with our themed beach movie
                night setups. From kids&apos; parties to milestone celebrations,
                we create the perfect atmosphere for your special day with
                custom decorations, themed snacks, and magical beachside
                ambiance.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <span className="text-teal text-xl">✓</span>
                  <span className="text-teal">
                    Kids birthday parties (ages 3-12)
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-teal text-xl">✓</span>
                  <span className="text-teal">
                    Teen celebrations &amp; sweet 16s
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-teal text-xl">✓</span>
                  <span className="text-teal">Adult milestone birthdays</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-teal text-xl">✓</span>
                  <span className="text-teal">
                    Themed decorations & party favors
                  </span>
                </div>
              </div>
              <Link
                href="/book?package=birthday"
                className="bg-peach text-white px-8 py-3 rounded-lg font-medium hover:bg-orange transition inline-block"
              >
                Plan Your Birthday Party
              </Link>
            </div>
          </div>
        </div>
      </section>
      {/* Seasonal Packages Section */}
      <section className="py-20 px-6 bg-sand">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-teal text-center mb-12">
            Seasonal Experiences
          </h2>
          <p className="text-lg text-teal text-center mb-12 max-w-3xl mx-auto">
            Celebrate special moments with our themed packages. Each season
            brings its own magic to the bay.
          </p>

          <div className="grid gap-8 md:grid-cols-3">
            {/* Halloween */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64">
                <Image
                  src={getSeasonalById("halloween")?.image || "/IMG_1255.jpeg"}
                  alt="Halloween Movie Night"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm font-medium">
                    🎃 Halloween
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-teal mb-3">
                  {getSeasonalById("halloween")?.name ||
                    "Pumpkin Spice and Everything Nice"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {getSeasonalById("halloween")?.description ||
                    "Embrace the cozy vibes of autumn with our Fall Movie Night at the bay. Picture yourself under the stars, surrounded by pumpkins, rustic lanterns, and warm, earthy tones of autumn decor... Possibly watching a Skelington obessed with xmas!"}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-teal">
                    {formatPrice((getSeasonalById("halloween")?.price ?? 349) as number)}
                  </span>
                  <Link
                    href="/book?experience=halloween"
                    className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-orange transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Valentine's Day */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64">
                <Image
                  src={getSeasonalById("valentines")?.image || "/vday3.jpg"}
                  alt="Valentine's Day Movie Night"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-pink-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    💕 Valentine&apos;s
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-teal mb-3">
                  {getSeasonalById("valentines")?.name ||
                    "Love Under the Stars"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {getSeasonalById("valentines")?.description ||
                    "Our Valentine's Day Movie Night offers the perfect ambiance — surrounded by the glow of candles, roses, and chocolates. Whether you're watching a romance classic or a film that means something to you, it's a truly unforgettable experience."}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-teal">
                    {formatPrice((getSeasonalById("valentines")?.price ?? 599) as number)}
                  </span>
                  <Link
                    href="/book?experience=valentines"
                    className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-orange transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>

            {/* Christmas */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64">
                <Image
                  src={getSeasonalById("christmas")?.image || "/holiday1.JPG"}
                  alt="Christmas Movie Night"
                  fill
                  priority
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-red-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                    🎄 Christmas
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-teal mb-3">
                  {getSeasonalById("christmas")?.name || "Holiday Magic"}
                </h3>
                <p className="text-gray-600 mb-4">
                  {getSeasonalById("christmas")?.description ||
                    "Celebrate the magic of the season with our Christmas Movie Night experience — twinkling lights, trees, cozy blankets, and the bay as your backdrop. Perfect for creating memories with loved ones in a whimsical holiday setting."}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-teal">
                    {formatPrice((getSeasonalById("christmas")?.price ?? 449) as number)}
                  </span>
                  <Link
                    href="/book?experience=christmas"
                    className="bg-teal text-white px-4 py-2 rounded-lg hover:bg-orange transition"
                  >
                    Book Now
                  </Link>
                </div>
              </div>
            </div>
          </div>

          <div className="text-center mt-12">
            <Link
              href="/experiences"
              className="bg-teal text-white px-8 py-3 rounded-lg font-medium hover:bg-orange transition inline-block"
            >
              View All Experiences
            </Link>
          </div>
        </div>
      </section>
      {/* Instagram Section */}
      <InstagramSection/>

      {/* Testimonials / Reviews */}
      {/* <section className="py-20 px-6 bg-sand">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-teal mb-12">What Our Guests Say</h2>
          <div className="grid gap-8 md:grid-cols-2">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-yellow-400 text-2xl mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-teal mb-4">&ldquo;Absolutely magical! The sunset movie night was perfect for our anniversary. Everything was set up beautifully.&rdquo;</p>
              <p className="text-sm text-gray-600">- Sarah &amp; Mike</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <div className="text-yellow-400 text-2xl mb-2">⭐⭐⭐⭐⭐</div>
              <p className="text-teal mb-4">&ldquo;Best birthday party ever! The picnic setup was gorgeous and the service was incredible. Highly recommend!&rdquo;</p>
              <p className="text-sm text-gray-600">- Jessica</p>
            </div>
          </div>
        </div>
      </section> */}

      {/* Second Parallax Section */}

      {/* Content Section 2 */}
      <section className="py-20 px-6 bg-offwhite text-center">
        <h2 className="text-2xl sm:text-4xl font-bold text-peach">
          Relax. We&apos;ll Handle the Details.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-teal">
          We bring the picnic, the movie setup, and the magic. You just show up
          and enjoy.
        </p>
      </section>
      {/* Content Section 1 */}
      {/* Large Events Section */}
      <section className="py-20 px-6 bg-peach text-center">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div className="text-left">
              <h2 className="text-3xl sm:text-4xl font-bold text-teal mb-6">
                Large Events &amp; Corporate Gatherings
              </h2>
              <p className="text-lg text-teal/80 mb-6 leading-relaxed">
                Hosting a big celebration? We specialize in large-scale beach
                movie nights perfect for corporate events, family reunions, and
                group celebrations. Our team can accommodate groups of all sizes
                with custom setups and premium service.
              </p>
              <div className="space-y-4 mb-8">
                <div className="flex items-center space-x-3">
                  <span className="text-teal text-xl">✓</span>
                  <span className="text-teal">Groups of 10-50+ people</span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-teal text-xl">✓</span>
                  <span className="text-teal">
                    Corporate team building events
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-teal text-xl">✓</span>
                  <span className="text-teal">
                    Family reunions & celebrations
                  </span>
                </div>
                <div className="flex items-center space-x-3">
                  <span className="text-teal text-xl">✓</span>
                  <span className="text-teal">
                    Custom catering & beverage options
                  </span>
                </div>
              </div>
              <Link
                href="/large-events"
                className="bg-teal text-white px-8 py-3 rounded-lg font-medium hover:bg-orange transition inline-block"
              >
                Learn About Large Events
              </Link>
            </div>
            <div className="relative">
              <div className="relative h-96 rounded-xl overflow-hidden shadow-2xl">
                <Image
                  src="/Kids_birthday_photoshopped.jpg"
                  alt="Large Beach Movie Event"
                  fill
                  className="object-cover"
                  priority
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute bottom-4 left-4 text-white">
                  <span className="bg-teal/90 text-white px-3 py-1 rounded-full text-sm font-medium">
                    Large Events
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* FAQ Section */}
      <section className="py-20 px-6 bg-sand">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-teal text-center mb-12">
            Frequently Asked Questions
          </h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-teal mb-2">
                What&apos;s included in each package?
              </h3>
              <p className="text-teal">
                Each package includes setup, seating for 2, decor, along with
                any Custom add-ons selected by you.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-teal mb-2">
                Can I bring my own food?
              </h3>
              <p className="text-teal">
                Absolutely! You&apos;re welcome to bring your own food and
                drinks. We also offer charcuterie boards and other add-ons.
              </p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-teal mb-2">
                What if the weather is bad?
              </h3>
              <p className="text-teal">
                We monitor weather closely and will reschedule if possible. Your
                safety and comfort are our priority.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section
        className="relative h-[30vh] w-full bg-fixed bg-cover bg-center"
        style={{
          backgroundImage: "url('/verticalPicnic.jpeg')",
          backgroundAttachment: "scroll",
        }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex items-center justify-center text-center text-offwhite px-6">
          <h2 className="text-3xl text-sand sm:text-5xl font-semibold drop-shadow-md">
            Custom Packages For Any Occasion
          </h2>
        </div>
      </section>
      {/* Final CTA */}
      <section className="py-20 px-6 bg-teal text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Create Magic?
        </h2>
        <p className="text-white mb-8 max-w-2xl mx-auto">
          Book your unforgettable beach experience today and let us handle the
          rest.
        </p>
        <Link
          href="/book"
          className="bg-white text-teal px-8 py-3 rounded-lg font-medium hover:bg-sand transition inline-block"
        >
          🎬 Book Your Experience Now
        </Link>
      </section>

      <Gallery className="p-5" maxImages={12} sortBy="random" />

      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6"></footer>
    </main>
  );
}
