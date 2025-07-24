"use client"
import React, { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";


export default function BookingPage() {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [fullName, setFullName] = useState('');
  const [howHeard, setHowHeard] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneType, setPhoneType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [style, setStyle] = useState('Classic');
  const [occasion, setOccasion] = useState('');
  const [eventImages, setEventImages] = useState([
    "/vday3.jpg",
    "/big_bali.JPG",
    "/IMG_1255.jpeg",
    "/poolsBday5.JPG",
    "/verticalSunset.jpeg",
  ]);
  const rotations = [-30, -15, 0, 15, 30];
  const addonOptions = [
    "Extra Blankets",
    "Charcuterie Board",
    "Tiki Torches",
    "Extra Hour",
    "Projector + Movie Setup"
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = {
      fullName,
      howHeard,
      email,
      phone,
      phoneType,
      date,
      time,
      guestCount,
      style,
      occasion,
      addons: selectedAddons,
    };
    console.log("***  FORM DATA  ***", formData);
    await fetch('/api/send-booking', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    alert("Booking submitted successfully");
    // Redirect to home page
    router.push('/');
  };

  return (
    <main className="min-h-screen bg-peach text-gray-800 px-4 py-10">
      <div className="max-w-xl mx-auto bg-white p-6 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-teal mb-6 text-center">
          Book Your Experience
        </h1>
        {/* Fan w-whatever num you want the width*/}
        <div className="relative w-40 max-w-[320px] aspect-square mx-auto flex justify-center items-center mb-25 sm:mb-14 sm:w-80 lg:mb-20">
          {rotations.map((deg: number, idx: number) => {
            const isActive = activeIdx === idx;
            let offset = 50, imageWidth = 60;
            if (typeof window !== 'undefined') {
              if (window.innerWidth >= 1024) { offset = 100; imageWidth = 240; }
              else if (window.innerWidth >= 640) { offset = 40; imageWidth = 60; }
            }
            const fanWidth = (rotations.length -2) * offset + imageWidth;
            const leftPx = idx * offset - (fanWidth - imageWidth) / 1.5;
            return (
              <Image
                key={idx}
                src={eventImages[idx]}
                alt="Sunset"
                fill
                className="object-cover rounded-lg shadow-md p-5 bg-offwhite absolute top-0 left-0 transition-transform duration-300 cursor-pointer"
                style={{
                  zIndex: isActive ? 300 : idx,
                  left: `${leftPx}px`,
                  top: `${Math.abs(idx - 2) * 32}px`, //fan shape***
                  transform: `rotate(${isActive ? 0 : deg}deg)  translateY(${isActive ? "-55px" : "0"})`,
                  pointerEvents: isActive ? 'none' : 'auto',
                }}
                onMouseEnter={() => setActiveIdx(idx)}
                onMouseLeave={() => setActiveIdx(null)}
                onClick={() => setActiveIdx(idx)}
              />
            );
          })}
        </div>
        <form className="space-y-6" onSubmit={handleSubmit}>
          {/* Customer Info */}
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input type="text" className="w-full p-2 border-b-2 rounded" required value={fullName} onChange={e => setFullName(e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">How did you hear about us?</label>
            <input type="text" className="w-full p-2 border-b-2 rounded" value={howHeard} onChange={e => setHowHeard(e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input type="email" className="w-full p-2 border-b-2 rounded" required value={email} onChange={e => setEmail(e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone Number</label>
            <input type="tel" className="w-full p-2 border-b-2 rounded" value={phone} onChange={e => setPhone(e.target.value)} />
          </div>
          {/* Type Of Phone */}
          <div>
            <label className="block font-medium mb-1">Type Of Phone</label>
            <select name="type" className="w-full p-2 border-b-2 rounded" value={phoneType} onChange={e => setPhoneType(e.target.value)}>
              <option value="">Select phone type</option>
              <option value="iphone">iPhone</option>
              <option value="android">Android</option>
            </select>
          </div>
          {/* Event Details */}
          <div>
            <label className="block font-medium mb-1">Preferred Date</label>
            <input type="date" className="w-full p-2 border-b-2 rounded" value={date} onChange={e => setDate(e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">Start Time</label>
            <input type="time" className="w-full p-2 border-b-2 rounded" value={time} onChange={e => setTime(e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">Guest Count</label>
            <input type="number" className="w-full p-2 border-b-2 rounded" value={guestCount} onChange={e => setGuestCount(e.target.value)} />
          </div>
          <div>
            <label className="block font-medium mb-1">Style</label>
            <select className="w-full p-2 border-b-2 rounded" value={style} onChange={e => setStyle(e.target.value)}>
              <option>Classic</option>
              <option>Bali</option>
              <option>Picnic</option>
            </select>
          </div>
          <div>
            <label className="block font-medium mb-1">Occasion Type</label>
            <input
              type="text"
              placeholder="Date Night, Birthday, Proposal..."
              className="w-full p-2 border-b-2 rounded"
              value={occasion}
              onChange={e => setOccasion(e.target.value)}
            />
          </div>
          {/* Add-ons */}
          <fieldset>
            <legend className="block font-medium mb-2">Add-ons</legend>
            <div className="space-y-2">
              {addonOptions.map((addon) => (
                <label key={addon} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={selectedAddons.includes(addon)}
                    onChange={e => {
                      setSelectedAddons(prev =>
                        e.target.checked
                          ? [...prev, addon]
                          : prev.filter(a => a !== addon)
                      );
                    }}
                  />
                  <span>{addon}</span>
                </label>
              ))}
            </div>
          </fieldset>
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal text-white font-semibold py-3 rounded hover:bg-orange transition"
          >
            Submit Booking
          </button>
        </form>
      </div>
    </main>
  );
}
