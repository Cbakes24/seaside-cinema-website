import React from 'react'
import Link from 'next/link'

function Footer() {
  return (
    <footer className="bg-gray-800 text-white py-12 px-6">
    <div className="max-w-6xl mx-auto">
      <div className="grid gap-8 md:grid-cols-4">
        <div>
          <h3 className="text-xl font-semibold mb-4">Seaside Cinema</h3>
          <p className="text-gray-300">Luxury beach experiences in San Diego</p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Quick Links</h4>
          <ul className="space-y-2 text-gray-300">
            <li><Link href="/" className="hover:text-white">Home</Link></li>
            <li><Link href="/experiences" className="hover:text-white">Experiences</Link></li>
            <li><Link href="/book" className="hover:text-white">Book Now</Link></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-gray-300">
            <li>📧 hello@seasidecinema.com</li>
            <li>📱 (619) 555-0123</li>
            <li>📍 San Diego, CA</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Follow Us</h4>
          <div className="flex space-x-4">
            <a href="#" className="text-gray-300 hover:text-white">📷 Instagram</a>
            <a href="#" className="text-gray-300 hover:text-white">📘 Facebook</a>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-700 mt-8 pt-8 text-center text-gray-300">
        <p>&copy; 2024 Seaside Cinema. All rights reserved.</p>
      </div>
    </div>
  </footer>
  )
}

export default Footer
