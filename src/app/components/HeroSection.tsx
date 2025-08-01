"use client";

import Image from "next/image";
import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";

export default function HeroSection() {
  const [scrollY, setScrollY] = useState(0);
  const videoRef = useRef<HTMLVideoElement | null>(null);

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
    <section className="relative h-[90vh] w-full overflow-hidden">
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
  );
}
