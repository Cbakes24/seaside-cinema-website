import React from "react";

export default function InstagramSection() {
  return (
    <section className="py-12 px-6 text-center bg-offwhite">
      <h2 className="text-2xl font-bold text-teal mb-4">
        Follow Us on Instagram
      </h2>
      <p className="mb-6 text-teal">
        See our latest setups and behind-the-scenes moments.
      </p>

      <a 
        href="https://www.instagram.com/seasidecinema"
       
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block"
      >
        <img
          src="/igSnap2.PNG" // 👈 Replace this with your actual preview image
          alt="Seaside Cinema Instagram Preview"
          className="rounded-xl shadow-md w-[300px] mx-auto hover:opacity-80 transition"
        />
        <p className="mt-2 text-sm text-teal underline">
          See More on Instagram →
        </p>
      </a>
    </section>
  );
}
