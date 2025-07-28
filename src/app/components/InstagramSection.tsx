"use client";

import React, { useEffect, useRef } from "react";
import Image from "next/image";

export default function InstagramSection() {
  const sectionRef = useRef<HTMLElement>(null);
  const backgroundRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current || !backgroundRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const scrolled = window.pageYOffset;
      const rate = scrolled * -0.5; // Adjust speed here

      // Only apply parallax when section is in view
      if (rect.top < window.innerHeight && rect.bottom > 0) {
        backgroundRef.current.style.transform = `translate3d(0, ${rate}px, 0)`;
      }
    };

    // Throttle scroll events for better performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial call
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative py-20 px-6 text-center overflow-hidden">
      {/* Background Image Container */}
      <div 
        ref={backgroundRef}
        className="absolute inset-0 w-full h-full"
        style={{
          backgroundImage: "url('/verticalSunset.jpeg')",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
          // Hardware acceleration for smooth performance
          transform: "translate3d(0, 0, 0)",
          willChange: "transform"
        }}
      />
      
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/40"></div>
      
      {/* Content */}
      <div className="relative z-10">
        <h2 className="text-3xl font-bold text-white mb-4 drop-shadow-md">
          Follow Us on Instagram
        </h2>
        <p className="mb-8 text-white/90 drop-shadow-sm max-w-2xl mx-auto">
          See our latest setups and behind-the-scenes moments from our beach movie nights.
        </p>

        <a
          href="https://www.instagram.com/seasidecinema"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block group"
        >
          <div className="relative">
            <Image
              src="/igSnap2.PNG"
              alt="Seaside Cinema Instagram Preview"
              width={300}
              height={300}
              className="rounded-xl shadow-lg w-[300px] mx-auto hover:scale-105 transition-transform duration-300 group-hover:shadow-xl"
            />
            <div className="absolute inset-0 bg-black/20 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <p className="mt-4 text-white underline font-medium hover:text-peach transition-colors">
            See More on Instagram →
          </p>
        </a>
      </div>
    </section>
  );
}
