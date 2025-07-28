"use client";
import React, { useState, useEffect, Suspense } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import FallPromoModal2 from "../components/FallDiscountModal2";
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
} from "../utils/pricing";

function BookingPageContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [selectedAddons, setSelectedAddons] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState("classic");
  const [selectedPackage, setSelectedPackage] = useState("none");
  const [selectedSeasonalHoliday, setSelectedSeasonalHoliday] = useState("");
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
  const [isSeasonalDropdownOpen, setIsSeasonalDropdownOpen] = useState(false);

  // Handle URL parameters for auto-selection
  useEffect(() => {
    const experienceParam = searchParams.get('experience');
    const packageParam = searchParams.get('package');
    
    if (experienceParam) {
      setSelectedExperience(experienceParam);
    }
    
    if (packageParam) {
      setSelectedPackage(packageParam);
    }
  }, [searchParams]);

  const currentPackage = getPackageById(selectedPackage);
  const currentExperience = getExperienceById(selectedExperience);
  const currentSeasonalHoliday = seasonalOptions.find(h => h.id === selectedSeasonalHoliday);
  
  // Calculate total price including seasonal holiday
  const totalPrice = calculateTotal(
    selectedExperience,
    selectedPackage,
    selectedAddons,
    parseInt(guestCount) || 2
  ) + (Number(currentSeasonalHoliday?.price) || 0);

  // Update main image when experience or seasonal holiday changes
  useEffect(() => {
    if (selectedExperience === "seasonal" && currentSeasonalHoliday) {
      setMainImage(currentSeasonalHoliday.image);
    } else if (currentExperience) {
      setMainImage(currentExperience.image);
    }
  }, [selectedExperience, selectedSeasonalHoliday, currentExperience, currentSeasonalHoliday]);

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
      if (!target.closest(".seasonal-dropdown-container")) {
        setIsSeasonalDropdownOpen(false);
      }
    };

    if (isDropdownOpen || isPackageDropdownOpen || isSeasonalDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen, isPackageDropdownOpen, isSeasonalDropdownOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate that all required fields are filled
    if (!fullName || !email || !date || !time || !selectedExperience) {
      alert("Please fill out all required fields and select an experience.");
      return;
    }

    // Validate guest count is entered and is at least 2
    if (!guestCount || guestCount.trim() === "") {
      alert("Please enter the number of guests for your booking.");
      return;
    }

    if (parseInt(guestCount) < 2) {
      alert("Guest count must be at least 2.");
      return;
    }

    // Validate seasonal holiday selection if seasonal experience is selected
    if (selectedExperience === "seasonal" && !selectedSeasonalHoliday) {
      alert("Please select a holiday theme for your seasonal experience.");
      return;
    }

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
      selectedSeasonalHoliday,
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
  console.log("***  SELECTED SEASONAL HOLIDAY  ***", selectedSeasonalHoliday);
  console.log("***  SELECTED ADDONS  ***", selectedAddons);
  console.log("***  TOTAL PRICE  ***", totalPrice);
  console.log("***  CURRENT PACKAGE  ***", currentPackage);

  return (
    <main className="min-h-screen bg-peach text-gray-800 px-4 py-10">
      {/* <FallPromoModal2 /> */}
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-playfair font-bold text-teal mb-8 text-center">
          Book Your Experience
        </h1>
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Experience Selection */}
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
                    {selectedExperience === "seasonal" && currentSeasonalHoliday 
                      ? currentSeasonalHoliday.name 
                      : currentExperience?.name}
                  </h3>
                  <p className="text-sm opacity-90">
                    {selectedExperience === "seasonal" && currentSeasonalHoliday 
                      ? currentSeasonalHoliday.description 
                      : currentExperience?.description}
                  </p>
                </div>
              </div>
            )}
            <h2 className="text-2xl font-playfair font-bold text-teal mb-6">
              Create Your Movie Experience
            </h2>

            {/* Elegant Experience Dropdown */}
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
                          // Reset seasonal holiday when changing experience
                          if (exp.id !== "seasonal") {
                            setSelectedSeasonalHoliday("");
                          }
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

            {/* Seasonal Holiday Selection - Only show when "seasonal" is selected */}
            {selectedExperience === "seasonal" && (
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-3">
                  Select Your Holiday Theme *
                </label>
                <div className="relative seasonal-dropdown-container">
                  <button
                    type="button"
                    onClick={() => setIsSeasonalDropdownOpen(!isSeasonalDropdownOpen)}
                    className="w-full p-4 pr-12 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-teal focus:border-teal bg-white appearance-none cursor-pointer text-lg font-medium text-gray-800 shadow-sm hover:border-teal/50 transition-all duration-200 flex justify-between items-center"
                  >
                    <span>
                      {currentSeasonalHoliday?.name || "Select a holiday theme"}
                    </span>
                    <svg
                      className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isSeasonalDropdownOpen ? "rotate-180" : ""}`}
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

                  {/* Custom Seasonal Dropdown List */}
                  {isSeasonalDropdownOpen && (
                    <div className="absolute z-50 w-full mt-2 bg-white border-2 border-teal/20 rounded-xl shadow-lg overflow-hidden">
                      {seasonalOptions.map((holiday) => (
                        <button
                          key={holiday.id}
                          type="button"
                          onClick={() => {
                            setSelectedSeasonalHoliday(holiday.id);
                            setIsSeasonalDropdownOpen(false);
                          }}
                          className={`w-full p-3 text-left hover:bg-teal/5 transition-colors duration-150 border-b border-gray-100 last:border-b-0 ${
                            selectedSeasonalHoliday === holiday.id
                              ? "bg-teal/10 text-teal"
                              : "text-gray-800"
                          }`}
                        >
                          <div className="flex justify-between items-center">
                            <div>
                              <div className="font-semibold text-md">
                                {holiday.name}
                              </div>
                              <div className="text-sm text-gray-600 mt-1">
                                {holiday.description}
                              </div>
                            </div>
                            <div className="text-right">
                              <div className="text-md font-bold text-teal">
                                {formatPrice(Number(holiday.price))}
                              </div>
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Experience Preview */}
            {(currentExperience || (selectedExperience === "seasonal" && currentSeasonalHoliday)) && (
              <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex justify-between items-start mb-3">
                  <div>
                    <h3 className="text-lg font-semibold text-teal">
                      {selectedExperience === "seasonal" && currentSeasonalHoliday 
                        ? currentSeasonalHoliday.name 
                        : currentExperience?.name}
                    </h3>
                    <p className="text-sm text-gray-600">
                      {selectedExperience === "seasonal" && currentSeasonalHoliday 
                        ? currentSeasonalHoliday.description 
                        : currentExperience?.description}
                    </p>
                  </div>
                  <span className="text-lg font-bold text-teal">
                    {formatPrice(
                      selectedExperience === "seasonal" && currentSeasonalHoliday
                        ? Number(currentSeasonalHoliday.price)
                        : currentExperience?.price || 0
                    )}
                  </span>
                </div>
                <ul className="text-xs text-gray-500 space-y-1">
                  {(selectedExperience === "seasonal" && currentSeasonalHoliday 
                    ? currentSeasonalHoliday.includes 
                    : currentExperience?.includes || []
                  ).map((item, index) => (
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
            <h2 className="text-2xl font-playfair font-bold text-teal mb-6">
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
                      className="w-4 h-4 text-teal bg-white border-gray-300 rounded focus:ring-teal focus:ring-2"
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
          <h2 className="text-2xl font-playfair font-bold text-teal mb-4">Price Summary</h2>
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
                  {selectedExperience === "seasonal" && currentSeasonalHoliday 
                    ? currentSeasonalHoliday.name 
                    : currentExperience?.name}
                </h3>
                <p className="text-sm opacity-90">
                  {selectedExperience === "seasonal" && currentSeasonalHoliday 
                    ? currentSeasonalHoliday.description 
                    : currentExperience?.description}
                </p>
              </div>
            </div>
          )}
          <div className="space-y-2">
            {(currentExperience || (selectedExperience === "seasonal" && currentSeasonalHoliday)) && (
              <div className="flex justify-between items-center py-2 border-b border-gray-200">
                <div className="flex items-center space-x-3">
                  <span className="text-teal">
                    {selectedExperience === "seasonal" && currentSeasonalHoliday 
                      ? currentSeasonalHoliday.name 
                      : currentExperience?.name}
                  </span>
                  <div className="flex items-center space-x-2 bg-yellow-50 p-2 rounded-lg border border-yellow-200">
                    <span className="text-sm font-medium text-yellow-800">👥 Guests: </span>
                    <input
                      type="number"
                      min="2"
                      required
                      className="w-20 p-2 border-2 border-yellow-300 rounded text-center font-semibold text-yellow-800 bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                      value={guestCount}
                      onChange={(e) => setGuestCount(e.target.value)}
                      placeholder="2"
                    />
                    <span className="text-xs text-yellow-600">(min 2)</span>
                  </div>
                </div>
                <span className="font-semibold text-teal">
                  {formatPrice(
                    (selectedExperience === "seasonal" && currentSeasonalHoliday
                      ? Number(currentSeasonalHoliday.price)
                      : currentExperience?.price || 0) + 
                    (Math.max(0, (parseInt(guestCount) || 2) - 2) * 50)
                  )}
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
          <h2 className="text-2xl font-playfair font-bold text-teal mb-6">Your Details</h2>
          
          {/* Requirements Note */}
          <div className="mb-6 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <p className="text-sm text-blue-800">
              <strong>Important:</strong> All fields marked with <span className="text-red-500">*</span> are required. 
              You must also select an experience above before submitting.
              {selectedExperience === "seasonal" && (
                <span className="block mt-1">
                  <span className="text-red-500">*</span> Holiday theme selection is required for seasonal experiences.
                </span>
              )}
            </p>
          </div>
          
          <div className="grid gap-6 md:grid-cols-2">
          {/* Customer Info */}
          <div>
              <label className="block font-medium mb-1">
                Full Name <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border-b-2 rounded"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="Enter your full name"
              />
          </div>
          <div>
              <label className="block font-medium mb-1">
                How did you hear about us? <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                className="w-full p-2 border-b-2 rounded"
                required
                value={howHeard}
                onChange={(e) => setHowHeard(e.target.value)}
                placeholder="Social media, friend, etc."
              />
          </div>
          <div>
              <label className="block font-medium mb-1">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                className="w-full p-2 border-b-2 rounded"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
              />
          </div>
          <div>
              <label className="block font-medium mb-1">
                Phone Number <span className="text-red-500">*</span>
              </label>
              <input
                type="tel"
                className="w-full p-2 border-b-2 rounded"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="(555) 123-4567"
              />
          </div>
          <div>
              <label className="block font-medium mb-1">
                Type Of Phone <span className="text-red-500">*</span>
              </label>
              <select
                name="type"
                className="w-full p-2 border-b-2 rounded"
                required
                value={phoneType}
                onChange={(e) => setPhoneType(e.target.value)}
              >
              <option value="">Select phone type</option>
              <option value="iphone">iPhone</option>
              <option value="android">Android</option>
            </select>
          </div>
          <div>
              <label className="block font-medium mb-1">
                Occasion Type <span className="text-red-500">*</span>
              </label>
            <input
              type="text"
              placeholder="Date Night, Birthday, Proposal..."
              className="w-full p-2 border-b-2 rounded"
                required
              value={occasion}
                onChange={(e) => setOccasion(e.target.value)}
            />
          </div>
            <div>
              <label className="block font-medium mb-1">
                Preferred Date <span className="text-red-500">*</span>
              </label>
                  <input
                type="date"
                className="w-full p-2 border-b-2 rounded"
                required
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
            <div>
              <label className="block font-medium mb-1">
                Start Time <span className="text-red-500">*</span>
                </label>
              <input
                type="time"
                className="w-full p-2 border-b-2 rounded"
                required
                value={time}
                onChange={(e) => setTime(e.target.value)}
              />
            </div>
            <div className="md:col-span-2">
              <label className="block font-medium mb-1">
                👥 Number of Guests <span className="text-red-500">*</span>
              </label>
              <div className="bg-yellow-50 p-4 rounded-lg border-2 border-yellow-200">
                <div className="flex items-center space-x-4">
                  <input
                    type="number"
                    min="2"
                    required
                    className="w-24 p-3 border-2 border-yellow-300 rounded text-center font-bold text-lg text-yellow-800 bg-white focus:border-yellow-500 focus:ring-2 focus:ring-yellow-200"
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    placeholder="2"
                  />
                  <div className="text-sm text-yellow-700">
                    <p className="font-medium">Please enter the actual number of guests</p>
                    <p className="text-xs">Minimum 2 guests • Each additional guest: +$25</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={!fullName || !email || !date || !time || !selectedExperience || !phone || !phoneType || !occasion || !guestCount || parseInt(guestCount) < 2}
            className="w-full bg-teal text-white font-semibold py-3 rounded hover:bg-orange transition mt-6 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Submit Booking - {formatPrice(totalPrice)}
          </button>
        </form>
      </div>
    </main>
  );
}

export default function BookingPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <BookingPageContent />
    </Suspense>
  );
}
