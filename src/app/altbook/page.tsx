"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { packageOptions, addonPricing } from "../utils/pricingByPackage"; // make sure this file has the combined structure

export default function BookingPage() {
  const router = useRouter();

  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [style, setStyle] = useState("Classic");
  const [selectedAddons, setSelectedAddons] = useState(packageOptions["Classic"].addons);
  const [mainImage, setMainImage] = useState(packageOptions["Classic"].image);

  const addonKeys = Object.keys(addonPricing);

  const getTotal = () => {
    const base = packageOptions[style]?.price || 0;
    const addonsTotal = selectedAddons.reduce((sum, key) => sum + (addonPricing[key] || 0), 0);
    return base + addonsTotal;
  };

  const handleAddonToggle = (addon) => {
    setSelectedAddons((prev) =>
      prev.includes(addon) ? prev.filter((a) => a !== addon) : [...prev, addon]
    );
  };

  useEffect(() => {
    setSelectedAddons(packageOptions[style]?.addons || []);
    setMainImage(packageOptions[style]?.image);
  }, [style]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      fullName,
      email,
      phone,
      date,
      time,
      style,
      addons: selectedAddons,
      total: getTotal(),
    };
    console.log("Submitted Booking:", formData);
    await fetch("/api/send-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    router.push("/");
  };

  return (
    <main className="min-h-screen bg-peach px-4 py-10 text-gray-800">
      <div className="max-w-3xl mx-auto bg-white rounded-lg shadow-lg p-6">
        <Image
          src={mainImage}
          alt="Package Preview"
          width={800}
          height={400}
          className="w-full h-64 object-cover rounded-md mb-6"
        />

        <h1 className="text-3xl font-bold text-teal mb-4 text-center">
          Book Your Experience
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Package Selection */}
          <div>
            <label className="block font-medium mb-1">Select Package</label>
            <select
              className="w-full p-2 border rounded"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              {Object.entries(packageOptions).map(([pkg, data]) => (
                <option key={pkg} value={pkg}>
                  {pkg} - ${data.price.toFixed(2)}
                </option>
              ))}
            </select>
          </div>

          {/* Addons */}
          <div>
            <label className="block font-medium mb-2">Optional Add-ons</label>
            <div className="space-y-2">
              {addonKeys.map((addon) => (
                <label key={addon} className="flex justify-between items-center border p-3 rounded bg-offwhite">
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon)}
                      onChange={() => handleAddonToggle(addon)}
                    />
                    <span>{addon}</span>
                  </div>
                  <span className="text-teal font-medium">
                    {addonPricing[addon] !== null ? `$${addonPricing[addon]}` : "Included"}
                  </span>
                </label>
              ))}
            </div>
          </div>

          {/* Summary */}
          <div className="border-t pt-4">
            <h2 className="text-xl font-semibold text-orange mb-2">Price Summary</h2>
            <ul className="text-teal mb-2">
              <li>{style} Package — ${packageOptions[style].price}</li>
              {selectedAddons.map((addon) => (
                <li key={addon}>+ {addon} — ${addonPricing[addon] || "Included"}</li>
              ))}
            </ul>
            <div className="text-xl font-bold text-teal">
              Total: ${getTotal().toFixed(2)}
            </div>
          </div>

          {/* Contact Info */}
          <div>
            <label className="block font-medium mb-1">Full Name</label>
            <input
              type="text"
              className="w-full p-2 border rounded"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block font-medium mb-1">Phone</label>
            <input
              type="tel"
              className="w-full p-2 border rounded"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-medium mb-1">Date</label>
              <input
                type="date"
                className="w-full p-2 border rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Start Time</label>
              <input
                type="time"
                className="w-full p-2 border rounded"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className="w-full mt-6 bg-teal text-white font-semibold py-3 rounded hover:bg-orange transition"
          >
            Submit Booking — ${getTotal().toFixed(2)}
          </button>
        </form>
      </div>
    </main>
  );
}
