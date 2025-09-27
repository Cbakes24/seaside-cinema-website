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
import { validateDiscountCode, calculateDiscountAmount, type DiscountCode } from "../utils/discounts";

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
  const [howHeardOther, setHowHeardOther] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [phoneType, setPhoneType] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guestCount, setGuestCount] = useState("");
  const [discountCode, setDiscountCode] = useState("");
  const [hasDiscount, setHasDiscount] = useState(false);
  const [specDiscount, setSpecDiscount] = useState<DiscountCode | null>(null);
  const [validationErrors, setValidationErrors] = useState<{[key: string]: string}>({});
  const [eventImages, setEventImages] = useState([
    "/vday3.jpeg",
    "/largeBali1.jpg",
    "/fall_night_back.jpeg",
    "/poolsBday5Large.jpeg",
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
      // Check if this is a seasonal holiday
      const seasonalHoliday = seasonalOptions.find(h => h.id === experienceParam);
      if (seasonalHoliday) {
        // If it's a seasonal holiday, set experience to "seasonal" and the holiday
        setSelectedExperience("seasonal");
        setSelectedSeasonalHoliday(experienceParam);
      } else {
        // Otherwise set the regular experience
        setSelectedExperience(experienceParam);
      }
    }
    
    if (packageParam) {
      setSelectedPackage(packageParam);
    }
  }, [searchParams]);

  const currentPackage = getPackageById(selectedPackage);
  const currentExperience = getExperienceById(selectedExperience);
  const currentSeasonalHoliday = seasonalOptions.find(h => h.id === selectedSeasonalHoliday);
  
  // Calculate total price including seasonal holiday
  const basePrice = calculateTotal(
    selectedExperience,
    selectedPackage,
    selectedAddons,
    parseInt(guestCount) || 2
  ) + (Number(currentSeasonalHoliday?.price) || 0);

  // Apply discount if code is valid
  const discountAmount = hasDiscount && specDiscount ? calculateDiscountAmount(basePrice, specDiscount) : 0;
  const totalPrice = basePrice - discountAmount;

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
    
    // Clear previous validation errors
    setValidationErrors({});
    
    const errors: {[key: string]: string} = {};
    
    // Validate required fields
    if (!fullName.trim()) {
      errors.fullName = "Full name is required";
    }
    if (!howHeard) {
      errors.howHeard = "Please let us know how you heard about us";
    } else if (howHeard === "other" && !howHeardOther.trim()) {
      errors.howHeardOther = "Please specify how you heard about us";
    }
    if (!email.trim()) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      errors.email = "Please enter a valid email address";
    }
    if (!phone.trim()) {
      errors.phone = "Phone number is required";
    }
    if (!phoneType) {
      errors.phoneType = "Please select your phone type";
    }
    if (!date) {
      errors.date = "Please select a preferred date";
    }
    if (!time) {
      errors.time = "Please select a start time";
    }
    if (!selectedExperience) {
      errors.experience = "Please select an experience";
    }
    if (!guestCount || guestCount.trim() === "") {
      errors.guestCount = "Please enter the number of guests";
    } else if (parseInt(guestCount) < 2) {
      errors.guestCount = "Guest count must be at least 2";
    }

    // Validate seasonal holiday selection if seasonal experience is selected
    if (selectedExperience === "seasonal" && !selectedSeasonalHoliday) {
      alert("Please select a holiday theme for your seasonal experience.");
      return;
    }

    // If there are validation errors, display them and stop submission
    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      
      // Scroll to the first error
      const firstErrorField = Object.keys(errors)[0];
      const errorElement = document.querySelector(`[data-field="${firstErrorField}"]`);
      if (errorElement) {
        errorElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
      
      return;
    }

    const formData = {
      fullName,
      howHeard: howHeard === "other" ? howHeardOther : howHeard,
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
      basePrice,
      discountCode: hasDiscount ? discountCode : "",
      discountAmount,
      totalPrice,
    };
    console.log("***  FORM DATA CLient side ***", formData);
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

  // Handle discount code validation
  const handleDiscountCode = () => {
    const discount = validateDiscountCode(discountCode);
    if (discount) {
      setHasDiscount(true);
      setSpecDiscount(discount);
      alert(`🎉 Discount code applied! ${discount.percentage}% off your total!`);
    } else {
      setHasDiscount(false);
      setSpecDiscount(null);
      alert("❌ Invalid discount code. Please try again.");
    }
  };

  // Clear validation error when user starts typing
  const clearValidationError = (fieldName: string) => {
    if (validationErrors[fieldName]) {
      setValidationErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

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
                              {exp.id === "classic" || exp.id === "bali" ? (
                                <div className="flex flex-col items-end">
                                  <span className="line-through text-gray-400 text-xs">
                                    {formatPrice(exp.originalPrice || exp.price)}
                                  </span>
                                  <span className="text-orange font-bold">
                                    {formatPrice(exp.price)}
                                  </span>
                                </div>
                              ) : (
                                formatPrice(exp.price)
                              )}
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
                    {selectedExperience === "seasonal" && currentSeasonalHoliday ? (
                      formatPrice(Number(currentSeasonalHoliday.price))
                    ) : currentExperience && (currentExperience.id === "classic" || currentExperience.id === "bali") ? (
                      <div className="flex flex-col items-end">
                        <span className="line-through text-gray-400 text-sm">
                          {formatPrice(currentExperience.originalPrice || currentExperience.price)}
                        </span>
                        <span className="text-orange font-bold">
                          {formatPrice(currentExperience.price)}
                        </span>
                      </div>
                    ) : (
                      formatPrice(currentExperience?.price || 0)
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
                    <div className="relative">
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
                        className="w-5 h-5 text-teal bg-white border-2 border-gray-300 rounded focus:ring-2 focus:ring-teal focus:ring-offset-2 appearance-none checked:bg-teal checked:border-teal"
                      />
                      {selectedAddons.includes(addon.id) && (
                        <svg
                          className="absolute top-0 left-0 w-5 h-5 text-white pointer-events-none"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={3}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      )}
                    </div>
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
                  {selectedExperience === "seasonal" && currentSeasonalHoliday ? (
                    formatPrice(
                      Number(currentSeasonalHoliday.price) + 
                      (Math.max(0, (parseInt(guestCount) || 2) - 2) * 50)
                    )
                  ) : currentExperience && (currentExperience.id === "classic" || currentExperience.id === "bali") ? (
                    <div className="flex flex-col items-end">
                      <span className="line-through text-gray-400 text-sm">
                        {formatPrice(
                          (currentExperience.originalPrice || currentExperience.price) + 
                          (Math.max(0, (parseInt(guestCount) || 2) - 2) * 50)
                        )}
                      </span>
                      <span className="text-orange font-bold">
                        {formatPrice(
                          currentExperience.price + 
                          (Math.max(0, (parseInt(guestCount) || 2) - 2) * 50)
                        )}
                      </span>
                    </div>
                  ) : (
                    formatPrice(
                      (currentExperience?.price || 0) + 
                      (Math.max(0, (parseInt(guestCount) || 2) - 2) * 50)
                    )
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
            
            {/* Discount Code Section */}
            <div className="py-4 border-t border-gray-200">
              <div className="flex items-center space-x-3 mb-3">
                <input
                  type="text"
                  placeholder="Enter discount code"
                  className="flex-1 p-2 border-2 border-gray-300 rounded text-sm focus:border-teal focus:ring-2 focus:ring-teal/20"
                  value={discountCode}
                  onChange={(e) => setDiscountCode(e.target.value)}
                />
                <button
                  type="button"
                  onClick={handleDiscountCode}
                  className="px-4 py-2 bg-teal text-white rounded text-sm font-medium hover:bg-orange transition"
                >
                  Apply
                </button>
              </div>
              {hasDiscount && specDiscount && (
                <div className="flex justify-between items-center py-2 bg-green-50 rounded-lg px-3">
                  <span className="text-green-700 text-sm font-medium">
                    🎉 Discount Applied: {specDiscount.code} ({specDiscount.percentage}% off)
                  </span>
                  <span className="text-green-700 font-semibold flex-shrink-0">
                    -{formatPrice(discountAmount)}
                  </span>
                </div>
              )}
            </div>
            
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
                onChange={(e) => {
                  setFullName(e.target.value);
                  clearValidationError('fullName');
                }}
                placeholder="Enter your full name"
                data-field="fullName"
              />
              {validationErrors.fullName && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.fullName}</p>
              )}
          </div>
          <div>
              <label className="block font-medium mb-1">
                How did you hear about us? <span className="text-red-500">*</span>
              </label>
              <select
                name="howHeard"
                className="w-full p-2 border-b-2 rounded"
                required
                value={howHeard}
                onChange={(e) => {
                  setHowHeard(e.target.value);
                  clearValidationError('howHeard');
                  if (e.target.value !== "other") {
                    setHowHeardOther("");
                  }
                }}
                data-field="howHeard"
              >
                <option value="">Select how you heard about us</option>
                <option value="Facebook">Facebook</option>
                <option value="Instagram">Instagram</option>
                <option value="TikTok">TikTok</option>
                <option value="Friends/Family">Friends/Family</option>
                <option value="Google">Google</option>
                <option value="TripAdvisor">TripAdvisor</option>
                <option value="other">Other</option>
              </select>
              {validationErrors.howHeard && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.howHeard}</p>
              )}
              {howHeard === "other" && (
                <input
                  type="text"
                  className="w-full p-2 border-b-2 rounded mt-1"
                  value={howHeardOther}
                  onChange={(e) => {
                    setHowHeardOther(e.target.value);
                    clearValidationError('howHeardOther');
                  }}
                  placeholder="Please specify"
                  data-field="howHeardOther"
                />
              )}
              {validationErrors.howHeardOther && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.howHeardOther}</p>
              )}
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
                onChange={(e) => {
                  setEmail(e.target.value);
                  clearValidationError('email');
                }}
                placeholder="your@email.com"
                data-field="email"
              />
              {validationErrors.email && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.email}</p>
              )}
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
                onChange={(e) => {
                  setPhone(e.target.value);
                  clearValidationError('phone');
                }}
                placeholder="(555) 123-4567"
                data-field="phone"
              />
              {validationErrors.phone && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.phone}</p>
              )}
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
                onChange={(e) => {
                  setPhoneType(e.target.value);
                  clearValidationError('phoneType');
                }}
                data-field="phoneType"
              >
              <option value="">Select phone type</option>
              <option value="iphone">iPhone</option>
              <option value="android">Android</option>
            </select>
            {validationErrors.phoneType && (
              <p className="text-red-500 text-xs mt-1">{validationErrors.phoneType}</p>
            )}
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
                onChange={(e) => {
                  setDate(e.target.value);
                  clearValidationError('date');
                }}
                data-field="date"
              />
              {validationErrors.date && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.date}</p>
              )}
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
                onChange={(e) => {
                  setTime(e.target.value);
                  clearValidationError('time');
                }}
                data-field="time"
              />
              {validationErrors.time && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.time}</p>
              )}
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
                    onChange={(e) => {
                      setGuestCount(e.target.value);
                      clearValidationError('guestCount');
                    }}
                    placeholder="2"
                    data-field="guestCount"
                  />
                  <div className="text-sm text-yellow-700">
                    <p className="font-medium">Please enter the actual number of guests</p>
                    <p className="text-xs">Minimum 2 guests • Each additional guest: +$50</p>
                  </div>
                </div>
              </div>
              {validationErrors.guestCount && (
                <p className="text-red-500 text-xs mt-1">{validationErrors.guestCount}</p>
              )}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
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
