import Image from "next/image";
import React from "react";

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-offwhite">
      {/* Hero Section */}
      <section className="relative h-[60vh] w-full overflow-hidden">
        <Image
          src="/bayview_behind.jpg"
          alt="About Seaside Cinema"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6 text-white">
          <h1 className="text-4xl sm:text-6xl font-bold text-peach mb-4 drop-shadow-md">
            About Seaside Cinema
          </h1>
          <p className="text-xl sm:text-2xl text-offwhite max-w-3xl drop-shadow-sm">
            Bringing the magic of outdoor cinema back to San Diego
          </p>
        </div>
      </section>

      {/* Our Story Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-teal mb-6">
                Our Story
              </h2>
              <div className="space-y-4 text-teal text-lg">
                <p>
                  Seaside Cinema was born from a simple idea: what if we could bring back that magical feeling of watching movies under the stars?
                </p>
                <p>
                  Growing up, many of us remember the excitement of drive-in theaters - the anticipation, the community, the wonder of cinema under the open sky. But as drive-ins disappeared, that special experience became a thing of the past.
                </p>
                <p>
                  We decided to change that. In 2023, we started Seaside Cinema with a mission to recreate that nostalgic movie magic on the beautiful beaches of San Diego.
                </p>
                <p>
                  Today, we&apos;re proud to offer luxury outdoor movie experiences that combine the best of classic cinema with modern comfort and stunning ocean views.
                </p>
              </div>
            </div>
            <div className="relative">
              <Image
                src="/verticalSunset.jpeg"
                alt="Sunset movie setup"
                width={600}
                height={400}
                className="rounded-xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 px-6 bg-sand">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold text-teal mb-8">
            Our Mission
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="text-4xl mb-4">🌟</div>
              <h3 className="text-xl font-semibold text-teal mb-2">Create Magic</h3>
              <p className="text-teal">
                We believe everyone deserves to experience the wonder of cinema under the stars
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">💝</div>
              <h3 className="text-xl font-semibold text-teal mb-2">Build Memories</h3>
              <p className="text-teal">
                Every setup is designed to create unforgettable moments with loved ones
              </p>
            </div>
            <div className="text-center">
              <div className="text-4xl mb-4">🏖️</div>
              <h3 className="text-xl font-semibold text-teal mb-2">Honor San Diego</h3>
              <p className="text-teal">
                We celebrate our beautiful coastline and vibrant local community
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-teal text-center mb-12">
            Meet Our Team
          </h2>
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <Image
                  src="/poolsBday5.JPG"
                  alt="Team member"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-teal mb-2">Sarah Johnson</h3>
              <p className="text-teal mb-2">Founder & Creative Director</p>
              <p className="text-sm text-gray-600">
                Passionate about bringing cinematic magic to life on the beach
              </p>
            </div>
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <Image
                  src="/big_bali.JPG"
                  alt="Team member"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-teal mb-2">Mike Chen</h3>
              <p className="text-teal mb-2">Operations Manager</p>
              <p className="text-sm text-gray-600">
                Ensures every event runs smoothly and exceeds expectations
              </p>
            </div>
            <div className="text-center">
              <div className="relative w-48 h-48 mx-auto mb-6">
                <Image
                  src="/verticalPicnic.jpeg"
                  alt="Team member"
                  fill
                  className="rounded-full object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold text-teal mb-2">Emma Rodriguez</h3>
              <p className="text-teal mb-2">Event Coordinator</p>
              <p className="text-sm text-gray-600">
                Creates personalized experiences for every special occasion
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 px-6 bg-peach">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-teal text-center mb-12">
            Our Values
          </h2>
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-teal mb-4">✨ Quality & Attention to Detail</h3>
              <p className="text-teal">
                Every setup is crafted with care, from the perfect blanket arrangement to the ideal movie selection. We believe the little details make the biggest difference.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-teal mb-4">🌊 Environmental Stewardship</h3>
              <p className="text-teal">
                We&apos;re committed to protecting our beautiful beaches. All our materials are eco-friendly, and we leave no trace behind.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md">
              <h3 className="text-2xl font-semibold text-teal mb-4">🤝 Community First</h3>
              <p className="text-teal">
                We&apos;re proud to be part of the San Diego community. We support local businesses and create opportunities for our neighbors to experience something truly special.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-teal text-center">
        <h2 className="text-3xl font-bold text-white mb-6">
          Ready to Experience the Magic?
        </h2>
        <p className="text-white mb-8 max-w-2xl mx-auto">
          Join us for an unforgettable evening under the stars. Book your experience today and let us create something magical for you.
        </p>
        <a
          href="/book"
          className="bg-white text-teal px-8 py-3 rounded-lg font-medium hover:bg-sand transition inline-block"
        >
          🎬 Book Your Experience
        </a>
      </section>
    </main>
  );
} 
