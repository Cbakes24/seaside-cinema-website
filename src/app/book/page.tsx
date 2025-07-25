"use client"
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { packages, addons, calculateTotal, formatPrice, getPackageById, getAddonById } from "../utils/pricing";

export default function BookingPage() {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedPackage, setSelectedPackage] = useState('classic');
  const [mainImage, setMainImage] = useState('/verticalSunset.jpeg');
  const [fullName, setFullName] = useState('');
  const [howHeard, setHowHeard] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneType, setPhoneType] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [guestCount, setGuestCount] = useState('');
  const [occasion, setOccasion] = useState('');
  const [eventImages, setEventImages] = useState([
    "/vday3.jpg",
    "/big_bali.JPG",
    "/IMG_1255.jpeg",
    "/poolsBday5.JPG",
    "/verticalSunset.jpeg",
  ]);
  const rotations = [-30, -15, 0, 15, 30];

  const currentPackage = getPackageById(selectedPackage);
  const totalPrice = calculateTotal(selectedPackage, selectedAddons);

  // Update main image when package changes
  useEffect(() => {
    if (currentPackage) {
      setMainImage(currentPackage.image);
    }
  }, [selectedPackage, currentPackage]);

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
      selectedPackage,
      occasion,
      addons: selectedAddons,
      totalPrice,
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
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-teal mb-8 text-center">
          Book Your Experience
        </h1>

        Fan w-whatever num you want the width
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
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Package Selection */}
          <div className="bg-white p-6 rounded-lg shadow-md">
        {mainImage && (
            <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={mainImage}
                alt="Package Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-semibold">{currentPackage?.name}</h3>
                <p className="text-sm opacity-90">{currentPackage?.description}</p>
              </div>
            </div>
          )}
            <h2 className="text-2xl font-bold text-teal mb-6">Choose Your Package</h2>
            <div className="space-y-4">
              {packages.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`border-2 rounded-lg p-4 cursor-pointer transition-all ${
                    selectedPackage === pkg.id
                      ? 'border-teal bg-teal/10'
                      : 'border-blue-200 hover:border-teal/50'
                  }`}
                  onClick={() => setSelectedPackage(pkg.id)}
                >
                  <div className="flex justify-between items-start mb-2">
                    <h3 className="text-lg font-semibold text-teal">{pkg.name}</h3>
                    <span className="text-lg font-bold text-teal">{formatPrice(pkg.price)}</span>
                  </div>
                  <p className="text-gray-600 text-sm mb-3">{pkg.description}</p>
                  <ul className="text-xs text-gray-500 space-y-1">
                    {pkg.includes.map((item, index) => (
                      <li key={index} className="flex items-center">
                        <span className="text-teal mr-2">✓</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>

          {/* Add-ons Selection */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-teal mb-6">Customize Your Experience</h2>
            <div className="space-y-3">
              {addons.map((addon) => (
                <label key={addon.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer">
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={(e) => {
                        setSelectedAddons(prev =>
                          e.target.checked
                            ? [...prev, addon.id]
                            : prev.filter(id => id !== addon.id)
                        );
                      }}
                      className="w-4 h-4 text-teal"
                    />
                    <div>
                      <span className="font-medium text-teal">{addon.name}</span>
                      <p className="text-sm text-gray-600">{addon.description}</p>
                    </div>
                  </div>
                  <span className="text-teal font-semibold">{formatPrice(addon.price)}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Price Summary */}
        <div className="bg-white p-6 rounded-lg shadow-md mt-8">
          <h2 className="text-2xl font-bold text-teal mb-4">Price Summary</h2>
          {mainImage && (
            <div className="relative w-full h-64 mb-6 rounded-lg overflow-hidden">
              <Image
                src={mainImage}
                alt="Package Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-semibold">{currentPackage?.name}</h3>
                <p className="text-sm opacity-90">{currentPackage?.description}</p>
              </div>
            </div>
          )}
          <div className="space-y-2">
            {currentPackage && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-teal">{currentPackage.name}</span>
                <span className="font-semibold text-teal">{formatPrice(currentPackage.price)}</span>
              </div>
            )}
            {selectedAddons.map((addonId) => {
              const addon = getAddonById(addonId);
              return addon ? (
                <div key={addonId} className="flex justify-between items-center py-1">
                  <span className="text-gray-600">+ {addon.name}</span>
                  <span className="text-gray-600">{formatPrice(addon.price)}</span>
                </div>
              ) : null;
            })}
            <div className="flex justify-between items-center pt-4 border-t-2 border-teal">
              <span className="text-xl font-bold text-teal">Total</span>
              <span className="text-2xl font-bold text-teal">{formatPrice(totalPrice)}</span>
            </div>
          </div>
        </div>

        <form className="bg-white p-6 rounded-lg shadow-md mt-8" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-bold text-teal mb-6">Your Details</h2>
          <div className="grid gap-6 md:grid-cols-2">
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
            <div>
              <label className="block font-medium mb-1">Type Of Phone</label>
              <select name="type" className="w-full p-2 border-b-2 rounded" value={phoneType} onChange={e => setPhoneType(e.target.value)}>
                <option value="">Select phone type</option>
                <option value="iphone">iPhone</option>
                <option value="android">Android</option>
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
          </div>
          
          {/* Submit */}
          <button
            type="submit"
            className="w-full bg-teal text-white font-semibold py-3 rounded hover:bg-orange transition mt-6"
          >
            Submit Booking - {formatPrice(totalPrice)}
          </button>
        </form>
      </div>
    </main>
  );
}
