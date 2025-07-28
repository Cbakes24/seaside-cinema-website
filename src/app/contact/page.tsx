"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function ContactPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log("Contact form submitted:", formData);
    await fetch("/api/send-question", {
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
        "🎉 Success! Your question has been submitted. Thank you for choosing us! 🎬";
  
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <main className="min-h-screen bg-sand py-20 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-playfair font-bold text-teal mb-6">
            Get in Touch
          </h1>
          <p className="text-lg text-teal/80 max-w-2xl mx-auto">
            Have questions about our beach movie nights? Ready to book your experience? 
            We&apos;re here to help make your dream event a reality.
          </p>
        </div>

        <div className="grid gap-12 lg:grid-cols-2">
          {/* Contact Information */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-playfair font-bold text-teal mb-6">
                Contact Information
              </h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-teal mb-1">Email</h3>
                    <a 
                      href="mailto:seasidecinemasd@gmail.com" 
                      className="text-gray-700 hover:text-teal transition-colors"
                    >
                      seasidecinemasd@gmail.com
                    </a>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-teal mb-1">Location</h3>
                    <p className="text-gray-700">San Diego, California</p>
                    <p className="text-sm text-gray-600">Serving the greater San Diego area</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-teal/10 rounded-full flex items-center justify-center flex-shrink-0">
                    <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-semibold text-teal mb-1">Response Time</h3>
                    <p className="text-gray-700">Within 24 hours</p>
                    <p className="text-sm text-gray-600">We&apos;ll get back to you quickly!</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h3 className="text-xl font-playfair font-bold text-teal mb-4">
                Quick Actions
              </h3>
              <div className="space-y-3">
                <Link
                  href="/book"
                  className="block w-full bg-teal text-white px-6 py-3 rounded-lg font-medium hover:bg-orange transition text-center"
                >
                  Book Your Experience
                </Link>
                <Link
                  href="/experiences"
                  className="block w-full border-2 border-teal text-teal px-6 py-3 rounded-lg font-medium hover:bg-teal hover:text-white transition text-center"
                >
                  View Experiences
                </Link>
                <Link
                  href="/faq"
                  className="block w-full border-2 border-teal text-teal px-6 py-3 rounded-lg font-medium hover:bg-teal hover:text-white transition text-center"
                >
                  FAQ
                </Link>
              </div>
            </div>

            {/* Business Hours */}
            <div>
              <h3 className="text-xl font-playfair font-bold text-teal mb-4">
                When We&apos;re Available
              </h3>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-700">Monday - Friday</span>
                    <span className="text-teal font-medium">9:00 AM - 8:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Saturday</span>
                    <span className="text-teal font-medium">10:00 AM - 9:00 PM</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-700">Sunday</span>
                    <span className="text-teal font-medium">10:00 AM - 7:00 PM</span>
                  </div>
                </div>
                <p className="text-sm text-gray-600 mt-4">
                  * Event times vary based on sunset and availability
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white p-8 rounded-lg shadow-md">
            <h2 className="text-2xl font-playfair font-bold text-teal mb-6">
              Send Us a Message
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal"
                    placeholder="Your full name"
                  />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal"
                    placeholder="your@email.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal"
                  placeholder="(555) 123-4567"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Subject <span className="text-red-500">*</span>
                </label>
                <select
                  name="subject"
                  required
                  value={formData.subject}
                  onChange={handleChange}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal"
                >
                  <option value="">Select a subject</option>
                  <option value="booking">Booking Inquiry</option>
                  <option value="custom">Custom Experience</option>
                  <option value="pricing">Pricing Question</option>
                  <option value="availability">Availability Check</option>
                  <option value="general">General Question</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="message"
                  required
                  value={formData.message}
                  onChange={handleChange}
                  rows={5}
                  className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-teal focus:border-teal"
                  placeholder="Tell us about your event, questions, or how we can help..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-teal text-white font-semibold py-3 px-6 rounded-lg hover:bg-orange transition duration-200"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-2xl font-playfair font-bold text-teal mb-6 text-center">
            Why Choose Seaside Cinema?
          </h2>
          <div className="grid gap-8 md:grid-cols-3">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-teal mb-2">Personalized Service</h3>
              <p className="text-gray-600">Every event is customized to your vision and preferences.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-teal mb-2">Quick Response</h3>
              <p className="text-gray-600">We respond to all inquiries within 24 hours.</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-teal/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-teal" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-teal mb-2">Reliable Service</h3>
              <p className="text-gray-600">Professional setup and cleanup for worry-free events.</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
} 
