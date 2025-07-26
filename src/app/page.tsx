"use client"

import Image from "next/image";
import React from "react";
import { useEffect, useState } from "react";
import Link from "next/link";
import Gallery from "./components/Gallery";
import InstagramSection from "./components/InstagramSection";
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
          style={{ transform: 'translateY(-1px)' }}
        >
          <source src="/LoveBoat3.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black/40" />
        <div 
          className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white"
          style={{
            transform: `translateY(${scrollY * 0.3}px)`,
            transition: 'transform 1s ease-out'
          }}
        >
          <div className="mb-6">
            <Image
              src="/HeatherLogogpt.PNG"
              alt="Seaside Cinema Logo"
              width={120}
              height={120}
              className="object-contain mx-auto rounded-2xl"
            />
          </div>
          <h1 
            className="text-3xl text-peach sm:text-5xl font-playfair font-semibold leading-tight drop-shadow-md"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
              transition: 'transform 0.01s ease-in'
            }}
          >
            Luxury Beach Movie Nights
          </h1>
          <p 
            className="mt-4 text-base sm:text-lg max-w-xl drop-shadow-sm text-offwhite"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
              transition: 'transform .01s ease-in'
            }}
          >
            Curated sunset experiences on the San Diego bay. Movie magic, cozy
            vibes, unforgettable memories.
          </p>
          <Link
            href="/book"
            className="mt-6 bg-offwhite inline-block text-teal px-6 py-3 rounded-lg font-medium hover:bg-sand transition"
            style={{
              transform: `translateY(${scrollY * 0.1}px)`,
              transition: 'transform 0.001s ease-in'
            }}
          >
            📅 Book Your Experience
          </Link>
        </div>
      </section>

      <section className="py-24 px-6 bg-gradient-to-br from-sand to-offwhite">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-teal mb-6">
              What We Offer
            </h2>
            <p className="text-lg text-teal/80 max-w-2xl mx-auto leading-relaxed">
              From intimate picnics to grand celebrations, we create unforgettable moments with every detail thoughtfully curated.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎬</div>
                <div className="w-16 h-1 bg-gradient-to-r from-teal to-orange mx-auto rounded-full"></div>
              </div>
              <h3 className="text-xl font-playfair font-bold text-teal mb-4 text-center">Outdoor Movie Nights</h3>
              <p className="text-teal/80 text-center leading-relaxed">
                Classic films under the stars with cozy blankets, popcorn, and the gentle sound of waves nearby.
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🧺</div>
                <div className="w-16 h-1 bg-gradient-to-r from-teal to-orange mx-auto rounded-full"></div>
              </div>
              <h3 className="text-xl font-playfair font-bold text-teal mb-4 text-center">Curated Picnic Setups</h3>
              <p className="text-teal/80 text-center leading-relaxed">
                Beautifully arranged picnics with premium blankets, elegant decor, and Instagram-worthy styling.
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">✨</div>
                <div className="w-16 h-1 bg-gradient-to-r from-teal to-orange mx-auto rounded-full"></div>
              </div>
              <h3 className="text-xl font-playfair font-bold text-teal mb-4 text-center">Custom Add-Ons</h3>
              <p className="text-teal/80 text-center leading-relaxed">
                Create and build your dream movie night with Charcuterie boards, extra blankets, tiki torches, and more to elevate your experience.
              </p>
            </div>
            
            <div className="group bg-white/80 backdrop-blur-sm rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-white/20">
              <div className="text-center mb-6">
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">🎄</div>
                <div className="w-10 h-1 bg-gradient-to-r from-teal to-orange mx-auto rounded-full"></div>
              </div>
              <h3 className="text-xl font-playfair font-bold text-teal mb-4 text-center">Seasonal Themes</h3>
              <p className="text-teal/80 text-center leading-relaxed">
                Special packages for holidays and seasonal celebrations with themed decor and ambiance.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-6 bg-offwhite grid gap-12 md:grid-cols-3 text-center">
      {/* Value Proposition / Quick Intro */}
      {/* <section className="py-16 px-6 bg-offwhite text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-teal mb-6">
            Luxury popup picnics &amp; outdoor movie nights on the beaches of San Diego
          </h2>
          <p className="text-lg text-teal mb-8">
            Book an unforgettable sunset experience in seconds. We handle everything - you just show up and enjoy.
          </p>
          <Link
            href="/book"
            className="bg-teal text-white px-8 py-3 rounded-lg font-medium hover:bg-orange transition inline-block"
          >
             Check Availability
          </Link>
        </div>
      </section> */}

      <section className="py-20 px-6 bg-sand rounded-2xl">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-teal text-center mb-12">
            What We Offer
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-4xl mb-4">🎬&nbsp;&nbsp;🍿&nbsp;&nbsp;🌟</div>
              <h3 className="text-xl font-semibold text-teal mb-2">Outdoor Movie Nights</h3>
              <p className="text-teal">Classic films under the stars with cozy blankets and popcorn</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🧺&nbsp;&nbsp;🥪&nbsp;&nbsp;🌳</div>
              <h3 className="text-xl font-semibold text-teal mb-2">Curated Picnic Setups</h3>
              <p className="text-teal">Beautifully arranged picnics with premium blankets and decor</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🍫&nbsp;&nbsp;🧀&nbsp;&nbsp;🕯️</div>
              <h3 className="text-xl font-semibold text-teal mb-2">Custom Add-Ons</h3>
              <p className="text-teal">Charcuterie boards, extra blankets, tiki torches, and more</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🎄&nbsp;&nbsp;🎃&nbsp;&nbsp;❤️</div>
              <h3 className="text-xl font-semibold text-teal mb-2">Seasonal Themes</h3>
              <p className="text-teal">Special packages for holidays and seasonal celebrations</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 px-6 bg-sand/70 rounded-3xl ring-1 ring-teal/10 shadow-inner">
  <div className="max-w-6xl mx-auto">
    <h2 className="text-4xl font-bold text-teal text-center mb-16 tracking-tight">
      What We Offer
    </h2>

    <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
      {[
        {
          icon: "🎬 🍿 🌟",
          title: "Outdoor Movie Nights",
          text: "Classic films under the stars with cozy blankets and popcorn",
        },
        {
          icon: "🧺 🥪 🌳",
          title: "Curated Picnic Setups",
          text: "Beautifully arranged picnics with premium blankets and decor",
        },
        {
          icon: "🎄 🎃 ❤️",
          title: "Custom Add-Ons",
          text: "Charcuterie boards, extra blankets, tiki torches, and more",
        },
        {
          icon: "🍫 🧀 🕯️",
          title: "Seasonal Themes",
          text: "Special packages for holidays and seasonal celebrations",
        },
      ].map((item, i) => (
        <div
          key={i}
          className="text-center bg-white/80 backdrop-blur-md p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300"
        >
          <div className="text-4xl mb-4">{item.icon}</div>
          <h3 className="text-xl font-semibold text-teal mb-2">{item.title}</h3>
          <p className="text-teal text-sm leading-relaxed">{item.text}</p>
        </div>
      ))}
    </div>
  </div>
</section>

      <section className="py-20 px-6 bg-offwhite text-center">
  <h2 className="text-3xl sm:text-4xl font-bold text-teal mb-6">What We Offer</h2>
  <p className="text-teal mb-12 max-w-xl mx-auto">Whether you&apos;re planning a romantic date, surprise proposal, or group gathering, our curated setups deliver unforgettable moments with effortless style.</p>

  <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
    <div>
      <Image 
        src="/verticalSunset.jpeg" 
        alt="Classic Setup" 
        width={400}
        height={250}
        className="rounded-xl mb-3 object-cover" 
      />
      <h3 className="text-xl font-semibold text-teal">Classic Movie Night</h3>
      <p className="text-teal text-sm">Our signature setup — cozy seating, big screen, and coastal vibes.</p>
    </div>
    <div>
      <Image 
        src="/bayview_behind.jpg" 
        alt="Bali" 
        width={400}
        height={250}
        className="rounded-xl mb-3 object-cover" 
      />
      <h3 className="text-xl font-semibold text-teal">Bali by the Bay</h3>
      <p className="text-teal text-sm">Boho-chic meets beach night magic. Macrame, pillows, and mood lighting.</p>
    </div>
    <div>
      <Image 
        src="/poolsBday5.JPG" 
        alt="Birthday" 
        width={400}
        height={250}
        className="rounded-xl mb-3 object-cover" 
      />
      <h3 className="text-xl font-semibold text-teal">Birthday Packages</h3>
      <p className="text-teal text-sm">Celebrate in style with custom themes and fun party add-ons.</p>
    </div>
  </div>

  <a href="/experiences" className="mt-10 inline-block text-teal underline font-semibold hover:text-teal-dark">See All Experiences →</a>
</section>

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
  <h3 className="text-xl font-semibold text-teal mb-2">Parties &amp; Celebrations</h3>
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




      {/* Seasonal Packages Section */}
      <section className="py-20 px-6 bg-offwhite">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-teal text-center mb-12">
            Seasonal Experiences
          </h2>
          <p className="text-lg text-teal text-center mb-12 max-w-3xl mx-auto">
            Celebrate special moments with our themed packages. Each season brings its own magic to the bay.
          </p>
          
          <div className="grid gap-8 md:grid-cols-3">
            {/* Halloween */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
              <div className="relative h-64">
                <Image
                  src="/IMG_1255.jpeg"
                  alt="Halloween Movie Night"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/20"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-orange text-white px-3 py-1 rounded-full text-sm font-medium">
                    🎃 Halloween
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-teal mb-3">Pumpkin Spice and Everything Nice</h3>
                <p className="text-gray-600 mb-4">
                  Embrace the cozy vibes of autumn with our Fall Movie Night at the bay. Picture yourself under the stars, surrounded by pumpkins, rustic lanterns, and warm, earthy tones of autumn decor.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-teal">$349</span>
                  <Link
                    href="/book"
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
                  src="/vday3.jpg"
                  alt="Valentine's Day Movie Night"
                  fill
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
                <h3 className="text-xl font-semibold text-teal mb-3">Love Under the Stars</h3>
                <p className="text-gray-600 mb-4">
                  Our Valentine&apos;s Day Movie Night offers the perfect ambiance — surrounded by the glow of candles, roses, and chocolates. Whether you&apos;re watching a romance classic or a film that means something to you, it&apos;s a truly unforgettable experience.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-teal">$599</span>
                  <Link
                    href="/book"
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
                  src="/holiday1.JPG"
                  alt="Christmas Movie Night"
                  fill
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
                <h3 className="text-xl font-semibold text-teal mb-3">Holiday Magic</h3>
                <p className="text-gray-600 mb-4">
                  Celebrate the magic of the season with our Christmas Movie Night experience — twinkling lights, trees, cozy blankets, and the bay as your backdrop. Perfect for creating memories with loved ones in a whimsical holiday setting.
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-teal">$449</span>
                  <Link
                    href="/book"
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
      <InstagramSection />
      {/* What We Offer / Features Section */}
      

      {/* Nostalgic Movie Magic Section */}
      {/* <section
        className="relative h-[60vh] w-full bg-fixed bg-cover bg-center text-center"
        style={{ backgroundImage: "url('/drivein_night.jpg')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 flex flex-col items-center justify-center h-full px-6 text-offwhite">
          <h2 className="text-2xl sm:text-4xl font-bold text-peach mb-4 drop-shadow-md">
            Bringing Back That Classic Movie Feeling
          </h2>
          <p className="max-w-2xl text-offwhite text-center text-base sm:text-lg">
            Drive-ins are a thing of the past, and most people watch movies on a screen at home. But something magical is missing — that feeling of sitting under the stars, surrounded by loved ones, lost in a favorite story. 
         <p>   Seaside Cinema brings that back. We make it okay to feel like a kid again. The wonder. The nostalgia. The big screen under the big sky.
         </p>
          </p>
        </div>
      </section> */}

      <section
        className="relative h-[60vh] w-full bg-fixed bg-cover bg-center"
        style={{ backgroundImage: "url('/verticalPicnic.jpeg')" }}
      >
        <div className="absolute inset-0 bg-black/30" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-offwhite px-6">

        <p className="text-xl text-offwhite sm:text-2xl font-semibold drop-shadow-md">
  Drive-ins are a thing of the past, and most people watch movies on a screen at home. But something magical — something classical — that we long for: that
  feeling of sitting under the stars, surrounded by loved ones, lost in a favorite story. Seaside Cinema brings that back.
</p>

          <p className="text-xl text-offwhite sm:text-2xl font-semibold drop-shadow-md">
          We make it okay to feel like a kid again. The wonder. The nostalgia. The big screen under the big sky.
          </p>


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
      {/* How It Works / Booking Steps */}
      {/* <section className="py-20 px-6 bg-offwhite">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-teal mb-12">How It Works</h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl mb-4">1️⃣</div>
              <h3 className="text-xl font-semibold text-teal mb-2">Choose Your Package</h3>
              <p className="text-teal">Select your date, package, and add custom options</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">2️⃣</div>
              <h3 className="text-xl font-semibold text-teal mb-2">We Set Everything Up</h3>
              <p className="text-teal">Our team handles all the details and setup</p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">3️⃣</div>
              <h3 className="text-xl font-semibold text-teal mb-2">You Show Up &amp; Enjoy</h3>
              <p className="text-teal">Just arrive and create unforgettable memories</p>
            </div>
          </div>
          <Link
            href="/book"
            className="mt-8 bg-teal text-white px-8 py-3 rounded-lg font-medium hover:bg-orange transition inline-block"
          >
            📅 Book Now
          </Link>
        </div>
      </section> */}

      {/* Testimonials / Reviews */}
      <section className="py-20 px-6 bg-sand">
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
          Relax. We&apos;ll Handle the Details.
        </h2>
        <p className="mt-4 max-w-2xl mx-auto text-teal">
          We bring the picnic, the movie setup, and the magic. You just show up
          and enjoy.
        </p>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-6 bg-sand">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-teal text-center mb-12">Frequently Asked Questions</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-teal mb-2">What&apos;s included in each package?</h3>
              <p className="text-teal">Each package includes setup, blankets, pillows, decor, and basic refreshments. Custom add-ons available.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-teal mb-2">Can I bring my own food?</h3>
              <p className="text-teal">Absolutely! You&apos;re welcome to bring your own food and drinks. We also offer charcuterie boards and other add-ons.</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold text-teal mb-2">What if the weather is bad?</h3>
              <p className="text-teal">We monitor weather closely and will reschedule if needed. Your safety and comfort are our priority.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-20 px-6 bg-teal text-center">
        <h2 className="text-3xl font-bold text-white mb-6">Ready to Create Magic?</h2>
        <p className="text-white mb-8 max-w-2xl mx-auto">
          Book your unforgettable beach experience today and let us handle the rest.
        </p>
        <Link
          href="/book"
          className="bg-white text-teal px-8 py-3 rounded-lg font-medium hover:bg-sand transition inline-block"
        >
          🎬 Book Your Experience Now
        </Link>
      </section>

      <Gallery className="p-5" maxImages={24}/>


      {/* Footer */}
      <footer className="bg-gray-800 text-white py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <h3 className="text-xl font-semibold mb-4">Seaside Cinema</h3>
              <p className="text-gray-300">Luxury beach experiences in San Diego</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-gray-300">
                <li><Link href="/" className="hover:text-white">Home</Link></li>
                <li><Link href="/experiences" className="hover:text-white">Experiences</Link></li>
                <li><Link href="/book" className="hover:text-white">Book Now</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Contact</h4>
              <ul className="space-y-2 text-gray-300">
                <li>📧 hello@seasidecinema.com</li>
                <li>📱 (619) 555-0123</li>
                <li>📍 San Diego, CA</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Follow Us</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-gray-300 hover:text-white">📷 Instagram</a>
                <a href="#" className="text-gray-300 hover:text-white">📘 Facebook</a>
              </div>
            </div>
          </div>
          {/* <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
            <p>&copy; 2024 Sdfqfwfwqeaside Cinema. All rights reserved.</p>
          </div> */}
        </div>
      </footer>
    </main>
  );
}
