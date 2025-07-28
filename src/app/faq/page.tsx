"use client";

import React, { useState } from "react";
import Link from "next/link";

export default function FAQPage() {
  const [openItems, setOpenItems] = useState<number[]>([]);

  const toggleItem = (index: number) => {
    setOpenItems(prev => 
      prev.includes(index) 
        ? prev.filter(item => item !== index)
        : [...prev, index]
    );
  };

  const faqData = [
    {
      question: "How do I secure my booking?",
      answer: "You have a choice of paying upfront or paying a security deposit ($125) and then paying the total amount 7 days prior to your event date. The security deposit will be refunded to you the day after the event."
    },
    {
      question: "What is included in my booking?",
      answer: "Each experience includes a curated setup — picnicblankets, seating, decor, etc. Visit the “Experiences” section to explore details. Adjustments and add‑ons are available per request."
    },
    {
      question: "I want to personalize my experience. Can I do that?",
      answer: "Absolutely! Customize your experience — charcuterie instead of dessert board, no candy, 100 sand candles—just fill out the inquiry form in booking and we’ll plan it!"
    },
    {
      question: "What if I break something or spill something?",
      answer: "Minor spills (water, dry snacks) may incur no fee. Customers assume liability and must report any damages by the scheduled end time. Deposit deductions may occur."
    },
    {
      question: "What if it rains?",
      answer: "If weather doesn’t cooperate, we can move the event indoors (if space allows) or reschedule to another day."
    },
    {
      question: "Can I bring my pet?",
      answer: "Animal lovers here... Bring'em! 🐶🐱 :)"
    },
    {
      question: "Can I book outside of San Diego?",
      answer: "Yes — with advance notice we can travel. Additional charges for location, mileage, and time will be calculated. Contact us for details."
    },
    {
      question: "What if I am running late?",
      answer: "The event start time stands regardless of arrival time. There is a $25 fee for every 20‑minute delay. If you’re over 60 minutes late, the event may end and become non-refundable."
    },
    {
      question: "Can we leave early?",
      answer: "You're responsible for the setup until the agreed end time. If you must leave early, provide at least 30 minutes’ notice."
    },
    {
      question: "What if I need to cancel?",
      answer: "Deposits are non-refundable. You may reschedule once up to 72 hours before your event without penalty. Inside 72 hours, a $20/person fee applies."
    },
    {
      question: "Can you accommodate vegetarian/vegan/GF?",
      answer: "Yes — we accommodate dietary restrictions if informed during consultation."
    },
    {
      question: "I have a different question. How can I contact you?",
      answer: "Click 'CONTACT' in the menu or email us at seasidecinemasd@gmail.com."
    }
  ];

  return (
    <main className="min-h-screen bg-sand py-20 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-playfair font-bold text-teal mb-6">
            Frequently Asked Questions
          </h1>
          <p className="text-lg text-teal/80 max-w-2xl mx-auto">
            Everything you need to know about our luxury beach movie nights in San Diego. 
            Can&apos;t find what you&apos;re looking for? Contact us directly!
          </p>
        </div>

        {/* FAQ Items */}
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleItem(index)}
                className="w-full p-6 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-teal pr-4">
                  {item.question}
                </h3>
                <svg
                  className={`w-5 h-5 text-teal transition-transform duration-200 ${
                    openItems.includes(index) ? 'rotate-180' : ''
                  }`}
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
              {openItems.includes(index) && (
                <div className="px-6 pb-6">
                  <p className="text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white rounded-lg shadow-md p-8 text-center">
          <h2 className="text-2xl font-playfair font-bold text-teal mb-4">
            Still Have Questions?
          </h2>
          <p className="text-gray-600 mb-6">
            We&apos;re here to help! Reach out to us directly for personalized assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/book"
              className="bg-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-orange transition"
            >
              Book Your Experience
            </Link>
            <a
              href="/contact"
              className="border-2 border-teal text-teal px-6 py-3 rounded-lg font-medium hover:bg-teal hover:text-white transition"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          <Link
            href="/experiences"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <h3 className="text-lg font-semibold text-teal mb-2">View Experiences</h3>
            <p className="text-gray-600 text-sm">Explore our different movie night setups</p>
          </Link>
          <Link
            href="/packages"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <h3 className="text-lg font-semibold text-teal mb-2">Browse Packages</h3>
            <p className="text-gray-600 text-sm">See our themed packages and add-ons</p>
          </Link>
          <Link
            href="/gallery"
            className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow text-center"
          >
            <h3 className="text-lg font-semibold text-teal mb-2">View Gallery</h3>
            <p className="text-gray-600 text-sm">See photos from our past events</p>
          </Link>
        </div>
      </div>
    </main>
  );
} 
