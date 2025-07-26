"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  packages,
  addons,
  calculateTotal,
  formatPrice,
  getPackageById,
  getAddonById,
  experiences,
  getExperienceById,
} from "../utils/pricing";

export default function BookingPage() {
  const router = useRouter();
  const [activeIdx, setActiveIdx] = useState<number | null>(null);
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState("classic");
  const [selectedPackage, setSelectedPackage] = useState("birthday");
  const [mainImage, setMainImage] = useState("/verticalSunset.jpeg");
  const [fullName, setFullName] = useState("");
  const [howHeard, setHowHeard] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneType, setPhoneType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [occasion, setOccasion] = useState("");
  const [eventImages, setEventImages] = useState([
    "/vday3.jpg",
    "/big_bali.JPG",
    "/IMG_1255.jpeg",
    "/poolsBday5.JPG",
    "/verticalSunset.jpeg",
  ]);
  const rotations = [-30, -15, 0, 15, 30];
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isPackageDropdownOpen, setIsPackageDropdownOpen] = useState(false);

  const currentPackage = getPackageById(selectedPackage);
  const currentExperience = getExperienceById(selectedExperience);
  const totalPrice = calculateTotal(
    selectedExperience,
    selectedPackage,
    selectedAddons,
    parseInt(guestCount) || 2
  );

  // Update main image when package changes
  useEffect(() => {
    if (currentExperience) {
      setMainImage(currentExperience.image);
    }
  }, [selectedPackage, currentExperience]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element;
      if (!target.closest(".dropdown-container")) {
        setIsDropdownOpen(false);
      }
      if (!target.closest(".package-dropdown-container")) {
        setIsPackageDropdownOpen(false);
      }
    };

    if (isDropdownOpen || isPackageDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isPackageDropdownOpen]);

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
      selectedExperience,
      selectedPackage,
      occasion,
      addons: selectedAddons,
      totalPrice,
    };
    console.log("***  FORM DATA  ***", formData);
    await fetch("/api/send-booking", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    const messageContainer = document.createElement("div");
    messageContainer.style.position = "fixed";
    messageContainer.style.top = "20px";
    messageContainer.style.right = "40px";
    messageContainer.style.backgroundColor = "#38b2ac";
    messageContainer.style.color = "#fff";
    messageContainer.style.padding = "15px 25px";
    messageContainer.style.borderRadius = "8px";
    messageContainer.style.boxShadow = "0 4px 8px rgba(0, 0, 0, 0.1)";
    messageContainer.style.zIndex = "1000";
    messageContainer.style.fontSize = "16px";
    messageContainer.style.fontWeight = "bold";
    messageContainer.style.transition = "opacity 0.5s ease-in-out";
    messageContainer.innerText =
      "🎉 Success! Your booking has been submitted. Thank you for choosing us! 🎬";

    document.body.appendChild(messageContainer);

    setTimeout(() => {
      messageContainer.style.opacity = "0";
      setTimeout(() => {
        document.body.removeChild(messageContainer);
      }, 500);
    }, 3000);
    // Redirect to home page
    router.push("/");
  };

  console.log("***  SELECTED EXPERIENCE  ***", selectedExperience);
  console.log(
    "***  SELECTED EXPERIENCE price ***",
    experiences.find((e) => e.id === selectedExperience)?.price
  );
  console.log("***  SELECTED PACKAGE  ***", selectedPackage);
  console.log(
    "***  SELECTED PACKAGE price ***",
    packages.find((p) => p.id === selectedPackage)?.price
  );
  console.log("***  SELECTED ADDONS  ***", selectedAddons);
  console.log("***  TOTAL PRICE  ***", totalPrice);
  console.log("***  CURRENT PACKAGE  ***", currentPackage);

  return (
    <main className="min-h-screen bg-peach text-gray-800 px-4 py-10">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-teal mb-8 text-center">
          Book Your Experience
        </h1>
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
                  <h3 className="text-xl font-semibold">
                    {currentExperience?.name}
                  </h3>
                  <p className="text-sm opacity-90">
                    {currentExperience?.description}
                  </p>
                </div>
              </div>
            )}
            <h2 className="text-2xl font-bold text-teal mb-6">
              Create Your Movie Experience
            </h2>

            {/* Elegant Package Dropdown */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Your Experience (Base Setup)
              </label>
              <div className="relative dropdown-container">
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal focus:border-teal bg-white appearance-none cursor-pointer text-lg font-medium text-gray-800 shadow-sm hover:border-teal/50 transition-all duration-200 flex justify-between items-center"
                >
                  <span>
                    {currentExperience?.name || "Select an experience"}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Custom Dropdown List */}
                {isDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white border-2 border-teal/20 rounded-xl shadow-lg overflow-hidden">
                    {experiences.map((exp) => (
                      <button
                        key={exp.id}
                        type="button"
                        onClick={() => {
                          setSelectedExperience(exp.id);
                          setIsDropdownOpen(false);
                        }}
                        className={`w-full p-3 text-left hover:bg-teal/5 transition-colors duration-150 border-b border-gray-100 last:border-b-0 ${
                          selectedExperience === exp.id
                            ? "bg-teal/10 text-teal"
                            : "text-gray-800"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-md">
                              {exp.name}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {exp.description}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-md font-bold text-teal">
                              {formatPrice(exp.price)}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Experience Preview */}
            {currentExperience && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-teal">
                      {currentExperience.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {currentExperience.description}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-teal">
                    {formatPrice(currentExperience.price)}
                  </span>
                </div>
                <ul className="text-xs text-gray-500 space-y-1">
                  {currentExperience.includes.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-teal mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Package Dropdown */}
            <div className="mb-6 mt-8">
              <label className="block text-sm font-medium text-gray-700 mb-3">
                Select Your Package (Optional Themes)
              </label>
              <div className="relative package-dropdown-container">
                <button
                  type="button"
                  onClick={() => setIsPackageDropdownOpen(!isPackageDropdownOpen)}
                  className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal focus:border-teal bg-white appearance-none cursor-pointer text-lg font-medium text-gray-800 shadow-sm hover:border-teal/50 transition-all duration-200 flex justify-between items-center"
                >
                  <span>
                    {currentPackage?.name || "Select a package (optional)"}
                  </span>
                  <svg
                    className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isPackageDropdownOpen ? "rotate-180" : ""}`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Custom Package Dropdown List */}
                {isPackageDropdownOpen && (
                  <div className="absolute z-50 w-full mt-2 bg-white border-2 border-teal/20 rounded-xl shadow-lg overflow-hidden">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedPackage("");
                        setIsPackageDropdownOpen(false);
                      }}
                      className="w-full p-3 text-left hover:bg-teal/5 transition-colors duration-150 border-b border-gray-100 text-gray-600"
                    >
                      <div className="font-semibold text-md">No Package</div>
                      <div className="text-sm text-gray-500 mt-1">Just the experience</div>
                    </button>
                    {packages.map((pkg) => (
                      <button
                        key={pkg.id}
                        type="button"
                        onClick={() => {
                          setSelectedPackage(pkg.id);
                          setIsPackageDropdownOpen(false);
                        }}
                        className={`w-full p-3 text-left hover:bg-teal/5 transition-colors duration-150 border-b border-gray-100 last:border-b-0 ${
                          selectedPackage === pkg.id
                            ? "bg-teal/10 text-teal"
                            : "text-gray-800"
                        }`}
                      >
                        <div className="flex justify-between items-center">
                          <div>
                            <div className="font-semibold text-md">
                              {pkg.name}
                            </div>
                            <div className="text-sm text-gray-600 mt-1">
                              {pkg.description}
                            </div>
                          </div>
                          <div className="text-right">
                            <div className="text-md font-bold text-teal">
                              {formatPrice(pkg.price)}
                            </div>
                          </div>
                        </div>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Package Preview */}
            {currentPackage && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-teal">
                      {currentPackage.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {currentPackage.description}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-teal">
                    {formatPrice(currentPackage.price)}
                  </span>
                </div>
                <ul className="text-xs text-gray-500 space-y-1">
                  {currentPackage.includes.map((item, index) => (
                    <li key={index} className="flex items-center">
                      <span className="text-teal mr-2">✓</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          {/* Add-ons Selection */}
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-teal mb-6">
              Customize Your Experience
            </h2>
            <div className="space-y-3">
              {addons.map((addon) => (
                <label
                  key={addon.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg hover:bg-gray-50 cursor-pointer"
                >
                  <div className="flex items-center space-x-3">
                    <input
                      type="checkbox"
                      checked={selectedAddons.includes(addon.id)}
                      onChange={(e) => {
                        setSelectedAddons((prev) =>
                          e.target.checked
                            ? [...prev, addon.id]
                            : prev.filter((id) => id !== addon.id)
                        );
                      }}
                      className="w-4 h-4 text-teal"
                    />
                    <div>
                      <span className="font-medium text-teal">
                        {addon.name}
                      </span>
                      <p className="text-sm text-gray-600">
                        {addon.description}
                      </p>
                    </div>
                  </div>
                  <span className="text-teal font-semibold">
                    {formatPrice(addon.price)}
                  </span>
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
                alt="Experience Preview"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black/20"></div>
              <div className="absolute bottom-4 left-4 text-white">
                <h3 className="text-xl font-semibold">
                  {currentExperience?.name}
                </h3>
                <p className="text-sm opacity-90">
                  {currentExperience?.description}
                </p>
              </div>
            </div>
          )}
          <div className="space-y-2">
            {currentExperience && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <span className="text-teal">
                    {currentExperience.name}
                  </span>
                  <div className="flex items-center space-x-2">
                    <span className="text-sm text-gray-600">Guests:</span>
                    <input
                      type="number"
                      min="2"
                      className="w-16 p-1 border border-gray-300 rounded text-sm text-center"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      placeholder="2"
                    />
                  </div>
                </div>
                <span className="font-semibold text-teal">
                  {formatPrice(currentExperience.price + (Math.max(0, (parseInt(guestCount) || 2) - 2) * 25))}
                </span>
              </div>
            )}
            {currentPackage && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <span className="text-teal">+ {currentPackage.name}</span>
                <span className="font-semibold text-teal">
                  {formatPrice(currentPackage.price)}
                </span>
              </div>
            )}
            {selectedAddons.map((addonId) => {
              const addon = getAddonById(addonId);
              return addon ? (
                <div
                  key={addonId}
                  className="flex justify-between items-center py-1"
                >
                  <span className="text-gray-600">+ {addon.name}</span>
                  <span className="text-gray-600">
                    {formatPrice(addon.price)}
                  </span>
                </div>
              ) : null;
            })}
            <div className="flex justify-between items-center pt-4 border-t-2 border-teal">
              <span className="text-xl font-bold text-teal">Total</span>
              <span className="text-2xl font-bold text-teal">
                {formatPrice(totalPrice)}
              </span>
            </div>
          </div>
        </div>

        <form
          className="bg-white p-6 rounded-lg shadow-md mt-8"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-bold text-teal mb-6">Your Details</h2>
          <div className="grid gap-6 md:grid-cols-2">
            {/* Customer Info */}
            <div>
              <label className="block font-medium mb-1">Full Name</label>
              <input
                type="text"
                className="w-full p-2 border-b-2 rounded"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                How did you hear about us?
              </label>
              <input
                type="text"
                className="w-full p-2 border-b-2 rounded"
                value={howHeard}
                onChange={(e) => setHowHeard(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Email</label>
              <input
                type="email"
                className="w-full p-2 border-b-2 rounded"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Phone Number</label>
              <input
                type="tel"
                className="w-full p-2 border-b-2 rounded"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Type Of Phone</label>
              <select
                name="type"
                className="w-full p-2 border-b-2 rounded"
                value={phoneType}
                onChange={(e) => setPhoneType(e.target.value)}
              >
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
                onChange={(e) => setOccasion(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Preferred Date</label>
              <input
                type="date"
                className="w-full p-2 border-b-2 rounded"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">Start Time</label>
              <input
                type="time"
                className="w-full p-2 border-b-2 rounded"
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
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
