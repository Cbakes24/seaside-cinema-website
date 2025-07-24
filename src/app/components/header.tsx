'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  const navItems = [
    { href: '/', label: 'Home' },
    { href: '/book', label: 'Book' },
    { href: '/experiences', label: 'Experiences' },
    { href: '/occasions', label: 'Occasions' },
    { href: '/gallery', label: 'Gallery' },
    { href: '/faq', label: 'FAQ' },
  ]

  return (
    <header className="w-full py-4 px-4 flex justify-between items-center border-b bg-white shadow-sm sticky top-0 z-50">
        
      <Link href="/" className="text-xl text-peach font-bold tracking-wide"> Seaside Cinema</Link>

      <nav className="hidden sm:flex space-x-6">
        {navItems.map(({ href, label }) => (
          <Link key={href} href={href} className="text-teal not-first:hover:text-blue-600">{label}</Link>
        ))}
      </nav>

      <button
        onClick={() => setMenuOpen(!menuOpen)}
        className="sm:hidden focus:outline-none z-[100]"
        aria-label="Toggle Menu"
      >
        <svg className="w-6 h-6 text-teal" fill="none" stroke="currentColor" strokeWidth="2"
          viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round"
            d={menuOpen ? 'M6 18L18 6M6 6l12 12' : 'M4 6h16M4 12h16M4 18h16'} />
        </svg>
      </button>

      {/* Overlay background when menu is open */}
      <AnimatePresence>
        {menuOpen && (
          <>
            <motion.div
              className="fixed inset-0 bg-black/40 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMenuOpen(false)}
            />
            <motion.div
              className="absolute top-full left-0 w-full backdrop-blur-md bg-white/90 shadow-md flex flex-col sm:hidden z-50 px-4 py-3 space-y-3"
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-base text-teal font-medium hover:text-blue-600"
                >
                  {label}
                </Link>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </header>
  )
}
